import { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
function CompletedRepsModal({ initReps, open, onClose, onSave }) {
  const [reps, setReps] = useState(initReps);
  const handleSave = () => {
    const parse = parseInt(reps);
    if (!isNaN(parse)) {
      onSave(parse);
      setReps("");
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="font-['Noto Sans']">
        <DialogHeader>
          <DialogTitle className="text-lime-600 dark:text-lime-400 text-lg">
            완료한 반복 수 입력
          </DialogTitle>
        </DialogHeader>
        <Input
          type="number"
          placeholder={`${initReps}`}
          value={reps}
          onChange={(e) => setReps(e.target.value)}
        />
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            취소
          </Button>
          <Button
            className="bg-lime-600 text-white hover:bg-lime-700"
            onClick={handleSave}
          >
            저장
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
export default CompletedRepsModal;
