import useRecordStore from "@/stores/useRecordStore";
import InputCard from "@/components/ui/InputCard";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useState } from "react";
import CompletedRepsModal from "@/components/CompletedRepsModal";
import RoutineItem from "@/components/RoutineItem";
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
  const [selectedId, setSelectedId] = useState("");
  const [completed, setCompleted] = useState(true);
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

  const handleInputReps = (record) => {
    setSelectedId(record.id);
  };

  const handleRecordSave = () => {
    setSelectedId("");
  };

  return (
    <div className="min-h-screen">
      <div className="p-6">
        <div className="text-xl font-bold">{today} | 오늘의 기록</div>
      </div>
      <div className="mb-4 flex-1 gap-2">
        <InputCard onSubmit={handleSubmit}>
          <div className="flex justify-between gap-2">
            <div className="relative w-full max-w-[370px]">
              <Input
                type="text"
                name="name"
                placeholder="운동 이름"
                value={formValues.name}
                onChange={handleChange}
              />
            </div>
            <Button
              type="submit"
              className="text-white w-12 h-12 rounded-full shadow-lg text-lg"
            >
              +
            </Button>
          </div>
          <div className="flex gap-2">
            <div className="relative w-full max-w-[180px]">
              <Input
                type="number"
                name="sets"
                placeholder="0"
                unitName="세트"
                value={formValues.sets}
                onChange={handleChange}
              />
            </div>
            <div className="relative w-full max-w-[180px]">
              <Input
                type="number"
                name="reps"
                placeholder="0"
                unitName="회"
                value={formValues.reps}
                onChange={handleChange}
                className="border px-3 py-1 rounded"
              />
            </div>
          </div>
        </InputCard>
      </div>
      <div className="space-y-4">
        {records.length === 0 ? (
          <p className="text-gray-500 text-center">작성된 기록이 없습니다.</p>
        ) : (
          records.map((r) => (
            <Card key={r.id} className="flex justify-between items-center">
              <div className="basis-1/3 text-base font-semibold">
                {r.name}
                <div>
                  ({r.sets} sets / {r.reps} reps)
                </div>
              </div>
              {r.completedSets && r.completedReps ? (
                <div className="basis-1/3 text-base">
                  <div>{r.completedSets} 세트</div>
                  <div>완료: {r.completedReps.join("회, ")}회</div>
                </div>
              ) : (
                <div className="basis-1/3 text-base"></div>
              )}
              <div className="basis-1/3 text-base">
                {selectedId === r.id && <RoutineItem item={r} />}
              </div>
              <div className="basis-1/3 text-base">
                {selectedId !== r.id && r.sets !== r.completedSets && (
                  <Button
                    onClick={() => handleInputReps(r)}
                    className="bg-green-600 hover:bg-green-800"
                  >
                    기록 추가
                  </Button>
                )}
                {selectedId === r.id && (
                  <Button
                    onClick={() => handleRecordSave()}
                    className="bg-green-800 hover:bg-green-600"
                  >
                    기록 저장
                  </Button>
                )}
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
