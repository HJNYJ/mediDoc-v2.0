import type { ConsultType, TabsProps } from "@/types";
import React, { useEffect, useState } from "react";
import RoundTabs from "../layout/RoundTabs";
import { supabase } from "@/api/supabase";

const ConsultTabs = ({ handleCategoryChange, setPosts }: TabsProps) => {
  // 탭 상태 관리
  const [currentTab, setCurrentTab] = useState("eyes");

  useEffect(() => {
    fetchPosts();
  }, [currentTab]);

  const fetchPosts = async () => {
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
      .eq("bodyparts", currentTab);

    if (error) {
      console.error("Error fetching posts:", error);
    }
    return setPosts(data as ConsultType[]);
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
    </div>
  );
};

export default ConsultTabs;
