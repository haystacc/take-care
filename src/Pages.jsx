import { useState, useEffect } from "react";
import { Routes, Route, Link } from 'react-router-dom';
import Signin from "./auth/Signin"
import Signup from "./auth/Signup"
import Dashboard from "./pages/Dashboard";
import JournalPage from "./pages/JournalPage";
import ProtectedRoute from "./context/ProtectedRoute";

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
      <Routes>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/signin" element={<Signin />}/>
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />}/>
          <Route path="/journal" element={<JournalPage />} />
        </Route>
      </Routes> 
    </>
  );  
}

export default Pages;