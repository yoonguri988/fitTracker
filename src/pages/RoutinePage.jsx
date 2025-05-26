import { useEffect, useState } from "react";
import Title from "@/components/ui/Title";
import Button from "@/components/ui/Button";
import { DayTab } from "@/components/ui/DayTab";
import RoutineForm from "@/components/RoutineForm";
import { RoutineFormModal } from "@/components/RoutineFormModal";
import RoutineList from "@/components/RoutineList";
import { useRoutineStore } from "@/stores/useRoutineStore";
import { useModalStore } from "@/stores/useModalStore";
import ConfirmOverwriteModal from "@/components/ui/ConfirmOverwriteModal";

/**
 * @description
 * 요일 탭
 * 해당 요일 루틴 목록
 * ⌞루틴 카드 or 텍스트 (삭제 버튼 포함)
 * 루틴 추가 입력창 (운동명 입력 추가 버튼)
 */
function RoutinePage() {
  const [selectedDay, setSelectedDay] = useState("0");
  const {
    routines,
    getFilterRoutines = () => [],
    addRoutine,
    updateRoutine,
    deleteRoutine,
    resetRoutines,
    generateAutoRoutine,
  } = useRoutineStore();
  const { openModal } = useModalStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const filteredRoutines = getFilterRoutines?.(selectedDay) ?? [];

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "day") {
      setSelectedDay(value);
    }
  };

  const handleDelete = (id) => {
    deleteRoutine(id);
  };

  const handleUpdate = (routine) => {
    updateRoutine(routine);
  };

  const handleReset = () => {
    resetRoutines(selectedDay);
  };

  const handleAutoRoutine = () => {
    if (routines.length > 0) {
      setIsModalOpen(true); // 모달 열기
    } else {
      generateAutoRoutine(); // 바로 생성
    }
  };

  const handleConfirm = () => {
    resetRoutines("0"); // 전체 루틴 삭제
    generateAutoRoutine(); // 다시 생성
    setIsModalOpen(false); // 모달 닫기
  };

  const handleCancel = () => {
    setIsModalOpen(false); // 모달 닫기
  };

  return (
    <div className="min-h-screen">
      <div className="p-6">
        <div className="flex justify-center mb-2">
          <Title>요일별 운동 루틴</Title>
        </div>
        <div className="mb-2">
          <Button
            className="bg-btn-main py-2 px-4 rounded-xl hover:opacity-90 transition"
            onClick={handleAutoRoutine}
          >
            주간 루틴 자동 생성
          </Button>
          <ConfirmOverwriteModal
            isOpen={isModalOpen}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
          />
        </div>
        <div className="mb-2">
          <RoutineFormModal>
            <div className="mb-2">
              <RoutineForm onSubmit={addRoutine} className="shadow-none" />
            </div>
          </RoutineFormModal>
          <DayTab day={selectedDay} all={true} onClick={handleChange} />
        </div>
        <div className="space-y-4">
          <RoutineList
            items={filteredRoutines}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
            onReset={handleReset}
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
