// "사진" 탭을 눌렀을 때 나오는 div
"use client";
import { fetchReviewImages } from "@/api/supabase";
import useDetailTabStore from "@/shared/zustand/detailTabStore";
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
  const { selectTab } = useDetailTabStore();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error!</p>;

  return (
    <main>
      {/* DB의 사진들을 map을 사용하여 grid 3 출력 */}
      {/* 아래는 map으로 출력됐다고 가정하고 Image로 각각을 표현 */}
      <section className="grid grid-cols-3 gap-4">
        {reviewPhotos?.map((img, index) => (
          <Image
            key={img?.photo_id}
            src={img?.photos}
            alt={`사진${index + 1}`}
            className="w-[116.67px] h-[116px] rounded-[10px]"
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
