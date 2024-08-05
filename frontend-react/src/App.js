import React from 'react';
import Navbar from './component/Navbar/Navbar';
import MainRoutes from './Routes/mainRoutes';
import { ThemeProvider } from 'next-themes';
import { ToastContainer } from 'react-toastify';
import SecondNavbar from './component/miniNavbar/MiniNavbar';

function App() {
  return (
    <div>
      <ThemeProvider
        attribute="class"
        defaultTheme="system" 
        enableSystem
        disableTransitionOnChange
      >
        <ToastContainer />
        <Navbar />
        <SecondNavbar />
        <MainRoutes />
      </ThemeProvider>
    </div>
  );
}

export default App;
