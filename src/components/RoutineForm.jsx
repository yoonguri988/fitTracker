import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useModalStore } from "@/stores/useModalStore";
import { RoutineSchema } from "@/schema/RoutineSchema";

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
      className={`bg-base-point p-1.5 rounded-sm shadow ${className}`}
    >
      <div>
        <div className="flex justify-between mb-2">
          {days.map((day, i) => (
            <Button
              key={day}
              name="day"
              value={String(i + 1)}
              onClick={handleChange}
              className={`${
                String(i + 1) === values.day ? "!bg-btn-main" : ""
              }`}
            >
              {day}
            </Button>
          ))}
        </div>
        <div className="mb-1">
          <Input
            type="text"
            name="name"
            placeholder="운동 이름 (최대 20자)"
            value={values.name}
            onChange={handleChange}
            label={`운동 이름`}
          />
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
          <div>
            <Button type="submit" disabled={!isVaild} className="w-full">
              추가하기
            </Button>
            {onCancel && (
              <Button
                type="button"
                onClick={onCancel}
                className={`bg-sub-lg mt-1 hover:bg-sub-dk hover:bg-opacity-30`}
              >
                취소
              </Button>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
