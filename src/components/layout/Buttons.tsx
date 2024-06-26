import React from "react";

interface ButtonProps {
  type?: "submit" | "button";
  buttonType?: "filled" | "hollow";
  size?: "base" | "lg";
  label?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  classes?: string;
  clicked?: boolean;
  children?: React.ReactNode;
}

const Button = ({
  type,
  buttonType,
  size = "base",
  label,
  onClick,
  children
}: ButtonProps) => {
  const height = size === "lg" ? "h-[105px]" : "h-[50px]";
  const borderRadius = size === "lg" ? "rounded-[15px]" : "rounded-[8px]";
  const bgColor = buttonType === "filled" ? "bg-orange" : "transparent";
  const textColor = buttonType === "filled" ? "white" : "orange";
  const borderColor = buttonType === "hollow" ? "gray-300" : "transparent";
  const borderStyle = buttonType === "hollow" ? "border-2" : "";
  const flexJustify = size === "lg" ? "start" : "center";

  return (
    <button
      type={type || "button"}
      className={`flex flex-col justify-center items-${flexJustify} focus:outline-none w-full 
      ${height} ${borderRadius} text-${textColor} ${bgColor} border-${borderColor} ${borderStyle}
      `}
      onClick={onClick}
    >
      {label}
      {children}
    </button>
  );
};

export default Button;
