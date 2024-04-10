import React, { MouseEvent, useState } from "react";
import { supabase, uploadPhotosUrl } from "@/api/supabase";
import { UploadedFileUrlProps } from "@/types";

const ConsultImages = ({
  uploadedFileUrl,
  setUploadedFileUrl
}: UploadedFileUrlProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadedImages, setUploadedImages] = useState<
    {
      name: string;
      type: string;
      dataUrl: string;
    }[]
  >([]);

  // 웹 페이지에서 파일 등록하기
  const handleFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    console.log("fileList", fileList);

    if (fileList) {
      const filesArray = Array.from(fileList);
      setFiles(filesArray);

      filesArray.forEach((file) => {
        handleAddImages(file);
      });
    }
  };

  // 업로드된 파일이 5개가 초과되면 그 뒤에 들어오는 파일은 없앰
  if (uploadedFileUrl.length > 5 && files.length > 5) {
    uploadedFileUrl.pop() && files.pop();
    alert("이미지는 최대 5개까지 업로드 가능합니다.");
  }

  // 이미지 업로드 함수
  const handleAddImages = async (file: File) => {
    try {
      const newFileName = `${Math.random()}`;
      // Supabase Storage에 이미지 업로드
      const result = await supabase.storage
        .from("images")
        .upload(`user_images/${newFileName}`, file);

      console.log("upload file result => ", result.data);

      if (result.data) {
        const url =
          process.env.NEXT_PUBLIC_SUPABASE_URL +
          "/storage/v1/object/public/images/" +
          result.data.path;
        console.log("url => ", url);

        const uploadImgUrl = await uploadPhotosUrl(url.toString());

        if (uploadImgUrl) {
          console.log("이미지 업로드 데이타! => ", uploadImgUrl);
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

  return (
    <>
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
                // onChange={handleFiles}
                onChange={handleFiles}
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
    </>
  );
};

export default ConsultImages;
