import React from 'react';

const RightArrow: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
    width="512px"
    height="512px"
    viewBox="0 0 512 512"
    data-name="Layer 1"
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M214.78,478l-20.67-21.57L403.27,256,194.11,55.57,214.78,34,446.46,256ZM317.89,256,86.22,34,65.54,55.57,274.7,256,65.54,456.43,86.22,478Z"
    fill="white" />
  </svg>
  );
}

export default RightArrow;