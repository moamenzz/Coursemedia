import { FC } from "react";

interface LoaderProps {
  className?: string;
}

const Loader: FC = ({ className }: LoaderProps) => {
  return (
    <span className={`loading loading-spinner loading-lg ${className} `}></span>
  );
};

export default Loader;
