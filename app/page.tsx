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
            {/* Render video or image based on media_type */}
            {apod.media_type === 'video' ? (
              <div className="relative aspect-video rounded-lg overflow-hidden mb-4 bg-black">
                <iframe
                  src={apod.url}
                  title={apod.title}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <img
                src={apod.hdurl || apod.url}
                alt={apod.title}
                className="w-full rounded-lg mb-4 object-cover"
              />
            )}

            {/* Date and copyright info */}
            <div className="flex flex-wrap items-center gap-3 mb-3 text-sm text-zinc-400">
              <time dateTime={apod.date} className="font-medium">
                {new Date(apod.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
              {apod.copyright && (
                <>
                  <span className="text-zinc-600">•</span>
                  <span>© {apod.copyright}</span>
                </>
              )}
            </div>

            {/* Explanation text */}

            <p className="text-zinc-300 leading-relaxed">
              {apod.explanation}
            </p>
          </div>
        </div>
      </main>
    </>
  )
}