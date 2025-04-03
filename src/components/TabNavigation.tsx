// src/components/TabNavigation.tsx
import React from "react";
import { Change } from "./Change";
import { useTranslation } from "../LanguageContext";
import { translations, translatePreservingSpecialChars } from "../translations";

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  unit: 'ft' | 'm';
  onUnitChange: (unit: 'ft' | 'm') => void;
  expandedFurnitureSections: {
    set: boolean;
    individual: boolean;
  };
  toggleFurnitureSection: (section: 'set' | 'individual') => void;
  vector39: string;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  onTabChange,
  unit,
  onUnitChange,
  expandedFurnitureSections,
  toggleFurnitureSection,
  vector39
}) => {
  const toggleUnit = () => {
    onUnitChange(unit === 'ft' ? 'm' : 'ft');
  };

  const { t, language } = useTranslation('tab');

  // Helper function to translate text while preserving special characters
  const tp = (text: string): string => {
    if (!text || language === 'ko') return text;
    
    const dictionary = translations.tab.en;
    return translatePreservingSpecialChars(text, dictionary);
  };

  // Render furniture tab content
  const renderFurnitureContent = () => {
    return (
      <div className="flex flex-col w-full items-start">
        {renderSetSection()}
        {renderIndividualSection()}
      </div>
    );
  };

  // Render Set section
  const renderSetSection = () => {
    return (
      <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
        <div className="flex flex-col items-center relative self-stretch w-full flex-[0_0_auto]">
          <div 
            className="flex items-center justify-between px-2.5 py-3 relative self-stretch w-full flex-[0_0_auto] cursor-pointer"
            onClick={() => toggleFurnitureSection('set')}
          >
            <div className="relative w-fit mt-[-1.00px] font-16-regular font-[number:var(--16-regular-font-weight)] text-[#000000] text-[length:var(--16-regular-font-size)] tracking-[var(--16-regular-letter-spacing)] leading-[var(--16-regular-line-height)] whitespace-nowrap [font-style:var(--16-regular-font-style)]">
              {t("Set")}
            </div>

            <div className={`transform ${expandedFurnitureSections.set ? 'rotate-180' : ''} transition-transform`}>
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.6667 6L8 10.6667L3.33334 6" stroke="#888484" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          <img
            className="relative self-stretch w-full h-px mb-[-0.50px] object-cover"
            alt="Vector"
            src={vector39}
          />
        </div>

        {expandedFurnitureSections.set && (
          <div className="flex flex-col items-center gap-5 px-2.5 py-3.5 relative self-stretch w-full flex-[0_0_auto]">
            <div className="flex flex-col w-[294px] items-start gap-5 relative flex-[0_0_auto]">
              {/* Row 1 */}
              <div className="flex items-center gap-3 relative self-stretch w-full flex-[0_0_auto]">
                <div className="flex flex-col w-[141px] items-start gap-1.5 relative">
                  <div className="flex h-[90px] items-center justify-center gap-2.5 px-8 py-[21px] relative self-stretch w-full bg-[#eeeeee] rounded-sm">
                    <div className="w-fit mt-[-1.00px] text-ellipsis whitespace-nowrap font-16-medium font-[number:var(--16-medium-font-weight)] text-[#000000] text-[length:var(--16-medium-font-size)] text-center leading-[var(--16-medium-line-height)] relative tracking-[var(--16-medium-letter-spacing)] [font-style:var(--16-medium-font-style)]">
                      {tp("인포데스크1")}
                      <br />
                      {tp("테이블1")}
                      <br />
                      {tp("의자4")}
                    </div>
                  </div>

                  <div className="relative self-stretch [font-family:'Pretendard-Regular',Helvetica] font-normal text-[#000000] text-sm tracking-[0] leading-[14px]">
                    {tp("미팅형1(S)")}
                  </div>
                </div>

                <div className="flex flex-col w-[141px] items-start gap-1.5 relative">
                  <div className="flex h-[90px] items-center justify-center gap-2.5 px-8 py-[13px] relative self-stretch w-full bg-[#eeeeee] rounded-sm">
                    <div className="w-fit mt-[-1.00px] text-ellipsis whitespace-nowrap font-16-medium font-[number:var(--16-medium-font-weight)] text-[#000000] text-[length:var(--16-medium-font-size)] text-center leading-[var(--16-medium-line-height)] relative tracking-[var(--16-medium-letter-spacing)] [font-style:var(--16-medium-font-style)]">
                      {tp("인포데스크1")}
                      <br />
                      {tp("테이블1")}
                      <br />
                      {tp("의자4")}
                      <br />
                      {tp("쇼케이스1")}
                    </div>
                  </div>

                  <div className="relative self-stretch [font-family:'Pretendard-Regular',Helvetica] font-normal text-[#000000] text-sm tracking-[0] leading-[14px]">
                    {tp("미팅형2(S)")}
                  </div>
                </div>
              </div>

              {/* Row 2 */}
              <div className="flex items-center gap-3 relative self-stretch w-full flex-[0_0_auto]">
                <div className="flex flex-col w-[141px] items-start gap-1.5 relative">
                  <div className="flex h-[90px] items-center justify-center gap-2.5 px-8 py-[13px] relative self-stretch w-full bg-[#eeeeee] rounded-sm">
                    <div className="w-fit mt-[-1.00px] text-ellipsis whitespace-nowrap font-16-medium font-[number:var(--16-medium-font-weight)] text-[#000000] text-[length:var(--16-medium-font-size)] text-center leading-[var(--16-medium-line-height)] relative tracking-[var(--16-medium-letter-spacing)] [font-style:var(--16-medium-font-style)]">
                      {tp("인포데스크1")}
                      <br />
                      {tp("테이블2")}
                      <br />
                      {tp("의자8")}
                      <br />
                      {tp("쇼케이스2")}
                    </div>
                  </div>

                  <div className="relative self-stretch [font-family:'Pretendard-Regular',Helvetica] font-normal text-[#000000] text-sm tracking-[0] leading-[14px]">
                    {tp("미팅형3(M)")}
                  </div>
                </div>

                <div className="flex flex-col w-[141px] items-start gap-1.5 relative">
                  <div className="flex h-[90px] items-center justify-center gap-2.5 px-[29px] py-[11px] relative self-stretch w-full bg-[#eeeeee] rounded-sm">
                    <p className="w-fit mt-[-1.00px] text-ellipsis whitespace-nowrap font-16-medium font-[number:var(--16-medium-font-weight)] text-[#000000] text-[length:var(--16-medium-font-size)] text-center leading-[var(--16-medium-line-height)] relative tracking-[var(--16-medium-letter-spacing)] [font-style:var(--16-medium-font-style)]">
                      {tp("인포데스크1")}
                      <br />
                      {tp("전시 선반2")}
                      <br />
                      {tp("스탠딩 의자2")}
                      <br />
                      {tp("쇼케이스1")}
                    </p>
                  </div>

                  <div className="relative self-stretch [font-family:'Pretendard-Regular',Helvetica] font-normal text-[#000000] text-sm tracking-[0] leading-[14px]">
                    {tp("전시형1(S)")}
                  </div>
                </div>
              </div>

              {/* Row 3 */}
              <div className="flex items-center gap-3 relative self-stretch w-full flex-[0_0_auto]">
                <div className="flex flex-col w-[141px] items-start gap-1.5 relative">
                  <div className="flex h-[90px] items-center justify-center gap-2.5 px-[30px] py-[13px] relative self-stretch w-full bg-[#eeeeee] rounded-sm">
                    <div className="w-fit mt-[-1.00px] text-ellipsis whitespace-nowrap font-16-medium font-[number:var(--16-medium-font-weight)] text-[#000000] text-[length:var(--16-medium-font-size)] text-center leading-[var(--16-medium-line-height)] relative tracking-[var(--16-medium-letter-spacing)] [font-style:var(--16-medium-font-style)]">
                      {tp("인포데스크1")}
                      <br />
                      {tp("전시 선반2")}
                      <br />
                      {tp("스탠딩 의자1")}
                      <br />
                      {tp("쇼케이스2")}
                    </div>
                  </div>

                  <div className="relative self-stretch [font-family:'Pretendard-Regular',Helvetica] font-normal text-[#000000] text-sm tracking-[0] leading-[14px]">
                    {tp("전시형2(M)")}
                  </div>
                </div>

                <div className="flex flex-col w-[141px] items-start gap-1.5 relative">
                  <div className="flex h-[90px] items-center justify-center gap-2.5 px-8 py-[12px] relative self-stretch w-full bg-[#eeeeee] rounded-sm">
                    <p className="w-fit mt-[-1.00px] text-ellipsis whitespace-nowrap font-16-medium font-[number:var(--16-medium-font-weight)] text-[#000000] text-[length:var(--16-medium-font-size)] text-center leading-[var(--16-medium-line-height)] relative tracking-[var(--16-medium-letter-spacing)] [font-style:var(--16-medium-font-style)]">
                      {tp("인포데스크1")}
                      <br />
                      {tp("전시 선반2")}
                      <br />
                      {tp("테이블1/의자4")}
                      <br />
                      {tp("스탠딩 의자2")}
                      <br />
                      {tp("쇼케이스 1")}
                    </p>
                  </div>

                  <div className="relative self-stretch [font-family:'Pretendard-Regular',Helvetica] font-normal text-[#000000] text-sm tracking-[0] leading-[14px]">
                    {tp("전시/미팅형1(S)")}
                  </div>
                </div>
              </div>
            </div>

            <div className="inline-flex items-center justify-center gap-2.5 px-[11px] py-[9px] relative flex-[0_0_auto] bg-[#bbc4d0] hover:bg-[#1662ef] transition-colors rounded-[99999px] cursor-pointer">
              <div className="relative w-fit mt-[-1.00px] font-12-regular font-[number:var(--12-regular-font-weight)] text-white text-[length:var(--12-regular-font-size)] tracking-[var(--12-regular-letter-spacing)] leading-[var(--12-regular-line-height)] whitespace-nowrap [font-style:var(--12-regular-font-style)]">
                {t("apply")}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Render Individual section
  const renderIndividualSection = () => {
    return (
      <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
        <div className="flex flex-col items-center relative self-stretch w-full flex-[0_0_auto]">
          <div 
            className="flex items-center justify-between px-2.5 py-3 relative self-stretch w-full flex-[0_0_auto] cursor-pointer"
            onClick={() => toggleFurnitureSection('individual')}
          >
            <div className="relative w-fit mt-[-1.00px] font-16-regular font-[number:var(--16-regular-font-weight)] text-[#000000] text-[length:var(--16-regular-font-size)] tracking-[var(--16-regular-letter-spacing)] leading-[var(--16-regular-line-height)] whitespace-nowrap [font-style:var(--16-regular-font-style)]">
              {t("Individual")}
            </div>

            <div className={`transform ${expandedFurnitureSections.individual ? 'rotate-180' : ''} transition-transform`}>
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.6667 6L8 10.6667L3.33334 6" stroke="#888484" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          <img
            className="relative self-stretch w-full h-px mb-[-0.50px] object-cover"
            alt="Vector"
            src={vector39}
          />
        </div>

        {expandedFurnitureSections.individual && (
          <div className="flex flex-col items-center gap-5 px-2.5 py-3.5 relative self-stretch w-full flex-[0_0_auto]">
            <div className="flex flex-col w-[294px] items-start gap-5 relative flex-[0_0_auto]">
              {/* Row 1 */}
              <div className="flex items-center gap-3 relative self-stretch w-full flex-[0_0_auto]">
                <div className="w-[90px] gap-1.5 flex flex-col items-start relative">
                  <div className="relative self-stretch w-full h-[90px] bg-[#eeeeee] rounded-sm" />

                  <div className="gap-1 self-stretch w-full flex-[0_0_auto] flex flex-col items-start relative">
                    <div className="relative self-stretch mt-[-1.00px] font-14-regular font-[number:var(--14-regular-font-weight)] text-[#000000] text-[length:var(--14-regular-font-size)] tracking-[var(--14-regular-letter-spacing)] leading-[var(--14-regular-line-height)] [font-style:var(--14-regular-font-style)]">
                      {tp("인포데스크1")}
                    </div>

                    <div className="relative self-stretch font-12-regular font-[number:var(--12-regular-font-weight)] text-[#000000] text-[length:var(--12-regular-font-size)] tracking-[var(--12-regular-letter-spacing)] leading-[var(--12-regular-line-height)] [font-style:var(--12-regular-font-style)]">
                      H:1200
                    </div>
                  </div>
                </div>

                <div className="w-[90px] gap-1.5 flex flex-col items-start relative">
                  <div className="relative self-stretch w-full h-[90px] bg-[#eeeeee] rounded-sm" />

                  <div className="gap-1 self-stretch w-full flex-[0_0_auto] flex flex-col items-start relative">
                    <div className="relative self-stretch mt-[-1.00px] font-14-regular font-[number:var(--14-regular-font-weight)] text-[#000000] text-[length:var(--14-regular-font-size)] tracking-[var(--14-regular-letter-spacing)] leading-[var(--14-regular-line-height)] [font-style:var(--14-regular-font-style)]">
                      {tp("인포데스크2")}
                    </div>

                    <div className="relative self-stretch font-12-regular font-[number:var(--12-regular-font-weight)] text-[#000000] text-[length:var(--12-regular-font-size)] tracking-[var(--12-regular-letter-spacing)] leading-[var(--12-regular-line-height)] [font-style:var(--12-regular-font-style)]">
                      H:1000
                    </div>
                  </div>
                </div>

                <div className="w-[90px] gap-1.5 flex flex-col items-start relative">
                  <div className="relative self-stretch w-full h-[90px] bg-[#eeeeee] rounded-sm" />

                  <div className="gap-1 self-stretch w-full flex-[0_0_auto] flex flex-col items-start relative">
                    <div className="relative self-stretch mt-[-1.00px] font-14-regular font-[number:var(--14-regular-font-weight)] text-[#000000] text-[length:var(--14-regular-font-size)] tracking-[var(--14-regular-letter-spacing)] leading-[var(--14-regular-line-height)] [font-style:var(--14-regular-font-style)]">
                      {t("스탠딩 의자")}
                    </div>

                    <div className="relative self-stretch font-12-regular font-[number:var(--12-regular-font-weight)] text-[#000000] text-[length:var(--12-regular-font-size)] tracking-[var(--12-regular-letter-spacing)] leading-[var(--12-regular-line-height)] [font-style:var(--12-regular-font-style)]">
                      H:1000
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 2 */}
              <div className="flex items-center gap-3 relative self-stretch w-full flex-[0_0_auto]">
                <div className="w-[90px] gap-1.5 flex flex-col items-start relative">
                  <div className="relative self-stretch w-full h-[90px] bg-[#eeeeee] rounded-sm" />

                  <div className="gap-1 self-stretch w-full flex-[0_0_auto] flex flex-col items-start relative">
                    <div className="relative self-stretch mt-[-1.00px] font-14-regular font-[number:var(--14-regular-font-weight)] text-[#000000] text-[length:var(--14-regular-font-size)] tracking-[var(--14-regular-letter-spacing)] leading-[var(--14-regular-line-height)] [font-style:var(--14-regular-font-style)]">
                      {t("전시 선반")}
                    </div>

                    <div className="relative self-stretch font-12-regular font-[number:var(--12-regular-font-weight)] text-[#000000] text-[length:var(--12-regular-font-size)] tracking-[var(--12-regular-letter-spacing)] leading-[var(--12-regular-line-height)] [font-style:var(--12-regular-font-style)]">
                      W:900 H:600
                    </div>
                  </div>
                </div>

                <div className="w-[90px] gap-1.5 flex flex-col items-start relative">
                  <div className="relative self-stretch w-full h-[90px] bg-[#eeeeee] rounded-sm" />

                  <div className="gap-1 self-stretch w-full flex-[0_0_auto] flex flex-col items-start relative">
                    <div className="relative self-stretch mt-[-1.00px] font-14-regular font-[number:var(--14-regular-font-weight)] text-[#000000] text-[length:var(--14-regular-font-size)] tracking-[var(--14-regular-letter-spacing)] leading-[var(--14-regular-line-height)] [font-style:var(--14-regular-font-style)]">
                      {t("목공 쇼케이스")}
                    </div>

                    <div className="relative self-stretch font-12-regular font-[number:var(--12-regular-font-weight)] text-[#000000] text-[length:var(--12-regular-font-size)] tracking-[var(--12-regular-letter-spacing)] leading-[var(--12-regular-line-height)] [font-style:var(--12-regular-font-style)]">
                      H:1100
                    </div>
                  </div>
                </div>

                <div className="w-[90px] gap-1.5 flex flex-col items-start relative">
                  <div className="relative self-stretch w-full h-[90px] bg-[#eeeeee] rounded-sm" />

                  <div className="gap-1 self-stretch w-full flex-[0_0_auto] flex flex-col items-start relative">
                    <div className="self-stretch mt-[-1.00px] [font-family:'Pretendard-Regular',Helvetica] font-normal text-[#000000] text-sm leading-[14px] relative tracking-[0]">
                      {t("알루미늄 쇼케이스")}
                    </div>

                    <div className="relative self-stretch font-12-regular font-[number:var(--12-regular-font-weight)] text-[#000000] text-[length:var(--12-regular-font-size)] tracking-[var(--12-regular-letter-spacing)] leading-[var(--12-regular-line-height)] [font-style:var(--12-regular-font-style)]">
                      H:1100
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="inline-flex items-center justify-center gap-2.5 px-[11px] py-[9px] relative flex-[0_0_auto] bg-[#bbc4d0] hover:bg-[#1662ef] transition-colors rounded-[99999px] cursor-pointer">
              <div className="relative w-fit mt-[-1.00px] font-12-regular font-[number:var(--12-regular-font-weight)] text-white text-[length:var(--12-regular-font-size)] tracking-[var(--12-regular-letter-spacing)] leading-[var(--12-regular-line-height)] whitespace-nowrap [font-style:var(--12-regular-font-style)]">
                {t("apply")}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Tab Buttons */}
      <div className="flex items-center justify-between pl-0 pr-1 py-0 relative self-stretch w-full">
        <div className="inline-flex items-center gap-1.5">
          <button 
            className={`px-2.5 py-[7px] rounded-[99px] ${
              activeTab === '구조' ? 'bg-[#efefef]' : 'bg-white'
            }`}
            onClick={() => onTabChange('구조')}
          >
            <div className={`font-14-regular whitespace-nowrap text-${activeTab === '구조' ? '[#000000]' : '[#878484]'}`}>
              {t("구조")}
            </div>
          </button>
          <button 
            className={`px-2.5 py-[7px] rounded-[999px] ${
              activeTab === '가구' ? 'bg-[#efefef]' : 'bg-white'
            }`}
            onClick={() => onTabChange('가구')}
          >
            <div className={`font-14-regular whitespace-nowrap text-${activeTab === '가구' ? '[#000000]' : '[#878484]'}`}>
              {t("가구")}
            </div>
          </button>
          <button 
            className={`px-2.5 py-[7px] rounded-[999px] ${
              activeTab === '재질' ? 'bg-[#efefef]' : 'bg-white'
            }`}
            onClick={() => onTabChange('재질')}
          >
            <div className={`font-14-regular whitespace-nowrap text-${activeTab === '재질' ? '[#000000]' : '[#878484]'}`}>
              {t("재질")}
            </div>
          </button>
        </div>
        
        {/* Unit Toggle Button */}
        <button 
          onClick={toggleUnit}
          className="p-[7px] bg-white rounded-[20px] border border-solid border-[#bbc4d0] hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-[3px]">
            <Change className="!w-2 !h-2" color="#1662F0" />
            <div className="text-[#1662ef] text-[11px] font-normal whitespace-nowrap">
              {t(unit)}
            </div>
          </div>
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === '가구' && renderFurnitureContent()}
    </>
  );
};
