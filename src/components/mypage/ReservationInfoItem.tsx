// 예약정보 1개 div
"use client";

import { supabase } from "@/api/supabase";
import React, { useEffect, useState } from "react";
import type { ReservationInfo } from "@/types";
import useMyPageStore from "@/shared/zustand/myPageStore";
import detailIcon from "@/assets/icons/nextIcon.png";
import Image from "next/image";
import closeIcon from "@/assets/icons/xmark.png";
import reservationId from "@/assets/icons/modal/reservation_id.png";
import reservationHospital from "@/assets/icons/modal/hospital.png";
import reservationDate from "@/assets/icons/modal/date.png";
import subjectName from "@/assets/icons/modal/subject_name.png";
import reservationStatus from "@/assets/icons/modal/status.png";
import course from "@/assets/icons/modal/course.png";

const ReservationInfoItem = () => {
  const [reservationInfo, setReservationInfo] = useState<ReservationInfo[]>([]);
  const [selectedReservation, setSelectedReservation] =
    useState<ReservationInfo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedData, setEditedData] = useState<ReservationInfo | null>(null);
  const { hospitalName } = useMyPageStore();

  // 예약 정보 가져오기
  useEffect(() => {
    const fetchReservationInfo = async () => {
      try {
        const {
          data: { session }
        } = await supabase.auth.getSession();
        const user = session?.user;

        // 유저 타입 가져오기
        const { data: userInfo, error: userInfoError } = await supabase
          .from("user_info")
          .select("user_type")
          .eq("user_id", user?.id)
          .single();

        if (userInfoError) throw new Error(userInfoError.message);

        const userType = userInfo?.user_type;

        if (userType === "general user") {
          // 일반 유저일 경우
          const { data, error } = await supabase
            .from("reservation_info")
            .select("*")
            .eq("user_email", user?.email);

          if (error) throw new Error(error.message);
          setReservationInfo(data);
        } else if (userType === "hospital staff") {
          // 병원 관계자일 경우
          const { data, error } = await supabase
            .from("reservation_info")
            .select("*")
            .eq("hospital_name", hospitalName);
          if (error) throw new Error(error.message);
          setReservationInfo(data);
        }
      } catch (error) {
        if (error instanceof Error) console.error(error.message);
      }
    };

    fetchReservationInfo();
  }, [hospitalName]);

  // 상세보기 버튼 눌렀을 때 모달 보여주는 함수
  const handleDetailButtonClick = (info: ReservationInfo) => {
    setSelectedReservation(info);
    setIsModalOpen(true);
  };

  // 모달 닫는 함수
  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditedData(null);
  };

  // input 변화 제어하는 함수
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editedData) {
      setEditedData({ ...editedData, [name]: value });
    }
  };

  // 수정 버튼 눌렀을 때 폼 나오게 하는 함수
  const handleEditButtonClick = () => {
    setEditedData(selectedReservation);
  };

  // 수정된 내용 DB에 update하는 함수
  const handleChangedReservationSave = async () => {
    try {
      if (editedData) {
        const { data, error } = await supabase
          .from("reservation_info")
          .update(editedData)
          .eq("reservation_id", editedData.reservation_id);
        if (error) throw new Error(error.message);
        if (data) {
          setReservationInfo((prev) =>
            prev.map((info) =>
              info.reservation_id === editedData.reservation_id
                ? editedData
                : info
            )
          );
        }
        setIsModalOpen(false);
        alert("수정이 완료됐습니다.");
        setEditedData(null);
        window.location.reload();
      }
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }
  };

  // 검진 완료된 내역 삭제하는 함수
  const handleDeleteCompletedList = async () => {
    try {
      if (selectedReservation) {
        const { data, error } = await supabase
          .from("reservation_info")
          .delete()
          .eq("reservation_id", selectedReservation.reservation_id);
        if (error) throw new Error(error.message);
        if (data) {
          setReservationInfo((prev) =>
            prev.filter(
              (info) =>
                info.reservation_id !== selectedReservation.reservation_id
            )
          );
          setIsModalOpen(false);
          alert("예약 정보가 삭제되었습니다.");
          setEditedData(null);
        }
      }
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }
  };

  return (
    <>
      <section>
        {reservationInfo.length === 0 && (
          <p className="w-[160px] h-[19px] mx-[110px] mt-[185px] text-[16px]  text-gray-400">
            예약된 내역이 없습니다.
          </p>
        )}
      </section>
      <section className="mx-[16px]">
        {reservationInfo &&
          reservationInfo.map((info) => (
            <div key={info.reservation_id} className="h-[134px] mt-[26px]">
              <p className="w-[68px] h-[14px] text-[12px] text-center place-content-center font-light bg-gray-500 text-white rounded mb-[8px]">
                {info.apply_date?.substring(0, 4)}.
                {info.apply_date?.substring(5, 7)}.
                {info.apply_date?.substring(8, 10)}
              </p>
              <section className="h-[104px] border rounded-[10px] flex-col">
                <section className="flex mx-[16px] mt-[20.5px] mb-[12px]">
                  <p className="w-[296px] h-[19px] text-[16px] mr-[10px] font-medium">
                    예약번호: {info.reservation_id.substring(0, 7)}
                  </p>
                  <button onClick={() => handleDetailButtonClick(info)}>
                    <Image
                      src={detailIcon}
                      alt="상세보기"
                      className="w-[20px] h-[20px]"
                    />
                  </button>
                </section>
                <section className="w-[120px] h-[14px] ml-[16px] mb-[4px] flex">
                  <p className="w-[48px] h-[14px] mr-[8px] text-[12px] font-medium">
                    검진자명
                  </p>
                  <p className="w-[60px] h-[14px] text-[12px] regular-12">
                    {info.subject_name}
                  </p>
                </section>
                <section className="w-[169px] h-[32px] ml-[16px]  flex">
                  <p className="w-[48px] h-[14px] mr-[8px] text-[12px] font-medium">
                    예약시간
                  </p>
                  <p className="w-[60px] h-[14px] text-[12px] regular-12">
                    {info.apply_time?.substring(0, 5)}
                  </p>
                </section>
              </section>
            </div>
          ))}
        <section className="h-[393px]">
          {isModalOpen && selectedReservation && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="absolute inset-0 bg-black opacity-30"></div>
              <div className="w-[358px] h-[393px] bg-white rounded-[10px] p-12 z-10 relative">
                <button
                  className="absolute top-[16px] right-[16px] cursor-pointer"
                  onClick={handleModalClose}
                >
                  <Image
                    src={closeIcon}
                    alt="close button"
                    className="w-[20px] h-[20px]"
                  />
                </button>
                <section className="w-[326px] h-[288px] top-[48px]">
                  <div className="flex flex-row items-center w-[326px] h-[28px]">
                    <Image
                      src={reservationId}
                      alt="예약번호"
                      className="w-[28px] h-[28px] left-[16px] top-[48px]"
                    />
                    <span className="w-[56px] h-[19px] mr-[50px]">
                      예약번호
                    </span>
                    <span className="w-[75px] h-[19px] mr-[105px] ">
                      {selectedReservation.reservation_id.substring(0, 7)}
                    </span>
                  </div>
                  <div className="flex">
                    <Image
                      src={reservationHospital}
                      alt="예약병원"
                      className="w-[28px] h-[28px]"
                    />
                    <span>예약병원</span>
                    <span>{selectedReservation.hospital_name}</span>
                  </div>
                  <div className="flex">
                    <Image
                      src={reservationDate}
                      alt="예약일시"
                      className="w-[28px] h-[28px]"
                    />
                    <span>예약일시</span>
                    <span>
                      {selectedReservation.apply_date?.substring(0, 4)}년
                      {selectedReservation.apply_date?.substring(6, 7)}월
                      {selectedReservation.apply_date?.substring(8, 10)}일
                      {selectedReservation.apply_time?.substring(0, 5)}
                    </span>
                  </div>
                  <div className="flex">
                    <Image
                      src={subjectName}
                      alt="검진자명"
                      className="w-[28px] h-[28px]"
                    />
                    <span>검진자명</span>
                    <span>{selectedReservation.subject_name}</span>
                  </div>
                  <div className="flex">
                    <Image
                      src={reservationStatus}
                      alt="진행상태"
                      className="w-[28px] h-[28px]"
                    />
                    <span>진행상태</span>
                    <span>{selectedReservation.status}</span>
                  </div>
                  <div className="flex">
                    <Image
                      src={course}
                      alt="검진코스"
                      className="w-[28px] h-[28px]"
                    />
                    <span>검진코스</span>
                    <span>{selectedReservation.program_name}</span>
                  </div>
                </section>
                <section>
                  {(selectedReservation.status === "예약 대기" ||
                    selectedReservation.status === "예약 확정") && (
                    <button
                      className="absolute bottom-4"
                      onClick={handleEditButtonClick}
                    >
                      수정
                    </button>
                  )}
                  {selectedReservation.status === "검진 완료" && (
                    <button
                      className="absolute bottom-4"
                      onClick={handleDeleteCompletedList}
                    >
                      삭제
                    </button>
                  )}
                </section>
              </div>
            </div>
          )}
        </section>
        {editedData && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black opacity-50 w-[358px] h-[393px]"></div>
            <div className="bg-white rounded-lg p-12 z-10 relative">
              <button onClick={handleModalClose}>X</button>
              <h2>예약 정보 수정</h2>
              <div>
                <label htmlFor="subject_name">검진자명:</label>
                <input
                  type="text"
                  id="subject_name"
                  name="subject_name"
                  value={editedData?.subject_name || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="apply_date">예약일:</label>
                <input
                  type="date"
                  id="apply_date"
                  name="apply_date"
                  value={editedData?.apply_date || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="apply_time">예약시간:</label>
                <input
                  type="time"
                  id="apply_time"
                  name="apply_time"
                  value={editedData?.apply_time || ""}
                  onChange={handleInputChange}
                />
              </div>
              <button onClick={handleChangedReservationSave}>수정하기</button>
              <button onClick={handleModalClose}>취소하기</button>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default ReservationInfoItem;
