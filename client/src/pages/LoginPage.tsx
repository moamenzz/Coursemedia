import { Link, useNavigate } from "react-router-dom";
import { login, LoginData } from "../lib/apiRoutes";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useState } from "react";
import Button from "../components/Button";
import ErrorThrower from "../components/ErrorThrower";
import Input from "../components/Input";
import { FaEnvelope, FaLock } from "react-icons/fa";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setFormData({ ...formData, [name]: value });
  };

  const {
    mutate: loginMutation,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      toast.success("Login Sucessful");
      navigate("/");
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-700 to-black text-white flex flex-col items-center">
      {/* Header */}
      <div className="w-full p-8 flex justify-center">
        <div className="flex items-center">
          <svg
            className="w-10 h-10 text-white fill-current"
            viewBox="0 0 24 24"
          >
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.8-.179-.92-.6-.12-.418.18-.8.6-.92 4.56-1.021 8.52-.6 11.64 1.32.42.18.48.659.24 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.24 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
          </svg>
          <span className="ml-2 text-2xl font-bold">Spotify</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-md bg-neutral-900 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-8">
          Login To Spotify
        </h1>

        {/* Social Login Buttons */}
        <div className="space-y-4 mb-6">
          <a
            href="http://localhost:3000/auth/google"
            className="w-full py-3 px-4 flex items-center justify-center rounded-full border border-gray-700 hover:border-white transition-colors cursor-pointer"
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
          </a>
          <a
            href=""
            className="w-full py-3 px-4 flex items-center justify-center rounded-full border border-gray-700 hover:border-white transition-colors cursor-pointer"
          >
            <svg
              className="w-5 h-5 mr-3 text-blue-600 fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z" />
            </svg>
            Continue with Facebook
          </a>
          <a
            href="http://localhost:3000/auth/github"
            className="w-full py-3 px-4 flex items-center justify-center rounded-full border border-gray-700 hover:border-white transition-colors cursor-pointer"
          >
            <svg
              aria-hidden="true"
              height="24"
              version="1.1"
              viewBox="0 0 16 16"
              width="24"
              fill="white"
              className="mr-3"
            >
              <path
                fillRule="evenodd"
                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"
              />
            </svg>
            Continue with Github
          </a>
        </div>

        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-neutral-900 text-gray-400">Or</span>
          </div>
        </div>

        {/* Login Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            loginMutation({
              email: formData.email,
              password: formData.password,
            });
          }}
          className="space-y-6"
        >
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              E-Mail Address
            </label>
            <Input
              icon={FaEnvelope}
              id="email"
              type="text"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-3 rounded bg-neutral-800 border border-neutral-700 focus:border-green-500 focus:outline-none"
              placeholder="E-Mail Address"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-2"
            >
              Password
            </label>
            <Input
              icon={FaLock}
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full p-3 rounded bg-neutral-800 border border-neutral-700 focus:border-green-500 focus:outline-none"
              placeholder="Password"
              required
            />
          </div>

          {isError && <ErrorThrower isError={isError} error={error} />}

          <Button
            type="submit"
            disabled={isPending || !formData.email || !formData.password}
            isLoading={isPending}
          >
            Login
          </Button>
        </form>

        <div className="text-center mt-6">
          <Link
            to="/forgot-password"
            className="text-sm text-gray-400 hover:underline"
          >
            Forgot your Password?
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full max-w-md mt-8 text-center">
        <p className="text-gray-400">
          No account yet?{" "}
          <Link to="/register" className="text-white hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
