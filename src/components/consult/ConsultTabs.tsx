import React, { useEffect, useState } from "react";
import { supabase } from "@/api/supabase";
import RoundTabs from "../layout/RoundTabs";
import type { ConsultType, TabsProps } from "@/types";
import { Spinner } from "@nextui-org/react";

const ConsultTabs = ({ setPosts }: TabsProps) => {
  // 탭 상태 관리
  const [currentTab, setCurrentTab] = useState("nose");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, [currentTab]);

  const fetchPosts = async () => {
    setLoading(true);
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
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching posts:", error);
    }
    setLoading(false);
    return setPosts(data as ConsultType[]);
  };

  const onChangeTabHandler = (tabName: string) => {
    setCurrentTab(tabName);
  };

  return (
    <>
      {loading && <Spinner label="Loading..." color="warning" size="sm" />}
      {!loading && (
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
      )}
      {/* 스크롤 이벤트 처리 */}
      {/* <div ref={pageEnd}>Posts</div> */}
    </>
  );
};

export default ConsultTabs;
