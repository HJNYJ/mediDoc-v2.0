//증상 div
"use client";

import React, { useEffect } from "react";
import { supabase } from "@/api/supabase";
import useSelftestStore from "@/shared/zustand/selftestStore";
import { useRouter } from "next/navigation";

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
        console.log(questions);

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

  return (
    <>
      <section className="flex flex-col">
        <h2>아래 증상 중 해당되는 것이 있다면 선택해주세요.</h2>
        <h6>중복 선택이 가능합니다.</h6>
      </section>
      <section>
        {symptoms &&
          symptoms.map((symptom) => (
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
      </section>
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
