// src/components/SurveyPopup.tsx
import React, { useState, useEffect } from "react";

const SurveyPopup = (): JSX.Element | null => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    // Initialize counter in localStorage if it doesn't exist
    if (localStorage.getItem('buttonClickCount') === null) {
      localStorage.setItem('buttonClickCount', '0');
    }
    
    console.log("SurveyPopup mounted, current count:", localStorage.getItem('buttonClickCount'));
    
    // This function handles all button clicks on the page
    function handleButtonClick(e: MouseEvent) {
      // Check if the clicked element is a button or inside a button
      const clickedElement = e.target as HTMLElement;
      const button = clickedElement.closest('button') || 
                     (clickedElement.tagName === 'BUTTON' ? clickedElement : null);
      
      // Only proceed if a button was clicked
      if (!button) return;
      
      // Don't count clicks on the survey popup itself
      if (button.closest('.survey-popup')) {
        console.log("Button in popup clicked - ignoring");
        return;
      }
      
      // Get current count from localStorage
      const currentCount = parseInt(localStorage.getItem('buttonClickCount') || '0');
      
      // Increment the count
      const newCount = currentCount + 1;
      localStorage.setItem('buttonClickCount', newCount.toString());
      
      console.log(`Button clicked, count: ${newCount}`);
      
      // Show popup when count reaches 5
      if (newCount >= 5) {
        console.log("Count reached 5, showing popup");
        setIsAnimating(true);
        setTimeout(() => setIsOpen(true), 50);
        
        // Reset counter
        localStorage.setItem('buttonClickCount', '0');
        console.log("Counter reset to 0");
      }
    }
    
    // Add event listener at the document level
    document.addEventListener('click', handleButtonClick, true);
    
    // Clean up
    return () => {
      document.removeEventListener('click', handleButtonClick, true);
    };
  }, []);
  
  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsOpen(false);
    }, 300);
  };

  const handleOpenForm = () => {
    window.open("https://forms.gle/GX2YGjdx8R4eog1E8", "_blank");
  };

  if (!isAnimating && !isOpen) return null;
  
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
              빠른 시일 내에 곧 만나요!
            </p>

            <p className="survey-popup relative self-stretch h-[59px] [font-family:'Pretendard-Medium',Helvetica] font-medium text-[#949494] text-xl text-center tracking-[0] leading-[30px]">
              EZbooth 서비스 출시 소식을 가장 먼저 받아보세요.
              <br />
              사전 알림을 신청하시면 런칭 소식을 빠르게 전해드립니다!
            </p>
          </div>

          <button 
            onClick={handleOpenForm}
            className="survey-popup inline-flex items-center justify-center gap-2.5 px-[39px] py-[18px] relative flex-[0_0_auto] bg-[#1662ef] rounded-[40px] hover:bg-[#1255d4] transition-colors"
          >
            <div className="survey-popup relative w-fit mt-[-1.00px] [font-family:'Pretendard-SemiBold',Helvetica] font-semibold text-white text-xl text-center tracking-[0] leading-[30px] whitespace-nowrap">
              런칭 사전 알림 신청하기
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