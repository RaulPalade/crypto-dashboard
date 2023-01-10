import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

export interface CoinValueInterface {
  coinName: string;
  icon: any;
  price: number;
  oneDay: number;
  sevenDays: number;
  thirtyDays: number;
  ninetyDays: number;
  oneYear: number;
  twoYears: number;
  threeYears: number;
}

function TableRow(coin: CoinValueInterface) {
  const keys = Object.keys(coin);

  return (
    <tr className="border-b bg-white">
      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
        <div className="flex items-center justify-start">
          <img src={coin.icon} width={24} alt="Crypto icon" className="mr-2" />
          {coin.coinName}
        </div>
      </td>
      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
        ${coin.price}
      </td>
      {keys
        .filter(
          (key) => key !== "price" && key !== "coinName" && key !== "icon"
        )
        .map((key, index) => (
          <td
            key={index}
            className={`whitespace-nowrap px-6 py-4 text-sm font-medium ${
              coin[key as keyof CoinValueInterface] > 0
                ? "text-green-500"
                : "text-red-600"
            }`}>
            <div className="flex items-center justify-center">
              {coin[key as keyof CoinValueInterface]}%
              {coin[key as keyof CoinValueInterface] < 0 ? (
                <IoMdArrowDropdown />
              ) : (
                <IoMdArrowDropup />
              )}
            </div>
          </td>
        ))}
    </tr>
  );
}

export default TableRow;
