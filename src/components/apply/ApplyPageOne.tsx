"use client";

import HospitalName from "./HospitalName";
import useApplyStore from "../../shared/zustand/applyStore";

const ApplyPageOne = ({
  setPageCount
}: {
  setPageCount: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { name, setName, idNumber, setIdNumber, phoneNumber, setPhoneNumber } =
    useApplyStore();

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const onChangeIdNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIdNumber(parseFloat(e.target.value));
  };
  const onChangePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIdNumber(parseFloat(e.target.value));
  };
  const handleNextClick = () => {
    return setPageCount("second");
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
        <div>
          이름
          <input onChange={onChangeName} />
        </div>
        <div>
          주민등록번호
          <input onChange={onChangeIdNumber} /> - <input />
        </div>
        <div>
          휴대전화번호
          <input onChange={onChangePhoneNumber} />
        </div>
        <button onClick={handleNextClick}>다음</button>
      </form>
      <article>병원 지도</article>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div>
          이름
          <input onChange={onChangeName} />
        </div>
        <div>
          주민등록번호
          <input onChange={onChangeIdNumber} /> - <input />
        </div>
        <div>
          휴대전화번호
          <input onChange={onChangePhoneNumber} />
        </div>
        <button onClick={handleNextClick}>다음</button>
      </form>
    </>
  );
};
export default ApplyPageOne;
