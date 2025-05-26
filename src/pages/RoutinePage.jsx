import { useEffect, useState } from "react";
import Title from "@/components/ui/Title";
import Button from "@/components/ui/Button";
import RoutineForm from "@/components/RoutineForm";
import RoutineList from "@/components/RoutineList";
import { useRoutineStore } from "@/stores/useRoutineStore";
import { useModalStore } from "@/stores/useModalStore";
import { Modal } from "@/components/Modal";

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
  const {
    routines,
    getFilterRoutines,
    addRoutine,
    updRoutine,
    delRoutine,
    initialRoutines,
  } = useRoutineStore();
  const { openModal } = useModalStore();

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
    updRoutine(routine);
  };

  const handleClear = () => {
    initialRoutines(selectedDay);
  };

  return (
    <div className="min-h-screen">
      <div className="p-6">
        <div className="flex justify-center mb-2">
          <Title>요일별 운동 루틴</Title>
          {/* <Button onClick={handleInitial}>초기화</Button> */}
        </div>
        <div className="mb-2">
          <Modal>
            <div className="mb-2">
              <RoutineForm
                days={DAYS}
                onSubmit={addRoutine}
                className="shadow-none"
              />
            </div>
          </Modal>

          <div className="flex justify-between">
            <Button
              key="all"
              name="day"
              value={String(0)}
              onClick={handleChange}
              className={`${selectedDay === "0" ? "!bg-btn-main" : ""}`}
            >
              전체
            </Button>
            {DAYS.map((day, i) => (
              <Button
                key={day}
                name="day"
                value={String(i + 1)}
                onClick={handleChange}
                className={`${
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
            onClear={handleClear}
          />
        </div>
        <div className="fixed right-5 bottom-24 z-50">
          <Button
            name="input-popup"
            onClick={openModal}
            className="bg-btn-sub text-3xl"
          >
            ✍🏻
          </Button>
        </div>
      </div>
    </div>
  );
}
export default RoutinePage;
