// PC환경에서만 지원됩니다 div
import React from "react";

const AccessDenied = () => {
  const isMobileEnv = window.matchMedia("(max-width: 768px)").matches;

  if (isMobileEnv) {
    return (
      <div>
        <h2 className="text-lg text-gray font-extrabold">
          PC 환경에서만 지원되는 페이지입니다.
        </h2>
      </div>
    );
  } else {
    return <div>{/* 전체 관리자 마이페이지 출력 */}</div>;
  }
};

export default AccessDenied;
