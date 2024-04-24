// // 실시간 상담 페이지 [최종적으로 나와야하는 = 부위 카테고리, 모든 게시글 리스트, 카테고리별 리스트, 작성하기 버튼]
"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { supabase } from "@/api/supabase";
import Image from "next/image";
import Hashtag from "@/utils/hashtag";
import PagebackBtn from "@/components/layout/PageBackBtn";
import ConsultTabs from "@/components/consult/ConsultTabs";
import AnswerComplete from "@/components/layout/AnswerComplete";
import AnswerWaiting from "@/components/layout/AnswerWaiting";
import SkeletonList from "@/components/skeleton/ContainerSkeleton";

import type { ConsultType } from "@/types";

const ConsultPage = () => {
  const router = useRouter();
  const [posts, setPosts] = useState<ConsultType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const bottomOfPageRef = useRef<HTMLDivElement>(null);

  const goToAskForm = async () => {
    try {
      setIsLoading(true);
      const session = await supabase.auth.getSession();

      if (session.data.session === null) {
        // alert("로그인이 필요한 서비스입니다.");
        router.push("/login");
      } else {
        router.push("/consult/ask");
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  const goToDetailPage = (consultId: string) => {
    router.push(`/consult/${consultId}`);
  };

  const onClickHomeHandler = () => {
    router.push("/home");
  };

  return (
    <div className="w-full">
      {isLoading && <SkeletonList />}
      <div className="mt-10 mb-5 flex justify-center relative">
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
                <div className="flex flex-col justify-between">
                  {consult?.consult_photos && consult?.consult_photos.length ? (
                    consult?.consult_photos.slice(0, 1).map((item) => {
                      return (
                        <div
                          key={item?.photo_id}
                          // className=" bg-bluegray rounded-lg flex-none order-0 flex-grow-0"
                          className=" bg-bluegray rounded-lg"
                        >
                          <Image
                            src={item?.photos || ""}
                            alt="Uploaded Image"
                            width={89}
                            height={90}
                          />
                        </div>
                      );
                    })
                  ) : (
                    <div className=" bg-bluegray rounded-lg">
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
                  <div className="mb-4 flex">
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
      <div className="relative">
        <button onClick={goToAskForm} className="fixed bottom-20 right-3 mr-3">
          <div className="w-16 h-16 relative bg-orange rounded-full">
            <span className="plus_btn"></span>
            <span className="minus_btn"></span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default ConsultPage;
