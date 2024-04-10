// 스크랩한 병원 리스트 div
import { supabase } from "@/api/supabase";
import React, { useEffect, useState } from "react";
import type { ScrappedList } from "@/types";

const ScrappedList = () => {
  const [scrappedList, setScrappedList] = useState<ScrappedList[]>([]);

  useEffect(() => {
    const fetchScrappedList = async () => {
      try {
        const { data, error } = await supabase.from("scrapped_list").select(`
          *, 
          hospital_info(*)
        `);
        console.log("scrappedData", data);

        if (error) throw new Error(error.message);

        setScrappedList(data || []);
      } catch (error) {
        if (error instanceof Error) console.error(error.message);
      }
    };
    fetchScrappedList();
  }, []);

  return (
    <>
      <h2>스크랩한 병원</h2>
      {scrappedList.map((item) => (
        <div key={item.scrap_id}>
          <img
            className="w-64 h-48 object-cover"
            src={item.hospital_info.hospital_image}
            alt={item.hospital_info.hospital_name}
          ></img>
          <h2>{item.hospital_info.hospital_name}</h2>
        </div>
      ))}
    </>
  );
};

export default ScrappedList;
