function CoinHeader({ title }: { title: string }) {
  return (
    <div className="flex w-full flex-col py-10 xm:px-10">
      <h1 className="mb-2 text-4xl text-white">{title}</h1>
      <span className="header-line"></span>
    </div>
  );
}

export default CoinHeader;
