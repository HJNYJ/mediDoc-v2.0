// 건강검진 신청 페이지
"use client";

import ApplyPageFourth from "@/components/apply/ApplyPageFourth";
import ApplyPageOne from "@/components/apply/ApplyPageOne";
import ApplyPageThird from "@/components/apply/ApplyPageThird";
import ApplyPageTwo from "@/components/apply/ApplyPageTwo";
import React, { useState } from "react";

const ApplyPage = () => {
  const [pageCount, setPageCount] = useState<string>("first");

  const pageMovement = () => {
    if (pageCount === "first") {
      return <ApplyPageOne />;
    } else if (pageCount === "second") {
      return <ApplyPageTwo />;
    } else if (pageCount === "third") {
      return <ApplyPageThird />;
    } else {
      return <ApplyPageFourth />;
    }
  };
  return <>{pageMovement}</>;
};

export default ApplyPage;
