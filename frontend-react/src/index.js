import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './globalComponent/CartContext';
import { LikeProvider } from './globalComponent/LikeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <BrowserRouter>
    <LikeProvider>
    <CartProvider>
        <App />
        </CartProvider>
        </LikeProvider>
    </BrowserRouter>

);

reportWebVitals();
