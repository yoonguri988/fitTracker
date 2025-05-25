export default function Select({
  name,
  value,
  list,
  onChange,
  disabled = true,
}) {
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`!bg-btn-main !text-sub px-3 py-2 rounded-xl appearance-none`}
    >
      {list.map((r, i) => (
        <option key={r} value={String(i + 1)}>
          {r}
        </option>
      ))}
    </select>
  );
}
