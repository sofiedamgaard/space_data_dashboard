'use client';

import { useRouter } from 'next/navigation';
import { useState, useRef } from 'react';

interface DatePickerProps {
  currentDate: string;
  variant?: 'default' | 'floating';
}

export function DatePicker({ currentDate, variant = 'default' }: DatePickerProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const wasClickedRef = useRef(false);
  
  // APOD started on June 16, 1995
  const minDate = '1995-06-16';
  const maxDate = new Date().toISOString().split('T')[0];

  const navigateToDate = (newDate: string) => {
    // Validate date is complete and in range
    if (newDate.length === 10 && newDate >= minDate && newDate <= maxDate) {
      // Update URL with new date
      if (newDate === maxDate) {
        router.push('/');
      } else {
        router.push(`/?date=${newDate}`);
      }
      setIsOpen(false);
    }
  };

  const handleClick = () => {
    // Set flag that user clicked (will be used in onChange)
    wasClickedRef.current = true;
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value;
    setSelectedDate(newDate);
    
    // If user clicked (from calendar), navigate immediately
    if (wasClickedRef.current && newDate.length === 10) {
      navigateToDate(newDate);
      wasClickedRef.current = false; // Reset flag
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Reset click flag on any key press (arrow keys, typing, etc.)
    wasClickedRef.current = false;
    
    // Navigate on Enter key
    if (e.key === 'Enter') {
      e.preventDefault();
      const target = e.target as HTMLInputElement;
      navigateToDate(target.value);
    }
    // Close on Escape
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const formattedDate = new Date(currentDate + 'T00:00:00').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  const buttonClass = variant === 'floating'
    ? "group flex items-center gap-2 px-4 py-3 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-xl border border-white/20 hover:border-white/30 transition-all text-sm text-zinc-300 hover:text-zinc-100 shadow-lg hover:shadow-xl"
    : "group flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all text-sm text-zinc-400 hover:text-zinc-200";

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={buttonClass}
        aria-label="Change date"
      >
        <svg 
          className="w-4 h-4" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
          />
        </svg>
        <span className={variant === 'floating' ? '' : 'hidden sm:inline'}>
          {formattedDate}
        </span>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Date picker popup */}
          <div className="absolute bottom-full mb-2 right-0 z-20 p-4 rounded-lg bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl min-w-[240px]">
            <label className="block text-xs text-zinc-400 mb-2">
              Select a date
            </label>
            <input
              type="date"
              value={selectedDate}
              min={minDate}
              max={maxDate}
              onChange={handleDateChange}
              onClick={handleClick}
              onKeyDown={handleKeyDown}
              className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
              autoFocus
            />
            <p className="mt-2 text-xs text-zinc-500">
              Click date or use arrows + Enter
            </p>
          </div>
        </>
      )}
    </div>
  );
}