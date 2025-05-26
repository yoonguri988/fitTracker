import { useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import RoutineForm from "@/components/RoutineForm";

function RoutineListItem({ value, days, onDelete, onUpdate }) {
  const handleDelete = () => onDelete(value.id);
  const handleUpdate = () => onUpdate(value.id);

  const handleChange = (e) => {
    const { name, value } = e.target;
  };

  return (
    <Card className="flex justify-between items-center gap-2">
      <div className="">
        <Button
          name="day"
          value={value.day}
          onClick={handleChange}
          className={`!bg-btn-main !text-sub`}
          disabled={true}
        >
          {days[value.day - 1]}
        </Button>
      </div>
      <div className="basis-5/12">{value.name}</div>
      <div className="basis-3/12">
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

export default function RoutineList({
  items,
  days,
  onUpdate,
  onDelete,
  onClear,
}) {
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
                days={days}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
              />
            </li>
          );
        }
        return (
          <li key={item.id} className="my-2">
            <RoutineListItem
              value={item}
              days={days}
              onDelete={onDelete}
              onUpdate={setEditId}
            />
          </li>
        );
      })}
      {items.length !== 0 && (
        <li className="text-center mt-5">
          <Button onClick={onClear} className="w-20">
            초기화
          </Button>
        </li>
      )}
    </ul>
  );
}
