import { getApod } from "@/lib/nasa"

export default async function Home() {
  const apod = await getApod()

  return (
    <>
      <div className="star-field"></div>
      <div className="mesh-gradient-bg"></div>
      <main className="p-8 max-w-4xl mx-auto">
        <h1 className="text-center text-3xl md:text-4xl lg:text-5xl font-bold text-gradient bg-clip-text text-transparent mb-4 leading-tight">
          {apod.title}
        </h1>
        <div className="rounded-2xl bg-black/30 backdrop-blur-md border border-white/10 shadow-2xl glass-card">
          <div className="p-6">
            <img
              src={apod.url}
              alt={apod.title}
              className="rounded-lg mb-4"
            />

            <p className="text-zinc-300 leading-relaxed">
              {apod.explanation}
            </p>
          </div>
        </div>
      </main>
    </>
  )
}