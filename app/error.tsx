"use client";

import { useEffect } from "react";

/**
 * Route-segment error boundary. Catches uncaught exceptions while rendering
 * the page and offers a recovery path (re-render) instead of a blank screen.
 */
export default function ErrorPage({
  error,
  retry,
}: {
  error: unknown;
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const message = error instanceof Error ? error.message : "Unknown error";

  return (
    <div className="flex w-full max-w-2xl flex-col items-center gap-4 rounded-3xl bg-slate-100 p-10 text-center dark:bg-slate-800">
      <h2 className="text-xl font-semibold">
        Something went wrong loading the weather.
      </h2>
      <p className="text-sm text-slate-600 dark:text-slate-300">{message}</p>
      <button
        type="button"
        onClick={() => retry()}
        className="rounded-full bg-slate-900 px-5 py-2.5 font-medium text-white transition-colors hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
      >
        Try again
      </button>
    </div>
  );
}
