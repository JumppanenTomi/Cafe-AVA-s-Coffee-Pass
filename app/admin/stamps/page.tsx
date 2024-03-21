"use client";
import {ChangeEvent, useEffect} from 'react';
import { useState } from 'react';
import { fetchStamps } from './server';

export const revalidate = 3600

interface HeadCell {
  id: string;
  label: string;
  type: string;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'stamp_log_id',
    type: 'number',
    label: 'Stamp Id',
  },
  {
    id: 'timestamp',
    type: 'datetime',
    label: 'Timestamp',
  },
  {
    id: 'user_id',
    type: 'string',
    label: 'User',
  },
  {
    id: 'is_used',
    type: 'boolean',
    label: 'Is used',
  },
];

type Order = 'asc' | 'desc';

export default function Stamps() {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<string>('stamp_log_id');
  const [selected, setSelected] = useState<readonly number[]>([]);
  const [stamps, setStamps] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const updateStamps = async () => {
      const updatedStamps = await fetchStamps(page, order, orderBy);
      console.log(updatedStamps)
      setStamps(updatedStamps);
    };


    updateStamps();
  }, [page, order, orderBy]);


  const handleRequestSort = (
    property: string
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = stamps.map((n) => n.stamp_log_id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleShowLabel = (value: any, type: string) => {
    if (type == 'datetime') {
      return new Date(value).toLocaleString();
    } else if (type == 'boolean') {
      return value ? 'Yes' : 'No';
    } else {
      return value;
    }
  }

  const handleClick = (event: ChangeEvent<HTMLInputElement>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };
  
  console.log(selected)

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  return (
    <div className="flex-1 w-full flex flex-col gap-8 py-4">
      <h3 className="text-3xl dark:text-white">Stamps</h3>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div
          className="p-4 flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">
          <div>
            <button id="dropdownActionButton"
              onClick={() => setShowDropdown(!showDropdown)}
              data-dropdown-toggle="dropdownAction"
              className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              type="button">
              <span className="sr-only">Action button</span>
              Action
              <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="m1 1 4 4 4-4" />
              </svg>
            </button>

            <div id="dropdownAction" style={{ display: showDropdown ? 'block' : 'none' }}
              className="z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
              <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownActionButton">
                <li>
                  <a href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Deactivate</a>
                </li>
              </ul>
              <div className="py-1">
                <a href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete</a>
              </div>
            </div>
          </div>
          <label htmlFor="table-search" className="sr-only">Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input type="text" id="table-search-users"
              className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search for stamps" />
          </div>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
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
                    <a onClick={(e) => handleRequestSort(headCell.id)} className='cursor-pointer'>
                      <svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                      </svg>
                    </a>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {stamps.map(stamp => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="w-4 p-4">
                  <div className="flex items-center">
                    <input id="checkbox-table-search-1" type="checkbox" onChange={(e) => handleClick(e, stamp.stamp_log_id)} checked={isSelected(stamp.stamp_log_id)}
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
        </table>
      </div>
    </div>
  )
}