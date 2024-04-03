// 실시간 상담 페이지 [최종적으로 나와야하는 = 부위 카테고리, 모든 게시글 리스트, 카테고리별 리스트, 작성하기 버튼]
"use client";

import ConsultTabs from "@/components/consult/ConsultTabs";
import { useRouter } from "next/navigation";
import React from "react";

const ConsultPage = () => {
  const router = useRouter();

  const goToAskForm = () => {
    router.push(`/consult/ask`);
  };

  return (
    <div className="flex flex-col justify-between">
      <div>
        <ConsultTabs />
      </div>
      <div className="flex justify-center mb-24">
        <button
          onClick={goToAskForm}
          className="px-4 py-2 bg-yellow-500 text-white rounded-md"
        >
          🖋🖋🖋작성
        </button>
      </div>
    </div>
  );
};

export default ConsultPage;
