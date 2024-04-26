import React, { useEffect, useState } from "react";
import { supabase } from "@/api/supabase";
import RoundTabs from "../layout/RoundTabs";
import { useInView } from "react-intersection-observer";
import type { ConsultType, TabsProps } from "@/types";
import { throttle } from "lodash";

const ConsultTabs = ({ setPosts }: TabsProps) => {
  const { ref: pageEnd, inView } = useInView({
    threshold: 1
  });

  // 탭 상태 관리
  const [currentTab, setCurrentTab] = useState("nose");

  useEffect(() => {
    fetchPosts(0, 9);
  }, [currentTab]);

  useEffect(() => {
    if (inView) {
      fetchMorePosts();
    }
  }, [inView]);

  const fetchPosts = async (startRange: number, endRange: number) => {
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
      .range(startRange, endRange);
    // .range(0, 9); //파람 값으로 받아오기 useRef 맨밑에 만나면 true, false, 주기

    if (error) {
      console.error("Error fetching posts:", error);
    }
    return setPosts(data as ConsultType[]);
  };

  const fetchMorePosts = throttle(async () => {
    const PAGINATE = 6;
    const currentPosts = setPosts;
    const startRange = currentPosts.length;
    const endRange = startRange + PAGINATE;
    await fetchPosts(startRange, endRange);
  }, 1000);

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
      <div ref={pageEnd}>{/* Posts */}</div>
    </>
  );
};

export default ConsultTabs;
