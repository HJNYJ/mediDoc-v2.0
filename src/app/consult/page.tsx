// // 실시간 상담 페이지 [최종적으로 나와야하는 = 부위 카테고리, 모든 게시글 리스트, 카테고리별 리스트, 작성하기 버튼]
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Hashtag from "@/utils/hashtag";
import PagebackBtn from "@/components/layout/PageBackBtn";
import ConsultTabs from "@/components/consult/ConsultTabs";
import AnswerComplete from "@/components/layout/AnswerComplete";
import AnswerWaiting from "@/components/layout/AnswerWaiting";

import type { ConsultType } from "@/types";
import { supabase } from "@/api/supabase";
// import { ConsultType } from "@/types";

export type PostType = {
  bodyparts: string | null;
  consult_content: string;
  consult_id: string;
  consult_title: string;
  created_at: string;
  hashtags: string[] | null;
  user_email: string | null;
  user_name: string | null;
  // consult_photos: { photo_id: string; photos: string }[];
  // consult_answer: { answer_id: string; answer_content: string }[];
};

// consult_photos: string[]; //다른 테이블로 따로 만들어야. id, url-text로
const ConsultPage = () => {
  const router = useRouter();
  // const [consultsData, setConsultsData] = useState<ConsultType[]>([]);
  const [posts, setPosts] = useState<ConsultType[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchConsultsData = async () => {
      setIsLoading(true);
      setIsLoading(false);
    };

    fetchConsultsData();
  }, []);

  if (isLoading) return <p>Loading consults..!!</p>;
  // if (error) return <p>error : {error}</p>;

  const handleCategoryChange = () => {};

  const goToAskForm = async () => {
    try {
      const session = await supabase.auth.getSession();
      console.log("consult session ===> ", session);

      if (session.data.session === null) {
        alert("로그인이 필요한 서비스입니다.");
        router.push("/login");
      } else {
        console.log("consult session ===> ", session.data.session);
        router.push("/consult/ask");
      }
    } catch (error) {
      console.log("error", error);
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
      <div className="mt-10 mb-5 flex justify-center it relative">
        <button className="flex absolute left-3" onClick={onClickHomeHandler}>
          <PagebackBtn />
        </button>
        <p className="flex">실시간 상담</p>
      </div>
      <ConsultTabs
        handleCategoryChange={handleCategoryChange}
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
                        <img
                          key={item?.photo_id}
                          src={item?.photos || undefined} // 이미지 URL
                          alt="Uploaded Image"
                          className="w-[89px] h-[80px] bg-gray-300 rounded-lg flex-none order-0 flex-grow-0"
                        />
                      );
                    })
                  ) : (
                    <img
                      src={`https://ifh.cc/g/WDVwsQ.png`} // 이미지 URL
                      alt="Uploaded Image"
                      className="w-[89px] h-[80px] bg-gray-300 rounded-lg flex-none order-0 flex-grow-0"
                    />
                  )}
                </div>
                <div className="ml-4 w-full h-auto overflow-hidden pb-[2px]">
                  <p className="semibold-18 text-gray-800">
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
      <div className="relative">
       <button onClick={goToAskForm} className="fixed bottom-20 right-3 mr-3">
          <div className="w-16 h-16 relative bg-orange rounded-full">
            <span className="h-1 w-10 bg-white absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] rotate-10 rounded-full"></span>
            <span className="h-1 w-10 bg-white absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] rotate-[90deg] rounded-full"></span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default ConsultPage;
