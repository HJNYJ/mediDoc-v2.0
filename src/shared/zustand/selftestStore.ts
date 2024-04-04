import { create } from "zustand";

const useSelftestStore = create((set) => ({
  symptoms: [],
  setSymptoms: (symptoms) => set({ symptoms: symptoms }),
  selectedSymptoms: [],
  setSelectedSymptoms: (symptoms) => set({selectedSymptoms: symptoms}),
  predictedDiseases: [],
  setPredictedDiseases: (diseases) => set({predictedDiseases: diseases})
}));

export default useSelftestStore;
