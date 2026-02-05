import { ApodResponse } from "@/types";

// fetches NASA's Astronomy Picture of the Day
// returns promise with APOD data including title, url, explanation, and media_type
// throws error if the API request fails or API key is missing

export async function getApod(date?: string): Promise<ApodResponse> {
  if (!process.env.NASA_API_KEY) {
    throw new Error("NASA_API_KEY environment variable is not configured");
  }

  // APOD service started on June 16, 1995
  const MIN_DATE = new Date('1995-06-16');
  const MAX_DATE = new Date();
  
  if (date) {
    const requestedDate = new Date(date + 'T00:00:00');
    
    if (isNaN(requestedDate.getTime())) {
      throw new Error("Invalid date format. Use YYYY-MM-DD");
    }
    
    if (requestedDate < MIN_DATE) {
      throw new Error("Date cannot be before June 16, 1995 (APOD start date)");
    }
    
    if (requestedDate > MAX_DATE) {
      throw new Error("Date cannot be in the future");
    }
  }

  // Build URL with optional date parameter
  const params = new URLSearchParams({
    api_key: process.env.NASA_API_KEY,
    ...(date && { date })
  });
  
  const url = `https://api.nasa.gov/planetary/apod?${params}`;

  try {
    const res = await fetch(url, {
      // Cache today's APOD for 12 hours, historical ones for 7 days
      next: { 
        revalidate: date ? 604800 : 43200 
      }
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