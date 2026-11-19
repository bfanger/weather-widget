/**
 * Skeleton shown while the server renders the page (and any streaming
 * boundaries). Keeps the layout stable so there is no shift when real data
 * arrives.
 */
export default function Loading() {
  return (
    <div
      aria-hidden="true"
      className="w-full max-w-2xl rounded-3xl bg-slate-200 p-6 shadow-2xl sm:p-8 dark:bg-slate-800"
    >
      <div className="flex flex-col gap-6">
        <div className="flex justify-between">
          <div className="h-8 w-40 animate-pulse rounded-lg bg-slate-300 dark:bg-slate-700" />
          <div className="h-9 w-48 animate-pulse rounded-full bg-slate-300 dark:bg-slate-700" />
        </div>
        <div className="flex items-center gap-4">
          <div className="h-24 w-24 animate-pulse rounded-full bg-slate-300 dark:bg-slate-700" />
          <div className="flex-1 space-y-2">
            <div className="h-12 w-28 animate-pulse rounded-lg bg-slate-300 dark:bg-slate-700" />
            <div className="h-5 w-40 animate-pulse rounded bg-slate-300 dark:bg-slate-700" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-16 animate-pulse rounded-2xl bg-slate-300 dark:bg-slate-700"
            />
          ))}
        </div>
        <div className="h-32 animate-pulse rounded-2xl bg-slate-300 dark:bg-slate-700" />
      </div>
    </div>
  );
}
