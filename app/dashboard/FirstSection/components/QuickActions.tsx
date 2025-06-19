import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, BarChart3, Settings, Activity } from "lucide-react";

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Common tasks and shortcuts</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" className="h-20 flex-col">
            <Users className="h-6 w-6 mb-2" />
            Add User
          </Button>
          <Button variant="outline" className="h-20 flex-col">
            <BarChart3 className="h-6 w-6 mb-2" />
            View Reports
          </Button>
          <Button variant="outline" className="h-20 flex-col">
            <Settings className="h-6 w-6 mb-2" />
            Settings
          </Button>
          <Button variant="outline" className="h-20 flex-col">
            <Activity className="h-6 w-6 mb-2" />
            Analytics
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
