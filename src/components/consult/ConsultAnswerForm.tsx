// 병원 관계자만 볼 수 있는 답변 입력 페이지 (제출 예정)
"use client";

import { supabase } from "@/api/supabase";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import type { UserInfo } from "@/types";

const ConsultAnswerForm = ({ params }: { params: { consultId: string } }) => {
  const router = useRouter();
  const [department, setDepartment] = useState(""); //진료과
  const [answer, setAnswer] = useState(""); //답변
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null); // 사용자 정보 타입 정의 필요

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const {
          data: { session }
        } = await supabase.auth.getSession();
        const user = session?.user;
        const email = user?.email ?? "";

        // 사용자 정보 가져오기
        const { data: userData, error: userDataError } = await supabase
          .from("user_info")
          .select("*")
          .eq("user_email", email)
          .single();

        if (userDataError) throw new Error(userDataError.message);

        setUserInfo(userData); // 사용자 정보 설정
      } catch (error) {
        console.error("사용자 정보를 가져오는 중 오류 발생:", error);
      }
    };

    fetchUserInfo();
  }, []);

  // 데이터 제출
  const handleAnswerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const userId = userInfo?.user_id;

      const { data, error } = await supabase.from("consult_answer").insert([
        {
          consult_id: params.consultId,
          department: department,
          answer: answer,
          user_id: userId
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

  return (
    <section className="mt-5">
      <form onSubmit={handleAnswerSubmit}>
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
          <span className="text-lg font-semibold mb-4">답변</span>
        </div>

        <textarea
          maxLength={500}
          value={answer}
          onChange={handleAnswerChange}
          placeholder="답변을 적어주세요."
          className="w-[358px] h-[290px] justify-center resize-none border border-gray-300 rounded-md"
        />
        <p className="text-gray-500 text-right regular-13">
          {answer.length} /500
        </p>
        <button
          type="submit"
          className="w-[358px] h-[50px] bg-orange text-white regular-18 py-2 px-4 rounded-lg focus:outline-none mt-14"
          onClick={goToAskList}
        >
          답변하기
        </button>
      </form>
      {/** 값이 어떻게 나오는지 체크해본것 */}
      {/* {hospitalId} */}
    </section>
  );
};

export default ConsultAnswerForm;
