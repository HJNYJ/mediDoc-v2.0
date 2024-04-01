"use client";

// 상담 질문 출력 div
import React from "react";

const ConsultQuestion = () => {
  return (
    <section>
      {/* DB에 있는 title */}
      <p>질문 제목</p>
      <p>작성자</p>
      <div>질문 내용</div>
      <div>
        <button>해시태그1</button>
        <button>해시태그2</button>
        <button>해시태그3</button>
      </div>
      <hr />
      <div>{/**미완성 or 완성된 답변이 있을 수 있는 곳 */}</div>
    </section>
  );
};

export default ConsultQuestion;
