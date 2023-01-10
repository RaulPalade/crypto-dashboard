import { TiArrowUnsorted } from "react-icons/ti";

function TableHead() {
  return (
    <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th
          scope="col"
          className="px-6 py-4 text-sm font-medium text-gray-900"></th>
        <th scope="col" className="px-6 py-4 text-sm font-medium text-gray-900">
          Price
        </th>
        <th scope="col" className="px-6 py-4 text-sm font-medium text-gray-900">
          <div className="flex items-center">
            1 day
            <i>
              <TiArrowUnsorted size={14} />
            </i>
          </div>
        </th>
        <th
          scope="col"
          className=" px-6 py-4 text-sm font-medium text-gray-900">
          <div className="flex items-center">
            7 days
            <i>
              <TiArrowUnsorted size={14} />
            </i>
          </div>
        </th>
        <th
          scope="col"
          className="  px-6 py-4 text-sm font-medium text-gray-900">
          <div className="flex items-center">
            30 days
            <i>
              <TiArrowUnsorted size={14} />
            </i>
          </div>
        </th>
        <th
          scope="col"
          className=" px-6 py-4 text-sm font-medium text-gray-900">
          <div className="flex items-center">
            90 days
            <i>
              <TiArrowUnsorted size={14} />
            </i>
          </div>
        </th>
        <th
          scope="col"
          className="  px-6 py-4 text-sm font-medium text-gray-900">
          <div className="flex items-center">
            1 year
            <i>
              <TiArrowUnsorted size={14} />
            </i>
          </div>
        </th>
        <th
          scope="col"
          className=" px-6 py-4 text-sm font-medium text-gray-900">
          <div className="flex items-center">
            2 year
            <i>
              <TiArrowUnsorted size={14} />
            </i>
          </div>
        </th>
        <th
          scope="col"
          className=" px-6 py-4 text-sm font-medium text-gray-900">
          <div className="flex items-center">
            3 year
            <i>
              <TiArrowUnsorted size={14} />
            </i>
          </div>
        </th>
      </tr>
    </thead>
  );
}

export default TableHead;
