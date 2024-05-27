function ChartCard(props: { children: React.ReactNode }) {
  return (
    <div className="chart-container items-center justify-center gap-2 rounded-lg bg-white p-6 text-center shadow-2xl shadow-lightViolet">
      {props.children}
    </div>
  );
}

export default ChartCard;
