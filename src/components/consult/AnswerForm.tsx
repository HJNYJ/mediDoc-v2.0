import React from "react";

// 병원 관계자가 폼 입력해야하는 페이지

const AnswerForm = () => {
  return (
    <section>
      <div>내과 관련 답변하기</div>
      <div>
        <label>답변 내용 입력</label>
        <textarea placeholder="예) 결막염인 것 같아보이네요. 가까운 병원으로 한번 내원해주세요." />
      </div>
      <button>답변완료</button>
    </section>
  );
};

export default AnswerForm;
