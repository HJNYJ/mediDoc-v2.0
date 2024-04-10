// 시/분/초 에서 초 제외
export const removeTimeSecond = (time: string) => {
  // 시/분/초 분리
  const timeParts = time.split(":");

  const timeHour = timeParts[0];
  const timeMinute = timeParts[1];

  return timeHour + ":" + timeMinute;
};

// 요일 가져오기
export const getDay = () => {
  const currentDate = new Date();
  const currentDay = currentDate.getDay();
  const daysInWeek = ["일", "월", "화", "수", "목", "금", "토"];

  return daysInWeek[currentDay];
};

// 시간 가져오기
export const getTime = () => {
  const currentDate = new Date();
  const currentHour = currentDate.getHours();
  const currentMinute = currentDate.getMinutes();

  return currentHour + ":" + currentMinute;
};
