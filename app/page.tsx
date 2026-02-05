import { getApod } from "@/lib/nasa";
import { DatePicker } from "@/components/DatePicker";

interface PageProps {
  searchParams: Promise<{
    date?: string;
  }>;
}

export default async function Home({ searchParams }: PageProps) {
  // Use date from URL params or default to today
  const params = await searchParams;
  const requestedDate = params.date;
  const apod = await getApod(requestedDate);

  return (
    <>
      <div className="star-field"></div>
      <div className="mesh-gradient-bg"></div>
      <main className="p-8 max-w-4xl mx-auto">
        {/* Header with title and date picker */}
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
                {new Date(apod.date + 'T00:00:00').toLocaleDateString('en-US', {
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
            <p className="text-zinc-100 leading-relaxed">
              {apod.explanation}
            </p>
          </div>
        </div>
      </main>
      <div className="fixed bottom-8 right-8 z-50">
        <DatePicker currentDate={apod.date} variant="floating" />
      </div>

    </>
  );
}