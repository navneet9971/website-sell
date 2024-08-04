import Navbar from './component/Navbar/Navbar';
import { BrowserRouter as Router } from 'react-router-dom';
import MainRoutes from './Routes/mainRoutes';
import { ThemeProvider } from 'next-themes';
import { ToastContainer } from 'react-toastify';

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
      <Router>
        <Navbar />
        <MainRoutes />
      </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
