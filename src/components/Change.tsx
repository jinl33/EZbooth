// src/components/Change.tsx
import React from "react";

interface ChangeProps {
  color?: string;
  className?: string;
}

export const Change: React.FC<ChangeProps> = ({ color = "#1662F0", className = "" }) => {
  return (
    <svg 
      className={className}
      width="8" 
      height="8" 
      viewBox="0 0 8 8" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M4 0L4.94281 2.85719L8 3.33688L6 5.57584L6.47214 8L4 6.85719L1.52786 8L2 5.57584L0 3.33688L3.05719 2.85719L4 0Z" 
        fill={color}
      />
    </svg>
  );
};
