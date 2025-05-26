const DATA = {
  CATEGORY: [
    "가슴",
    "등",
    "하체",
    "코어",
    "스포츠",
    "어깨",
    "팔",
    "유산소",
    "기타",
  ],
};

export function Select({ name, value, list = "", className = "" }) {
  return (
    <select
      name={name}
      value={value}
      disabled
      className={`appearance-none ${className}`}
    >
      {DATA[list].map((r, i) => (
        <option key={r} value={i}>
          {r}
        </option>
      ))}
    </select>
  );
}

export function SelectInput({
  label = "",
  name,
  value,
  list = "",
  onChange,
  className = "",
}) {
  return (
    <div className={`${className || "mb-1"}`}>
      <label className="block mb-1">{label === "" ? <br /> : label}</label>
      <div className="w-full px-2 py-2 rounded-md flex justify-between bg-input-bg">
        <select
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full bg-input-bg h-4 focus:outline-none`}
        >
          {DATA[list].map((c, i) => (
            <option key={c} value={i}>
              {c}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
