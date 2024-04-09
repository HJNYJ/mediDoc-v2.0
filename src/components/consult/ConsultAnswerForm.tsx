// 병원 관계자만 볼 수 있는 답변 입력 페이지 (제출 예정)
"use client";

import { supabase } from "@/api/supabase";

import React, { useState } from "react";

const ConsultAnswerForm = () => {
  const [department, setDepartment] = useState(""); //진료과
  const [answer, setAnswer] = useState(""); //답변

  // 진료과 선택
  const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDepartment(e.target.value);
  };

  // 답변
  const handleAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnswer(e.target.value);
  };

  // 데이터 제출
  const handleAnswerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // 수파두파디바 여기에 로직 추가할 예정
    const { data, error } = await supabase
      .from("consult_answer")
      .insert([{ department: department, answer: answer }]);

    if (error) {
      console.error("consultAnswerForm 데이터 추가 실패", error.message);
      return error;
    } else {
      console.log("consultAnswerForm 추가 성공", data);
      return data;
    }
  };

  return (
    <section className="max-w-xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <form className="p-4" onSubmit={handleAnswerSubmit}>
        {/** 병원관계자시에*/}
        <div>
          <select
            value={department}
            onChange={handleDepartmentChange}
            className="w-300 mb-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          >
            <option value="">진료과 선택</option>
            <option value="내과">내과</option>
            <option value="외과">외과</option>
            <option value="치과">치과</option>
            <option value="안과">안과</option>
            <option value="이비인후과">이비인후과</option>
          </select>
          <span className="text-lg font-semibold mb-4 ml-2">답변</span>
        </div>
        <p className="text-sm mb-4">OOO 병원</p>
        <textarea
          maxLength={500}
          value={answer}
          onChange={handleAnswerChange}
          placeholder="답변을 적어주세요."
          className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-yellow-500 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:bg-blue-700 hover:bg-red-400"
        >
          답변하기
        </button>
      </form>
    </section>
  );
};

export default ConsultAnswerForm;
