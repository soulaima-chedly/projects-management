import type { Task } from "./task";

export interface Project {
    id: number;
    name: string;
    description?: string;
    owner: {
        name: string;
    };
    tasks?: Task[];
}