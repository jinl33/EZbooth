// src/components/SurveyPopup.tsx
import React, { useState, useEffect, useRef } from "react";
import { useTranslation, useLanguage } from "../LanguageContext";
import { useLocation } from "react-router-dom";

const SurveyPopup = (): JSX.Element | null => {
  const { t } = useTranslation('survey');
  const { language } = useLanguage();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  // Use ref to prevent duplicate event listeners
  const clickHandlerRef = useRef<((e: MouseEvent) => void) | null>(null);
  
  // Check if current page is an edit template page
  const isEditTemplatePage = (): boolean => {
    const path = window.location.pathname;
    const isEdit = path.includes('/edit-template') || 
                  path.match(/\/templates\/[^/]+\/edit/) !== null;
    
    return isEdit;
  };
  
  useEffect(() => {
    // Skip if not on edit template page
    if (!isEditTemplatePage()) {
      console.log("Not on edit template page - survey disabled");
      return;
    }
    
    // Initialize counter if needed - Make sure this happens only once
    if (localStorage.getItem('buttonClickCount') === null) {
      localStorage.setItem('buttonClickCount', '0');
      console.log("Counter initialized at 0");
    }
    
    const count = localStorage.getItem('buttonClickCount') || '0';
    console.log(`Survey tracking active, current count: ${count}`);
    
    // Button click handler
    function handleButtonClick(e: MouseEvent) {
      const clickedElement = e.target as HTMLElement;
      const button = clickedElement.closest('button') || 
                    (clickedElement.tagName === 'BUTTON' ? clickedElement : null);
      
      // Skip if not a button
      if (!button) return;
      
      // Check if button is part of any popup/modal
      const isInPopup = 
        // Our own survey popup
        button.closest('.survey-popup') ||
        // Common popup/modal classes
        button.closest('.modal') ||
        button.closest('.popup') ||
        button.closest('[role="dialog"]') ||
        // Detect by z-index (most modals use high z-index)
        isHighZIndexElement(button) ||
        // Other app-specific popup classes
        button.closest('.regulation-popup') ||
        button.closest('.MuiDialog-root');
      
      if (isInPopup) {
        console.log("Button in a popup/modal clicked - not counting");
        return;
      }
      
      // Get current count from localStorage
      const currentCount = parseInt(localStorage.getItem('buttonClickCount') || '0');
      const newCount = currentCount + 1;
      localStorage.setItem('buttonClickCount', newCount.toString());
      
      console.log(`Button clicked, count: ${newCount}`);
      
      // Show popup at threshold
      if (newCount >= 5) {
        console.log("Count reached 5, showing survey popup");
        setIsAnimating(true);
        setTimeout(() => setIsOpen(true), 50);
        
        // Reset counter
        localStorage.setItem('buttonClickCount', '0');
      }
    }
    
    // Helper to check if element has high z-index (likely a popup)
    function isHighZIndexElement(element: HTMLElement): boolean {
      let current = element;
      while (current) {
        const zIndex = window.getComputedStyle(current).zIndex;
        if (zIndex !== 'auto' && parseInt(zIndex) > 10) {
          return true;
        }
        current = current.parentElement as HTMLElement;
        if (!current) break;
      }
      return false;
    }
    
    // Clean up previous listener if it exists
    if (clickHandlerRef.current) {
      document.removeEventListener('click', clickHandlerRef.current, true);
    }
    
    // Store the handler in a ref to clean it up later
    clickHandlerRef.current = handleButtonClick;
    
    // Add event listener for click
    document.addEventListener('click', handleButtonClick, true);
    
    return () => {
      if (clickHandlerRef.current) {
        document.removeEventListener('click', clickHandlerRef.current, true);
        clickHandlerRef.current = null;
      }
      console.log("Survey tracking stopped");
    };
  }, [location.pathname]);
  
  // Don't render anything if not on edit page or popup not triggered
  if (!isEditTemplatePage() || (!isAnimating && !isOpen)) {
    return null;
  }
  
  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => setIsOpen(false), 300);
  };

  const handleOpenForm = () => {
    const formUrl = language === 'en' 
      ? "https://forms.gle/SenpFfwh62DrhatH7"
      : "https://forms.gle/GX2YGjdx8R4eog1E8";
    window.open(formUrl, "_blank");
  };
  
  return (
    <div 
      className="survey-popup fixed inset-0 flex items-center justify-center z-50 bg-black transition-opacity duration-300 ease-in-out"
      style={{
        backgroundColor: isOpen ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0)',
      }}
      onClick={handleClose}
    >
      <div 
        className="survey-popup relative w-[760px] h-80 bg-white rounded-2xl overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? 'translateY(0)' : 'translateY(10px)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="survey-popup flex flex-col w-[587px] items-center gap-9 absolute top-16 left-[86px]">
          <div className="survey-popup flex flex-col items-center gap-6 relative self-stretch w-full flex-[0_0_auto]">
            <p className="survey-popup relative self-stretch h-[33px] mt-[-1.00px] [font-family:'Pretendard-Bold',Helvetica] font-bold text-[#1662ef] text-[29px] text-center tracking-[0] leading-[43.5px] whitespace-nowrap">
              {t("빠른 시일 내에 곧 만나요!")}
            </p>

            <p className="survey-popup relative self-stretch h-[59px] [font-family:'Pretendard-Medium',Helvetica] font-medium text-[#949494] text-xl text-center tracking-[0] leading-[30px]">
              {t("EZbooth 서비스 출시 소식을 가장 먼저 받아보세요.")}
              <br />
              {t("사전 알림을 신청하시면 런칭 소식을 빠르게 전해드립니다!")}
            </p>
          </div>

          <button 
            onClick={handleOpenForm}
            className="survey-popup inline-flex items-center justify-center gap-2.5 px-[39px] py-[18px] relative flex-[0_0_auto] bg-[#1662ef] rounded-[40px] hover:bg-[#1255d4] transition-colors"
          >
            <div className="survey-popup relative w-fit mt-[-1.00px] [font-family:'Pretendard-SemiBold',Helvetica] font-semibold text-white text-xl text-center tracking-[0] leading-[30px] whitespace-nowrap">
              {t("런칭 사전 알림 신청하기")}
            </div>
          </button>
        </div>

        <button 
          onClick={handleClose}
          className="survey-popup !absolute !w-5 !h-5 !top-[22px] !left-[703px]"
        >
          <svg
            className="survey-popup"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className="survey-popup"
              d="M15 5L5 15M5 5L15 15"
              stroke="#606E7E"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SurveyPopup;