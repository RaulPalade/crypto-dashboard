import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { FaMinus } from "react-icons/fa";
import { Column } from "../table/TableHead";
import { useState } from "react";
import Modal from "../Modal";
import { ChartDataset } from "chart.js";

export interface CoinModalInfo {
  name: string;
  icon: any;
}

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

export interface ModalValueInterface {
  labels: string[];
  dataset: ChartDataset;
}

function TableBody({
  columns,
  tableData,
  chartData,
}: {
  columns: Column[];
  tableData: CoinValueInterface[];
  chartData: ModalValueInterface[];
}) {
  const [coinIndex, setCoinIndex] = useState<number>(0);
  const [icon, setIcon] = useState<any>(null);

  const openModalBtn = document.getElementById("unfold");
  const modalContainer = document.getElementById("modal-container");

  const openModal = () => {
    modalContainer?.removeAttribute("class");
    modalContainer?.classList.add(openModalBtn!!.id);
  };

  return (
    <>
      <tbody>
        {tableData?.map((row, index) => {
          return (
            <tr
              id="unfold"
              onClick={() => {
                setIcon(row.icon);
                setCoinIndex(index);
                openModal();
              }}
              className="table-row bg-white"
              data-modal-target="defaultModal"
              key={index}>
              <td
                className={`whitespace-nowrap px-6 py-4 text-sm font-medium ${
                  index === 9 ? "rounded-bl-lg" : ""
                }`}>
                <div className="flex items-center justify-start">
                  <img
                    src={row.icon}
                    width={30}
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
      <Modal chartData={chartData[coinIndex]} icon={icon} />
    </>
  );
}

export default TableBody;
