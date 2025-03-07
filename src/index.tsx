// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChooseTemplate } from './chooseTemplate';
import { EditTemplate } from './editTemplate';  

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/choose-template" element={<ChooseTemplate />} />
        <Route path="/edit-template" element={<EditTemplate />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
