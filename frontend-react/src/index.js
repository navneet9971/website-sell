import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './globalComponent/CartContext';
import { LikeProvider } from './globalComponent/LikeContext';
import { ProductDataProvider } from './globalComponent/SellDataContext';
import 'react-lazy-load-image-component/src/effects/blur.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <BrowserRouter>

    <ProductDataProvider>
    <LikeProvider>
    <CartProvider>
        <App />
        </CartProvider>
        </LikeProvider>
        </ProductDataProvider>
   
    </BrowserRouter>

);

reportWebVitals();
