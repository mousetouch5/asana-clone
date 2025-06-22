"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar } from "lucide-react";

interface Task {
  id: string;
  title: string;
  priority: string;
  dueDate: string;
  project: string;
  completed: boolean;
}

interface MyTasksPreviewProps {
  tasks: Task[];
  onViewAllTasks: () => void;
  onToggleTask: (taskId: string) => void;
}

export function MyTasksPreview({
  tasks,
  onViewAllTasks,
  onToggleTask,
}: MyTasksPreviewProps) {
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
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>My Tasks</CardTitle>
        <Button variant="ghost" size="sm" onClick={onViewAllTasks}>
          View All
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {tasks.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No tasks assigned
            </p>
          ) : (
            tasks.slice(0, 5).map((task) => (
              <div
                key={task.id}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50"
              >
                <Checkbox
                  checked={task.completed}
                  onCheckedChange={() => onToggleTask(task.id)}
                  className="mt-0.5"
                />
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm font-medium ${
                      task.completed ? "line-through text-muted-foreground" : ""
                    }`}
                  >
                    {task.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge
                      variant="outline"
                      className={`text-xs ${getPriorityColor(task.priority)}`}
                    >
                      {task.priority}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {task.project}
                    </span>
                    {task.dueDate && (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {formatDate(task.dueDate)}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
