import { useRouter } from "next/navigation";
import ReviewRecent from "../review/ReviewRecent";
import { Review } from "@/components/layout/CheckIcons";

const ReviewList = ({ hospitalId }: { hospitalId: string }) => {
  const router = useRouter();
  const goToReviewForm = (hospitalId: string): void => {
    router.push(`/map/${hospitalId}/review`);
  };

  return (
    <section className="mt-10">
      <div className="flex gap-4 justify-between">
        <h3 className="bold-18">방문자 리뷰</h3>
        <button onClick={() => goToReviewForm(hospitalId)} className="flex">
          <div className="relative top-[2px]">
            <Review />
          </div>

          <span className="text-orange">리뷰쓰기</span>
        </button>
      </div>
      <ReviewRecent />
    </section>
  );
};

export default ReviewList;
