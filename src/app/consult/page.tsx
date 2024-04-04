// // 실시간 상담 페이지 [최종적으로 나와야하는 = 부위 카테고리, 모든 게시글 리스트, 카테고리별 리스트, 작성하기 버튼]
"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { supabase } from "@/api/supabase";
import ConsultTabs from "@/components/consult/ConsultTabs";

interface Consulting {
  consult_id: string;
  user_name: string;
  consult_title: string;
  consult_content: string;
  bodyparts: string;
  hashtags: string[];
}

const ConsultPage = () => {
  const router = useRouter();
  const [consults, setConsults] = useState<Consulting[]>([]);
  const categoryRef = useRef("all");

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("consult_info")
        .select(
          "consult_id, user_name, consult_title, consult_content, bodyparts, hashtags"
        ); // Include 'id' in the selected columns
      if (error) console.error("error", error);
      else setConsults(data as Consulting[]); // Cast the data to Consulting[]
    };

    fetchData();
  }, []);

  const handleCategoryChange = (bodyparts: string) => {
    categoryRef.current = bodyparts;
  };

  const filteredConsults = (): Consulting[] => {
    if (categoryRef.current === "all") return consults;
    return consults.filter(
      (consult) => consult.bodyparts === categoryRef.current
    );
  };

  const goToAskForm = () => {
    router.push(`/consult/ask`);
  };

  return (
    <div className="flex flex-col justify-between">
      <div className="flex justify-between items-center mb-4">
        <ConsultTabs handleCategoryChange={handleCategoryChange} />
      </div>
      <div className="border-t border-gray-200">
        {filteredConsults().map((consult) => (
          <div
            key={consult.consult_id}
            className="border-b py-4 flex items-center"
          >
            <div className="w-[200px]">사진</div>
            <div>
              <div className="text-left ml-10">
                <p className="text-lg text-black-600">
                  {consult.consult_title}
                </p>
                <p className="text-sm text-gray-600 mt-8">
                  {consult.consult_content}
                </p>
                <h2 className="text-lg font-semibold">{consult.user_name}</h2>
                <div className="mt-3 flex flex-wrap">
                  {consult?.hashtags?.split(",").map((hashtag: string) => (
                    <span
                      key={hashtag}
                      className="inline-block bg-blue-100 text-blue-600 rounded-full px-2 py-1 mr-2"
                    >
                      #
                      {hashtag.replace(/[\[\],_\/'"{}%&\*\(\);~\`\|:\?!]/g, "")}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200">
        <button
          onClick={goToAskForm}
          className="border-b py-4 flex justify-between items-center"
        >
          🖋🖋🖋작성
        </button>
      </div>
    </div>
  );
};

export default ConsultPage;
