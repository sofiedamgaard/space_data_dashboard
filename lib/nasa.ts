export async function getApod() {
    const res = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}`
    )

    if (!res.ok) {
        throw new Error("Failed to fetch APOD")
    }

    return res.json()
}