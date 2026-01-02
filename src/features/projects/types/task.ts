export type TaskStatus = "done" | "pending" | "in_progress";


export interface Task {
    id: number;
    title: string;
    status: TaskStatus;
}