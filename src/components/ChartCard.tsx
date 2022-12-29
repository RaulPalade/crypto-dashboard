function ChartCard(props: { children: React.ReactNode }) {
  return (
    <div className="grid w-4/6 grid-cols-1 items-center justify-center gap-2 rounded-lg bg-white p-6 text-center shadow-md xs:grid-cols-3">
      {props.children}
    </div>
  );
}

export default ChartCard;
