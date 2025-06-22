"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { Calendar, MoreHorizontal, Users, BarChart3 } from "lucide-react";

interface Project {
  id: string;
  name: string;
  description: string;
  status: string;
  priority: string;
  startDate: string;
  endDate: string;
  assignedMembers: string[];
  color: string;
  progress: number;
}

interface ProjectCardProps {
  project: Project;
  onViewGantt: (projectId: string) => void;
  onDeleteProject: (projectId: string) => void;
}

const teamMembers = [
  { id: "1", name: "Alice Johnson", avatar: "AJ" },
  { id: "2", name: "Bob Smith", avatar: "BS" },
  { id: "3", name: "Carol Davis", avatar: "CD" },
  { id: "4", name: "David Wilson", avatar: "DW" },
  { id: "5", name: "Emma Brown", avatar: "EB" },
];

export function ProjectCard({
  project,
  onViewGantt,
  onDeleteProject,
}: ProjectCardProps) {
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800 border-red-200";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "Not set";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const assignedMemberDetails = project.assignedMembers
    .map((id) => teamMembers.find((member) => member.id === id))
    .filter(Boolean);

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-4 h-4 rounded-full ${project.color}`} />
            <div>
              <h3 className="font-semibold text-lg">{project.name}</h3>
              {project.description && (
                <p className="text-sm text-muted-foreground mt-1">
                  {project.description}
                </p>
              )}
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onViewGantt(project.id)}>
                <BarChart3 className="h-4 w-4 mr-2" />
                View Gantt Chart
              </DropdownMenuItem>
              <DropdownMenuItem>Edit Project</DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDeleteProject(project.id)}
                className="text-red-600"
              >
                Delete Project
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className={getStatusColor(project.status)}>
            {project.status}
          </Badge>
          <Badge
            variant="outline"
            className={getPriorityColor(project.priority)}
          >
            {project.priority}
          </Badge>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span>{project.progress}%</span>
          </div>
          <Progress value={project.progress} className="h-2" />
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>
              {formatDate(project.startDate)} - {formatDate(project.endDate)}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <div className="flex -space-x-2">
              {assignedMemberDetails.slice(0, 3).map((member) => (
                <div
                  key={member?.id}
                  className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-xs font-medium border-2 border-white"
                  title={member?.name}
                >
                  {member?.avatar}
                </div>
              ))}
              {assignedMemberDetails.length > 3 && (
                <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs font-medium border-2 border-white">
                  +{assignedMemberDetails.length - 3}
                </div>
              )}
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewGantt(project.id)}
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            Gantt
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
