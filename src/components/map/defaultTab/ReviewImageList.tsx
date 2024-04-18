// 방문자 사진 section
"use client";
import { supabase } from "@/api/supabase";
import { useQuery } from "@tanstack/react-query";

const fetchReviewImages = async (hospitalId: string) => {
  const { data, error } = await supabase
    .from("review_photos")
    .select("*")
    .eq("hospital_id", hospitalId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const ReviewImageList = ({ hospitalId }: { hospitalId: string }) => {
  const {
    data: reviewPhotos,
    isLoading,
    isError
  } = useQuery({
    queryKey: ["reviewPhoto", hospitalId],
    queryFn: () => fetchReviewImages(hospitalId)
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
