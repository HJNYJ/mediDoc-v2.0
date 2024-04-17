"use client";

import { useRouter } from "next/navigation";
import ReviewRecent from "./ReviewRecent";
import ReviewForm from "./ReviewForm";

const ReviewItem = ({ hospitalId }: { hospitalId: string }) => {
  const router = useRouter();

  const goToReviewForm = (hospitalId: string) => {
    console.log("hospitalId", hospitalId);
    router.push(`/map/${hospitalId}/review`);
  };

  return (
    <section className="mt-7">
      <div className="flex gap-4 flex justify-between w-[390px]">
        <h3 className="bold-18">방문자 리뷰</h3>
        {/* <button onClick={goToReviewForm}>리뷰 쓰기</button> */}
        <button
          onClick={() => goToReviewForm(hospitalId)}
          className="text-orange"
        >
          ✏ 리뷰쓰기
        </button>
      </div>
      <ReviewRecent />
    </section>
  );
};

export default ReviewItem;
