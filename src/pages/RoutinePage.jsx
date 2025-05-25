import { useEffect, useState } from "react";
import Title from "@/components/ui/Title";
import Button from "@/components/ui/Button";
import RoutineForm from "@/components/RoutineForm";
import RoutineList from "@/components/RoutineList";
import useRoutineStore from "@/stores/useRoutineStore";

/**
 * @description
 * 요일 탭
 * 해당 요일 루틴 목록
 * ⌞루틴 카드 or 텍스트 (삭제 버튼 포함)
 * 루틴 추가 입력창 (운동명 입력 추가 버튼)
 */
const DAYS = ["월", "화", "수", "목", "금", "토", "일"];

function RoutinePage() {
  const [selectedDay, setSelectedDay] = useState("0");
  const { routines, getFilterRoutines, addRoutine, updRoutine, delRoutine } =
    useRoutineStore();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "day") {
      setSelectedDay(value);
    }
  };

  const handleDelete = (id) => {
    delRoutine(id);
  };

  const handleUpdate = (routine) => {
    console.log(routine);
    updRoutine(routine);
  };

  return (
    <div className="min-h-screen">
      <div className="p-6">
        <Title>요일별 운동 루틴</Title>

        <div className="mb-6">
          <div className="mb-4 flex-1 gap-2">
            <RoutineForm days={DAYS} onSubmit={addRoutine} />
          </div>
          <div className="flex space-x-2">
            <Button
              key="all"
              name="day"
              value={String(0)}
              onClick={handleChange}
              className={`basis-1/6 ${
                selectedDay === "0" ? "!bg-btn-main" : ""
              }`}
            >
              전체
            </Button>
            {DAYS.map((day, i) => (
              <Button
                key={day}
                name="day"
                value={String(i + 1)}
                onClick={handleChange}
                className={`basis-1/6 ${
                  String(i + 1) === selectedDay ? "!bg-btn-main" : ""
                }`}
              >
                {day}
              </Button>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <RoutineList
            items={getFilterRoutines(selectedDay)}
            days={DAYS}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        </div>
      </div>
    </div>
  );
}
export default RoutinePage;
