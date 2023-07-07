export interface ExchangeInfo {
  logo: any;
  name: string;
  price: number;
  volume: number;
  exchangeGrade: string;
}

function ArbitrageCard({ exchangeInfo }: { exchangeInfo: ExchangeInfo }) {
  return (
    <div className="exterior-card flex flex-col justify-between bg-slate-400">
      <div id="echange-logo" className="flex justify-end p-6 pb-16">
        <img src={exchangeInfo.logo} alt="exhange logo" width={140} />
      </div>
      <div className="interior-card flex flex-col bg-green-400 px-4 py-8 xl:px-6 xl:py-8">
        <p className="mb-2 text-xl font-extralight xl:mb-3 xl:text-2xl">
          Price
        </p>
        <p className="text-2xl font-medium xl:text-3xl">
          ${exchangeInfo.price}
        </p>
        <div className="mt-4 text-base font-extralight xl:mt-5">
          <p className="">Volume: {exchangeInfo.volume}</p>
          <p className="">Exchange Grade: {exchangeInfo.exchangeGrade}</p>
        </div>
      </div>
    </div>
  );
}

export default ArbitrageCard;
