// src/components/Export.tsx
import React, { useState } from 'react';
import symbol from '../images/symbol1.png';

type Tab = 'document' | 'format' | '3d';
type FileSize = '고급' | '중간' | '기본';
type FileFormat = '.PDF' | '.DOCX' | '.TXT';

interface DropdownProps {
  options: string[];
  selectedOption: string;
  onSelect: (option: string) => void;
  label: string;
}

const Dropdown: React.FC<DropdownProps> = ({ options, selectedOption, onSelect, label }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full mb-5">
      <div className="text-sm text-gray-500 mb-2">{label}</div>
      <div 
        className="w-full py-3 px-4 rounded-[10px] border border-gray-200 bg-white text-sm flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedOption}</span>
        <svg 
          width="12" 
          height="12" 
          viewBox="0 0 12 12" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
        >
          <path 
            d="M9 4.5L6 7.5L3 4.5" 
            stroke="#888484" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white rounded-b-[10px] border border-t-0 border-gray-200 shadow-md mt-0 z-10">
          {options.map((option) => (
            <div 
              key={option}
              className="px-4 py-3 text-sm cursor-pointer hover:bg-gray-100"
              onClick={() => {
                onSelect(option);
                setIsOpen(false);
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const Export: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<Tab>('document');
  const [fileSize, setFileSize] = useState<FileSize>('고급');
  const [fileFormat, setFileFormat] = useState<FileFormat>('.PDF');
  const [includeOption, setIncludeOption] = useState(false);
  
  const tabs = [
    { id: 'document', label: '검색서' },
    { id: 'format', label: '제안서' },
    { id: 'file', label: '3D 파일' }
  ];
  
  const fileSizeOptions: FileSize[] = ['고급', '중간', '기본'];
  const fileFormatOptions: FileFormat[] = ['.PDF', '.DOCX', '.TXT'];
  
  const handleExport = () => {
    alert(`Exporting file:
    - Format: ${fileFormat}
    - Size: ${fileSize}
    - Include option: ${includeOption ? 'Yes' : 'No'}`);
  };
  
  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      alert('Dialog closed');
    }
  };
  
  return (
    <div className="absolute left-1/2 transform -translate-x-1/4 -translate-y-1/5 bg-white rounded-xl shadow- w-80 p-4 mr-50">
      {/* Tab Bar */}
      <div className="flex mb-6 border-b border-gray-200">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`px-4 py-2 mr-2 cursor-pointer text-sm font-medium ${
              activeTab === tab.id ? 'text-blue-500 border-b-2 border-blue-500' : ''
            }`}
            onClick={() => setActiveTab(tab.id as Tab)}
          >
            {tab.label}
          </div>
        ))}
        <div className="ml-auto cursor-pointer text-gray-500 text-base" onClick={handleClose}>
          ✕
        </div>
      </div>
      
      {/* File Size Dropdown */}
      <Dropdown
        label="파일 크기"
        options={fileSizeOptions}
        selectedOption={fileSize}
        onSelect={(option) => setFileSize(option as FileSize)}
      />
      
      {/* File Format Dropdown */}
      <Dropdown
        label="파일 형식"
        options={fileFormatOptions}
        selectedOption={fileFormat}
        onSelect={(option) => setFileFormat(option as FileFormat)}
      />
      
      {/* Checkbox Option */}
      <div className="mb-5">
        <div className="text-sm text-gray-500 mb-2">재료포</div>
        <div className="flex items-center mt-2" onClick={() => setIncludeOption(!includeOption)}>
          <div className={`w-5 h-5 border border-gray-200 rounded cursor-pointer relative mr-2 ${
            includeOption ? 'bg-blue-500 border-blue-500' : ''
          }`}>
            {includeOption && (
              <span className="absolute inset-0 flex items-center justify-center text-white">✓</span>
            )}
          </div>
          <div className="text-sm">전적서에 재료포 포함하기</div>
        </div>
      </div>
      
      {/* Preview Button */}
      <div className="mb-5">
        <div className="text-sm text-gray-500 mb-2">프리뷰</div>
        <button 
          className="w-[100px] px-4 py-2 rounded-full border border-gray-400 bg-white text-sm text-blue-500 font-medium cursor-pointer hover:bg-gray-50"
        >
          Open
        </button>
      </div>
      
      {/* Export Button */}
      <div className="flex justify-center mt-4">
        <button 
          className="w-[275px] h-[50px] bg-[#1662ef] rounded-[25px] border-none text-white text-base font-medium cursor-pointer flex items-center justify-center gap-2 hover:bg-[#0d4bbf]"
          onClick={handleExport}
        >
          <img className="w-[13px] h-[13px]" alt="Logo" src={symbol} />
          Export
        </button>
      </div>
    </div>
  );
};

export default Export;