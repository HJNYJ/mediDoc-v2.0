import { useEffect } from "react";

const CategorySelect = ({ onSelectCategory, setBodyparts, bodyparts }) => {
  // const [bodyparts, setBodyparts] = useState("");

  useEffect(() => {
    if (bodyparts !== "") {
      onSelectCategory(bodyparts);
    }
  }, [bodyparts, onSelectCategory]);

  return (
    <>
      <label className="block mb-3 regular-14 text-gray-800">카테고리</label>
      <select
        onChange={(e) => setBodyparts(e.target.value)}
        className="bg-bluegray w-[358px] h-[55px] rounded-xl border border-gray-300 mb-7 pl-5 semibold-16 text-gray-800"
      >
        <option className="semibold-16">부위 선택</option>
        <option value="nose">코</option>
        <option value="neck">목</option>
        <option value="ears">귀</option>
        <option value="waist">등/허리</option>
        <option value="abdomen">배</option>
        <option value="chest">가슴</option>
      </select>
    </>
  );
};

export default CategorySelect;
