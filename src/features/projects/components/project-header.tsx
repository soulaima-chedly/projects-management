import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { Project } from "../types/project";

interface ProjectHeaderProps {
    project: Project;
}

export const ProjectHeader = ({ project }: ProjectHeaderProps) => {
    return (
        <Card>
            <CardHeader className="space-y-2">
                <CardTitle className="text-2xl">{project.name}</CardTitle>
                <p className="text-sm text-muted-foreground">
                    {project.description}
                </p>
            </CardHeader>

            <CardContent>
                <div className="flex items-center gap-3">
                    <Avatar>
                        <AvatarFallback>
                            {project.owner.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="text-sm font-medium">Owner</p>
                        <p className="text-sm text-muted-foreground">
                            {project.owner.name}
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};