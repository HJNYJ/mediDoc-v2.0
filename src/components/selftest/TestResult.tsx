// 테스트 결과 div
"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/api/supabase";
import useSelftestStore from "@/shared/zustand/selftestStore";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import type { StaticImageData } from "next/image";
import Image from "next/image";
import Button from "../layout/Buttons";
import ear_disease from "@/assets/icons/selftest/ear_disease.jpeg";
import nose_disease from "@/assets/icons/selftest/nose_disease.jpeg";
import neck_disease from "@/assets/icons/selftest/neck_disease.jpeg";
import abdomen_disease from "@/assets/icons/selftest/abdomen_disease.jpeg";
import back_disease from "@/assets/icons/selftest/back_disease.jpeg";
import chest_disease from "@/assets/icons/selftest/chest_disease.jpeg";

const TestResult = () => {
  const { selectedPart, selectedSymptoms, setPredictedDiseases } =
    useSelftestStore();
  const router = useRouter();
  const [diseaseImage, setDiseaseImage] =
    useState<StaticImageData>(ear_disease);
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
      const matchedDiseases: string[] = [];

      possibleDiseases.forEach((disease) => {
        // 증상과 매칭되늰 질환의 수 확인
        const matches = convertedSymptoms.filter(
          (symptom) => disease[symptom]
        ).length;
        // 선택된 증상과 가장 많이 일치하는 질환을 출력
        if (matches > maxMatches) {
          maxMatches = matches;
          matchedDiseases.push(disease.disease_name);
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

  useEffect(() => {
    switch (selectedPart) {
      case "귀":
        setDiseaseImage(ear_disease);
        break;
      case "코":
        setDiseaseImage(nose_disease);
        break;
      case "목":
        setDiseaseImage(neck_disease);
        break;
      case "배":
        setDiseaseImage(abdomen_disease);
        break;
      case "등/허리":
        setDiseaseImage(back_disease);
        break;
      case "가슴":
        setDiseaseImage(chest_disease);
        break;
      default:
        setDiseaseImage(ear_disease);
        break;
    }
  }, [selectedPart]);

  return (
    <section>
      <div>
        <Image
          src={diseaseImage}
          alt="아픈 부위 이미지"
          className="w-full h-[390px] overflow-hidden mb-6
          "
        />
      </div>
      <section className="flex flex-col w-full min-h-[50vh]">
        <p className="flex flex-col text-center w-full bold-26 mb-3">
          {predictedDiseases?.map((disease, index) => (
            <div key={index}>{disease}</div>
          ))}
        </p>
        <section className="w-full">
          <p className=" regular-16 text-center text-gray-800 mb-5">
            불편하신 증상을 바탕으로 자가진단을 하는 검사입니다.
          </p>
        </section>
        <div className="mt-auto">
          <p className="w-full text-amber-700 regular-14 mb-2">
            * 연관있는 질환을 알려드리며 자세한 사항은 전문의와 상담하세요.
            <hr />
          </p>
          <div className="my-4">
            <Button
              type="button"
              buttonType="filled"
              label="실시간 상담하러가기"
              size="base"
              onClick={() => router.push("/consult")}
            />{" "}
          </div>
          <Button
            type="button"
            buttonType="filled"
            label="닫기"
            size="base"
            onClick={() => router.push("/home")}
          />
        </div>
      </section>
    </section>
  );
};

export default TestResult;
