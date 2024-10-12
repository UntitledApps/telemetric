import React from "react";
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
      {loading ? <p>Loading...</p> : children}
    </button>
  );
};

export default Button;
