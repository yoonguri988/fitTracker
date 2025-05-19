import { useState } from "react";
import useRoutineStore from "../stores/useRoutineStore";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import InputCard from "../components/ui/InputCard";

/**
 * @description
 * 요일 탭
 * 해당 요일 루틴 목록
 * ⌞루틴 카드 or 텍스트 (삭제 버튼 포함)
 * 루틴 추가 입력창 (운동명 입력 추가 버튼)
 */
const DAYS = ["월", "화", "수", "목", "금", "토", "일"];
const DEF_VALUES = {
  id: "",
  day: "",
  name: "",
  time: "", // 기준(분)
  sets: "",
  reps: "",
};

function RoutinePage() {
  const { routines, creRoutine, updRoutine, delRoutine } = useRoutineStore();
  const [values, setValues] = useState(DEF_VALUES);

  const handleCreClick = () => {
    const { day, name, time, sets, reps } = values;
    // day, name, time 은 필수
    if (!day || !name.trim() || !time) return;

    const newValues = {
      day: day,
      name: name.trim(),
      time: parseInt(time),
      sets: parseInt(sets),
      reps: parseInt(reps),
    };

    creRoutine(newValues);

    // 초기화
    setValues(DEF_VALUES);
  };
  const handleUpdClick = () => {};
  const handleDelClick = (id) => () => delRoutine(id);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setValues((prev) => ({ ...prev, [name]: value }));
    console.log(values.day);
  };

  return (
    <div className="min-h-screen">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">요일별 운동 루틴</h2>

        <div className="flex space-x-2 mb-6">
          {DAYS.map((day) => (
            <Button
              key={day}
              name="day"
              value={day}
              onClick={handleChange}
              className={`text-base basis-1/6 px-3 py-1 rounded ${
                values.day === day ? "bg-green-800" : ""
              }`}
            >
              {day}
            </Button>
          ))}
        </div>
        <div className="mb-4 flex-1 gap-2">
          <InputCard>
            <div className="flex justify-between gap-2">
              <div className="relative w-full max-w-[370px]">
                <Input
                  type="text"
                  name="name"
                  placeholder="운동 이름"
                  onChange={handleChange}
                  className="border px-5 py-1"
                />
              </div>
              <Button
                onClick={handleCreClick}
                className="text-white w-12 h-12 rounded-full shadow-lg text-lg"
              >
                +
              </Button>
            </div>
            <div className="flex gap-2">
              <div className="relative w-full max-w-[150px]">
                <Input
                  type="number"
                  name="time"
                  placeholder="0"
                  onChange={handleChange}
                  className="border px-3 py-1 rounded w-full pr-10"
                />
                <span className="absolute right-5 top-1/2 transform -translate-y-5 text-base text-gray-400">
                  분
                </span>
              </div>
              <div className="relative w-full max-w-[100px]">
                <Input
                  type="number"
                  name="sets"
                  placeholder="0"
                  onChange={handleChange}
                  className="border px-3 py-1 rounded"
                />
                <span className="absolute right-5 top-1/2 transform -translate-y-5 text-base text-gray-400">
                  세트
                </span>
              </div>
              <div className="relative w-full max-w-[100px]">
                <Input
                  type="number"
                  name="reps"
                  placeholder="0"
                  onChange={handleChange}
                  className="border px-3 py-1 rounded"
                />
                <span className="absolute right-5 top-1/2 -translate-y-5 text-base text-gray-400">
                  회
                </span>
              </div>
            </div>
          </InputCard>
        </div>

        <div className="space-y-4">
          {routines.length === 0 ? (
            <p className="text-gray-500 text-center">작성된 루틴이 없습니다.</p>
          ) : (
            routines.map((r) => (
              <Card key={r.id} className="flex justify-between items-center">
                {/* <span>{r.day}</span> */}
                <div className="basis-4/6 text-base font-semibold">
                  {r.name}
                </div>
                <div className="basis-2/6 text-base">
                  <div>{r.time}분</div>
                  <div>
                    {r.sets}세트 x {r.reps}회
                  </div>
                </div>
                <button
                  onClick={handleDelClick(r.id)}
                  className=" text-gray-200 hover:text-gray-500 px-2 py-1 text-2xl text-bold"
                >
                  X
                </button>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
export default RoutinePage;
