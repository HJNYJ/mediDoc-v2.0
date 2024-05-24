// 마이페이지
"use client";

import { supabase } from "@/api/supabase";
import React, { useEffect, useState } from "react";
import MyPageTab from "@/components/mypage/MyPageTab";
import AdminMenu from "@/components/mypage/AdminMenu";
import AccessDenied from "@/components/mypage/AccessDenied";
import useMyPageStore from "@/shared/zustand/myPageStore";
import TopNavbar from "@/components/layout/TopNavbar";
import type { UserInfo } from "@/types";
import Button from "@/components/layout/Buttons";
import { useRouter } from "next/navigation";

const MyPage = () => {
  const [userInfo, setUserInfo] = useState<UserInfo[]>([]);
  const { setHospitalName } = useMyPageStore();
  const router = useRouter();

  useEffect(() => {
    // 유저 정보 불러오기
    const fetchUserInfo = async () => {
      try {
        const {
          data: { session }
        } = await supabase.auth.getSession();
        const user = session?.user;
        const id = user?.id ?? "";

        const { data, error } = await supabase
          .from("user_info")
          .select("*")
          .eq("user_id", id);

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
        const id = user?.id ?? "";
        const email = user?.email ?? "";
        const provider = user?.app_metadata.provider ?? "";

        // 데이터가 이미 있는지 확인하기
        const { data: existingData, error: selectError } = await supabase
          .from("user_info")
          .select("*")
          .eq("user_id", id);

        if (selectError) {
          throw new Error(selectError.message);
        }

        // 데이터가 존재하지 않을 때만 유저 정보 넣기
        if (!existingData || existingData.length === 0) {
          const { error: insertError } = await supabase
            .from("user_info")
            .insert({
              provider: provider,
              user_email: email,
              user_id: id,
              user_name: user?.user_metadata.full_name,
              user_type: "general user"
            });
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

  // 회원 탈퇴하는 함수
  const deleteMyAccountHandler = async () => {
    // 확인 메시지
    const confirmed = window.confirm("정말로 회원 탈퇴하시겠습니까?");
    if (!confirmed) {
      return;
    }

    try {
      await deleteUserData();
    } catch (error) {
      if (error instanceof Error)
        console.error("회원 탈퇴 오류", error.message);
    }

    alert("회원 탈퇴가 완료됐습니다. 이용해주셔서 감사합니다.");
    router.push("/home");
  };

  // 유저의 모든 정보를 지우는 함수
  const deleteUserData = async () => {
    try {
      // 유저 아이디, email 가져오기
      const {
        data: { session }
      } = await supabase.auth.getSession();
      const user = session?.user;
      const userId = user?.id ?? "";
      const userEmail = user?.email ?? "";

      // reservation_info에서 예약 정보 삭제하기
      await supabase
        .from("reservation_info")
        .delete()
        .eq("user_email", userEmail);

      // consult_info에서 유저가 쓴 상담글 id 가져오기
      const consultInfo = await supabase
        .from("consult_info")
        .select("consult_id")
        .eq("user_email", userEmail);

      const consultIds = consultInfo.data?.map((info) => info.consult_id);
      if (!consultIds?.length) return;

      // consult_photos에서 consult_id가 같은 사진 지우기
      for (const consultId of consultIds) {
        await supabase
          .from("consult_photos")
          .delete()
          .eq("consult_id", consultId);

        // consult_answer에서 consult_id가 같은 답변 지우기
        await supabase
          .from("consult_answer")
          .delete()
          .eq("consult_id", consultId);
      }

      // consult_info에서 상담글 지우기
      await supabase.from("consult_info").delete().eq("user_email", userEmail);

      // review_info에서 유저가 쓴 후기 글의 review_id 가져오기
      const reviewInfo = await supabase
        .from("review_info")
        .select("review_id")
        .eq("user_email", userEmail);

      const reviewIds = reviewInfo.data?.map((info) => info.review_id);
      if (!reviewIds?.length) return;

      // review_photos에서 review_id가 같은 사진 지우기
      for (const reviewId of reviewIds) {
        await supabase.from("review_photos").delete().eq("review_id", reviewId);

        // review_info에서 후기 지우기
        await supabase.from("review_info").delete().eq("user_email", userEmail);
      }

      // 유저가 스크랩한 내역 지우기
      const scrapInfo = await supabase
        .from("scrapped_list")
        .select("scrap_id")
        .eq("user_id", userId);
      console.log("scarpInfo", scrapInfo);

      const scrapIds = scrapInfo.data?.map((info) => info.scrap_id);
      console.log("scrapIds", scrapIds);
      if (!scrapIds?.length) return;

      for (const scrapId of scrapIds) {
        console.log("scrapId", scrapId);
        await supabase.from("scrapped_list").delete().eq("scrap_id", scrapId);
      }

      // user_info에서 id가 같은 유저정보 지우기
      await supabase.from("user_info").delete().eq("user_id", userId);

      // auth에서 user_id가 일치하는 정보 지우기
      await supabase.auth.admin.deleteUser(userId);
      // 로그아웃 하기
      await supabase.auth.signOut();
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  return (
    <>
      <section>
        <section>
          <TopNavbar title="마이페이지" />
          <section className="flex justify-between">
            {userInfo.map((user) => (
              <div key={user.user_id}>
                <p className="text-[24px] font-bold px-4">
                  {user.user_name}님, <br />
                  안녕하세요!
                </p>
              </div>
            ))}
            <div className="w-24">
              <Button
                type="button"
                buttonType="filled"
                size="base"
                label="회원 탈퇴하기"
                onClick={deleteMyAccountHandler}
              />
            </div>
          </section>
        </section>
        <section>
          {userInfo[0].user_type === "general user" && <MyPageTab />}
          {userInfo[0].user_type === "hospital staff" && <AdminMenu />}
          {userInfo[0].user_type === "developer" && <AccessDenied />}
        </section>
      </section>
    </>
  );
};

export default MyPage;
