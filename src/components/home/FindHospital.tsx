"use client";

import FindHospitalRegionBtn from "./search/FindHospitalRegionBtn";
import { supabase } from "@/api/supabase";
import { useQuery } from "@tanstack/react-query";

const FindHospital = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["hospitalRegion"],
    queryFn: async () => {
      const response = await supabase.from("hospital_region").select("*");
      // region_id, region_name 둘 다 필요해서 *로 바꿈
      // -> region_id로 hospitalInfo 테이블안에 region_id가 일치하는 병원들만 뽑아내기 위해(읽고 주석 지우셈)

      const { data } = response;
      return data;
    }
  });
  if (isLoading) {
    <p>로딩 중...</p>;
    console.log("이즈 로동");
  }
  if (isError) {
    <p>오류가 발생했습니다.</p>;
    console.log("실패함");
  }

  return (
    <div className="relative w-[358px] mx-[16px] mt-[30px]">
      <span className="w-[133px] h-[21px] bold-18">지역별로 병원 찾기</span>
      <div className="inline-grid grid-cols-4 gap-x-[50px] gap-y-[16px]">
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
