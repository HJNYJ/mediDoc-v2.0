"use client";

import { getHospitalRegion } from "@/hooks/getHospitalData";
import { useQuery } from "@tanstack/react-query";
import FindHospitalRegionBtn from "./search/FindHospitalRegionBtn";
import { Spinner } from "@nextui-org/react";

const FindHospital = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["hospitalRegion"],
    queryFn: getHospitalRegion
  });
  if (isLoading) {
    <Spinner size="lg" color="warning" />;
  }
  if (isError) {
    <p>에러가 발생했습니다. 잠시 후 다시 시도해주세요.</p>;
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
