// import ProgramInfo from "./ProgramInfo";
// import Notice from "./Notice";
// import ReviewImageList from "./ReviewImageList";
// import ReviewTab from "../reviewTab/ReviewTab";
// import useDetailTabStore from "@/shared/zustand/detailTabStore";
// import { useQuery } from "@tanstack/react-query";
// import { getReviewDetail } from "@/api/supabase";
// // "기본 정보" 탭을 눌렀을 때 나오는 div
// const DefaultTab = ({ hospitalId }: { hospitalId: string }) => {
//   const { selectedTab } = useDetailTabStore();
//   const { data: reviewDetailData } = useQuery({
//     queryKey: ["reviewDetailList"],
//     queryFn: () => getReviewDetail()
//   });
//   return (
//     <main>
//       {/* 검진프로그램 정보 */}
//       <ProgramInfo />
//       {/* <p>--------------------</p> */}
//       {/* 유의사항 */}
//       <Notice />
//       {/* <p>--------------------</p> */}
//       {/* 방문자 사진 */}
//       <ReviewImageList hospitalId={hospitalId} />
//       {/* <p>--------------------</p> */}
//       {/* 방문자 후기 */}
//       <ReviewTab
//         reviewDetailData={reviewDetailData}
//         selectedTab={selectedTab}
//       />
//     </main>
//   );
// };

// export default DefaultTab;
