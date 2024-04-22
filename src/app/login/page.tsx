// 로그인 페이지
"use client";

import React from "react";
import { supabase } from "@/api/supabase";
import { useRouter } from "next/navigation";
import {
  GoogleIcon,
  KakaoIcon,
  LogoIcon
} from "@/components/layout/CheckIcons";

const LoginPage = () => {
  const router = useRouter();

  const signInWithKakao = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "kakao",
        options: { redirectTo: "http://localhost:3000/home" }
      });
      if (error) throw error;
      router.push("/home");
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
          redirectTo: "https://medi-doc-three.vercel.app/home",
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
    <div className="w-full h-[100vh] bg-orange relative">
      <span className="absolute w-[18px] h-full bg-orange left-[-16px]"></span>
      <span className="absolute w-[18px] h-full bg-orange right-[-16px]"></span>
      <article className="flex justify-center">
        <LogoIcon />
      </article>
      <section className="absolute left-[50%] w-full translate-x-[-50%] bottom-[10%]">
        <button className="w-full" onClick={() => signInWithKakao()}>
          <KakaoIcon />
        </button>
        <button className="w-full" onClick={() => signInWithGoogle()}>
          <GoogleIcon />
        </button>
      </section>
    </div>
  );
};

export default LoginPage;
