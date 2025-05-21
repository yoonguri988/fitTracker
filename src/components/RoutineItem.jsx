import { useState } from "react";
import useRecordStore from "@/stores/useRecordStore";
import CompletedRepsModal from "./CompletedRepsModal";

export default function RoutineItem({ id, name, completedReps }) {
  const [isModelOpen, setIsModelOpen] = useState(false);
  const updateReps = useRecordStore((state) => state.updateReps);

  const handleSaveReps = (reps) => {
    updateReps(id, reps);
  };
  return (
    <>
      <div
        onClick={() => setIsModelOpen(true)}
        className="p-4 border rounded-xl shadow cursor-pointer hover:bg-lime-50"
      >
        <p className="text-base font-medium">{name}</p>
        {completedReps !== undefined && (
          <p className="text-sm text-gray-500">완료: {completedReps}회</p>
        )}
      </div>
      <CompletedRepsModal
        open={isModelOpen}
        onClose={() => setIsModelOpen(false)}
        onSave={handleSaveReps}
      />
    </>
  );
}
