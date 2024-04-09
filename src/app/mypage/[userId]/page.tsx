// 마이페이지
"use client";

import { isThereClientSession } from "@/hooks/clientSession";
import React, { useEffect, useState } from "react";

const MyPage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [currentTab, SetCurrentTab] = useState("예약 정보");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { supabase, user } = await isThereClientSession();
        const { data, error } = await supabase
          .from("user_info")
          .select("*")
          .eq("user_email", user?.email || "");
        if (error) throw new Error(error.message);
        setUserInfo(data);
      } catch (error) {
        if (error instanceof Error) console.error(error.message);
      }
    };

    fetchUser();
  }, []);

  const onChangeTabHandler = (tabName: string) => {
    SetCurrentTab(tabName);
  };

  return (
    <>
      <h3>마이페이지</h3>
      <section>
        {userInfo ? (
          <div>
            <p>{userInfo[0]?.user_name}님, 안녕하세요!</p>
          </div>
        ) : (
          <p>사용자 정보를 불러오는 중입니다...</p>
        )}
      </section>
      <section>
        <div>
          <button
            className={`px-10 py-3 rounded-lg focus:outline-none text-lg ${
              currentTab === "예약 정보"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => onChangeTabHandler("예약 정보")}
          >
            예약 정보
          </button>
          <button
            className={`px-10 py-3 rounded-lg focus:outline-none text-lg ${
              currentTab === "스크랩"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => onChangeTabHandler("스크랩")}
          >
            스크랩
          </button>
          <button
            className={`px-10 py-3 rounded-lg focus:outline-none text-lg ${
              currentTab === "내가 한 질문"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => onChangeTabHandler("내가 한 질문")}
          >
            내가 한 질문
          </button>
        </div>
      </section>
    </>
  );
};

export default MyPage;
