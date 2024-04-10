// 하단 내비게이션 바
"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import useAuthStore from "@/shared/zustand/authStore";
import { supabase } from "@/api/supabase";
import { useRouter } from "next/navigation";

export const Navbar = () => {
  const router = useRouter();
  const isLoggedIn = useAuthStore((state) => state.user.isLoggedIn);
  const changeLoggedIn = useAuthStore((state) => state.changeLoggedIn);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        // 세션 정보가 있는지 확인 후. 로그인 상태 설정
        const { data } = await supabase.auth.getSession();
        changeLoggedIn(!!data.session);

        // user_info 테이블에서 이메일이 같은지 확인
        // const { data, error } = await supabase
        //   .from("user_info")
        //   .select("user_id")
        //   .eq("user_email", user?.email || "");
        // if (error) throw new Error(error.message);

        // console.log("data", data);

        // if (data && data.length > 0) {
        //   setUserId(data[0].user_id);
        // }

        if (data?.user) {
          setUserId(data.user.id);
        }
      } catch (error) {
        if (error instanceof Error) console.error(error.message);
        if (error instanceof Error) console.error(error.message);
      }
    };
    fetchSession();
  }, [changeLoggedIn]);

  const logoutHandler = async () => {
    try {
      await supabase.auth.signOut();
      changeLoggedIn(false);
      router.push("/");
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
      if (error instanceof Error) console.error(error.message);
    }
  };

  return (
    <nav className="flex justify-between items-center py-4 px-6 bg-gray-500 text-white">
      <Link href={"/consult"}>실시간 상담</Link>
      <Link href={"/selftest"}>건강테스트</Link>
      <Link href={"/"}>홈</Link>
      <Link href={`/mypage/${userId}`}>마이페이지</Link>
      {isLoggedIn ? (
        <button onClick={() => logoutHandler()}>로그아웃</button>
      ) : (
        <Link href={"/login"}>로그인</Link>
      )}
    </nav>
  );
};
