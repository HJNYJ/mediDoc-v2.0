// 테스트 결과 div
"use client";

import React, { useEffect } from "react";
import { supabase } from "@/api/supabase";
import useSelftestStore from "@/shared/zustand/selftestStore";

const TestResult = () => {
  const {
    selectedPart,
    selectedSymptoms,
    predictedDiseases,
    setPredictedDiseases
  } = useSelftestStore();

  useEffect(() => {
    const fetchPredictedDiseases = async () => {
      try {
        if (!selectedSymptoms || selectedSymptoms.length === 0) {
          return;
        }

        // 선택된 증상을 possible_disease 테이블의 column과 대응
        const convertedSymptoms = selectedSymptoms.map((symptom) => {
          const number = parseInt(symptom.split("-")[1]);
          return `symptom${number}`;
        });

        // possible_disease 테이블에서 선택한 부위에 해당하는 질환 정보 가져오기
        const { data: possibleDiseases, error } = await supabase
          .from("possible_disease")
          .select("*")
          .eq("bodyparts", selectedPart);

        if (error) throw error;

        // 선택한 증상과 매칭되는 질환 찾기
        const matchedDiseases = possibleDiseases.filter((disease) => {
          // possible_disease 테이블의 증상 컬럼과 선택한 증상 비교하여 일치 여부 확인
          return convertedSymptoms.every(
            (convertedSymptom) => disease[convertedSymptom]
          );
        });

        // 매칭된 질병의 이름 칮기
        const matchedDiseaseNames = matchedDiseases.map(
          (disease) => disease.disease_name
        );
        console.log("matchedDiseases", matchedDiseases);

        // 매칭된 질병 이름 출력
        setPredictedDiseases(
          matchedDiseaseNames.length > 0
            ? matchedDiseaseNames
            : ["의심되는 질병이 없습니다."]
        );
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchPredictedDiseases();
  }, [selectedSymptoms, selectedPart]);

  return (
    <>
      <h2>의심되는 질병은?</h2>
      <ul>
        {predictedDiseases.map((disease, index) => (
          <li key={index}>{disease}</li>
        ))}
      </ul>
      <h4>자세한 사항은 의사와 상담하세요.</h4>
      <button>병원 보러가기</button>
    </>
  );
};

export default TestResult;
