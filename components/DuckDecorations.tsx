import React from 'react';

export const DuckHat = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg viewBox="0 0 100 60" className={className} fill="none">
    <path d="M10 50 C10 50, 20 20, 50 20 C80 20, 90 50, 90 50 Z" fill="#1E90FF" />
    <path d="M10 50 L90 50 L90 60 L10 60 Z" fill="#104E8B" />
    <path d="M85 50 L95 40 L95 60 Z" fill="black" />
  </svg>
);

export const StitchEar = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className}>
    <path d="M20 80 Q0 40 40 10 Q60 40 50 80 Z" fill="#0277BD" stroke="#01579B" strokeWidth="2" />
    <path d="M25 70 Q15 45 35 25" fill="#F06292" opacity="0.4" />
  </svg>
);

export const DuckButt = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <circle cx="50" cy="50" r="40" fill="white" stroke="#E5E7EB" strokeWidth="2"/>
    <path d="M90 50 L110 35 L105 50 L110 65 Z" fill="white" />
  </svg>
);

export const DuckFoot = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="#FFD700">
    <path d="M30 80 L20 20 L40 40 L50 10 L60 40 L80 20 L70 80 Q50 90 30 80 Z" />
  </svg>
);