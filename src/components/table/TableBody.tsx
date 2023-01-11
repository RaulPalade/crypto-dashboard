import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { FaMinus } from "react-icons/fa";
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
      {tableData?.map((row, index) => {
        return (
          <tr className="bg-white" key={index}>
            <td
              className={`whitespace-nowrap px-6 py-4 text-sm font-medium ${
                index === 9 ? "rounded-bl-lg" : ""
              }`}>
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
              ?.filter(
                ({ accessor }) => accessor !== "name" && accessor !== "price"
              )
              ?.map(({ accessor }) => {
                const dataCol = row[accessor as keyof CoinValueInterface];
                return (
                  <td
                    key={accessor}
                    className={`whitespace-nowrap px-6 py-4 text-sm font-medium ${
                      dataCol > 0 ? "text-green-500" : "text-red-600"
                    } ${
                      accessor === "threeYears" && index === 9
                        ? "rounded-br-lg"
                        : ""
                    }`}>
                    <div className="flex items-center justify-center">
                      {isFinite(dataCol) ? `${dataCol}%` : <FaMinus />}
                      {isFinite(dataCol) && dataCol < 0 ? (
                        <IoMdArrowDropdown />
                      ) : (
                        isFinite(dataCol) && <IoMdArrowDropup />
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
