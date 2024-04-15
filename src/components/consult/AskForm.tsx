"use client";
import { consultAddForm, uploadPhotosUrl, supabase } from "@/api/supabase";
import React, { MouseEvent, useState } from "react";
import HashTags from "./HashTags";
// import ConsultImages from "./ConsultImages";
import { v4 as uuidv4 } from "uuid";
const AskForm = () => {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [bodyparts, setBodyparts] = useState("");
  // 해시태그 데이터 저장할 상태
  const [hashtags, setHashtags] = useState({});
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [img, setImg] = useState<File[]>([]);
  /** 이미지 컴포넌트에서 사용하는 state 및 함수 시작 */
  const [files, setFiles] = useState<File[]>([]);
  const [uploadedImages, setUploadedImages] = useState<
    {
      name: string;
      type: string;
      dataUrl: string;
    }[]
  >([]);
  // 이미지 업로드 핸들러
  const setImgHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("테스트 드드드");
    console.log(typeof e.target.files); // string x , object
    const fileList = Array.from(e.target.files as FileList);
    setImg([...img, ...fileList]);
  };
  // 웹 페이지에서 파일 등록하기
  const handleFiles = async (
    // e: React.ChangeEvent<HTMLInputElement>,
    consultId: string
  ) => {
    // const fileList = e.target.files;
    const fileList = img;
    if (fileList) {
      const filesArray = Array.from(fileList);
      setFiles(filesArray);
      filesArray.forEach((file) => {
        handleAddImages(file, consultId);
      });
    }
  };
  // 업로드된 파일이 5개가 초과되면 그 뒤에 들어오는 파일은 없앰
  if (uploadedFileUrl.length > 5 && files.length > 5) {
    uploadedFileUrl.pop() && files.pop();
    alert("이미지는 최대 5개까지 업로드 가능합니다.");
  }
  // 이미지 업로드 함수
  const handleAddImages = async (file: File, consultId: string) => {
    try {
      const newFileName = `${Math.random()}`;
      // Supabase Storage에 이미지 업로드
      const result = await supabase.storage
        .from("images")
        .upload(`user_images/${newFileName}`, file);
      // console.log("upload file result => ", result.data);
      if (result.data) {
        const url =
          process.env.NEXT_PUBLIC_SUPABASE_URL +
          "/storage/v1/object/public/images/" +
          result.data.path;
        console.log("url => ", url);
        const uploadImgUrl = await uploadPhotosUrl(url.toString(), consultId);
        if (uploadImgUrl) {
          console.log("이건 askform이구영 => ", uploadImgUrl);
        }
        setUploadedFileUrl((prev: string[]) => [...prev, url]);
      } else {
        console.log("result", result);
      }
      // FileReader API 사용하여 이미지 읽고 DataURL 생성
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        // 이미지 렌더링
        setUploadedImages((prevFiles) => [
          ...prevFiles,
          {
            name: file.name,
            type: file.type,
            dataUrl
          }
        ]);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("파일 업로드 중 에러 발생 ㅠㅠ", error);
    }
  };
  // 이미지 클릭 -> 순서 맨 앞으로
  const handleImageOrder = (e: MouseEvent<HTMLElement>) => {
    const url = e.currentTarget.id;
    // 클릭된 아이템 인덱스 번호
    const clickedItem = uploadedFileUrl.indexOf(url);
    // 클릭 된 아이템을 제외한 배열
    const updatedArr = uploadedFileUrl.filter(
      (item) => item !== uploadedFileUrl[clickedItem]
    );
    // 클릭 된 아이템을 맨 앞으로 해서 state를 변경
    setUploadedFileUrl([uploadedFileUrl[clickedItem], ...updatedArr]);
  };
  // X 버튼 클릭 -> 이미지 삭제
  const handleDeleteImage = (idx: number) => {
    // uploadedFileUrl state 업데이트
    setUploadedFileUrl(uploadedFileUrl.filter((_, index) => index !== idx));
    // uploadedImages state 업데이트
    const updatedImages = uploadedImages.filter((_, index) => index !== idx);
    setUploadedImages(updatedImages);
  };
  /** 이미지 컴포넌트 사용하는 state 및 함수 끝 */
  const consultId = uuidv4();
  // 1. 실시간상담 게시글 작성 및 이미지 업로드 (저장전)
  // 2. uuidv4();  ->>> 작성한 데이터(+consultId) ->> 실제 DB에 저장(데이터 넘겨서 그 데이터들을 INSERT)
  // consultInfo 테이블, consult_image 테이블에 동일한 consultId
  console.log(consultId);
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
  /**
   * 실시간 상담 데이터 및 이미지 저장(supabase, storage )
   */
  const handleSubmit = async () => {
    // 데이터 추가
    // const hashtagsArray: string[] = Object.values(hashtags); // Hashtags 객체에서 문자열 배열 추출
    // console.log(hashtagsArray);
    // 어떻게 선택된 배열만 찾아올 수 있을까????
    // console.log("selectedTags => ", selectedTags);
    const data = await consultAddForm(
      title,
      contents,
      bodyparts,
      selectedTags
      // consultId: uuid
      // 이미지 URL 추가
    );
    // handleFiles(uuid) >> handelAddImages(uuid) >> uploadPhotosUrl(uuid)
    console.log(data);
    handleFiles(data); // data >> consultId
    if (data) {
      console.log("AskForm 추가 성공", data!);
      // 이미지 URL을 객체에 추가
      // const imageData = { image_url: uploadedFileUrl };
      // console.log("이미지 데이터:", imageData);
    }
  };
  return (
    <>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="max-w-lg mx-auto space-y-5"
      >
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
          <HashTags
            hashtags={hashtags}
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
          />
        </div>
        <div>
          <label>사진첨부</label>
          <div>
            {/* <ConsultImages
              uploadedFileUrl={uploadedFileUrl}
              setUploadedFileUrl={setUploadedFileUrl}
            /> */}
            {/* 이미지 컴포넌트 시작 */}
            <div>
              <h2>
                사진
                <p>*</p>
                <span>{uploadedFileUrl.length}/5</span>
              </h2>
              <div>
                {uploadedImages.map((image, idx: number) => (
                  <div key={image.dataUrl}>
                    <img src={image.dataUrl} alt={image.name} />
                    <div id={image.dataUrl} onClick={handleImageOrder}></div>
                    <button onClick={() => handleDeleteImage(idx)}>삭제</button>
                  </div>
                ))}
                {uploadedFileUrl.length >= 5 ? (
                  <></>
                ) : (
                  <label htmlFor="file">
                    <input
                      type="file"
                      id="file"
                      name="file"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setImgHandler(e)
                      }
                      // onChange={handleFiles}
                      multiple
                      hidden
                    />
                    <button className="flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                        />
                      </svg>
                    </button>
                  </label>
                )}
              </div>
            </div>
            {/* 이미지 컴포넌트 끝 */}
          </div>
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          className="w-full bg-yellow-500 bg-yellow text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:bg-blue-700 hover:bg-red-400"
        >
          물어보기
        </button>
      </form>
    </>
  );
};
export default AskForm;
