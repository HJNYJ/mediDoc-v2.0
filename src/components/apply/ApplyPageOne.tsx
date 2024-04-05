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

  // const {name} = useApplyStore;  : zustand에 저장된 name을 불러온 함수
  // const {setName} =useApplyStore;  : setName함수를 불러오는 코드
  // setName : name을 저장할 함수,

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
          <input onChange={onChangeName} key={name} />
        </div>
        <div>
          주민등록번호
          <input onChange={onChangeIdNumber} key={idNumber} /> - <input />
        </div>
        <div>
          휴대전화번호
          <input onChange={onChangePhoneNumber} key={phoneNumber} />
        </div>
        <button onClick={handleNextClick}>다음</button>
      </form>
    </>
  );
};
export default ApplyPageOne;
