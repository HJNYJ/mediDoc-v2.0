"use client";

import { hospitalRegion } from "@/api/supabase";
import FindHospitalRegionBtn from "./search/FindHospitalRegionBtn";
import { useQuery } from "@tanstack/react-query";

const FindHospital = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["hospitalRegion"],
<<<<<<< HEAD
    queryFn: hospitalRegion
    // region_id, region_name 둘 다 필요해서 *로 바꿈
    // -> region_id로 hospitalInfo 테이블안에 region_id가 일치하는 병원들만 뽑아내기 위해
=======
    queryFn: async () => {
      const response = await supabase.from("hospital_region").select("*");

      const { data } = response;
      return data;
    }
>>>>>>> 9c297a4047e0fc505ae9f96eb65728edd4d18aa2
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
