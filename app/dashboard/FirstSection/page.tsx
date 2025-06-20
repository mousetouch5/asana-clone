"use client";

import { useState } from "react";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Topbar from "./components/Topbar";
import { AppSidebar } from "./components/app-sidebar";

import { TrendingUp, TrendingDown } from "lucide-react";
import { Search } from "lucide-react";

import { QuickActions } from "./components/QuickActions"; // Import QuickActions
import { StatsGrid } from "./components/StatCard"; // Import StatsGrid
import { RecentActivity } from "./components/RecentActivity"; // Import RecentActivity
interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: string;
  project: string;
  dueDate: string;
}

const activityData = [
  {
    id: 1,
    user: "John Doe",
    action: "Added a new post",
    time: "2 hours ago",
  },
  {
    id: 2,
    user: "Jane Smith",
    action: "Updated their profile",
    time: "1 day ago",
  },
  {
    id: 3,
    user: "Chris Johnson",
    action: "Commented on a post",
    time: "3 days ago",
  },
  {
    id: 4,
    user: "Sarah Lee",
    action: "Liked a post",
    time: "5 days ago",
  },
];

const statsData = [
  {
    title: "Users",
    value: "1,200",
    change: "+5%",
    changeType: "increase",
    icon: TrendingUp, // Example icon
  },
  {
    title: "Sales",
    value: "$34,000",
    change: "-2%",
    changeType: "decrease",
    icon: TrendingDown,
  },
  {
    title: "Revenue",
    value: "$9,500",
    change: "+12%",
    changeType: "increase",
    icon: TrendingUp,
  },
  {
    title: "Bounce Rate",
    value: "45%",
    change: "-3%",
    changeType: "decrease",
    icon: TrendingDown,
  },
];

export default function Dashboard() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SidebarTrigger className="-ml-1" />
        <Topbar />
        {/*
        <Topbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        {/* Insert QuickActions component */}
        <QuickActions />

        {/* Insert StatsGrid component and pass the stats data */}
        <StatsGrid stats={statsData} />

        {/* Insert RecentActivity component and pass the activity data */}
        <RecentActivity items={activityData} />
      </SidebarInset>
    </SidebarProvider>
  );
}
