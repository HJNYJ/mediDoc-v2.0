// 마이페이지
"use client";

import { supabase } from "@/api/supabase";
import React, { useEffect, useState } from "react";
import MyPageTab from "@/components/mypage/MyPageTab";
import AdminMenu from "@/components/mypage/AdminMenu";
import AccessDenied from "@/components/mypage/AccessDenied";
import type { UserInfo } from "@/types";
// import Reservation from "@/components/apply/Reservation";

const MyPage = () => {
  const [userInfo, setUserInfo] = useState<UserInfo[]>([]);
  const [hospitalName, setHospitalName] = useState<string>("");

  // 유저 정보 불러오기
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const { data, error } = await supabase.from("user_info").select("*");

        if (error) throw new Error(error.message);
        setUserInfo(data);
      } catch (error) {
        if (error instanceof Error) console.error(error.message);
      }
    };

    fetchUserInfo();
  }, []);

  useEffect(() => {
    if (userInfo.length > 0 && userInfo[0].user_type === "hospital staff") {
      setHospitalName(userInfo[0].user_name);
    }
  }, [userInfo]);

  if (!userInfo.length) {
    return <p>사용자 정보를 불러오는 중입니다...</p>;
  }

  return (
    <>
      <h3>마이페이지</h3>
      <section>
        {userInfo.map((user) => (
          <div key={user.user_id}>
            <p>{user.user_name}님, 안녕하세요!</p>
          </div>
        ))}
      </section>
      <section>
        {userInfo[0].user_type === "general user" && <MyPageTab />}
        {userInfo[0].user_type === "hospital staff" && (
          <AdminMenu hospitalName={hospitalName} />
        )}
        {userInfo[0].user_type === "developer" && <AccessDenied />}
      </section>
    </>
  );
};

export default MyPage;
