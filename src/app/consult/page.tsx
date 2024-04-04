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
  bodyparts: string;
}

const ConsultPage = () => {
  const router = useRouter();
  const [consults, setConsults] = useState<Consulting[]>([]);
  const categoryRef = useRef("all");

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("consult_info")
        .select("consult_id, user_name, consult_title, bodyparts"); // Include 'id' in the selected columns
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
      <div>
        <ConsultTabs handleCategoryChange={handleCategoryChange} />
      </div>
      <div>
        {filteredConsults().map((consult) => (
          <div key={consult.consult_id}>
            <h2>{consult.user_name}</h2>
            <p>{consult.consult_title}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center mb-24">
        <button
          onClick={goToAskForm}
          className="px-4 py-2 bg-yellow-500 text-white rounded-md"
        >
          🖋🖋🖋작성
        </button>
      </div>
    </div>
  );
};

export default ConsultPage;
