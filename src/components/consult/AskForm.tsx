"use client";
import { consultAddForm, uploadPhotosUrl, supabase } from "@/api/supabase";
import React, { MouseEvent, useState } from "react";
import HashTags from "./HashTags";
import { v4 as uuidv4 } from "uuid";
import { getUserInfo } from "@/utils/getUserInfo";
import Image from "next/image";
import camera from "@/assets/icons/consult/camera.png";
import imageBox from "@/assets/icons/consult/imagebox.png";
import Button from "../layout/Buttons";
import TopNavbar from "../layout/TopNavbar";
import { useRouter } from "next/navigation";
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
      dataUrl: string | ArrayBuffer | null;
    }[]
  >([]);
  const router = useRouter();

  /** 이미지 컴포넌트 사용하는 state 및 함수 끝 */
  const consultId = uuidv4();
  console.log(consultId);

  // 이미지 업로드 핸들러
  const setImgHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = Array.from(e.target.files as FileList);
    setImg([...img, ...fileList]);
    // 이미지를 선택한 후에 바로 이미지를 미리보기
    fileList.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImages(
          (
            prevFiles: {
              name: string;
              type: string;
              dataUrl: string | ArrayBuffer | null;
            }[]
          ) => [
            ...prevFiles,
            {
              name: file.name,
              type: file.type,
              dataUrl: reader.result
            }
          ]
        );
      };
      reader.readAsDataURL(file);
    });
  };
  // 웹 페이지에서 파일 등록하기
  const handleFiles = async (consultId: string) => {
    const fileList = img;
    if (fileList.length) {
      const filesArray = Array.from(fileList);
      setFiles(filesArray);
      filesArray.forEach((file) => {
        handleAddImages(file, consultId);
      });
    }
  };
  // 업로드된 파일이 3개가 초과되면 그 뒤에 들어오는 파일은 없앰
  if (uploadedFileUrl.length > 3 && files.length > 3) {
    uploadedFileUrl.pop() && files.pop();
    alert("이미지는 최대 3개까지 업로드 가능합니다.");
  }
  // 이미지 업로드 함수
  const handleAddImages = async (file: File, consultId: string) => {
    console.log("consultId >>>>>", consultId);
    try {
      const newFileName = `${Math.random()}`;
      // Supabase Storage에 이미지 업로드
      const result = await supabase.storage
        .from("images")
        .upload(`user_images/${newFileName}`, file);
      if (result.data) {
        const url =
          process.env.NEXT_PUBLIC_SUPABASE_URL +
          "/storage/v1/object/public/images/" +
          result.data.path;
        const uploadImgUrl = await uploadPhotosUrl(
          url.toString(),
          consultId.toString()
        );

        if (uploadImgUrl) {
          console.log("이건 askform이구영 => ", uploadImgUrl);
        }
      } else {
        console.log("result", result.error.message);
      }
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
    setImg([]);
  };

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
    const userData = await getUserInfo();
    const userName = userData?.userName;
    const userEmail = userData?.userEmail || null;

    const data = await consultAddForm(
      title,
      contents,
      bodyparts,
      selectedTags,
      userName,
      userEmail
    );

    const id: string = data?.consultId || "";

    handleFiles(id);

    if (data) {
      alert("글 작성이 완료됐습니다.");
      router.push("/consult");
    }
  };
  return (
    <>
      <TopNavbar title="실시간 상담" />
      <div className="mt-5">
        {/* <Image src={searchbar} alt="서치바" className="w-[390px] h-[50px] mb-5" /> */}
        <div className=""></div>
        <form onSubmit={(e) => e.preventDefault()} className="mt-1">
          <div>
            <p className="regular-16 text-gray-800">제목</p>
            <input
              type="text"
              placeholder="예) 이런 증상은 비염인가요?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-[358px] h-[51px] rounded-lg border mt-3 mb-6 text-gray-600"
              required
            />
          </div>
          <div className="">
            <p className="regular-16 text-gray-800">질문</p>
            <textarea
              placeholder="예) 코가 간지럽고 자꾸 재채기가 나오는데 비염약을 먹어야할까요?"
              maxLength={500}
              value={contents}
              onChange={(e) => setContents(e.target.value)}
              required
              className="w-[358px] h-[290px] border rounded-lg mt-3 text-gray-800 resize-none"
            />
          </div>
          <p className="text-gray-500 text-right regular-13 mb-6 mr-5">
            {contents.length} /500
          </p>
          <div className="mb-5">
            <label className="block mb-3 regular-14 text-gray-800">
              카테고리
            </label>
            <select
              onChange={(e) => {
                fetchHashtags(e.target.value);
                setBodyparts(e.target.value);
              }}
              className="bg-bluegray w-[358px] h-[55px] rounded-xl border border-gray-300 mb-7 pl-5 semibold-16 text-gray-800"
            >
              <option className="semibold-16">부위 선택</option>
              <option value="eyes">눈</option>
              <option value="ears">귀</option>
              <option value="nose">코</option>
              <option value="abdomen">배</option>
              <option value="neck">목</option>
            </select>
            <p className="regular-14 text-gray-800 ml-2 mb-3">증상</p>
            <HashTags
              hashtags={hashtags}
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
            />
          </div>
          <div>
            {/* 이미지 컴포넌트 시작 */}
            <div>
              <p className="regular-14 text-gray-800 ml-2 mb-3">
                사진
                {/* <span className="text-right">{uploadedFileUrl.length}/3</span> */}
              </p>
              <div>
                {uploadedImages.map((image, idx: number) => {
                  return (
                    <div key={idx}>
                      {/**이미지 렌더링 */}
                      <img
                        src={String(image.dataUrl)}
                        alt={image.name}
                        className="w-[100px] h-[100px]"
                      />
                      {/* <img src={image.dataUrl} alt={image.name} /> */}
                      <div onClick={handleImageOrder}></div>
                      <button onClick={() => handleDeleteImage(idx)}>
                        삭제
                      </button>
                    </div>
                  );
                })}
                {uploadedFileUrl.length >= 3 ? (
                  <></>
                ) : (
                  <label htmlFor="file" className="flex">
                    <input
                      type="file"
                      id="file"
                      name="file"
                      onChange={setImgHandler}
                      // onChange={handleFiles}
                      multiple
                      hidden
                    />
                    <Image
                      src={camera}
                      alt="카메라"
                      className="w-[100px] h-[100px] mr-2"
                    />
                    <Image
                      src={imageBox}
                      alt="사진2"
                      className="w-[100px] h-[100px] mr-2"
                    />
                    <Image
                      src={imageBox}
                      alt="사진3"
                      className="w-[100px] h-[100px] mr-2"
                    />
                  </label>
                )}
              </div>
              {/* 이미지 컴포넌트 끝 */}
            </div>
          </div>
          <div className="mt-10">
            <Button
              type="button"
              onClick={handleSubmit}
              buttonType="filled"
              size="base"
              label="물어보기"
            />
          </div>
        </form>
      </div>
    </>
  );
};
export default AskForm;
