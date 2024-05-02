// 질문&답변 Textarea

"use client";
import { supabase } from "@/api/supabase";
import { consultAddForm, uploadPhotosUrl } from "@/hooks/getConsultData";
import React, { MouseEvent, useState } from "react";
import { getUserInfo } from "@/hooks/getUserInfo";
import { useRouter } from "next/navigation";
import camera from "@/assets/icons/consult/camera.png";
import imageBox from "@/assets/icons/consult/imagebox.png";
import TopNavbar from "../layout/TopNavbar";
import imageCompression from "browser-image-compression";
import AskFormContent from "./AskFormContent";

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
      const tags = data[0];

      const newHashtags = {};
      for (let i = 1; i <= 10; i++) {
        const tagName = `tag${i}`;
        newHashtags[tagName] = tags[tagName];
      }

      setHashtags(newHashtags);
    }
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
      <AskFormContent
        title={title}
        contents={contents}
        setContents={setContents}
        setBodyparts={setBodyparts}
        hashtags={hashtags}
        setHashtags={setHashtags}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
        uploadedImages={uploadedImages}
        setImgHandler={setImgHandler}
        handleDeleteImage={handleDeleteImage}
        handleSubmit={handleSubmit}
        fetchHashtags={fetchHashtags}
        handleImageOrder={handleImageOrder}
        handleChange={handleChange}
        uploadedFileUrl={uploadedFileUrl}
        imageBox={imageBox}
        camera={camera}
      />
    </>
  );
};
export default AskForm;
