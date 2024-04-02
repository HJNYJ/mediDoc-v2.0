// 질문&답변 Textarea

"use client";

import { consultAddForm, supabase } from "@/api/supabase";
import React, { useState } from "react";
import HashTags from "./HashTags";

const AskForm = () => {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  // 해시태그 데이터를 저장할 상태
  const [hashtags, setHashtags] = useState({});

  const fetchHashtags = async (selectedCategory: string) => {
    const { data, error } = await supabase
      .from("consult_test")
      .select("tag1, tag2, tag3 ,tag4, tag5, tag6, tag7, tag8")
      .eq("body_section", selectedCategory);

    if (error) {
      console.error(error);
      return;
    }
    // 받아온 데이터를 상태에 저장
    if (data.length > 0) {
      const tags = data[0]; // 예시에서는 첫 번째 데이터만 사용
      setHashtags({
        tag1: tags.tag1,
        tag2: tags.tag2,
        tag3: tags.tag3,
        tag4: tags.tag4,
        tag5: tags.tag5,
        tag6: tags.tag6,
        tag7: tags.tag7,
        tag8: tags.tag8
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data, error } = await consultAddForm(title, contents);
    if (error) {
      console.error("askForm 데이터 추가 실패", error);
    } else {
      console.log("AskForm 추가 성공", data);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <h1>실시간 상담</h1>
        </div>
        <div>
          <label>제목</label>
          <input
            type="text"
            placeholder="예) 이런 증상은 비염인가요?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>질문</label>
          <textarea
            placeholder="예) 코가 간지럽고 자꾸 재채기가 나오는데 비염약을 먹어야할까요?"
            maxLength={500}
            value={contents}
            onChange={(e) => setContents(e.target.value)}
            required
          />
        </div>
        <p>{contents.length} /500</p>
        <p>위는 가져온거 아래는 붙인거 둘다 되는 것 </p>
        <div>
          <label>카테고리</label>
          <select onChange={(e) => fetchHashtags(e.target.value)}>
            <option>증상 과목 선택</option>
            <option value="eyes">눈</option>
            <option value="ears">귀</option>
            <option value="nose">코</option>
            <option value="abdomen">배</option>
            <option value="neck">목</option>
          </select>
          <HashTags hashtags={hashtags} />
        </div>
        <button type="submit">물어보기</button>
      </form>
    </>
  );
};

export default AskForm;
