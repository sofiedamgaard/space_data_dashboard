export default function Loading() {
  return (
    <>
      <div className="star-field"></div>
      <div className="mesh-gradient-bg"></div>
      <main className="p-8 max-w-4xl mx-auto min-h-screen flex items-center justify-center">
        <div className="rounded-2xl bg-black/30 backdrop-blur-md border border-white/10 shadow-2xl glass-card p-8">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
            <p className="text-zinc-100 text-lg">Loading astronomy picture...</p>
          </div>
        </div>
      </main>
    </>
  );
}