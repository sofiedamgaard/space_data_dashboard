'use client';

import { useState } from 'react';

interface ApodMediaProps {
  mediaType: 'image' | 'video';
  url: string;
  hdurl?: string;
  title: string;
}

export function ApodMedia({ mediaType, url, hdurl, title }: ApodMediaProps) {
  const [isLoading, setIsLoading] = useState(true);

  if (mediaType === 'video') {
    return (
      <div className="relative aspect-video rounded-lg overflow-hidden mb-4 bg-black">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
          </div>
        )}
        <iframe
          src={url}
          title={title}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onLoad={() => setIsLoading(false)}
        />
      </div>
    );
  }

  return (
    <div className="relative rounded-lg mb-4 bg-black/20 min-h-[300px]">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
        </div>
      )}
      <img
        src={hdurl || url}
        alt={title}
        className={`w-full rounded-lg object-cover transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
}