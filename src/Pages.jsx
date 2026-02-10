import { useState, useEffect } from "react";
import { Routes, Route, Link } from 'react-router-dom';
import Signin from "./auth/Signin"
import Signup from "./auth/Signup"
import Dashboard from "./pages/Dashboard";
import JournalPage from "./pages/JournalPage";

function Pages() {
  const [isMobile, setIsMobile] = useState(false); // nothing using this functionality as of now 

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 800);
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="wrapper"> {/* lowkey idk what this is for - remnant */}
        <div className="main-body">
          <Routes>
            {/* <Route path="/" element={<Dashboard />} /> */}
            {/* <Route path="/mineo" element={<Mineo />} /> */}
          </Routes>
        </div>
        
        <div className="footer"></div>
      </div>

      <Routes>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/signin" element={<Signin />}/>
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="/journal" element={<JournalPage />} />
      </Routes> 
    </>
  );  
}

export default Pages;