"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  ArrowLeft,
  Users,
  FolderOpen,
  CheckSquare,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Crown,
  Shield,
  Eye,
  User,
} from "lucide-react";

interface TeamDetailsProps {
  teamId: string;
  onBack: () => void;
}

const availableMembers = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice@company.com",
    avatar: "AJ",
    department: "Design",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    joinDate: "2023-01-15",
    tasksCompleted: 45,
    totalTasks: 52,
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob@company.com",
    avatar: "BS",
    department: "Engineering",
    phone: "+1 (555) 234-5678",
    location: "Austin, TX",
    joinDate: "2023-02-20",
    tasksCompleted: 38,
    totalTasks: 41,
  },
  {
    id: "3",
    name: "Carol Davis",
    email: "carol@company.com",
    avatar: "CD",
    department: "Marketing",
    phone: "+1 (555) 345-6789",
    location: "New York, NY",
    joinDate: "2023-03-10",
    tasksCompleted: 29,
    totalTasks: 35,
  },
  {
    id: "4",
    name: "David Wilson",
    email: "david@company.com",
    avatar: "DW",
    department: "Engineering",
    phone: "+1 (555) 456-7890",
    location: "Seattle, WA",
    joinDate: "2023-01-30",
    tasksCompleted: 51,
    totalTasks: 58,
  },
];

const sampleTeam = {
  id: "1",
  name: "Design System Team",
  description:
    "Responsible for maintaining and evolving the company's design system and component library",
  type: "Cross-functional",
  privacy: "Private",
  color: "bg-blue-500",
  members: [
    { id: "1", role: "Team Lead" },
    { id: "2", role: "Admin" },
    { id: "3", role: "Member" },
    { id: "4", role: "Member" },
  ],
  projects: [
    {
      id: "1",
      name: "Component Library v2.0",
      status: "In Progress",
      progress: 75,
    },
    {
      id: "2",
      name: "Design Token Migration",
      status: "Planning",
      progress: 25,
    },
    {
      id: "3",
      name: "Accessibility Audit",
      status: "Completed",
      progress: 100,
    },
  ],
  recentActivity: [
    {
      id: "1",
      user: "Alice Johnson",
      action: "completed task",
      item: "Button component redesign",
      time: "2 hours ago",
    },
    {
      id: "2",
      user: "Bob Smith",
      action: "created project",
      item: "Design Token Migration",
      time: "1 day ago",
    },
    {
      id: "3",
      user: "Carol Davis",
      action: "updated",
      item: "Team documentation",
      time: "2 days ago",
    },
    {
      id: "4",
      user: "David Wilson",
      action: "completed task",
      item: "Icon library cleanup",
      time: "3 days ago",
    },
  ],
};

export function TeamDetails({ teamId, onBack }: TeamDetailsProps) {
  const [activeTab, setActiveTab] = useState("overview");

  const team = sampleTeam; // In real app, fetch by teamId

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "Team Lead":
        return <Crown className="h-4 w-4 text-yellow-600" />;
      case "Admin":
        return <Shield className="h-4 w-4 text-blue-600" />;
      case "Viewer":
        return <Eye className="h-4 w-4 text-gray-600" />;
      default:
        return <User className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Planning":
        return "bg-yellow-100 text-yellow-800";
      case "Completed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const teamMembers = team.members
    .map((member) => ({
      ...availableMembers.find((m) => m.id === member.id),
      role: member.role,
    }))
    .filter(Boolean);

  const totalTasks = teamMembers.reduce(
    (sum, member) => sum + (member?.totalTasks || 0),
    0
  );
  const completedTasks = teamMembers.reduce(
    (sum, member) => sum + (member?.tasksCompleted || 0),
    0
  );
  const teamProgress =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Teams
        </Button>
        <div className="flex items-center gap-3">
          <div className={`w-6 h-6 rounded-full ${team.color}`} />
          <div>
            <h1 className="text-2xl font-bold">{team.name}</h1>
            <p className="text-muted-foreground">{team.description}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{team.members.length}</p>
                <p className="text-sm text-muted-foreground">Team Members</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <FolderOpen className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{team.projects.length}</p>
                <p className="text-sm text-muted-foreground">Active Projects</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckSquare className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">{completedTasks}</p>
                <p className="text-sm text-muted-foreground">Tasks Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">{teamProgress}%</p>
                <p className="text-sm text-muted-foreground">Team Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Team Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Overall Completion</span>
                    <span>
                      {completedTasks}/{totalTasks} tasks
                    </span>
                  </div>
                  <Progress value={teamProgress} className="h-3" />
                </div>

                <div className="space-y-3">
                  {teamMembers.map((member) => {
                    const memberProgress =
                      member?.tasksCompleted != null && member?.totalTasks
                        ? Math.round(
                            (member.tasksCompleted / member.totalTasks) * 100
                          )
                        : 0;
                    return (
                      <div key={member?.id} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>{member?.name}</span>
                          <span>
                            {member?.tasksCompleted}/{member?.totalTasks}
                          </span>
                        </div>
                        <Progress value={memberProgress} className="h-2" />
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {team.recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs">
                          {activity.user
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm">
                          <span className="font-medium">{activity.user}</span>{" "}
                          {activity.action}{" "}
                          <span className="font-medium">{activity.item}</span>
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="members" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {teamMembers.map((member) => (
              <Card key={member?.id}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback>{member?.avatar}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{member?.name}</h3>
                        {getRoleIcon(member?.role || "")}
                        <Badge variant="outline" className="text-xs">
                          {member?.role}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {member?.department}
                      </p>

                      <div className="mt-3 space-y-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Mail className="h-4 w-4" />
                          {member?.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Phone className="h-4 w-4" />
                          {member?.phone}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          {member?.location}
                        </div>
                      </div>

                      <div className="mt-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Task Progress</span>
                          <span>
                            {member?.tasksCompleted}/{member?.totalTasks}
                          </span>
                        </div>
                        <Progress
                          value={
                            member?.tasksCompleted != null && member?.totalTasks
                              ? (member.tasksCompleted / member.totalTasks) *
                                100
                              : 0
                          }
                          className="h-2"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="projects" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {team.projects.map((project) => (
              <Card key={project.id}>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold">{project.name}</h3>
                      <Badge
                        variant="outline"
                        className={getStatusColor(project.status)}
                      >
                        {project.status}
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <div className="space-y-4">
                {team.recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-4 pb-4 border-b last:border-b-0"
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>
                        {activity.user
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-medium">{activity.user}</span>{" "}
                        {activity.action}{" "}
                        <span className="font-medium">{activity.item}</span>
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
