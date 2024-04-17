import { useRouter } from "next/navigation";
import ReviewItem from "../review/ReviewItem";

// interface ReviewListProps {
//   reviewDetailData: any;
// }

const ReviewList = ({
  reviewDetailData,
  hospitalId
}: {
  reviewDetailData: any;
  hospitalId: string;
}) => {
  console.log("reviewDetailData", reviewDetailData);
  console.log("hospitalId", hospitalId);
  const router = useRouter();
  console.log("reviewDetailData ===> ", reviewDetailData);
  function goToReviewForm(hospitalId: any): void {
    console.log("hospitalId", hospitalId);
    router.push(`/map/${hospitalId}/review`);
  }

  return (
    <section className="mt-10">
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
    </section>
  );
};

export default ReviewList;
