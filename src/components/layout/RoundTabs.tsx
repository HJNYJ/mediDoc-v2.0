import React from "react";

interface TabsPropsType {
  type?: "submit" | "button";
  size?: "base" | "lg";
  text?: string;
  label?: string;
  width?: number;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  classes?: string;
  clicked?: boolean;
  active?: boolean;
}

const RoundTabs = ({ label, onClick, active }: TabsPropsType) => {
  return (
    <button
      className={`focus:outline-none rounded-[20px] flex px-2 mr-2 w-[65px] h-[32px] justify-center items-center regular-13 ${active ? "bg-orange text-white " : "border border-gray-300 text-gray-800"}`}
      onClick={onClick}
    >
      <div className="whitespace-nowrap">{label}</div>
    </button>
  );
};

export default RoundTabs;
