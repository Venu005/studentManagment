"use client";

import React, { useState } from "react";
import { Eye, EyeOff, Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import useUserStore from "@/store/useStore";

export default function SignIn() {
  const [email, setEmail] = useState("123@gmail.com");
  const [password, setPassword] = useState("iamhappy123");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const setUser = useUserStore((state) => state.setUser);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const teacherData = {
      email,
      password,
    };
    try {
      const res = await axios.post("/api/auth/login", teacherData);
      if (res.status === 200) {
        const data = res.data.data;

        localStorage.setItem("token", data.token);
        setUser(data.teacher);
        toast({
          title: "Success",
          description: "Logged in successfully",
        });
        router.replace("/students");
        setSubmitting(false);
      } else {
        setErrorMessage(res.data.data.error);
        toast({
          title: "Error",
          description: res.data.data.error,
        });
      }
      setEmail("");
      setPassword("");
    } catch (error: any) {
      setErrorMessage(error.response?.data?.error || "An error occurred");
      toast({
        title: "Error",
        description: error.response?.data?.error || "An error occurred",
      });
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Sign in</CardTitle>
          <CardDescription>
            Enter your details to sign in to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="m@example.com"
                type="email"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            <Button className="w-full" type="submit">
              {submitting ? (
                <Loader2Icon className="animate-spin size-4" />
              ) : (
                <div>Sign in</div>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
