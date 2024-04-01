"use client";

// 상담 내역 1개
import React from "react";
import ConsultQuestion from "./ConsultQuestion";

const ConsultItem = () => {
  return (
    <section>
      <ConsultQuestion />
      <div>
        {/** 데이터 가져오는 곳 */}
        <p>내과 답변</p>
        <p>홍길동 의사</p>
        <div>답변 내용 ...... </div>
      </div>
      <div>
        <label>⭐ 꼭 확인해주세요. ⭐</label>
        <ul>
          <li>자세한 사항은 직접 내원해주세요.</li>
          <li>병원에 문의 부탁드립니다.</li>
          <li>병원에 문의 부탁드립니다.</li>
        </ul>
      </div>
    </section>
  );
};

export default ConsultItem;
