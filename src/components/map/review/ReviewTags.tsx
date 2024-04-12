"use client";

import React, { useEffect } from "react";

const ReviewTags = ({
  hashtags,
  selectedTags,
  setSelectedTags
}: {
  hashtags: { [key: string]: string };
  selectedTags: string[];
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const handleClick = async (tag: string) => {
    console.log(`${tag} 클릭됨!!!!!`);

    const isSelected = selectedTags.includes(tag);

    if (isSelected) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else if (selectedTags.length < 3) {
      setSelectedTags([...selectedTags, tag]);
    } else {
      alert("최대 3개의 해시태그만 선택 가능합니다.");
    }
  };

  useEffect(() => {}, [selectedTags]);

  return (
    <div className="flex flex-wrap gap-2">
      {Object.entries(hashtags).map(([key, value]) => (
        <button
          key={key}
          onClick={() => handleClick(value)}
          className={`py-2 px-4 rounded-md focus:outline-none ${
            selectedTags.includes(value)
              ? "bg-pink-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {value}
        </button>
      ))}
    </div>
  );
};

export default ReviewTags;
