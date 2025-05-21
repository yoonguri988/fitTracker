import { useState } from "react";
import useRecordStore from "@/stores/useRecordStore";
import CompletedRepsModal from "@/components/CompletedRepsModal";

export default function RoutineItem({ item }) {
  const { id, sets, reps, completedSets, completedReps } = item;
  const [isModelOpen, setIsModelOpen] = useState(false);
  const { updReps } = useRecordStore();

  const handleSaveReps = (reps) => {
    updReps(id, reps);
  };
  return (
    <>
      <div
        onClick={() => setIsModelOpen(true)}
        className="p-4 border rounded-xl shadow cursor-pointer hover:bg-lime-50"
      >
        <div className="text-base font-medium">{completedSets} 세트</div>
        {completedReps !== undefined && (
          <div className="text-sm text-gray-500">
            완료: {completedReps.join("회, ")}회
          </div>
        )}
      </div>
      <CompletedRepsModal
        initReps={reps}
        open={isModelOpen}
        onClose={() => setIsModelOpen(false)}
        onSave={handleSaveReps}
      />
    </>
  );
}
