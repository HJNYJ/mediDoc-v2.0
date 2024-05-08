// 제휴 병원 리스트
"use client";

import React from "react";
import HospitalItem from "./HospitalItem";
import { useQuery } from "@tanstack/react-query";
import { fetchHospitalList } from "@/hooks/getHospitalData";
import { useSearchParams } from "next/navigation";
import { Spinner } from "@nextui-org/react";

const HospitalList = () => {
  const searchParam = useSearchParams();
  const regionId = searchParam.get("region_id");

  // 병원 데이터 가져오기
  const {
    isLoading,
    isError,
    data: hospitalListData
  } = useQuery({
    queryKey: ["hospitalInfo"],
    queryFn: () => fetchHospitalList(regionId)
  });

  if (isLoading) return <Spinner size="lg" color="warning" />;
  if (isError) return <p>에러가 발생했습니다. 잠시 후 다시 시도해주세요.</p>;

  if (!hospitalListData || hospitalListData.length === 0) {
    return <p>병원 데이터가 없습니다.</p>;
  }

  return (
    <main className="flex flex-col gap-10">
      {hospitalListData?.map((hospital) => (
        <HospitalItem key={hospital.hospital_id} hospital={hospital} />
      ))}
    </main>
  );
};
export default HospitalList;
