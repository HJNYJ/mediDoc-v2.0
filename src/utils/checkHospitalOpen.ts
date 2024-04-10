export const checkHospitalOpen = (
  currentTime: string,
  startTime: string,
  endTime: string
) => {
  if (currentTime < startTime) {
    return `진료 전 - ${startTime}에 진료 시작`;
  } else if (currentTime > endTime) {
    return `진료 종료 - ${startTime}에 진료 시작`;
  } else {
    return `진료 중 - ${endTime}에 진료 종료`;
  }
};
