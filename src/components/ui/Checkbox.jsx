export default function Checkbox({ name, checked, onChange }) {
  return (
    <div className="w-5 h-5">
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
      />
      {/* <label htmlFor={name}>완료</label> */}
    </div>
  );
}
