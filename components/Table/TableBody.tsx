const handleShowLabel = (value: any, type: string) => {
  if (type == 'datetime') {
    //return new Date(value).toLocaleString('fi-FI');
    return value;
  } else if (type == 'boolean') {
    return value ? 'Yes' : 'No';
  } else {
    return value;
  }
}

export default function TableBody({ data, headCells, handleSelectClick, isSelected }) {
  return (
    <tbody>
      {data.map((stamp, index) => (
        <tr
          key={index}
          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
          <td className="w-4 p-4">
            <div className="flex items-center">
              <input id="checkbox-table-search-1" type="checkbox"
                onChange={(e) => handleSelectClick(e, stamp.stamp_log_id)} checked={isSelected(stamp.stamp_log_id)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
              <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
            </div>
          </td>
          {headCells.map((headCell) => (
            <td
              key={headCell.id}
              className="px-6 py-4">
              {handleShowLabel(stamp[headCell.id], headCell.type)}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}  