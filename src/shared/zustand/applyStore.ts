import { create } from "zustand";

type State = {
  name: string;
  setName: (name: string) => void;
  idNumber: number;
  setIdNumber: (idNumber: number) => void;
  phoneNumber: number;
  setPhoneNumber: (phoneNumber: number) => void;
  selectedDate: Date;
  setSelectedDate: (selectedDate: Date) => void;
  selectedTime: string;
  setSelectedTime: (selectedTime: string) => void;
};
const useApplyStore = create<State>()((set) => ({
  name: "",
  setName: (name) => set({ name }),
  idNumber: 0,
  setIdNumber: (idNumber) => set({ idNumber }),
  phoneNumber: 0,
  setPhoneNumber: (phoneNumber) => set({ phoneNumber }),
  selectedDate: new Date(),
  setSelectedDate: (selectedDate) => set({ selectedDate }),
  selectedTime: "",
  setSelectedTime: (selectedTime) => set({ selectedTime })
}));
export default useApplyStore;
