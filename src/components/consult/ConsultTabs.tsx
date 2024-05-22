import React, { useEffect, useState, useMemo } from "react";
import { supabase } from "@/api/supabase";
import RoundTabs from "../layout/RoundTabs";
import type { ConsultType, TabsProps } from "@/types";
import { Spinner } from "@nextui-org/react";

const MemoizedRoundTabs = React.memo(RoundTabs);

const ConsultTabs = ({ setPosts }: TabsProps) => {
  // 탭 상태 관리
  const [currentTab, setCurrentTab] = useState("nose");
  const [loading, setLoading] = useState(true);

  const memoizedFetchPosts = useMemo(() => {
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
    return fetchPosts;
  }, [currentTab, setPosts]);

  useEffect(() => {
    memoizedFetchPosts();
  }, [memoizedFetchPosts, currentTab]);

  const onChangeTabHandler = (tabName: string) => {
    setCurrentTab(tabName);
  };

  const tabData = useMemo(
    () => [
      { label: "코 통증", name: "nose", width: 119.3 },
      { label: "목 통증", name: "neck", width: 119.3 },
      { label: "귀 통증", name: "ears", width: 119.3 },
      { label: "등/허리 통증", name: "waist", width: 120.3 },
      { label: "배 통증", name: "abdomen", width: 120.3 },
      { label: "가슴 통증", name: "chest", width: 120.3 }
    ],
    []
  );

  return (
    <>
      {loading && <Spinner label="Loading..." color="warning" size="sm" />}
      {!loading && (
        <div className="flex flex-wrap justify-center mb-4">
          {tabData.map((tab) => (
            <MemoizedRoundTabs
              key={tab.name}
              label={tab.label}
              onClick={() => onChangeTabHandler(tab.name)}
              active={currentTab === tab.name}
              width={tab.width}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default ConsultTabs;
