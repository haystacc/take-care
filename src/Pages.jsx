import { useState, useEffect } from "react";
import { Routes, Route, Link } from 'react-router-dom';
// import jirachiImage from './assets/jirachi.jpg';
function Pages() {
  const [isMobile, setIsMobile] = useState(false);

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
      <div className="wrapper">
        <div className="header">
          {/* <img className="logo" src={jirachiImage} alt="Jirachi"/> */}
          <div className="navigation">
            <Link to="/">{isMobile ? "H" : "Home"}</Link>
            <span>|</span>
            <Link to="/blanko">{isMobile ? "B" : "Blanko"}</Link>
            <span>|</span>
            <Link to="/slido">{isMobile ? "S" : "Slido"}</Link>
            <span>|</span>
            <Link to="/tetro">{isMobile ? "T" : "Tetro"}</Link>
            <span>|</span>
            <Link to="/mineo">{isMobile ? "M": "Mineo"}</Link>
          </div>
        </div>
        <div className="main-body">
          <Routes>
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