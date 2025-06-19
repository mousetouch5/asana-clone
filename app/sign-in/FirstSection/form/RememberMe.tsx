import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function RememberMe({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (val: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <Checkbox
          id="rememberMe"
          checked={checked}
          onCheckedChange={onChange}
        />
        <Label htmlFor="rememberMe" className="text-sm cursor-pointer">
          Remember me
        </Label>
      </div>
      <button
        type="button"
        className="text-sm text-primary hover:underline font-medium"
      >
        Forgot password?
      </button>
    </div>
  );
}
