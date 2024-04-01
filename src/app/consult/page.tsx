// 실시간 상담 페이지 [최종적으로 나와야하는 = 부위 카테고리, 모든 게시글 리스트, 카테고리별 리스트, 작성하기 버튼]
"use client";

import { useRouter } from "next/navigation";
import React from "react";

const ConsultPage = () => {
  const router = useRouter();

  const goToAskForm = () => {
    router.push(`/consult/ask`);
  };

  return (
    <div>
      <button onClick={goToAskForm}>🖋🖋🖋작성</button>
    </div>
  );
};

export default ConsultPage;
