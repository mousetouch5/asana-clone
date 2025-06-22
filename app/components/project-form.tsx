"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Plus, X } from "lucide-react";

interface ProjectFormProps {
  onAddProject: (project: {
    name: string;
    description: string;
    status: string;
    priority: string;
    startDate: string;
    endDate: string;
    assignedMembers: string[];
    color: string;
  }) => void;
}

const teamMembers = [
  { id: "1", name: "Alice Johnson", email: "alice@company.com", avatar: "AJ" },
  { id: "2", name: "Bob Smith", email: "bob@company.com", avatar: "BS" },
  { id: "3", name: "Carol Davis", email: "carol@company.com", avatar: "CD" },
  { id: "4", name: "David Wilson", email: "david@company.com", avatar: "DW" },
  { id: "5", name: "Emma Brown", email: "emma@company.com", avatar: "EB" },
];

const projectColors = [
  { name: "Blue", value: "bg-blue-500", class: "bg-blue-500" },
  { name: "Green", value: "bg-green-500", class: "bg-green-500" },
  { name: "Purple", value: "bg-purple-500", class: "bg-purple-500" },
  { name: "Orange", value: "bg-orange-500", class: "bg-orange-500" },
  { name: "Red", value: "bg-red-500", class: "bg-red-500" },
  { name: "Pink", value: "bg-pink-500", class: "bg-pink-500" },
];

export function ProjectForm({ onAddProject }: ProjectFormProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [assignedMembers, setAssignedMembers] = useState<string[]>([]);
  const [color, setColor] = useState("bg-blue-500");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onAddProject({
      name,
      description,
      status: status || "Planning",
      priority: priority || "Medium",
      startDate,
      endDate,
      assignedMembers,
      color,
    });

    // Reset form
    setName("");
    setDescription("");
    setStatus("");
    setPriority("");
    setStartDate("");
    setEndDate("");
    setAssignedMembers([]);
    setColor("bg-blue-500");
    setOpen(false);
  };

  const toggleMember = (memberId: string) => {
    setAssignedMembers((prev) =>
      prev.includes(memberId)
        ? prev.filter((id) => id !== memberId)
        : [...prev, memberId]
    );
  };

  const removeMember = (memberId: string) => {
    setAssignedMembers((prev) => prev.filter((id) => id !== memberId));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Project Name</Label>
            <Input
              id="name"
              placeholder="Enter project name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe the project goals and objectives..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Planning">Planning</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="On Hold">On Hold</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Project Color</Label>
            <div className="flex gap-2">
              {projectColors.map((colorOption) => (
                <button
                  key={colorOption.value}
                  type="button"
                  className={`w-8 h-8 rounded-full ${colorOption.class} ${
                    color === colorOption.value
                      ? "ring-2 ring-offset-2 ring-gray-400"
                      : ""
                  }`}
                  onClick={() => setColor(colorOption.value)}
                />
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Assign Team Members</Label>
            <div className="border rounded-lg p-3 max-h-40 overflow-y-auto">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center space-x-2 py-1"
                >
                  <input
                    type="checkbox"
                    id={`member-${member.id}`}
                    checked={assignedMembers.includes(member.id)}
                    onChange={() => toggleMember(member.id)}
                    className="rounded"
                  />
                  <div className="flex items-center space-x-2 flex-1">
                    <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-xs font-medium">
                      {member.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{member.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {member.email}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {assignedMembers.length > 0 && (
              <div className="space-y-2">
                <Label className="text-sm">Selected Members:</Label>
                <div className="flex flex-wrap gap-2">
                  {assignedMembers.map((memberId) => {
                    const member = teamMembers.find((m) => m.id === memberId);
                    return member ? (
                      <Badge
                        key={memberId}
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        {member.name}
                        <button
                          type="button"
                          onClick={() => removeMember(memberId)}
                          className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ) : null;
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Create Project</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
