import * as React from "react";
import { cn } from "~/lib/utils";

interface ChipProps {
  text: string;
  className?: string;
  variant?: "default" | "pink" | "success" | "primary" | "navy" | "yellow";
}

const Chip: React.FC<ChipProps> = ({
  text,
  className,
  variant = "default",
}) => {
  const baseClasses =
    "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium";

  const variantClasses = {
    default: "bg-gray-100 text-gray-800",
    pink: "bg-pink-50 text-pink-500",
    success: "bg-green-50 text-green-700",
    primary: "bg-blue-50 text-blue-500",
    navy: "bg-slate-50 text-slate-500",
    yellow: "bg-yellow-50 text-yellow-700",
  };

  return (
    <span className={cn(baseClasses, variantClasses[variant], className)}>
      {text}
    </span>
  );
};

interface ChipListProps {
  children: React.ReactNode;
  className?: string;
}

const ChipList: React.FC<ChipListProps> = ({ children, className }) => {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>{children}</div>
  );
};

export { Chip, ChipList };
