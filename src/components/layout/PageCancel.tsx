import React from "react";

const PageCancel = () => {
  return (
    <div className="w-5 h-5 relative">
      <span className="h-[1px] w-4 bg-black absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] rotate-45 rounded-full"></span>
      <span className="h-[1px] w-4 bg-black absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] rotate-[-45deg] rounded-full"></span>
    </div>
  );
};

export default PageCancel;
