import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "primary" | "secondary";
}

const Button: React.FC<ButtonProps> = ({
  variant = "default",
  children,
  ...props
}) => {
  const baseStyles = "px-4 py-2 rounded focus:outline-none";
  const variantStyles = {
    default: "bg-gray-300 text-black",
    primary: "bg-blue-500 text-white",
    secondary: "bg-gray-500 text-white",
  };

  return (
    <button className={`${baseStyles} ${variantStyles[variant]}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
