// 상담 내역 1개
"use client";

import React from "react";
import { supabase } from "@/api/supabase";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "@nextui-org/react";

const fetchHospitals = async () => {
  const { data: hospitalData, error } = await supabase
    .from("consult_answer")
    .select("*");

  if (error) {
    console.error("error", error);
    return;
  }
  return hospitalData;
};

const ConsultItem = () => {
  const {
    isLoading,
    error,
    data: hospitalData
  } = useQuery({
    queryKey: ["hospitals"],
    queryFn: fetchHospitals
  });

  if (isLoading) return <Spinner size="lg" color="warning" />;
  if (error) return <p>error : {error.message}</p>;

  return (
    <section>
      <hr />
      <div>
        {hospitalData?.map((hospital) => (
          <div key={hospital.answer_id}>
            <h2>{hospital.department} 답변</h2>
            <div>{hospital.answer}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ConsultItem;
