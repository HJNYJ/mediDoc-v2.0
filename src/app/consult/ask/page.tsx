// 건강검진 상담 질문/답변 페이지 [3-2. 실시간 상담 제목, 질문, 카테고리, 칩, 사진첨부, 물어보기 버튼]

import AskForm from "@/components/consult/AskForm";
import React from "react";

const AskPage = () => {
  return (
    <div className="relative w-390 h-1115 bg-white">
      <AskForm />
    </div>
  );
};

export default AskPage;
