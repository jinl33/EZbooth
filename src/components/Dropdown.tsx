// src/components/Dropdown.tsx
import React from "react";

interface DropdownProps {
  label?: string;  // Make label optional
  value?: string;
  color?: string;
  onClick?: () => void;
  className?: string;  // Add className prop
}

export const Dropdown: React.FC<DropdownProps> = ({ 
  label, 
  value, 
  color = "#888484", 
  onClick,
  className = ""  // Default to empty string
}) => {
  return (
    <div className="flex items-center justify-between p-5.5 relative self-stretch w-full flex-[0_0_auto]">
      {label && (
        <div className="relative w-fit mt-[-1.00px] font-16-regular text-[#000000] whitespace-nowrap">
          {label}
        </div>
      )}
      <svg 
        className={`w-4 h-4 ${className}`} 
        viewBox="0 0 16 16" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        onClick={onClick}
      >
        <path 
          d="M4 6L8 10L12 6" 
          stroke={color} 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
