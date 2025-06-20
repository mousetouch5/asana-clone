"use client";

import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";

import { TrendingUp, TrendingDown } from "lucide-react";

import { QuickActions } from "./components/QuickActions";
import { StatsGrid } from "./components/StatCard";
import { RecentActivity } from "./components/RecentActivity";

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
    changeType: "increase" as const,
    icon: TrendingUp,
  },
  {
    title: "Sales",
    value: "$34,000",
    change: "-2%",
    changeType: "decrease" as const,
    icon: TrendingDown,
  },
  {
    title: "Revenue",
    value: "$9,500",
    change: "+12%",
    changeType: "increase" as const,
    icon: TrendingUp,
  },
  {
    title: "Bounce Rate",
    value: "45%",
    change: "-3%",
    changeType: "decrease" as const,
    icon: TrendingDown,
  },
];

export default function Dashboard() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4">
          <QuickActions />
          <StatsGrid stats={statsData} />
          <RecentActivity items={activityData} />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
