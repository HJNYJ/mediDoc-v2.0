import type { TabsProps } from "@/types";
import React, { useEffect, useState } from "react";
import RoundTabs from "../layout/RoundTabs";
import { supabase } from "@/api/supabase";
import { useQuery } from "@tanstack/react-query";

const ConsultTabs = ({ handleCategoryChange }: TabsProps) => {
  // 탭 상태 관리
  const [currentTab, setCurrentTab] = useState("eyes|ears|nose|neck|waist");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, [currentTab]);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("consult_info")
      .select("*")
      .eq("bodyparts", currentTab);

    if (error) {
      console.error("Error fetching posts:", error);
    }
    return setPosts(data || []);
  };

  const onChangeTabHandler = (tabName: string) => {
    setCurrentTab(tabName);
    handleCategoryChange(tabName);
  };

  return (
    <div className="flex mb-4">
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
          label="목 통증"
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
      <div>
        {/** 데이터 잘 렌더링됨 */}
        {posts.map((post) => (
          <div key={post.id}>
            {/* 상담 정보를 렌더링하는 부분 */}
            <p>{post.title}</p>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConsultTabs;
