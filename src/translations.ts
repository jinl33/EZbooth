// src/translations.ts
export type Language = 'ko' | 'en';

// Define the structure of translation dictionaries
export type TranslationDictionary = Record<string, string>;

// Define the structure of our translations object
export interface TranslationsType {
  [category: string]: {
    en: TranslationDictionary;
    ko?: TranslationDictionary; // Optional Korean overrides
  };
}

// Define translation categories organized by pages
export const translations: TranslationsType = {
  // Common UI elements used across multiple pages
  common: {
    en: {
      "언어 변경": "Change Language",
      "뒤로 가기": "Back",
      "저장": "Save",
      "취소": "Cancel",
      "확인": "Confirm",
      "삭제": "Delete",
      "편집": "Edit",
      "더 보기": "See More",
      "로그인": "Log In",
      "회원가입": "Sign Up",
      "검색": "Search",
    }
  },
  
  // Main page (StartPage) translations
  startPage: {
    en: {
      "Make your Booth EZ, Make your Business EZ!": "Make your Booth EZ, Make your Business EZ!",
      "EZbooth로 여러분의 부스를 자유롭게 디자인해보세요": "Streamlined Booth Design at Your Fingertips",
      "이지부스 사용해보기": "Try EZbooth",
      "블로그 방문하기": "Visit Our Blog",
      "Design Anytime, Anywhere": "Design Anytime, Anywhere",
      "원하는 부스를 디자인하세요": "<span>Design Your </span><span class='text-[#1662ef]'>Ideal Booth</span>",
      "EZbooth로 만드는 평균 디자인 소요 시간 5분": "Anytime, Anywhere- Quickly and Easily",
      "Collaborate Without Limits": "Collaborate Without Limits",
      "실시간으로 소통하며": "Explore and Choose Freely",
      "클라이언트부터 팀원까지,": "Choose from a Wide Variety of Templates",
      "하나의 윈도우에서 피드백 및 디자인 수정 가능": "to Suit Your Needs",
      "Manage your Booth in a single system": "Manage your Booth in a single system",
      "Seamless Team Collaboration": "Seamless Team Collaboration",
      "기획자와 디자이너가 같은 플랫폼에서 작업하며 원할하게 소통하고 효율적으로 협업할 수 있습니다.": "Planners and designers can work on the same platform, communicate smoothly, and collaborate efficiently.",
      "All-in-One Workflow": "All-in-One Workflow",
      "모델링, 렌더링, 디자인 수정까지 여러 디자인 툴을 사용하지 않아도 하나의 시스템에서 해결이 가능합니다.": "From modeling and rendering to design revisions, you can handle everything within a single system—no multiple design tools required.",
      "Fast & Easy Revisions": "Fast & Easy Revisions",
      "클라이언트가 직접 디자인을 확인하고 피드백을 제공할 수 있어 수정 과정이 더욱 빠르고 간편해집니다.": "Clients can directly view designs and provide feedback, making revisions faster and more convenient."
    }
  },
  
  // Choose Template page translations
  chooseTemplate: {
    en: {
      "템플릿과 함께 더욱 쉽고 빠르게 부스를 디자인 해보세요!": "Design your booth more easily and quickly with templates!",
      "검색 필터": "Search Filter",
      "를 통해": "to",
      "원하는 템플릿을 찾아보세요!": "Find Your Perfect Template!",
      "템플릿을 통해": "Easy Booth Design",
      "초심자도 편리한": "—Easy For Beginners—",
      "부스 디자인!": "With Templates!",
      "크기": "Size",
      "목적": "Purpose",
      "형태": "Shape",
      "색상": "Color",
      "키워드": "Keyword",
      "원하는 검색어를 입력해 주세요.": "Enter Search Keyword",
      "검색 결과가 없습니다.": "No Search Results",
      "필터 초기화": "Reset Filters",
      "이 템플릿으로 시작하기": "Start With This Template",
      "자세히 보기": "View Detail",
      "템플릿 상세정보": "Template Detail",
      

      // Template details
      "면적": "Dimension",
      "배치": "Layout",
      "구조": "Structure",
      "플랫폼 높이": "Platform Height",
      "경사로": "Slope",
      "가구": "Furniture",
      
      "108sqm (Medium)": "108sqm (중형)",
      "36sqm (Small)": "36sqm (소형)",
      "3-Sided-Open": "3면 오픈",
      "2-Sided-Open": "2면 오픈",
      "Linear Rigging/Double Floor": "직선형 리깅/복층",
      "Linear Structure/Single floor": "직선형 리깅/단층",
      "2ea, Slope Angle 1/12": "2ea, Slope Angle 1/12",
      "Chair(4), Table(1), Counter(1)": "의자(4), 테이블(1), 카운터(1)",
      

      // Size options
      "소형": "Small",
      "중형": "Medium",
      "대형": "Large",
      "Small": "소형",
      "Medium": "중형",
      "Large": "대형",
      
      // Purpose options
      "미팅형": "Meeting Type",
      "전시형": "Display Type",
      "전시/미팅형": "Display/Meeting Type",
      "미팅+전시형": "Display/Meeting Type",
      
      // Shape options
      "1면 오픈": "1-Sided Open",
      "2면 오픈": "2-Sided Open",
      "3면 오픈": "3-Sided Open",
      "4면 오픈": "4-Sided Open",
      
      // Template attributes
      "곡선의": "Curved",
      "직선의": "Linear",
      "복층": "Double Floor",
      "단층": "Single Floor",
      "모던한": "Modern",
      "비대칭": "Asymmetric",
      "깔끔한": "Clean",
      "화려한": "Fancy",
      "테크": "Tech",
      "목재": "Wood",
      "자연친화적인": "Eco-Friendly",
      "컬러풀한": "Colorful",
      "패브릭마감": "Fabric",
      "그래픽": "Graphic",
      "라이팅": "Lighting",
      "lED": "LED",
      "컨츄리풍의": "Country Style"
    }
  },
  
  // Edit Template page translations
  editTemplate: {
    en: {
      "프로젝트 명": "Project Name",
      "구조": "Structure",
      "재질": "Material",
      "Floor": "Floor",
      "Wall": "Wall",
      "Pantry": "Pantry",
      "Rigging": "Rigging",
      "apply": "Apply",
      "리깅 종류 선택": "Select Rigging Type",
      "기본 리깅": "Basic Rigging",
      "곡선형 리깅": "Curved Rigging",
      "타워형 리깅": "Tower Rigging",
      "혼합형 리깅": "Mixed Rigging",
      "Art Wall Curves": "Art Wall Curves",
      "Flat": "Flat",
      "Curved": "Curved",
      "전체벽": "Full Wall",
      "Carpet": "Carpet",
      "Laminate": "Laminate",
      "Edge Molding": "Edge Molding",
      "Wall Paint": "Wall Paint",
      "Wooden Floor": "Wooden Floor",
      "Export": "Export",
      "Regulation": "Regulation",
      "Comments": "Comments",
      "박람회 선택": "Select Exhibition",
      "전시 홀 선택": "Select Exhibition Hall",
      "적용하기": "Apply"
    }
  },

  // survey
  survey: {
    en: {
      "빠른 시일 내에 곧 만나요!": "See You Soon!",
      "EZbooth 서비스 출시 소식을 가장 먼저 받아보세요.": "Be The First To Know About EZbooth's Launch.",
      "사전 알림을 신청하시면 런칭 소식을 빠르게 전해드립니다!": "Sign Up Now To Receive Early Notifications!",
      "런칭 사전 알림 신청하기": "Sign Up For Launch Alerts"
    }
  }
};

export default translations;