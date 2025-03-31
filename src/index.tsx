// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChooseTemplate } from './chooseTemplate';
import { EditTemplate } from './editTemplate';  
import SurveyPopup from './components/SurveyPopup';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
    <BrowserRouter>
      <SurveyPopup />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/choose-template" element={<ChooseTemplate />} />
        <Route path="/edit-template" element={<EditTemplate />} />
      </Routes>
    </BrowserRouter>
);

reportWebVitals();
