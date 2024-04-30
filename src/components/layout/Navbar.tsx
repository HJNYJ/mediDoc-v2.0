// 하단 내비게이션 바
"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import useAuthStore from "@/shared/zustand/authStore";
import { supabase } from "@/api/supabase";
import { useRouter, usePathname } from "next/navigation";

import {
  ConsultBtnIcon,
  HomeBtnIcon,
  LoginIconBtn,
  LogoutBtnIcon,
  MyPageIcon,
  OrangeConsultIcon,
  OrangeHomeIcon,
  OrangeSelftTestIcon,
  SelfTestIcon
} from "./CheckIcons";

export const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
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
      router.push("/home");
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }
  };

  const handleMyPageClick = () => {
    if (!isLoggedIn) {
      router.push("/login");
    } else {
      router.push(`/mypage/${userId}`);
    }
  };

  if (
    pathname === "/" ||
    pathname === "/login" ||
    pathname === "/map" ||
    pathname === `/mypage/${userId}`
  ) {
    return null;
  }
  return (
    <div className="z-10 relative pt-20">
      <nav className="navbar fixed bottom-0 left-[50%] translate-x-[-50%] bg-white nav_width border-t-2">
        <div className="flex justify-between px-2 py-2">
          <Link href={"/consult"}>
            {pathname === "/consult" || pathname === "/consult/ask" ? (
              <OrangeConsultIcon />
            ) : (
              <ConsultBtnIcon />
            )}
          </Link>
          <Link href={"/selftest"}>
            {pathname === "/selftest" ? (
              <OrangeSelftTestIcon />
            ) : (
              <SelfTestIcon />
            )}
          </Link>
          <Link href={"/home"}>
            {pathname === "/home" ? <OrangeHomeIcon /> : <HomeBtnIcon />}
          </Link>
          <div onClick={handleMyPageClick} className="cursor-pointer">
            <MyPageIcon />
          </div>
          {isLoggedIn ? (
            <button onClick={() => logoutHandler()}>
              <LogoutBtnIcon />
            </button>
          ) : (
            <Link href={"/login"}>
              <LoginIconBtn />
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
};
