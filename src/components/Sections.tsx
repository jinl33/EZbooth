// src/components/Sections.tsx
import React from "react";
import { Dropdown } from "./Dropdown";

interface SectionsProps {
  title: string;
  isExpanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

export const Sections: React.FC<SectionsProps> = ({ 
  title, 
  isExpanded, 
  onToggle, 
  children 
}) => {
  return (
    <div className="flex flex-col items-start relative self-stretch w-full">
      <div className="flex flex-col h-9 items-center justify-between relative self-stretch w-full">
        <Dropdown 
          label={title} 
          onClick={onToggle}
        />
        {isExpanded && children}
      </div>
    </div>
  );
};
