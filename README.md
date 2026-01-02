# Projects Management App

A **Next.js** multi-tenant Projects & Tasks management app using **Supabase** for authentication and database.  

> ⚠ **Note:** This is a work-in-progress. Some features like member invites and activity log are **not fully completed**.

---

## Stack
- Next JS
- Supabase (PostgreSQL and Auth)
- Shadcn UI
- Tailwind CSS


---


## Features

- Multi-tenant organizations  
- Projects & Tasks CRUD  
- Invite members by email (**not fully implemented**)  
- Activity log (**basic, not fully completed**)  
- Google OAuth login (Supabase + Google Cloud Console)  

---

## Live Demo

[View Live Deployment](https://projects-management-ten.vercel.app/)

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/soulaima-chedly/projects-management.git

cd projects-management
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configurate env variables

```bash
cp .env.example .env
# Edit variables if necessary
```

### 4. Run in dev env

```bash
npm run dev
```


### Setup with Docker

``` bash
docker build -t nextjs-app .
docker run -p 3000:3000 nextjs-app
```
