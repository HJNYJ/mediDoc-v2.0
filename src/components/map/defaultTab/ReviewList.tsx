import { useRouter } from "next/navigation";
import Image from "next/image";
import writeReview from "@/assets/icons/review/pencil.png";

const ReviewList = ({ hospitalId }: { hospitalId: string }) => {
  const router = useRouter();
  const goToReviewForm = (hospitalId: string): void => {
    router.push(`/map/${hospitalId}/review`);
  };

  return (
    <section className="mt-10">
      <div className="flex gap-4 justify-between w-[390px]">
        <h3 className="bold-18">방문자 리뷰</h3>
        <button onClick={() => goToReviewForm(hospitalId)} className="flex">
          <Image src={writeReview} alt="리뷰쓰기 버튼" />
          <span className="text-orange">리뷰쓰기</span>
        </button>
      </div>
    </section>
  );
};

export default ReviewList;
