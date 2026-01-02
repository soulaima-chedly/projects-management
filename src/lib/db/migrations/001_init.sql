-- Enable extensions
create extension if not exists "uuid-ossp";

-- =====================
-- ORGANIZATIONS
-- =====================
create table organizations (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  created_at timestamptz default now()
);

-- =====================
-- MEMBERSHIPS
-- =====================
create type member_role as enum ('owner', 'member');

create table memberships (
  id uuid primary key default uuid_generate_v4(),
  org_id uuid references organizations(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  role member_role not null,
  created_at timestamptz default now(),
  unique (org_id, user_id)
);

-- =====================
-- PROJECTS
-- =====================
create table projects (
  id uuid primary key default uuid_generate_v4(),
  org_id uuid references organizations(id) on delete cascade,
  name text not null,
  created_at timestamptz default now()
);

-- =====================
-- TASKS
-- =====================
create table tasks (
  id uuid primary key default uuid_generate_v4(),
  org_id uuid references organizations(id) on delete cascade,
  project_id uuid references projects(id) on delete cascade,
  title text not null,
  is_done boolean default false,
  created_at timestamptz default now()
);

-- =====================
-- INVITES
-- =====================
create table invites (
  id uuid primary key default uuid_generate_v4(),
  org_id uuid references organizations(id) on delete cascade,
  email text not null,
  token text not null unique,
  accepted_at timestamptz,
  created_at timestamptz default now()
);

-- =====================
-- AUDIT LOGS
-- =====================
create table audit_logs (
  id uuid primary key default uuid_generate_v4(),
  org_id uuid not null,
  actor uuid not null,
  action text not null,
  entity_type text,
  entity_id uuid,
  metadata jsonb,
  created_at timestamptz default now()
);

-- =====================
-- ROW LEVEL SECURITY
-- =====================
alter table organizations enable row level security;
alter table memberships enable row level security;
alter table projects enable row level security;
alter table tasks enable row level security;
alter table invites enable row level security;
alter table audit_logs enable row level security;

-- =====================
-- HELPERS
-- =====================
create or replace function is_org_member(check_org uuid)
returns boolean as $$
  select exists (
    select 1 from memberships
    where org_id = check_org
      and user_id = auth.uid()
  );
$$ language sql stable;


-- =====================
-- POLICIES
-- =====================
create policy "org read"
on organizations for select
using (
  exists (
    select 1 from memberships
    where memberships.org_id = id
      and memberships.user_id = auth.uid()
  )
);

create policy "membership read"
on memberships for select
using (user_id = auth.uid());

create policy "projects read/write"
on projects
using (is_org_member(org_id))
with check (is_org_member(org_id));

create policy "tasks read/write"
on tasks
using (is_org_member(org_id))
with check (is_org_member(org_id));

create policy "invite read"
on invites for select
using (is_org_member(org_id));

create policy "invite create owner only"
on invites for insert
with check (
  exists (
    select 1 from memberships
    where org_id = invites.org_id
      and user_id = auth.uid()
      and role = 'owner'
  )
);

create policy "invite accept by email"
on invites for update
using (
  auth.email() = email
)
with check (
  auth.email() = email
);

create policy "audit read"
on audit_logs for select
using (is_org_member(org_id));
