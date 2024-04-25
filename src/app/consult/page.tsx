// // 실시간 상담 페이지 [최종적으로 나와야하는 = 부위 카테고리, 모든 게시글 리스트, 카테고리별 리스트, 작성하기 버튼]
"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import Image from "next/image";
import Hashtag from "@/utils/hashtag";
import PagebackBtn from "@/components/layout/PageBackBtn";
import ConsultTabs from "@/components/consult/ConsultTabs";
import AnswerComplete from "@/components/layout/AnswerComplete";
import AnswerWaiting from "@/components/layout/AnswerWaiting";
// import SkeletonList from "@/components/skeleton/ContainerSkeleton";

import type { ConsultType } from "@/types";
import WriteButton from "@/components/consult/WriteButton";

const ConsultPage = () => {
  const router = useRouter();
  const [posts, setPosts] = useState<ConsultType[]>([]);
  const bottomOfPageRef = useRef<HTMLDivElement>(null);

  const goToDetailPage = (consultId: string) => {
    router.push(`/consult/${consultId}`);
  };

  const onClickHomeHandler = () => {
    router.push("/home");
  };

  return (
    <div className="w-full">
      {/* {isLoading && <SkeletonList />} */}
      <div className="py-[15px] flex justify-center relative">
        <button className="flex absolute left-3" onClick={onClickHomeHandler}>
          <PagebackBtn />
        </button>
        <p className="flex">실시간 상담</p>
      </div>
      <ConsultTabs
        // handleCategoryChange={handleCategoryChange}
        setPosts={setPosts}
      />
      <div>
        {posts?.map((consult) => {
          return (
            <div
              key={consult?.consult_id}
              className="flex cursor-pointer flex-col"
              onClick={() => goToDetailPage(consult?.consult_id)} // 클릭 이벤트 핸들러 추가
            >
              <div className="flex items-center">
                <div className="flex flex-col justify-between over">
                  {consult?.consult_photos && consult?.consult_photos.length ? (
                    consult?.consult_photos.slice(0, 1).map((item) => {
                      return (
                        <div
                          key={item?.photo_id}
                          // className=" bg-bluegray rounded-lg flex-none order-0 flex-grow-0"
                          className="relative w-[80px] h-[80px] border border-gray-100 overflow-hidden flex items-center justify-center"
                        >
                          <Image
                            src={item?.photos || ""}
                            alt="Uploaded Image"
                            width={80}
                            height={80}
                            objectFit="cover"
                            className="rounded-lg"
                          />
                        </div>
                      );
                    })
                  ) : (
                    <div className="relative w-[90px] h-[90px] border border-gray-100 overflow-hidden flex items-center justify-center">
                      <Image
                        src={`https://ifh.cc/g/WDVwsQ.png`}
                        alt="Uploaded Image"
                        width={89}
                        height={90}
                      />
                    </div>
                  )}
                </div>
                <div className="ml-4 w-full h-auto overflow-hidden pb-[2px]">
                  <p className="semibold-18 text-gray-800 line-clamp-2">
                    {consult?.consult_title}
                  </p>
                  <p className="text-gray-700 regular-14 mb-2 overflow-hidden whitespace-nowrap text-ellipsis">
                    {consult?.consult_content}
                  </p>
                  <div className="mb-4 flex flex-wrap">
                    {consult?.hashtags
                      ?.toString()
                      .split(",")
                      .map((hashtag: string) => (
                        <Hashtag key={hashtag} hashtag={hashtag} />
                      ))}
                  </div>
                  {consult?.consult_answer &&
                  consult?.consult_answer?.length > 0 ? (
                    <AnswerComplete />
                  ) : (
                    <AnswerWaiting />
                  )}
                </div>
              </div>
              <hr className="w-full border-solid border-gray-400 border-1 mb-5 mt-6" />
            </div>
          );
        })}
      </div>
      <div ref={bottomOfPageRef} />
      <WriteButton />
    </div>
  );
};

export default ConsultPage;
