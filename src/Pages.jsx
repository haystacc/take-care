import { useState, useEffect } from "react";
import { Routes, Route, Link } from 'react-router-dom';
import JournalPage from "./pages/JournalPage";
import Signin from "./auth/Signin"
import Signup from "./auth/Signup"

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
            <Route path="/journal" element={<JournalPage />} />
            {/* <Route path="/" element={<Dashboard />} /> */}
            {/* <Route path="/mineo" element={<Mineo />} /> */}
          </Routes>
        </div>
        
        <div className="footer"></div>
      </div>

      <Routes>
        <Route path="signup" element={<Signup />}/>
        <Route path="signin" element={<Signin />}/>
      </Routes> 
    </>
  );  
}

export default Pages;