import React from "react";
import Image from "next/image";
import Male_checked from "@/assets/icons/selftest/Male_checked.png";
import Male_not_checked from "@/assets/icons/selftest/Male_not_checked.png";
import Female_checked from "@/assets/icons/selftest/Female_checked.png";
import Female_not_checked from "@/assets/icons/selftest/Female_not_checked.png";
import useSelftestStore from "@/shared/zustand/selftestStore";

interface GendersProps {
  onSelect: () => void;
}

const Genders: React.FC<GendersProps> = ({ onSelect }) => {
  const { selectedGender, setSelectedGender } = useSelftestStore();

  const handleGenderSelect = (gender: "male" | "female") => {
    setSelectedGender(gender);
  };

  return (
    <section className="w-[358px] mx-[16px]">
      <section>
        <p className="w-[200px] h-[36px] mt-[54px] bold-26">
          성별을 알려주세요.
        </p>
        <p className="w-[310px] h-[21px] mt-[20px] medium-18 text-gray-400">
          성별에 따라 진료 결과가 달라질 수 있어요.
        </p>
      </section>
      <section className="mt-[38px] mb-[362px]">
        <button
          className="w-[168px] h-[185px] mr-[22px] rounded-[10px] bold-16"
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
        <button
          className="w-[168px] h-[185px] rounded-[10px] bold-16"
          onClick={() => handleGenderSelect("male")}
          onSelect={onSelect}
        >
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
