'use client' // Error components must be Client Components

import { useEffect } from "react";
import Link from "next/link";

/**
 * Renders an error page in case of error and provides options to recover or navigate to the home page.
 *
 * @param error - The error object containing information about the error.
 * @param reset - A function to reset the component or perform recovery actions.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("auth error:", error);
  }, [error]);

  return (
    <main className='flex flex-col items-center m-auto'>
      <h2 className='text-center'>
        Something went wrong while trying to authenticate.
      </h2>
      <div className='flex flex-row'>
        <button
          className='px-4 py-2 m-2 text-sm text-white transition-colors bg-blue-500 rounded-md hover:bg-blue-400'
          onClick={
            // Attempt to recover by trying to re-render the invoices route
            () => reset()
          }
        >
          Try again
        </button>
        <Link
          className='px-4 py-2 m-2 text-sm text-white transition-colors bg-blue-500 rounded-md hover:bg-blue-400'
          href='/'
        >
          Home
        </Link>
      </div>
    </main>
  );
}