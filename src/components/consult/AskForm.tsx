// 질문&답변 Textarea

"use client";
import { supabase } from "@/api/supabase";
import { consultAddForm, uploadPhotosUrl } from "@/hooks/getConsultData";
import React, { MouseEvent, useState } from "react";
import { getUserInfo } from "@/hooks/getUserInfo";
import { useRouter } from "next/navigation";
import HashTags from "./HashTags";
import Image from "next/image";
import camera from "@/assets/icons/consult/camera.png";
import imageBox from "@/assets/icons/consult/imagebox.png";
import Button from "../layout/Buttons";
import TopNavbar from "../layout/TopNavbar";
import imageCompression from "browser-image-compression";
import Input from "./Input";
import CategorySelect from "./CategorySelect";
import fetchHashtags from "./FetchHashtags";

const AskForm = () => {
  const router = useRouter();
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
  /** 이미지 컴포넌트 사용하는 state 및 함수 끝 */

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const isValidImgSize = (imgList) => {
    let result = true;
    imgList.forEach((item: File) => {
      if (item.size > 5000000) {
        alert("5MB 이하의 파일만 업로드 가능합니다.");
        result = false;
      }
    });
    return result;
  };

  // 이미지 업로드 핸들러
  const setImgHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = Array.from(e.target.files as FileList);

    if (fileList.length + uploadedImages.length > 3) {
      alert("이미지는 최대 3장까지만 업로드할 수 있습니다.");
      return;
    }

    /** 이미지 압축 라이브러리 사용 시작*/
    const options = {
      maxSizeMB: 0.2,
      maxWidthOrHeight: 800,
      fileType: "image/webp"
    };

    const compressFileList = fileList.map((item) => {
      return imageCompression(item, options);
    });

    if (!isValidImgSize(compressFileList)) return;

    const compressedFiles = await Promise.all(compressFileList);
    setImg([...img, ...compressedFiles]);
    /** 이미지 압축 라이브러리 사용 끝 */

    // 이미지를 선택한 후에 바로 이미지를 미리보기
    compressedFiles.forEach((file) => {
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

      const fileArr = filesArray.map((file) => {
        return handleAddImages(file, consultId);
      });

      await Promise.all(fileArr);
    }
  };
  // for문으로 바꾸기, filesArray for문
  // 업로드된 파일이 3개가 초과되면 그 뒤에 들어오는 파일은 없앰
  if (uploadedFileUrl.length > 3 && files.length > 3) {
    uploadedFileUrl.pop() && files.pop();
    alert("이미지는 최대 3개까지 업로드 가능합니다.");
  }
  // 이미지 업로드 함수
  const handleAddImages = async (file: File, consultId: string) => {
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
          console.log("AskForm의 ImgUrl => ", uploadImgUrl);
        }
      } else {
        console.log("result", result.error.message);
      }
    } catch (error) {
      console.error("파일 업로드 중 에러 발생", error);
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

  /**
   * 실시간 상담 데이터 및 이미지 저장(supabase, storage )
   */
  const handleSubmit = async () => {
    // 폼 유효성 검사
    if (!validateForm()) {
      return; // 폼이 유효하지 않으면 함수 종료
    }
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

    await handleFiles(id);

    if (data) {
      alert("글 작성이 완료됐습니다.");
      router.push("/consult");
    }
  };

  // 폼 유효성 검사 함수
  const validateForm = () => {
    if (title.trim() === "") {
      alert("제목을 입력해주세요.");
      return false;
    }
    if (contents.trim() === "") {
      alert("질문을 입력해주세요.");
      return false;
    }
    return true;
  };

  return (
    <>
      <TopNavbar title="실시간 상담" />
      <div className="mt-5 ">
        <div className=""></div>
        <form onSubmit={(e) => e.preventDefault()} className="mt-1">
          <div>
            <Input
              label="제목"
              placeholder="제목"
              value={title}
              onChange={handleChange}
              required={true}
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
            <CategorySelect
              onSelectCategory={fetchHashtags}
              bodyparts={bodyparts}
              setBodyparts={setBodyparts}
            />

            <p className="regular-14 text-gray-800 ml-2 mb-3">증상</p>
            <HashTags
              hashtags={hashtags}
              setHashtags={setHashtags}
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
            />
          </div>
          <div>
            {/* 이미지 컴포넌트 시작 */}
            <div className="flex-col">
              <p className="regular-14 text-gray-800 ml-2 mb-3">사진</p>
              <div className="flex">
                {uploadedImages.map((image, idx: number) => {
                  return (
                    <div key={idx}>
                      {/**이미지 렌더링 */}
                      <button
                        onClick={() => handleDeleteImage(idx)}
                        className="ml-3 my-2"
                      >
                        ❌
                        <Image
                          src={String(image.dataUrl)}
                          alt={image.name}
                          width={85}
                          height={85}
                          className="w-[85px] h-[85px] mr-2 rounded-lg"
                        />
                      </button>
                      <div onClick={handleImageOrder}></div>
                    </div>
                  );
                })}
              </div>
              <div>
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
                      width={100}
                      height={100}
                      className="w-[100px] h-[100px] mr-2"
                    />
                    <Image
                      src={imageBox}
                      alt="사진2"
                      width={100}
                      height={100}
                      className="w-[100px] h-[100px] mr-2"
                    />
                    <Image
                      src={imageBox}
                      alt="사진3"
                      width={100}
                      height={100}
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
