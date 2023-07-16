function TableBodyMonthlyReturns({
  tableData,
}: {
  tableData: Map<number, number[]>;
}) {
  const currentYear = new Date().getFullYear();

  return (
    <tbody>
      {Array.from(tableData.entries()).map(([year, monthlyReturns], index) => (
        <tr key={index} className="table-row bg-slate-100">
          <td
            className={`px-3 py-4 text-center text-sm font-medium text-gray-900 ${
              year === currentYear ? "rounded-bl-lg" : ""
            } `}
          >
            {year}
          </td>
          {monthlyReturns.map((returnValue, monthIndex, array) => (
            <td
              key={monthIndex}
              className={`whitespace-nowrap  px-5 py-2 text-center text-sm font-medium ${
                returnValue > 0 ? "text-lightGreen" : "text-lightRed"
              } ${
                monthIndex === array.length - 1 && year === currentYear
                  ? "rounded-br-lg"
                  : ""
              }`}
            >
              {returnValue.toFixed(2)}%{" "}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

export default TableBodyMonthlyReturns;
