
import React from 'react';

const BrushIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.06 11.9 16 5.02c.81-.77.81-2.03 0-2.8l-1.18-1.18c-.78-.78-2.04-.78-2.82 0L5.02 8.01" />
    <path d="m14 7 3 3" />
    <path d="M12.01 11.95 2.03 21.93c-.78.78-.78 2.04 0 2.82l1.18 1.18c.78.78 2.04.78 2.82 0l9.98-9.98" />
    <path d="M12.01 11.95 7 17" />
  </svg>
);

export default BrushIcon;
