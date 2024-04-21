import React, { useEffect, useState } from "react";
import { supabase } from "@/api/supabase";
import RoundTabs from "../layout/RoundTabs";

import type { ConsultType, TabsProps } from "@/types";

const ConsultTabs = ({ handleCategoryChange, setPosts }: TabsProps) => {
  // 탭 상태 관리
  const [currentTab, setCurrentTab] = useState("nose");

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
    <div className="flex flex-wrap justify-center mb-4 w-[390px]">
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
  );
};

export default ConsultTabs;
