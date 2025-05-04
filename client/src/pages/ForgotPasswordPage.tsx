import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { IoMail } from "react-icons/io5";
import { forgotPassword } from "../lib/apiRoutes";
import Input from "../components/Input";
import { useState } from "react";
import Button from "../components/Button";
import ErrorThrower from "../components/ErrorThrower";

const ForgotPasswordPage = () => {
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
          Recover your password
        </h1>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-neutral-900 text-gray-400"></span>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            forgotPasswordMutation(email);
          }}
        >
          <Input
            icon={IoMail}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            type="email"
            placeholder="Email Address"
          />
          {isSuccess && (
            <div className="text-green-500 text-sm font-medium bg-emerald-500/10 p-3 rounded text-center">
              Recover link has been sent to your email successfully
            </div>
          )}
          {isError && <ErrorThrower isError={isError} error={error} />}
          <Button
            type="submit"
            isLoading={isPending}
            disabled={isPending || !email}
          >
            Recover
          </Button>
        </form>
      </div>

      {/* Footer */}
      <div className="w-full max-w-md mt-8 text-center">
        <p className="text-gray-400">
          Back to{" "}
          <Link to="/login" className="text-white hover:underline">
            Login?
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
