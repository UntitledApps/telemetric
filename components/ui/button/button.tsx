import React from "react";
import LoadingSpinner from "../spinner/spinner";
import "./button.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "secondary" | "text" | "ghost";
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = "default",
  children,
  className,
  loading = false,
  disabled,
  ...props
}) => {
  return (
    <button
      className={`button ${variant} ${loading ? "loading" : ""} ${
        className || ""
      }`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <LoadingSpinner /> : children}
    </button>
  );
};

export default Button;
