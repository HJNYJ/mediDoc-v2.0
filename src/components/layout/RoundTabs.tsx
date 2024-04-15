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
      className={`focus:outline-none rounded-3xl flex px-2 px-2 mr-2 ${active ? "bg-orange text-white w-[58px] h-[32px] justify-center items-center regular-13" : "border border-gray-300 regular-13 text-gray-800 w-[58px] h-[32px] justify-center items-center"}`}
      onClick={onClick}
    >
      <div className="whitespace-nowrap">{label}</div>
    </button>
  );
};

export default RoundTabs;
