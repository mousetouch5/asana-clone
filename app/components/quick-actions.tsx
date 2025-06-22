"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CheckSquare,
  FolderOpen,
  Users,
  Calendar,
  FileText,
  Settings,
} from "lucide-react";

interface QuickActionsProps {
  onCreateTask: () => void;
  onCreateProject: () => void;
  onCreateTeam: () => void;
}

export function QuickActions({
  onCreateTask,
  onCreateProject,
  onCreateTeam,
}: QuickActionsProps) {
  const actions = [
    {
      title: "Create Task",
      description: "Add a new task to your list",
      icon: CheckSquare,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      onClick: onCreateTask,
    },
    {
      title: "New Project",
      description: "Start a new project",
      icon: FolderOpen,
      color: "text-green-600",
      bgColor: "bg-green-50",
      onClick: onCreateProject,
    },
    {
      title: "Create Team",
      description: "Form a new team",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      onClick: onCreateTeam,
    },
    {
      title: "Schedule Meeting",
      description: "Book time with your team",
      icon: Calendar,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      onClick: () => {},
    },
    {
      title: "Create Report",
      description: "Generate progress report",
      icon: FileText,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      onClick: () => {},
    },
    {
      title: "Settings",
      description: "Manage your preferences",
      icon: Settings,
      color: "text-gray-600",
      bgColor: "bg-gray-50",
      onClick: () => {},
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant="ghost"
              className="h-auto p-4 flex flex-col items-start gap-2 hover:bg-gray-50"
              onClick={action.onClick}
            >
              <div className={`p-2 rounded-lg ${action.bgColor}`}>
                <action.icon className={`h-5 w-5 ${action.color}`} />
              </div>
              <div className="text-left">
                <p className="font-medium text-sm">{action.title}</p>
                <p className="text-xs text-muted-foreground">
                  {action.description}
                </p>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
