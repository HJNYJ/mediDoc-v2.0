import Map from "./Map";
import Button from "../layout/Buttons";
import useScrapStore from "@/shared/zustand/scrapStore";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUserInfo } from "@/utils/getUserInfo";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { supabase } from "@/api/supabase";
import { fetchHospitalData } from "@/hooks/getHospitalData";
import { useQuery } from "@tanstack/react-query";
import { removeTimeSecond } from "@/utils/changeTimeFormat";
import {
  addScrappedList,
  removeScrappedList
} from "@/utils/changeScrappedList";
import { ScrapIcon, ScrappedIcon } from "../layout/CheckIcons";

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

  // const goToApplyPage = () => {
  //   if (params?.hospitalId) {
  //     router.push(`/apply/${params.hospitalId}`);
  //   } else {
  //     console.error("병원 ID가 유효하지 않습니다.");
  //   }
  // };
  const goToApplyPage = async () => {
    try {
      const session = await supabase.auth.getSession();

      if (session.data.session === null) {
        if (params?.hospitalId) {
          alert("로그인이 필요한 서비스입니다.");
          router.push("/login");
        }
      } else {
        // 세션이 있는 경우
        const {
          data: { session }
        } = await supabase.auth.getSession();
        const user = session?.user;
        const id = user?.id ?? "";
        const email = user?.email ?? "";
        const provider = user?.app_metadata.provider ?? "";

        const { data: existingData, error: selectError } = await supabase
          .from("user_info")
          .select("*")
          .eq("user_id", id);

        if (selectError) {
          throw new Error(selectError.message);
        }

        if (!existingData || existingData.length === 0) {
          const { error: insertError } = await supabase
            .from("user_info")
            .insert({
              provider: provider,
              user_email: email,
              user_id: id,
              user_name: user?.user_metadata.full_name,
              user_type: "general user"
            });
          if (insertError) {
            throw new Error(insertError.message);
          }
        }

        if (params?.hospitalId) {
          router.push(`/apply/${params.hospitalId}`);
        } else {
          console.error("병원 ID가 유효하지 않습니다.");
        }
      }
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };

  return (
    <main>
      <section className="w-[100%]">
        <Map
          name={hospitalData!.hospital_name}
          latitude={hospitalData!.hospital_latitude}
          longitude={hospitalData!.hospital_longitude}
        />
      </section>
      <section className="mx-[16px] mt-[24px]">
        <section className="my-3">
          <div className="flex justify-between border-b-2">
            <div>
              <p className=" semibold-20">{hospitalData!.hospital_name}</p>
              <p className="regular-13 text-gray-800 my-[6px]">
                {hospitalData!.hospital_address}
              </p>
            </div>
            <button onClick={handleScrapClick}>
              {isScrapped ? <ScrappedIcon /> : <ScrapIcon />}
            </button>
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

          <div className="text-center my-3">{`📞 ${hospitalData!.hospital_contact}`}</div>

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
