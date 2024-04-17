// 검진 프로그램 정보 & 가격 div
"use client";
import React, { useState } from "react";

const ProgramInfo = () => {
  const [isBasicToggled, setBasicToggled] = useState(false);
  const [isStandardToggled, setStandardToggled] = useState(false);
  const [isVIPToggled, setVIPToggled] = useState(false);
  const [isVVIPToggled, setVVIPToggled] = useState(false);
  return (
    <section className="w-[390px] justify-center">
      {/* 베이직 */}
      <div>
        <div className="flex justify-between w-[358px]">
          <h2 className="medium-16 my-3">베이직</h2>
          <span
            className="inline-flex items-center justify-center cursor-pointer w-6"
            onClick={(e) => {
              e.preventDefault();
              if (isBasicToggled) {
                setBasicToggled(false);
              } else {
                setBasicToggled(true);
                setStandardToggled(false);
                setVIPToggled(false);
                setVVIPToggled(false);
              }
            }}
          >
            {isBasicToggled ? "🔼" : "🔽"}
          </span>
        </div>
        {isBasicToggled && (
          <div className="w-[328px] regular-14 text-gray-800 my-2">
            <p className="regular-14 text-gray-800">
              기본 진료(진찰, 신체/체중, 체성분측정), 시력검사, 청력 검사 혈압
              측정, 심전도 검사, 흉부 X-Ray 검사, 골밀도 유방촬영술(여),
              자궁경부세포(여)
            </p>
            <p className="bold-16 text-orange my-3">40,000원</p>
          </div>
        )}
      </div>
      {/* 스탠다드 */}
      <div>
        <div className="flex justify-between w-[358px]">
          <h2 className="medium-16 my-3">스탠다드</h2>
          <span
            className="inline-flex items-center justify-center cursor-pointer w-6"
            onClick={(e) => {
              e.preventDefault();
              if (isStandardToggled) {
                setStandardToggled(false);
              } else {
                setBasicToggled(false);
                setStandardToggled(true);
                setVIPToggled(false);
                setVVIPToggled(false);
              }
            }}
          >
            {isStandardToggled ? "🔼" : "🔽"}
          </span>
        </div>
        {isStandardToggled && (
          <div className="w-[328px] regular-14 text-gray-800 my-2">
            <p className="regular-14 text-gray-800">
              기본 진료(진찰, 신체/체중, 체성분측정), 시력검사, 청력 검사 혈압
              측정, 심전도 검사, 흉부 X-Ray 검사, 골밀도 유방촬영술(여),
              자궁경부세포(여)
            </p>
            <p className="bold-16 text-orange my-3">50,000원</p>
          </div>
        )}
      </div>
      {/* VIP */}
      <div>
        <div className="flex justify-between w-[358px]">
          <h2 className="medium-16 my-3">VIP</h2>
          <span
            className="inline-flex items-center justify-center cursor-pointer w-6"
            onClick={(e) => {
              e.preventDefault();
              if (isVIPToggled) {
                setVIPToggled(false);
              } else {
                setBasicToggled(false);
                setStandardToggled(false);
                setVIPToggled(true);
                setVVIPToggled(false);
              }
            }}
          >
            {isVIPToggled ? "🔼" : "🔽"}
          </span>
        </div>
        {isVIPToggled && (
          <div className="w-[328px] regular-14 text-gray-800 my-2">
            <p className="regular-14 text-gray-800">
              기본 진료(진찰, 신체/체중, 체성분측정), 시력검사, 청력 검사 혈압
              측정, 심전도 검사, 흉부 X-Ray 검사, 골밀도 유방촬영술(여),
              자궁경부세포(여)
            </p>
            <p className="bold-16 text-orange my-3">60,000원</p>
          </div>
        )}
      </div>
      {/* VVIP */}
      <div>
        <div className="flex justify-between w-[358px]">
          <h2 className="medium-16 my-3">VVIP</h2>
          <span
            className="inline-flex items-center justify-center cursor-pointer w-6"
            onClick={(e) => {
              e.preventDefault();
              if (isVVIPToggled) {
                setVVIPToggled(false);
              } else {
                setBasicToggled(false);
                setStandardToggled(false);
                setVIPToggled(false);
                setVVIPToggled(true);
              }
            }}
          >
            {isVVIPToggled ? "🔼" : "🔽"}
          </span>
        </div>
        {isVVIPToggled && (
          <div className="w-[328px] regular-14 text-gray-800 my-2">
            <p className="regular-14 text-gray-800">
              기본 진료(진찰, 신체/체중, 체성분측정), 시력검사, 청력 검사 혈압
              측정, 심전도 검사, 흉부 X-Ray 검사, 골밀도 유방촬영술(여),
              자궁경부세포(여)
            </p>
            <p className="bold-16 text-orange my-3">70,000원</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProgramInfo;
