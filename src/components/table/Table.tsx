import TableBody, { CoinValueInterface } from "../table/TableBody";
import TableHead, { Column } from "../table/TableHead";

function Table({
  columns,
  tableData,
}: {
  columns: Column[];
  tableData: CoinValueInterface[];
}) {
  return (
    <>
      <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
        <TableHead columns={columns} />
        <TableBody columns={columns} tableData={tableData} />;
      </table>
    </>
  );
}

export default Table;
