// 방문자 사진 section
"use client";
import { fetchReviewImages } from "@/api/supabase";
import useDetailTabStore from "@/shared/zustand/detailTabStore";
import { useQuery } from "@tanstack/react-query";

const ReviewImageList = () => {
  const { selectTab } = useDetailTabStore();

  const {
    data: reviewPhotos,
    isLoading,
    isError
  } = useQuery({
    queryKey: ["reviewPhoto"],
    queryFn: fetchReviewImages
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error!</p>;

  return (
    <section className="mt-5">
      <h3 className="bold-18 mb-3">방문자 사진</h3>
      <article className="inline-grid grid-cols-3 gap-2">
        {reviewPhotos?.map((img, index) => (
          <img
            key={img?.photo_id}
            src={img?.photos}
            alt={`사진${index + 1}`}
            className="w-[116.67px] h-[116px] rounded-[10px]"
          />
        ))}
      </article>
      <div className="mt-3 flex flex-col align-items">
        <button
          onClick={(e) => {
            e.preventDefault();
            selectTab("image");
          }}
          className="border border-gray-300 text-gray-800 w-[358px] h-[50px] rounded-lg"
        >
          전체보기
        </button>
      </div>
    </section>
  );
};

export default ReviewImageList;
