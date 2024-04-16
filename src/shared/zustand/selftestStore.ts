import { create } from "zustand";

interface State {
  selectedGender: "male" | "female";
  setSelectedGender: (gender: "male" | "female") => void;
  selectedDepartment: "이비인후과" | "내과" | "외과" | "치과" | "안과";
  setSelectedDepartment: (
    department: "이비인후과" | "내과" | "외과" | "치과" | "안과"
  ) => void;
  selectedPart: string;
  setSelectedPart: (selectedPart: string) => void;
  symptoms: string[];
  setSymptoms: (symptoms: string[]) => void;
  selectedSymptoms: string[];
  setSelectedSymptoms: (selectedSymptoms: string[]) => void;
  predictedDiseases: string[];
  setPredictedDiseases: (disease: string[]) => void;
}

const useSelftestStore = create<State>()((set) => ({
  selectedGender: "male",
  setSelectedGender: (gender) => set({ selectedGender: gender }),
  selectedDepartment: "이비인후과",
  setSelectedDepartment: (department) =>
    set({ selectedDepartment: department }),
  selectedPart: "",
  setSelectedPart: (selectedPart) => set({ selectedPart }),
  symptoms: [],
  setSymptoms: (symptoms) => set({ symptoms }),
  selectedSymptoms: [],
  setSelectedSymptoms: (symptoms) => set({ selectedSymptoms: symptoms }),
  predictedDiseases: [],
  setPredictedDiseases: (diseases) => set({ predictedDiseases: diseases })
}));

export default useSelftestStore;
