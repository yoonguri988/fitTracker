import { Check } from "lucide-react";

export default function Checkbox({ name, checked, onChange }) {
  return (
    <div className="flex items-center gap-2 cursor-pointer">
      <label>
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
          className="peer hidden"
          id="toggle-icon"
        />
        <div className="peer-checked:hidden">
          <Check size={12} className="text-gray-500" />
        </div>
        <div className="hidden peer-checked:inline">
          <Check size={12} className=" text-green-700" />
        </div>
      </label>
      {/* <label htmlFor={name}>완료</label> */}
    </div>
  );
}
