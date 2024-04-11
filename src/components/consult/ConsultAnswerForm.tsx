// 병원 관계자만 볼 수 있는 답변 입력 페이지 (제출 예정)
"use client";

import { supabase } from "@/api/supabase";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const ConsultAnswerForm = ({ params }: { params: { consultId: string } }) => {
  const router = useRouter();
  const [department, setDepartment] = useState(""); //진료과
  const [answer, setAnswer] = useState(""); //답변

  console.log("params ==========> ", params.consultId);

  // 진료과 선택
  const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDepartment(e.target.value);
  };

  const handleAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnswer(e.target.value);
  };

  // 홈으로 이동
  const goToAskList = () => {
    router.push(`/consult`);
  };

  // 답변
  // 데이터 제출
  const handleAnswerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase.from("consult_answer").insert([
        {
          consult_id: params.consultId,
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
          onClick={goToAskList}
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

// const {
//   // isLoading,
//   // isError,
//   data: consultData
// } = useQuery({
//   queryKey: ["consultinfo", params.consultId],
//   queryFn: () => getSelectConsultId(params.consultId)
// });
