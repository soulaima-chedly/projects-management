"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Task, TaskStatus } from "../types/task";

interface TaskItemProps {
    task: Task;
    orgId: string;
    userId: string;
    onStatusChange: (status: TaskStatus) => void;
    onDelete?: () => void;
}

const statusOrder: TaskStatus[] = ["pending", "in_progress", "done"];

export const TaskItem = ({ task, onStatusChange, onDelete }: TaskItemProps) => {
    const currentIndex = statusOrder.indexOf(task.status);
    const nextStatus = statusOrder[(currentIndex + 1) % statusOrder.length];

    return (
        <div className="flex items-center justify-between rounded-md border p-3">
            <span className="text-sm">{task.title}</span>

            <div className="flex items-center gap-2">
                <Badge variant="outline">{task.status.replace("_", " ")}</Badge>
                <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => onStatusChange(nextStatus)}
                >
                    Mark {nextStatus.replace("_", " ")}
                </Button>
                {onDelete && (
                    <Button size="sm" variant="destructive" onClick={onDelete}>
                        Delete
                    </Button>
                )}
            </div>
        </div>
    );
};
