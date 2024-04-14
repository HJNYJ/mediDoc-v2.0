"use client";

import { useRouter } from "next/navigation";
import ReviewRecent from "./ReviewRecent";

const ReviewItem = () => {
  const router = useRouter();

  const goToReviewForm = () => {
    router.push(`/hospital/review`);
  };

  return (
    <section>
      <div className="flex gap-4">
        <h3>방문자 리뷰</h3>
        <button onClick={goToReviewForm}>리뷰 쓰기</button>
      </div>
      <ReviewRecent />
    </section>
  );
};

export default ReviewItem;
