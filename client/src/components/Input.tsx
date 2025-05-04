import { FC, ComponentType, InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon: ComponentType<{ className?: string }>;
  type: "text" | "email" | "password";
  name: string;
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  className?: string;
}

const Input: FC<InputProps> = ({ icon: Icon, ...props }) => {
  return (
    <div className="relative mb-6">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Icon className="size-4.5 text-white" />
      </div>
      <input
        {...props}
        className="w-full pl-10 pr-3 py-2 rounded bg-neutral-800 border border-neutral-700 focus:border-green-500 focus:outline-none"
      />
    </div>
  );
};
export default Input;
