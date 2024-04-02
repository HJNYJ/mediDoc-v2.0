import { HashtagButtonsProps } from "@/types";
import React from "react";

const HashTags: React.FC<HashtagButtonsProps> = ({ hashtags }) => {
  const handleClick = (tag: string) => {
    console.log(`${tag} 클릭됨!!!!!`);
    // 음.. 이제 뭐쓰지??????????하 ㅠㅠㅇㅁㄴㅇㅁㅇㅁㄹㅇㄹㄴㅇㄹㄴ
  };

  return (
    <div>
      {Object.entries(hashtags).map(([key, value]) => (
        <button key={key} onClick={() => handleClick(value)}>
          {value}
        </button>
      ))}
    </div>
  );
};

export default HashTags;
