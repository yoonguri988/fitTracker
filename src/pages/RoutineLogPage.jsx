import CalendarPicker from "@/components/CalendarPicker";
import { useState } from "react";

function RoutineLogPage() {
  // 초기값: 오늘 날짜(YYYY-MM-DD)
  const [selectedDate, setSelectDate] = useState(() => {
    return new Date().toISOString().split("T")[0];
  });
  const routines = getRoutinesByDate(selectedDate);

  const handleChange = (dateObj) => {
    return setSelectDate(dateObj.toISOString().split("T")[0]);
  };

  return <CalendarPicker value={selectedDate} onChange={handleChange} />;
}

export default RoutineLogPage;
