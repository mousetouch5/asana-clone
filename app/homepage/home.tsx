"use client";

import { useState, useEffect } from "react";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Image from "next/image";

import { AppSidebar } from "../components/app-sidebar";
import { DashboardStats } from "../components/dashboard-stats";
import { RecentActivity } from "../components/recent-activity";
import { UpcomingDeadlines } from "../components/upcoming-deadlines";
import { QuickActions } from "../components/quick-actions";
import { MyTasksPreview } from "../components/my-tasks-preview";
import { ProjectsOverview } from "../components/projects-overview";

export default function Home() {
  const [greeting, setGreeting] = useState("");
  // Sample data - in a real app, this would come from your API/database
  const [stats] = useState({
    totalTasks: 24,
    completedTasks: 18,
    totalProjects: 8,
    activeProjects: 5,
    totalTeams: 4,
    totalMembers: 23,
    overdueTasks: 3,
    completionRate: 85,
  });

  const [recentActivities] = useState([
    {
      id: "1",
      type: "task" as const,
      user: "Alice Johnson",
      userAvatar: "AJ",
      action: "completed task",
      item: "Design homepage mockup",
      time: "2 hours ago",
      priority: "High",
    },
    {
      id: "2",
      type: "project" as const,
      user: "Bob Smith",
      userAvatar: "BS",
      action: "created project",
      item: "Mobile App Development",
      time: "4 hours ago",
    },
    {
      id: "3",
      type: "team" as const,
      user: "Carol Davis",
      userAvatar: "CD",
      action: "joined team",
      item: "Design System Team",
      time: "1 day ago",
    },
    {
      id: "4",
      type: "comment" as const,
      user: "David Wilson",
      userAvatar: "DW",
      action: "commented on",
      item: "Website Redesign",
      time: "1 day ago",
    },
    {
      id: "5",
      type: "task" as const,
      user: "Emma Brown",
      userAvatar: "EB",
      action: "updated task",
      item: "Research competitor analysis",
      time: "2 days ago",
      priority: "Medium",
    },
  ]);

  const [upcomingDeadlines] = useState([
    {
      id: "1",
      title: "Submit quarterly report",
      type: "task" as const,
      dueDate: "2024-01-25",
      priority: "High",
      project: "Q1 Planning",
      isOverdue: false,
      daysUntilDue: 2,
    },
    {
      id: "2",
      title: "Complete user testing",
      type: "task" as const,
      dueDate: "2024-01-24",
      priority: "Medium",
      project: "Website Redesign",
      isOverdue: false,
      daysUntilDue: 1,
    },
    {
      id: "3",
      title: "Design system documentation",
      type: "task" as const,
      dueDate: "2024-01-22",
      priority: "High",
      project: "Design System",
      isOverdue: true,
      daysUntilDue: -1,
    },
    {
      id: "4",
      title: "Mobile App MVP",
      type: "project" as const,
      dueDate: "2024-01-30",
      priority: "High",
      isOverdue: false,
      daysUntilDue: 7,
    },
  ]);

  const [myTasks, setMyTasks] = useState([
    {
      id: "1",
      title: "Review design mockups",
      priority: "High",
      dueDate: "2024-01-25",
      project: "Website Redesign",
      completed: false,
    },
    {
      id: "2",
      title: "Update project documentation",
      priority: "Medium",
      dueDate: "2024-01-26",
      project: "Mobile App",
      completed: false,
    },
    {
      id: "3",
      title: "Conduct user interviews",
      priority: "High",
      dueDate: "2024-01-24",
      project: "User Research",
      completed: true,
    },
    {
      id: "4",
      title: "Prepare presentation slides",
      priority: "Low",
      dueDate: "2024-01-28",
      project: "Q1 Planning",
      completed: false,
    },
    {
      id: "5",
      title: "Code review for new features",
      priority: "Medium",
      dueDate: "2024-01-27",
      project: "Website Redesign",
      completed: false,
    },
  ]);

  const [activeProjects] = useState([
    {
      id: "1",
      name: "Website Redesign",
      status: "In Progress",
      progress: 75,
      color: "bg-blue-500",
      membersCount: 5,
    },
    {
      id: "2",
      name: "Mobile App Development",
      status: "Planning",
      progress: 25,
      color: "bg-green-500",
      membersCount: 8,
    },
    {
      id: "3",
      name: "Marketing Campaign Q1",
      status: "In Progress",
      progress: 60,
      color: "bg-purple-500",
      membersCount: 4,
    },
    {
      id: "4",
      name: "Design System v2",
      status: "In Progress",
      progress: 90,
      color: "bg-orange-500",
      membersCount: 3,
    },
  ]);

  const toggleTask = (taskId: string) => {
    setMyTasks((tasks) =>
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleCreateTask = () => {
    // In a real app, this would open a task creation modal
    console.log("Create task clicked");
  };

  const handleCreateProject = () => {
    // In a real app, this would navigate to project creation
    window.location.href = "/projects";
  };

  const handleCreateTeam = () => {
    // In a real app, this would navigate to team creation
    window.location.href = "/teams";
  };

  const handleViewAllTasks = () => {
    window.location.href = "/";
  };

  const handleViewAllProjects = () => {
    window.location.href = "/projects";
  };

  function getGreeting(): string {
    const hour = new Date().getHours();

    if (hour < 12) return "Good Morning!";
    if (hour < 18) return "Good Afternoon!";
    return "Good Evening!";
  }

  useEffect(() => {
    setGreeting(getGreeting());
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Home</span>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-6 p-6">
          {/* Welcome Section */}
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              {greeting}
              <Image
                src="/images/p2.png"
                alt="mushroom Logo"
                width={20}
                height={20}
                className="inline-block"
              />
            </h1>
            <p className="text-muted-foreground">
              Here's what's happening with your work today.
            </p>
          </div>

          {/* Dashboard Stats */}
          <DashboardStats stats={stats} />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* My Tasks Preview */}
              <MyTasksPreview
                tasks={myTasks}
                onViewAllTasks={handleViewAllTasks}
                onToggleTask={toggleTask}
              />

              {/* Projects Overview */}
              <ProjectsOverview
                projects={activeProjects}
                onViewAllProjects={handleViewAllProjects}
              />

              {/* Recent Activity */}
              <RecentActivity activities={recentActivities} />
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <QuickActions
                onCreateTask={handleCreateTask}
                onCreateProject={handleCreateProject}
                onCreateTeam={handleCreateTeam}
              />

              {/* Upcoming Deadlines */}
              <UpcomingDeadlines deadlines={upcomingDeadlines} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
