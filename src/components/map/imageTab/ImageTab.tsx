// "사진" 탭을 눌렀을 때 나오는 div
"use client";
import { fetchReviewImages } from "@/api/supabase";
import { useQuery } from "@tanstack/react-query";

const ImageTab = () => {
  const {
    data: reviewPhotos,
    isLoading,
    isError
  } = useQuery({
    queryKey: ["reviewPhoto"],
    queryFn: fetchReviewImages
  });

  console.log("reviewPhotos ===> ", reviewPhotos);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error!</p>;

  return (
    <main>
      {/* DB의 사진들을 map을 사용하여 grid 3 출력 */}
      {/* 아래는 map으로 출력됐다고 가정하고 Image로 각각을 표현 */}
      <section className="grid grid-cols-3 gap-4">
        {reviewPhotos?.map((img, index) => (
          <img
            key={img?.photo_id}
            src={img?.photos}
            alt={`사진${index + 1}`}
            className="w-[250px] h-48 object-cover mb-2"
          />
        ))}
      </section>
    </main>
  );
};

export default ImageTab;
