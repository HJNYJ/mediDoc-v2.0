// 상담내역 상세페이지[3-2-1. 의사 답변이 달리기 전에 질문자 질문만 있는 세부페이지 ]
import ConsultItem from "@/components/consult/ConsultItem";
import React from "react";

const ConsultDetailPage = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      클릭한 질문 : {params.id}
      <ConsultItem />
    </div>
  );
};

export default ConsultDetailPage;
