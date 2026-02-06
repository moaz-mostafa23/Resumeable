import React from "react";

export const Logo = ({ className = "h-8 w-8" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <defs>
      <linearGradient id="logo-gradient" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.8" />
      </linearGradient>
    </defs>
    <path
      d="M4 4v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8.342a2 2 0 0 0-.602-1.43l-4.44-4.442A2 2 0 0 0 13.56 2H6a2 2 0 0 0-2 2z"
      className="text-primary"
    />
    <path d="M14 2v6h6" className="text-primary/80" />
    <path d="M9 13v-1h6v1" />
    <path d="M12 12v6" />
    <path d="M9 18h6" />
  </svg>
);
