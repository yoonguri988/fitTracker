import Button from "@/components/ui/Button";

const DAYS = ["월", "화", "수", "목", "금", "토", "일"];

export const DayTab = ({ day, all = false, onClick, className }) => {
  return (
    <div className={`flex justify-between ${className}`}>
      {all && (
        <Button
          key="all"
          name="day"
          value={String(0)}
          onClick={onClick}
          className={`${day === "0" ? "!bg-btn-main" : ""}`}
        >
          전체
        </Button>
      )}
      {DAYS.map((d, i) => (
        <Button
          key={d}
          name="day"
          value={String(i + 1)}
          onClick={onClick}
          className={`${String(i + 1) === day ? "!bg-btn-main" : ""}`}
        >
          {d}
        </Button>
      ))}
    </div>
  );
};

export const DayTabByDay = ({ day }) => {
  return (
    <div>
      <Button
        name="day"
        value={day}
        className={`!bg-btn-main !text-sub`}
        disabled={true}
      >
        {DAYS[day - 1]}
      </Button>
    </div>
  );
};
