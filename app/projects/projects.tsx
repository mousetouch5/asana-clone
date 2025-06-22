"use client";

import { useState } from "react";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "../components/app-sidebar";
import { ProjectForm } from "../components/project-form";
import { ProjectCard } from "../components/project-card";
import { GanttChart } from "../components/gantt-chart";

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

interface Project {
  id: string;
  name: string;
  description: string;
  status: string;
  priority: string;
  startDate: string;
  endDate: string;
  assignedMembers: string[];
  color: string;
  progress: number;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      name: "Website Redesign",
      description:
        "Complete overhaul of the company website with modern design and improved UX",
      status: "In Progress",
      priority: "High",
      startDate: "2024-01-01",
      endDate: "2024-04-15",
      assignedMembers: ["1", "2", "3"],
      color: "bg-blue-500",
      progress: 65,
    },
    {
      id: "2",
      name: "Mobile App Development",
      description: "Native mobile application for iOS and Android platforms",
      status: "Planning",
      priority: "Medium",
      startDate: "2024-02-01",
      endDate: "2024-08-30",
      assignedMembers: ["2", "4", "5"],
      color: "bg-green-500",
      progress: 15,
    },
    {
      id: "3",
      name: "Marketing Campaign Q1",
      description: "Comprehensive marketing strategy for Q1 product launch",
      status: "Completed",
      priority: "High",
      startDate: "2023-12-01",
      endDate: "2024-03-31",
      assignedMembers: ["1", "5"],
      color: "bg-purple-500",
      progress: 100,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const addProject = (projectData: {
    name: string;
    description: string;
    status: string;
    priority: string;
    startDate: string;
    endDate: string;
    assignedMembers: string[];
    color: string;
  }) => {
    const newProject: Project = {
      id: Date.now().toString(),
      ...projectData,
      progress: 0,
    };
    setProjects([newProject, ...projects]);
  };

  const deleteProject = (id: string) => {
    setProjects(projects.filter((project) => project.id !== id));
  };

  const viewGanttChart = (projectId: string) => {
    setSelectedProject(projectId);
  };

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" || project.status === filterStatus;
    const matchesPriority =
      filterPriority === "all" || project.priority === filterPriority;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  if (selectedProject) {
    const project = projects.find((p) => p.id === selectedProject);
    return (
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <div className="p-6">
            <GanttChart
              projectId={selectedProject}
              projectName={project?.name || "Project"}
              onBack={() => setSelectedProject(null)}
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
            <span>Projects</span>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Projects</h1>
              <p className="text-muted-foreground">
                {projects.length} total projects •{" "}
                {projects.filter((p) => p.status === "In Progress").length} in
                progress
              </p>
            </div>
            <ProjectForm onAddProject={addProject} />
          </div>

          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Planning">Planning</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="On Hold">On Hold</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterPriority} onValueChange={setFilterPriority}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
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
            {filteredProjects.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">
                  {searchTerm ||
                  filterStatus !== "all" ||
                  filterPriority !== "all"
                    ? "No projects match your filters"
                    : "No projects yet. Create your first project to get started!"}
                </p>
              </div>
            ) : (
              filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onViewGantt={viewGanttChart}
                  onDeleteProject={deleteProject}
                />
              ))
            )}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
