import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import i18nPromise from './i18n';
import App from './App';

// Wait for i18n initialization before rendering
i18nPromise.then(() => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}).catch((error) => {
  console.error('Failed to initialize i18n:', error);
  // Fallback: render without i18n
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});

