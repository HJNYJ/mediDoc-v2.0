// 테스트 결과 div
"use client";

import React, { useEffect } from "react";
import { supabase } from "@/api/supabase";
import useSelftestStore from "@/shared/zustand/selftestStore";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const TestResult = () => {
  const { selectedPart, selectedSymptoms, setPredictedDiseases } =
    useSelftestStore();
  const router = useRouter();

  const queryClient = useQueryClient();

  const { data: predictedDiseases } = useQuery({
    queryKey: ["predictedDiseases", selectedPart, selectedSymptoms],
    queryFn: async () => {
      if (!selectedSymptoms || selectedSymptoms.length === 0) {
        return [];
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

      // 선택된 증상과 매칭되는 질환 찾기
      let maxMatches = 0;
      let matchedDiseases = [];

      possibleDiseases.forEach((disease) => {
        // 증상과 매칭되늰 질환의 수 확인
        const matches = convertedSymptoms.filter(
          (symptom) => disease[symptom]
        ).length;
        // 선택된 증상과 가장 많이 일치하는 질환을 출력
        if (matches > maxMatches) {
          maxMatches = matches;
          matchedDiseases = [disease.disease_name];
        } else if (matches === maxMatches) {
          matchedDiseases.push(disease.disease_name);
        }
      });

      return matchedDiseases.length > 0
        ? matchedDiseases
        : ["의심되는 질병이 없습니다."];
    },
    enabled: !!selectedPart && !!selectedSymptoms.length,
    staleTime: Infinity
  });

  useEffect(() => {
    if (predictedDiseases) {
      setPredictedDiseases(predictedDiseases);
      queryClient.setQueryData(
        ["predictedDiseases", selectedPart, selectedSymptoms],
        predictedDiseases
      );
    }
  }, [
    predictedDiseases,
    setPredictedDiseases,
    selectedSymptoms,
    queryClient,
    selectedPart
  ]);

  const goToMapPage = () => {
    router.push("/map");
  };

  return (
    <>
      <button>뒤로 가기</button>
      <section>
        <h2>의심되는 질병은?</h2>
        <ul>
          {predictedDiseases?.map((disease, index) => (
            <li key={index}>{disease}</li>
          ))}
        </ul>
        <h4>자세한 사항은 의사와 상담하세요.</h4>
        <button onClick={goToMapPage}>병원 보러가기</button>
      </section>
    </>
  );
};

export default TestResult;
