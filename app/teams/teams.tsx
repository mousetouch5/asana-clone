"use client";

import { useState } from "react";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "../components/app-sidebar";
import { TeamForm } from "../components/team-form";
import { TeamCard } from "../components/team-card";
import { TeamDetails } from "../components/team-details";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Grid, List } from "lucide-react";

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

export default function Teams() {
  const [teams, setTeams] = useState<Team[]>([
    {
      id: "1",
      name: "Design System Team",
      description:
        "Responsible for maintaining and evolving the company's design system",
      type: "Cross-functional",
      privacy: "Private",
      members: [
        { id: "1", role: "Team Lead" },
        { id: "2", role: "Admin" },
        { id: "3", role: "Member" },
        { id: "4", role: "Member" },
      ],
      color: "bg-blue-500",
      projectsCount: 3,
      tasksCompleted: 163,
      totalTasks: 186,
    },
    {
      id: "2",
      name: "Engineering Team",
      description:
        "Full-stack development team working on core platform features",
      type: "Department",
      privacy: "Public",
      members: [
        { id: "2", role: "Team Lead" },
        { id: "4", role: "Member" },
        { id: "8", role: "Member" },
      ],
      color: "bg-green-500",
      projectsCount: 5,
      tasksCompleted: 89,
      totalTasks: 124,
    },
    {
      id: "3",
      name: "Marketing Team",
      description: "Brand marketing, content creation, and growth initiatives",
      type: "Department",
      privacy: "Request to Join",
      members: [
        { id: "3", role: "Team Lead" },
        { id: "6", role: "Member" },
        { id: "7", role: "Admin" },
      ],
      color: "bg-purple-500",
      projectsCount: 2,
      tasksCompleted: 45,
      totalTasks: 67,
    },
    {
      id: "4",
      name: "Product Strategy",
      description: "Product roadmap planning and strategic initiatives",
      type: "Committee",
      privacy: "Private",
      members: [
        { id: "1", role: "Member" },
        { id: "5", role: "Team Lead" },
      ],
      color: "bg-orange-500",
      projectsCount: 1,
      tasksCompleted: 28,
      totalTasks: 35,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterPrivacy, setFilterPrivacy] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);

  const addTeam = (teamData: {
    name: string;
    description: string;
    type: string;
    privacy: string;
    members: Array<{ id: string; role: string }>;
    color: string;
  }) => {
    const newTeam: Team = {
      id: Date.now().toString(),
      ...teamData,
      projectsCount: 0,
      tasksCompleted: 0,
      totalTasks: 0,
    };
    setTeams([newTeam, ...teams]);
  };

  const deleteTeam = (id: string) => {
    setTeams(teams.filter((team) => team.id !== id));
  };

  const viewTeamDetails = (teamId: string) => {
    setSelectedTeam(teamId);
  };

  const filteredTeams = teams.filter((team) => {
    const matchesSearch =
      team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = filterType === "all" || team.type === filterType;
    const matchesPrivacy =
      filterPrivacy === "all" || team.privacy === filterPrivacy;

    return matchesSearch && matchesType && matchesPrivacy;
  });

  if (selectedTeam) {
    return (
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <div className="p-6">
            <TeamDetails
              teamId={selectedTeam}
              onBack={() => setSelectedTeam(null)}
            />
          </div>
        </SidebarInset>
      </SidebarProvider>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Teams</span>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Teams</h1>
              <p className="text-muted-foreground">
                {teams.length} total teams •{" "}
                {teams.reduce((sum, team) => sum + team.members.length, 0)}{" "}
                total members
              </p>
            </div>
            <TeamForm onAddTeam={addTeam} />
          </div>

          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search teams..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Team Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Cross-functional">
                  Cross-functional
                </SelectItem>
                <SelectItem value="Department">Department</SelectItem>
                <SelectItem value="Project">Project Team</SelectItem>
                <SelectItem value="Committee">Committee</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterPrivacy} onValueChange={setFilterPrivacy}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Privacy" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Privacy</SelectItem>
                <SelectItem value="Private">Private</SelectItem>
                <SelectItem value="Public">Public</SelectItem>
                <SelectItem value="Request to Join">Request to Join</SelectItem>
              </SelectContent>
            </Select>

            <Tabs value={viewMode} onValueChange={setViewMode}>
              <TabsList>
                <TabsTrigger value="grid">
                  <Grid className="h-4 w-4" />
                </TabsTrigger>
                <TabsTrigger value="list">
                  <List className="h-4 w-4" />
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "space-y-4"
            }
          >
            {filteredTeams.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">
                  {searchTerm || filterType !== "all" || filterPrivacy !== "all"
                    ? "No teams match your filters"
                    : "No teams yet. Create your first team to get started!"}
                </p>
              </div>
            ) : (
              filteredTeams.map((team) => (
                <TeamCard
                  key={team.id}
                  team={team}
                  onViewDetails={viewTeamDetails}
                  onDeleteTeam={deleteTeam}
                />
              ))
            )}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
