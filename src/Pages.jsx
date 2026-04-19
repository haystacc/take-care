import { Routes, Route, Navigate } from 'react-router-dom';
import Signin from "./auth/Signin"
import Signup from "./auth/Signup"
import Dashboard from "./pages/Dashboard";
import JournalPage from "./pages/JournalPage";
import CalendarPage from "./pages/CalendarPage";
import MoodTrackerPage from "./pages/MoodTrackerPage"
import ProtectedRoute from "./routes/ProtectedRoute";
import AppLayout from "./layouts/AppLayout";

function Pages() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/signin" element={<Signin />}/>
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />}/>
            <Route path="/journal" element={<JournalPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/moodtracker" element={<MoodTrackerPage/>}/>
          </Route>
        </Route>
      </Routes> 
    </>
  );  
}

export default Pages;