"use client";

import { useState } from "react";
import EmailField from "./EmailField";
import PasswordField from "./PasswordField";
import RememberMe from "./RememberMe";
import FormError from "./FormError";
import { Button } from "@/components/ui/button";

interface FormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

export default function SignInForm() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined, general: undefined }));
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email";

    if (!formData.password) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);

    try {
      await new Promise((res, rej) =>
        setTimeout(() => (Math.random() > 0.3 ? res(true) : rej()), 2000)
      );
      console.log("Signed in:", formData);
    } catch {
      setErrors({ general: "Invalid email or password." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormError message={errors.general} />
      <EmailField
        value={formData.email}
        onChange={(val) => handleChange("email", val)}
        error={errors.email}
      />
      <PasswordField
        value={formData.password}
        onChange={(val) => handleChange("password", val)}
        error={errors.password}
        show={showPassword}
        toggleShow={() => setShowPassword((prev) => !prev)}
      />
      <RememberMe
        checked={formData.rememberMe}
        onChange={(val) => handleChange("rememberMe", val)}
      />
      <Button className="w-full" type="submit" disabled={isLoading}>
        {isLoading ? "Signing in..." : "Sign In"}
      </Button>
      <div className="mt-6 text-center text-sm text-muted-foreground">
        {"Don't have an account? "}
        <button className="text-primary hover:underline font-medium">
          Get started
        </button>
      </div>
    </form>
  );
}
