// src/EditTemplate.tsx
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Dropdown } from "./components/Dropdown";
import { Regulation } from "./components/Regulation";
import { TabNavigation } from "./components/TabNavigation";
import { Export } from "./components/Export";

// Import available images
import symbol from "./images/symbol.png";
import symbol1 from "./images/symbol1.png";
import line2 from "./images/line-2.svg";
import line3 from "./images/line-3.svg";
import line4 from "./images/line-4.svg";
import line6 from "./images/line-6.svg"; 
import vector61 from "./images/vector-61.svg";
import vector62 from "./images/vector-62.png";
import vector39 from "./images/vector-39.svg";
import image92 from "./images/image92.png";
import image96 from "./images/image96.png";
import image88 from "./images/image88.png";

export const EditTemplate: React.FC = () => {
  // State for title
  const [projectName, setProjectName] = useState("프로젝트 명");

  // State for export button
  const [showExportModal, setShowExportModal] = useState(false);

  // State for active tab
  const [activeTab, setActiveTab] = useState('구조');
  // State for unit
  const [unit, setUnit] = useState<'ft' | 'm'>('ft');
  
  // State for dimension changes
  const [dimensions, setDimensions] = useState({
    width: "2000mm",
    height: "3000mm",
    thickness: "250mm"
  });

  // State for furniture section
  const [expandedFurnitureSections, setExpandedFurnitureSections] = useState({
    set: true,
    individual: false
  });

  // State for wall section
  const [selectedWall, setSelectedWall] = useState('Wall 1');
  const [showWallSelectionOptions, setShowWallSelectionOptions] = useState(false);
  const wallOptions = ['Wall 1', 'Wall 2', 'Wall 3', 'Wall 4'];

  // State for tracking selected materials
  const [selectedMaterials, setSelectedMaterials] = useState({
    carpet: '',
    laminate: '',
    edgeMolding: '',
    wallPaint: '',
    woodenFloor: ''
  });

  // State for tracking expanded material sections
  const [expandedMaterialSections, setExpandedMaterialSections] = useState({
    carpet: false, 
    laminate: false,
    edgeMolding: false,
    wallPaint: false,
    woodenFloor: false
  });

  // Toggle material section expansion
  const toggleMaterialSection = (section: keyof typeof expandedMaterialSections) => {
    setExpandedMaterialSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Handle material selection
  const handleMaterialSelect = (category: string, id: string) => {
    setSelectedMaterials(prev => ({
      ...prev,
      [category]: id
    }));
  };
  
  // Function to toggle furniture section expansion
  const toggleFurnitureSection = (section: keyof typeof expandedFurnitureSections) => {
    setExpandedFurnitureSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  
  const updateDimension = (dimension: 'width' | 'height' | 'thickness', value: string) => {
    setDimensions(prev => ({
      ...prev,
      [dimension]: value
    }));
  };  

  // Handle unit conversion
  const toggleUnit = () => {
    setUnit(unit === 'ft' ? 'm' : 'ft');
    
    // Convert all dimensions
    setDimensions({
      width: convertUnit(dimensions.width),
      height: convertUnit(dimensions.height),
      thickness: convertUnit(dimensions.thickness)
    });
  };

  const convertUnit = (value: string) => {
    const match = value.match(/^([\d.]+)(\w+)$/);
    if (!match) return value;
    
    const [, numStr, unitStr] = match;
    const num = parseFloat(numStr);
    
    if (unit === 'ft' && unitStr.toLowerCase() === 'mm') {
      // Convert mm to ft
      return `${(num / 304.8).toFixed(2)}ft`;
    } else if (unit === 'm' && unitStr.toLowerCase() === 'ft') {
      // Convert ft to mm
      return `${(num * 304.8).toFixed(0)}mm`;
    }
    
    return value;
  };

  // Wall configuration states
  const [wallConfig, setWallConfig] = useState('1면 오픈');
  const [wallSelection1, setWallSelection1] = useState('전체벽');
  const [wallSelection2, setWallSelection2] = useState('전체벽');
  const [showWallConfigOptions, setShowWallConfigOptions] = useState(false);
  const [showWallSelection1Options, setShowWallSelection1Options] = useState(false);
  const [showWallSelection2Options, setShowWallSelection2Options] = useState(false);

  // Wall configuration options
  const wallConfigOptions = ['1면 오픈', '2면 오픈', '3면 오픈', '4면 오픈'];
  const wallSelectionOptions = ['전체벽', 'wall 1', 'wall 2', 'wall 3'];

  // Wall curve state
  const [wallCurveValue, setWallCurveValue] = useState(60); // Starting at 60%

  // Add these functions to your component
  const handleSliderClick = (e: { currentTarget: any; clientX: number; }) => {
    const sliderTrack = e.currentTarget;
    const rect = sliderTrack.getBoundingClientRect();
    
    // Calculate percentage (0-100)
    let percentage = ((e.clientX - rect.left) / rect.width) * 100;
    percentage = Math.max(0, Math.min(100, percentage));
    
    setWallCurveValue(percentage);
  };

  const startSliderDrag = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    
    const handleMove = (moveEvent: { clientX: number; }) => {
      const sliderTrack = document.getElementById('wall-curve-track');
      if (!sliderTrack) return;
      
      const rect = sliderTrack.getBoundingClientRect();
      
      // Calculate percentage (0-100)
      let percentage = ((moveEvent.clientX - rect.left) / rect.width) * 100;
      percentage = Math.max(0, Math.min(100, percentage));
      
      setWallCurveValue(percentage);
    };
    
    const endDrag = () => {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', endDrag);
    };
    
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', endDrag);
  };

  // State for regulation modal
  const [showRegulationModal, setShowRegulationModal] = useState(true);
  const [selectedExhibition, setSelectedExhibition] = useState("박람회 A - 대한민국, 서울, 코엑스");
  const [selectedHall, setSelectedHall] = useState("Hall A");
  const [showExhibitionOptions, setShowExhibitionOptions] = useState(false);
  const [showHallOptions, setShowHallOptions] = useState(false);

  // Exhibition and hall options
  const exhibitionOptions = [
    "박람회 A - 대한민국, 서울, 코엑스",
    "박람회 B - 대한민국, 부산, 벡스코",
    "박람회 C - 미국, 라스베가스, CES"
  ];
  const hallOptions = ["Hall A", "Hall B", "Hall C", "Hall D"];

  // Handlers for selecting exhibition and hall
  const handleRegulationApply = () => {
    setShowRegulationModal(false);
  };

  // State for rigging type
  const [riggingType, setRiggingType] = useState("리깅 종류 선택");
  const [showRiggingOptions, setShowRiggingOptions] = useState(false);
  const [riggingDimensions, setRiggingDimensions] = useState({
    th: "250mm",  // T.h (Tower height)
    rh: "2000mm", // R.h (Rigging height)
    htob: "3000mm" // HtoB (Height to Bottom)
  });

  // Rigging options
  const riggingOptions = ["기본 리깅", "곡선형 리깅", "타워형 리깅", "혼합형 리깅"];

  // Handlers for selecting rigging type and updating dimensions
  const updateRiggingDimension = (dimension: 'th' | 'rh' | 'htob', value: string) => {
    setRiggingDimensions(prev => ({
      ...prev,
      [dimension]: value
    }));
  };

  // State for rigging enabled
  const [isRiggingEnabled, setIsRiggingEnabled] = useState(true);

  // Handler for toggling rigging enabled
  const toggleRigging = (e: { stopPropagation: () => void; }) => {
    e.stopPropagation(); // Prevent triggering the section expansion
    setIsRiggingEnabled(!isRiggingEnabled);
  };

  const location = useLocation();
  const templateId = location.state?.templateId;

  // Load template data based on templateId
  React.useEffect(() => {
    if (templateId) {
      // Fetch template data or load from cache
      console.log(`Loading template ${templateId}`);
    }
  }, [templateId]);

  // State for sections
  const [expandedSections, setExpandedSections] = useState({
    floor: false,
    pantry: false,
    wall: false,
    rigging: false,
  });

  // Toggle section expansion
  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="relative w-[1440px] h-[920px] bg-white">
      {/* Project Header */}
      <div className="flex w-[334px] items-center gap-[11px] pl-0 pr-[15px] py-0 absolute top-[22px] left-[22px] bg-[#f4f5f6] rounded-2xl">
        <div className="inline-flex items-center gap-2.5 p-[15px] relative flex-[0_0_auto]">
          <img className="relative w-5 h-5" alt="Subtract" src={symbol} />
        </div>
        <input
          className="relative flex-1 font-18-mideum font-[number:var(--18-mideum-font-weight)] text-[#959dae] text-[length:var(--18-mideum-font-size)] tracking-[var(--18-mideum-letter-spacing)] leading-[var(--18-mideum-line-height)] [font-style:var(--18-mideum-font-style)] bg-transparent border-none outline-none"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="프로젝트 명"
        />
      </div>

      {/* Main Editor Panel */}
      <div className="absolute w-[334px] h-[800px] top-[94px] left-[22px] rounded-2xl">
        <div className="relative w-[334px] h-[800px] rounded-2xl">
          {/* Main Content */}
          <div className="inline-flex h-[800px] items-start justify-center gap-2.5 p-2.5 absolute top-0 left-0 bg-white rounded-2xl overflow-hidden border border-solid border-[#bbc4d0] overflow-y-auto">
            <div className="flex flex-col w-[314px] items-start gap-2.5 relative mb-[-184.00px]">
              {/* Tab Navigation */}
              <TabNavigation 
                activeTab={activeTab}
                onTabChange={setActiveTab}
                unit={unit}
                onUnitChange={toggleUnit}
                expandedFurnitureSections={expandedFurnitureSections}
                toggleFurnitureSection={toggleFurnitureSection}
                vector39={vector39}
              />

              {/* Content based on active tab */}
              {activeTab === '구조' && (
                <>


                  {/* Floor Section */}
                  <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
                    <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
                      <div className="flex flex-col h-9 items-center justify-between relative self-stretch w-full">
                        <div 
                          className="flex items-center justify-between p-2.5 relative self-stretch w-full flex-[0_0_auto] cursor-pointer"
                          onClick={() => toggleSection('floor')}
                        >
                          <div className="relative w-fit mt-[-1.00px] font-16-regular font-[number:var(--16-regular-font-weight)] text-[#000000] text-[length:var(--16-regular-font-size)] tracking-[var(--16-regular-letter-spacing)] leading-[var(--16-regular-line-height)] whitespace-nowrap [font-style:var(--16-regular-font-style)]">
                            Floor
                          </div>
                          <div className={`transform ${expandedSections.floor ? 'rotate-180' : ''} transition-transform`}>
                            <Dropdown className="!relative !w-4 !h-4" color="#888484" />
                          </div>
                        </div>
                        <img className="relative self-stretch w-full h-px mb-[-1.00px] mt-[-4.55e-13px] object-cover" alt="Vector" src={vector39} />
                      </div>
                      
                      {expandedSections.floor && (
                        <div className="flex flex-col items-start px-2.5 py-3.5 relative self-stretch w-full flex-[0_0_auto]">
                          <div className="flex w-[294px] items-center justify-between relative flex-[0_0_auto]">
                            <div className="inline-flex flex-col items-start gap-3.5 relative flex-[0_0_auto]">
                              <div className="relative w-[82px] h-[78px] mr-[-4.00px]">
                                <div className="absolute w-[72px] h-[72px] top-0 left-0 bg-[#f3f3f3] rounded-sm border border-solid border-[#dddddd]">
                                  <div className="absolute w-[11px] top-[51px] left-[30px] font-14-mideum font-[number:var(--14-mideum-font-weight)] text-[#a5adbe] text-[length:var(--14-mideum-font-size)] text-center tracking-[var(--14-mideum-letter-spacing)] leading-[var(--14-mideum-line-height)] whitespace-nowrap [font-style:var(--14-mideum-font-style)]">
                                    W
                                  </div>
                                  <div className="absolute w-2 top-[29px] left-[57px] font-14-mideum font-[number:var(--14-mideum-font-weight)] text-[#a5adbe] text-[length:var(--14-mideum-font-size)] text-center tracking-[var(--14-mideum-letter-spacing)] leading-[var(--14-mideum-line-height)] whitespace-nowrap [font-style:var(--14-mideum-font-style)]">
                                    H
                                  </div>
                                </div>
                                <img className="w-px h-[72px] top-0 left-[78px] absolute object-cover" alt="Line" src={line2} />
                                <img className="w-[72px] h-px top-[78px] left-0 absolute object-cover" alt="Line" src={line3} />
                              </div>
                              <div className="relative w-20 h-[18px] mr-[-2.00px]">
                                <img className="w-px h-[18px] top-0 left-[78px] absolute object-cover" alt="Line" src={line4} />
                                <div className="absolute w-[72px] h-[18px] top-0 left-0 bg-[#f3f3f3] rounded-sm border border-solid border-[#dddddd]">
                                  <div className="absolute w-[7px] top-px left-[58px] font-14-mideum font-[number:var(--14-mideum-font-weight)] text-[#a5adbe] text-[length:var(--14-mideum-font-size)] text-center tracking-[var(--14-mideum-letter-spacing)] leading-[var(--14-mideum-line-height)] whitespace-nowrap [font-style:var(--14-mideum-font-style)]">
                                    T
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="inline-flex flex-col items-end gap-2.5 relative flex-[0_0_auto]">
                              <div className="inline-flex items-center gap-3 relative flex-[0_0_auto]">
                                <div className="inline-flex items-center gap-1.5 relative flex-[0_0_auto]">
                                  <div className="relative w-fit [font-family:'Pretendard-Medium',Helvetica] font-medium text-[#8896a5] text-xs text-center tracking-[0] leading-3 whitespace-nowrap">
                                    W
                                  </div>
                                  <div className="w-[100px] flex items-center gap-2.5 px-2.5 py-[9px] relative bg-white rounded-lg border border-solid border-[#c7d2e0]">
                                    <input
                                      className="w-full bg-transparent border-none outline-none text-neutral-700 text-[length:var(--12-regular-font-size)] tracking-[var(--12-regular-letter-spacing)] leading-[var(--12-regular-line-height)]"
                                      value={dimensions.width}
                                      onChange={(e) => updateDimension('width', e.target.value)}
                                    />
                                  </div>
                                </div>
                                <div className="inline-flex items-center justify-center gap-2.5 px-[11px] py-[9px] relative flex-[0_0_auto] bg-[#bbc4d0] hover:bg-[#1662ef] transition-colors rounded-[99999px]">
                                  <div className="relative w-fit mt-[-1.00px] font-12-regular font-[number:var(--12-regular-font-weight)] text-white text-[length:var(--12-regular-font-size)] tracking-[var(--12-regular-letter-spacing)] leading-[var(--12-regular-line-height)] whitespace-nowrap [font-style:var(--12-regular-font-style)]">
                                    apply
                                  </div>
                                </div>
                              </div>
                              <div className="inline-flex items-center gap-3 relative flex-[0_0_auto]">
                                <div className="inline-flex items-center gap-[7px] relative flex-[0_0_auto]">
                                  <div className="relative w-3 h-3 [font-family:'Pretendard-Medium',Helvetica] font-medium text-[#8896a5] text-xs text-center tracking-[0] leading-3 whitespace-nowrap">
                                    H
                                  </div>
                                  <div className="w-[100px] flex items-center gap-2.5 px-2.5 py-[9px] relative bg-white rounded-lg border border-solid border-[#c7d2e0]">
                                    <input
                                      className="w-full bg-transparent border-none outline-none text-neutral-700 text-[length:var(--12-regular-font-size)] tracking-[var(--12-regular-letter-spacing)] leading-[var(--12-regular-line-height)]"
                                      value={dimensions.height}
                                      onChange={(e) => updateDimension('height', e.target.value)}
                                    />
                                  </div>
                                </div>
                                <div className="inline-flex items-center justify-center gap-2.5 px-[11px] py-[9px] relative flex-[0_0_auto] bg-[#bbc4d0] hover:bg-[#1662ef] transition-colors rounded-[99999px]">
                                  <div className="relative w-fit mt-[-1.00px] font-12-regular font-[number:var(--12-regular-font-weight)] text-white text-[length:var(--12-regular-font-size)] tracking-[var(--12-regular-letter-spacing)] leading-[var(--12-regular-line-height)] whitespace-nowrap [font-style:var(--12-regular-font-style)]">
                                    apply
                                  </div>
                                </div>
                              </div>
                              <div className="inline-flex items-center gap-3 relative flex-[0_0_auto]">
                                <div className="inline-flex items-center gap-2 relative flex-[0_0_auto]">
                                  <div className="relative w-3 h-3 [font-family:'Pretendard-Medium',Helvetica] font-medium text-[#8896a5] text-xs text-center tracking-[0] leading-3 whitespace-nowrap">
                                    T
                                  </div>
                                  <div className="w-[100px] flex items-center gap-2.5 px-2.5 py-[9px] relative bg-white rounded-lg border border-solid border-[#c7d2e0]">
                                    <input
                                      className="w-full bg-transparent border-none outline-none text-neutral-700 text-[length:var(--12-regular-font-size)] tracking-[var(--12-regular-letter-spacing)] leading-[var(--12-regular-line-height)]"
                                      value={dimensions.thickness}
                                      onChange={(e) => updateDimension('thickness', e.target.value)}
                                    />
                                  </div>
                                </div>
                                <div className="inline-flex items-center justify-center gap-2.5 px-[11px] py-[9px] relative flex-[0_0_auto] bg-[#bbc4d0] hover:bg-[#1662ef] transition-colors rounded-[99999px]">
                                  <div className="relative w-fit mt-[-1.00px] font-12-regular font-[number:var(--12-regular-font-weight)] text-white text-[length:var(--12-regular-font-size)] tracking-[var(--12-regular-letter-spacing)] leading-[var(--12-regular-line-height)] whitespace-nowrap [font-style:var(--12-regular-font-style)]">
                                    apply
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Pantry Section */}
                  <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
                    <div className="flex flex-col h-9 items-center justify-between relative self-stretch w-full">
                      <div 
                        className="flex items-center justify-between p-2.5 relative self-stretch w-full flex-[0_0_auto] cursor-pointer"
                        onClick={() => toggleSection('pantry')}
                      >
                        <div className="relative w-fit mt-[-1.00px] font-16-regular font-[number:var(--16-regular-font-weight)] text-[#000000] text-[length:var(--16-regular-font-size)] tracking-[var(--16-regular-letter-spacing)] leading-[var(--16-regular-line-height)] whitespace-nowrap [font-style:var(--16-regular-font-style)]">
                          Pantry
                        </div>
                        <div className={`transform ${expandedSections.pantry ? 'rotate-180' : ''} transition-transform`}>
                          <Dropdown className="!relative !w-4 !h-4" color="#888484" />
                        </div>
                      </div>
                      <img className="relative self-stretch w-full h-px mb-[-1.00px] mt-[-4.55e-13px] object-cover" alt="Vector" src={vector39} />
                    </div>

                    {expandedSections.pantry && (
                        <div className="flex flex-col items-start px-2.5 py-3.5 relative self-stretch w-full flex-[0_0_auto]">
                          <div className="flex w-[294px] items-center justify-between relative flex-[0_0_auto]">
                            <div className="inline-flex flex-col items-start gap-3.5 relative flex-[0_0_auto]">
                              <div className="relative w-[82px] h-[78px] mr-[-4.00px]">
                                <div className="absolute w-[72px] h-[72px] top-0 left-0 bg-[#f3f3f3] rounded-sm border border-solid border-[#dddddd]">
                                  <div className="absolute w-[11px] top-[51px] left-[30px] font-14-mideum font-[number:var(--14-mideum-font-weight)] text-[#a5adbe] text-[length:var(--14-mideum-font-size)] text-center tracking-[var(--14-mideum-letter-spacing)] leading-[var(--14-mideum-line-height)] whitespace-nowrap [font-style:var(--14-mideum-font-style)]">
                                    W
                                  </div>
                                  <div className="absolute w-2 top-[29px] left-[57px] font-14-mideum font-[number:var(--14-mideum-font-weight)] text-[#a5adbe] text-[length:var(--14-mideum-font-size)] text-center tracking-[var(--14-mideum-letter-spacing)] leading-[var(--14-mideum-line-height)] whitespace-nowrap [font-style:var(--14-mideum-font-style)]">
                                    H
                                  </div>
                                </div>
                                <img className="w-px h-[72px] top-0 left-[78px] absolute object-cover" alt="Line" src={line2} />
                                <img className="w-[72px] h-px top-[78px] left-0 absolute object-cover" alt="Line" src={line3} />
                              </div>
                              <div className="relative w-20 h-[18px] mr-[-2.00px]">
                                <img className="w-px h-[18px] top-0 left-[78px] absolute object-cover" alt="Line" src={line4} />
                                <div className="absolute w-[72px] h-[18px] top-0 left-0 bg-[#f3f3f3] rounded-sm border border-solid border-[#dddddd]">
                                  <div className="absolute w-[7px] top-px left-[58px] font-14-mideum font-[number:var(--14-mideum-font-weight)] text-[#a5adbe] text-[length:var(--14-mideum-font-size)] text-center tracking-[var(--14-mideum-letter-spacing)] leading-[var(--14-mideum-line-height)] whitespace-nowrap [font-style:var(--14-mideum-font-style)]">
                                    T
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="inline-flex flex-col items-end gap-2.5 relative flex-[0_0_auto]">
                              <div className="inline-flex items-center gap-3 relative flex-[0_0_auto]">
                                <div className="inline-flex items-center gap-1.5 relative flex-[0_0_auto]">
                                  <div className="relative w-fit [font-family:'Pretendard-Medium',Helvetica] font-medium text-[#8896a5] text-xs text-center tracking-[0] leading-3 whitespace-nowrap">
                                    W
                                  </div>
                                  <div className="w-[100px] flex items-center gap-2.5 px-2.5 py-[9px] relative bg-white rounded-lg border border-solid border-[#c7d2e0]">
                                    <input
                                      className="w-full bg-transparent border-none outline-none text-neutral-700 text-[length:var(--12-regular-font-size)] tracking-[var(--12-regular-letter-spacing)] leading-[var(--12-regular-line-height)]"
                                      value={dimensions.width}
                                      onChange={(e) => updateDimension('width', e.target.value)}
                                    />
                                  </div>
                                </div>
                                <div className="inline-flex items-center justify-center gap-2.5 px-[11px] py-[9px] relative flex-[0_0_auto] bg-[#bbc4d0] hover:bg-[#1662ef] transition-colors rounded-[99999px]">
                                  <div className="relative w-fit mt-[-1.00px] font-12-regular font-[number:var(--12-regular-font-weight)] text-white text-[length:var(--12-regular-font-size)] tracking-[var(--12-regular-letter-spacing)] leading-[var(--12-regular-line-height)] whitespace-nowrap [font-style:var(--12-regular-font-style)]">
                                    apply
                                  </div>
                                </div>
                              </div>
                              <div className="inline-flex items-center gap-3 relative flex-[0_0_auto]">
                                <div className="inline-flex items-center gap-[7px] relative flex-[0_0_auto]">
                                  <div className="relative w-3 h-3 [font-family:'Pretendard-Medium',Helvetica] font-medium text-[#8896a5] text-xs text-center tracking-[0] leading-3 whitespace-nowrap">
                                    H
                                  </div>
                                  <div className="w-[100px] flex items-center gap-2.5 px-2.5 py-[9px] relative bg-white rounded-lg border border-solid border-[#c7d2e0]">
                                    <input
                                      className="w-full bg-transparent border-none outline-none text-neutral-700 text-[length:var(--12-regular-font-size)] tracking-[var(--12-regular-letter-spacing)] leading-[var(--12-regular-line-height)]"
                                      value={dimensions.height}
                                      onChange={(e) => updateDimension('height', e.target.value)}
                                    />
                                  </div>
                                </div>
                                <div className="inline-flex items-center justify-center gap-2.5 px-[11px] py-[9px] relative flex-[0_0_auto] bg-[#bbc4d0] hover:bg-[#1662ef] transition-colors rounded-[99999px]">
                                  <div className="relative w-fit mt-[-1.00px] font-12-regular font-[number:var(--12-regular-font-weight)] text-white text-[length:var(--12-regular-font-size)] tracking-[var(--12-regular-letter-spacing)] leading-[var(--12-regular-line-height)] whitespace-nowrap [font-style:var(--12-regular-font-style)]">
                                    apply
                                  </div>
                                </div>
                              </div>
                              <div className="inline-flex items-center gap-3 relative flex-[0_0_auto]">
                                <div className="inline-flex items-center gap-2 relative flex-[0_0_auto]">
                                  <div className="relative w-3 h-3 [font-family:'Pretendard-Medium',Helvetica] font-medium text-[#8896a5] text-xs text-center tracking-[0] leading-3 whitespace-nowrap">
                                    T
                                  </div>
                                  <div className="w-[100px] flex items-center gap-2.5 px-2.5 py-[9px] relative bg-white rounded-lg border border-solid border-[#c7d2e0]">
                                    <input
                                      className="w-full bg-transparent border-none outline-none text-neutral-700 text-[length:var(--12-regular-font-size)] tracking-[var(--12-regular-letter-spacing)] leading-[var(--12-regular-line-height)]"
                                      value={dimensions.thickness}
                                      onChange={(e) => updateDimension('thickness', e.target.value)}
                                    />
                                  </div>
                                </div>
                                <div className="inline-flex items-center justify-center gap-2.5 px-[11px] py-[9px] relative flex-[0_0_auto] bg-[#bbc4d0] hover:bg-[#1662ef] transition-colors rounded-[99999px]">
                                  <div className="relative w-fit mt-[-1.00px] font-12-regular font-[number:var(--12-regular-font-weight)] text-white text-[length:var(--12-regular-font-size)] tracking-[var(--12-regular-letter-spacing)] leading-[var(--12-regular-line-height)] whitespace-nowrap [font-style:var(--12-regular-font-style)]">
                                    apply
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                  </div>

                  {/* Wall Section */}
                  <div className="flex flex-col items-center justify-center relative self-stretch w-full flex-[0_0_auto]">
                    <div className="flex flex-col h-9 items-center justify-between relative self-stretch w-full">
                      <div 
                        className="flex items-center justify-between p-2.5 relative self-stretch w-full flex-[0_0_auto] cursor-pointer"
                        onClick={() => toggleSection('wall')}
                      >
                        <div className="relative w-fit mt-[-1.00px] font-16-regular font-[number:var(--16-regular-font-weight)] text-[#000000] text-[length:var(--16-regular-font-size)] tracking-[var(--16-regular-letter-spacing)] leading-[var(--16-regular-line-height)] whitespace-nowrap [font-style:var(--16-regular-font-style)]">
                          Wall
                        </div>
                        <div className={`transform ${expandedSections.wall ? 'rotate-180' : ''} transition-transform`}>
                          <Dropdown className="!relative !w-4 !h-4" color="#888484" />
                        </div>
                      </div>
                      <img className="relative self-stretch w-full h-px mb-[-1.00px] mt-[-4.55e-13px] object-cover" alt="Vector" src={vector39} />
                    </div>
                    
                    {expandedSections.wall && (
                      <div className="inline-flex flex-col items-center justify-center gap-3.5 px-2.5 py-3.5 relative flex-[0_0_auto]">
                        {/* Wall Configuration Dropdown */}
                        <div className="flex w-[294px] items-center gap-4 relative flex-[0_0_auto]">
                          <div className="flex items-start justify-between px-2.5 py-[9px] relative flex-1 grow bg-white rounded-lg border border-solid border-[#bcc2c9]">
                            <div className="relative w-fit mt-[-1.00px] font-12-regular font-[number:var(--12-regular-font-weight)] text-[#000000] text-[length:var(--12-regular-font-size)] text-center tracking-[var(--12-regular-letter-spacing)] leading-[var(--12-regular-line-height)] whitespace-nowrap [font-style:var(--12-regular-font-style)]">
                              {wallConfig}
                            </div>
                            <div 
                              className="cursor-pointer" 
                              onClick={(e) => {
                                e.stopPropagation();
                                setShowWallConfigOptions(!showWallConfigOptions);
                              }}
                            >
                              <Dropdown className="!relative !w-2.5 !h-2.5" color="#8896A6" />
                            </div>
                          </div>
                          
                          {/* Dropdown menu for wall configuration */}
                          {showWallConfigOptions && (
                            <div className="absolute top-[40px] left-0 w-[235px] bg-white rounded-lg border border-solid border-[#bcc2c9] z-10">
                              {wallConfigOptions.map((option, index) => (
                                <div 
                                  key={index}
                                  className="px-2.5 py-[9px] hover:bg-gray-100 cursor-pointer"
                                  onClick={() => {
                                    setWallConfig(option);
                                    setShowWallConfigOptions(false);
                                  }}
                                >
                                  <div className="font-12-regular text-[#000000] text-[length:var(--12-regular-font-size)] leading-[var(--12-regular-line-height)]">
                                    {option}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                          
                          <div className="inline-flex items-center justify-center gap-2.5 px-[11px] py-[9px] relative flex-[0_0_auto] bg-[#bbc4d0] hover:bg-[#1662ef] transition-colors rounded-[99999px]">
                            <div className="relative w-fit mt-[-1.00px] font-12-regular font-[number:var(--12-regular-font-weight)] text-white text-[length:var(--12-regular-font-size)] tracking-[var(--12-regular-letter-spacing)] leading-[var(--12-regular-line-height)] whitespace-nowrap [font-style:var(--12-regular-font-style)]">
                              apply
                            </div>
                          </div>
                        </div>
                        
                        <div className="inline-flex items-center gap-7 relative flex-[0_0_auto]">
                          <div className="flex w-[294px] items-center justify-between relative">
                            <div className="relative w-[82px] h-[102px]">
                              <div className="absolute w-[78px] h-[102px] top-0 left-0">
                                <img className="absolute w-[74px] h-[93px] top-[9px] left-0" alt="Wall" src={image92} />
                                <img className="absolute w-[78px] h-11 top-0 left-0" alt="Vector" src={vector61} />
                                <div className="absolute w-2 top-[38px] left-8 font-14-mideum font-[number:var(--14-mideum-font-weight)] text-[#a5adbe] text-[length:var(--14-mideum-font-size)] text-center tracking-[var(--14-mideum-letter-spacing)] leading-[var(--14-mideum-line-height)] whitespace-nowrap [font-style:var(--14-mideum-font-style)]">
                                  H
                                </div>
                                <div className="absolute w-[7px] top-[69px] left-[60px] font-14-mideum font-[number:var(--14-mideum-font-weight)] text-[#a5adbe] text-[length:var(--14-mideum-font-size)] text-center tracking-[var(--14-mideum-letter-spacing)] leading-[var(--14-mideum-line-height)] whitespace-nowrap [font-style:var(--14-mideum-font-style)]">
                                  T
                                </div>
                              </div>
                              <img className="absolute w-px h-[51px] top-[50px] left-[78px]" alt="Vector" src={vector62} />
                            </div>
                            
                            <div className="flex flex-col w-[188px] items-start gap-3.5 relative">
                              <div className="flex items-end gap-3 relative self-stretch w-full flex-[0_0_auto]">
                                <div className="inline-flex flex-col items-start gap-1.5 relative flex-[0_0_auto]">
                                  {/* First Wall Selection Dropdown */}
                                  <div className="flex w-[124px] items-start justify-between px-2.5 py-[9px] relative flex-[0_0_auto] bg-white rounded-lg border border-solid border-[#c7d2e0]">
                                    <div className="relative w-fit mt-[-1.00px] font-12-regular font-[number:var(--12-regular-font-weight)] text-[#000000] text-[length:var(--12-regular-font-size)] text-center tracking-[var(--12-regular-letter-spacing)] leading-[var(--12-regular-line-height)] whitespace-nowrap [font-style:var(--12-regular-font-style)]">
                                      {wallSelection1}
                                    </div>
                                    <div 
                                      className="cursor-pointer" 
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setShowWallSelection1Options(!showWallSelection1Options);
                                      }}
                                    >
                                      <Dropdown className="!relative !w-2.5 !h-2.5" color="#8896A6" />
                                    </div>
                                  </div>
                                  
                                  {/* Dropdown menu for first wall selection */}
                                  {showWallSelection1Options && (
                                    <div className="absolute top-[40px] left-0 w-[124px] bg-white rounded-lg border border-solid border-[#c7d2e0] z-10">
                                      {wallSelectionOptions.map((option, index) => (
                                        <div 
                                          key={index}
                                          className="px-2.5 py-[9px] hover:bg-gray-100 cursor-pointer"
                                          onClick={() => {
                                            setWallSelection1(option);
                                            setShowWallSelection1Options(false);
                                          }}
                                        >
                                          <div className="font-12-regular text-[#000000] text-[length:var(--12-regular-font-size)] leading-[var(--12-regular-line-height)]">
                                            {option}
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                  
                                  <div className="inline-flex items-center relative flex-[0_0_auto]">
                                    <div className="inline-flex flex-col items-center justify-center gap-2.5 px-1.5 py-[9px] relative flex-[0_0_auto]">
                                      <div className="relative self-stretch mt-[-1.00px] [font-family:'Pretendard-Medium',Helvetica] font-medium text-[#8896a5] text-xs text-center tracking-[0] leading-3">
                                        H
                                      </div>
                                    </div>
                                    <div className="w-[100px] flex items-center gap-2.5 px-2.5 py-[9px] relative bg-white rounded-lg border border-solid border-[#c7d2e0]">
                                      <input
                                        className="w-full bg-transparent border-none outline-none text-neutral-700 text-[length:var(--12-regular-font-size)] tracking-[var(--12-regular-letter-spacing)] leading-[var(--12-regular-line-height)]"
                                        value={dimensions.height}
                                        onChange={(e) => updateDimension('height', e.target.value)}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="inline-flex items-center justify-center gap-2.5 px-[11px] py-[9px] relative flex-[0_0_auto] bg-[#bbc4d0] hover:bg-[#1662ef] transition-colors rounded-[99999px]">
                                  <div className="relative w-fit mt-[-1.00px] font-12-regular font-[number:var(--12-regular-font-weight)] text-white text-[length:var(--12-regular-font-size)] tracking-[var(--12-regular-letter-spacing)] leading-[var(--12-regular-line-height)] whitespace-nowrap [font-style:var(--12-regular-font-style)]">
                                    apply
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex items-end gap-3 relative self-stretch w-full flex-[0_0_auto]">
                                <div className="inline-flex flex-col items-start gap-1.5 relative flex-[0_0_auto]">
                                  {/* Second Wall Selection Dropdown */}
                                  <div className="flex w-[124px] items-start justify-between px-2.5 py-[9px] relative flex-[0_0_auto] bg-white rounded-lg border border-solid border-[#c7d2e0]">
                                    <div className="relative w-fit mt-[-1.00px] font-12-regular font-[number:var(--12-regular-font-weight)] text-[#000000] text-[length:var(--12-regular-font-size)] text-center tracking-[var(--12-regular-letter-spacing)] leading-[var(--12-regular-line-height)] whitespace-nowrap [font-style:var(--12-regular-font-style)]">
                                      {wallSelection2}
                                    </div>
                                    <div 
                                      className="cursor-pointer" 
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setShowWallSelection2Options(!showWallSelection2Options);
                                      }}
                                    >
                                      <Dropdown className="!relative !w-2.5 !h-2.5" color="#8896A6" />
                                    </div>
                                  </div>
                                  
                                  {/* Dropdown menu for second wall selection */}
                                  {showWallSelection2Options && (
                                    <div className="absolute top-[120px] left-0 w-[124px] bg-white rounded-lg border border-solid border-[#c7d2e0] z-10">
                                      {wallSelectionOptions.map((option, index) => (
                                        <div 
                                          key={index}
                                          className="px-2.5 py-[9px] hover:bg-gray-100 cursor-pointer"
                                          onClick={() => {
                                            setWallSelection2(option);
                                            setShowWallSelection2Options(false);
                                          }}
                                        >
                                          <div className="font-12-regular text-[#000000] text-[length:var(--12-regular-font-size)] leading-[var(--12-regular-line-height)]">
                                            {option}
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                  
                                  <div className="inline-flex items-center relative flex-[0_0_auto]">
                                    <div className="inline-flex flex-col items-center justify-center gap-2.5 px-1.5 py-[9px] relative flex-[0_0_auto]">
                                      <div className="relative self-stretch mt-[-1.00px] [font-family:'Pretendard-Medium',Helvetica] font-medium text-[#8896a5] text-xs text-center tracking-[0] leading-3">
                                        T
                                      </div>
                                    </div>
                                    <div className="w-[100px] flex items-center gap-2.5 px-2.5 py-[9px] relative bg-white rounded-lg border border-solid border-[#c7d2e0]">
                                      <input
                                        className="w-full bg-transparent border-none outline-none text-neutral-700 text-[length:var(--12-regular-font-size)] tracking-[var(--12-regular-letter-spacing)] leading-[var(--12-regular-line-height)]"
                                        value={dimensions.thickness}
                                        onChange={(e) => updateDimension('thickness', e.target.value)}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="inline-flex items-center justify-center gap-2.5 px-[11px] py-[9px] relative flex-[0_0_auto] bg-[#bbc4d0] hover:bg-[#1662ef] transition-colors rounded-[99999px]">
                                  <div className="relative w-fit mt-[-1.00px] font-12-regular font-[number:var(--12-regular-font-weight)] text-white text-[length:var(--12-regular-font-size)] tracking-[var(--12-regular-letter-spacing)] leading-[var(--12-regular-line-height)] whitespace-nowrap [font-style:var(--12-regular-font-style)]">
                                    apply
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="inline-flex items-center gap-3 relative flex-[0_0_auto]">
                          <img className="relative w-[90px] h-20" alt="Wall" src={image96} />
                          <div className="flex flex-col w-[188px] items-end gap-2.5 relative">
                            <div className="flex items-center justify-between relative self-stretch w-full flex-[0_0_auto]">
                              <div className="relative w-[99px] [font-family:'Pretendard-Medium',Helvetica] font-medium text-neutral-700 text-xs tracking-[0] leading-3">
                                Art Wall Curves
                              </div>
                              <div className="inline-flex items-center justify-center gap-2.5 px-[11px] py-[9px] relative flex-[0_0_auto] bg-[#bbc4d0] hover:bg-[#1662ef] transition-colors rounded-[99999px]">
                                <div className="relative w-fit mt-[-1.00px] font-12-regular font-[number:var(--12-regular-font-weight)] text-white text-[length:var(--12-regular-font-size)] tracking-[var(--12-regular-letter-spacing)] leading-[var(--12-regular-line-height)] whitespace-nowrap [font-style:var(--12-regular-font-style)]">
                                  apply
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-1.5 relative self-stretch w-full flex-[0_0_auto]">
                              <div className="relative w-fit [font-family:'Pretendard-Regular',Helvetica] font-normal text-color-text-default-default text-[10px] tracking-[0] leading-[10px] whitespace-nowrap">
                                Flat
                              </div>
                              <div 
                                className="relative w-[127px] h-[13px] cursor-pointer"
                                onClick={handleSliderClick}
                                id="wall-curve-track"
                              >
                                <div className="relative h-[13px]">
                                  <div className="absolute w-[127px] h-0.5 top-1.5 left-0 bg-[#bbc4d0] rounded-[99px]" />
                                  <div 
                                    className="absolute w-6 h-[13px] top-0 bg-black rounded-lg cursor-grab active:cursor-grabbing"
                                    style={{ left: `${wallCurveValue * (127 - 24) / 100}px` }}
                                    onMouseDown={startSliderDrag}
                                  />
                                </div>
                              </div>
                              <div className="relative w-fit mr-[-1.00px] [font-family:'Pretendard-Regular',Helvetica] font-normal text-color-text-default-default text-[10px] text-right tracking-[0] leading-[10px] whitespace-nowrap">
                                Curved
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Rigging Section */}
                  <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
                    <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
                      <div className="flex flex-col items-center relative self-stretch w-full flex-[0_0_auto]">
                        <div 
                          className="flex h-10 items-center justify-between p-2.5 relative self-stretch w-full cursor-pointer"
                          onClick={() => toggleSection('rigging')}
                        >
                          <div className="flex w-[184.5px] items-center gap-2.5 relative">
                            <div className="relative w-fit font-16-regular font-[number:var(--16-regular-font-weight)] text-[#000000] text-[length:var(--16-regular-font-size)] tracking-[var(--16-regular-letter-spacing)] leading-[var(--16-regular-line-height)] whitespace-nowrap [font-style:var(--16-regular-font-style)]">
                              Rigging
                            </div>
                            {/* Toggle switch - updated to handle state changes */}
                            <div 
                              className={`flex w-[29px] h-[18px] items-center p-0.5 relative ${isRiggingEnabled ? 'bg-[#e3e5e8]' : 'bg-[#bbc4d0]'} rounded-[999px] cursor-pointer transition-colors duration-200`}
                              onClick={toggleRigging}
                            >
                              <div 
                                className={`relative w-3.5 h-3.5 ${isRiggingEnabled ? 'bg-[#1662ef]' : 'bg-[#8896a5]'} rounded-[7px] transition-all duration-200 ${isRiggingEnabled ? '' : 'ml-auto'}`} 
                              />
                            </div>
                          </div>
                          <div className={`transform ${expandedSections.rigging ? 'rotate-180' : ''} transition-transform`}>
                            <Dropdown className="!relative !w-4 !h-4" color="#888484" />
                          </div>
                        </div>
                        <img className="relative self-stretch w-full h-px mb-[-0.50px] object-cover" alt="Vector" src={vector39} />
                      </div>
                      
                      {/* Only show rigging content when the section is expanded */}
                      {expandedSections.rigging && (
                        <div className="flex flex-col items-start gap-3.5 px-2.5 py-3.5 relative self-stretch w-full flex-[0_0_auto]">
                          {/* Rigging Type Selection */}
                          <div className="flex items-center gap-3 relative self-stretch w-full flex-[0_0_auto]">
                            <div className="relative w-full">
                              <div 
                                className="flex items-start justify-between px-2.5 py-[9px] relative flex-1 grow bg-[#f2f3f5] rounded-lg border border-solid border-[#c7d2e0] cursor-pointer"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setShowRiggingOptions(!showRiggingOptions);
                                }}
                              >
                                <div className="w-fit text-center whitespace-nowrap relative mt-[-1.00px] font-12-regular font-[number:var(--12-regular-font-weight)] text-[#8190a5] text-[length:var(--12-regular-font-size)] tracking-[var(--12-regular-letter-spacing)] leading-[var(--12-regular-line-height)] [font-style:var(--12-regular-font-style)]">
                                  {riggingType}
                                </div>
                                <Dropdown className="!relative !w-2.5 !h-2.5" color="#8896A6" />
                              </div>
                              
                              {/* Rigging type dropdown options */}
                              {showRiggingOptions && (
                                <div className="absolute top-[40px] left-0 w-full bg-white rounded-lg border border-solid border-[#c7d2e0] z-10">
                                  {riggingOptions.map((option, index) => (
                                    <div 
                                      key={index}
                                      className="px-2.5 py-[9px] hover:bg-gray-100 cursor-pointer"
                                      onClick={() => {
                                        setRiggingType(option);
                                        setShowRiggingOptions(false);
                                      }}
                                    >
                                      <div className="font-12-regular text-[#000000] text-[length:var(--12-regular-font-size)] leading-[var(--12-regular-line-height)]">
                                        {option}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                            
                            <div className="inline-flex items-center justify-center gap-2.5 px-[11px] py-[9px] relative flex-[0_0_auto] bg-[#bbc4d0] hover:bg-[#1662ef] transition-colors rounded-[99999px]">
                              <div className="relative w-fit mt-[-1.00px] font-12-regular font-[number:var(--12-regular-font-weight)] text-white text-[length:var(--12-regular-font-size)] tracking-[var(--12-regular-letter-spacing)] leading-[var(--12-regular-line-height)] whitespace-nowrap [font-style:var(--12-regular-font-style)]">
                                apply
                              </div>
                            </div>
                          </div>
                          
                          {/* Rigging Visualization and Dimensions */}
                          <div className="flex items-center justify-between self-stretch w-full flex-[0_0_auto]">
                            <div className="relative w-[102px] h-[122px]">
                              <div className="relative w-24 h-[122px]">
                                <img className="absolute w-[91px] h-[122px] top-0 left-[5px]" alt="Rigging" src={image88} />
                                <img className="h-[13px] top-[17px] absolute w-1.5 left-[23px] object-cover" alt="Line" src={line4} />
                                <img className="h-[53px] top-[33px] absolute w-1.5 left-[23px] object-cover" alt="Line" src={line6} />
                                <div className="absolute top-[17px] left-0 font-14-mideum font-[number:var(--14-mideum-font-weight)] text-[#a5adbe] text-[length:var(--14-mideum-font-size)] text-center tracking-[var(--14-mideum-letter-spacing)] leading-[var(--14-mideum-line-height)] whitespace-nowrap [font-style:var(--14-mideum-font-style)]">
                                  R.H
                                </div>
                                <p className="absolute top-[55px] left-0 [font-family:'Pretendard-Medium',Helvetica] font-normal text-[#a5adbe] text-sm text-center tracking-[0] leading-[14px] whitespace-nowrap">
                                  <span className="font-[number:var(--14-mideum-font-weight)] font-14-mideum [font-style:var(--14-mideum-font-style)] tracking-[var(--14-mideum-letter-spacing)] leading-[var(--14-mideum-line-height)] text-[length:var(--14-mideum-font-size)]">
                                    H
                                  </span>
                                  <span className="font-12-regular text-[length:var(--12-regular-font-size)] leading-[var(--12-regular-line-height)] [font-style:var(--12-regular-font-style)] font-[number:var(--12-regular-font-weight)] tracking-[var(--12-regular-letter-spacing)]">
                                    t
                                  </span>
                                  <span className="font-[number:var(--14-mideum-font-weight)] font-14-mideum [font-style:var(--14-mideum-font-style)] tracking-[var(--14-mideum-letter-spacing)] leading-[var(--14-mideum-line-height)] text-[length:var(--14-mideum-font-size)]">
                                    B
                                  </span>
                                </p>
                                <div className="absolute top-[51px] left-[50px] font-14-mideum font-[number:var(--14-mideum-font-weight)] text-[#a5adbe] text-[length:var(--14-mideum-font-size)] text-center tracking-[var(--14-mideum-letter-spacing)] leading-[var(--14-mideum-line-height)] whitespace-nowrap [font-style:var(--14-mideum-font-style)]">
                                  T.h
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex flex-col w-[188px] items-start gap-3.5">
                              <div className="flex flex-col items-end gap-2.5 self-stretch w-full flex-[0_0_auto]">
                                {/* T.H Input */}
                                <div className="flex items-center gap-3 relative self-stretch w-full flex-[0_0_auto]">
                                  <div className="flex items-center gap-2 flex-1 grow">
                                    <div className="relative w-fit [font-family:'Pretendard-Medium',Helvetica] font-medium text-[#8896a5] text-xs text-center tracking-[0] leading-3 whitespace-nowrap">
                                      T.H
                                    </div>
                                    <div className="flex items-center gap-2.5 px-2.5 py-[9px] flex-1 grow bg-white rounded-lg border border-solid border-[#c7d2e0]">
                                      <input
                                        className="w-full bg-transparent border-none outline-none text-neutral-700 text-[length:var(--12-regular-font-size)] tracking-[var(--12-regular-letter-spacing)] leading-[var(--12-regular-line-height)]"
                                        value={riggingDimensions.th}
                                        onChange={(e) => updateRiggingDimension('th', e.target.value)}
                                      />
                                    </div>
                                  </div>
                                  <div className="inline-flex items-center justify-center gap-2.5 px-[11px] py-[9px] relative flex-[0_0_auto] bg-[#bbc4d0] hover:bg-[#1662ef] transition-colors rounded-[99999px]">
                                    <div className="relative w-fit mt-[-1.00px] font-12-regular font-[number:var(--12-regular-font-weight)] text-white text-[length:var(--12-regular-font-size)] tracking-[var(--12-regular-letter-spacing)] leading-[var(--12-regular-line-height)] whitespace-nowrap [font-style:var(--12-regular-font-style)]">
                                      apply
                                    </div>
                                  </div>
                                </div>
                                
                                {/* R.H Input */}
                                <div className="flex items-center gap-3 relative self-stretch w-full flex-[0_0_auto]">
                                  <div className="flex items-center gap-1.5 flex-1 grow">
                                    <div className="relative w-fit [font-family:'Pretendard-Medium',Helvetica] font-medium text-[#8896a5] text-xs text-center tracking-[0] leading-3 whitespace-nowrap">
                                      R.H
                                    </div>
                                    <div className="flex items-center gap-2.5 px-2.5 py-[9px] flex-1 grow bg-white rounded-lg border border-solid border-[#c7d2e0]">
                                      <input
                                        className="w-full bg-transparent border-none outline-none text-neutral-700 text-[length:var(--12-regular-font-size)] tracking-[var(--12-regular-letter-spacing)] leading-[var(--12-regular-line-height)]"
                                        value={riggingDimensions.rh}
                                        onChange={(e) => updateRiggingDimension('rh', e.target.value)}
                                      />
                                    </div>
                                  </div>
                                  <div className="inline-flex items-center justify-center gap-2.5 px-[11px] py-[9px] relative flex-[0_0_auto] bg-[#bbc4d0] hover:bg-[#1662ef] transition-colors rounded-[99999px]">
                                    <div className="relative w-fit mt-[-1.00px] font-12-regular font-[number:var(--12-regular-font-weight)] text-white text-[length:var(--12-regular-font-size)] tracking-[var(--12-regular-letter-spacing)] leading-[var(--12-regular-line-height)] whitespace-nowrap [font-style:var(--12-regular-font-style)]">
                                      apply
                                    </div>
                                  </div>
                                </div>
                                
                                {/* HtoB Input */}
                                <div className="flex items-center gap-3 relative self-stretch w-full flex-[0_0_auto]">
                                  <div className="flex items-center gap-[7px] flex-1 grow">
                                    <div className="relative w-fit [font-family:'Pretendard-Medium',Helvetica] font-medium text-[#8896a5] text-xs text-center tracking-[0] leading-3 whitespace-nowrap">
                                      HtoB
                                    </div>
                                    <div className="flex items-center gap-2.5 px-2.5 py-[9px] flex-1 grow bg-white rounded-lg border border-solid border-[#c7d2e0]">
                                      <input
                                        className="w-full bg-transparent border-none outline-none text-neutral-700 text-[length:var(--12-regular-font-size)] tracking-[var(--12-regular-letter-spacing)] leading-[var(--12-regular-line-height)]"
                                        value={riggingDimensions.htob}
                                        onChange={(e) => updateRiggingDimension('htob', e.target.value)}
                                      />
                                    </div>
                                  </div>
                                  <div className="inline-flex items-center justify-center gap-2.5 px-[11px] py-[9px] relative flex-[0_0_auto] bg-[#bbc4d0] hover:bg-[#1662ef] transition-colors rounded-[99999px]">
                                    <div className="relative w-fit mt-[-1.00px] font-12-regular font-[number:var(--12-regular-font-weight)] text-white text-[length:var(--12-regular-font-size)] tracking-[var(--12-regular-letter-spacing)] leading-[var(--12-regular-line-height)] whitespace-nowrap [font-style:var(--12-regular-font-style)]">
                                      apply
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
              {activeTab === '재질' && (
                <div className="flex flex-col w-[314px] items-start">
                  {/* Wall Selection */}
                  <div className="flex flex-col items-start gap-2.5 pt-3.5 pb-2.5 px-2.5 relative self-stretch w-full">
                    <div className="flex items-center justify-between relative self-stretch w-full">
                      <div className="relative w-[226px]">
                        <div 
                          className="flex w-full items-center justify-between px-2.5 py-[9px] relative bg-white rounded-lg border border-solid border-[#bcc2c9]"
                        >
                          <div className="relative font-12-regular text-[#000000] text-[length:var(--12-regular-font-size)] whitespace-nowrap">
                            {selectedWall}
                          </div>
                          <div 
                            className="cursor-pointer" 
                            onClick={() => setShowWallSelectionOptions(!showWallSelectionOptions)}
                          >
                            <Dropdown className="!relative !w-2.5 !h-2.5" color="#8896A6" />
                          </div>
                        </div>
                        
                        {/* Wall selection dropdown menu */}
                        {showWallSelectionOptions && (
                          <div className="absolute top-full left-0 w-full mt-1 bg-white rounded-lg border border-solid border-[#bcc2c9] z-10 shadow-md">
                            {wallOptions.map((option, index) => (
                              <div 
                                key={index}
                                className="px-2.5 py-[9px] hover:bg-gray-100 cursor-pointer"
                                onClick={() => {
                                  setSelectedWall(option);
                                  setShowWallSelectionOptions(false);
                                }}
                              >
                                <div className="font-12-regular text-[#000000] text-[length:var(--12-regular-font-size)]">
                                  {option}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Apply button */}
                      <div className="inline-flex items-center justify-center gap-2.5 px-[11px] py-[9px] bg-[#bbc4d0] hover:bg-[#1662ef] transition-colors rounded-[99999px] cursor-pointer">
                        <div className="relative w-fit font-12-regular text-white text-[length:var(--12-regular-font-size)] whitespace-nowrap">
                          apply
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Material Sections */}
                  <div className="flex flex-col items-start relative self-stretch w-full">
                    {/* Carpet Section */}
                    <div className="flex flex-col items-start relative self-stretch w-full">
                      <div className="flex flex-col items-center relative self-stretch w-full">
                        <div className="flex items-center justify-between px-2.5 py-3 relative self-stretch w-full">
                          <div className="relative w-fit font-16-regular text-[#000000] text-[length:var(--16-regular-font-size)] whitespace-nowrap">
                            Carpet
                          </div>
                          <div 
                            className="cursor-pointer"
                            onClick={() => toggleMaterialSection('carpet')}
                          >
                            <div className={`transform ${expandedMaterialSections.carpet ? 'rotate-180' : ''} transition-transform`}>
                              <Dropdown className="!relative !w-4 !h-4" color="#888484" />
                            </div>
                          </div>
                        </div>
                        <img
                          className="relative self-stretch w-full h-px object-cover"
                          alt="Vector"
                          src={vector39}
                        />
                      </div>

                      {/* Carpet Content - Only show when expanded */}
                      {expandedMaterialSections.carpet && (
                        <div className="flex flex-col items-start gap-3.5 px-2.5 py-3.5 relative self-stretch w-full">
                          {/* First Row */}
                          <div className="flex items-center gap-2.5 relative self-stretch w-full">
                            {[...Array(4)].map((_, index) => (
                              <div key={`carpet-row1-${index}`} className="flex flex-col w-[66px] items-start gap-1.5 relative">
                                <div 
                                  className={`relative self-stretch w-full h-[67px] bg-[#ededed] rounded-sm hover:border hover:border-solid hover:border-[#1662ef] transition-all cursor-pointer ${
                                    selectedMaterials.carpet === `carpet-${index}` ? 'ring-2 ring-[#1662ef]' : ''
                                  }`}
                                  onClick={() => handleMaterialSelect('carpet', `carpet-${index}`)}
                                />
                                <div className="relative self-stretch font-12-regular text-[#000000] text-[length:var(--12-regular-font-size)]">
                                  name
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Second Row */}
                          <div className="flex items-center gap-2.5 relative self-stretch w-full">
                            {[...Array(4)].map((_, index) => (
                              <div key={`carpet-row2-${index}`} className="flex flex-col w-[66px] items-start gap-1.5 relative">
                                <div 
                                  className={`relative self-stretch w-full h-[67px] bg-[#ededed] rounded-sm hover:border hover:border-solid hover:border-[#1662ef] transition-all cursor-pointer ${
                                    selectedMaterials.carpet === `carpet-${index+4}` ? 'ring-2 ring-[#1662ef]' : ''
                                  }`}
                                  onClick={() => handleMaterialSelect('carpet', `carpet-${index+4}`)}
                                />
                                <div className="relative self-stretch font-12-regular text-[#000000] text-[length:var(--12-regular-font-size)]">
                                  name
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Laminate Section */}
                    <div className="flex flex-col items-start relative self-stretch w-full">
                      <div className="flex flex-col items-center relative self-stretch w-full">
                        <div className="flex items-center justify-between px-2.5 py-3 relative self-stretch w-full">
                          <div className="relative w-fit font-16-regular text-[#000000] text-[length:var(--16-regular-font-size)] whitespace-nowrap">
                            Laminate
                          </div>
                          <div 
                            className="cursor-pointer"
                            onClick={() => toggleMaterialSection('laminate')}
                          >
                            <div className={`transform ${expandedMaterialSections.laminate ? 'rotate-180' : ''} transition-transform`}>
                              <Dropdown className="!relative !w-4 !h-4" color="#888484" />
                            </div>
                          </div>
                        </div>
                        <img
                          className="relative self-stretch w-full h-px object-cover"
                          alt="Vector"
                          src={vector39}
                        />
                      </div>

                      {/* Laminate Content - Only show when expanded */}
                      {expandedMaterialSections.laminate && (
                        <div className="flex flex-col items-start gap-3.5 px-2.5 py-3.5 relative self-stretch w-full">
                          {/* First Row */}
                          <div className="flex items-center gap-2.5 relative self-stretch w-full">
                            {[...Array(4)].map((_, index) => (
                              <div key={`laminate-row1-${index}`} className="flex flex-col w-[66px] items-start gap-1.5 relative">
                                <div 
                                  className={`relative self-stretch w-full h-[67px] bg-[#ededed] rounded-sm hover:border hover:border-solid hover:border-[#1662ef] transition-all cursor-pointer ${
                                    selectedMaterials.laminate === `laminate-${index}` ? 'ring-2 ring-[#1662ef]' : ''
                                  }`}
                                  onClick={() => handleMaterialSelect('laminate', `laminate-${index}`)}
                                />
                                <div className="relative self-stretch font-12-regular text-[#000000] text-[length:var(--12-regular-font-size)]">
                                  name
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Second Row */}
                          <div className="flex items-center gap-2.5 relative self-stretch w-full">
                            {[...Array(4)].map((_, index) => (
                              <div key={`laminate-row2-${index}`} className="flex flex-col w-[66px] items-start gap-1.5 relative">
                                <div 
                                  className={`relative self-stretch w-full h-[67px] bg-[#ededed] rounded-sm hover:border hover:border-solid hover:border-[#1662ef] transition-all cursor-pointer ${
                                    selectedMaterials.laminate === `laminate-${index+4}` ? 'ring-2 ring-[#1662ef]' : ''
                                  }`}
                                  onClick={() => handleMaterialSelect('laminate', `laminate-${index+4}`)}
                                />
                                <div className="relative self-stretch font-12-regular text-[#000000] text-[length:var(--12-regular-font-size)]">
                                  name
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Edge Molding Section */}
                    <div className="flex flex-col items-start relative self-stretch w-full">
                      <div className="flex flex-col items-center relative self-stretch w-full">
                        <div className="flex items-center justify-between px-2.5 py-3 relative self-stretch w-full">
                          <div className="relative w-fit font-16-regular text-[#000000] text-[length:var(--16-regular-font-size)] whitespace-nowrap">
                            Edge Molding
                          </div>
                          <div 
                            className="cursor-pointer"
                            onClick={() => toggleMaterialSection('edgeMolding')}
                          >
                            <div className={`transform ${expandedMaterialSections.edgeMolding ? 'rotate-180' : ''} transition-transform`}>
                              <Dropdown className="!relative !w-4 !h-4" color="#888484" />
                            </div>
                          </div>
                        </div>
                        <img
                          className="relative self-stretch w-full h-px object-cover"
                          alt="Vector"
                          src={vector39}
                        />
                      </div>

                      {/* Edge Molding Content - Only show when expanded */}
                      {expandedMaterialSections.edgeMolding && (
                        <div className="flex flex-col items-start gap-3.5 px-2.5 py-3.5 relative self-stretch w-full">
                          {/* Material rows here */}
                          <div className="flex items-center gap-2.5 relative self-stretch w-full">
                            {[...Array(4)].map((_, index) => (
                              <div key={`edge-row1-${index}`} className="flex flex-col w-[66px] items-start gap-1.5 relative">
                                <div 
                                  className={`relative self-stretch w-full h-[67px] bg-[#ededed] rounded-sm hover:border hover:border-solid hover:border-[#1662ef] transition-all cursor-pointer ${
                                    selectedMaterials.edgeMolding === `edge-${index}` ? 'ring-2 ring-[#1662ef]' : ''
                                  }`}
                                  onClick={() => handleMaterialSelect('edgeMolding', `edge-${index}`)}
                                />
                                <div className="relative self-stretch font-12-regular text-[#000000] text-[length:var(--12-regular-font-size)]">
                                  name
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Wall Paint Section */}
                    <div className="flex flex-col items-start relative self-stretch w-full">
                      <div className="flex flex-col items-center relative self-stretch w-full">
                        <div className="flex items-center justify-between px-2.5 py-3 relative self-stretch w-full">
                          <div className="relative w-fit font-16-regular text-[#000000] text-[length:var(--16-regular-font-size)] whitespace-nowrap">
                            Wall Paint
                          </div>
                          <div 
                            className="cursor-pointer"
                            onClick={() => toggleMaterialSection('wallPaint')}
                          >
                            <div className={`transform ${expandedMaterialSections.wallPaint ? 'rotate-180' : ''} transition-transform`}>
                              <Dropdown className="!relative !w-4 !h-4" color="#888484" />
                            </div>
                          </div>
                        </div>
                        <img
                          className="relative self-stretch w-full h-px object-cover"
                          alt="Vector"
                          src={vector39}
                        />
                      </div>

                      {/* Wall Paint Content - Only show when expanded */}
                      {expandedMaterialSections.wallPaint && (
                        <div className="flex flex-col items-start gap-3.5 px-2.5 py-3.5 relative self-stretch w-full">
                          {/* Color Palette */}
                          <div className="flex items-center gap-2.5 relative self-stretch w-full flex-wrap">
                            {['#FFFFFF', '#F5F5F5', '#E0E0E0', '#BDBDBD', '#9E9E9E', '#757575', '#616161', '#424242', '#212121', '#000000'].map((color, index) => (
                              <div key={`c  olor-${index}`} className="flex flex-col w-[28px] items-start gap-1 relative mb-2">
                                <div 
                                  className={`relative self-stretch w-full h-[28px] rounded-full border border-solid border-[#dddddd] hover:ring-2 hover:ring-[#1662ef] transition-all cursor-pointer ${
                                    selectedMaterials.wallPaint === `color-${index}` ? 'ring-2 ring-[#1662ef]' : ''
                                  }`}
                                  style={{ backgroundColor: color }}
                                  onClick={() => handleMaterialSelect('wallPaint', `color-${index}`)}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Wooden Floor Section */}
                    <div className="flex flex-col items-start relative self-stretch w-full">
                      <div className="flex flex-col items-center relative self-stretch w-full">
                        <div className="flex items-center justify-between px-2.5 py-3 relative self-stretch w-full">
                          <div className="relative w-fit font-16-regular text-[#000000] text-[length:var(--16-regular-font-size)] whitespace-nowrap">
                            Wooden Floor
                          </div>
                          <div 
                            className="cursor-pointer"
                            onClick={() => toggleMaterialSection('woodenFloor')}
                          >
                            <div className={`transform ${expandedMaterialSections.woodenFloor ? 'rotate-180' : ''} transition-transform`}>
                              <Dropdown className="!relative !w-4 !h-4" color="#888484" />
                            </div>
                          </div>
                        </div>
                        <img
                          className="relative self-stretch w-full h-px object-cover"
                          alt="Vector"
                          src={vector39}
                        />
                      </div>

                      {/* Wooden Floor Content - Only show when expanded */}
                      {expandedMaterialSections.woodenFloor && (
                        <div className="flex flex-col items-start gap-3.5 px-2.5 py-3.5 relative self-stretch w-full">
                          {/* Wood Samples */}
                          <div className="flex items-center gap-2.5 relative self-stretch w-full">
                            {[...Array(4)].map((_, index) => (
                              <div key={`wood-row1-${index}`} className="flex flex-col w-[66px] items-start gap-1.5 relative">
                                <div 
                                  className={`relative self-stretch w-full h-[67px] bg-[#f5efe0] rounded-sm hover:border hover:border-solid hover:border-[#1662ef] transition-all cursor-pointer ${
                                    selectedMaterials.woodenFloor === `wood-${index}` ? 'ring-2 ring-[#1662ef]' : ''
                                  }`}
                                  onClick={() => handleMaterialSelect('woodenFloor', `wood-${index}`)}
                                />
                                <div className="relative self-stretch font-12-regular text-[#000000] text-[length:var(--12-regular-font-size)]">
                                  oak
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="absolute w-[1042px] h-[800px] top-[94px] left-[376px] rounded-2xl bg-[url('./images/sample.png')] bg-cover">
        {/* Regulation button */}
        <div className="inline-flex items-center justify-center gap-2.5 px-[22px] py-4 absolute top-[733px] left-[887px] bg-white rounded-[99999px]">
          <Regulation className="!relative !w-3.5 !h-3.5 mr-1" />
          <div className="relative w-fit mt-[-1.00px] font-14-mideum font-[number:var(--14-mideum-font-weight)] text-[#141414] text-[length:var(--14-mideum-font-size)] tracking-[var(--14-mideum-letter-spacing)] leading-[var(--14-mideum-line-height)] whitespace-nowrap [font-style:var(--14-mideum-font-style)]">
            Regulation
          </div>
        </div>

        {/* Comments button */}
        <div className="inline-flex items-center justify-center gap-2.5 px-[22px] py-4 absolute top-[733px] left-[26px] bg-white rounded-[99999px]">
          <div className="relative w-fit mt-[-1.00px] font-14-mideum font-[number:var(--14-mideum-font-weight)] text-[#141414] text-[length:var(--14-mideum-font-size)] tracking-[var(--14-mideum-letter-spacing)] leading-[var(--14-mideum-line-height)] whitespace-nowrap [font-style:var(--14-mideum-font-style)]">
            Comments
          </div>
        </div>
      </div>

      {/* Export Button */}
      <div 
        className="inline-flex items-center justify-center gap-2.5 px-[26px] py-[17px] absolute top-[22px] left-[1298px] bg-collection-1-main rounded-[99999px] cursor-pointer"
        onClick={() => setShowExportModal(true)}
      >
        <div className="inline-flex items-center gap-1.5 relative flex-[0_0_auto]">
          <img className="relative w-[13px] h-[13px]" alt="Subtract" src={symbol1} />
          <div className="relative w-fit mt-[-1.00px] font-16-medium font-[number:var(--16-medium-font-weight)] text-white text-[length:var(--16-medium-font-size)] tracking-[var(--16-medium-letter-spacing)] leading-[var(--16-medium-line-height)] whitespace-nowrap [font-style:var(--16-medium-font-style)]">
            Export
          </div>
        </div>
      </div>
      {/* Render Export Button Conditionally*/}
      {showExportModal && (
        <div className="absolute top-[70px] left-[1200px] z-50">
          <Export onClose={() => setShowExportModal(false)} />
        </div>
      )}
      {/* Regulation Modal Overlay */}
      {showRegulationModal && (
        <div 
          className="fixed inset-0 bg-[#4B5056] bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowRegulationModal(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <div className="flex flex-col w-[600px] items-center gap-3.5 pt-0 pb-5 px-0 relative bg-white rounded-2xl shadow-xl">
              <div className="flex flex-col w-full items-center px-5 py-0 relative flex-[0_0_auto]">
                <div className="flex items-center justify-between px-2.5 py-[22px] relative self-stretch w-full flex-[0_0_auto]">
                  <div className="inline-flex items-center gap-2 relative flex-[0_0_auto]">
                    <div className="[font-family:'Pretendard-SemiBold',Helvetica] font-semibold text-[#1662ef] text-xl text-center leading-5 relative w-fit mt-[-1.00px] tracking-[0] whitespace-nowrap">
                      Regulation
                    </div>
                  </div>

                  <button 
                    onClick={() => setShowRegulationModal(false)}
                    className="relative w-5 h-5 flex items-center justify-center"
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15 5L5 15M5 5L15 15" stroke="#606E7E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>

                <div className="relative self-stretch w-full h-px bg-gray-200"></div>
              </div>

              <div className="flex flex-col w-full items-start gap-[30px] px-5 py-0 relative flex-[0_0_auto]">
                <div className="flex flex-col items-start gap-3.5 px-2.5 py-0 relative self-stretch w-full flex-[0_0_auto]">
                  <div className="flex flex-col items-start gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
                    <div className="relative w-fit mt-[-1.00px] font-16-regular font-[number:var(--16-regular-font-weight)] text-[#8896a5] text-[length:var(--16-regular-font-size)] tracking-[var(--16-regular-letter-spacing)] leading-[var(--16-regular-line-height)] whitespace-nowrap [font-style:var(--16-regular-font-style)]">
                      박람회 선택
                    </div>

                    <div className="relative w-full">
                      <div 
                        className="flex items-center justify-between px-3.5 py-4 relative self-stretch w-full flex-[0_0_auto] bg-white rounded-[7px] border border-solid border-[#bbc4d0] cursor-pointer"
                        onClick={() => setShowExhibitionOptions(!showExhibitionOptions)}
                      >
                        <p className="relative w-fit mt-[-1.00px] font-16-medium font-[number:var(--16-medium-font-weight)] text-neutral-700 text-[length:var(--16-medium-font-size)] text-center tracking-[var(--16-medium-letter-spacing)] leading-[var(--16-medium-line-height)] whitespace-nowrap [font-style:var(--16-medium-font-style)]">
                          {selectedExhibition}
                        </p>

                        <Dropdown className="!relative !w-3 !h-3" />
                      </div>
                      
                      {/* Exhibition dropdown options */}
                      {showExhibitionOptions && (
                        <div className="absolute top-full left-0 w-full mt-1 bg-white rounded-[7px] border border-solid border-[#bbc4d0] z-20">
                          {exhibitionOptions.map((option, index) => (
                            <div 
                              key={index}
                              className="px-3.5 py-4 hover:bg-gray-100 cursor-pointer"
                              onClick={() => {
                                setSelectedExhibition(option);
                                setShowExhibitionOptions(false);
                              }}
                            >
                              <p className="font-16-medium text-neutral-700 text-[length:var(--16-medium-font-size)] leading-[var(--16-medium-line-height)]">
                                {option}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col items-start gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
                    <div className="relative w-fit mt-[-1.00px] font-16-regular font-[number:var(--16-regular-font-weight)] text-[#8896a5] text-[length:var(--16-regular-font-size)] tracking-[var(--16-regular-letter-spacing)] leading-[var(--16-regular-line-height)] whitespace-nowrap [font-style:var(--16-regular-font-style)]">
                      전시 홀 선택
                    </div>

                    <div className="relative w-full">
                      <div 
                        className="flex items-center justify-between px-3.5 py-4 relative self-stretch w-full flex-[0_0_auto] bg-white rounded-[7px] border border-solid border-[#bbc4d0] cursor-pointer"
                        onClick={() => setShowHallOptions(!showHallOptions)}
                      >
                        <div className="relative w-fit mt-[-1.00px] font-16-medium font-[number:var(--16-medium-font-weight)] text-neutral-700 text-[length:var(--16-medium-font-size)] text-center tracking-[var(--16-medium-letter-spacing)] leading-[var(--16-medium-line-height)] whitespace-nowrap [font-style:var(--16-medium-font-style)]">
                          {selectedHall}
                        </div>

                        <Dropdown className="!relative !w-3 !h-3" />
                      </div>
                      
                      {/* Hall dropdown options */}
                      {showHallOptions && (
                        <div className="absolute top-full left-0 w-full mt-1 bg-white rounded-[7px] border border-solid border-[#bbc4d0] z-20">
                          {hallOptions.map((option, index) => (
                            <div 
                              key={index}
                              className="px-3.5 py-4 hover:bg-gray-100 cursor-pointer"
                              onClick={() => {
                                setSelectedHall(option);
                                setShowHallOptions(false);
                              }}
                            >
                              <div className="font-16-medium text-neutral-700 text-[length:var(--16-medium-font-size)] leading-[var(--16-medium-line-height)]">
                                {option}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <button 
                  className="flex items-center justify-center gap-2.5 px-[22px] py-[15px] relative self-stretch w-full flex-[0_0_auto] bg-[#1662ef] rounded-[99999px] cursor-pointer hover:bg-[#1255d4] transition-colors"
                  onClick={handleRegulationApply}
                >
                  <div className="font-14-mideum font-[number:var(--14-mideum-font-weight)] text-white text-[length:var(--14-mideum-font-size)] leading-[var(--14-mideum-line-height)] relative w-fit mt-[-1.00px] tracking-[var(--14-mideum-letter-spacing)] whitespace-nowrap [font-style:var(--14-mideum-font-style)]">
                    적용하기
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
