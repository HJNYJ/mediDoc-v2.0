import React, { MouseEvent, useState } from "react";
import { supabase } from "@/api/supabase";
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
      const newFileName = `random-${Math.random()}`;
      // Supabase Storage에 이미지 업로드
      const { data, error } = await supabase.storage
        .from("images")
        .upload(`user_images/${newFileName}`, file);

      if (error) {
        console.log("파일이 업로드 되지 않았어요!", error);
        return;
      }

      // 업로드된 이미지의 공개 URL 가져오기
      const res = supabase.storage.from("images").getPublicUrl(data.path, {
        transform: {
          width: 200,
          resize: "contain", // 이미지의 주어진 너비에 맞추어 크기 조정
          format: "origin" // 이미지 포맷 유지
        }
      });

      // 업로드된 파일 URL 저장
      setUploadedFileUrl((prev: string[]) => [...prev, res.data.publicUrl]);

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
                onChange={handleFiles}
                multiple
                hidden
              />
              +
            </label>
          )}
        </div>
      </div>
    </>
  );
};

export default ConsultImages;
