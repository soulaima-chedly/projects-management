import { useState } from "react";
import type { Project } from "../types/project";
import type { TaskStatus } from "../types/task";

export const useProjectDetails = () => {
    const [project, setProject] = useState<Project>({
        id: 0,
        name: "Website Redesign",
        description: "Redesign the marketing website with a modern UI and better UX.",
        owner: { name: "John Doe" },
        tasks: [
            { id: 1, title: "Create wireframes", status: "done" },
            { id: 2, title: "Implement landing page", status: "in_progress" },
            { id: 3, title: "QA & review", status: "pending" },
        ],
    });

    const updateTaskStatus = (taskId: number, status: TaskStatus) => {
        setProject((prev) => ({
            ...prev,
            tasks: prev.tasks?.map((task) =>
                task.id === taskId ? { ...task, status } : task
            ),
        }));
    };

    const createTask = (title: string) => {
        const newTask = {
            id: Date.now(), // simple unique id
            title,
            status: "pending" as TaskStatus,
        };
        setProject((prev) => ({
            ...prev,
            tasks: [...(prev.tasks || []), newTask],
        }));
    };

    const deleteTask = (taskId: number) => {
        setProject((prev) => ({
            ...prev,
            tasks: prev.tasks?.filter((task) => task.id !== taskId),
        }));
    };

    return {
        project,
        updateTaskStatus,
        createTask,
        deleteTask,
    };
};
