import { create } from "zustand";

type State = {
  name: string;
  setName: (name: string) => void;
  idNumber: number;
  setIdNumber: (idNumber: number) => void;
  phoneNumber: number;
  setPhoneNumber: (phoneNumber: number) => void;
  selectedDate: string;
  setSelectedDate: (selectedDate: string) => void;
};
const useApplyStore = create<State>()((set) => ({
  name: "",
  setName: (name) => set({ name }),
  idNumber: 0,
  setIdNumber: (idNumber) => set({ idNumber }),
  phoneNumber: 0,
  setPhoneNumber: (phoneNumber) => set({ phoneNumber }),
  selectedDate: "",
  setSelectedDate: (selectedDate) => set({ selectedDate })
}));
export default useApplyStore;
