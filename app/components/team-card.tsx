"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import {
  Users,
  MoreHorizontal,
  Settings,
  UserPlus,
  BarChart3,
  Lock,
  Globe,
  UserCheck,
} from "lucide-react";

interface Team {
  id: string;
  name: string;
  description: string;
  type: string;
  privacy: string;
  members: Array<{ id: string; role: string }>;
  color: string;
  projectsCount: number;
  tasksCompleted: number;
  totalTasks: number;
}

interface TeamCardProps {
  team: Team;
  onViewDetails: (teamId: string) => void;
  onDeleteTeam: (teamId: string) => void;
}

const availableMembers = [
  { id: "1", name: "Alice Johnson", avatar: "AJ" },
  { id: "2", name: "Bob Smith", avatar: "BS" },
  { id: "3", name: "Carol Davis", avatar: "CD" },
  { id: "4", name: "David Wilson", avatar: "DW" },
  { id: "5", name: "Emma Brown", avatar: "EB" },
  { id: "6", name: "Frank Miller", avatar: "FM" },
  { id: "7", name: "Grace Lee", avatar: "GL" },
  { id: "8", name: "Henry Chen", avatar: "HC" },
];

export function TeamCard({ team, onViewDetails, onDeleteTeam }: TeamCardProps) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case "Cross-functional":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Department":
        return "bg-green-100 text-green-800 border-green-200";
      case "Project":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "Committee":
        return "bg-orange-100 text-orange-800 border-orange-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPrivacyIcon = (privacy: string) => {
    switch (privacy) {
      case "Private":
        return <Lock className="h-3 w-3" />;
      case "Public":
        return <Globe className="h-3 w-3" />;
      case "Request to Join":
        return <UserCheck className="h-3 w-3" />;
      default:
        return <Lock className="h-3 w-3" />;
    }
  };

  const memberDetails = team.members
    .map((member) => ({
      ...availableMembers.find((m) => m.id === member.id),
      role: member.role,
    }))
    .filter(Boolean);

  const completionRate =
    team.totalTasks > 0
      ? Math.round((team.tasksCompleted / team.totalTasks) * 100)
      : 0;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-4 h-4 rounded-full ${team.color}`} />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-lg">{team.name}</h3>
                <div className="flex items-center gap-1 text-muted-foreground">
                  {getPrivacyIcon(team.privacy)}
                  <span className="text-xs">{team.privacy}</span>
                </div>
              </div>
              {team.description && (
                <p className="text-sm text-muted-foreground mt-1">
                  {team.description}
                </p>
              )}
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onViewDetails(team.id)}>
                <BarChart3 className="h-4 w-4 mr-2" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="h-4 w-4 mr-2" />
                Team Settings
              </DropdownMenuItem>
              <DropdownMenuItem>
                <UserPlus className="h-4 w-4 mr-2" />
                Add Members
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDeleteTeam(team.id)}
                className="text-red-600"
              >
                Delete Team
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className={getTypeColor(team.type)}>
            {team.type}
          </Badge>
          <Badge variant="outline">
            {team.projectsCount}{" "}
            {team.projectsCount === 1 ? "Project" : "Projects"}
          </Badge>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Task Completion</span>
            <span>
              {team.tasksCompleted}/{team.totalTasks} ({completionRate}%)
            </span>
          </div>
          <Progress value={completionRate} className="h-2" />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {team.members.length} members
            </span>
          </div>

          <div className="flex -space-x-2">
            {memberDetails.slice(0, 4).map((member) => (
              <div
                key={member?.id}
                className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-xs font-medium border-2 border-white"
                title={`${member?.name} (${member?.role})`}
              >
                {member?.avatar}
              </div>
            ))}
            {memberDetails.length > 4 && (
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs font-medium border-2 border-white">
                +{memberDetails.length - 4}
              </div>
            )}
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() => onViewDetails(team.id)}
        >
          View Team Details
        </Button>
      </CardContent>
    </Card>
  );
}
