import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { supabase, uploadReviewPhotosUrl } from "@/api/supabase";
import ReviewRating from "@/components/map/review/ReviewRating";
import ReviewTags from "@/components/map/review/ReviewTags";
import camera from "@/assets/icons/consult/camera.png";
import imageBox from "@/assets/icons/consult/imagebox.png";
import Button from "@/components/layout/Buttons";
import Image from "next/image";
import TopNavbar from "@/components/layout/TopNavbar";
interface ReviewFormProps {
  hospitalId: string;
}

const ReviewForm = ({ hospitalId }: ReviewFormProps) => {
  // const router = useRouter();
  const [content, setContent] = useState("");
  const [rating, setRating] = useState<number | null>(0);
  const [img, setImg] = useState<File[]>([]);
  const [uploadedImages, setUploadedImages] = useState<
    {
      name: string;
      type: string;
      dataUrl: string;
    }[]
  >([]);
  const [files, setFiles] = useState<File[]>([]);
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string[]>([]);
  const [hashtags, setHashtags] = useState({});
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
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
          setHashtags(fetchedHashtags.filter((tag) => tag));
        }
      } catch (error) {
        console.error("Error fetching hashtags:", error);
      }
    };
    fetchHashtags();
  }, []);
  const setImgHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = Array.from(e.target.files as FileList);
    setImg([...img, ...fileList]);
    fileList.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImages((prevFiles) => [
          ...prevFiles,
          {
            name: file.name,
            type: file.type,
            dataUrl: reader.result as string
          }
        ]);
      };
      reader.readAsDataURL(file);
    });
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
  if (uploadedFileUrl.length > 3 && files.length > 3) {
    uploadedFileUrl.pop() && files.pop();
    alert("이미지는 최대 3개 입니다.");
  }
  const handleAddImages = async (file: File, reviewId: string) => {
    try {
      const newFileName = `${uuidv4()}`;

      const result = await supabase.storage
        .from("images")
        .upload(`review_images/${newFileName}`, file);
      if (result.data) {
        const url =
          process.env.NEXT_PUBLIC_SUPABASE_URL +
          "/storage/v1/object/public/images/" +
          result.data.path;

        const uploadImgUrl = await uploadReviewPhotosUrl(
          url.toString(),
          reviewId,
          hospitalId
        );
        if (uploadImgUrl) {
          console.log("리뷰 이미지 업로드! => ", uploadImgUrl);
        }
      } else {
        console.log("review result => ", result);
      }
    } catch (error) {
      console.log("리뷰 이미지 오류가 났습니다:", error);
    }
  };
  const handleImageOrder = (e: React.MouseEvent<HTMLDivElement>) => {
    const url = e.currentTarget.id;

    const clickedItem = uploadedFileUrl.indexOf(url);

    const updatedArr = uploadedFileUrl.filter(
      (item) => item !== uploadedFileUrl[clickedItem]
    );

    setUploadedFileUrl([uploadedFileUrl[clickedItem], ...updatedArr]);
  };
  const deleteImgHandle = (idx: number) => {
    setUploadedFileUrl(uploadedFileUrl.filter((_, index) => index !== idx));
    const updatedImages = uploadedImages.filter((_, index) => index !== idx);
    setUploadedImages(updatedImages);
    setImg([]);
  };
  const handleSubmit = async () => {
    try {
      const reviewId = uuidv4();
      const data = await supabase.from("review_info").insert([
        {
          content: content,
          hashtags: selectedTags.join(","),
          hospital_id: hospitalId,
          rating: rating || 0,
          review_id: reviewId
        }
      ]);
      if (data.data) {
        handleFiles(JSON.stringify(data.data));
      }
      for (const image of img) {
        const newFileName = `${uuidv4()}`;
        const result = await supabase.storage
          .from("images")
          .upload(`review_images/${newFileName}`, image);
        if (result.data) {
          const imageUrl =
            process.env.NEXT_PUBLIC_SUPABASE_URL +
            "/storage/v1/object/public/images/" +
            result.data.path;
          await uploadReviewPhotosUrl(imageUrl, reviewId, hospitalId);
        }
      }
      alert("리뷰가 등록되었습니다.");
    } catch (error) {
      console.error("리뷰 데이터 저장 중 오류 발생:", error);
    }
  };

  return (
    <>
      <TopNavbar />
      <div className="flex flex-col justify-center items-center">
        {/* <Image src={review_searchbar} alt="리뷰상단바" className="mt-8" /> */}

        <form onSubmit={(e) => e.preventDefault()}>
          <div className="flex align-center justify-center mb-5 mt-5">
            <ReviewRating
              rating={rating}
              setRating={(value: number | null) => setRating(value)}
            />
          </div>
          <div>
            <p className="text-gray-800 regular-14 mb-2">리뷰</p>
            <textarea
              id="review"
              placeholder="리뷰를 작성해주세요."
              value={content}
              maxLength={500}
              onChange={(e) => setContent(e.target.value)}
              required
              className="w-[358px] h-[290px] p-2 border border-gray-300 rounded-md focus:outline-none regular-16 resize-none"
            />
            <p className="text-gray-500 text-right regular-13 mb-4">
              {content.length}/500
            </p>
          </div>
          <div>
            <p className="regular-14 text-gray-800 mb-2">사진 첨부[선택]</p>
            {uploadedImages.map((image, idx: number) => (
              <div key={image.dataUrl}>
                {/**이미지 렌더링 */}
                <img
                  src={image.dataUrl}
                  alt={image.name}
                  className="w-[100px] h-[100px] flex"
                />
                {/* <img src={image.dataUrl} alt={image.name} /> */}
                <div id={image.dataUrl} onClick={handleImageOrder}></div>
                <button onClick={() => deleteImgHandle(idx)}>삭제</button>
              </div>
            ))}
            {uploadedFileUrl.length >= 3 ? (
              <></>
            ) : (
              <label htmlFor="file" className="flex justify-center">
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
          <div>
            {/* 해시태그 칩*/}
            <p className="regular-16 mt-5 mb-3">해시태그</p>
            <ReviewTags
              hashtags={hashtags}
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
            />
          </div>
          <div className="mt-16">
            <Button
              type="submit"
              buttonType="filled"
              size="base"
              onClick={handleSubmit}
              label="등록하기"
            />
          </div>
        </form>
      </div>
    </>
  );
};
export default ReviewForm;
