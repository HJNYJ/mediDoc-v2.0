// 스크랩한 병원 리스트 div
import { supabase } from "@/api/supabase";
import React, { useEffect, useState } from "react";
import type { ScrappedList } from "@/types";

const ScrappedList = () => {
  const [scrappedList, setScrappedList] = useState<ScrappedList[]>([]);

  useEffect(() => {
    const fetchScrappedList = async () => {
      try {
        // 사용자 정보 가져오기
        const {
          data: { session }
        } = await supabase.auth.getSession();
        const user = session?.user;

        const { data, error } = await supabase
          .from("scrapped_list")
          .select(
            `
          *, 
          hospital_info(*)
        `
          )
          .eq("user_id", user?.id);

        if (error) throw new Error(error.message);

        setScrappedList(data);
      } catch (error) {
        if (error instanceof Error) console.error(error.message);
      }
    };
    fetchScrappedList();
  }, []);

  return (
    <>
      <section>
        {scrappedList.length === 0 && (
          <p className="w-[169px] h-[19px] mx-[110.5px] mt-[185px] text-[16px] text-gray-400">
            스크랩한 병원이 없습니다.
          </p>
        )}
      </section>
      <section className="w-[358px] mx-[16px]">
        {scrappedList.map((item) => (
          <div key={item.scrap_id} className="mt-[26px]">
            <img
              className="w-[114px] h-[127px] rounded-[10px] object-cover"
              src={item.hospital_info.hospital_image}
              alt={item.hospital_info.hospital_name}
            ></img>
            <p className="text-[14px] font-medium w-[85px] h-[24px] mt-[8px]">
              {item.hospital_info.hospital_name}
            </p>
          </div>
        ))}
      </section>
    </>
  );
};

export default ScrappedList;
