import { useRecordStore } from "@/stores/useRecordStore";

export default function CompletedStatus({ totalCount }) {
  const completed = useRecordStore((s) => s.completedRoutines.length);

  return (
    <p className="text-sm text-gray-600 text-right mb-3">
      완료: {completed} / {totalCount}
    </p>
  );
}
