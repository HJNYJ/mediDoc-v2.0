"use client";

// 상담 내역 1개
import React from "react";
import ConsultQuestion from "./ConsultQuestion";
import { supabase } from "@/api/supabase";
import { useQuery } from "@tanstack/react-query";
// import ConsultAnswer from "./ConsultAnswer";

const fetchHospitals = async () => {
  const { data: hospitalData, error } = await supabase
    .from("consult_hospital")
    .select("answer, department");

  if (error) {
    console.error("error", error);
    return;
  }
  console.log("hospitalData => ", hospitalData);
  return hospitalData;
};

const ConsultItem = () => {
  // const [hospitals, setHospitals] = useState("");

  const {
    isLoading,
    error,
    data: hospitalData
  } = useQuery({
    queryKey: ["hospitals"],
    queryFn: fetchHospitals
  });

  console.log("hospitalData ====> ", hospitalData);

  if (isLoading) return <p>consult detail page Loading..!!</p>;
  if (error) return <p>error : {error.message}</p>;

  return (
    <section>
      <ConsultQuestion />
      {/* <ConsultAnswer /> */}
      <hr />
      <div>
        {/* {hospitalData?.map((hospital) => (
          <li key={hospital.answer_id}>{hospital.answer}</li>
        ))} */}
      </div>
    </section>
  );
};

export default ConsultItem;
