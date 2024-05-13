import React from "react";

const ReviewContent = ({ content, setContent }) => {
  return (
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
  );
};

export default ReviewContent;
