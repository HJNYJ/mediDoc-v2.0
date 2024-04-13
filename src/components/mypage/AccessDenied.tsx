// PC환경에서만 지원됩니다 div
import React from "react";

const AccessDenied = () => {
  const isMobileEnv = window.matchMedia("(max-width: 768px)").matches;

  if (isMobileEnv) {
    return (
      <div>
        <p className="w-[197px] h-[48px] mx-[96.5px] mt-[280px] text-[20px]  text-gray-400 font-medium">
          PC 환경에서만 지원되는 <br></br>페이지입니다.
        </p>
      </div>
    );
  } else {
    return <div>{/* 전체 관리자 마이페이지 출력 */}</div>;
  }
};

export default AccessDenied;
