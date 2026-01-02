'use client';
import { useState } from "react";
import type { Project } from "../types/project";

type Invite = {
    email: string;
    projectId: number;
    status: "pending" | "accepted" | "declined";
};

export const useProjects = () => {
    const [projects, setProjects] = useState<Project[]>([
        { id: 1, name: "Website Redesign", owner: { name: "John Doe" } },
        { id: 2, name: "Mobile App", owner: { name: "John Doe" } },
    ]);

    const [invites, setInvites] = useState<Invite[]>([]);

    const addProject = (name: string) => {
        if (!name.trim()) return;

        setProjects((prev) => [
            ...prev,
            { id: Date.now(), name: name.trim(), owner: { name: "John Doe" } },
        ]);
    };

    const inviteMember = (email: string, projectId: number) => {
        if (!email.trim()) return;

        const newInvite: Invite = {
            email: email.trim(),
            projectId,
            status: "pending",
        };

        setInvites((prev) => [...prev, newInvite]);
    };

    const updateInviteStatus = (email: string, projectId: number, status: Invite["status"]) => {
        setInvites((prev) =>
            prev.map((inv) =>
                inv.email === email && inv.projectId === projectId
                    ? { ...inv, status }
                    : inv
            )
        );
    };

    return {
        projects,
        addProject,
        invites,
        inviteMember,
        updateInviteStatus,
    };
};
