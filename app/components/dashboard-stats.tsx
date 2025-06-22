"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  CheckSquare,
  FolderOpen,
  Users,
  TrendingUp,
  AlertCircle,
} from "lucide-react";

interface DashboardStatsProps {
  stats: {
    totalTasks: number;
    completedTasks: number;
    totalProjects: number;
    activeProjects: number;
    totalTeams: number;
    totalMembers: number;
    overdueTasks: number;
    completionRate: number;
  };
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  const statsCards = [
    {
      title: "My Tasks",
      value: stats.totalTasks,
      subtitle: `${stats.completedTasks} completed`,
      icon: CheckSquare,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Active Projects",
      value: stats.activeProjects,
      subtitle: `${stats.totalProjects} total`,
      icon: FolderOpen,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Teams",
      value: stats.totalTeams,
      subtitle: `${stats.totalMembers} members`,
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Overdue",
      value: stats.overdueTasks,
      subtitle: "tasks need attention",
      icon: AlertCircle,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      title: "Completion Rate",
      value: `${stats.completionRate}%`,
      subtitle: "this week",
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {statsCards.map((stat, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.subtitle}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
