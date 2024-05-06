// This is an error file that wraps the entire project, so that it can catch errors on the root level. Only works in production
'use client'

/**
 * Renders a global error component.
 *
 * @param {Object} props - The component props.
 * @param {Error & { digest?: string }} props.error - The error object.
 * @param {Function} props.reset - The function to reset the error.
 * @returns {JSX.Element} The rendered global error component.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div className="flex flex-col items-center m-auto">
          <h2 className="text-center">{error.name}</h2>
          <p>{error.message}</p>
          <button
            className="px-4 py-2 m-2 text-sm text-white transition-colors bg-blue-500 rounded-md hover:bg-blue-400"
            onClick={
              () => reset()
            }
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  )
}