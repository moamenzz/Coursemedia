import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { register, RegisterData } from "../lib/apiRoutes";
import { toast } from "react-toastify";
import { useState } from "react";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";

import ErrorThrower from "../components/ErrorThrower";
import { Checkbox } from "@/components/ui/checkbox";
import useAuthStore from "@/stores/useAuthStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, Github, Sun, Moon, User } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Loader from "@/components/Loader";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { isDark, setIsDark } = useAuthStore();
  const [formData, setFormData] = useState<RegisterData>({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    instructor: false,
  });

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData({ ...formData, instructor: checked });
  };

  const {
    mutate: registerMutation,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: register,
    onError: () => {
      const errorMsg = error?.message || "Unknown Error";
      toast.error(`Login Failed: ${errorMsg}`);
    },
    onSuccess: () => {
      navigate("/");
      toast.success("Registration Successful");
    },
  });

  const toggleDarkMode = () => {
    setIsDark(!isDark);
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 transition-colors duration-300 ${
        isDark
          ? "bg-gradient-to-br from-gray-950 via-slate-950 to-black"
          : "bg-gradient-to-br from-gray-50 to-white"
      }`}
    >
      <div className="w-full max-w-md">
        {/* Dark Mode Toggle */}
        <div className="flex justify-end mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleDarkMode}
            className={`rounded-full p-2 transition-all duration-300 ${
              isDark
                ? "text-gray-400 hover:text-white hover:bg-gray-800/50 border border-gray-800"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            {isDark ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <h1
            className={`text-4xl font-bold transition-all duration-300 ${
              isDark
                ? "text-white bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
                : "text-gray-900"
            }`}
          >
            Coursemedia
          </h1>
          <p
            className={`mt-3 text-lg transition-colors duration-300 ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Welcome back
          </p>
        </div>

        <Card
          className={`shadow-2xl border transition-all duration-300 backdrop-blur-sm ${
            isDark
              ? "bg-gray-900/80 border-gray-700/50 shadow-black/20"
              : "bg-white/90 border-gray-200 shadow-gray-200/50"
          }`}
        >
          <CardHeader className="space-y-1 pb-6">
            <CardTitle
              className={`text-2xl text-center transition-colors duration-300 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Sign in
            </CardTitle>
            <CardDescription
              className={`text-center transition-colors duration-300 ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Social Login Buttons */}
            <div className="space-y-3">
              <Button
                variant="outline"
                className={`w-full h-12 transition-all duration-300 hover:scale-[1.02] ${
                  isDark
                    ? "text-gray-300 border-gray-600 bg-gray-800/50 hover:bg-gray-700/70 hover:text-white hover:border-gray-500"
                    : "text-gray-700 border-gray-300 bg-white hover:bg-gray-50 hover:border-gray-400"
                }`}
                onClick={() =>
                  (window.location.href =
                    "https://coursemedia.onrender.com/auth/google")
                }
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </Button>

              <Button
                variant="outline"
                className={`w-full h-12 transition-all duration-300 hover:scale-[1.02] ${
                  isDark
                    ? "text-gray-300 border-gray-600 bg-gray-800/50 hover:bg-gray-700/70 hover:text-white hover:border-gray-500"
                    : "text-gray-700 border-gray-300 bg-white hover:bg-gray-50 hover:border-gray-400"
                }`}
                onClick={() =>
                  (window.location.href =
                    "https://coursemedia.onrender.com/auth/github")
                }
              >
                <Github className="w-5 h-5 mr-3" />
                Continue with GitHub
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className={isDark ? "bg-gray-600" : "bg-gray-300"} />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span
                  className={`px-2 transition-colors duration-300 ${
                    isDark
                      ? "bg-gray-900 text-gray-400"
                      : "bg-white text-gray-500"
                  }`}
                >
                  Or continue with
                </span>
              </div>
            </div>

            {/* Login Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                registerMutation(formData);
              }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className={`transition-colors duration-300 ${
                    isDark ? "text-gray-200" : "text-gray-900"
                  }`}
                >
                  Email
                </Label>
                <div className="relative">
                  <Mail
                    className={`absolute left-3 top-3.5 h-4 w-4 transition-colors duration-300 ${
                      isDark ? "text-gray-500" : "text-gray-400"
                    }`}
                  />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    className={`pl-10 h-12 transition-all duration-300 focus:scale-[1.02] ${
                      isDark
                        ? "bg-gray-800/70 border-gray-600 text-white placeholder:text-gray-500 focus:border-blue-400 focus:ring-blue-400/20"
                        : "bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500/20"
                    }`}
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div>
                <Label
                  htmlFor="username"
                  className={`transition-colors duration-300 ${
                    isDark ? "text-gray-200" : "text-gray-900"
                  }`}
                >
                  Username
                </Label>
                <div className="relative">
                  <User
                    className={`absolute left-3 top-3.5 h-4 w-4 transition-colors duration-300 ${
                      isDark ? "text-gray-500" : "text-gray-400"
                    }`}
                  />
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="What should we call you?"
                    className={`pl-10 h-12 transition-all duration-300 focus:scale-[1.02] ${
                      isDark
                        ? "bg-gray-800/70 border-gray-600 text-white placeholder:text-gray-500 focus:border-blue-400 focus:ring-blue-400/20"
                        : "bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500/20"
                    }`}
                    value={formData.username}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className={`transition-colors duration-300 ${
                    isDark ? "text-gray-200" : "text-gray-900"
                  }`}
                >
                  Password
                </Label>
                <div className="relative">
                  <Lock
                    className={`absolute left-3 top-3.5 h-4 w-4 transition-colors duration-300 ${
                      isDark ? "text-gray-500" : "text-gray-400"
                    }`}
                  />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    className={`pl-10 h-12 transition-all duration-300 focus:scale-[1.02] ${
                      isDark
                        ? "bg-gray-800/70 border-gray-600 text-white placeholder:text-gray-500 focus:border-blue-400 focus:ring-blue-400/20"
                        : "bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500/20"
                    }`}
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <PasswordStrengthMeter password={formData.password} />

              <div className="space-y-2">
                <Label
                  htmlFor="confirmPassword"
                  className={`transition-colors duration-300 ${
                    isDark ? "text-gray-200" : "text-gray-900"
                  }`}
                >
                  Confirm Password
                </Label>
                <div className="relative">
                  <Lock
                    className={`absolute left-3 top-3.5 h-4 w-4 transition-colors duration-300 ${
                      isDark ? "text-gray-500" : "text-gray-400"
                    }`}
                  />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    className={`pl-10 h-12 transition-all duration-300 focus:scale-[1.02] ${
                      isDark
                        ? "bg-gray-800/70 border-gray-600 text-white placeholder:text-gray-500 focus:border-blue-400 focus:ring-blue-400/20"
                        : "bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500/20"
                    }`}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="instructor"
                  checked={formData.instructor}
                  onCheckedChange={handleCheckboxChange}
                />
                <Label
                  htmlFor="instructor"
                  className={`transition-colors duration-300 ${
                    isDark ? "text-gray-200" : "text-gray-900"
                  }`}
                >
                  Register as an instructor
                </Label>
              </div>

              {isError && <ErrorThrower isError={isError} error={error} />}

              <Button
                type="submit"
                className={`w-full h-12 font-medium transition-all duration-300 hover:scale-[1.02] focus:scale-[1.02] cursor-pointer ${
                  isDark
                    ? "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/25"
                    : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/25"
                }`}
                disabled={
                  isPending ||
                  !formData.email ||
                  !formData.username ||
                  !formData.password ||
                  !formData.confirmPassword ||
                  formData.password !== formData.confirmPassword
                }
              >
                {isPending ? (
                  <div className="flex justify-center items-center">
                    <Loader />
                  </div>
                ) : (
                  "Sign up"
                )}
              </Button>
            </form>

            <div
              className={`font-medium transition-colors duration-300 text-center ${
                isDark
                  ? "text-blue-400 hover:text-blue-300"
                  : "text-blue-600 hover:text-blue-700"
              }`}
            >
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 hover:underline font-medium transition-colors duration-300"
              >
                Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;
