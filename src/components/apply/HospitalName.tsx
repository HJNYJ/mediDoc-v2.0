"use client";

import { hospitalName } from "@/api/supabase";
import useApplyStore from "@/shared/zustand/applyStore";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";

const HospitalName = ({ hospitalId }: { hospitalId: string }) => {
  const { setHospitalName } = useApplyStore();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["reservation", hospitalId],
    queryFn: () => hospitalName(hospitalId)
  });

  const hospitalData = data?.[0].hospital_name;
  // 데이터를 꺼내 쓰는 용도 (배열)

  useEffect(() => {
    if (hospitalData) {
      setHospitalName(hospitalData);
    }
  }, [hospitalData]);

  if (isLoading) {
    <div>로딩 중 입니다...</div>;
  }

  if (isError) {
    <div>에러 입니다...</div>;
  }
  // if (hospitalData) {
  //   setHospitalName(hospitalData);
  // }
  return (
    <span className="font-bold text-xl text-gray-700">{hospitalData}</span>
  );
};

export default HospitalName;
