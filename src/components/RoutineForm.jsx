import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { SelectInput } from "@/components/ui/Select";
import { DayTab } from "@/components/ui/DayTab";
import { useModalStore } from "@/stores/useModalStore";
import { RoutineSchema } from "@/schema/RoutineSchema";

const INTI_VALUES = {
  id: "",
  day: "1",
  name: "",
  category: "0",
  time: "", // 기준(분)
  sets: "",
  reps: "",
};

export default function RoutineForm({
  initValues = INTI_VALUES,
  onSubmit,
  onCancel,
  className = "",
}) {
  const { closeModal } = useModalStore();
  const [values, setValues] = useState(initValues);
  const [errors, setErrors] = useState({});
  const [isVaild, setIsVaild] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    closeModal();

    onSubmit({ ...values, day: String(values.day) });
    //초기화
    setValues(INTI_VALUES);
  };

  useEffect(() => {
    const result = RoutineSchema.safeParse(values);
    if (result.success) {
      setIsVaild(true);
      setErrors({});
    } else {
      setIsVaild(false);
      setErrors(result.error.formErrors.fieldErrors);
    }
  }, [values]);

  return (
    <form
      method="post"
      onSubmit={handleSubmit}
      className={`bg-base p-1.5 rounded-sm shadow ${className}`}
    >
      <div>
        <DayTab day={values.day} onClick={handleChange} className="mb-2" />
        <div className="mb-1">
          <div className="flex justify-between mb-2 gap-2">
            <Input
              type="text"
              name="name"
              placeholder="운동 이름 (최대 20자)"
              value={values.name}
              onChange={handleChange}
              label={`운동 이름`}
              className={`w-3/4`}
            />
            <SelectInput
              name="category"
              value={values.category}
              list="CATEGORY"
              onChange={handleChange}
              className={`w-1/4`}
            />
          </div>
          <Input
            type="number"
            name="time"
            placeholder="0"
            value={values.time}
            onChange={handleChange}
            label={`운동 시간`}
            unit="분"
          />
          <div className="mb-1">상세 기록</div>
          <div className="flex justify-between mb-2">
            <Input
              type="number"
              name="sets"
              placeholder="0"
              value={values.sets}
              onChange={handleChange}
              unit={`세트`}
              className={`w-1/2 mr-2`}
            />
            <Input
              type="number"
              name="reps"
              placeholder="0"
              value={values.reps}
              onChange={handleChange}
              unit={`회`}
              className={`w-1/2`}
            />
          </div>
          <div className="m-2">
            * 상세기록을 입력하지 않으면 0으로 자동 입력돼요.
          </div>
          <div className="flex justify-between gap-4">
            {onCancel && (
              <Button
                type="button"
                onClick={onCancel}
                className={`bg-sub-lg hover:bg-sub-dk hover:bg-opacity-30`}
              >
                취소
              </Button>
            )}
            <Button type="submit" disabled={!isVaild} className="w-full">
              추가하기
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
