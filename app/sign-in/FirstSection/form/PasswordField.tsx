import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Eye, EyeOff } from "lucide-react";

export default function PasswordField({
  value,
  onChange,
  error,
  show,
  toggleShow,
}: {
  value: string;
  onChange: (val: string) => void;
  error?: string;
  show: boolean;
  toggleShow: () => void;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor="password">Password</Label>
      <div className="relative">
        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          id="password"
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter your password"
          className={`pl-10 pr-10 ${error ? "border-red-500" : ""}`}
        />
        <button
          type="button"
          onClick={toggleShow}
          className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
        >
          {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
