import { LucideIcon } from "lucide-react";

export interface DashboardStats {
  title: string;
  value: string | number;
  change: string;
  changeType: "increase" | "decrease";
  icon: LucideIcon;
}
