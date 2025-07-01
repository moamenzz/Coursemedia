import { Link, useSearchParams } from "react-router-dom";
import { verifyEmail } from "../lib/apiRoutes";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";
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

const EmailVerificationPage = () => {
  const { isDark, setIsDark } = useAuthStore();

  const [searchParams] = useSearchParams();
  const code = searchParams.get("code") as string;

  const { isSuccess, isPending, error, isError } = useQuery({
    queryKey: ["auth", code],
    queryFn: () => verifyEmail(code ? code : ""),
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
              Email Verification
            </CardTitle>
            <CardDescription
              className={`text-center transition-colors duration-300 ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Email verification is automated.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {isPending ? (
              <div className="w-full flex items-center justify-center">
                <Loader />
              </div>
            ) : (
              <div>
                {isError && <ErrorThrower isError={isError} error={error} />}

                {isSuccess && (
                  <div className="flex flex-col justify-center text-center">
                    <div className="space-y-3">
                      <h1 className="text-md font-semibold text-white text-center">
                        Email verification successful
                      </h1>
                      <div
                        className={`font-medium transition-colors duration-300 text-center ${
                          isDark
                            ? "text-blue-400 hover:text-blue-300"
                            : "text-blue-600 hover:text-blue-700"
                        }`}
                      >
                        Go{" "}
                        <Link
                          to="/"
                          className="text-blue-600 hover:underline font-medium transition-colors duration-300"
                        >
                          Home?
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

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

export default EmailVerificationPage;
