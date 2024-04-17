// 마이페이지
"use client";

import { supabase } from "@/api/supabase";
import React, { useEffect, useState } from "react";
import MyPageTab from "@/components/mypage/MyPageTab";
import AdminMenu from "@/components/mypage/AdminMenu";
import AccessDenied from "@/components/mypage/AccessDenied";
import useMyPageStore from "@/shared/zustand/myPageStore";
import type { UserInfo } from "@/types";
import TopNavbar from "@/components/layout/TopNavbar";

const MyPage = () => {
  const [userInfo, setUserInfo] = useState<UserInfo[]>([]);
  const { hospitalName, setHospitalName } = useMyPageStore();

  useEffect(() => {
    // 유저 정보 불러오기
    const fetchUserInfo = async () => {
      try {
        const {
          data: { session }
        } = await supabase.auth.getSession();
        const user = session?.user;

        const { data, error } = await supabase
          .from("user_info")
          .select("*")
          .eq("user_id", user?.id);

        if (error) throw new Error(error.message);

        // user_type이 "hospital staff"이면 user_name을 hospitalName으로 설정
        if (data && data.length > 0) {
          const userInfo = data[0];
          if (userInfo.user_type === "hospital staff") {
            setHospitalName(userInfo.user_name);
          }
        }

        setUserInfo(data);
      } catch (error) {
        if (error instanceof Error) console.error(error.message);
      }
    };

    // 마이페이지에 클릭 했을 때, 유저 정보 넣기
    const insertUserInfo = async () => {
      try {
        const {
          data: { session }
        } = await supabase.auth.getSession();
        const user = session?.user;

        // 데이터가 이미 있는지 확인하기
        const { data: existingData, error: selectError } = await supabase
          .from("user_info")
          .select("*")
          .eq("user_id", user?.id);

        if (selectError) {
          throw new Error(selectError.message);
        }

        // 데이터가 존재하지 않을 때만 유저 정보 넣기
        if (!existingData || existingData.length === 0) {
          const { error: insertError } = await supabase
            .from("user_info")
            .insert([
              {
                user_id: user?.id,
                user_email: user?.email,
                provider: user?.app_metadata.provider,
                user_name: user?.user_metadata.full_name,
                user_type: "general user"
              }
            ]);
          if (insertError) {
            throw new Error(insertError.message);
          }
        }
      } catch (error) {
        if (error instanceof Error)
          console.error("사용자 정보 삽입 오류:", error.message);
      }
    };

    const fetchData = async () => {
      await insertUserInfo();
      await fetchUserInfo();
    };

    fetchData();
  }, [setHospitalName]);

  if (!userInfo.length) {
    return <p>사용자 정보를 불러오는 중입니다...</p>;
  }

  return (
    <section>
      <section>
        <TopNavbar title="마이페이지" />
        {userInfo.map((user) => (
          <div key={user.user_id}>
            <p className="text-[24px] font-bold px-[16px]">
              {user.user_name}님, <br />
              안녕하세요!
            </p>
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
    </section>
  );
};

export default MyPage;
