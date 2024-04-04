// 로그인 페이지
"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";

const LoginPage = () => {
  const supabase = createClientComponentClient();

  const signInWithKakao = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "kakao",
      options: { redirectTo: "http://localhost:3000/" }
    });
  };

  return (
    <section className="flex flex-col">
      <button onClick={() => signInWithKakao()}>카카오로 계속하기</button>
      <button>네이버로 계속하기</button>
      <button>Google로 계속하기</button>
      <button>Apple로 계속하기</button>
    </section>
  );
};

export default LoginPage;
