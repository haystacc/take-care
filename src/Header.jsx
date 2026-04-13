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
import { IconCalendar } from '@tabler/icons-react';
import { IconNote } from '@tabler/icons-react';
import { IconMoodSmile } from '@tabler/icons-react';
import { IconMenu2, IconX } from '@tabler/icons-react';

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

  const navItems = [
    { icon: IconCalendar, label: "CALENDAR", link: "calendar" },
    { icon: IconNotebook, label: "JOURNAL", link: "journal" },
    { icon: IconHome, label: "DASHBOARD", link: "dashboard" },
    { icon: IconNote, label: "HABITS", link: "habits" },
    { icon: IconMoodSmile, label: "MOOD TRACKER", link: "moodtracker" },
  ];

  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800 shadow">
        <div className="flex flex-wrap justify-between items-center" >
          <Link to="/dashboard" className="flex items-center">
            <div className="w-12 h-12">
              <img src={logo} alt="Logo" />
            </div>
          </Link>

          <div className="hidden md:flex gap-5" >
            {navItems.map((item) => (
              <NavIcon key={item.link} icon={item.icon} label={item.label} link={item.link} />
            ))}
          </div>

          <div className="flex gap-2 md:gap-5 items-center">
            <button 
              onClick={() => setNav(!nav)}
              className="md:hidden p-1"
            >
              {nav ? <IconX size={24} /> : <IconMenu2 size={24} />}
            </button>
            <Button variant="outline" onClick={handleSignout} className="text-xs md:text-sm px-2 md:px-4">Sign Out</Button>
          </div>   
        </div>

        {nav && (
          <div className="md:hidden bg-white dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600 py-3 px-2">
            <div className="flex flex-col gap-3">
              {navItems.map((item) => (
                <NavIcon 
                  key={item.link} 
                  icon={item.icon} 
                  label={item.label} 
                  link={item.link}
                  onClick={() => setNav(false)}
                />
              ))}
            </div>
          </div>
        )}
      </nav>

      
    </header>
  )
}

export default Header; 