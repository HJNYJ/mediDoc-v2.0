"use client";
// 상담내역 상세페이지[3-2-1. 의사 답변이 달리기 전에 질문자 질문만 있는 세부페이지 ]
import { getConsultDetail } from "@/api/supabase";
// import ConsultItem from "@/components/consult/ConsultItem";
import { useQuery } from "@tanstack/react-query";
import React from "react";

// const ConsultDetailPage = ({ params }: { params: { id: string } }) => {
const ConsultDetailPage = ({ params }: { params: { consultId: string } }) => {
  const {
    data: consultDetailData,
    isLoading,
    error
  } = useQuery({
    queryKey: ["consultDetail", params.consultId],
    queryFn: () => getConsultDetail(params.consultId)
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      클릭한 질문 : {params.consultId}
      <p>제목: {consultDetailData?.consult_title}</p>
      <p>내용: {consultDetailData?.consult_content}</p>
      {/* <ConsultItem /> */}
    </div>
  );
};

export default ConsultDetailPage;
