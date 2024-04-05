import React from "react";
import Reservation from "./Reservation";
import VisitorInfo from "./VisitorInfo";
import { useRouter } from "next/navigation";

const ApplyPageFourth = () => {
  const router = useRouter();

  const handleBtnClick = () => {
    router.push("/home");
  };
  return (
    <>
      <div>
        <Reservation />
        <VisitorInfo />
      </div>
      <button onClick={handleBtnClick}>확인</button>
    </>
  );
};

export default ApplyPageFourth;
