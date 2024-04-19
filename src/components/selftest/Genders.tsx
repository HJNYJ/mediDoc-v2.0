import React from "react";
import Image from "next/image";
import Male_checked from "@/assets/icons/selftest/Male_checked.png";
import Male_not_checked from "@/assets/icons/selftest/Male_not_checked.png";
import Female_checked from "@/assets/icons/selftest/Female_checked.png";
import Female_not_checked from "@/assets/icons/selftest/Female_not_checked.png";
import useSelftestStore from "@/shared/zustand/selftestStore";
import YellowBarMg from "../layout/YellowBarMg";
import GrayBarMg from "../layout/GrayBarMg";
import GrayBar from "../layout/GrayBar";

interface GendersProps {
  onSelect: () => void;
}

const Genders: React.FC<GendersProps> = ({ onSelect }) => {
  const { selectedGender, setSelectedGender } = useSelftestStore();
  const handleGenderSelect = (gender: "male" | "female") => {
    setSelectedGender(gender);
  };

  return (
    <section className="w-full py-[15px]">
      <div className="flex mb-[40px]">
        <YellowBarMg />
        <GrayBarMg />
        <GrayBarMg />
        <GrayBar />
      </div>
      <section>
        <p className="w-full h-[36px] mb-[20px] bold-26">성별을 알려주세요.</p>
        <p className="w-full h-[21px] mb-[60px] medium-18 text-gray-400">
          성별에 따라 진료 결과가 달라질 수 있어요.
        </p>
      </section>
      <section className="flex justify-between mb-[362px] h-[185px]">
        <button
          onClick={() => handleGenderSelect("female")}
          onSelect={onSelect}
        >
          <Image
            src={
              selectedGender === "female" ? Female_checked : Female_not_checked
            }
            alt="Female"
          />
        </button>
        <button onClick={() => handleGenderSelect("male")} onSelect={onSelect}>
          <Image
            src={selectedGender === "male" ? Male_checked : Male_not_checked}
            alt="Male"
          />
        </button>
      </section>
    </section>
  );
};

export default Genders;
