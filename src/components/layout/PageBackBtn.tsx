import React from "react";

const PagebackBtn = () => {
  return (
    <div className="w-6 h-6 relative">
      <span className="h-[1px] w-2.5 bg-black absolute bottom-[61%] left-[50%] translate-y-[-50%] translate-x-[-50%] rotate-[-45deg] rounded-full"></span>
      <span className="h-[1px] w-2.5 bg-black absolute top-[61%] left-[50%] translate-y-[-50%] translate-x-[-50%] rotate-45 rounded-full"></span>
    </div>
  );
};

export default PagebackBtn;
