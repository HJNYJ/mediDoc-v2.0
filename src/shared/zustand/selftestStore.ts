import { create } from "zustand";

interface State {
  symptoms: string[];
  setSymptoms: (symptoms: string[]) => void;
  selectedPart: string;
  setSelectedPart: (selectedPart: string) => void;
  selectedSymptoms: string[];
  setSelectedSymptoms: (selectedSymptoms: string[]) => void;
  predictedDiseases: string[];
  setPredictedDiseases: (disease: string[]) => void;
}

const useSelftestStore = create<State>()((set) => ({
  symptoms: [],
  setSymptoms: (symptoms) => set({ symptoms }),
  selectedPart: "",
  setSelectedPart: (selectedPart) => set({ selectedPart }),
  selectedSymptoms: [],
  setSelectedSymptoms: (symptoms) => set({ selectedSymptoms: symptoms }),
  predictedDiseases: [],
  setPredictedDiseases: (diseases) => set({ predictedDiseases: diseases })
}));

export default useSelftestStore;
