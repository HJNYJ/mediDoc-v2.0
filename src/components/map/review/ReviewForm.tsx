"use client";

import { reviewAddForm, supabase, uploadReviewPhotosUrl } from "@/api/supabase";
import ReviewRating from "@/components/map/review/ReviewRating";
import ReviewTags from "@/components/map/review/ReviewTags";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import review_searchbar from "@/assets/icons/review/review_searchbar.png";

const ReviewForm = () => {
  const [content, setContent] = useState(""); // 리뷰 내용 관리
  const [rating, setRating] = useState<number>(0); // 별점 관리
  const [img, setImg] = useState<File[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string[]>([]);
  const [hashtags, setHashtags] = useState({}); // 해시태그 저장
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const [uploadedImages, setUploadedImages] = useState<
    {
      name: string;
      type: string;
      dataUrl: string;
    }[]
  >([]);

  const reviewId = uuidv4();
  console.log("reviewId!! ==> ", reviewId);

  useEffect(() => {
    const fetchHashtags = async () => {
      try {
        const { data, error } = await supabase
          .from("review_hashtags")
          .select(
            "tag1, tag2, tag3, tag4, tag5, tag6, tag7, tag8, tag9, tag10, tag11, tag12"
          );
        if (error) {
          console.error("Error fetching hashtags:", error.message);
        } else {
          const fetchedHashtags = Object.values(data[0]);
          setHashtags(fetchedHashtags.filter((tag) => tag)); // 필요한 데이터가 있는지 확인하고 배열로 만듭니다.
          // const fetchedHashtags = data.map((item: any) => item.hashtag);
          // setHashtags(fetchedHashtags.filter((tag: string) => tag));
        }
      } catch (error) {
        console.error("Error fetching hashtags:", error);
      }
    };

    fetchHashtags();
  }, []);

  const handleTagClick = (tag: string) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  };

  const setImgHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("리뷰 이미지 테스트");
    const fileList = Array.from(e.target.files as FileList);
    setImg([...img, ...fileList]);
  };

  const handleFiles = async (reviewId: string) => {
    const fileList = img;

    if (fileList) {
      const filesArray = Array.from(fileList);
      setFiles(filesArray);

      filesArray.forEach((file) => {
        handleAddImages(file, reviewId);
      });
    }
  };

  if (uploadedFileUrl.length > 5 && files.length > 5) {
    uploadedFileUrl.pop() && files.pop();
    alert("이미지는 최대 5개 입니다.");
  }

  const handleAddImages = async (file: File, reviewId: string) => {
    try {
      const newFileName = `${uuidv4()}`;
      // Supabase Storage에 이미지 업로드
      const result = await supabase.storage
        .from("images")
        .upload(`review_images/${newFileName}`, file);

      console.log("review file result! => ", result.data);

      if (result.data) {
        const url =
          process.env.NEXT_PUBLIC_SUPABASE_URL +
          "/storage/v1/object/public/images/" +
          result.data.path;
        console.log("review result url은?? => ", url);

        const uploadImgUrl = await uploadReviewPhotosUrl(
          url.toString(),
          reviewId
        );

        if (uploadImgUrl) {
          console.log("리뷰 이미지 업로드! => ", uploadImgUrl);
        }

        setUploadedFileUrl((prev: string[]) => [...prev, url]);
      } else {
        console.log("review result => ", result);
      }

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
      console.log("리뷰 이미지 오류가 났습니다:", error);
    }
  };

  const handleImageOrder = (e: MouseEvent<HTMLButtonElement>) => {
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

  const deleteImgHandle = (e: MouseEvent<HTMLButtonElement>) => {
    setUploadedFileUrl(uploadedFileUrl.filter((_, index) => index !== index));

    // uploadedImages state 업데이트
    const updatedImages = uploadedImages.filter((_, index) => index !== index);
    setUploadedImages(updatedImages);
  };

  const handleSubmit = async () => {
    const selectedTagsArray: string[] = Array.from(selectedTags).map(String); // Convert selectedtags to string array
    const data = await reviewAddForm(content, selectedTagsArray, rating);
    console.log("이 데이터 잘 들어가졌나.. => ", data);
    handleFiles(data); // data == reviewId
    if (data) {
      alert("리뷰가 등록되었습니다.");
    }
  };

  return (
    <div className="">
      <Image src={review_searchbar} alt="리뷰상단바" className="mt-10" />
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-[358px] h-[290px] "
      >
        <ReviewRating
          rating={rating}
          setRating={(rating: SetStateAction<number | null>) =>
            setRating(rating)
          }
        />

        <div>
          <label htmlFor="review" className="text-gray-800 regular-14">
            리뷰
          </label>
          <textarea
            id="review"
            placeholder="리뷰를 작성해주세요."
            value={content}
            maxLength={500}
            onChange={(e) => setContent(e.target.value)}
            required
            className="w-[358px] h-[290px] p-2 border border-gray-300 rounded-md focus:outline-none focus:border-black-500 resize-none"
          />
          <p className="text-gray-500 text-right">{content.length}/500</p>
        </div>
        <br />
        <div>
          <label>사진 첨부[선택]</label>
          {uploadedImages.map((file, index) => (
            <div key={file.dataUrl}>
              <img
                src={file.dataUrl}
                alt={file.name}
                className="w-24 h-24 object-cover"
              />
              <div
                id={file.dataUrl}
                onClick={() => handleImageOrder(index)}
                className="text-blue-500"
              ></div>
              <button
                id={file.dataUrl}
                onClick={() => deleteImgHandle(index)}
                className="text-red-500"
              >
                삭제
              </button>
            </div>
          ))}
          {uploadedFileUrl.length >= 5 ? (
            <></>
          ) : (
            <label htmlFor="file" className="flex gap-4">
              <input
                type="file"
                id="file"
                name="file"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setImgHandler(e)
                }
                multiple
                hidden
              />
              <button className="flex border border-gray-300 p-2 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 47.5 42.5"
                  strokeWidth={1.3}
                  stroke="currentColor"
                  className="w-[100px] h-[100px] text-gray-400 hover:text-gray-700 flex "
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
              </button>
              <button className="flex border border-gray-300 p-2 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 47.5 42.5"
                  strokeWidth={1.3}
                  stroke="currentColor"
                  className="w-[100px] h-[100px] text-gray-400 hover:text-gray-700 flex "
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
              </button>
              <button className="flex border border-gray-300 p-2 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 47.5 42.5"
                  strokeWidth={1.3}
                  stroke="currentColor"
                  className="w-[100px] h-[100px] text-gray-400 hover:text-gray-700 flex "
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

        <div>
          {/* 해시태그 칩*/}
          <label>리뷰하실 때 해시태그를 선택해주세요</label>
          <div>
            <label className="block mb-5">해시태그</label>

            <ReviewTags
              hashtags={hashtags}
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
            />
          </div>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          className="w-[358px] h-[50px] bg-orange-500 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:bg-blue-700 hover:bg-red-400 mt-20"
        >
          등록하기
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
