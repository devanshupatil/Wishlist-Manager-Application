import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast';
import './i18Next.js';
// import Backend from 'i18next-http-backend';
import { I18nextProvider } from 'react-i18next';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <I18nextProvider>
      <App />
      <Toaster position="top-right" />
    </I18nextProvider>
  </StrictMode>,
)
