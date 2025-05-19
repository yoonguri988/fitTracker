import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format } from "date-fns";

// value: 선택된 날짜
// onChange: 날짜 click시 호출되는 함수
function CalendarPicker({ value, onChange }) {
  return (
    <div className="mb-4">
      <Calendar
        onChange={onChange}
        value={new Date(value)}
        locale="ko-KR"
        tileClassName={({ date, value }) =>
          format(date, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd")
            ? "bg-green-100 rounded-lg"
            : ""
        }
      />
    </div>
  );
}

export default CalendarPicker;
