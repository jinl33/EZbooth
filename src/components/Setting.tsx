// src/components/Setting.tsx
import React from "react";

interface SettingProps {
  className?: string;
  onClick?: () => void;
}

export const Setting: React.FC<SettingProps> = ({ className = "", onClick }) => {
  return (
    <button 
      className={`relative w-fit mt-[-1.00px] font-14-mideum font-[number:var(--14-mideum-font-weight)] text-[#141414] text-[length:var(--14-mideum-font-size)] tracking-[var(--14-mideum-letter-spacing)] leading-[var(--14-mideum-line-height)] whitespace-nowrap [font-style:var(--14-mideum-font-style)]`}
      onClick={onClick}
    >
      <div className="inline-flex items-center gap-1">
        {/* Gear Icon */}
        <svg 
          className="w-3.5 h-3.5" 
          viewBox="0 0 14 14" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M7 9.1C8.1 9.1 9 8.2 9 7.1C9 6 8.1 5.1 7 5.1C5.9 5.1 5 6 5 7.1C5 8.2 5.9 9.1 7 9.1Z" 
            stroke="#141414" 
            strokeWidth="1.2"
          />
          <path 
            d="M11.5 7.1C11.5 6.9 11.5 6.7 11.4 6.5L12.8 5.4C13 5.2 13 5 12.9 4.8L11.7 2.8C11.6 2.6 11.4 2.5 11.2 2.6L9.6 3.2C9.3 3 9 2.8 8.6 2.7L8.4 1C8.4 0.8 8.2 0.6 8 0.6H5.6C5.4 0.6 5.2 0.8 5.2 1L5 2.7C4.6 2.8 4.3 3 4 3.2L2.4 2.6C2.2 2.5 2 2.6 1.9 2.8L0.7 4.8C0.6 5 0.6 5.2 0.8 5.4L2.2 6.5C2.2 6.7 2.1 6.9 2.1 7.1C2.1 7.3 2.1 7.5 2.2 7.7L0.8 8.8C0.6 9 0.6 9.2 0.7 9.4L1.9 11.4C2 11.6 2.2 11.7 2.4 11.6L4 11C4.3 11.2 4.6 11.4 5 11.5L5.2 13.2C5.2 13.4 5.4 13.6 5.6 13.6H8C8.2 13.6 8.4 13.4 8.4 13.2L8.6 11.5C9 11.4 9.3 11.2 9.6 11L11.2 11.6C11.4 11.7 11.6 11.6 11.7 11.4L12.9 9.4C13 9.2 13 9 12.8 8.8L11.4 7.7C11.5 7.5 11.5 7.3 11.5 7.1Z" 
            stroke="#141414" 
            strokeWidth="1.2"
          />
        </svg>
      </div>
    </button>
  );
};
