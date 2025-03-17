// src/StartPage.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import leftback from "./images/leftback.png";
import rightback from "./images/rightback.png";
import ellipse774 from "./images/ellipse-774.svg";
import ellipse775 from "./images/ellipse-775.svg";
import logo from "./images/logo.png";
import front1 from "./images/front1.png";
import front2 from "./images/front2.png";
import front3 from "./images/front3.png";
import background from "./images/background.png";

export const StartPage: React.FC = () => {
  const navigate = useNavigate();
  const [slidePosition, setSlidePosition] = useState(0);

  // Sliding animation for section 2
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setSlidePosition(prev => {
        // Reset position when it moves too far left
        if (prev <= -1800) {
          return 0;
        }
        // Move 1px to the left every 30ms
        return prev - 1;
      });
    }, 30);

    return () => clearInterval(slideInterval);
  }, []);

  const handleUseEzboothClick = () => {
    navigate('/choose-template');
  };

  return (
    <div className="w-full min-h-screen bg-white font-sans">
      {/* First section with fixed width container */}
      <div className="flex justify-center w-full">
        <div className="relative w-full max-w-[1440px]">
          {/* Header with logo */}
          <div className="flex w-full items-center justify-between px-[60px] py-[30px] relative z-20">
            <div className="flex items-center space-x-2">
              <img
                className="h-6"
                alt="Logo"
                src={logo}
              />
            </div>
            <div className="relative w-6 h-6 bg-[#1662ef] rounded-xl" />
          </div>

          {/* First section content */}
          <section className="relative w-full h-[700px] bottom-[90px]">
            {/* Background gradient */}
            <div className="absolute w-full h-[432px] top-0 left-0 bg-gradient-to-b from-[#f8fafd] via-[rgba(248,250,253,0.3)] to-transparent" />
            
            {/* Background elements */}
            <div className="absolute w-[420px] h-[600px] top-[140px] right-[-60px] transform scale-[0.75]">
              <img
                className="w-full h-full object-cover"
                alt="Element"
                src={rightback}
              />
            </div>

            <div className="absolute w-[286px] h-[462px] top-[210px] left-[-10px] left-0">
              <img
                className="w-full h-full object-cover"
                alt="Element"
                src={leftback}
              />
            </div>

            {/* Emoji decorations */}
            <div className="absolute top-[170px] right-[190px] font-bold text-[72.1px] tracking-[-1.44px] leading-[115.4px] whitespace-nowrap">
              🤝
            </div>

            <div className="absolute top-[153px] left-[226px] rotate-[-17.56deg] font-bold text-[54.8px] tracking-[-1.10px] leading-[87.7px] whitespace-nowrap">
              ⏰
            </div>

            <div className="absolute w-[116px] h-[114px] top-[400px] left-[287px]">
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

            <div className="absolute w-[90px] h-[88px] top-[89px] right-[300px]">
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

            {/* Main content - positioned with z-index to appear above background elements */}
            <div className="flex flex-col items-center justify-center px-[60px] pt-[150px] relative z-10">
              <div className="flex flex-col items-center gap-[50px] max-w-[800px] w-full">
                <p className="font-bold text-[#000000] text-[70px] text-center tracking-[0.70px] leading-[81.2px]">
                  Make your Booth EZ,
                  <br />
                  Make your Business EZ!
                </p>

                <p className="font-semibold text-[#8896a5] text-xl text-center tracking-[0] leading-[26.0px]">
                  EZbooth로 여러분의 부스를 자유롭게 디자인해보세요
                </p>
              </div>

              <div className="flex flex-row items-center gap-5 mt-[70px]">
                <button 
                  type="button"
                  onClick={handleUseEzboothClick}
                  className="flex w-44 items-center justify-center gap-2.5 px-[26px] py-5 bg-[#1662ef] rounded-[99999px] cursor-pointer hover:bg-[#1255d4] transition-colors"
                >
                  <span className="text-white whitespace-nowrap">
                    이지부스 사용해보기
                  </span>
                </button>

                <button 
                  type="button"
                  className="flex w-44 items-center justify-center gap-2.5 px-[26px] py-5 bg-white rounded-[99999px] border border-solid border-[#1662ef20] shadow-sm hover:shadow-md transition-shadow"
                >
                  <span className="text-[#1662ef] whitespace-nowrap">
                    블로그 방문하기
                  </span>
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Spacer between sections */}
      <div className="h-[100px]"></div>

      {/* Second section - completely separate from the fixed-width container */}
      <section className="relative w-full h-[800px]">
        {/* Background image with blur effect */}
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover blur-[300px]"
            alt="Background"
            src={background}
          />
        </div>
        
        {/* Content container - centered but not width-restricted */}
        <div className="relative z-10 flex flex-col items-center w-full pt-[100px]">
          {/* Frame component content integrated directly */}
          <div className="flex flex-col max-w-[500px] w-full items-center gap-[30px] px-4">
            <div className="font-semibold text-[#000000] text-xl text-center tracking-[0] leading-[26.0px]">
              Design Anytime, Anywhere
            </div>

            <div className="flex flex-col items-center gap-3.5 w-full">
              <p className="font-semibold text-3xl leading-[39.0px] text-center tracking-[0]">
                <span className="text-[#1662ef]">
                  어디서든 쉽고 빠르게,
                </span>
                <br />
                <span className="text-[#000000] inline-block">원하는 부스를 디자인하세요</span>
              </p>

              <p className="font-medium text-[#8896a5] text-base leading-4 text-center tracking-[0]">
                Ezbooth로 만드는 평균 디자인 소요 시간 5분
              </p>
            </div>
          </div>

          {/* Sliding images container - full width with no restrictions */}
          <div className="relative mt-[40px] w-full">
            <div className="w-full h-[383px] overflow-hidden">
              <div 
                className="flex items-center gap-8 transition-transform duration-300 ease-linear"
                style={{ transform: `translateX(${slidePosition}px)` }}
              >
                <img src={front3} alt="Booth Design 3" className="w-[550px] h-[354px] object-cover rounded-lg shadow-lg" />
                <img src={front1} alt="Booth Design 1" className="w-[550px] h-[383px] mt-[6px] object-cover rounded-lg shadow-lg" />
                <img src={front2} alt="Booth Design 2" className="w-[550px] h-[354px] object-cover rounded-lg shadow-lg" />
                
                {/* Duplicate set for seamless looping */}
                <img src={front3} alt="Booth Design 3" className="w-[550px] h-[354px] object-cover rounded-lg shadow-lg" />
                <img src={front1} alt="Booth Design 1" className="w-[550px] h-[383px] mt-[6px] object-cover rounded-lg shadow-lg" />
                <img src={front2} alt="Booth Design 2" className="w-[550px] h-[354px] object-cover rounded-lg shadow-lg" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Add some bottom padding */}
      <div className="h-[100px]"></div>
    </div>
  );
};
