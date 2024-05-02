import React from "react";
import Input from "./Input";
import CategorySelect from "./CategorySelect";
import HashTags from "./HashTags";
import Image from "next/image";
import Button from "../layout/Buttons";

const AskFormContent = ({
  title,
  contents,
  setContents,
  bodyparts,
  setBodyparts,
  hashtags,
  setHashtags,
  selectedTags,
  setSelectedTags,
  uploadedImages,
  setImgHandler,
  handleDeleteImage,
  handleSubmit,
  fetchHashtags,
  handleImageOrder,
  handleChange,
  uploadedFileUrl,
  imageBox,
  camera
}) => {
  return (
    <>
      <div className="mt-5 ">
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

export default AskFormContent;
