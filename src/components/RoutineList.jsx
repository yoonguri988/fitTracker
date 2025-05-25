import { useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import RoutineForm from "@/components/RoutineForm";
import useRoutineStore from "@/stores/useRoutineStore";

function RoutineListItem({ value, days, onDelete, onUpdate }) {
  const handleDelete = () => onDelete(value.id);
  const handleUpdate = () => onUpdate(value.id);

  const handleChange = (e) => {
    const { name, value } = e.target;
  };

  return (
    <Card className="flex justify-between items-center">
      <div className="basis-1/6 text-main">
        <Select
          name="day"
          value={value.day}
          list={days}
          onChange={handleChange}
          disabled="disabled"
        />
      </div>
      <div className="basis-1/2 text-main ">{value.name}</div>
      <div className="basis-2/6 text-main">
        <div>{value.time}분</div>
        <div>
          {value.sets}세트 x {value.reps}회
        </div>
      </div>

      <div className="basis-1/6 text-main">
        <Button onClick={handleUpdate} className="text-sub rounded-full">
          수정
        </Button>
      </div>
      <button
        onClick={handleDelete}
        className="text-btn-del hover:text-sub px-2 py-1 text-2xl text-bold"
      >
        X
      </button>
    </Card>
  );
}

export default function RoutineList({ items, days, onUpdate, onDelete }) {
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
          <li key={item.id} className="my-3">
            <RoutineListItem
              value={item}
              days={days}
              onDelete={onDelete}
              onUpdate={setEditId}
            />
          </li>
        );
      })}
    </ul>
  );
}
