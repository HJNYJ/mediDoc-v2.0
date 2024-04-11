// "리뷰" 탭을 눌렀을 때 나오는 div
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

// 탭으로 들어갔을때 보여지는 방문자 리뷰 (전체) 탭 내용들 (별점/최신순 볼 수 있음)
const ReviewTab = () => {
  const router = useRouter();

  const goToReviewForm = () => {
    router.push("/reviewform");
  };
  return (
    <main>
      {/* 제목 & 리뷰쓰기 */}
      <div className="flex gap-4">
        <h3>방문자 리뷰</h3>
        <button onClick={goToReviewForm}>리뷰 쓰기</button>
      </div>
      {/* 칩스 */}
      <div className="flex gap-4">
        <button>별점 높은 순</button>
        <button>최신순</button>
      </div>
      {/* 리뷰 - 무한스크롤 */}
      <section>
        {/* 작성자 정보 */}
        <div className="flex gap-4">
          <figure>
            <Image src="" alt="프로필 아바타" />
          </figure>
          <div>
            <p>홍**</p>
            <p>별점 5.0</p>
          </div>
        </div>
        {/* 리뷰 내용 */}
        <div>
          <div className="flex gap-4">
            <Image src="" alt="사진1" />
            <Image src="" alt="사진2" />
            <Image src="" alt="사진3" />
            <Image src="" alt="사진4" />
          </div>
          <div>리뷰내용리뷰내용리뷰내용리뷰내용</div>
          {/* 해시태그 & 날짜 */}
          <div className="flex gap-4">
            <div className="flex gap-4">
              <span>#해시태그1</span> <span>#해시태그2</span>
            </div>
            <span>24.04.01</span>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ReviewTab;
