import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/Themeprovider";
import Navbar from "@/components/ui/Navbar";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Code Money",
  description: "Sell Code or Website and Make Money",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <ThemeProvider
            attribute="class"
            defaultTheme="system" 
            enableSystem
            disableTransitionOnChange
          >
         <Navbar />
         <div className="mt-20">
         <ToastContainer />
        {children}
        </div>
        </ThemeProvider>
        </body>
    </html>
  );
}
