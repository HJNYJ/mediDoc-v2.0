// 검진 프로그램 정보 & 가격 div
"use client";

import { useQuery } from "@tanstack/react-query";
import { selectCourseName } from "@/hooks/getReservationData";
import { Accordion, AccordionItem } from "@nextui-org/react";

const ProgramInfo = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["courseInfo"],
    queryFn: selectCourseName
  });

  const course = data?.map((card) => {
    return (
      <div
        key={card.course_id}
        className="mb-2 px-4 py-[14px] border-2 w-full rounded-lg justify-start flex items-center cursor-pointer"
      >
        <Accordion>
          <AccordionItem title={`${card.course_name}`} className="bold-14">
            <p className="break-keep regular-14 mt-4">
              {card.course_detail}
              <div className="flex justify-end text-orange m-[16px_4px_4px_4px]">
                {card.course_price.toString().substring(0, 3)}.
                {card.course_price.toString().substring(3, 7)}원
              </div>
            </p>
          </AccordionItem>
        </Accordion>
      </div>
    );
  });

  if (isLoading) {
    <div>로딩 중 입니다...</div>;
  }

  if (isError) {
    <div>에러 입니다...</div>;
  }
  return <section>{course}</section>;
};

export default ProgramInfo;
