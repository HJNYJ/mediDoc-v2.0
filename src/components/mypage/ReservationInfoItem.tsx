// 예약정보 1개 div
"use client";

import { supabase } from "@/api/supabase";
import React, { useEffect, useState } from "react";
import type { ReservationInfo } from "@/types";
import useMyPageStore from "@/shared/zustand/myPageStore";
import detailIcon from "@/assets/icons/nextIcon.png";
import Image from "next/image";
import reservationId from "@/assets/icons/modal/reservation_id.png";
import reservationHospital from "@/assets/icons/modal/hospital.png";
import reservationDate from "@/assets/icons/modal/date.png";
import subjectName from "@/assets/icons/modal/subject_name.png";
import reservationStatus from "@/assets/icons/modal/status.png";
import course from "@/assets/icons/modal/course.png";
import PageCancel from "../layout/PageCancel";

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
        const id = user?.id ?? "";
        const email = user?.email ?? "";

        // 유저 타입 가져오기
        const { data: userInfo, error: userInfoError } = await supabase
          .from("user_info")
          .select("user_type")
          .eq("user_id", id)
          .single();

        if (userInfoError) throw new Error(userInfoError.message);

        const userType = userInfo?.user_type;

        if (userType === "general user") {
          // 일반 유저일 경우
          const { data, error } = await supabase
            .from("reservation_info")
            .select("*")
            .eq("user_email", email);

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
          // eslint-disable-next-line
          // @ts-ignore
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
          <p className="w-full h-[19px] mx-[110px] mt-[185px] text-[16px] text-gray-400">
            예약된 내역이 없습니다.
          </p>
        )}
      </section>
      <section>
        {reservationInfo &&
          reservationInfo.map((info) => (
            <div key={info.reservation_id} className="h-[134px] mt-[26px]">
              <p className="w-[68px] h-[14px] text-[12px] text-center place-content-center font-light bg-gray-500 text-white rounded mb-[8px]">
                {info.apply_date?.toString().substring(0, 4)}.
                {info.apply_date?.toString().substring(5, 7)}.
                {info.apply_date?.toString().substring(8, 10)}
              </p>
              <section className="h-[104px] border rounded-[10px] flex-col">
                <section className="flex m-4 mb-[12px] justify-between">
                  <p className="w-[296px] h-[19px] text-[16px] font-medium">
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
                    {info.subject_name} 님
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
              <div className="total_margin h-[393px] bg-white rounded-[10px] p-4 z-10 relative flex flex-col">
                <button
                  className="cursor-pointer ml-auto"
                  onClick={handleModalClose}
                >
                  <PageCancel />
                </button>
                <section className="medium-16">
                  <div className="flex flex-row mb-3 items-center">
                    <Image
                      src={reservationId}
                      alt="예약번호"
                      className="w-[28px] mr-3 h-[28px]"
                    />
                    <span className="w-[66px] mr-[50px] tracking-[-1px]">
                      예약번호
                    </span>
                    <span className="w-[75px] ">
                      {selectedReservation.reservation_id.substring(0, 7)}
                    </span>
                  </div>
                  <hr className="border-solid border-gray border-1 mb-3" />
                  <div className="flex flex-row mb-3 items-center">
                    <Image
                      src={reservationHospital}
                      alt="예약병원"
                      className="w-[28px] mr-3 h-[28px]"
                    />
                    <span className="w-[66px] mr-[50px] tracking-[-1px]">
                      예약병원
                    </span>
                    <span>{selectedReservation.hospital_name}</span>
                  </div>
                  <hr className="border-solid border-gray border-1 mb-3" />
                  <div className="flex flex-row mb-3 items-center">
                    <Image
                      src={reservationDate}
                      alt="예약일시"
                      className="w-[28px] mr-3 h-[28px]"
                    />
                    <span className="w-[66px] mr-[50px] tracking-[-1px]">
                      예약일시
                    </span>
                    <span>
                      {selectedReservation.apply_date
                        ?.toString()
                        .substring(0, 4)}
                      년
                      {selectedReservation.apply_date
                        ?.toString()
                        .substring(6, 7)}
                      월
                      {selectedReservation.apply_date
                        ?.toString()
                        .substring(8, 10)}
                      일
                      {selectedReservation.apply_time
                        ?.toString()
                        .substring(0, 5)}
                      시
                    </span>
                  </div>
                  <hr className="border-solid border-gray border-1 mb-3" />
                  <div className="flex flex-row mb-3 items-center">
                    <Image
                      src={subjectName}
                      alt="검진자명"
                      className="w-[28px] mr-3 h-[28px]"
                    />
                    <span className="w-[66px] mr-[50px] tracking-[-1px]">
                      검진자명
                    </span>
                    <span>{selectedReservation.subject_name} 님</span>
                  </div>
                  <hr className="border-solid border-gray border-1 mb-3" />
                  <div className="flex flex-row mb-3 items-center">
                    <Image
                      src={reservationStatus}
                      alt="진행상태"
                      className="w-[28px] mr-3 h-[28px]"
                    />
                    <span className="w-[66px] mr-[50px] tracking-[-1px]">
                      진행상태
                    </span>
                    <span>{selectedReservation.status}</span>
                  </div>
                  <hr className="border-solid border-gray border-1 mb-3" />
                  <div className="flex flex-row mb-3 items-center">
                    <Image
                      src={course}
                      alt="검진코스"
                      className="w-[28px] mr-3 h-[28px]"
                    />
                    <span className="w-[66px] mr-[50px] tracking-[-1px]">
                      검진코스
                    </span>
                    <span>{selectedReservation.program_name}</span>
                  </div>
                  <hr className="border-solid border-gray border-1 mb-3" />
                </section>
                <section className="flex justify-end">
                  {(selectedReservation.status === "예약 대기" ||
                    selectedReservation.status === "예약 확정") && (
                    <button
                      className=" bg-gray-200 rounded-full w-14"
                      onClick={handleEditButtonClick}
                    >
                      수정
                    </button>
                  )}
                  {selectedReservation.status === "검진 완료" && (
                    <button
                      className=" bg-gray-200 rounded-full w-14"
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
          <div className="fixed inset-0 flex items-center justify-center z-50 ">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="bg-white total_margin h-[393px] rounded-[10px] p-4 z-10 relative flex flex-col">
              <button
                onClick={handleModalClose}
                className="cursor-pointer ml-auto"
              >
                <PageCancel />
              </button>
              <h3 className="text-xl mb-4">예약정보 수정</h3>
              <hr className="border-solid border-gray-800 border-1 mb-10" />
              <div className="flex flex-row mb-3 items-center">
                <label
                  className="w-[66px] mr-[50px] tracking-[-1px]"
                  htmlFor="subject_name"
                >
                  검진자명
                </label>
                <input
                  type="text"
                  id="subject_name"
                  name="subject_name"
                  value={editedData?.subject_name + " 님" || ""}
                  onChange={handleInputChange}
                  className="text-left"
                />
              </div>
              <div className="flex flex-row mb-3 items-center">
                <label
                  htmlFor="apply_date"
                  className="w-[66px] mr-[50px] tracking-[-1px]"
                >
                  예약일
                </label>
                <input
                  type="date"
                  id="apply_date"
                  name="apply_date"
                  value={editedData?.apply_date.toString() || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-row mb-3 items-center">
                <label
                  htmlFor="apply_time"
                  className="w-[66px] mr-[50px] tracking-[-1px]"
                >
                  예약시간
                </label>
                <input
                  type="time"
                  id="apply_time"
                  name="apply_time"
                  value={editedData?.apply_time || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mt-auto flex justify-end">
                <button
                  className="bg-gray-200 rounded-full w-14 mr-2"
                  onClick={handleChangedReservationSave}
                >
                  수정
                </button>
                <button
                  className="bg-gray-200 rounded-full w-14"
                  onClick={handleModalClose}
                >
                  취소
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default ReservationInfoItem;
