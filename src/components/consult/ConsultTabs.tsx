import React, { useEffect, useState } from "react";
import { supabase } from "@/api/supabase";
import RoundTabs from "../layout/RoundTabs";
import type { ConsultType, TabsProps } from "@/types";
import { throttle } from "lodash";
import useInterSectionObserver from "./useInterSectionObserver";

const ConsultTabs = ({ setPosts }: TabsProps) => {
  const [itemIndex, setItemIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // 탭 상태 관리
  const [currentTab, setCurrentTab] = useState("nose");

  useEffect(() => {
    fetchPosts(0, 9); // 초기 게시물을 가져옴
  }, [currentTab]);

  const fetchPosts = async (start: number, end: number) => {
    const { data, error } = await supabase
      .from("consult_info")
      .select(
        `consult_id, 
        user_name, 
        consult_title, 
        consult_content,
        bodyparts, 
        hashtags,
        consult_answer(*),
        consult_photos(*)
        `
      )
      .eq("bodyparts", currentTab)
      .range(start, end);
    // .range(0, 9); //파람 값으로 받아오기 useRef 맨밑에 만나면 true, false, 주기

    if (error) {
      console.error("Error fetching posts:", error);
    }
    return setPosts(data as ConsultType[]);
  };

  const fetchMorePosts = throttle(async () => {
    setIsLoading(true);
    await fetchPosts(itemIndex, itemIndex + 5); // 추가 게시물을 가져옴
    setItemIndex((i) => i + 5);
    setIsLoading(false);
  }, 10000);

  const onIntersect: IntersectionObserverCallback = async (
    [entry],
    observer
  ) => {
    //보통 교차여부만 확인하는 것 같다. 코드는 로딩상태까지 확인함.
    if (entry.isIntersecting && !isLoading) {
      observer.unobserve(entry.target);
      await fetchMorePosts();
      observer.observe(entry.target);
    }
  };

  //현재 대상 및 option을 props로 전달
  const { setTarget } = useInterSectionObserver({
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
    onIntersect
  });

  const onChangeTabHandler = (tabName: string) => {
    setCurrentTab(tabName);
    // fetchMorePosts(1);
  };

  return (
    <>
      <div className="flex flex-wrap justify-center mb-4">
        <RoundTabs
          label="코 통증"
          onClick={() => onChangeTabHandler("nose")}
          active={currentTab === "nose"}
          width={119.3}
        />
        <RoundTabs
          label="목 통증"
          onClick={() => onChangeTabHandler("neck")}
          active={currentTab === "neck"}
          width={119.3}
        />
        <RoundTabs
          label="귀 통증"
          onClick={() => onChangeTabHandler("ears")}
          active={currentTab === "ears"}
          width={119.3}
        />
        <RoundTabs
          label="등/허리 통증"
          onClick={() => onChangeTabHandler("waist")}
          active={currentTab === "waist"}
          width={120.3}
        />
        <RoundTabs
          label="배 통증"
          onClick={() => onChangeTabHandler("abdomen")}
          active={currentTab === "abdomen"}
          width={120.3}
        />
        <RoundTabs
          label="가슴 통증"
          onClick={() => onChangeTabHandler("chest")}
          active={currentTab === "chest"}
          width={120.3}
        />
      </div>
      {/* 스크롤 이벤트 처리 */}
      {/* <div ref={setTarget}>{isLoading && <div>Loading..</div>}</div> */}
      {/* {isLoading && <div>Loading..</div>} */}
      <div ref={setTarget}></div>
    </>
  );
};

export default ConsultTabs;
