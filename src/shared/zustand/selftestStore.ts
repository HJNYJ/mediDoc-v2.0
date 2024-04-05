import { create } from "zustand";

interface StoreState {}

const useSelftestStore = create<StoreState>()((set) => ({
  symptoms: [],
  setSymptoms: (symptoms: string) => set({ symptoms: symptoms }),
  selectedPart: "",
  setSelectedPart: (bodypart: string) => set({ selectedPart: bodypart }),
  selectedSymptoms: [],
  setSelectedSymptoms: (symptoms: string) =>
    set({ selectedSymptoms: symptoms }),
  predictedDiseases: [],
  setPredictedDiseases: (diseases: string) =>
    set({ predictedDiseases: diseases })
}));

export default useSelftestStore;
