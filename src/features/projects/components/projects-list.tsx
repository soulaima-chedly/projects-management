import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Project } from "../types/project";
import Link from "next/link";

interface ProjectsListProps {
  projects: Project[];
}

export const ProjectsList = ({ projects }: ProjectsListProps) => {
  const PROJECT_DETAILS_BASE_URL = "/projects/";

  if (projects.length === 0) {
    return (
      <div className="text-center text-sm text-muted-foreground">
        No projects yet. Create your first one.
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <Link
          key={project.id}
          href={`${PROJECT_DETAILS_BASE_URL}/${project.id}`}
        >
          <Card className="transition-shadow hover:shadow-md">
            <CardHeader>
              <CardTitle className="text-base">{project.name}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Click to open project
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default ProjectsList;
