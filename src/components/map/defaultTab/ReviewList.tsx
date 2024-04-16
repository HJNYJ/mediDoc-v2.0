import ReviewItem from "../review/ReviewItem";

// interface ReviewListProps {
//   reviewDetailData: any;
// }

const ReviewList = ({ reviewDetailData }: { reviewDetailData: any }) => {
  console.log("reviewDetailData ===> ", reviewDetailData);
  return (
    <section>
      <ReviewItem />
      {reviewDetailData}
    </section>
  );
};

export default ReviewList;
