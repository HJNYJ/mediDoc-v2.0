// 예약정보 1개 div
"use client";

import { supabase } from "@/api/supabase";
import React, { useEffect, useState } from "react";
import type { ReservationInfo } from "@/types";
import useMyPageStore from "@/shared/zustand/myPageStore";

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
      {reservationInfo.length === 0 && <p>예약된 내역이 없습니다.</p>}
      {reservationInfo &&
        reservationInfo.map((info) => (
          <div key={info.reservation_id}>
            <section></section>
            <section className="border m-8 flex-col">
              <section className="flex ">
                <p className="text-lg font-bold mr-4">
                  예약번호: {info.reservation_id.substring(0, 7)}
                </p>
                <button onClick={() => handleDetailButtonClick(info)}>
                  상세보기
                </button>
              </section>
              <p>검진자명: {info.subject_name} </p>
              <p>
                예약일시: {info.apply_date?.substring(0, 4)}년
                {info.apply_date?.substring(6, 7)}월
                {info.apply_date?.substring(8, 10)}일
                {info.apply_time?.substring(0, 5)}
              </p>
            </section>
          </div>
        ))}
      {isModalOpen && selectedReservation && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="bg-white rounded-lg p-12 z-10 relative">
            <button
              className="absolute top-4 right-4 text-lg cursor-pointer"
              onClick={handleModalClose}
            >
              X
            </button>
            <h2>
              예약 번호 : {selectedReservation.reservation_id.substring(0, 7)}
            </h2>
            <h2>예약 병원 : {selectedReservation.hospital_name}</h2>
            <h2>
              예약 일시 : {selectedReservation.apply_date?.substring(0, 4)}년
              {selectedReservation.apply_date?.substring(6, 7)}월
              {selectedReservation.apply_date?.substring(8, 10)}일
              {selectedReservation.apply_time?.substring(0, 5)}
            </h2>
            <h2>검진자명 : {selectedReservation.subject_name}</h2>
            <h2>진행상태 : {selectedReservation.status}</h2>
            <h2>
              검진코스 : {selectedReservation.reservation_id.substring(0, 7)}
            </h2>
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
      {editedData && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50"></div>
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
    </>
  );
};

export default ReservationInfoItem;
