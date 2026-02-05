'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <>
      <div className="star-field"></div>
      <div className="mesh-gradient-bg"></div>
      <main className="p-8 max-w-4xl mx-auto min-h-screen flex items-center justify-center">
        <div className="rounded-2xl bg-black/30 backdrop-blur-md border border-white/10 shadow-2xl glass-card p-8 text-center">
          <h2 className="text-2xl font-bold text-gradient bg-clip-text text-transparent mb-4">
            Something went wrong!
          </h2>
          <p className="text-zinc-100 mb-6">
            Unable to load today's astronomy picture. This might be due to an API issue or network problem.
          </p>
          <button
            onClick={reset}
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transition-all font-medium text-white shadow-lg hover:shadow-xl"
          >
            Try again
          </button>
        </div>
      </main>
    </>
  );
}