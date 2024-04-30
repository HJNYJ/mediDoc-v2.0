"use client";

import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useApplyStore from "@/shared/zustand/applyStore";
import { getHospitalName } from "@/hooks/getReservationData";
import { Spinner } from "@nextui-org/react";

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
    <Spinner size="lg" color="warning" />;
  }

  if (isError) {
    <p>에러가 발생했습니다. 잠시 후 다시 시도해주세요.</p>;
  }

  return (
    <span className="font-bold text-xl text-gray-700">{hospitalData}</span>
  );
};

export default HospitalName;
