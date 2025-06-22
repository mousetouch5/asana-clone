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
import { Plus, X } from "lucide-react";

interface TeamFormProps {
  onAddTeam: (team: {
    name: string;
    description: string;
    type: string;
    privacy: string;
    members: Array<{ id: string; role: string }>;
    color: string;
  }) => void;
}

const availableMembers = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice@company.com",
    avatar: "AJ",
    department: "Design",
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob@company.com",
    avatar: "BS",
    department: "Engineering",
  },
  {
    id: "3",
    name: "Carol Davis",
    email: "carol@company.com",
    avatar: "CD",
    department: "Marketing",
  },
  {
    id: "4",
    name: "David Wilson",
    email: "david@company.com",
    avatar: "DW",
    department: "Engineering",
  },
  {
    id: "5",
    name: "Emma Brown",
    email: "emma@company.com",
    avatar: "EB",
    department: "Product",
  },
  {
    id: "6",
    name: "Frank Miller",
    email: "frank@company.com",
    avatar: "FM",
    department: "Sales",
  },
  {
    id: "7",
    name: "Grace Lee",
    email: "grace@company.com",
    avatar: "GL",
    department: "HR",
  },
  {
    id: "8",
    name: "Henry Chen",
    email: "henry@company.com",
    avatar: "HC",
    department: "Engineering",
  },
];

const teamColors = [
  { name: "Blue", value: "bg-blue-500", class: "bg-blue-500" },
  { name: "Green", value: "bg-green-500", class: "bg-green-500" },
  { name: "Purple", value: "bg-purple-500", class: "bg-purple-500" },
  { name: "Orange", value: "bg-orange-500", class: "bg-orange-500" },
  { name: "Red", value: "bg-red-500", class: "bg-red-500" },
  { name: "Pink", value: "bg-pink-500", class: "bg-pink-500" },
  { name: "Indigo", value: "bg-indigo-500", class: "bg-indigo-500" },
  { name: "Teal", value: "bg-teal-500", class: "bg-teal-500" },
];

const roles = ["Team Lead", "Member", "Admin", "Viewer"];

export function TeamForm({ onAddTeam }: TeamFormProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [privacy, setPrivacy] = useState("");
  const [selectedMembers, setSelectedMembers] = useState<
    Array<{ id: string; role: string }>
  >([]);
  const [color, setColor] = useState("bg-blue-500");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onAddTeam({
      name,
      description,
      type: type || "Cross-functional",
      privacy: privacy || "Private",
      members: selectedMembers,
      color,
    });

    // Reset form
    setName("");
    setDescription("");
    setType("");
    setPrivacy("");
    setSelectedMembers([]);
    setColor("bg-blue-500");
    setOpen(false);
  };

  const addMember = (memberId: string) => {
    if (!selectedMembers.find((m) => m.id === memberId)) {
      setSelectedMembers([
        ...selectedMembers,
        { id: memberId, role: "Member" },
      ]);
    }
  };

  const removeMember = (memberId: string) => {
    setSelectedMembers(selectedMembers.filter((m) => m.id !== memberId));
  };

  const updateMemberRole = (memberId: string, role: string) => {
    setSelectedMembers(
      selectedMembers.map((m) => (m.id === memberId ? { ...m, role } : m))
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Team
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Team</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Team Name</Label>
            <Input
              id="name"
              placeholder="Enter team name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe the team's purpose and goals..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Team Type</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select team type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cross-functional">
                    Cross-functional
                  </SelectItem>
                  <SelectItem value="Department">Department</SelectItem>
                  <SelectItem value="Project">Project Team</SelectItem>
                  <SelectItem value="Committee">Committee</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="privacy">Privacy</Label>
              <Select value={privacy} onValueChange={setPrivacy}>
                <SelectTrigger>
                  <SelectValue placeholder="Select privacy" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Private">Private</SelectItem>
                  <SelectItem value="Public">Public</SelectItem>
                  <SelectItem value="Request to Join">
                    Request to Join
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Team Color</Label>
            <div className="flex gap-2 flex-wrap">
              {teamColors.map((colorOption) => (
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

          <div className="space-y-4">
            <Label>Add Team Members</Label>

            {/* Available Members */}
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">
                Available Members
              </Label>
              <div className="border rounded-lg p-3 max-h-40 overflow-y-auto">
                {availableMembers
                  .filter(
                    (member) => !selectedMembers.find((m) => m.id === member.id)
                  )
                  .map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center justify-between py-2"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-sm font-medium">
                          {member.avatar}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{member.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {member.department} • {member.email}
                          </p>
                        </div>
                      </div>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => addMember(member.id)}
                      >
                        Add
                      </Button>
                    </div>
                  ))}
              </div>
            </div>

            {/* Selected Members */}
            {selectedMembers.length > 0 && (
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">
                  Team Members ({selectedMembers.length})
                </Label>
                <div className="space-y-2 border rounded-lg p-3 max-h-60 overflow-y-auto">
                  {selectedMembers.map((selectedMember) => {
                    const member = availableMembers.find(
                      (m) => m.id === selectedMember.id
                    );
                    return member ? (
                      <div
                        key={member.id}
                        className="flex items-center justify-between py-2"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-sm font-medium">
                            {member.avatar}
                          </div>
                          <div>
                            <p className="text-sm font-medium">{member.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {member.department}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Select
                            value={selectedMember.role}
                            onValueChange={(role) =>
                              updateMemberRole(member.id, role)
                            }
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {roles.map((role) => (
                                <SelectItem key={role} value={role}>
                                  {role}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            onClick={() => removeMember(member.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
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
            <Button type="submit">Create Team</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
