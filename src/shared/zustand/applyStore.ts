import { create } from "zustand";
// const [name, setName] = useState<string>("");
//   const [idNumber, setIdNumber] = useState<number>();
//   const [phoneNumber, setPhoneNumber] = useState<number>();
type State = {
  name: string;
  idNumber: number;
  phoneNumber: number;
};
const useApplyStore = create<State>()((set) => ({
  name: "성예지",
  setName: () => set((state) => ({ name: state.name })),
  idNumber: 1,
  setIdNumber: () => set((state) => ({ idNumber: state.idNumber })),
  phoneNumber: 1,
  setPhoneNumber: () => set((state) => ({ phoneNumber: state.phoneNumber }))
}));
export default useApplyStore;

// const {name} = useApplyStore;  : zustand에 저장된 name을 불러온 함수
// const {setName} =useApplyStore;  : setName함수를 불러오는 코드
// setName : name을 저장할 함수,
// import { create } from "zustand";

// const useApplyStore = create((set) => ({})); // useState로 관리되는 상태들 다 넣으면 됨

// export default useApplyStore;
