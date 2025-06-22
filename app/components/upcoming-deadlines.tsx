"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, AlertTriangle } from "lucide-react";

interface Deadline {
  id: string;
  title: string;
  type: "task" | "project";
  dueDate: string;
  priority: string;
  project?: string;
  isOverdue: boolean;
  daysUntilDue: number;
}

interface UpcomingDeadlinesProps {
  deadlines: Deadline[];
}

export function UpcomingDeadlines({ deadlines }: UpcomingDeadlinesProps) {
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

  const getUrgencyColor = (daysUntilDue: number, isOverdue: boolean) => {
    if (isOverdue) return "text-red-600";
    if (daysUntilDue <= 1) return "text-orange-600";
    if (daysUntilDue <= 3) return "text-yellow-600";
    return "text-muted-foreground";
  };

  const formatDueDate = (
    dateString: string,
    daysUntilDue: number,
    isOverdue: boolean
  ) => {
    const date = new Date(dateString);
    const formatted = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

    if (isOverdue) return `${formatted} (Overdue)`;
    if (daysUntilDue === 0) return `${formatted} (Today)`;
    if (daysUntilDue === 1) return `${formatted} (Tomorrow)`;
    return `${formatted} (${daysUntilDue} days)`;
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Upcoming Deadlines</CardTitle>
        <Button variant="ghost" size="sm">
          <Calendar className="h-4 w-4 mr-2" />
          View Calendar
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {deadlines.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No upcoming deadlines
            </p>
          ) : (
            deadlines.map((deadline) => (
              <div
                key={deadline.id}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    {deadline.isOverdue ? (
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                    ) : (
                      <Clock className="h-4 w-4 text-muted-foreground" />
                    )}
                    <div>
                      <p className="font-medium text-sm">{deadline.title}</p>
                      {deadline.project && (
                        <p className="text-xs text-muted-foreground">
                          {deadline.project}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={getPriorityColor(deadline.priority)}
                  >
                    {deadline.priority}
                  </Badge>
                  <span
                    className={`text-xs ${getUrgencyColor(
                      deadline.daysUntilDue,
                      deadline.isOverdue
                    )}`}
                  >
                    {formatDueDate(
                      deadline.dueDate,
                      deadline.daysUntilDue,
                      deadline.isOverdue
                    )}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
