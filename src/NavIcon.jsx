import { Link } from 'react-router-dom';

function NavIcon({ icon: Icon, label, link }) {
  return (
    <Link to={"/" + link} className="flex flex-col items-center hover:text-amber-400 hover:scale-110 duration-200" >
      <Icon className="text-2xl  transition" /> 
      <div className="text-xs">{label}</div>
    </Link>
  );
}

export default NavIcon;