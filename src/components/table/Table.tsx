import { useEffect, useState } from "react";
import TableBody, { CoinValueInterface } from "../table/TableBody";
import TableHead, { Column } from "../table/TableHead";

function Table({
  columns,
  inTableData,
}: {
  columns: Column[];
  inTableData: CoinValueInterface[];
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
      <table className="w-full text-left text-sm text-gray-500 shadow-2xl shadow-lightViolet">
        <TableHead columns={columns} handleSorting={handleSorting} />
        {tableData !== null ? (
          <TableBody columns={columns} tableData={tableData} />
        ) : (
          <TableBody columns={columns} tableData={inTableData} />
        )}
      </table>
    </>
  );
}

export default Table;
