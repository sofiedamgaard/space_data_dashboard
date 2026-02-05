**NASA APOD Explorer**

Live demo: https://space-atlas.vercel.app

A small web app that displays NASA’s Astronomy Picture of the Day, supporting both images and videos. Browse the complete archive from June 16, 1995 to present with date navigation. The project focuses on clean UI, reliable API handling, and a simple, extensible architecture that can later include more NASA datasets.

Tech Stack
- Next.js (App Router) for server-side rendering and routing
- React + TypeScript for type-safe UI development
- Tailwind CSS for styling
- NASA APOD API as the data source
- Vercel for deployment and environment management

The app fetches data server-side, handles both image and video content, and uses caching to optimize performance.