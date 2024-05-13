import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "@/api/supabase";
import { uploadReviewPhotosUrl } from "@/hooks/getReviewData";
import ReviewRating from "@/components/map/review/ReviewRating";
import ReviewTags from "@/components/map/review/ReviewTags";
import camera from "@/assets/icons/consult/camera.png";
import imageBox from "@/assets/icons/consult/imagebox.png";
import Button from "@/components/layout/Buttons";
import Image from "next/image";
import PagebackBtn from "@/components/layout/PageBackBtn";
import { useRouter } from "next/navigation";
import { getUserInfo } from "@/hooks/getUserInfo";
import ReviewContent from "./ReviewContent";
interface ReviewFormProps {
  hospitalId: string;
}

const ReviewForm = ({ hospitalId }: ReviewFormProps) => {
  const router = useRouter();
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
    // 3장 초과 못하게
    if (fileList.length + uploadedImages.length > 3) {
      alert("이미지는 최대 3장까지만 업로드할 수 있습니다.");
      return;
    }
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
    const userData = await getUserInfo();
    const userName = userData?.userName;
    const userEmail = userData?.userEmail || null;

    try {
      const confirmed = window.confirm("리뷰를 등록하시겠습니까?");
      if (!confirmed) {
        return;
      }
      const reviewId = uuidv4();
      const data = await supabase.from("review_info").insert([
        {
          content: content,
          hashtags: selectedTags.join(","),
          hospital_id: hospitalId,
          rating: rating || 0,
          review_id: reviewId,
          user_email: userEmail,
          user_name: userName
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

      router.push(`/map/${hospitalId}`);
    } catch (error) {
      console.error("리뷰 데이터 저장 중 오류 발생:", error);
    }
  };

  const goBack = () => {
    const confirmed = window.confirm(
      "작성하던 내용이 저장되지 않습니다. 나가시겠습니까?"
    );
    if (confirmed) {
      router.back();
    } else {
      // 현재 리뷰폼에 머물기
      return null;
    }
  };

  return (
    <>
      <button onClick={goBack} className="w-10 h-10 my-5">
        <PagebackBtn />
      </button>
      <div className="flex flex-col justify-center items-center">
        {/* <Image src={review_searchbar} alt="리뷰상단바" className="mt-8" /> */}

        <form onSubmit={(e) => e.preventDefault()}>
          <div className="flex align-center justify-center mb-5 mt-5">
            <ReviewRating
              rating={rating}
              setRating={(value: number | null) => setRating(value)}
            />
          </div>
          <ReviewContent content={content} setContent={setContent} />
          <div>
            <p className="regular-14 text-gray-800 mb-2">사진 첨부[선택]</p>
            <div className="flex justify-center">
              {uploadedImages.map((image, idx: number) => (
                <div key={image.dataUrl}>
                  {/**이미지 렌더링 */}
                  <Image
                    src={image.dataUrl}
                    alt={image.name}
                    width={80}
                    height={80}
                    className="w-[100px] h-[100px] mr-3 rounded-lg"
                  />
                  {/* <img src={image.dataUrl} alt={image.name} /> */}
                  <div id={image.dataUrl} onClick={handleImageOrder}></div>
                  <button
                    onClick={() => deleteImgHandle(idx)}
                    className="bg-orange text-white rounded-md p-1 regular-12 mt-1"
                  >
                    삭제
                  </button>
                </div>
              ))}
            </div>

            {uploadedFileUrl.length >= 3 ? (
              <></>
            ) : (
              <label htmlFor="file" className="flex justify-center">
                <input
                  type="file"
                  id="file"
                  name="file"
                  onChange={setImgHandler}
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
