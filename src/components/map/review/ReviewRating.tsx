"use client";

import Image from "next/image";
import React, { useState } from "react";
import hollowStar from "@/assets/icons/hollow_star.png";
import filledStar from "@/assets/icons/filled_star.png";

const ReviewRating = ({
  rating,
  setRating
}: {
  rating: number | null;
  setRating: (rating: number | null) => void;
}) => {
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  return (
    <div className="flex w-[208px] h-[40px]">
      {[...Array(5)].map((star, index) => {
        const currentRating = index + 1;
        return (
          <label key={index}>
            <input
              type="radio"
              name="rating"
              value={currentRating}
              checked={currentRating === (rating || 1)}
              onChange={() => setRating(currentRating)}
              className="hidden w-[40px] h-[40px] text-3xl"
            />
            <div
              className="flex justify-center items-center w-[40px] h-[40px] text-3xl cursor-pointer "
              // onMouseEnter={() => setHoverRating(currentRating)}
              onMouseLeave={() => setHoverRating(null)}
              onClick={() => setRating(currentRating)}
            >
              {/* {currentRating <= (hoverRating || rating) ? "⭐" : "⚝"} */}
              {currentRating <= (hoverRating || rating || 0) ? (
                <Image src={filledStar} alt="filled star" />
              ) : (
                <Image src={hollowStar} alt="empty star" />
              )}
            </div>
          </label>
        );
      })}

      <p className="hidden">별점: {rating}점</p>
    </div>
  );
};

export default ReviewRating;
