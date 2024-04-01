// 질문&답변 Textarea (rf ac)

"use client";

import React from "react";

const AskForm = () => {
  return (
    <>
      <section>
        <div>
          <h1>실시간 상담</h1>
        </div>
        <div>
          <label>제목</label>
          <input
            type="text"
            placeholder="예) 이런 증상은 비염인가요?"
            required
          />
        </div>
        <div>
          <label>질문</label>
          <textarea
            placeholder="예) 코가 간지럽고 자꾸 재채기가 나오는데 비염약을 먹어야할까요?"
            maxLength={500}
            required
          />
        </div>
        <p>{/** 입력되는 글자수 */} /500</p>
        <div>
          <label>카테고리</label>
          <select>
            <option disabled selected>
              증상 과목 선택
            </option>
            <option>내과</option>
            <option>외과</option>
            <option>치과</option>
            <option>안과</option>
            <option>이비인후과</option>
          </select>
        </div>
        <div>
          <label>해시태그</label>
          <input type="text" placeholder="#태그는 최대 10개 입니다" />
        </div>
        <button>물어보기</button>
      </section>
    </>
  );
};

export default AskForm;
