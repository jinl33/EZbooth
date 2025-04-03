// components/Regulation.tsx
import React, { FC, useState } from "react";
import { useTranslation } from '../LanguageContext';

interface RegulationProps {
  className?: string;
  color?: string;
  onClick?: () => void;
}

export const Regulation: FC<RegulationProps> = ({ 
  className, 
}) => {
  const [showRegulationsModal, setShowRegulationsModal] = useState(false);
  const [heightRestrictionOpen, setHeightRestrictionOpen] = useState(false);
  const [prohibitedActionsOpen, setProhibitedActionsOpen] = useState(false);
  
  // Toggle handlers for each dropdown
  const toggleHeightRestrictions = (e: React.MouseEvent) => {
    e.stopPropagation();
    setHeightRestrictionOpen(!heightRestrictionOpen);
  };

  const toggleProhibitedActions = (e: React.MouseEvent) => {
    e.stopPropagation();
    setProhibitedActionsOpen(!prohibitedActionsOpen);
  };

  const { t } = useTranslation('regulation');

  return (
    <>
      {/* Regulation button */}
      <button 
        className={`${className} inline-flex items-center justify-center`}
        onClick={() => setShowRegulationsModal(!showRegulationsModal)}
      >
        <svg 
          className="w-full h-full" 
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
      </button>
  
      {/* Regulations Modal */}
      {showRegulationsModal && (
        <div 
          className="fixed inset-0 bg-[#4B5056] bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowRegulationsModal(false)}
        >
          <div 
            className="w-[1160px] h-[650px]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-[1160px] h-[650px] bg-white rounded-2xl shadow-[4px_4px_4px_#0000001a]">
              <div className="relative h-[618px]">
                <div className="flex flex-col w-[1160px] h-[605px] items-center gap-5 absolute top-0 left-0">
                  <div className="flex flex-col items-center px-5 py-0 relative self-stretch w-full flex-[0_0_auto]">
                    <div className="flex items-center gap-5 px-2.5 py-3.5 relative self-stretch w-full flex-[0_0_auto]">
                      <div className="flex items-center justify-between relative flex-1 grow">
                        <div className="inline-flex items-center gap-2 relative flex-[0_0_auto]">
                          <div className="!relative !w-[22px] !h-[22px]">
                            <svg width="100%" height="100%" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path 
                                d="M7 9.1C8.1 9.1 9 8.2 9 7.1C9 6 8.1 5.1 7 5.1C5.9 5.1 5 6 5 7.1C5 8.2 5.9 9.1 7 9.1Z" 
                                stroke="#1662ef" 
                                strokeWidth="1.2"
                              />
                              <path 
                                d="M11.5 7.1C11.5 6.9 11.5 6.7 11.4 6.5L12.8 5.4C13 5.2 13 5 12.9 4.8L11.7 2.8C11.6 2.6 11.4 2.5 11.2 2.6L9.6 3.2C9.3 3 9 2.8 8.6 2.7L8.4 1C8.4 0.8 8.2 0.6 8 0.6H5.6C5.4 0.6 5.2 0.8 5.2 1L5 2.7C4.6 2.8 4.3 3 4 3.2L2.4 2.6C2.2 2.5 2 2.6 1.9 2.8L0.7 4.8C0.6 5 0.6 5.2 0.8 5.4L2.2 6.5C2.2 6.7 2.1 6.9 2.1 7.1C2.1 7.3 2.1 7.5 2.2 7.7L0.8 8.8C0.6 9 0.6 9.2 0.7 9.4L1.9 11.4C2 11.6 2.2 11.7 2.4 11.6L4 11C4.3 11.2 4.6 11.4 5 11.5L5.2 13.2C5.2 13.4 5.4 13.6 5.6 13.6H8C8.2 13.6 8.4 13.4 8.4 13.2L8.6 11.5C9 11.4 9.3 11.2 9.6 11L11.2 11.6C11.4 11.7 11.6 11.6 11.7 11.4L12.9 9.4C13 9.2 13 9 12.8 8.8L11.4 7.7C11.5 7.5 11.5 7.3 11.5 7.1Z" 
                                stroke="#1662ef" 
                                strokeWidth="1.2"
                              />
                            </svg>
                          </div>
                          <div className="[font-family:'Pretendard-SemiBold',Helvetica] font-semibold text-xl text-center leading-5 relative w-fit text-[#1662ef] tracking-[0] whitespace-nowrap">
                            Regulation
                          </div>
                        </div>
  
                        <div className="inline-flex items-center justify-center gap-2.5 px-[22px] py-[15px] relative flex-[0_0_auto] bg-white rounded-[99999px] border border-solid border-[#b3c3d2]">
                          <div className="mt-[-1.00px] font-14-mideum font-[number:var(--14-mideum-font-weight)] text-[length:var(--14-mideum-font-size)] leading-[var(--14-mideum-line-height)] relative w-fit text-[#1662ef] tracking-[var(--14-mideum-letter-spacing)] whitespace-nowrap [font-style:var(--14-mideum-font-style)]">
                            {t("레귤레이션 설정")}
                          </div>
                        </div>
                      </div>
  
                      <button 
                        onClick={() => setShowRegulationsModal(false)}
                        className="relative w-5 h-5 flex items-center justify-center cursor-pointer"
                      >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M15 5L5 15M5 5L15 15" stroke="#606E7E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
  
                    <div className="relative self-stretch w-full h-px bg-gray-200"></div>
                  </div>
  
                  <div className="flex flex-col w-[1101px] items-start gap-10 relative flex-[0_0_auto]">
                    {/* Modal Content Section */}
                    <div className="flex flex-col items-start gap-5 relative self-stretch w-full flex-[0_0_auto]">
                      <div className="relative self-stretch mt-[-1.00px] font-16-semibold font-[number:var(--16-semibold-font-weight)] text-[#000000] text-[length:var(--16-semibold-font-size)] tracking-[var(--16-semibold-letter-spacing)] leading-[var(--16-semibold-line-height)] [font-style:var(--16-semibold-font-style)]">
                        General Stand Construction Regulations
                      </div>
                      {/* Regulation Options */}
                      <div className="flex flex-col items-start gap-3.5 relative self-stretch w-full flex-[0_0_auto]">
                        <div className="absolute flex items-center gap-6 relative self-stretch w-full flex-[0_0_auto]">
                        {/* Regulation Option 1 */}
                        {/* Height Restrictions Dropdown */}
                        <div className="relative flex-1 grow">
                          <div 
                            className={`flex items-center justify-between px-3.5 py-4 relative flex-1 grow bg-white ${heightRestrictionOpen ? 'rounded-t-[10px] border-b-0' : 'rounded-[10px]'} border border-solid border-[#bbc4d0] cursor-pointer`}
                            onClick={toggleHeightRestrictions}
                          >
                            <div className="relative w-fit mt-[-1.00px] font-16-semibold font-[number:var(--16-semibold-font-weight)] text-neutral-700 text-[length:var(--16-semibold-font-size)] text-center tracking-[var(--16-semibold-letter-spacing)] leading-[var(--16-semibold-line-height)] whitespace-nowrap [font-style:var(--16-semibold-font-style)]">
                              Stand Height Restrictions
                            </div>
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={`transform transition-transform ${heightRestrictionOpen ? 'rotate-180' : ''}`}>
                              <path d="M9 4.5L6 7.5L3 4.5" stroke="#888484" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>

                          {/* Dropdown for Height Restrictions */}
                          {heightRestrictionOpen && (
                            <div className="absolute top-[48px] left-0 right-0 bg-white rounded-b-[10px] border border-t-0 border-solid border-[#bbc4d0] z-20">
                              <div className="px-3.5">
                                {/* Separator */}
                                <div className="h-px w-full bg-[#e5e7eb]"></div>
                              </div>
                              {/* Content section with options */}
                              <div className="px-3.5 pb-3">
                                {/* Option 1 */}
                                <div className="mb-4 mt-2">
                                  <div className="font-12-regular font-[number:var(--12-regular-font-weight)] text-[#8896a5] text-[length:var(--12-regular-font-size)] tracking-[var(--12-regular-letter-spacing)] leading-[var(--12-regular-line-height)] whitespace-nowrap [font-style:var(--12-regular-font-style)]">
                                    Cruise Terminal Lower Level
                                  </div>
                                  <div className="mt-1 font-12-regular font-[number:var(--12-regular-font-weight)] text-[#1e1e1e] text-[length:var(--12-regular-font-size)] tracking-[var(--12-regular-letter-spacing)] leading-[var(--12-regular-line-height)] whitespace-nowrap [font-style:var(--12-regular-font-style)]">
                                    Maximum height of 2m
                                  </div>
                                </div>
                                
                                {/* Option 2 */}
                                <div>
                                  <div className="font-12-regular font-[number:var(--12-regular-font-weight)] text-[#8896a5] text-[length:var(--12-regular-font-size)] tracking-[var(--12-regular-letter-spacing)] leading-[var(--12-regular-line-height)] whitespace-nowrap [font-style:var(--12-regular-font-style)]">
                                    Cruise Terminal Upper Level
                                  </div>
                                  <div className="mt-1 font-12-regular font-[number:var(--12-regular-font-weight)] text-[#1e1e1e] text-[length:var(--12-regular-font-size)] tracking-[var(--12-regular-letter-spacing)] leading-[var(--12-regular-line-height)] whitespace-nowrap [font-style:var(--12-regular-font-style)]">
                                    Maximum height of 3m
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Prohibited Actions Dropdown */}
                        <div className="relative flex-1 grow">
                          <div 
                            className={`flex items-center justify-between px-3.5 py-4 relative flex-1 grow bg-white ${prohibitedActionsOpen ? 'rounded-t-[10px] border-b-0' : 'rounded-[10px]'} border border-solid border-[#bbc4d0] cursor-pointer`}
                            onClick={toggleProhibitedActions}
                          >
                            <div className="relative w-fit mt-[-1.00px] font-16-semibold font-[number:var(--16-semibold-font-weight)] text-neutral-700 text-[length:var(--16-semibold-font-size)] text-center tracking-[var(--16-semibold-letter-spacing)] leading-[var(--16-semibold-line-height)] whitespace-nowrap [font-style:var(--16-semibold-font-style)]">
                              Prohibited Actions
                            </div>
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={`transform transition-transform ${prohibitedActionsOpen ? 'rotate-180' : ''}`}>
                              <path d="M9 4.5L6 7.5L3 4.5" stroke="#888484" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>

                          {/* Dropdown for Prohibited Actions - absolute positioned */}
                          {prohibitedActionsOpen && (
                            <div className="absolute top-[48px] left-0 right-0 bg-white rounded-b-[10px] border border-t-0 border-solid border-[#bbc4d0] z-20">
                              <div className="px-3.5">
                                {/* Separator */}
                                <div className="h-px w-full bg-[#e5e7eb]"></div>
                              </div>
                              {/* Content section with options */}
                              <div className="px-3.5 pb-3">
                                <div className="mb-4 mt-2">
                                  <div className="font-12-regular font-[number:var(--12-regular-font-weight)] text-[#8896a5] text-[length:var(--12-regular-font-size)] tracking-[var(--12-regular-letter-spacing)] leading-[var(--12-regular-line-height)] whitespace-nowrap [font-style:var(--12-regular-font-style)]">
                                    Safety Regulations
                                  </div>
                                  <div className="mt-1 font-12-regular font-[number:var(--12-regular-font-weight)] text-[#1e1e1e] text-[length:var(--12-regular-font-size)] tracking-[var(--12-regular-letter-spacing)] leading-[var(--12-regular-line-height)] [font-style:var(--12-regular-font-style)]">
                                    No welding or cutting operations without prior approval
                                  </div>
                                </div>
                                
                                <div className="mb-4">
                                  <div className="mt-1 font-12-regular font-[number:var(--12-regular-font-weight)] text-[#1e1e1e] text-[length:var(--12-regular-font-size)] tracking-[var(--12-regular-letter-spacing)] leading-[var(--12-regular-line-height)] [font-style:var(--12-regular-font-style)]">
                                    No use of flammable materials without fire retardant treatment
                                  </div>
                                </div>
                                
                                <div>
                                  <div className="font-12-regular font-[number:var(--12-regular-font-weight)] text-[#8896a5] text-[length:var(--12-regular-font-size)] tracking-[var(--12-regular-letter-spacing)] leading-[var(--12-regular-line-height)] whitespace-nowrap [font-style:var(--12-regular-font-style)]">
                                    Structural Prohibitions
                                  </div>
                                  <div className="mt-1 font-12-regular font-[number:var(--12-regular-font-weight)] text-[#1e1e1e] text-[length:var(--12-regular-font-size)] tracking-[var(--12-regular-letter-spacing)] leading-[var(--12-regular-line-height)] [font-style:var(--12-regular-font-style)]">
                                    No hanging structures from the ceiling without engineering approval
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                        {/* Wall Construction Option */}
                        <div className="w-[351px] px-3.5 py-4 flex h-12 items-center justify-between relative bg-white rounded-[10px] border border-solid border-[#bbc4d0]">
                          <div className="relative w-fit mt-[-1.00px] font-16-semibold font-[number:var(--16-semibold-font-weight)] text-neutral-700 text-[length:var(--16-semibold-font-size)] text-center tracking-[var(--16-semibold-letter-spacing)] leading-[var(--16-semibold-line-height)] whitespace-nowrap [font-style:var(--16-semibold-font-style)]">
                            Wall Construction
                          </div>
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 4.5L6 7.5L3 4.5" stroke="#888484" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                    </div>
                    {/* Rigging Regulations Section */}
                    <div className="flex flex-col w-[351px] items-start gap-5 relative flex-[0_0_auto]">
                      <div className="self-stretch mt-[-1.00px] font-16-semibold text-[#000000] leading-[var(--16-semibold-line-height)] relative font-[number:var(--16-semibold-font-weight)] text-[length:var(--16-semibold-font-size)] tracking-[var(--16-semibold-letter-spacing)] [font-style:var(--16-semibold-font-style)]">
                        Rigging Regulations
                      </div>
  
                      <div className="px-3.5 py-4 self-stretch w-full flex h-12 items-center justify-between relative bg-white rounded-[10px] border border-solid border-[#bbc4d0]">
                        <div className="w-fit mt-[-4.00px] mb-[-2.00px] [font-family:'Inter-SemiBold',Helvetica] text-neutral-700 text-center leading-[22.4px] whitespace-nowrap relative font-semibold text-base tracking-[0]">
                          Rigging Restrictions
                        </div>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9 4.5L6 7.5L3 4.5" stroke="#888484" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
  
                    {/* Platform Section */}
                    <div className="flex flex-col items-start gap-5 relative self-stretch w-full flex-[0_0_auto]">
                      <div className="relative self-stretch mt-[-1.00px] font-16-semibold font-[number:var(--16-semibold-font-weight)] text-[#000000] text-[length:var(--16-semibold-font-size)] tracking-[var(--16-semibold-letter-spacing)] leading-[var(--16-semibold-line-height)] [font-style:var(--16-semibold-font-style)]">
                        Platform
                      </div>
  
                      <div className="flex items-center gap-6 relative self-stretch w-full flex-[0_0_auto]">
                        {/* Platform Option 1 */}
                        <div className="px-3.5 py-4 flex-1 grow flex h-12 items-center justify-between relative bg-white rounded-[10px] border border-solid border-[#bbc4d0]">
                          <div className="w-fit mt-[-4.00px] mb-[-2.00px] [font-family:'Inter-SemiBold',Helvetica] text-neutral-700 text-center leading-[22.4px] whitespace-nowrap relative font-semibold text-base tracking-[0]">
                            Rigging Restrictions
                          </div>
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 4.5L6 7.5L3 4.5" stroke="#888484" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
  
                        {/* Platform Option 2 */}
                        <div className="px-3.5 py-4 flex-1 grow flex h-12 items-center justify-between relative bg-white rounded-[10px] border border-solid border-[#bbc4d0]">
                          <div className="relative w-fit mt-[-1.00px] font-16-semibold font-[number:var(--16-semibold-font-weight)] text-neutral-700 text-[length:var(--16-semibold-font-size)] text-center tracking-[var(--16-semibold-letter-spacing)] leading-[var(--16-semibold-line-height)] whitespace-nowrap [font-style:var(--16-semibold-font-style)]">
                            Floor Covering
                          </div>
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 4.5L6 7.5L3 4.5" stroke="#888484" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
  
                        {/* Platform Option 3 */}
                        <div className="pt-4 pb-[18px] px-3.5 flex-1 grow flex h-12 items-center justify-between relative bg-white rounded-[10px] border border-solid border-[#bbc4d0]">
                          <div className="relative w-fit mt-[-2.00px] font-16-semibold font-[number:var(--16-semibold-font-weight)] text-neutral-700 text-[length:var(--16-semibold-font-size)] text-center tracking-[var(--16-semibold-letter-spacing)] leading-[var(--16-semibold-line-height)] whitespace-nowrap [font-style:var(--16-semibold-font-style)]">
                            Floor Load Capacity
                          </div>
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 4.5L6 7.5L3 4.5" stroke="#888484" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
  
                {/* Scrollbar */}
                <div className="absolute w-1 h-[532px] top-[86px] left-[1148px] bg-[#f4f5f7] rounded-[99px] overflow-auto">
                  <div className="h-[89px] bg-[#c7cdd4] rounded-[99px]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};  