"use client";

// 상담 내역 1개
import React from "react";
import ConsultQuestion from "./ConsultQuestion";
import ConsultAnswer from "./ConsultAnswer";

const ConsultItem = () => {
  return (
    <section>
      <ConsultQuestion />
      <ConsultAnswer />
    </section>
  );
};

export default ConsultItem;
