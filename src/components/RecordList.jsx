import Card from "@/components/ui/Card";
import Checkbox from "@/components/ui/Checkbox";
import { Check } from "lucide-react";

function RecordListItem({ item, isChecked, onChange }) {
  const done = isChecked(item.id);

  return (
    <Card
      className={`flex justify-between items-center gap-2 p-2 rounded-lg transition duration-200 ease-in-out
        ${done ? "bg-sub-lg text-sub-dk opacity-50 line-through" : "bg-white"}
      `}
    >
      <Checkbox
        name="isDone"
        checked={done}
        onChange={() => onChange(item.id)}
      />
      <div className="flex-1">
        <div className="font-semibold mb-1">{item.name}</div>
        <div className="">
          {item.sets > 0 && (
            <div className=" text-input-tx">
              {item.sets}세트 × {item.reps}회
            </div>
          )}
        </div>
      </div>
      <div className="text-right min-w-[60px]">{item.time}분</div>
    </Card>
  );
}

export default function RecordList({ items, isChecked, onChange }) {
  const completedCount = items.filter((item) => isChecked(item.id)).length;
  const totalCount = items.length;
  const percent =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const isAllDone = completedCount === totalCount && totalCount > 0;
  const statusTextColor = isAllDone ? "text-green-700" : "text-main";
  const progressBarColor = isAllDone ? "bg-btn-main" : "bg-btn-sub";

  return (
    <ul className="space-y-3">
      {items.length > 0 && (
        <li>
          <div className="flex justify-center gap-1 mb-1">
            <Check size={12} className="text-green-700" />
            {completedCount} / {totalCount} 완료됨 ({percent}%)
          </div>
          <div className="w-full h-2 bg-sub-lg rounded-full overflow-hidden">
            <div
              className={`h-full ${progressBarColor} transition-all duration-300`}
              style={{ width: `${percent}%` }}
            ></div>
          </div>
        </li>
      )}
      {items.length === 0 && (
        <li>
          <div className="text-sub-light text-center">
            오늘은 예정된 루틴이 존재하지 않습니다.
          </div>
        </li>
      )}
      {items.map((item) => (
        <li key={item.id}>
          <RecordListItem
            item={item}
            isChecked={isChecked}
            onChange={onChange}
          />
        </li>
      ))}
    </ul>
  );
}
