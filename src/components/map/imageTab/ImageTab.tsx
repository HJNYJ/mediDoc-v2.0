// "사진" 탭을 눌렀을 때 나오는 div
"use client";
import { fetchReviewImages } from "@/hooks/getReviewData";
import { Spinner } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

const ImageTab = () => {
  const {
    data: reviewPhotos,
    isLoading,
    isError
  } = useQuery({
    queryKey: ["reviewPhoto"],
    queryFn: fetchReviewImages
  });

  if (isLoading) return <Spinner size="lg" color="warning" />;
  if (isError) return <p>에러가 발생했습니다. 잠시 후 다시 시도해주세요.</p>;
  return (
    <main>
      {/* DB의 사진들을 map을 사용하여 grid 3 출력 */}
      {/* 아래는 map으로 출력됐다고 가정하고 Image로 각각을 표현 */}
      <section className="grid grid-cols-3 gap-4 ">
        {reviewPhotos?.map((img, index) => (
          <Image
            key={img?.photo_id}
            src={img?.photos}
            alt={`사진${index + 1}`}
            className="w-[100px] h-[100px] rounded-[10px]"
          />
        ))}
      </section>
      <button
        onClick={(e) => {
          e.preventDefault();
          // selectTab("image");
        }}
      >
        전체보기
      </button>
    </main>
  );
};

export default ImageTab;
