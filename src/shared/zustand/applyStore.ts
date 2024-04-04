import { create } from "zustand";
// const [name, setName] = useState<string>("");
//   const [idNumber, setIdNumber] = useState<number>();
//   const [phoneNumber, setPhoneNumber] = useState<number>();

const useApplyStore = create((set) => ({
  name: "",
  setName: (name) => set({ name: name }),
  idNumber: "",
  setIdNumber: (idNumber) => set({ idNumber: idNumber }),
  phoneNumber: "",
  setPhoneNumber: (phoneNumber) => set({ phoneNumber: phoneNumber })
}));

export default useApplyStore;
