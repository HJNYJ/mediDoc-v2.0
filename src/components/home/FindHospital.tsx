"use client";

import { hospitalRegion } from "@/api/supabase";
import FindHospitalRegionBtn from "./search/FindHospitalRegionBtn";
import { useQuery } from "@tanstack/react-query";

const FindHospital = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["hospitalRegion"],
    queryFn: hospitalRegion
    // region_id, region_name 둘 다 필요해서 *로 바꿈
    // -> region_id로 hospitalInfo 테이블안에 region_id가 일치하는 병원들만 뽑아내기 위해
  });
  if (isLoading) {
    console.log("이즈 로동");
  }
  if (isError) {
    console.log("실패함");
  }

  return (
    <div className="max-w-lg mx-auto space-y-5">
      <h2>지역별로 병원 찾기</h2>
      <div className="inline-grid grid-cols-4 gap-8">
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
