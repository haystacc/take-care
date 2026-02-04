import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from './assets/jirachi.jpg';


import NavIcon from './NavIcon'

import { VscNotebook } from "react-icons/vsc";
import { VscSettingsGear } from "react-icons/vsc";
import { VscCalendar } from "react-icons/vsc";
import { IoIosCheckboxOutline } from "react-icons/io";


function Header() {
  const [nav, setNav] = useState(false);

  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800 shadow">
        <div className="flex flex-wrap justify-between items-center" >
          <Link to="/" className="flex items-center">
            <div className="w-15 h-15">
              <img src={logo} alt="Logo" />
            </div>
          </Link>

          <div className="flex gap-5" >
            <NavIcon icon={VscCalendar} label="CALENDAR" link="calendar" />
            <NavIcon icon={VscNotebook} label="JOURNAL" link="journal" />
            <NavIcon icon={IoIosCheckboxOutline} label="HABITS" link="habits" />
          </div>
          <Link to="/settings" className="">
            <VscSettingsGear className="w-10 h-10" />
          </Link>
        </div>
      </nav>

      
    </header>
  )
}

export default Header; 