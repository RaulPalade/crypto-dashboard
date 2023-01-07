function ChartCard(props: { children: React.ReactNode }) {
  return (
    <div className="chart-container grid w-full grid-cols-1 items-center justify-center gap-2 rounded-lg bg-white p-6 text-center shadow-2xl shadow-lightViolet xs:grid-cols-3">
      {props.children}
    </div>
  );
}

export default ChartCard;
