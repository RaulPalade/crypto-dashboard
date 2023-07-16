import TableHeadMonthlyReturns from "./TableHeadMonthlyReturns";
import TableBodyMonthlyReturns from "./TableBodyMonthlyReturns";

function TableMonthlyReturns({
  columns,
  data,
}: {
  columns: String[];
  data: Map<number, number[]>;
}) {
  return (
    <>
      {data !== null && (
        <table className="w-full text-left text-sm text-gray-500 shadow-2xl shadow-lightViolet">
          <TableHeadMonthlyReturns columns={columns} />
          <TableBodyMonthlyReturns tableData={data} />
        </table>
      )}
    </>
  );
}

export default TableMonthlyReturns;
