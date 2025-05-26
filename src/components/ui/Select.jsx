export default function Select({
  name,
  value,
  list,
  onChange,
  disabled = true,
  className = "",
}) {
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`bg-btn-main text-sub appearance-none ${className}`}
    >
      {list.map((r, i) => (
        <option key={r} value={String(i + 1)}>
          {r}
        </option>
      ))}
    </select>
  );
}
