import React from "react";

const PagebackBtn = () => {
  return (
    <div className="w-5 h-5 relative">
      <span className="h-[1px] w-2 bg-black absolute bottom-[64%] left-[50%] translate-y-[-50%] translate-x-[-50%] rotate-[-45deg] rounded-full"></span>
      <span className="h-[1px] w-2 bg-black absolute top-[64%] left-[50%] translate-y-[-50%] translate-x-[-50%] rotate-45 rounded-full"></span>
    </div>
  );
};

export default PagebackBtn;
