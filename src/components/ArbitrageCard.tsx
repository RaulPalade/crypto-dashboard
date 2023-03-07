import Kraken from "../assets/exchange-icons/kraken.svg";

export interface ArbitrageInfo {
  price: number;
  volume: number;
  exchangeGrade: string;
}

function ArbitrageCard({ exchangeInfo }: { exchangeInfo: ArbitrageInfo }) {
  return (
    <div className="exterior-card flex flex-col justify-between bg-slate-400">
      <div id="echange-logo" className="flex justify-end p-6 pb-16">
        <img src={Kraken} alt="exhange logo" width={140} />
      </div>
      <div className="interior-card flex flex-col bg-green-400 px-6 py-8">
        <p className="mb-3 text-2xl font-extralight">Price</p>
        <p className="text-3xl font-medium">${exchangeInfo.price}</p>
        <div className="mt-5 text-base font-extralight">
          <p className="">Volume: {exchangeInfo.volume}</p>
          <p className="">Exchange Grade: {exchangeInfo.exchangeGrade}</p>
        </div>
      </div>
    </div>
  );
}

export default ArbitrageCard;
