"use client";

// 상담 답변 출력 div (AnswerForm 폼 입력 => consultAnswer에서 출력)
import React from "react";
// import ConsultAnswerForm from "./ConsultAnswerForm";

const ConsultNotice = () => {
  return (
    <section className="max-w-xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      {/* <ConsultAnswerForm /> */}
      <div className="p-4 border-b">
        <label className="text-lg font-semibold">⭐ 꼭 확인해주세요. ⭐</label>
        <ul className="list-disc list-inside">
          <li className="mb-2">자세한 사항은 직접 내원해주세요.</li>
          <li className="mb-2">병원에 문의 부탁드립니다.</li>
          <li className="mb-2">병원에 문의 부탁드립니다.</li>
        </ul>
      </div>
    </section>
  );
};

export default ConsultNotice;
