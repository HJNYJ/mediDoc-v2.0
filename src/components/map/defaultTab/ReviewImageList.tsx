// 방문자 사진 section
"use client";
import { fetchHospitalReviewImages } from "@/hooks/getReviewData";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

const ReviewImageList = ({ hospitalId }: { hospitalId: string }) => {
  const {
    data: reviewPhotos,
    isLoading,
    isError
  } = useQuery({
    queryKey: ["reviewPhoto", hospitalId],
    queryFn: () => fetchHospitalReviewImages(hospitalId)
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error!</p>;

  return (
    <section className="mt-5">
      <h3 className="bold-18 mb-3">방문자 사진</h3>
      <article className="inline-grid grid-cols-3 gap-2">
        {reviewPhotos?.map((img, index) => (
          <div
            key={img?.photo_id}
            className="flex w-[100px] h-[100px] rounded-[10px]"
          >
            <Image
              key={img?.photo_id}
              src={img?.photos}
              alt={`사진${index + 1}`}
              width={100}
              height={100}
              className="rounded-[10px]"
            />
          </div>
        ))}
        {reviewPhotos?.length === 0 && (
          <p className="w-full h-[19px] mx-[110px] mt-[185px] text-[16px] text-gray-400">
            등록된 사진이 없습니다.
          </p>
        )}
      </article>
    </section>
  );
};

export default ReviewImageList;
