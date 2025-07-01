import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { resetPassword } from "../lib/apiRoutes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sun, Moon, Lock } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ErrorThrower from "../components/ErrorThrower";
import useAuthStore from "@/stores/useAuthStore";
import Loader from "@/components/Loader";
import { useState } from "react";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const { isDark, setIsDark } = useAuthStore();

  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const handleChangeInput = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setFormData({ ...formData, [name]: value });
  };
  const {
    mutate: resetPasswordMutation,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      navigate("/login");
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

        {/* Main Content */}
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
              Change Password
            </CardTitle>
            <CardDescription
              className={`text-center transition-colors duration-300 ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Enter and confirm your new password
            </CardDescription>
          </CardHeader>

          {/* Form */}
          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                resetPasswordMutation({
                  password: formData.password,
                  confirmPassword: formData.confirmPassword,
                  code: code ? code : "",
                });
              }}
            >
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
                    onChange={handleChangeInput}
                  />
                </div>
              </div>

              <div className="space-y-2 mt-4">
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
                    onChange={handleChangeInput}
                  />
                </div>
              </div>

              {isError && <ErrorThrower isError={isError} error={error} />}

              <Button
                type="submit"
                className={`w-full h-12 font-medium transition-all duration-300 hover:scale-[1.02] focus:scale-[1.02] mt-3 ${
                  isDark
                    ? "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/25"
                    : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/25"
                }`}
                disabled={
                  isPending ||
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
                  "Reset"
                )}
              </Button>
            </form>
            {/* Footer */}
            <div
              className={`font-medium transition-colors duration-300 text-center ${
                isDark
                  ? "text-blue-400 hover:text-blue-300"
                  : "text-blue-600 hover:text-blue-700"
              }`}
            >
              Back to{" "}
              <Link
                to="/login"
                className="text-blue-600 hover:underline font-medium transition-colors duration-300"
              >
                Login?
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
