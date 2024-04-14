// 방문자 사진 section
"use client";
import useDetailTabStore from "@/shared/zustand/detailTabStore";
import ReviewRecent from "../review/ReviewRecent";
import ImageTab from "../imageTab/ImageTab";

const ReviewImageList = () => {
  const { selectTab } = useDetailTabStore();
  return (
    <section>
      <h3>방문자 사진</h3>
      <article>
        <div className="grid grid-cols-3 gap-4">
          <ImageTab />
        </div>
      </article>
      <button
        onClick={(e) => {
          e.preventDefault();
          selectTab("image");
        }}
      >
        전체보기
      </button>
    </section>
  );
};

export default ReviewImageList;
