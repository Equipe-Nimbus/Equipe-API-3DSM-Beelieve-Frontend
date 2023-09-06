import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function router() {
  return (
    <BrowserRouter>
      <Routes>
      {/* <Route path="*" element={<Erro />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);