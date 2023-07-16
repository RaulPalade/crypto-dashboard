function TableHeadMonthlyReturns({ columns }: { columns: String[] }) {
  return (
    <thead className="table-header bg-slate-100 text-xs uppercase text-gray-700">
      <tr>
        <th
          scope="col"
          className="table-header-label rounded-tl-lg px-6 py-4 text-sm font-medium text-gray-900"
        ></th>
        {columns.map((column) => {
          return (
            <th
              scope="col"
              className={`table-header-label text-gray-900" px-6 py-4 text-xs
              font-medium ${column === "December" ? "rounded-tr-lg" : ""}`}
            >
              <div className="flex items-center">{column}</div>
            </th>
          );
        })}
      </tr>
    </thead>
  );
}

export default TableHeadMonthlyReturns;
