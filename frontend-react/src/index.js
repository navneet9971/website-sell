import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ClerkProviderWrapper from './ClerkProviderWrapper/ClerkProviderWrapper';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ClerkProviderWrapper>
        <App />
      </ClerkProviderWrapper>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
