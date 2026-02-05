/**
 * NASA APOD API Response Type
 * Based on: https://api.nasa.gov/
 */
export interface ApodResponse {
  title: string;
  explanation: string;
  url: string;
  media_type: 'image' | 'video';
  date: string;
  copyright?: string;
  hdurl?: string;
  service_version?: string;
}