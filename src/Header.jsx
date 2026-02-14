import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from './assets/jirachi.jpg';
import { useAuth } from "./context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { notify } from "@/Helper";


import NavIcon from './components/ui/NavIcon'

import { IconHome } from '@tabler/icons-react';
import { IconNotebook } from '@tabler/icons-react';
import { IconSettings } from '@tabler/icons-react';
import { IconCalendar } from '@tabler/icons-react';
import { IconNote } from '@tabler/icons-react';

function Header() {
  const [nav, setNav] = useState(false);
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignout = async (e) => {
    e.preventDefault();
    const res = await signOut();
    if (res.success) {
      navigate('/signin');
    } else {
      notify.error(res.error.message);
    }
  }

  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800 shadow">
        <div className="flex flex-wrap justify-between items-center" >
          <Link to="/dashboard" className="flex items-center">
            <div className="w-15 h-15">
              <img src={logo} alt="Logo" />
            </div>
          </Link>

          <div className="flex gap-5" >
            <NavIcon icon={IconCalendar} label="CALENDAR" link="calendar" />
            <NavIcon icon={IconNotebook} label="JOURNAL" link="journal" />
            <NavIcon icon={IconHome} label="DASHBOARD" link="dashboard" />
            <NavIcon icon={IconNote} label="HABITS" link="habits" />
            <NavIcon icon={IconSettings} label="SETTINGS" link="settings" /> 
          </div>

        <div className="flex gap-5">
            <Button variant="outline" onClick={handleSignout}>Sign Out</Button>
          </div>
          
          {/* can fix this later ^ should be similar to logo on the left */}
        </div>
      </nav>

      
    </header>
  )
}

export default Header; 