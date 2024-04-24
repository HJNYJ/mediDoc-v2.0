"use client";

import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useApplyStore from "@/shared/zustand/applyStore";
import { getHospitalName } from "@/hooks/getReservationData";

const HospitalName = ({ hospitalId }: { hospitalId: string }) => {
  const { setHospitalName } = useApplyStore();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["hospitalName", hospitalId],
    queryFn: () => getHospitalName(hospitalId)
  });

  const hospitalData = data?.[0].hospital_name;

  useEffect(() => {
    if (hospitalData) {
      setHospitalName(hospitalData);
    }
  }, [setHospitalName, hospitalData]);

  if (isLoading) {
    <div>로딩 중 입니다...</div>;
  }

  if (isError) {
    <div>에러 입니다...</div>;
  }

  return (
    <span className="font-bold text-xl text-gray-700">{hospitalData}</span>
  );
};

export default HospitalName;
