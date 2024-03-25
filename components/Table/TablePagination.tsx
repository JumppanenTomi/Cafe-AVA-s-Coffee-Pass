"use client";
import { usePathname, useSearchParams } from 'next/navigation';

const START_PAGE = 1;
const PAGE_NUMBERS_TO_SHOW = 5;
const PAGE_SIZE = 25;
const PAGE_PLACE_HOLDER = -1

const generatePageNumbers = (currentPage: number, totalPages: number): (number | string)[] => {
  if (totalPages < PAGE_NUMBERS_TO_SHOW + 3) return Array.from({ length: totalPages }, (_, i) => i + 1);

  if (currentPage <= PAGE_NUMBERS_TO_SHOW - 1) {
    return Array.from({ length: PAGE_NUMBERS_TO_SHOW }, (_, i) => i + 1).concat([PAGE_PLACE_HOLDER, totalPages]);
  } else if (currentPage > totalPages - PAGE_NUMBERS_TO_SHOW + 1) {
    return [START_PAGE, PAGE_PLACE_HOLDER].concat(Array.from({ length: PAGE_NUMBERS_TO_SHOW }, (_, i) => totalPages - PAGE_NUMBERS_TO_SHOW + i + 1));
  } else {
    return [START_PAGE, PAGE_PLACE_HOLDER, currentPage - 1, currentPage, currentPage + 1, PAGE_PLACE_HOLDER, totalPages];
  }
};

export default function Pagination({ count }: { count: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || START_PAGE;

  const createPageURL = (pageNumber: number | string): string => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const startEntry = (currentPage - 1) * PAGE_SIZE + 1;
  const endEntry = Math.min(startEntry + PAGE_SIZE - 1, count);
  const totalPages = Math.ceil(count / PAGE_SIZE);
  const pageNumbers = generatePageNumbers(currentPage, totalPages);

  return (
    <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between p-4 bg-white" aria-label="Table navigation">
      <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">Showing <span className="font-semibold text-gray-900 dark:text-white">{startEntry}-{endEntry}</span> of <span className="font-semibold text-gray-900 dark:text-white">{count}</span></span>
      <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
        <li>
          <a href={createPageURL(currentPage - 1)} 
          className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            <span className="sr-only">Previous</span>
            <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
            </svg>
          </a>
        </li>
        {pageNumbers.map((pageNumber, index) => {
          if (pageNumber === PAGE_PLACE_HOLDER) {
            return (
              <li key={index}>
                <span className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">...</span>
              </li>
            );
          }

          return (
            <li key={index}>
              <a href={createPageURL(pageNumber)} className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === pageNumber ? 'text-blue-600 bg-blue-50' : ''}`}>{pageNumber}</a>
            </li>
          );


        })}
        <li>
          <a href={createPageURL(currentPage + 1)} className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            <span className="sr-only">Next</span>
            <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
            </svg>
          </a>
        </li>
      </ul>
    </nav>
  );
}