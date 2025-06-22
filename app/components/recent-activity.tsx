"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CheckSquare, FolderOpen, Users, MessageSquare } from "lucide-react";

interface Activity {
  id: string;
  type: "task" | "project" | "team" | "comment";
  user: string;
  userAvatar: string;
  action: string;
  item: string;
  time: string;
  priority?: string;
}

interface RecentActivityProps {
  activities: Activity[];
}

export function RecentActivity({ activities }: RecentActivityProps) {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "task":
        return <CheckSquare className="h-4 w-4 text-blue-600" />;
      case "project":
        return <FolderOpen className="h-4 w-4 text-green-600" />;
      case "team":
        return <Users className="h-4 w-4 text-purple-600" />;
      case "comment":
        return <MessageSquare className="h-4 w-4 text-orange-600" />;
      default:
        return <CheckSquare className="h-4 w-4 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Low":
        return "bg-green-100 text-green-800";
      default:
        return "";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3">
              <div className="p-1 rounded-full bg-gray-100">
                {getActivityIcon(activity.type)}
              </div>
              <Avatar className="h-8 w-8">
                <AvatarFallback className="text-xs">
                  {activity.userAvatar}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm">
                  <span className="font-medium">{activity.user}</span>{" "}
                  {activity.action}{" "}
                  <span className="font-medium">{activity.item}</span>
                  {activity.priority && (
                    <Badge
                      variant="outline"
                      className={`ml-2 text-xs ${getPriorityColor(
                        activity.priority
                      )}`}
                    >
                      {activity.priority}
                    </Badge>
                  )}
                </p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
