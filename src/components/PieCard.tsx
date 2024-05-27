function PieCard(props: { children: React.ReactNode }) {
  return (
    <div className="w-full rounded-lg bg-white p-6 text-center shadow-2xl shadow-lightViolet">
      {props.children}
    </div>
  );
}

export default PieCard;
