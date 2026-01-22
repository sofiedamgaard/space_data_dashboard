import { getApod } from "@/lib/nasa"

export default async function Home() {
  const apod = await getApod()

  return (
    <main className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">
        {apod.title}
      </h1>

      <img
        src={apod.url}
        alt={apod.title}
        className="rounded-lg mb-4"
      />

      <p className="text-gray-700">
        {apod.explanation}
      </p>
    </main>
  )
}