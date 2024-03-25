"use client";
import { usePathname, useSearchParams } from 'next/navigation';

export interface HeadCell {
  id: string;
  label: string;
  type: string;
}

export default function TableHead({ headCells, handleSelectAllClick }: {headCells: readonly HeadCell[], handleSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const sort = searchParams.get('sort') || '';

  const createSortURL = (sortTerm: string): string => {
    const params = new URLSearchParams(searchParams);
    if (sort == sortTerm) {
      params.set('sort', `-${sortTerm}`);
    } else {
      params.set('sort', sortTerm);
    }
    return `${pathname}?${params.toString()}`;
  };

  return (
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="p-4">
          <div className="flex items-center">
            <input id="checkbox-all-search" type="checkbox" onChange={handleSelectAllClick}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
            <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
          </div>
        </th>
        {headCells.map((headCell) => (
          <th key={headCell.id} scope="col" className="px-6 py-3">
            <div className="flex items-center">
              {headCell.label}
              <a href={createSortURL(headCell.id)} className='cursor-pointer'>
                <svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                </svg>
              </a>
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
}