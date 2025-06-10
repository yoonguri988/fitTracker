import { useId } from "react";
import { Check } from "lucide-react";

export default function Checkbox({ name, checked, onChange }) {
  const id = useId();
  return (
    <div className="flex items-center gap-2 cursor-pointer">
      <label htmlFor={id}>
        <input
          id={id}
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
          className="peer sr-only"
        />
        <Check size={12} className="peer-checked:hidden text-gray-500" />
        <Check
          size={12}
          className="hidden peer-checked:inline text-green-700"
        />
        <span className="sr-only">완료</span>
      </label>
    </div>
  );
}
