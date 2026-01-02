"use client";

import { useProjectDetails } from "../state/use-project-details";
import { ProjectHeader } from "../components/project-header";
import { TasksList } from "../components/tasks-list";
import { useSupabaseUser } from "@/hooks/useSupabaseUser";

export default function ProjectDetailsPageComponent() {
  const { project, updateTaskStatus, createTask, deleteTask } = useProjectDetails();
  const { user } = useSupabaseUser();
  const orgId = "123"; if (!user) return <p>Loading user...</p>;
  if (!project) return <p>Loading project...</p>;

  return (
    <div className="h-full bg-muted/40 p-6">
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Project Header */}
        <ProjectHeader project={project} />

        {/* Tasks List */}
        <TasksList
          orgId={orgId}
          userId={user.id}
          tasks={project.tasks || []}
          onStatusChange={updateTaskStatus}
          onCreateTask={createTask}
          onDeleteTask={deleteTask}
        />
      </div>
    </div>
  );
}
