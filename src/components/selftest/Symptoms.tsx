//증상 div
"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/api/supabase";
import useSelftestStore from "@/shared/zustand/selftestStore";
import { useRouter } from "next/navigation";

const Symptoms = () => {
  const { symptoms, setSymptoms, selectedSymptoms, setSelectedSymptoms } =
    useSelftestStore();

  const router = useRouter();

  // supabase에서 아픈 부위가 귀인 증상들 가져오기
  useEffect(() => {
    const fetchSymptoms = async () => {
      try {
        const { data: questions, error } = await supabase
          .from("symptom_questions")
          .select("*")
          .eq("bodyparts", "귀");

        if (error) throw error;
        setSymptoms(questions);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchSymptoms();
  }, []);

  // 증상을 중복 선택하는 함수
  const selectSymptomHandler = (symptomId) => {
    const index = selectedSymptoms.indexOf(symptomId);
    if (index === -1) {
      setSelectedSymptoms([...selectedSymptoms, symptomId]);
    } else {
      setSelectedSymptoms(selectedSymptoms.filter((id) => id !== symptomId));
    }
  };

  return (
    <>
      <div className="flex flex-col">
        <h2>아래 증상 중 해당되는 것이 있다면 선택해주세요.</h2>
        <h6>중복 선택이 가능합니다.</h6>
      </div>
      {symptoms.map((symptom) => (
        <div key={symptom.symptom_id}>
          <label className="flex flex-col">
            {symptom.symptoms}
            <input
              type="checkbox"
              checked={selectedSymptoms.includes(symptom.symptom_id)}
              onChange={() => selectSymptomHandler(symptom.symptom_id)}
            />
          </label>
        </div>
      ))}
      <button
        onClick={() => {
          router.push("/selftestresult");
        }}
      >
        다음
      </button>
    </>
  );
};

export default Symptoms;
