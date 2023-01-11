import { useEffect, useState } from "react";
import TableBody, {
  CoinValueInterface,
  ModalValueInterface,
} from "../table/TableBody";
import TableHead, { Column } from "../table/TableHead";

function Table({
  columns,
  inTableData,
  chartData,
}: {
  columns: Column[];
  inTableData: CoinValueInterface[];
  chartData: ModalValueInterface[];
}) {
  const [tableData, setTableData] = useState<any>(null);

  useEffect(() => {
    setTableData(inTableData);
  }, [inTableData]);

  const handleSorting = (sortField: string, sortOrder: string) => {
    if (sortField) {
      const sorted = [...tableData].sort(
        (a: CoinValueInterface, b: CoinValueInterface) => {
          return (
            a[sortField as keyof CoinValueInterface]
              .toString()
              .localeCompare(
                b[sortField as keyof CoinValueInterface].toString(),
                "en",
                {
                  numeric: true,
                }
              ) * (sortOrder === "asc" ? 1 : -1)
          );
        }
      );

      setTableData(sorted);
    }
  };

  return (
    <>
      {tableData !== null && (
        <table className="w-full text-left text-sm text-gray-500 shadow-2xl shadow-lightViolet">
          <TableHead columns={columns} handleSorting={handleSorting} />
          <TableBody
            columns={columns}
            tableData={tableData}
            chartData={chartData}
          />
        </table>
      )}
    </>
  );
}

export default Table;
