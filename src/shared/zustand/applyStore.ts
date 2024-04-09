import { create } from "zustand";

type State = {
  name: string;
  setName: (name: string) => void;
  idNumber: number;
  setIdNumber: (idNumber: number) => void;
  phoneNumber: number;
  setPhoneNumber: (phoneNumber: number) => void;
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
