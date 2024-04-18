import { create } from "zustand";

type State = {
  name: string;
  setName: (name: string) => void;
  idNumber: string;
  setIdNumber: (idNumber: string) => void;
  phoneNumber: string;
  setPhoneNumber: (phoneNumber: string) => void;
  selectedDate: Date;
  setSelectedDate: (selectedDate: Date) => void;
  selectedTime: string;
  setSelectedTime: (selectedTime: string) => void;
  selectedCourseName: string;
  setSelectedCourseName: (selectedCourseName: string) => void;
  selectedCourseDetail: string;
  setSelectedCourseDetail: (selectedCourseDetail: string) => void;
  userEmailData: string | undefined;
  setUserEmailData: (userEmailData: string | undefined) => void;
  userNameData: string;
  setUserNameData: (userNameData: string) => void;
  isTimeClicked: boolean;
  setIsTimeClicked: (nextToggle: boolean) => void;
  isDateClicked: boolean;
  setIsDateClicked: (nextDateToggle: boolean) => void;
  isCourseClicked: boolean;
  setIsCourseClicked: (isCourseClicked: boolean) => void;
  reservationInfo: object;
  setReservationInfo: (reservationInfo: object) => void;
  hospitalName: string;
  setHospitalName: (hospitalName: string) => void;
};

const useApplyStore = create<State>()((set) => ({
  name: "",
  setName: (name) => set({ name }),
  idNumber: "",
  setIdNumber: (idNumber) => set({ idNumber }),
  phoneNumber: "",
  setPhoneNumber: (phoneNumber) => set({ phoneNumber }),
  selectedDate: new Date(),
  setSelectedDate: (selectedDate) => set({ selectedDate }),
  selectedTime: "",
  setSelectedTime: (selectedTime) => set({ selectedTime }),
  selectedCourseName: "",
  setSelectedCourseName: (selectedCourseName) => set({ selectedCourseName }),
  selectedCourseDetail: "",
  setSelectedCourseDetail: (selectedCourseDetail) =>
    set({ selectedCourseDetail }),
  userEmailData: "",
  setUserEmailData: (userEmailData) => set({ userEmailData }),
  userNameData: "",
  setUserNameData: (userNameData) => set({ userNameData }),
  isTimeClicked: false,
  setIsTimeClicked: (isTimeClicked) => set({ isTimeClicked }),
  isDateClicked: false,
  setIsDateClicked: (isDateClicked) => set({ isDateClicked }),
  isCourseClicked: false,
  setIsCourseClicked: (isCourseClicked) => set({ isCourseClicked }),
  reservationInfo: {},
  setReservationInfo: (reservationInfo) => set({ reservationInfo }),
  hospitalName: "",
  setHospitalName: (hospitalName) => set({ hospitalName })
}));
export default useApplyStore;
