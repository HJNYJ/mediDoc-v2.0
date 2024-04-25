"use client";

import ReviewRecent from "./ReviewRecent";
import { useRouter } from "next/navigation";
import { Review } from "@/components/layout/CheckIcons";

const ReviewItem = ({ hospitalId }: { hospitalId: string }) => {
  const router = useRouter();

  const goToReviewForm = (hospitalId: string) => {
    router.push(`/map/${hospitalId}/review`);
  };

  return (
    <section className="mt-7">
      <div className="flex justify-between items-center">
        <h3 className="bold-18">방문자 리뷰</h3>
        <button
          onClick={() => goToReviewForm(hospitalId)}
          className="flex items-center mr-8"
        >
          <div className="relative top-[1px]">
            <Review />
          </div>

          <span className="text-orange ml-1">리뷰쓰기</span>
        </button>
      </div>
      <ReviewRecent />
    </section>
  );
};

export default ReviewItem;
