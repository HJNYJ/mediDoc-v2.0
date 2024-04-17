"use client";

import { useRouter } from "next/navigation";
import ReviewRecent from "./ReviewRecent";
// import ReviewForm from "./ReviewForm";

const ReviewItem = ({ hospitalId }: { hospitalId: string }) => {
  const router = useRouter();
  console.log("reviewItem hospitalId", hospitalId);

  const goToReviewForm = (hospitalId: string) => {
    console.log("go to review form hospitalId", hospitalId);
    router.push(`/map/${hospitalId}/review`);
  };

  return (
    <section>
      <div className="flex gap-4">
        <h3>방문자 리뷰</h3>
        {/* <button onClick={goToReviewForm}>리뷰 쓰기</button> */}
        <button onClick={() => goToReviewForm(hospitalId)}>리뷰쓰기</button>
      </div>
      <ReviewRecent />
    </section>
  );
};

export default ReviewItem;
