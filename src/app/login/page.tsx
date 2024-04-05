// 로그인 페이지
"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import React from "react";

const LoginPage = () => {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const signInWithKakao = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "kakao",
        options: { redirectTo: "http://localhost:3000/" }
      });
      if (error) throw error;
    } catch (error) {
      console.error(error.message);
      alert("로그인 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
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
      console.error(error.message);
      alert("로그인 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
  };

  return (
    <section className="flex flex-col">
      <button onClick={() => signInWithKakao()}>카카오로 계속하기</button>
      <button>네이버로 계속하기</button>
      <button onClick={() => signInWithGoogle()}>Google로 계속하기</button>
      <button>Apple로 계속하기</button>
    </section>
  );
};

export default LoginPage;
