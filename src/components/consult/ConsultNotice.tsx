"use client";

// 상담 답변 출력 div (AnswerForm 폼 입력 => consultAnswer에서 출력)
import React from "react";
// import ConsultAnswerForm from "./ConsultAnswerForm";

const ConsultNotice = () => {
  return (
    <section>
      {/* <ConsultAnswerForm /> */}
      <div className="absolute inset-12.5 bg-red-500 flex justify-center items-center">
        <label
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(../assets/notice.png)" }}
        ></label>
      </div>
    </section>
  );
};

export default ConsultNotice;
