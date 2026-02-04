import { useState, useEffect } from "react";
import { Routes, Route, Link } from 'react-router-dom';
import Header from "./Header";
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
        <Header />

        <div className="main-body">
          <Routes>
            <Route path="/journal" element={<JournalPage />} />
            {/* <Route path="/" element={<Dashboard />} /> */}
            {/* <Route path="/mineo" element={<Mineo />} /> */}
          </Routes>
        </div>
        
        <div className="footer"></div>
      </div>
    </>
  );  
}

export default Pages;