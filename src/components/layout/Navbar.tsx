// 하단 내비게이션 바
import Link from "next/link";
import React from "react";

export const Navbar = () => {
  return (
    <nav>
      <Link href={"/"}>홈</Link>
      <Link href={"/login"}>로그인</Link>
      <Link href={"/mypage"}>마이페이지</Link>
      <Link href={"/selftest"}>셀프테스트</Link>
      <Link href={"/consult"}>실시간 상담</Link>
    </nav>
  );
};
