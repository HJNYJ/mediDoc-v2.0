// 병원 관계자만 볼 수 있는 답변 입력 페이지 (제출 예정)
"use client";

import { getConsultId, getHospitalId, supabase } from "@/api/supabase";
import React, { useEffect, useState } from "react";

const ConsultAnswerForm = () => {
  const [hospitalId, setHospitalId] = useState(""); // 병원 ID
  const [consultId, setConsultId] = useState(""); // 상담 ID
  const [department, setDepartment] = useState(""); //진료과
  const [answer, setAnswer] = useState(""); //답변

  // 외부에서 hospitalId와 consultId 가져오기
  useEffect(() => {
    const fetchConsultId = async () => {
      const consultIdData = await getConsultId();
      const hospitalIdData = await getHospitalId();

      setConsultId(consultIdData?.[1]?.consult_id ?? "");
      setHospitalId(hospitalIdData?.[0].hospital_id ?? "");
    };

    fetchConsultId();
  }, []);

  // 진료과 선택
  const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDepartment(e.target.value);
  };

  const handleAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnswer(e.target.value);
  };

  // 답변
  // 데이터 제출
  const handleAnswerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase.from("consult_answer").insert([
        {
          hospital_id: hospitalId,
          consult_id: consultId,
          department: department,
          answer: answer
        }
      ]);

      if (error) {
        console.log("답변 입력 중 오류 발생:", error.message);
      }

      console.log("답변 입력 성공:", data);
    } catch (error) {
      console.error("답변 입력 중 오류 발생:", error);
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
      {/** 값이 어떻게 나오는지 체크해본것 */}
      {/* {consultId}
      {hospitalId} */}
    </section>
  );
};

export default ConsultAnswerForm;

// // consult_id를 가져오는 함수
// async function getConsultId() {
//   try {
//     const { data, error } = await supabase
//       .from("consult_info")
//       .select("consult_id");

//     if (error) {
//       throw error;
//     }

//     return data;
//   } catch (error) {
//     console.error("consult_id를 가져오는 중 오류 발생:", error);
//     return null;
//   }
// }

// // hospital_id를 가져오는 함수
// async function getHospitalId() {
//   try {
//     const { data, error } = await supabase
//       .from("hospital_info")
//       .select("hospital_id");

//     if (error) {
//       throw error;
//     }

//     return data;
//   } catch (error) {
//     console.error("hospital_id를 가져오는 중 오류 발생:", error);
//     return null;
//   }
// }
