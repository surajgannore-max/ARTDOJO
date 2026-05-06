
import React from 'react';

const GemIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 3h12l4 6-10 13L2 9Z" />
    <path d="M12 22V9" />
    <path d="m3.29 9 8.71 13 8.71-13" />
  </svg>
);

export default GemIcon;
