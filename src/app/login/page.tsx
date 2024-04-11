// 로그인 페이지
"use client";

import { supabase } from "@/api/supabase";
import React from "react";
// import { isThereClientSession } from "@/hooks/clientSession";

interface User {
  email: string;
  id: string;
}

const LoginPage = () => {
  const signInWithKakao = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "kakao",
        options: { redirectTo: "http://localhost:3000/" }
      });
      if (error) throw error;

      const {
        data: { user }
      } = await supabase.auth.getUser();
      if (user) saveUserInfo(user);
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
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
      const {
        data: { user }
      } = await supabase.auth.getUser();
      if (user) saveUserInfo(user);
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
      alert("로그인 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
  };

  const saveUserInfo = async (user: User) => {
    if (!user.email) {
      console.error("사용자 이메일이 없습니다.");
      return;
    }
    try {
      const { email, id } = user;
      await supabase
        .from("user_info")
        .upsert([{ user_email: email, user_id: id }]);
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }
  };

  return (
    <section className="flex flex-col">
      <button onClick={() => signInWithKakao()}>카카오로 계속하기</button>
      <button onClick={() => signInWithGoogle()}>Google로 계속하기</button>
    </section>
  );
};

export default LoginPage;
