"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";

interface GanttTask {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  progress: number;
  assignee: string;
  priority: string;
  dependencies?: string[];
}

interface GanttChartProps {
  projectId: string;
  projectName: string;
  onBack: () => void;
}

const sampleTasks: GanttTask[] = [
  {
    id: "1",
    name: "Project Planning & Requirements",
    startDate: "2024-01-01",
    endDate: "2024-01-15",
    progress: 100,
    assignee: "Alice Johnson",
    priority: "High",
  },
  {
    id: "2",
    name: "UI/UX Design",
    startDate: "2024-01-10",
    endDate: "2024-02-05",
    progress: 75,
    assignee: "Bob Smith",
    priority: "High",
    dependencies: ["1"],
  },
  {
    id: "3",
    name: "Frontend Development",
    startDate: "2024-01-25",
    endDate: "2024-03-15",
    progress: 45,
    assignee: "Carol Davis",
    priority: "Medium",
    dependencies: ["2"],
  },
  {
    id: "4",
    name: "Backend Development",
    startDate: "2024-02-01",
    endDate: "2024-03-20",
    progress: 30,
    assignee: "David Wilson",
    priority: "Medium",
    dependencies: ["1"],
  },
  {
    id: "5",
    name: "Testing & QA",
    startDate: "2024-03-10",
    endDate: "2024-04-05",
    progress: 0,
    assignee: "Emma Brown",
    priority: "High",
    dependencies: ["3", "4"],
  },
  {
    id: "6",
    name: "Deployment & Launch",
    startDate: "2024-04-01",
    endDate: "2024-04-15",
    progress: 0,
    assignee: "Alice Johnson",
    priority: "High",
    dependencies: ["5"],
  },
];

export function GanttChart({
  projectId,
  projectName,
  onBack,
}: GanttChartProps) {
  const [tasks] = useState<GanttTask[]>(sampleTasks);

  // Calculate date range for the chart
  const allDates = tasks.flatMap((task) => [
    new Date(task.startDate),
    new Date(task.endDate),
  ]);
  const minDate = new Date(Math.min(...allDates.map((d) => d.getTime())));
  const maxDate = new Date(Math.max(...allDates.map((d) => d.getTime())));

  // Generate months for the header
  const months: Date[] = [];
  const current = new Date(minDate.getFullYear(), minDate.getMonth(), 1);
  while (current <= maxDate) {
    months.push(new Date(current));
    current.setMonth(current.getMonth() + 1);
  }

  // Calculate position and width for each task bar
  const getTaskBarStyle = (task: GanttTask) => {
    const startDate = new Date(task.startDate);
    const endDate = new Date(task.endDate);
    const totalDays = Math.ceil(
      (maxDate.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    const startOffset = Math.ceil(
      (startDate.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    const duration = Math.ceil(
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    const left = (startOffset / totalDays) * 100;
    const width = (duration / totalDays) * 100;

    return { left: `${left}%`, width: `${width}%` };
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-500";
      case "Medium":
        return "bg-yellow-500";
      case "Low":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Projects
        </Button>
        <div>
          <h1 className="text-2xl font-bold">{projectName} - Gantt Chart</h1>
          <p className="text-muted-foreground">
            Project timeline and task dependencies
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Project Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              {/* Timeline Header */}
              <div className="flex border-b">
                <div className="w-80 p-4 font-medium border-r">Task</div>
                <div className="flex-1 relative">
                  <div className="flex">
                    {months.map((month, index) => (
                      <div
                        key={index}
                        className="flex-1 p-2 text-center text-sm font-medium border-r last:border-r-0"
                      >
                        {month.toLocaleDateString("en-US", {
                          month: "short",
                          year: "numeric",
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Task Rows */}
              {tasks.map((task, index) => (
                <div
                  key={task.id}
                  className={`flex ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <div className="w-80 p-4 border-r">
                    <div className="space-y-2">
                      <div className="font-medium text-sm">{task.name}</div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {task.assignee}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            task.priority === "High"
                              ? "border-red-200 text-red-800"
                              : task.priority === "Medium"
                              ? "border-yellow-200 text-yellow-800"
                              : "border-green-200 text-green-800"
                          }`}
                        >
                          {task.priority}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {task.progress}% complete
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 relative p-4">
                    <div className="relative h-8">
                      {/* Task Bar */}
                      <div
                        className={`absolute top-1 h-6 ${getPriorityColor(
                          task.priority
                        )} rounded opacity-80`}
                        style={getTaskBarStyle(task)}
                      >
                        {/* Progress Bar */}
                        <div
                          className="h-full bg-black bg-opacity-20 rounded"
                          style={{ width: `${task.progress}%` }}
                        />
                      </div>

                      {/* Task Label */}
                      <div
                        className="absolute top-1 text-xs text-white font-medium px-2 py-1 truncate"
                        style={getTaskBarStyle(task)}
                      >
                        {task.name}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="mt-6 flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded" />
              <span>High Priority</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-500 rounded" />
              <span>Medium Priority</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded" />
              <span>Low Priority</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-black bg-opacity-20 rounded" />
              <span>Progress</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
