import ProgramInfo from "./ProgramInfo";
import Notice from "./Notice";
import ReviewImageList from "./ReviewImageList";
import ReviewTab from "../reviewTab/ReviewTab";

// "기본 정보" 탭을 눌렀을 때 나오는 div
const DefaultTab = () => {
  return (
    <main>
      {/* 검진프로그램 정보 */}
      <ProgramInfo />
      {/* <p>--------------------</p> */}
      {/* 유의사항 */}
      <Notice />
      {/* <p>--------------------</p> */}
      {/* 방문자 사진 */}
      <ReviewImageList />
      {/* <p>--------------------</p> */}
      {/* 방문자 후기 */}
      <ReviewTab />
    </main>
  );
};

export default DefaultTab;
