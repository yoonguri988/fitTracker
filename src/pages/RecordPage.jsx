import { useState } from "react";
import Title from "@/components/ui/Title";
import { getDayKey } from "@/lib/utils";
import { useRoutineStore } from "@/stores/useRoutineStore";
import RoutineList from "@/components/RoutineList";
import Card from "@/components/ui/Card";
/**
 * @description '오늘의 기록'
 */

const INIT_RECORD = {
  date: "",
  routines: [],
  fatigue: 0, // 날짜별 피로도 값
};

const INIT_COMPLETE_ROUTINE = {
  routineId: "",
  sets: 0, // 정수이면서 양수
  reps: 0,
  isDone: false,
};

/**
 *
 * @description day 요일
 * 해당 요일은 월요일을 기준으로 (1 ~ 7)까지의 숫자로 되어있음.
 */

function RecordPage() {
  const { routines, getFilterRoutines } = useRoutineStore();
  const [values, setValues] = useState(INIT_RECORD);
  const day = ((new Date().getDay() + 6) % 7) + 1;
  const date = new Date().toISOString().split("T")[0];

  // 오늘 요일에 해당하는 루틴 데이터
  const todayRoutine = getFilterRoutines(String(day));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 초기화
    setValues(INIT_RECORD);
  };

  return (
    <div className="min-h-screen">
      <div className="p-6">
        <div className="flex justify-center mb-2">
          <Title>
            오늘의 운동 | {date} ({getDayKey()})
          </Title>
        </div>
      </div>
      <div className="mb-2">
        <RoutineList items={todayRoutine} />
      </div>
      <div className="space-y-4">
        <Card>
          
        </Card>
      </div>
    </div>
  );
}
export default RecordPage;
