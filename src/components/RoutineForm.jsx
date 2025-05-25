import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import useRoutineStore from "@/stores/useRoutineStore";

const INTI_VALUES = {
  id: "",
  day: "1",
  name: "",
  time: "", // 기준(분)
  sets: "",
  reps: "",
};

export default function RoutineForm({
  initValues = INTI_VALUES,
  days,
  onSubmit,
  onCancel,
  className = "",
}) {
  const { routines } = useRoutineStore();
  const [values, setValues] = useState(initValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    onSubmit({ ...values, day: String(values.day) });
    //초기화
    setValues(INTI_VALUES);
  };

  return (
    <form
      method="post"
      onSubmit={handleSubmit}
      className={`bg-base-point p-4 rounded-xl shadow`}
    >
      <div className="flex justify-between gap-2">
        <div className="relative basis-1/12">
          <Select
            name="day"
            value={String(values.day)}
            list={days}
            onChange={handleChange}
            disabled={false}
          />
        </div>
        <div className="relative basis-1/2">
          <Input
            type="text"
            name="name"
            placeholder="운동 이름"
            value={values.name}
            onChange={handleChange}
          />
        </div>
        <div className="relative basis-1/2">
          <div className="flex justify-start">
            <Input
              type="number"
              name="time"
              placeholder="0"
              unit="분"
              value={values.time}
              onChange={handleChange}
              className={`mb-2 w-3/4`}
            />
            <span className="text-sub mt-1 ml-1">분</span>
          </div>
          <div className="flex justify-start">
            <Input
              type="number"
              name="sets"
              placeholder="0"
              value={values.sets}
              onChange={handleChange}
              className={`w-1/4`}
            />
            <span className="text-sub mt-1 ml-1">세트</span>
            <div className="text-sub mt-1 mx-1">X</div>
            <Input
              type="number"
              name="reps"
              placeholder="0"
              value={values.reps}
              onChange={handleChange}
              className={`w-1/4`}
            />
            <span className="text-sub mt-1 ml-1">회</span>
          </div>
        </div>
        <div className="relative basis-1/6">
          <Button type="submit">확인</Button>
          {onCancel && (
            <Button
              type="button"
              onClick={onCancel}
              className="bg-sub-light mt-1"
            >
              취소
            </Button>
          )}
        </div>
      </div>
    </form>
  );
}
