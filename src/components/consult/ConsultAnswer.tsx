"use client";

// 상담 답변 출력 div
import React from "react";

const ConsultAnswer = () => {
  return (
    <section>
      <div>내과 관련 답변</div>
      <div>
        <label>답변 내용</label>
        <textarea placeholder="예) 결막염인 것 같아보이네요. 가까운 병원으로 한번 내원해주세요." />
      </div>
      <button>답변완료</button>
    </section>
  );
};

export default ConsultAnswer;
