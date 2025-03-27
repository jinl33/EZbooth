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
import front4 from "./images/front4.png";
import front5 from "./images/front5.png";
import background from "./images/background.png";
import icon1 from "./images/icon1.svg";
import icon2 from "./images/icon2.svg";
import icon3 from "./images/icon3.svg";

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
    window.scrollTo(0, 0);
    navigate('/choose-template');
  };

  return (
    <div className="w-full min-h-screen bg-white font-sans overflow-x-hidden">
      {/* Section 1 */}
      <div className="flex justify-center w-full">
        <div className="relative w-full max-w-[1440px]">
          {/* Header */}
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

            <div className="absolute w-[286px] h-[462px] top-[210px] left-0">
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

            <div className="absolute w-[116px] h-[114px] top-[400px] left-[330px]">
              <div className="relative w-[114px] h-[114px]">
                <div className="absolute top-[5px] left-[23px] rotate-[8.50deg] font-bold text-[55.4px] tracking-[-1.11px] leading-[88.7px] whitespace-nowrap">
                  🙌
                </div>
                <img
                  className="absolute w-[100px] h-[100px] top-0 left-0"
                  alt="Ellipse"
                  src={ellipse774}
                />
              </div>
            </div>

            <div className="absolute w-[90px] h-[88px] top-[89px] right-[300px]">
              <div className="relative w-[88px] h-[88px]">
                <div className="absolute top-4 left-[25px] rotate-[-15.00deg] font-bold text-[36.1px] tracking-[-0.72px] leading-[57.8px] whitespace-nowrap">
                  ✅
                </div>
                <img
                  className="absolute w-[88px] h-[88px] top-0 left-0"
                  alt="Ellipse"
                  src={ellipse775}
                />
              </div>
            </div>

            {/* Section 1 */}
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
                  onClick={() => window.open("https://blog.naver.com/ezbooth", "_blank")}
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

      {/* Spacer */}
      <div className="h-[110px]"></div>

      {/* Second section */}
      <section className="relative w-full h-[800px]">
        {/* Background image with blur effect */}
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover blur-[400px]"
            alt="Background"
            src={background}
          />
        </div>
        
        {/* Section 2 */}
        <div className="relative z-10 flex flex-col items-center w-full pt-[100px]">
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
                EZbooth로 만드는 평균 디자인 소요 시간 5분
              </p>
            </div>
          </div>

          {/* Sliding images container */}
          <div className="relative mt-[40px] w-full">
            <div className="w-full h-[383px] overflow-hidden">
              <div 
                className="flex items-center gap-8 transition-transform duration-300 ease-linear"
                style={{ transform: `translateX(${slidePosition}px)` }}
              >
                <img src={front3} alt="Booth Design 3" className="w-[550px] h-[354px] object-cover rounded-lg" />
                <img src={front1} alt="Booth Design 1" className="w-[550px] h-[383px] mt-[6px] object-cover rounded-lg" />
                <img src={front2} alt="Booth Design 2" className="w-[550px] h-[354px] object-cover rounded-lg" />
                
                {/* Duplicate set for seamless looping */}
                <img src={front3} alt="Booth Design 3" className="w-[550px] h-[354px] object-cover rounded-lg" />
                <img src={front1} alt="Booth Design 1" className="w-[550px] h-[383px] mt-[6px] object-cover rounded-l " />
                <img src={front2} alt="Booth Design 2" className="w-[550px] h-[354px] object-cover rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spacer */}
      <div className="h-[100px]"></div>

      {/* Section 3 */}
      <section className="relative w-full h-[1000px]">
        {/* Background gradient - keep this exactly as is */}
        <div className="absolute w-full h-[301px] left-0 top-[500px] rotate-180 [background:linear-gradient(90deg,rgba(22,98,240,0)_0%,rgba(22,98,240,0.46)_25%,rgba(22,98,240,0.7)_100%)]">
        </div>
        
        {/* Layer 1 */}
        <div className="absolute w-full h-[600px] left-0 top-[350px] z-[1]">
          <img
            src={front4}
            alt="Collaboration Interface"
            className="w-full h-full object-contain"
          />
        </div>
        
        {/* Layer 2 */}
        <div className="absolute w-full h-[600px] left-0 top-[350px] z-[2]">
          <img
            src={front5}
            alt="Collaboration Features"
            className="w-full h-full object-contain"
            loading="eager"
            decoding="async"
          />
        </div>
        
        {/* Section 3 content */}
        <div className="relative z-10 flex flex-col items-center w-full pt-[100px]">
          <div className="flex flex-col max-w-[500px] w-full items-center gap-[30px] px-4">
            <div className="font-semibold text-[#000000] text-xl text-center tracking-[0] leading-[26.0px]">
              Collaborate Without Limits
            </div>

            <div className="flex flex-col items-center gap-3.5 w-full">
              <p className="font-semibold text-3xl leading-[39.0px] text-center tracking-[0]">
                <span className="text-[#1662ef]">
                  실시간으로 소통하며
                </span>
                <br />
                <span className="text-[#000000] inline-block">더 나은 디자인을 완성하세요</span>
              </p>

              <span className="font-medium text-[#8896a5] text-base text-center tracking-[0]" style={{ lineHeight: '1.5' }}>
                클라이언트부터 팀원까지, 
                <br />하나의 윈도우에서 피드백 및 디자인 수정 가능
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Spacer */}
      <div className="h-[100px]"></div>

      {/* Section 4 */}
      <div className="relative overflow-hidden" style={{ height: "calc(100vh - 2px" }}>
        {/* Spacer */}
        <div className="h-[400px]"></div>

        {/* Background  */}
        <section className="relative w-full flex justify-center items-start">
          {/* Outer gradient */}
          <div className="absolute w-[1522px] h-[1522px] top-[-400px] flex items-center justify-center rounded-[747.79px] [background:linear-gradient(180deg,rgba(22,98,240,0)_0%,rgba(22,98,240,0.7)_100%)] opacity-60">
            {/* Inner gradient */}
            <div className="relative w-[1226.06px] h-[1226.06px] rounded-[613.03px] [background:linear-gradient(180deg,rgba(22,98,240,0)_0%,rgba(22,98,240,0.8)_100%)]" />
          </div>

          <div className="relative z-10 mt-[-100px]">
            <div className="flex flex-col w-[1197.28px] items-center gap-[30px] relative">
              <div className="flex flex-col items-start gap-10 relative self-stretch w-full flex-[0_0_auto]">
                <div className="flex flex-col w-full items-center gap-[6.65px] relative flex-[0_0_auto]">
                  <p className="relative w-[451px] mt-[-0.83px] [font-family:'Pretendard-SemiBold',Helvetica] font-semibold text-[#4d4d4d] text-3xl text-center tracking-[0] leading-[36.6px]">
                    Manage your Booth
                    <br />
                    in a single system
                  </p>
                </div>

                <div className="flex w-full items-center justify-between px-[119.73px] py-0 relative flex-[0_0_auto]">
                  {/* Card 1 */}
                  <div className="flex flex-col w-[248px] h-[230px] top-[5px] items-center gap-2.5 px-[26px] py-5 relative bg-white rounded-[6.65px] shadow-[0px_1.66px_3.33px_#abbed133]">
                    <div className="inline-flex flex-col items-center gap-3.5 relative flex-[0_0_auto]">
                      <div className="relative w-[54px] h-[46px]">
                        <div className="relative h-[47px]">
                          <div className="absolute w-[41px] h-10 top-[7px] left-[13px] rounded-[14.97px_4.16px_8.31px_4.16px] rotate-[-180.00deg] [background:linear-gradient(0deg,rgba(217,233,255,1)_0%,rgba(166,197,255,1)_100%)]" />

                          <div className="absolute w-10 h-10 top-0 left-0 flex items-center justify-center">
                            <img
                              className="w-9 h-9 object-contain"
                              alt="Icon"
                              src={icon1}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="relative w-[220px] font-bold text-[#4d4d4d] text-[23.3px] text-center tracking-[0] leading-[30.3px]">
                        Seamless Team Collaboration
                      </div>
                    </div>

                    <div className="inline-flex items-start gap-1.5 relative flex-[0_0_auto]">
                      <p className="relative w-[215px] mt-[-0.83px] font-normal text-[#5d759e] text-xs text-center tracking-[0] leading-[16.6px]">
                        기획자와 디자이너가 같은 플랫폼에서 작업하며 원할하게 소통하고 효율적으로 협업할 수 있습니다.
                      </p>
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className="flex flex-col w-[248px] h-[230px] top-[5px] items-center gap-2.5 px-[26px] py-5 relative bg-white rounded-[6.65px] shadow-[0px_1.66px_3.33px_#abbed133]">
                    <div className="inline-flex flex-col items-center gap-3.5 relative flex-[0_0_auto]">
                      <div className="relative w-[54px] h-[46px]">
                        <div className="relative h-[47px]">
                          <div className="absolute w-[41px] h-10 top-[7px] left-[13px] rounded-[14.97px_4.16px_8.31px_4.16px] rotate-[-180.00deg] [background:linear-gradient(0deg,rgba(217,233,255,1)_0%,rgba(166,197,255,1)_100%)]" />

                          <div className="absolute w-10 h-10 top-0 left-0 flex items-center justify-center">
                            <img
                              className="w-9 h-9 object-contain"
                              alt="icon"
                              src={icon2}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="relative w-[220px] font-bold text-[#4d4d4d] text-[23.3px] text-center tracking-[0] leading-[30.3px]">
                        All-in-One Workflow
                      </div>
                    </div>

                    <div className="inline-flex items-start gap-1.5 relative flex-[0_0_auto]">
                      <p className="relative w-[200px] mt-[-0.83px] font-normal text-[#5d759e] text-xs text-center tracking-[0] leading-[16.6px]">
                        모델링, 렌더링, 디자인 수정까지 여러 디자인 툴을 사용하지 않아도 하나의 시스템에서 해결이 가능합니다.
                      </p>
                    </div>
                  </div>

                  {/* Card 3 */}
                  <div className="flex flex-col w-[248px] h-[230px] top-[5px] items-center gap-2.5 px-[26px] py-5 relative bg-white rounded-[6.65px] shadow-[0px_1.66px_3.33px_#abbed133]">
                    <div className="inline-flex flex-col items-center gap-3.5 relative flex-[0_0_auto]">
                      <div className="relative w-[54px] h-[46px]">
                        <div className="relative h-[47px]">
                          <div className="absolute w-[41px] h-10 top-[7px] left-[13px] rounded-[14.97px_4.16px_8.31px_4.16px] rotate-[-180.00deg] [background:linear-gradient(0deg,rgba(217,233,255,1)_0%,rgba(166,197,255,1)_100%)]" />

                          <div className="absolute w-10 h-10 top-0 left-0 flex items-center justify-center">
                            <img
                              className="w-9 h-9 object-contain"
                              alt="Icon"
                              src={icon3}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="relative w-[220px] font-bold text-[#4d4d4d] text-[23.3px] text-center tracking-[0] leading-[30.3px]">
                        Fast &amp; Easy Revisions
                      </div>
                    </div>

                    <div className="inline-flex items-start gap-1.5 relative flex-[0_0_auto]">
                      <p className="relative w-[203px] mt-[-0.83px] font-normal text-[#5d759e] text-xs text-center tracking-[0] leading-[16.6px]">
                        클라이언트가 직접 디자인을 확인하고 피드백을 제공할 수 있어 수정 과정이 더욱 빠르고 간편해집니다.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="inline-flex items-center mt-[30px] gap-5 relative flex-[0_0_auto]">
                <button 
                  type="button"
                  onClick={handleUseEzboothClick}
                  className="flex w-44 items-center justify-center gap-2.5 px-[26px] py-5 bg-[#1662ef] rounded-[99999px] cursor-pointer hover:bg-[#1255d4] transition-colors"
                >
                  <span className="text-white whitespace-nowrap">
                    이지부스 사용해보기
                  </span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
