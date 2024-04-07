"use client";

import HospitalName from "./HospitalName";
import useApplyStore from "../../shared/zustand/applyStore";
import { useRouter } from "next/navigation";

const ApplyPageOne = ({
  setPageCount
}: {
  setPageCount: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { name, setName, idNumber, setIdNumber, phoneNumber, setPhoneNumber } =
    useApplyStore();
  const router = useRouter();

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const onChangeIdNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIdNumber(parseFloat(e.target.value));
  };
  const onChangePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(parseFloat(e.target.value));
  };
  const handleNextClick = () => {
    return setPageCount("two");
  };
  const handleBtnClick = () => {
    router.push("/home");
  };

  return (
    <>
      <HospitalName />
      <article>병원 지도</article>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <button onClick={handleBtnClick}>X</button>
        <div>
          이름
          <input className="text-black" onChange={onChangeName} value={name} />
        </div>
        <div>
          주민등록번호
          <input
            className="text-black"
            onChange={onChangeIdNumber}
            value={idNumber}
          />
        </div>
        <div>
          휴대전화번호
          <input
            className="text-black"
            onChange={onChangePhoneNumber}
            value={phoneNumber}
          />
        </div>
        <button onClick={handleNextClick}>다음</button>
      </form>
    </>
  );
};
export default ApplyPageOne;
