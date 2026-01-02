"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { Task, TaskStatus } from "../types/task";
import { TaskItem } from "./task-item";
import { supabase } from "@/lib/supabase";

interface TasksListProps {
    orgId: string;
    userId: string;
    tasks: Task[];
    onStatusChange: (taskId: number, status: TaskStatus) => void;
    onCreateTask: (title: string) => void;
    onDeleteTask: (taskId: number) => void;
}

export const TasksList = ({ orgId, userId, tasks, onStatusChange, onCreateTask, onDeleteTask }: TasksListProps) => {
    const [newTaskTitle, setNewTaskTitle] = useState("");

    const logActivity = async (action: string, metadata?: Record<string, any>) => {
        await supabase.from("audit_logs").insert([
            { org_id: orgId, user_id: userId, action, entity_type: "task", metadata },
        ]);
    };

    const handleCreate = async () => {
        const title = newTaskTitle.trim();
        if (!title) return;
        onCreateTask(title);
        setNewTaskTitle("");
        await logActivity("task.created", { title });
    };

    return (
        <Card>
            <CardHeader className="flex flex-col gap-2">
                <CardTitle className="text-lg">Tasks</CardTitle>
                <div className="flex gap-2">
                    <Input
                        placeholder="New task title"
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                    />
                    <Button onClick={handleCreate}>Create Task</Button>
                </div>
            </CardHeader>

            <CardContent className="space-y-3">
                {tasks.length === 0 && <p className="text-sm text-muted-foreground">No tasks yet.</p>}

                {tasks.map((task) => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        orgId={orgId}
                        userId={userId}
                        onStatusChange={(status) => onStatusChange(task.id, status)}
                        onDelete={() => onDeleteTask(task.id)}
                    />
                ))}
            </CardContent>
        </Card>
    );
};
