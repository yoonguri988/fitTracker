import { useState } from "react";
import { getDayKey, getTime } from "@/lib/utils";
import RecordList from "@/components/RecordList";
import { useRoutineStore } from "@/stores/useRoutineStore";
import { useRecordStore } from "@/stores/useRecordStore";
import Button from "@/components/ui/Button";
import ConfirmOverwriteModal from "@/components/ui/ConfirmOverwriteModal";
/**
 *
 * @description '오늘의 기록'
 * ■ day 요일 : 해당 요일은 월요일을 기준으로 (1 ~ 7)까지의 숫자로 되어있음.
 */

const INIT_RECORD = {
  date: "",
  routines: [],
  fatigue: 0, // 날짜별 피로도 값
};

function RecordPage() {
  const { getFilterRoutines } = useRoutineStore();
  const {
    records,
    toggleCompleted,
    isCompleted,
    saveRecordForToday,
    isAlreadySaved,
  } = useRecordStore();
  const [isModalOpen, setModalOpen] = useState(false);

  const day = ((new Date().getDay() + 6) % 7) + 1;
  const date = new Date().toISOString().split("T")[0];
  // 오늘 요일에 해당하는 루틴 데이터
  const todayRoutines = getFilterRoutines(String(day));
  const totalTime = todayRoutines.reduce((prev, cur) => {
    return (prev += Number(cur.time));
  }, 0);

  // 저장 실행
  const handleSave = (force = false) => {
    saveRecordForToday(date, todayRoutines, force);
  };

  // 저장 버튼 클릭 시 로직 분기
  const handleSaveClick = () => {
    if (isAlreadySaved(date)) {
      setModalOpen(true); // 모달 열기
    } else {
      handleSave(); // 바로 저장
    }
  };

  const handleConfirm = () => {
    setModalOpen(false);
    handleSave(true); // 덮어쓰기 저장
  };

  const handleCancel = () => {
    setModalOpen(false);
  };

  return (
    <div className="min-h-screen">
      <div className="p-6">
        <div className="flex justify-center gap-1">
          <div className="text-sm px-2 py-1">
            {date} ({getDayKey()})
          </div>
          <div className=" bg-btn-main text-white rounded-m px-2 py-1">
            오늘
          </div>
        </div>
        <div className="flex justify-between mb-2">
          <div className="font-semibold">
            오늘 한 운동
            <span className="text-blue-500"> {todayRoutines.length}</span>
          </div>
          <div className="font-semibold">
            총 운동 시간 :
            <span className="text-green-800"> {getTime(totalTime)}</span>
          </div>
        </div>
        <div className=" space-y-4">
          <RecordList
            isChecked={isCompleted}
            onChange={toggleCompleted}
            items={todayRoutines}
          />
          <Button onClick={handleSaveClick}>운동 완료 기록 저장</Button>
          <ConfirmOverwriteModal
            isOpen={isModalOpen}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
          />
        </div>
      </div>
    </div>
  );
}
export default RecordPage;
