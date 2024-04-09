"use client";

import { supabase } from "@/api/supabase";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const HospitalName = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["reservation"],
    queryFn: async () => {
      const response = await supabase
        .from("reservation_info")
        .select("hospital_name");

      const { data } = response;
      return data;
    }
  });
  // console.log("Data",data);
  const hospitalData = data?.[0].hospital_name;
  // 데이터를 꺼내 쓰는 용도 (배열)
  if (isLoading) {
    <div>로딩 중 입니다...</div>;
  }

  if (isError) {
    <div>에러 입니다...</div>;
  }
  return <div className="m-2">{hospitalData}</div>;
};

export default HospitalName;
