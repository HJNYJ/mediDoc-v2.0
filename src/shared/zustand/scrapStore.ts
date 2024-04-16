import { create } from "zustand";

interface State {
  isScrapped: boolean;
  setIsScrapped: (isScrapped: boolean) => void;
}

const useScrapStore = create<State>()((set) => ({
  isScrapped: false,
  setIsScrapped: (isScrapped) => set({ isScrapped })
}));

export default useScrapStore;
