import { TiArrowUnsorted } from "react-icons/ti";

export interface Column {
  label: string;
  accessor: string;
}

function TableHead({ columns }: { columns: Column[] }) {
  return (
    <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th
          scope="col"
          className="px-6 py-4 text-sm font-medium text-gray-900"></th>
        {columns
          .filter((col) => col.label !== "")
          .map(({ label, accessor }) => {
            return (
              <th
                key={accessor}
                scope="col"
                className=" px-6 py-4 text-sm font-medium text-gray-900">
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
