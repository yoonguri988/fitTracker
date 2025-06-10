import { useState } from "react";
import { Card } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import RoutineForm from "@/components/RoutineForm";
import { DayTabByDay } from "@/components/ui/DayTab";
import { Select } from "@/components/ui/Select";

function RoutineListItem({ value, onDelete, onUpdate }) {
  const handleDelete = () => onDelete(value.id);
  const handleUpdate = () => onUpdate(value.id);

  return (
    <Card className="flex justify-between items-center gap-2">
      <DayTabByDay day={value.day} />
      <div className="basis-5/12">
        <div>{value.name}</div>
        <Select name="category" value={value.category} list="CATEGORY" />
      </div>
      <div className="basis-4/12">
        <div>{value.time}분</div>
        <div>
          {value.sets !== 0 && (
            <>
              {value.sets}세트 x {value.reps}회
            </>
          )}
        </div>
      </div>
      <div className="basis-2/12">
        <Button onClick={handleUpdate}>수정</Button>
      </div>
      <div className="">
        <button
          onClick={handleDelete}
          className="text-btn-del hover:text-sub text-sm"
        >
          ✕
        </button>
      </div>
    </Card>
  );
}

export default function RoutineList({ items, onUpdate, onDelete, onReset }) {
  const [editId, setEditId] = useState(null);
  const handleCancel = () => setEditId(null);

  return (
    <ul>
      {items.length === 0 && (
        <li>
          <div className="text-sub-light text-center">
            운동 루틴 정보가 존재하지 않습니다.
          </div>
        </li>
      )}
      {items.map((item) => {
        if (item.id === editId) {
          const { id, day, name, sets, reps, createdAt } = item;
          const handleSubmit = (routine) => {
            onUpdate(routine);
            setEditId(null);
          };
          return (
            <li key={item.id}>
              <RoutineForm
                initValues={item}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                className="rounded-xl p-4 shadow-md"
              />
            </li>
          );
        }
        return (
          <li key={item.id} className="my-2">
            <RoutineListItem
              value={item}
              onDelete={onDelete}
              onUpdate={setEditId}
            />
          </li>
        );
      })}
      {onReset && items.length !== 0 && (
        <li className="text-center mt-5">
          <Button onClick={onReset} className="w-20">
            초기화
          </Button>
        </li>
      )}
    </ul>
  );
}
