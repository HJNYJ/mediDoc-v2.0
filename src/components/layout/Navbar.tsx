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
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const fetchSession = async () => {
      try {
        // 세션 정보가 있는지 확인 후. 로그인 상태 설정
        const {
          data: { session }
        } = await supabase.auth.getSession();

        const user = session?.user;

        changeLoggedIn(!!session);

        if (user) {
          setUserId(user.id);
        }
      } catch (error) {
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
    }
  };

  return (
    <nav className="sticky bottom-0 flex justify-between items-center py-4 px-6 bg-gray-500 text-white">
      <Link href={"/consult"}>실시간 상담</Link>
      <Link href={"/selftest"}>건강테스트</Link>
      <Link href={"/home"}>홈</Link>
      <Link href={`/mypage/${userId}`}>마이페이지</Link>
      {isLoggedIn ? (
        <button onClick={() => logoutHandler()}>로그아웃</button>
      ) : (
        <Link href={"/login"}>로그인</Link>
      )}
    </nav>
  );
};
