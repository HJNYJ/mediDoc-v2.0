// "사진" 탭을 눌렀을 때 나오는 div
"use client";

import Image from "next/image";
import React from "react";

const ImageTab = () => {
  return (
    // 무한스크롤
    <main>
      {/* DB의 사진들을 map을 사용하여 grid 3 출력 */}
      {/* 아래는 map으로 출력됐다고 가정하고 Image로 각각을 표현 */}
      <section className="grid grid-cols-3 gap-4">
        <Image src="" alt="사진1" />
        <Image src="" alt="사진2" />
        <Image src="" alt="사진3" />
        <Image src="" alt="사진4" />
        <Image src="" alt="사진5" />
        <Image src="" alt="사진6" />
        <Image src="" alt="사진7" />
        <Image src="" alt="사진8" />
        <Image src="" alt="사진9" />
      </section>
    </main>
  );
};

export default ImageTab;
