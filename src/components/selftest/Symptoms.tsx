//증상 div
"use client";

import React, { useEffect } from "react";
import { supabase } from "@/api/supabase";
import { useRouter } from "next/navigation";
import { CheckedIcon, NotCheckedIcon } from "../layout/CheckIcons";
import Button from "../layout/Buttons";
import YellowBar from "../layout/YellowBar";
import YellowBarMg from "../layout/YellowBarMg";
import useSelftestStore from "@/shared/zustand/selftestStore";

interface Symptoms {
  bodyparts: string | null;
  departments: string;
  symptom_id: string;
  symptoms: string | null;
  symptoms_abbr: string | null;
}

const Symptoms = () => {
  const {
    symptoms,
    setSymptoms,
    selectedPart,
    selectedSymptoms,
    setSelectedSymptoms
  } = useSelftestStore();

  const router = useRouter();
  // supabase에서 선택한 아픈 부위에 해당하는 증상들 가져오기
  useEffect(() => {
    const fetchSymptoms = async () => {
      try {
        const { data: questions, error } = await supabase
          .from("symptom_questions")
          .select("*")
          .eq("bodyparts", selectedPart);

        if (error) throw error;
        setSymptoms(questions);
      } catch (error) {
        if (error instanceof Error) console.error(error.message);
      }
    };
    if (selectedPart) fetchSymptoms();
  }, [selectedPart, setSymptoms]);

  // 증상을 중복 선택하는 함수
  const selectSymptomHandler = (symptomId: string) => {
    const index = selectedSymptoms.indexOf(symptomId);
    if (index === -1) {
      setSelectedSymptoms([...selectedSymptoms, symptomId]);
    } else {
      setSelectedSymptoms(selectedSymptoms.filter((id) => id !== symptomId));
    }
  };

  const checkSelectedSymptoms = () => {
    if (selectedSymptoms.length > 0) {
      router.push("/selftestresult");
    } else {
      alert("증상을 선택해주세요.");
    }
  };

  return (
    <section className="w-full py-[15px]">
      <div className="flex mb-10">
        <YellowBarMg />
        <YellowBarMg />
        <YellowBarMg />
        <YellowBar />
      </div>
      <section className="flex flex-col">
        <p className="w-full h-[36px] mb-10 bold-26">
          해당하는 증상을 선택해 주세요.
        </p>
        <p className="w-full h-[21px] mb-7 medium-18 text-gray-400">
          복수 선택이 가능합니다.
        </p>
      </section>
      <section>
        <section className="flex flex-col items-center">
          {symptoms &&
            symptoms.map((symptom) => (
              <div
                key={symptom.symptom_id}
                className={`flex items-center justify-between w-full h-[55px] border-2 rounded-[8px] mb-[16px] relative cursor-pointer
      ${selectedSymptoms.includes(symptom.symptom_id) ? "border-orange" : "border-bluegray"}
      `}
                onClick={() => selectSymptomHandler(symptom.symptom_id)}
              >
                <label
                  htmlFor={`checkbox-${symptom.symptom_id}`}
                  className="flex items-center h-[21px] ml-[16px] mr-[4px] mt-[17px] mb-[17px] semibold-18 cursor-pointer"
                >
                  {symptom.symptoms}
                </label>
                <div
                  className="relative"
                  onClick={() => selectSymptomHandler(symptom.symptom_id)}
                >
                  {selectedSymptoms.includes(symptom.symptom_id) ? (
                    <CheckedIcon />
                  ) : (
                    <NotCheckedIcon />
                  )}
                </div>
              </div>
            ))}
        </section>
      </section>
      <section className="">
        <Button
          type="button"
          buttonType="filled"
          size="base"
          label="다음"
          onClick={checkSelectedSymptoms}
        ></Button>
      </section>
    </section>
  );
};

export default Symptoms;
