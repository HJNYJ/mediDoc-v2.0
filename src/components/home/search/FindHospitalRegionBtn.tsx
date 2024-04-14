"use Client";

import { useRouter } from "next/navigation";
import React from "react";

const FindHospitalRegionBtn = ({ regionInfo }) => {
  const router = useRouter();

  const hospitalViewBtnHandler = (id: string) => {
    router.push(`/map?region_id=${id}`);
  };
  return (
    <div
      className="cursor-pointer"
      onClick={() => hospitalViewBtnHandler(regionInfo.region_id)}
    >
      <div className="rounded-lg border-2 border-indigo-500/50 min-w-12 max-w-12">
        <p className="text-sm">{regionInfo.region_name} 아이콘넣으셈</p>
      </div>
      <div>{regionInfo.region_name}</div>
    </div>
  );
};

export default FindHospitalRegionBtn;
