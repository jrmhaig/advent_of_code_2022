import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/advent_of_code_2022/*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)