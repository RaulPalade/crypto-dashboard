import { useState } from "react";
import { TiArrowUnsorted } from "react-icons/ti";

export interface Column {
  label: string;
  accessor: string;
}

function TableHead({
  columns,
  handleSorting,
}: {
  columns: Column[];
  handleSorting: (sortField: string, sortOrder: string) => void;
}) {
  const [sortField, setSortField] = useState<string>("");
  const [order, setOrder] = useState<string>("asc");

  const handleSortingChange = (accessor: string) => {
    const sortOrder =
      accessor === sortField && order === "asc" ? "desc" : "asc";
    setSortField(accessor);
    setOrder(sortOrder);
    handleSorting(accessor, sortOrder);
  };

  return (
    <thead className="bg-slate-100 text-xs uppercase text-gray-700">
      <tr>
        <th
          scope="col"
          className="rounded-tl-lg px-6 py-4 text-sm font-medium text-gray-900"></th>
        {columns
          ?.filter((col) => col.label !== "")
          ?.map(({ label, accessor }) => {
            return (
              <th
                key={accessor}
                onClick={() => handleSortingChange(accessor)}
                scope="col"
                className={`px-6 py-4 text-sm font-medium text-gray-900 ${
                  accessor === "threeYears" ? "rounded-tr-lg" : ""
                }`}>
                <div className="flex items-center">
                  {label}
                  <i>
                    <TiArrowUnsorted size={14} />
                  </i>
                </div>
              </th>
            );
          })}
      </tr>
    </thead>
  );
}

export default TableHead;
