import { ButtonHTMLAttributes, FC, ReactNode } from "react";
import Loader from "./Loader";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  isLoading?: boolean;
  disabled?: boolean;
  type?: "submit" | "reset" | "button";
  children: ReactNode;
}

const Button: FC<ButtonProps> = ({
  className,
  isLoading,
  disabled,
  type,
  children,
  ...props
}) => {
  const baseStyles =
    "w-full py-3 px-4 font-bold rounded-lg shadow-lg bg-green-500 text-white transition duration-200";
  const activeStyles =
    "hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 cursor-pointer";
  const disabledStyles = "opacity-50 cursor-not-allowed";

  return (
    <button
      className={`${baseStyles} ${
        disabled || isLoading ? disabledStyles : activeStyles
      } ${className}`}
      disabled={disabled || isLoading}
      type={type}
      {...props}
    >
      {isLoading ? <Loader /> : children}
    </button>
  );
};

export default Button;
