import React from "react";
import { cn } from "~/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  text?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  className,
  text,
}) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      <div className="relative">
        <div
          className={cn(
            "border-4 border-primary-100 border-t-transparent rounded-full animate-spin",
            sizeClasses[size]
          )}
        ></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src="/assets/icons/travelisto-logo-blue.svg"
            alt="Loading"
            className={cn(
              size === "sm" ? "w-3 h-3" : size === "md" ? "w-4 h-4" : "w-6 h-6"
            )}
          />
        </div>
      </div>
      {text && (
        <p className="text-gray-100 text-sm font-medium text-center">{text}</p>
      )}
    </div>
  );
};
