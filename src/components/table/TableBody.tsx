import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { Column } from "../table/TableHead";

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

function TableBody({
  columns,
  tableData,
}: {
  columns: Column[];
  tableData: CoinValueInterface[];
}) {
  return (
    <tbody>
      {tableData.map((row) => {
        return (
          <tr className="border-b bg-white">
            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
              <div className="flex items-center justify-start">
                <img
                  src={row.icon}
                  width={24}
                  alt="Crypto icon"
                  className="mr-2"
                />
                {row.coinName}
              </div>
            </td>
            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
              ${row.price}
            </td>
            {columns
              .filter(
                ({ accessor }) => accessor !== "name" && accessor !== "price"
              )
              .map(({ accessor }) => {
                return (
                  <td
                    key={accessor}
                    className={`whitespace-nowrap px-6 py-4 text-sm font-medium ${
                      row[accessor as keyof CoinValueInterface] > 0
                        ? "text-green-500"
                        : "text-red-600"
                    }`}>
                    <div className="flex items-center justify-center">
                      {row[accessor as keyof CoinValueInterface]}%
                      {row[accessor as keyof CoinValueInterface] < 0 ? (
                        <IoMdArrowDropdown />
                      ) : (
                        <IoMdArrowDropup />
                      )}
                    </div>
                  </td>
                );
              })}
          </tr>
        );
      })}
    </tbody>
  );
}

export default TableBody;
