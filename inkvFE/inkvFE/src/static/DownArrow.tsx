import React from 'react';

const DownArrow: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    stroke-width="2" 
    stroke-linecap="round" 
    stroke-linejoin="round" 
    aria-hidden="true"
    {...props}
    >
        <path d="M6 9l6 6 6-6"/>
    </svg>
  );
}
export default DownArrow;



