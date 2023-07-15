function TableBodyMonthlyReturns({
  tableData,
}: {
  tableData: Map<number, number[]>;
}) {
  function getColorClass(value: number): string {
    if (value >= 0) {
      const greenTone = Math.min(Math.ceil(value / 0.04), 5); // 0.04 è il passo per le tonalità verdi
      return `green-${greenTone}`;
    } else {
      const redTone = Math.min(Math.ceil(Math.abs(value) / 0.04), 5); // 0.04 è il passo per le tonalità rosse
      return `red-${redTone}`;
    }
  }

  return (
    <tbody>
      {Array.from(tableData.entries()).map(([year, monthlyReturns], index) => (
        <tr key={index}>
          <td className="bg-slate-100 px-6 py-4 text-sm font-medium text-gray-900 ">
            {year}
          </td>
          {monthlyReturns.map((returnValue, monthIndex) => (
            <td
              key={monthIndex}
              className={`whitespace-nowrap bg-slate-100 px-6 py-4 text-sm font-medium ${
                returnValue > 0 ? "text-green-500" : "text-red-600"
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
