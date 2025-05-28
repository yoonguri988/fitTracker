export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const getDayKey = () => {
  // getDay()는 일(0) ~ 토(6) 으로 구성
  const DAYS = ["월", "화", "수", "목", "금", "토", "일"];
  const monFirstDay = (new Date().getDay() + 6) % 7; // 월요일(0) 기준
  return DAYS[monFirstDay];
};

export const getTime = (time) => {
  const hour = Math.round(time / 60);
  const min = Math.round(time % 60);
  return hour > 0 ? `${hour}시간 ${min}분` : `${min}분`;
};
