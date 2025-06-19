"use client";
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import { QuickActions } from "./components/QuickActions"; // Import QuickActions
import { StatsGrid } from "./components/StatCard"; // Import StatsGrid
import { RecentActivity } from "./components/RecentActivity"; // Import RecentActivity
import { TrendingUp, TrendingDown } from "lucide-react";
// Define some mock activity data (replace with dynamic data as needed)
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

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="lg:pl-64">
        <Topbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        {/* Insert QuickActions component */}
        <QuickActions />

        {/* Insert StatsGrid component and pass the stats data */}
        <StatsGrid stats={statsData} />

        {/* Insert RecentActivity component and pass the activity data */}
        <RecentActivity items={activityData} />
      </div>
    </div>
  );
}
