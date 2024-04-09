"use client";

// 상담 답변 출력 div (AnswerForm 폼 입력 => consultAnswer에서 출력)
import React from "react";

const ConsultAnswer = () => {
  return (
    <section>
      <form>
        {/** 데이터 가져와서 보여주기 */}
        <p>내과 답변</p>
        <p>OOO 의사</p>
        <div> 물을 많이 드셔야해요. 요즘 미세먼지가 넘 많아영 홍홍홍 </div>
      </form>
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

export default ConsultAnswer;
