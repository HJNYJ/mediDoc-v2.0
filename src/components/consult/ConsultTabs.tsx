import { supabase } from "@/api/supabase";
import type { TabsProps } from "@/types";
import React, { useEffect, useState } from "react";
// 이건 일단 남겨놓음 소희님 탭스가 어떻게 될지 몰라서

const ConsultTabs = ({ handleCategoryChange }: TabsProps) => {
  // 탭 상태 관리
  // const [bodyparts, setBodyparts] = useState([]); // bodyparts 상태
  // const [selectedTab, setSelectedTab] = useState(""); // 선택된 탭 상태
  // // bodyparts 가져오기
  // useEffect(() => {
  //   async function fetchBodyparts() {
  //     try {
  //       const { data: bodypartsData, error } = await supabase
  //         .from("consult_info")
  //         .select("bodyparts");
  //       if (error) {
  //         throw error;
  //       }
  //     } catch (error) {
  //       console.error("Error fetching bodyparts:", error);
  //     }
  //   }
  //   fetchBodyparts();
  // }, []);
  // const handleTabChange = (bodypart) => {
  //   setSelectedTab(bodypart); // 선택된 탭 업데이트
  //   handleCategoryChange(bodypart);
  // };
  // return (
  //   <section className="max-w-md mx-auto mt-8">
  //     {bodyparts.map((bodypart) => (
  //       <button
  //         key={bodypart}
  //         className={selectedTab === bodypart ? "activeTab" : ""}
  //         onClick={() => handleTabChange(bodypart)}
  //       >
  //         {bodypart}
  //       </button>
  //     ))}
  //   </section>
  // );
};

export default ConsultTabs;
