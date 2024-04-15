// 로그인 페이지
"use client";

import { supabase } from "@/api/supabase";
import kakaologin from "@/assets/icons/kakaologin.png";
import googlelogin from "@/assets/icons/googlelogin.png";
import Image from "next/image";
import React from "react";
import HomeIndicator from "@/assets/icons/HomeIndicator.png";
import StatusBar from "@/assets/icons/StatusBar.png";

const LoginPage = () => {
  const signInWithKakao = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "kakao",
        options: { redirectTo: "http://localhost:3000/" }
      });
      if (error) throw error;
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        alert("로그인 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      }
    }
  };

  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: "http://localhost:3000/",
          queryParams: {
            access_type: "offline",
            prompt: "consent"
          }
        }
      });
      if (error) throw error;
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
      alert("로그인 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
  };

  return (
    <>
      <Image
        src={StatusBar}
        alt="Status Bar"
        className="fixed top-0 left-0 w-[390px] z-50 mb-[44px]"
      />
      <section className="w-[358px] mx-[16px] mt-[616px]">
        <button onClick={() => signInWithKakao()}>
          <Image
            src={kakaologin}
            alt="카카오로 계속하기"
            className="mb-[8px]"
          />
        </button>
        <button onClick={() => signInWithGoogle()}>
          <Image src={googlelogin} alt="구글로 계속하기" className="" />
        </button>
      </section>
      <Image src={HomeIndicator} alt="Home Indicator" />
    </>
  );
};

export default LoginPage;
