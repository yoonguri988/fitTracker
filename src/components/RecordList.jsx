import Card from "@/components/ui/Card";
import Checkbox from "@/components/ui/Checkbox";

function RecordListItem({ item, isChecked, onChange }) {
  const date = new Date().toISOString().split("T")[0];
  const isDone = isChecked(item.id);

  return (
    <Card
      className={`flex justify-between items-center gap-2 ${
        isDone ? "opacity-50" : ""
      }`}
    >
      <div className="basis-2/3">
        <div className="font-semibold mb-1">{item.name}</div>
        <div className="text-input-tx">
          {item.sets !== 0 && (
            <>
              {item.sets}세트 x {item.reps}회
            </>
          )}
        </div>
      </div>
      <div>{item.time}분</div>
      <Checkbox
        name="isDone"
        checked={isDone}
        onChange={() => onChange(item.id)}
      />
    </Card>
  );
}

export default function RecordList({ items, isChecked, onChange }) {
  return (
    <ul>
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
