import { create } from "zustand";

interface State {
  hospitalName: string;
  setHospitalName: (name: string) => void;
}

const useMyPageStore = create<State>()((set) => ({
  hospitalName: "",
  setHospitalName: (name) => set({ hospitalName: name })
}));

export default useMyPageStore;
