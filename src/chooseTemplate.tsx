import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import logo from "./images/logo.png";
import image1 from "./images/image.png";
import image2 from "./images/image.svg";
import ellipse47 from "./images/ellipse-47.svg"
import maskGroup from "./images/mask-group1.png";
import maskGroup1 from "./images/mask-group2.png";

// Template interface for type safety
interface Template {
  id: string;
  name: string;
  description: string;
  attributes: {
    size: string;
    purpose: string;
    shape: string;
    keywords: string[];
    color?: string;
  };
  image: string;
}

export const ChooseTemplate: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    size: "",
    purpose: "",
    shape: "",
    color: "",
    keyword: ""
  });

  // Create template data with the first one being unique
  const templateData: Template[] = [
    {
      id: "template-1",
      name: "스마트 미팅 부스",
      description: "소형 · 미팅형 · 1면 오픈 · 모던한 · 직선의 · 복층",
      attributes: {
        size: "소형",
        purpose: "미팅형", 
        shape: "1면 오픈",
        keywords: ["모던한", "직선의", "복층"],
      },
      image: maskGroup
    },
    // Second template
    {
      id: "template-2",
      name: "기본 전시 부스",
      description: "중형 · 전시형 · 2면 오픈 · 깔끔한 · 목재",
      attributes: {
        size: "중형",
        purpose: "전시형",
        shape: "2면 오픈",
        keywords: ["깔끔한", "목재"],
      },
      image: maskGroup1
    },
    // Add more template placeholders
    ...Array(10).fill(null).map((_, i) => ({
      id: `template-${i+3}`,
      name: "템플릿 명",
      description: "크기 · 목적 · 형태 · 키워드",
      attributes: {
        size: i % 3 === 0 ? "소형" : i % 3 === 1 ? "중형" : "대형",
        purpose: i % 3 === 0 ? "미팅형" : i % 3 === 1 ? "전시형" : "미팅+전시형",
        shape: `${(i % 4) + 1}면 오픈`,
        keywords: i % 2 === 0 ? ["모던한", "직선의"] : ["곡선의", "화려한"],
      },
      image: ""
    }))
  ];

  // State for filtered templates
  const [filteredTemplates, setFilteredTemplates] = useState<Template[]>(templateData);


  // State variables for dropdowns
  const [isSizeDropdownVisible, setIsSizeDropdownVisible] = useState(false);
  const [isPurposeDropdownVisible, setIsPurposeDropdownVisible] = useState(false);
  const [isShapeDropdownVisible, setIsShapeDropdownVisible] = useState(false);
  const [isKeywordDropdownVisible, setIsKeywordDropdownVisible] = useState(false);

  // State for selected keywords
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  
  // Keyword options organized by rows for layout
  const keywordRows = [
    ["곡선의", "직선의", "복층", "단층"],
    ["모던한", "비대칭", "깔끔한", "화려한"],
    ["테크", "목재"]
  ];

  // Options for each dropdown
  const sizeOptions = ["소형", "중형", "대형"];
  const purposeOptions = ["미팅형", "전시형", "미팅+전시형"];
  const shapeOptions = ["1면 오픈", "2면 오픈", "3면 오픈", "4면 오픈"];

  // State for modalcomponent
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State for color palette
  const [isColorPaletteVisible, setIsColorPaletteVisible] = useState(false);
  const [colorFilter, setColorFilter] = useState("");

  // Color options
  const colorOptions = [
    '#FF0000','#FF8000','#FFFF00', '#80FF00', 
    '#008000', '#00FFFF','#0000FF','#8000FF', 
    '#FF00FF', '#FFFFFF','#000000',
  ];

  // State for color picker
  const [showColorWheel, setShowColorWheel] = useState(false);

  // Ref for the color wheel element
  const colorWheelRef = useRef<HTMLDivElement>(null);
  const colorWheelButtonRef = useRef<HTMLImageElement>(null);

  // Effect to handle clicks outside the color wheel
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if color wheel is open and the click is outside of it
      if (showColorWheel && 
          colorWheelRef.current && 
          !colorWheelRef.current.contains(event.target as Node) &&
          colorWheelButtonRef.current && 
          !colorWheelButtonRef.current.contains(event.target as Node)) {
        setShowColorWheel(false);
      }
    };

    // Add event listener when color wheel is shown
    if (showColorWheel) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Clean up the event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showColorWheel]);

  // Search functionality - filter templates based on search term and filters
  useEffect(() => {
    const filtered = templateData.filter(template => {
      // Search by term in name or description
      const matchesSearchTerm = !searchTerm || 
        template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Filter by size
      const matchesSize = !filters.size || template.attributes.size === filters.size;
      
      // Filter by purpose
      const matchesPurpose = !filters.purpose || template.attributes.purpose === filters.purpose;
      
      // Filter by shape
      const matchesShape = !filters.shape || template.attributes.shape === filters.shape;
      
      // Filter by color (not implemented in the template data yet)
      const matchesColor = !colorFilter;
      
      // Filter by selected keywords
      const matchesKeywords = selectedKeywords.length === 0 || 
        selectedKeywords.every(kw => template.attributes.keywords.includes(kw));
      
      return matchesSearchTerm && matchesSize && matchesPurpose && matchesShape && matchesColor && matchesKeywords;
    });
    
    setFilteredTemplates(filtered);
  }, [searchTerm, filters, selectedKeywords, colorFilter]);


  // Function to handle custom color selection
  const handleCustomColorSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColorFilter(e.target.value);
  };
  

  // Function to handle color selection
  const handleColorSelect = (color: string) => {
    setColorFilter(color);
    setIsColorPaletteVisible(false);
  };

  // Function to toggle keyword selection
  const handleKeywordToggle = (keyword: string) => {
    setSelectedKeywords(prev => {
      // If already selected, remove it
      if (prev.includes(keyword)) {
        return prev.filter(kw => kw !== keyword);
      } 
      // Otherwise add it
      else {
        return [...prev, keyword];
      }
    });
  };

  // Function to close all dropdowns when clicking outside
  const closeAllDropdowns = () => {
    setIsSizeDropdownVisible(false);
    setIsPurposeDropdownVisible(false);
    setIsShapeDropdownVisible(false);
    setIsColorPaletteVisible(false);
    setIsKeywordDropdownVisible(false);
  };

  // Function to handle filter changes
  const handleFilterChange = (filterType: keyof typeof filters, value: string) => {
    // If the same option is clicked again, reset to default (empty string)
    if (filters[filterType] === value) {
      setFilters(prev => ({
        ...prev,
        [filterType]: ""
      }));
    } else {
      // Otherwise, set to the selected value
      setFilters(prev => ({
        ...prev,
        [filterType]: value
      }));
    }
    
    // Close the dropdown after selection
    if (filterType === 'size') setIsSizeDropdownVisible(false);
    if (filterType === 'purpose') setIsPurposeDropdownVisible(false);
    if (filterType === 'shape') setIsShapeDropdownVisible(false);
  };
  
  const handleSearch = () => {
    console.log("Searching for:", searchTerm);
    // Implement search functionality
  };

  const [selectedTemplateForModal, setSelectedTemplateForModal] = useState<Template | null>(null);
  const navigate = useNavigate();

  // Function to handle the template selection
  const handleStartWithTemplate = (templateId?: string) => {
    // Close the modal if it's open
    setIsModalOpen(false);
    
    // Pass the selected template ID or data if needed
    navigate('/edit-template', { 
      state: { templateId: templateId || 'default'} 
    });
  };


  const handleTemplateClick = (template: Template) => {
    console.log("Template selected");
    setSelectedTemplateForModal(template);
    setIsModalOpen(true);
  };

  return (
    // Full width container with centered content
    <div className="flex justify-center w-full min-h-screen bg-white font-sans" onClick={closeAllDropdowns}>
      {/* Fixed width container that's centered */}
      <div className="relative w-full max-w-[1440px]">
        {/* Header section with gradient background */}
        <div className="w-full h-[432px]">
          {/* Header with logo */}
          <div className="flex w-full items-center justify-between px-[60px] py-[30px]">
            <div className="flex items-center space-x-2">
              <img
                className="h-6"
                alt="Logo"
                src={logo}
              />
            </div>
            <div className="relative w-6 h-6 bg-[#1662ef] rounded-xl" />
          </div>

          {/* Main heading */}
          <div className="flex justify-center mt-16">
            <div className="inline-flex items-center gap-2.5">
              <img
                className="w-[121.65px] h-[30px]"
                alt="Group"
                src={logo}
              />
              <h1 className="font-semibold text-[#545d6c] text-[32px] leading-8 whitespace-nowrap">
                템플릿과 함께 더욱 쉽고 빠르게 부스를 디자인 해보세요!
              </h1>
            </div>
          </div>

          {/* Feature cards - Updated with #e2edff background and bolder border */}
          <div className="flex justify-center mt-16 space-x-4">
            <div className="inline-flex flex-col items-center justify-center gap-2.5 px-6 py-5 rounded-[10px] bg-[#e2edff] border-1 shadow-md"> 
              <div className="inline-flex flex-col items-center gap-3.5">
                <img className="w-9 h-9" alt="Search icon" src={image1} />
                <div className="inline-flex flex-col items-start gap-1">
                  <p className="self-stretch font-semibold text-xs text-center leading-3">
                    <span className="text-[#1662ef]">검색 필터</span>
                    <span className="text-[#000000]">
                      를 통해
                      <br />
                    </span>
                  </p>
                  <p className="self-stretch font-semibold text-xs text-center leading-3">
                    <span className="text-[#000000]">
                      원하는 템플릿을 찾아보세요!
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="inline-flex flex-col items-center justify-center gap-2.5 px-6 py-5 rounded-[10px] bg-[#e2edff] border-1 shadow-md">
              <div className="inline-flex flex-col items-center gap-3.5">
                <img className="w-9 h-9" alt="Template icon" src={image2} />
                <div className="inline-flex flex-col items-start gap-1">
                  <p className="self-stretch font-semibold text-xs text-center leading-3">
                    <span className="text-[#000000]">
                      템플릿을 통해
                      <br />
                    </span>
                  </p>
                  <p className="self-stretch font-semibold text-xs text-center leading-3">
                    <span className="text-[#1662ef]">초심자도 편리한</span>
                    <span className="text-[#000000]"> 부스 디자인!</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter and search section */}
        <div className="px-[60px] mt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Size Filter with Dropdown */}
              <div className="relative">
                <button 
                  className="inline-flex items-center gap-2 px-[13px] py-3 bg-white rounded-lg border border-solid border-[#bbc4d0] hover:bg-gray-50 transition"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsSizeDropdownVisible(!isSizeDropdownVisible);
                    setIsPurposeDropdownVisible(false);
                    setIsShapeDropdownVisible(false);
                    setIsColorPaletteVisible(false);
                  }}
                >
                  <span className="text-[#000000] text-sm whitespace-nowrap">
                    {filters.size || "크기"}
                  </span>
                  <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.5 4.5L6 8L2.5 4.5" stroke="#606E7E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                
                {/* Size dropdown menu */}
                {isSizeDropdownVisible && (
                  <div className="absolute bottom-full left-0 mb-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-50" onClick={(e) => e.stopPropagation()}>
                    <ul className="py-1">
                      {sizeOptions.map((option) => (
                        <li key={option}>
                          <button
                            className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${filters.size === option ? 'bg-blue-50 text-blue-600' : ''}`}
                            onClick={() => handleFilterChange('size', option)}
                          >
                            {option}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
              {/* Purpose Filter with Dropdown */}
              <div className="relative">
                <button 
                  className="inline-flex items-center gap-2 px-[13px] py-3 bg-white rounded-lg border border-solid border-[#bbc4d0] hover:bg-gray-50 transition"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsPurposeDropdownVisible(!isPurposeDropdownVisible);
                    setIsSizeDropdownVisible(false);
                    setIsShapeDropdownVisible(false);
                    setIsColorPaletteVisible(false);
                  }}
                >
                  <span className="text-[#000000] text-sm whitespace-nowrap">
                    {filters.purpose || "목적"}
                  </span>
                  <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.5 4.5L6 8L2.5 4.5" stroke="#606E7E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                
                {/* Purpose dropdown menu */}
                {isPurposeDropdownVisible && (
                  <div className="absolute bottom-full left-0 mb-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-50" onClick={(e) => e.stopPropagation()}>
                    <ul className="py-1">
                      {purposeOptions.map((option) => (
                        <li key={option}>
                          <button
                            className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${filters.purpose === option ? 'bg-blue-50 text-blue-600' : ''}`}
                            onClick={() => handleFilterChange('purpose', option)}
                          >
                            {option}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
              {/* Shape Filter with Dropdown */}
              <div className="relative">
                <button 
                  className="inline-flex items-center gap-2 px-[13px] py-3 bg-white rounded-lg border border-solid border-[#bbc4d0] hover:bg-gray-50 transition"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsShapeDropdownVisible(!isShapeDropdownVisible);
                    setIsSizeDropdownVisible(false);
                    setIsPurposeDropdownVisible(false);
                    setIsColorPaletteVisible(false);
                  }}
                >
                  <span className="text-[#000000] text-sm whitespace-nowrap">
                    {filters.shape || "형태"}
                  </span>
                  <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.5 4.5L6 8L2.5 4.5" stroke="#606E7E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                
                {/* Shape dropdown menu */}
                {isShapeDropdownVisible && (
                  <div className="absolute bottom-full left-0 mb-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-50" onClick={(e) => e.stopPropagation()}>
                    <ul className="py-1">
                      {shapeOptions.map((option) => (
                        <li key={option}>
                          <button
                            className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${filters.shape === option ? 'bg-blue-50 text-blue-600' : ''}`}
                            onClick={() => handleFilterChange('shape', option)}
                          >
                            {option}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
              {/* Color Filter with Color Palette */}
              <div className="relative">
                <button 
                  className="inline-flex items-center gap-2 px-[13px] py-3 bg-white rounded-lg border border-solid border-[#bbc4d0] hover:bg-gray-50 transition"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsColorPaletteVisible(!isColorPaletteVisible);
                    setIsSizeDropdownVisible(false);
                    setIsPurposeDropdownVisible(false);
                    setIsShapeDropdownVisible(false);
                  }}
                >
                  {colorFilter ? (
                    <div className="w-5 h-5 rounded-full" style={{ background: colorFilter }}></div>
                  ) : (
                    <span className="text-[#000000] text-sm whitespace-nowrap">색상</span>
                  )}
                  <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.5 4.5L6 8L2.5 4.5" stroke="#606E7E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                
                {/* Color palette dropdown*/}
                 {isColorPaletteVisible && (
                  <div className="absolute bottom-full left-0 mb-2 p-3 bg-white rounded-lg shadow-lg border border-gray-200 z-50 w-[200px]" onClick={(e) => e.stopPropagation()}>
                    <div className="grid grid-cols-6 gap-2 mb-3">
                      {colorOptions.map((color) => (
                        <button
                          key={color}
                          className={`w-5 h-5 rounded-[10px] border ${colorFilter === color ? 'border-black border-2' : color === '#FFFFFF' ? 'border-[0.5px] border-solid border-[#bbc4d0e6]' : 'border-[0.5px]'}`}
                          style={{ background: color, borderColor: color !== '#FFFFFF' ? `${color}99` : '' }}
                          onClick={() => handleColorSelect(color)}
                        />
                      ))}
                      
                      {/* Color wheel toggle with ref */}
                      <div className="relative">
                        <img 
                          ref={colorWheelButtonRef}
                          className="w-5 h-5 cursor-pointer"
                          alt="Color wheel" 
                          src={ellipse47}
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowColorWheel(!showColorWheel);
                          }}
                        />
                        
                        {/* Color wheel popup with ref */}
                        {showColorWheel && (
                          <div 
                            ref={colorWheelRef}
                            className="absolute top-7 right-0 p-3 bg-white rounded-lg shadow-lg border border-gray-200 z-50 w-40"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className="flex flex-col items-center gap-2">
                              <input 
                                type="color" 
                                value={colorFilter || "#000000"}
                                onChange={handleCustomColorSelect}
                                className="w-full h-24 cursor-pointer"
                              />
                              <div className="text-xs text-gray-600">
                                {colorFilter || "#000000"}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Keyword Filter */}
              <div className="relative">
                <button 
                  className={`inline-flex items-center justify-between w-[100px] h-[46px] px-[13px] py-3 bg-white rounded-lg border border-solid ${selectedKeywords.length > 0 ? 'border-[#1662F0]' : 'border-[#bbc4d0]'} hover:bg-gray-50 transition`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsKeywordDropdownVisible(!isKeywordDropdownVisible);
                    setIsSizeDropdownVisible(false);
                    setIsPurposeDropdownVisible(false);
                    setIsShapeDropdownVisible(false);
                    setIsColorPaletteVisible(false);
                  }}
                >
                  <div className="flex items-center gap-1 overflow-hidden">
                    {selectedKeywords.length > 0 ? (
                      <div className="flex items-center gap-1 overflow-hidden">
                        {selectedKeywords.slice(0, 1).map((keyword) => (
                          <div 
                            key={keyword}
                            className="inline-flex items-center justify-center px-1.5 py-0.5 bg-white rounded-full border border-solid border-black text-xs truncate max-w-[60px]"
                          >
                            {keyword}
                          </div>
                        ))}
                        {selectedKeywords.length > 1 && (
                          <span className="text-xs text-gray-500">+{selectedKeywords.length - 1}</span>
                        )}
                      </div>
                    ) : (
                      <span className="text-[#000000] text-sm whitespace-nowrap">키워드</span>
                    )}
                  </div>
                  <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.5 4.5L6 8L2.5 4.5" stroke="#606E7E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                
                {/* Keyword dropdown menu - positioned to the right */}
                {isKeywordDropdownVisible && (
                  <div 
                    className="absolute top-0 left-full ml-2 p-3 bg-white rounded-lg shadow-lg border border-gray-200 z-50 w-[246px]" 
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex flex-col items-start gap-1.5 self-stretch w-full">
                      {keywordRows.map((row, rowIndex) => (
                        <div key={rowIndex} className="flex items-center gap-1 w-full flex-wrap">
                          {row.map(keyword => (
                            <button
                              key={keyword}
                              className={`inline-flex items-center justify-center px-2.5 py-2 bg-white rounded-full border border-solid ${selectedKeywords.includes(keyword) ? 'border-black border-1' : 'border-[#bbc4d0]'} min-w-[60px] h-[28px] mb-1`}
                              onClick={() => handleKeywordToggle(keyword)}
                            >
                              <div className="text-xs text-[#000000] whitespace-nowrap">
                                {keyword}
                              </div>
                            </button>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* Search bar*/}
            <div className="w-[510px]">
              <div className="flex w-full items-center justify-between px-[13px] py-3 bg-white rounded-lg border border-solid border-[#bbc4d0]">
                <input
                  type="text"
                  className="w-full text-sm outline-none"
                  placeholder="원하는 검색어를 입력해 주세요."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <button onClick={handleSearch}>
                  <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.41667 11.0833C8.994 11.0833 11.0833 8.994 11.0833 6.41667C11.0833 3.83934 8.994 1.75 6.41667 1.75C3.83934 1.75 1.75 3.83934 1.75 6.41667C1.75 8.994 3.83934 11.0833 6.41667 11.0833Z" stroke="#606E7E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12.25 12.25L9.71252 9.71246" stroke="#606E7E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Template Grid */}
        <div className="px-[60px] mt-8">
          {filteredTemplates.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <p className="text-lg text-gray-500">검색 결과가 없습니다.</p>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setFilters({size: "", purpose: "", shape: "", color: "", keyword: ""});
                  setSelectedKeywords([]);
                  setColorFilter("");
                }}
                className="mt-4 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition"
              >
                필터 초기화
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-6">
              {filteredTemplates.map((template) => (
                <div key={template.id} className="flex flex-col w-full items-start gap-2.5 group">
                  <div className="relative w-full h-[181px] overflow-hidden rounded-lg">
                    {template.image ? (
                      <img
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        alt="Template preview"
                        src={template.image}
                      />
                    ) : (
                      <div className="w-full h-full bg-[#d9d9d9] flex items-center justify-center">
                        {/* Placeholder for templates without images */}
                      </div>
                    )}
                    
                    {/* Overlay that appears on hover */}
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center">
                      <div className="flex flex-col w-[190px] items-start gap-2.5">
                        <button 
                          onClick={() => handleTemplateClick(template)}
                          className="flex items-center justify-center gap-2.5 px-[22px] py-4 w-full bg-[#1662ef] rounded-[99999px] border border-solid hover:bg-[#1255d4] transition-colors"
                        >
                          <span className="text-white text-sm whitespace-nowrap">
                            이 템플릿으로 시작하기
                          </span>
                        </button>

                        <button 
                          onClick={() => handleTemplateClick(template)}
                          className="flex items-center justify-center gap-2.5 px-[22px] py-4 w-full bg-[#000000cc] rounded-[99999px] border border-solid border-[#000000] hover:bg-black transition-colors"
                        >
                          <span className="text-white text-sm whitespace-nowrap">
                            자세히 보기
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-start gap-1.5 w-full">
                    <div className="font-semibold text-[#000000] text-base">
                      {template.name}
                    </div>
                    <p className="text-[#606e7e] text-xs">
                      {template.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Add some bottom padding */}
        <div className="h-[100px]"></div>
      </div>
      {/* Modal Overlay */}
      {isModalOpen && (
      <div 
        className="fixed inset-0 bg-[#4B5056] bg-opacity-50 flex items-center justify-center z-50"
        onClick={() => setIsModalOpen(false)}
      >
        <div onClick={(e) => e.stopPropagation()}>
          {/* Frame Component */}
          <div className="flex flex-col w-[760px] items-center gap-3.5 pt-0 pb-6 px-0 relative bg-white rounded-2xl shadow-xl">
            <div className="flex flex-col items-start px-5 py-0 relative self-stretch w-full flex-[0_0_auto]">
              <div className="flex items-center justify-between px-2.5 py-[22px] relative self-stretch w-full flex-[0_0_auto]">
                <div className="inline-flex items-center gap-2 relative flex-[0_0_auto]">
                  <div className="w-fit mt-[-1.00px] font-semibold text-[#1662ef] text-xl text-left leading-5 whitespace-nowrap relative tracking-[0]">
                    템플릿 상세정보
                  </div>
                </div>

                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="relative w-5 h-5 flex items-center justify-center"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 5L5 15M5 5L15 15" stroke="#606E7E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>

              <div className="relative self-stretch w-full h-px bg-gray-200"></div>
            </div>

            <div className="flex w-[700px] items-center gap-6 relative flex-[0_0_auto]">
              <div className="flex flex-col w-[430px] h-[310.28px] items-end justify-end gap-2.5 p-2.5 relative rounded-lg bg-cover bg-center" style={{ backgroundImage: `url(${maskGroup1})` }}>
                <div className="inline-flex items-center gap-1.5 relative flex-[0_0_auto]">
                  <div className="bg-[#0040f2] relative w-5 h-5 rounded-[10px]" />
                  <div className="bg-white border-[0.5px] border-solid border-[#bbc4d0e6] relative w-5 h-5 rounded-[10px]" />
                </div>
              </div>

              <div className="flex flex-col items-start gap-5 relative flex-1 grow">
                <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
                  <div className="flex flex-col items-start gap-5 relative self-stretch w-full flex-[0_0_auto]">
                    <div className="flex flex-col items-start gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
                      <div className="inline-flex items-center gap-2 relative flex-[0_0_auto]">
                        <div className="inline-flex items-center justify-center gap-2.5 px-2.5 py-2 relative flex-[0_0_auto] bg-white rounded-full border border-solid border-[#bbc4d0]">
                          <div className="relative w-fit mt-[-1.00px] text-xs text-[#000000] whitespace-nowrap">
                            곡선의
                          </div>
                        </div>

                        <div className="inline-flex items-center justify-center gap-2.5 px-2.5 py-2 relative flex-[0_0_auto] bg-white rounded-full border border-solid border-[#bbc4d0]">
                          <div className="relative w-fit mt-[-1.00px] text-xs text-[#000000] whitespace-nowrap">
                            모던한
                          </div>
                        </div>
                      </div>

                      <div className="self-stretch font-medium text-base text-[#000000]">
                        템플릿 명
                      </div>
                    </div>

                    <div className="flex flex-col items-start justify-center gap-3 pt-0 pb-2.5 px-0 relative self-stretch w-full flex-[0_0_auto]">
                      <p className="relative self-stretch mt-[-1.00px] text-sm">
                        <span className="text-[#959dae]">면적:</span>
                        <span className="text-[#000000]"> 108sqm (소형)</span>
                      </p>

                      <p className="relative self-stretch text-sm">
                        <span className="text-[#959dae]">구조: </span>
                        <span className="text-[#000000]">곡선형 리깅 · 타워</span>
                      </p>

                      <p className="relative self-stretch text-sm">
                        <span className="text-[#959dae]">플랫폼 높이: </span>
                        <span className="text-[#000000]">5cm</span>
                      </p>

                      <p className="relative self-stretch text-sm">
                        <span className="text-[#959dae]">경사로:</span>
                        <span className="text-[#000000]"> 2개, 경사도 1/12</span>
                      </p>

                      <p className="relative self-stretch text-sm">
                        <span className="text-[#959dae]">가구:</span>
                        <span className="text-[#000000]"> 의자(4), 테이블(1), 카운터(1)</span>
                      </p>
                    </div>
                  </div>
                </div>

                <button 
                  className="flex items-center justify-center gap-2.5 px-[22px] py-[15px] relative self-stretch w-full flex-[0_0_auto] bg-[#1662ef] rounded-[99999px] hover:bg-[#1255d4] transition-colors"
                  onClick={() => handleStartWithTemplate('template-id-here')}
                >
                  <div className="w-fit mt-[-1.00px] font-medium text-sm text-white whitespace-nowrap">
                    이 템플릿으로 시작하기
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}
    </div>
  );
};
