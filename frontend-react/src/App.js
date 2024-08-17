import React from 'react';
import Navbar from './component/Navbar/Navbar';
import MainRoutes from './Routes/mainRoutes';
import { ThemeProvider } from 'next-themes';
import { ToastContainer } from 'react-toastify';
import SecondNavbar from './component/miniNavbar/MiniNavbar';
import useOnlineStatus from './intenetNotworking/useOnlineStatus';
import OfflinePage from './intenetNotworking/OfflinePage';


function App() {
  const isOnline = useOnlineStatus();

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {isOnline ? (
        <div>
          <ToastContainer />
          <Navbar />
          <SecondNavbar />
          <MainRoutes />
        </div>
      ) : (
        <OfflinePage />
      )}
    </ThemeProvider>
  );
}

export default App;
