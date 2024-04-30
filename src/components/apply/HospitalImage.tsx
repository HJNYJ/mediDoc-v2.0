"use client";

import { getHospitalImages } from "@/hooks/getHospitalData";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { Spinner } from "@nextui-org/react";

const HospitalImage = ({ hospitalId }: { hospitalId: string }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["hospitalImage", hospitalId],
    queryFn: () => getHospitalImages(hospitalId)
  });

  if (isLoading) {
    <Spinner size="lg" color="warning" />;
  }

  if (isError) {
    <p>에러가 발생했습니다. 잠시 후 다시 시도해주세요.</p>;
  }

  if (data === null || data === undefined) {
    return;
  }
  const imgUrl = data[0]?.hospital_image;

  return <Image src={imgUrl} alt="병원사진" width={500} height={50} />;
};

export default HospitalImage;
