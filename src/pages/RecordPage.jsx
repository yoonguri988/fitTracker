import useRecordStore from "@/stores/useRecordStore";
import InputCard from "@/components/ui/InputCard";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useState } from "react";
/**
 * @description '오늘의 기록'
 */

const INIT_RECORD = {
  name: "",
  sets: 0,
  reps: 0,
  completedSets: 0,
  completedReps: [],
};

function RecordPage() {
  const {
    records,
    setRecord,
    updReps,
    resetRecords,
    addRecord,
    delRecord,
    getRecordById,
  } = useRecordStore();
  const [formValues, setformValues] = useState(INIT_RECORD);
  const today = new Date().toISOString().split("T")[0];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // URL에 정보 안 보이게 막기

    // 문자열 숫자 -> 숫자형 변환
    const recordInput = {
      name: formValues.name,
      sets: Number(formValues.sets),
      reps: Number(formValues.reps),
    };

    addRecord(recordInput);
    // 초기화
    setformValues(INIT_RECORD);
  };
  const handleDelClick = (id) => {
    delRecord(id);
  };

  return (
    <div className="min-h-screen">
      <div className="p-4">
        <div className="text-xl font-bold">{today} | 오늘의 기록</div>
        <InputCard onSubmit={handleSubmit}>
          <Input
            type="text"
            name="name"
            placeholder="운동 이름"
            value={formValues.name}
            onChange={handleChange}
          />
          <Input
            type="number"
            name="sets"
            placeholder="세트 수"
            value={formValues.sets}
            onChange={handleChange}
          />
          <Input
            type="number"
            name="reps"
            placeholder="기본 횟수"
            value={formValues.reps}
            onChange={handleChange}
          />
          <Button
            type="submit"
            className="text-white w-12 h-12 rounded-full shadow-lg text-lg"
          >
            +
          </Button>
        </InputCard>
      </div>

      <div className="space-y-4">
        {records.length === 0 ? (
          <p className="text-gray-500 text-center">작성된 기록이 없습니다.</p>
        ) : (
          records.map((r) => (
            <Card key={r.id} className="flex justify-between items-center">
              <div className="basis-1/3 text-base font-semibold">{r.name}</div>
              <div className="basis-1/3 text-base">
                <div>{r.completedSets} sets</div>
                <div>{r.completedReps} reps</div>
              </div>
              <button
                onClick={() => handleDelClick(r.id)}
                className=" text-gray-200 hover:text-gray-500 px-2 py-1 text-2xl text-bold"
              >
                X
              </button>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
export default RecordPage;
