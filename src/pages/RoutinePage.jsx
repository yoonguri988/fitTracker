import { useState } from "react";
import useRoutineStore from "../stores/useRoutineStore";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

function RoutinePage() {
  const { routines, addRoutine, removeRoutine } = useRoutineStore();
  const [text, setText] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddClick(); // 엔터 입력 시 버튼과 같은 동작
    }
  };

  const handleAddClick = () => {
    let routine = {
      name: text,
    };
    if (text.trim()) {
      addRoutine(routine);
      // addRoutine({ id: Date.now(), name: text });
      setText("");
    }
  };

  const handleDelClick = (id) => () => removeRoutine(id);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4"> 운동 루틴 관리</h1>
      <Input
        placeholder="예: 스쿼트 3세트"
        type="text"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <Button onClick={handleAddClick} className="mt-2">
        추가
      </Button>

      <div className="mt-6 space-y-2">
        {routines.length === 0 ? (
          <p className="text-gray-500 text-center">작성된 루틴이 없습니다.</p>
        ) : (
          routines.map((r) => (
            <Card key={r.id} className="flex justify-between items-center">
              <span>{r.name}</span>
              <Button
                onClick={handleDelClick(r.id)}
                className="bg-red-500 hover:bg-red-600 px-2 py-1 text-sm"
              >
                삭제
              </Button>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
export default RoutinePage;
