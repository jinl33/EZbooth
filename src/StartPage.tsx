// src/StartPage.tsx
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import leftback from "./images/leftback.png";
import rightback from "./images/rightback.png";
import ellipse774 from "./images/ellipse-774.svg";
import ellipse775 from "./images/ellipse-775.svg";
import logo from "./images/logo.png";

export const StartPage: React.FC = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  // Add scaling effect to fit the screen
  useEffect(() => {
    const updateScale = () => {
      if (!containerRef.current) return;
      
      const scaleX = window.innerWidth / 1440;
      const scaleY = window.innerHeight / 920;
      const newScale = Math.min(scaleX, scaleY);
      
      containerRef.current.style.transform = `scale(${newScale})`;
    };
    
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  const handleUseEzboothClick = () => {
    navigate('/choose-template');
  };

  return (
    // Full screen container with centered content
    <div className="w-screen h-screen bg-white overflow-hidden flex justify-center items-center">
      {/* Original layout with fixed dimensions that will be scaled */}
      <div 
        ref={containerRef} 
        className="relative w-[1440px] h-[920px] bg-white origin-center"
      >
        <img
          className="absolute w-[280px] h-[454px] top-[168px] left-[1160px] object-cover"
          alt="Element"
          src={rightback}
        />

        <img
          className="absolute w-[276px] h-[462px] top-[176px] left-0 object-cover"
          alt="Element"
          src={leftback}
        />

        {/* Soften the gradient background */}
        <div className="absolute w-[1440px] h-[432px] top-0 left-0 bg-gradient-to-b from-[#f8fafd] via-[rgba(248,250,253,0.3)] to-transparent" />

        {/* Adjust the top position to center content better */}
        <div className="flex flex-col w-[778px] items-center gap-[70px] absolute top-[207px] left-[331px]">
          <div className="flex flex-col items-center gap-[50px] relative self-stretch w-full flex-[0_0_auto]">
            <p className="relative self-stretch mt-[-1.00px] font-bold text-[#000000] text-[70px] text-center tracking-[0.70px] leading-[81.2px]">
              Make your Booth EZ,
              <br />
              Make your Business EZ!
            </p>

            <p className="relative w-fit font-semibold text-[#8896a5] text-xl text-center tracking-[0] leading-[26.0px] whitespace-nowrap">
              EZbooth로 여러분의 부스를 자유롭게 디자인해보세요
            </p>
          </div>

          <div className="inline-flex items-center gap-5 relative flex-[0_0_auto]">
            <button 
              type="button"
              onClick={handleUseEzboothClick}
              className="flex w-44 items-center justify-center gap-2.5 px-[26px] py-5 relative bg-[#1662ef] rounded-[99999px] cursor-pointer hover:bg-[#1255d4] transition-colors"
            >
              <span className="relative w-fit mt-[-1.00px] ml-[-2.50px] mr-[-2.50px] text-white whitespace-nowrap">
                이지부스 사용해보기
              </span>
            </button>

            <button 
              type="button"
              className="flex w-44 items-center justify-center gap-2.5 px-[26px] py-5 relative bg-white rounded-[99999px] border border-solid border-[#1662ef20] shadow-sm hover:shadow-md transition-shadow"
            >
              <span className="relative w-fit mt-[-1.00px] text-[#1662ef] whitespace-nowrap">
                블로그 방문하기
              </span>
            </button>
          </div>
        </div>

        <div className="absolute top-[147px] left-[1171px] font-bold text-[72.1px] tracking-[-1.44px] leading-[115.4px] whitespace-nowrap">
          🤝
        </div>

        <div className="absolute top-[153px] left-[226px] rotate-[-17.56deg] font-bold text-[54.8px] tracking-[-1.10px] leading-[87.7px] whitespace-nowrap">
          ⏰
        </div>

        <div className="absolute w-[116px] h-[114px] top-[353px] left-[287px]">
          <div className="relative w-[114px] h-[114px]">
            <div className="absolute top-[9px] left-[23px] rotate-[8.50deg] font-bold text-[55.4px] tracking-[-1.11px] leading-[88.7px] whitespace-nowrap">
              🙌
            </div>

            <img
              className="absolute w-[114px] h-[114px] top-0 left-0"
              alt="Ellipse"
              src={ellipse774}
            />
          </div>
        </div>

        <div className="absolute w-[90px] h-[88px] top-[89px] left-[1037px]">
          <div className="relative w-[88px] h-[88px]">
            <div className="absolute top-4 left-[21px] rotate-[-15.00deg] font-bold text-[36.1px] tracking-[-0.72px] leading-[57.8px] whitespace-nowrap">
              ✅
            </div>

            <img
              className="absolute w-[88px] h-[88px] top-0 left-0"
              alt="Ellipse"
              src={ellipse775}
            />
          </div>
        </div>

        <div className="flex w-[1440px] items-center justify-between px-[60px] py-[30px] absolute top-0 left-0">
          <img
            className="relative w-[97.32px] h-6"
            alt="Logo"
            src={logo}
          />

          <div className="relative w-6 h-6 bg-[#1662ef] rounded-xl" />
        </div>

        {/* Background gradient */}
        <div className="flex w-[1522px] h-[1522px] items-center justify-center gap-[10.57px] p-[134.23px] absolute top-[2958px] left-[-41px] rounded-[747.79px] [background:linear-gradient(180deg,rgba(22.37,98.43,239.69,0)_0%,rgba(22.37,98.43,239.69,0.7)_100%)]">
          <div className="relative w-[1226.06px] h-[1226.06px] rounded-[613.03px] [background:linear-gradient(180deg,rgba(22.37,98.43,239.69,0)_0%,rgba(22.37,98.43,239.69,0.7)_100%)]" />
        </div>
      </div>
    </div>
  );
};
