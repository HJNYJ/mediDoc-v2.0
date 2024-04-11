// 방문자정보 div

import { supabase } from "@/api/supabase";

import React, { useEffect, useState } from "react";

const VisitorInfo = () => {
  const [course, setCourse] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from("reservation_info")
          .select("*");
        if (error) throw new Error(error.message);
        setCourse(data);
        setIsLoading(false);
      } catch (error) {
        if (error instanceof Error) console.error(error.message);
        setIsError(true);
      }
    };

    fetchData();
  }, []);

  if (isLoading) return <div>로딩중 입니다.</div>;
  if (isError) return <div>에러 입니다.</div>;

  return (
    <div>
      <p className="m-2">예약이 완료되었습니다.</p>
      {course?.map((card) => (
        <div key={card.reservation_id} className="m-2">
          <p>예약번호 : {card.reservation_id?.substring(0, 7)}</p>
          <p>예약 일시 : {card.apply_date}</p>
          <p>예약자 : {card.subject_name}</p>
          <p>시간 : {card.apply_time}</p>
          <p>연락처 : {card.subject_phone_number} </p>
          <p>검사코스 : {card.program_name}</p>
          <p>검사내용 : {card.program_detail}</p>
        </div>
      ))}
    </div>
  );
};

export default VisitorInfo;
