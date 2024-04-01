// 증상 div
import React from "react";

const Symptoms = () => {
  return (
    <>
      <div className="flex flex-col">
        <h2>아래 증상 중 해당되는 것이 있다면 선택해주세요.</h2>
        <h6>중복 선택이 가능합니다.</h6>
      </div>
      <div>
        <label className="flex flex-col">
          이명이 들리시나요?
          <input type="checkbox" />
        </label>
      </div>
      <div>
        <label>
          귀에 통증이 있으신가요?
          <input type="checkbox" />
        </label>
      </div>
      <div>
        <label>
          듣는 데에 어려움이 있으신가요?
          <input type="checkbox" />
        </label>
      </div>
      <div>
        <label>
          어지러움을 느끼시나요?
          <input type="checkbox" />
        </label>
      </div>
      <div>
        <label>
          구토감을 느끼시나요?
          <input type="checkbox" />
        </label>
      </div>
      <div>
        <label>
          땀이 많이 나시나요?
          <input type="checkbox" />
        </label>
      </div>
      <div>
        <label>
          귀에 분비물이 생기시나요?
          <input type="checkbox" />
        </label>
      </div>
      <div>
        <label>
          귀가 간지러우신가요?
          <input type="checkbox" />
        </label>
      </div>
      <div>
        <label>
          열이 나시나요?
          <input type="checkbox" />
        </label>
      </div>
      <div>
        <label>
          머리가 아프신가요?
          <input type="checkbox" />
        </label>
      </div>
      <div>
        <label>
          귀에서 냄새가 나시나요?
          <input type="checkbox" />
        </label>
      </div>
      <button>다음</button>
    </>
  );
};

export default Symptoms;
