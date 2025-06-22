"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowRight } from "lucide-react";

interface Project {
  id: string;
  name: string;
  status: string;
  progress: number;
  color: string;
  membersCount: number;
}

interface ProjectsOverviewProps {
  projects: Project[];
  onViewAllProjects: () => void;
}

export function ProjectsOverview({
  projects,
  onViewAllProjects,
}: ProjectsOverviewProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Planning":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "In Progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "On Hold":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Completed":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Active Projects</CardTitle>
        <Button variant="ghost" size="sm" onClick={onViewAllProjects}>
          View All
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {projects.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No active projects
            </p>
          ) : (
            projects.slice(0, 4).map((project) => (
              <div key={project.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${project.color}`} />
                    <span className="font-medium text-sm">{project.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className={`text-xs ${getStatusColor(project.status)}`}
                    >
                      {project.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {project.membersCount} members
                    </span>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
