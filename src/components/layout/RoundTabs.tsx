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
      className={`focus:outline-none rounded-3xl flex px-2 px-2 mr-2 ${active ? "bg-orange text-white" : "bg-gray-200 text-gray-600"}`}
      onClick={onClick}
    >
      <div className="whitespace-nowrap">{label}</div>
    </button>
  );
};

export default RoundTabs;
