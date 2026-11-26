import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

const rootElement = document.getElementById('landingAnalyticsRoot');

if (!rootElement) {
  throw new Error('Landing analytics mount point was not found.');
}

createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
