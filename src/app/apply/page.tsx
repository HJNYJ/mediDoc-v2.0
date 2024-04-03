// 건강검진 신청 페이지

import ApplyPageFourth from "@/components/apply/ApplyPageFourth";
import ApplyPageOne from "@/components/apply/ApplyPageOne";
import ApplyPageThird from "@/components/apply/ApplyPageThird";
import ApplyPageTwo from "@/components/apply/ApplyPageTwo";
import React, { useState } from "react";

const ApplyPage = () => {
  const [pageCount, setPageCount] = useState<string>("first");

  return (
    <>
      {pageCount === "first" ? (
        <ApplyPageOne setPageCount={setPageCount} />
      ) : pageCount === "second" ? (
        <ApplyPageTwo setPageCount={setPageCount} />
      ) : pageCount === "third" ? (
        <ApplyPageThird setPageCount={setPageCount} />
      ) : pageCount === "forth" ? (
        <ApplyPageFourth />
      ) : (
        <div>Error</div>
      )}
    </>
  );
};

export default ApplyPage;
