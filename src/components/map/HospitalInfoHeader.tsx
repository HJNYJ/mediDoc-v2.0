import React, { useEffect } from "react";
import Map from "./Map";
import Image from "next/image";
import scrapIcon from "@/assets/icons/bookmark.png";
import scrappedIcon from "@/assets/icons/bookmark_checked.png";
import Button from "../layout/Buttons";
import { useRouter } from "next/navigation";
import {
  addScrappedList,
  removeScrappedList
} from "@/utils/changeScrappedList";
import { getUserInfo } from "@/utils/getUserInfo";
import useScrapStore from "@/shared/zustand/scrapStore";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { supabase } from "@/api/supabase";
import { fetchHospitalData } from "@/hooks/getHospitalData";
import { useQuery } from "@tanstack/react-query";
import { removeTimeSecond } from "@/utils/changeTimeFormat";

export interface HospitalInfoHeaderProps {
  params: { hospitalId: string };
}

export interface HospitalType {
  end_time: string;
  hospital_address: string;
  hospital_contact: string;
  hospital_id?: string;
  hospital_image: string;
  hospital_introduction: string;
  hospital_latitude: number;
  hospital_longitude: number;
  hospital_name: string;
  region_id: number;
  start_time: string;
}

const HospitalInfoHeader: React.FC<HospitalInfoHeaderProps> = ({ params }) => {
  const router = useRouter();
  const { isScrapped, setIsScrapped } = useScrapStore();

  // 병원 데이터 가져오기
  const {
    isLoading,
    isError,
    data: hospitalData
  } = useQuery<HospitalType>({
    queryKey: ["hospitalInfo", params.hospitalId],
    queryFn: () => fetchHospitalData(params.hospitalId)
  });

  useEffect(() => {
    const fetchScrappedStatus = async () => {
      const hospitalId = params.hospitalId;
      const userData = await getUserInfo();
      const userId = userData?.userId ?? "";

      try {
        const { data: scrappedData, error } = await supabase
          .from("scrapped_list")
          .select("*")
          .eq("hospital_id", hospitalId)
          .eq("user_id", userId);
        if (error) {
          throw error;
        }

        setIsScrapped(scrappedData.length > 0);
      } catch (error) {
        if (error instanceof Error) console.error(error.message);
      }
    };

    fetchScrappedStatus();
  }, [params.hospitalId, setIsScrapped]);

  if (isLoading) return <p>병원 데이터를 가져오는 중입니다.</p>;
  if (isError) return <p>병원 데이터를 가져오는 동안 에러가 발생했습니다</p>;

  // 시간 출력 타입 변경
  const secondRemovedStartTime = removeTimeSecond(hospitalData!.start_time);
  const secondRemovedEndTime = removeTimeSecond(hospitalData!.end_time);

  // 운영 여부
  const handleScrapClick = async () => {
    const hospitalId = params.hospitalId;
    const userInfo = await getUserInfo();
    const userId = userInfo?.userId;

    if (!userId) {
      console.error("유저 ID를 가져오지 못 했습니다.");
      return;
    }

    if (isScrapped) {
      setIsScrapped(!isScrapped);
      removeScrappedList(hospitalId, userId);
      alert("스크랩이 해제되었습니다.");
    } else {
      setIsScrapped(!isScrapped);
      addScrappedList(hospitalId, userId);
      alert("스크랩되었습니다.");
    }
  };

  const scrapIconSrc = isScrapped ? scrappedIcon : scrapIcon;

  const goToApplyPage = () => {
    if (params?.hospitalId) {
      router.push(`http://localhost:3000/apply/${params.hospitalId}`);
    } else {
      console.error("병원 ID가 유효하지 않습니다.");
    }
  };

  return (
    <main className="">
      {/* 병원 위치(지도) */}
      <section className="w-[390px]">
        <Map
          name={hospitalData!.hospital_name}
          latitude={hospitalData!.hospital_latitude}
          longitude={hospitalData!.hospital_longitude}
        />
      </section>
      <section className="w-[358px] mx-[16px] mt-[24px]">
        {/* 병원 기본정보 */}
        <section className="my-3">
          {/* 이름&주소 & 스크랩 버튼 */}
          <div className="flex w-[358px] h-[64px] border-b-2">
            <div>
              <p className="w-[200px] h-[24px] semibold-20">
                {hospitalData!.hospital_name}
              </p>
              <p className="w-[358px] h-[16px] regular-13 text-gray-800 mt-[2px]">
                {hospitalData!.hospital_address}
              </p>
            </div>
            <Image
              src={scrapIconSrc}
              alt="scrap Icon"
              className="w-[24px] h-[24px]"
              onClick={handleScrapClick}
            />
          </div>
          <Accordion>
            <AccordionItem
              key="all"
              aria-label="5"
              title="🕑 진료 시간"
              className="text-center my-3"
            >
              <p>
                월요일 : {secondRemovedStartTime} ~ {secondRemovedEndTime}
              </p>
              <p>
                화요일 : {secondRemovedStartTime} ~ {secondRemovedEndTime}
              </p>
              <p>
                수요일 : {secondRemovedStartTime} ~ {secondRemovedEndTime}
              </p>
              <p>
                목요일 : {secondRemovedStartTime} ~ {secondRemovedEndTime}
              </p>
              <p>
                금요일 : {secondRemovedStartTime} ~ {secondRemovedEndTime}
              </p>
            </AccordionItem>
          </Accordion>
          {/* 전화번호 */}
          <div>
            <Accordion>
              <AccordionItem
                key="all"
                aria-label="2"
                title="📞전화번호"
                className="text-center my-3"
              >
                <span>{hospitalData!.hospital_contact}</span>
              </AccordionItem>
            </Accordion>
          </div>
          {/* 소개글 */}
          <Accordion>
            <AccordionItem
              key="all"
              aria-label="1"
              title="소개글"
              className="text-center my-3"
            >
              <span>{hospitalData!.hospital_introduction}</span>
            </AccordionItem>
          </Accordion>
        </section>
        <Button
          type="button"
          buttonType="hollow"
          label="예약하기"
          onClick={goToApplyPage}
        />
      </section>
    </main>
  );
};

export default HospitalInfoHeader;
