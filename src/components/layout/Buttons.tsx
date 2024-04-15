import React from "react";

interface ButtonProps {
  type?: "submit" | "button";
  buttonType?: "filled" | "hollow";
  size?: "base" | "lg";
  text?: string;
  height?: string;
  label?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  classes?: string;
  clicked?: boolean;
  children: any;
}

const Button = ({
  type,
  buttonType,
  size = "base",
  label,
  onClick
}: ButtonProps) => {
  const height = size === "lg" ? "h-[105px]" : "h-[50px]";
  const borderRadius = size === "lg" ? "rounded-[15px]" : "rounded-[8px]";
  const bgColor = buttonType === "filled" ? "bg-orange" : "transparent";
  const textColor = buttonType === "filled" ? "white" : "orange";
  const borderColor = buttonType === "hollow" ? "gray-300" : "transparent";
  const borderStyle = buttonType === "hollow" ? "border-2" : "";

  return (
    <button
      type={type || "button"}
      className={`flex flex-row justify-center items-center focus:outline-none w-[358px] mx-[16px]
      ${height} ${borderRadius} text-${textColor} ${bgColor} border-${borderColor} ${borderStyle}
      
      `}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
