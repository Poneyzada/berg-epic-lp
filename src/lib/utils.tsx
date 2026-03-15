import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility for merging tailwind classes efficiently.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Optimized Video Component
 * Handles lazy loading and mobile performance.
 */
interface OptimizedVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
  poster?: string;
  className?: string;
}

export const OptimizedVideo: React.FC<OptimizedVideoProps> = ({ src, poster, className, ...props }) => {
  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      preload="none"
      poster={poster}
      className={cn("w-full h-full object-cover", className)}
      {...props}
    >
      <source src={src} type="video/mp4" />
      Seu navegador não suporta vídeos.
    </video>
  );
};
