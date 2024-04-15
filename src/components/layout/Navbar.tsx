// 하단 내비게이션 바
"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import useAuthStore from "@/shared/zustand/authStore";
import { supabase } from "@/api/supabase";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import HomeIndicator from "@/assets/icons/HomeIndicator.png";
import StatusBar from "@/assets/icons/StatusBar.png";
import ConsultIcon from "@/assets/icons/consultIcon.png";
import TestIcon from "@/assets/icons/testIcon.png";
import HomeIcon from "@/assets/icons/homeIcon.png";
import MypageIcon from "@/assets/icons/mypageIcon.png";
import LoginIcon from "@/assets/icons/loginIcon.png";
import LogoutIcon from "@/assets/icons/logoutIcon.png";

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
      router.push("/");
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

  if (pathname === "/" || pathname === "/login") {
    return null;
  }

  return (
    <section className="w-[390px]">
      <Image
        src={StatusBar}
        alt="Status Bar"
        className="fixed top-0 left-0 w-[390px] z-50 mb-[44px]"
      />
      <nav className="sticky bottom-0 flex justify-between items-center py-4 px-6 mt-[44px] text-black">
        <Link href={"/consult"}>
          <Image src={ConsultIcon} alt="Consult Icon" />
        </Link>
        <Link href={"/selftest"}>
          <Image src={TestIcon} alt="Test Icon" />
        </Link>
        <Link href={"/home"}>
          <Image src={HomeIcon} alt="Home Icon" />
        </Link>
        <a onClick={handleMyPageClick} className="cursor-pointer">
          <Image src={MypageIcon} alt="Mypage Icon" />
        </a>
        {isLoggedIn ? (
          <button onClick={() => logoutHandler()}>
            <Image src={LogoutIcon} alt="Logout Icon" />
          </button>
        ) : (
          <Link href={"/login"}>
            <Image src={LoginIcon} alt="Login Icon" />
          </Link>
        )}
      </nav>
      <Image
        src={HomeIndicator}
        alt="Home Indicator"
        className="fixed bottom-0 left-0 w-[390px] z-50"
      />
    </section>
  );
};
