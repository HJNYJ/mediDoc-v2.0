"use client";

import { getHospitalRegion } from "@/hooks/getHospitalData";
import { useQuery } from "@tanstack/react-query";
import FindHospitalRegionBtn from "./search/FindHospitalRegionBtn";

const FindHospital = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["hospitalRegion"],
    queryFn: getHospitalRegion
  });
  if (isLoading) {
    <p>로딩 중...</p>;
  }
  if (isError) {
    <p>오류가 발생했습니다.</p>;
  }

  return (
    <div className="relative mt-[30px] mb-[38px]">
      <p className="bold-18">지역별로 병원 찾기</p>
      <div className="inline-grid grid-cols-4 w-full gap-x-[50px]">
        {data?.map((item) => {
          return (
            <FindHospitalRegionBtn key={item.region_id} regionInfo={item} />
          );
        })}
      </div>
    </div>
  );
};

export default FindHospital;
