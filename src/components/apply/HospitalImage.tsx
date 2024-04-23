"use client";

import { hospitalImage } from "@/hooks/getHospitalData";
import { useQuery } from "@tanstack/react-query";

const HospitalImage = ({ hospitalId }: { hospitalId: string }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["reservation2", hospitalId],
    queryFn: () => hospitalImage(hospitalId)
  });

  if (isLoading) {
    <div>로딩 중 입니다...</div>;
  }

  if (isError) {
    <div>에러 입니다...</div>;
  }

  return (
    <img
      src={data?.[0].hospital_image}
      alt="병원사진"
      className="object-cover"
    />
  );
};

export default HospitalImage;
