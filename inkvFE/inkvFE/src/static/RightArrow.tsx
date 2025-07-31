import React from 'react';

const RightArrow: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
    viewBox="0 0 512 512"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M214.78,478l-20.67-21.57L403.27,256,194.11,55.57,214.78,34,446.46,256ZM317.89,256,86.22,34,65.54,55.57,274.7,256,65.54,456.43,86.22,478Z"
    fill="#currentcolor" />
  </svg>
  );
}

export default RightArrow;