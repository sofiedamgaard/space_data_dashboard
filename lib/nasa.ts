import { ApodResponse } from "@/types";
// returns promise with APOD data including title, url, explanation, and media_type
// throws rror if the API request fails or API key is missing

export async function getApod(): Promise<ApodResponse> {
  if (!process.env.NASA_API_KEY) {
    throw new Error("NASA_API_KEY environment variable is not configured");
  }

  const url = `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}`;

  try {
    const res = await fetch(url, {
      // revalidate every 12 hours (APOD updates daily)
      next: { revalidate: 43200 }
    });

    if (!res.ok) {
      throw new Error(`NASA API returned status ${res.status}: ${res.statusText}`);
    }

    const data: ApodResponse = await res.json();

    if (!data.title || !data.url || !data.media_type) {
      throw new Error("Invalid APOD response: missing required fields");
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch APOD: ${error.message}`);
    }
    throw new Error("Failed to fetch APOD: Unknown error");
  }
}