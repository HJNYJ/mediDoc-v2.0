// 질문&답변 Textarea

"use client";

import { consultAddForm, supabase } from "@/api/supabase";
import React, { useState } from "react";
import HashTags from "./HashTags";
import ConsultImages from "./ConsultImages";

const AskForm = () => {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [bodyparts, setBodyparts] = useState("");
  // 해시태그 데이터 저장할 상태
  const [hashtags, setHashtags] = useState({});
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string[]>([]);

  const fetchHashtags = async (selectedCategory: string) => {
    const { data, error } = await supabase
      .from("consult_test")
      .select("tag1, tag2, tag3 ,tag4, tag5, tag6, tag7, tag8, tag9, tag10")
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
        tag8: tags.tag8,
        tag9: tags.tag9,
        tag10: tags.tag10
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 데이터 추가
    const hashtagsArray: string[] = Object.values(hashtags); // Hashtags 객체에서 문자열 배열 추출
    const data = await consultAddForm(
      title,
      contents,
      bodyparts,
      hashtagsArray,
      uploadedFileUrl // 이미지 URL 추가
    );

    console.log(data);
    if (data) {
      console.log("AskForm 추가 성공", data!);

      // 이미지 URL을 객체에 추가
      const imageData = { image_url: uploadedFileUrl };
      console.log("이미지 데이터:", imageData);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-5">
        <div>
          <h1 className="text-3xl font-bold">실시간 상담</h1>
        </div>
        <div>
          <label>제목</label>
          <input
            type="text"
            placeholder="예) 이런 증상은 비염인가요?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-md border focus:outline-none focus:border-blue-500"
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
            className="w-full px-4 py-2 rounded-md border focus:outline-none focus:border-blue-500"
          />
        </div>
        <p className="text-gray-500">{contents.length} /500</p>

        <div>
          <label className="block mb-1">카테고리</label>
          <select
            onChange={(e) => {
              fetchHashtags(e.target.value);
              setBodyparts(e.target.value);
            }}
            className="w-full px-4 py-2 rounded-md border focus:outline-none focus:border-blue-500"
          >
            <option>증상 과목 선택</option>
            <option value="eyes">눈</option>
            <option value="ears">귀</option>
            <option value="nose">코</option>
            <option value="abdomen">배</option>
            <option value="neck">목</option>
          </select>
          <HashTags hashtags={hashtags} />
        </div>
        <div>
          <label>사진첨부</label>
          <div>
            <ConsultImages
              uploadedFileUrl={uploadedFileUrl}
              setUploadedFileUrl={setUploadedFileUrl}
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-yellow-500 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:bg-blue-700 hover:bg-red-400"
        >
          물어보기
        </button>
      </form>
    </>
  );
};

export default AskForm;
