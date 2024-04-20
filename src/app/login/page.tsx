// 로그인 페이지
"use client";

import { supabase } from "@/api/supabase";
import kakaologin from "@/assets/icons/kakaologin.png";
import googlelogin from "@/assets/icons/googlelogin.png";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  const signInWithKakao = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "kakao",
        options: { redirectTo: "https://medi-doc-three.vercel.app/home" }
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
    <>
      <section className=" mx-[16px] my-[140%]">
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
    </>
  );
};

export default LoginPage;
