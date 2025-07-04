import React from 'react';

const Logo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="#currentColor" stroke="#currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round" 
      {...props}
  >
    <line x1="12" y1="1" x2="12" y2="23" fill="#currentColor"></line>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" fill="#currentColor"></path>
  </svg>
  );
}

export default Logo;