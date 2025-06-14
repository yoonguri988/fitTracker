import { useEffect, useState } from "react";
import { getDayKey, getTime } from "@/lib/utils";
import RecordList from "@/components/RecordList";
import { useRoutineStore } from "@/stores/useRoutineStore";
import { useRecordStore } from "@/stores/useRecordStore";
import Button from "@/components/ui/Button";
import ConfirmOverwriteModal from "@/components/ui/ConfirmOverwriteModal";
import RecordForm from "@/components/RecordForm";
import DailySummaryCard from "@/components/ui/DailySummaryCard";

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

  const day = ((new Date().getDay() + 6) % 7) + 1;
  const date = new Date().toISOString().split("T")[0];

  const [isModalOpen, setModalOpen] = useState(false);
  // 폼에서 제출된 데이터를 임시 보관
  const [pendingData, setPendingData] = useState(null);

  // 오늘 요일에 해당하는 루틴 데이터
  const todayRoutines = getFilterRoutines(String(day));
  const totalTime = todayRoutines.reduce((prev, cur) => {
    return (prev += Number(cur.time));
  }, 0);

  // 저장 실행
  const handleSave = (force = false) => {
    const { memo } = pendingData;
    saveRecordForToday(date, todayRoutines, memo, force);
  };

  // 저장 버튼 클릭 시 로직 분기
  const handleSaveClick = (formData) => {
    setPendingData(formData);
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
      <div className="px-6 py-4">
        {/** 날짜 및 타이틀 */}
        <div className="flex justify-center gap-1 sticky top-0 z-40 p-2 bg-white">
          <div className="text-sm px-2 py-1">
            {date} ({getDayKey()})
          </div>
          <div className=" bg-btn-main text-white rounded-xl px-1 pt-1.5">
            오늘
          </div>
        </div>
        {/** 루틴 요약 */}
        <div className="flex justify-between mb-2">
          <div className="font-semibold">
            오늘 운동 루틴
            <span className="text-blue-500"> {todayRoutines.length}</span>
          </div>
          <div className="font-semibold">
            총 운동 시간 :
            <span className="text-green-800"> {getTime(totalTime)}</span>
          </div>
        </div>
        <div className="mb-4">
          {/** 루틴 리스트 */}
          <RecordList
            isChecked={isCompleted}
            onChange={toggleCompleted}
            items={todayRoutines}
          />
          {/* 운동 완료 기록 입력 */}
          <RecordForm defaultValues={""} onSubmit={handleSaveClick} />
        </div>
        <ConfirmOverwriteModal
          isOpen={isModalOpen}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
        <div className="mb-2">
          <div className="font-semibold mb-2">운동 완료 기록 요약</div>
          {/* 날짜별 운동 완료 기록 요약 */}
          <DailySummaryCard date={date} data={records[date]} />
        </div>
      </div>
    </div>
  );
}
export default RecordPage;
