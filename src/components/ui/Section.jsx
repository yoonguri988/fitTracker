function Section({ title, children }) {
  return (
    <section className="mb-6">
      <h2 className="text-lg font-bold mb-2">{title}</h2>
      {children}
    </section>
  );
}
export default Section;
