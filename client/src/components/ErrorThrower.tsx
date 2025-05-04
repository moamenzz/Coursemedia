import { FC } from "react";

interface ErrorProps {
  isError: boolean;
  error: {
    message: string;
  };
}

const ErrorThrower: FC<ErrorProps> = ({ isError, error }) => {
  if (!isError || !error) return null;

  return (
    <div className="text-red-500 text-sm font-medium bg-red-500/10 p-3 rounded text-center">
      {error.message}
    </div>
  );
};

export default ErrorThrower;
