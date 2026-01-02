"use client";
import { useProjects } from "../state/use-projects";
import { AddProjectDialog } from "../components/add-project-dialog";
import { ProjectsList } from "../components/projects-list";
import { useState } from "react";

type InviteMemberDialogProps = {
  onInvite: (email: string, projectId: number) => void;
  projects: { id: number; name: string }[];
};

function InviteMemberDialog({ onInvite, projects }: InviteMemberDialogProps) {
  const [email, setEmail] = useState("");
  const [projectId, setProjectId] = useState<number | null>(projects[0]?.id ?? null);

  const handleSubmit = () => {
    if (projectId !== null && email.trim()) {
      onInvite(email, projectId);
      setEmail(""); // reset
    }
  };

  return (
    <div className="flex space-x-2 items-center">
      <select
        value={projectId ?? undefined}
        onChange={(e) => setProjectId(Number(e.target.value))}
        className="border rounded px-2 py-1"
      >
        {projects.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>
      <input
        type="email"
        placeholder="Email to invite"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border rounded px-2 py-1"
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-1 rounded"
      >
        Invite
      </button>
    </div>
  );
}

export default function ProjectsPageComponent() {
  const { projects, addProject, inviteMember, invites } = useProjects();

  return (
    <div className="h-full p-6">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Projects</h1>
          <AddProjectDialog onCreate={addProject} />
        </div>

        {/* Invite Members Section */}
        <div className="mb-4">
          <h2 className="text-xl font-medium mb-2">Invite Members</h2>
          <InviteMemberDialog onInvite={inviteMember} projects={projects} />
        </div>

        <ProjectsList projects={projects} />

        {/* Show pending invites */}
        {invites.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl font-medium mb-2">Pending Invites</h2>
            <ul className="list-disc list-inside">
              {invites.map((inv) => (
                <li key={`${inv.projectId}-${inv.email}`}>
                  {inv.email} — {projects.find((p) => p.id === inv.projectId)?.name} ({inv.status})
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
