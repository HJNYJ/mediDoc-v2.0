// 건강검진 신청 페이지
"use client";

import ApplyPageOne from "@/components/apply/ApplyPageOne";
import ApplyPageTwo from "@/components/apply/ApplyPageTwo";
import ApplyPageThree from "@/components/apply/ApplyPageThree";
import ApplyPageFour from "@/components/apply/ApplyPageFour";
import React, { useState } from "react";

const ApplyPage = () => {
  const [pageCount, setPageCount] = useState<string>("first");
  const [name, setName] = useState<string>("");
  const [idNumber, setIdNumber] = useState<number>();
  const [phoneNumber, setPhoneNumber] = useState<number>();

  return (
    <>
      {pageCount === "one" ? (
        <ApplyPageOne
          setPageCount={setPageCount}
          name={name}
          setName={setName}
          idNumber={idNumber}
          setIdNumber={setIdNumber}
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
        />
      ) : pageCount === "two" ? (
        <ApplyPageTwo setPageCount={setPageCount} />
      ) : pageCount === "three" ? (
        <ApplyPageThree setPageCount={setPageCount} />
      ) : pageCount === "four" ? (
        <ApplyPageFour />
      ) : (
        <div>Error</div>
      )}
    </>
  );
};

export default ApplyPage;
