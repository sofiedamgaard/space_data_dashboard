import { getApod } from "@/lib/nasa";
import { DatePicker } from "@/components/DatePicker";
import { ApodMedia } from "@/components/ApodMedia";

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
            <ApodMedia
              key={apod.date}
              mediaType={apod.media_type}
              url={apod.url}
              hdurl={apod.hdurl}
              title={apod.title}
            />

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