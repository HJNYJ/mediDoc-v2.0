"use client";

import { getHospitalImages } from "@/hooks/getHospitalData";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

const HospitalImage = ({ hospitalId }: { hospitalId: string }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["hospitalImage", hospitalId],
    queryFn: () => getHospitalImages(hospitalId)
  });

  if (isLoading) {
    <div>로딩 중 입니다...</div>;
  }

  if (isError) {
    <div>에러 입니다...</div>;
  }

  if (data === null || data === undefined) {
    return;
  }
  const imgUrl = data[0]?.hospital_image;

  return <Image src={imgUrl} alt="병원사진" width={500} height={50} />;
};

export default HospitalImage;
