// 제휴 병원 리스트
"use client";
import React from "react";
import HospitalItem from "./HospitalItem";
import { useQuery } from "@tanstack/react-query";
import { fetchHospitalList } from "@/hooks/getHospitalData";
import { useSearchParams } from "next/navigation";
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
  if (isLoading) return <p>병원 데이터를 가져오는 중입니다.</p>;
  if (isError) return <p>병원 데이터를 가져오는 동안 에러가 발생했습니다</p>;
  return (
    <main className="flex flex-col gap-10">
      {hospitalListData?.map((hospital) => (
        <HospitalItem key={hospital.hospital_id} hospital={hospital} />
      ))}
    </main>
  );
};
export default HospitalList;
