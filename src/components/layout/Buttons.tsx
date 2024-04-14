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
  const height = size === "lg" ? "50px" : "105px";
  const borderRadius = size === "lg" ? "8px" : "15px";
  const bgColor = buttonType === "filled" ? "orange" : "transparent";
  const textColor = buttonType === "filled" ? "white" : "orange";
  const borderColor = buttonType === "hollow" ? "gray-300" : "transparent";
  const borderStyle = buttonType === "hollow" ? "border-2" : "";

  return (
    <button
      type={type || "button"}
      className={`flex flex-row justify-center items-center focus:outline-none w-[358px]
      h-[${height}] rounded-[${borderRadius}] text-${textColor} bg-${bgColor} border-${borderColor} ${borderStyle}
      
      `}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;

// ${active ? "border-orange text-black border-b-4" : "border-gray200 text-gray-400 border-b-2 "}
