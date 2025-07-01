import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { forgotPassword } from "../lib/apiRoutes";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Sun, Moon } from "lucide-react";
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

const ForgotPasswordPage = () => {
  const { isDark, setIsDark } = useAuthStore();

  const [email, setEmail] = useState("");
  const {
    mutate: forgotPasswordMutation,
    isPending,
    isError,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: forgotPassword,
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
              Recover account
            </CardTitle>
            <CardDescription
              className={`text-center transition-colors duration-300 ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Enter your account email to get a recovery link
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                forgotPasswordMutation(email);
              }}
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {isSuccess && (
                <div
                  className={`${
                    isDark ? "bg-blue-600 text-blue-400" : " text-black"
                  }text-blue-500 text-sm font-medium bg-emerald-500/10 p-3 rounded text-center`}
                >
                  Recover link has been sent to your email successfully
                </div>
              )}

              {isError && <ErrorThrower isError={isError} error={error} />}

              <Button
                type="submit"
                className={`w-full h-12 font-medium transition-all duration-300 hover:scale-[1.02] focus:scale-[1.02] mt-3 ${
                  isDark
                    ? "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/25"
                    : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/25"
                }`}
                disabled={!email || isPending}
              >
                {isPending ? (
                  <div className="flex justify-center items-center">
                    <Loader />
                  </div>
                ) : (
                  "Recover"
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

export default ForgotPasswordPage;
