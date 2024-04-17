import React from "react";

interface TabProps {
  type?: "submit" | "button";
  size?: "base" | "lg";
  text?: string;
  label?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  classes?: string;
  clicked?: boolean;
  active?: boolean;
  children?: any;
}

const Tab = ({ type, label, text, onClick, active, children }: TabProps) => {
  return (
    <button
      type={type || "button"}
      className={`flex flex-row justify-center items-center focus:outline-none w-[33.333%]
    h-[35px] ${text} gap-[4px] 
    ${active ? "border-orange text-black border-b-4" : "border-gray200 text-gray-400 border-b-2 "}
    `}
      onClick={onClick}
    >
      {label}
      {children}
    </button>
  );
};

export default Tab;
