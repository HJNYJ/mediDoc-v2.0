import { supabase } from "@/api/supabase";
import React, { useEffect, useState } from "react";

import type { ScrappedListItem } from "@/types";
import Image from "next/image";
import Link from "next/link";

const ScrappedList: React.FC = () => {
  const [scrappedList, setScrappedList] = useState<ScrappedListItem[]>([]);

  useEffect(() => {
    const fetchScrappedList = async () => {
      try {
        // 사용자 정보 가져오기
        const {
          data: { session }
        } = await supabase.auth.getSession();
        const user = session?.user;
        const id = user?.id ?? "";
        const { data, error } = await supabase
          .from("scrapped_list")
          .select(
            `
            scrap_id,
            user_id,
            hospital_info (
              hospital_image,
              hospital_name,
              hospital_id
            )
          `
          )
          .eq("user_id", id);

        if (error) throw new Error(error.message);

        // ScrapItem으로 타입 변환
        const scrappedItems: ScrappedListItem[] = data.map((item) => ({
          scrap_id: item.scrap_id,
          user_id: item.user_id,
          hospital_id: item.hospital_info!.hospital_id,
          hospital_info: {
            hospital_image: item.hospital_info!.hospital_image || "",
            hospital_name: item.hospital_info!.hospital_name || ""
          }
        }));

        setScrappedList(scrappedItems);
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
          <p className="w-full h-[19px] mx-[110.5px] mt-[185px] text-[16px] text-gray-400">
            스크랩한 병원이 없습니다.
          </p>
        )}
      </section>
      <section className="w-full flex gap-2 flex-wrap">
        {scrappedList.map((item) => (
          <div key={item.scrap_id} className="flex flex-col oneThird mb-4">
            <Link href={`/map/${item.hospital_id}`}>
              <Image
                className="object-cover h-[131px] rounded-[10px] "
                src={item.hospital_info!.hospital_image}
                alt={item.hospital_info!.hospital_name}
                width={114}
                height={131}
              />
              <span className="text-[14px] font-medium h-[24px] mt-[8px]">
                {item.hospital_info?.hospital_name}
              </span>
            </Link>
          </div>
        ))}
      </section>
    </>
  );
};

export default ScrappedList;
