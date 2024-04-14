import type { TabsProps } from "@/types";
import React, { useEffect, useState } from "react";
import RoundTabs from "../layout/RoundTabs";
import { supabase } from "@/api/supabase";

const ConsultTabs = ({ handleCategoryChange }: TabsProps) => {
  // 탭 상태 관리
  const [currentTab, setCurrentTab] = useState("eyes|ears|nose|abdomen|waist");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // currentTab이 변경될 때마다 해당 부분을 포함하는 데이터를 supabase에서 가져오는 함수 호출
    fetchPosts();
  }, [currentTab]);

  const fetchPosts = async () => {
    // supabase에서 데이터를 가져오는 쿼리 실행
    const { data, error } = await supabase
      .from("consult_info")
      .select("*")
      .like("bodyparts", `%${currentTab}%`); // bodysection에 currentTab을 포함하는 데이터만 선택

    if (error) {
      console.error("Error fetching posts:", error);
    } else {
      setPosts(data || []);
    }
  };

  const onChangeTabHandler = (tabName: string) => {
    setCurrentTab(tabName);
    handleCategoryChange(tabName);
  };

  return (
    <>
      <section className="w-[321px] h-[32px] mx-[16px]">
        <div className="flex">
          <RoundTabs
            label="눈 통증"
            onClick={() => onChangeTabHandler("eyes")}
            active={currentTab === "eyes"}
            width={120.3}
          />
          <RoundTabs
            label="귀 통증"
            onClick={() => onChangeTabHandler("ears")}
            active={currentTab === "ears"}
            width={119.3}
          />
          <RoundTabs
            label="코 통증"
            onClick={() => onChangeTabHandler("nose")}
            active={currentTab === "nose"}
            width={119.3}
          />
          <RoundTabs
            label="복통"
            onClick={() => onChangeTabHandler("abdomen")}
            active={currentTab === "abdomen"}
            width={119.3}
          />
          <RoundTabs
            label="허리 통증"
            onClick={() => onChangeTabHandler("waist")}
            active={currentTab === "waist"}
            width={119.3}
          />
        </div>
      </section>
    </>
  );
};

export default ConsultTabs;
