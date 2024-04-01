// 질문&답변 Textarea

"use client";

import React from "react";

export const AskForm = () => {
  return (
    <>
      <section>
        <div>
          <h1>실시간 상담</h1>
        </div>
        <div>
          <h3>제목</h3>
          <input
            type="text"
            placeholder="예) 이런 증상은 비염인가요?"
            required
          />
        </div>
        <div>
          <h3>질문</h3>
          <textarea
            placeholder="예) 코가 간지럽고 자꾸 재채기가 나오는데 비염약을 먹어야할까요?"
            maxLength={500}
            required
          />
        </div>
        <p>{/** 입력되는 글자수 */} /500</p>
        <div>
          <h3>카테고리</h3>
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
      </section>
    </>
  );
};
