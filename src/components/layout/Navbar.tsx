// 하단 내비게이션 바
"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import useAuthStore from "@/shared/zustand/authStore";
import { useRouter } from "next/navigation";

export const Navbar = () => {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const isLoggedIn = useAuthStore((state) => state.user.isLoggedIn);
  const changeLoggedIn = useAuthStore((state) => state.changeLoggedIn);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        // 세션 정보가 있는지 확인 후. 로그인 상태 설정
        changeLoggedIn(!!data.session);
      } catch (error) {
        if (error instanceof Error) console.error(error.message);
      }
    };
    fetchSession();
  }, [supabase.auth, changeLoggedIn]);

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
    <nav className="flex justify-between items-center py-4 px-6 bg-gray-500 text-white">
      <Link href={"/"}>홈</Link>
      {isLoggedIn ? (
        <button onClick={() => logoutHandler()}>로그아웃</button>
      ) : (
        <Link href={"/login"}>로그인</Link>
      )}

      <Link href={"/mypage"}>마이페이지</Link>
      <Link href={"/selftest"}>셀프테스트</Link>
      <Link href={"/consult"}>실시간 상담</Link>
    </nav>
  );
};
