import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// You need to import BrowserRouter here as well
import { BrowserRouter } from 'react-router-dom'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Wrapping App here is also common, especially if App.jsx handles no logic */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);