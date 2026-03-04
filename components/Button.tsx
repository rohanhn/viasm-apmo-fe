import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  href?: string;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  onClick,
  href,
  className = "",
  type = "button",
}: ButtonProps) {
  // Base styles for all buttons
  const baseStyles = "font-medium rounded-xl transition-all duration-200 inline-flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  // Variant styles following the color system
  const variantStyles = {
    // Primary 500 for main buttons
    primary: "bg-primary-500 text-white shadow-sm hover:bg-primary-400 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:shadow-sm",
    
    // Secondary using Primary 100 background with Primary 500 text
    secondary: "bg-primary-100 text-primary-500 hover:bg-primary-300 hover:text-white shadow-sm hover:-translate-y-0.5 hover:shadow-md active:translate-y-0",
    
    // Outline using Primary 500 for border and text
    outline: "border-2 border-primary-500 text-primary-500 bg-transparent hover:bg-primary-500 hover:text-white hover:-translate-y-0.5 active:translate-y-0",
    
    // Ghost for subtle interactions
    ghost: "text-primary-500 hover:bg-primary-100 hover:text-primary-500 active:bg-primary-300"
  };

  // Size styles
  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2 text-base", 
    lg: "px-6 py-3 text-lg"
  };

  const buttonClasses = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  const content = (
    <>
      {loading && (
        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </>
  );

  // If href is provided, render as Link
  if (href && !disabled) {
    return (
      <a 
        href={href}
        className={buttonClasses}
        onClick={onClick}
      >
        {content}
      </a>
    );
  }

  // Regular button
  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {content}
    </button>
  );
}