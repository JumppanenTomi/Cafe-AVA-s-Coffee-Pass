// This is an error file that wraps the entire project, so that it can catch errors on the root level. Only works in production
'use client'

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
          <h2 className="text-center">Something went wrong!</h2>
          <button
            className="m-2 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
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