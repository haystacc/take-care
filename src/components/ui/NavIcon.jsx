import { Link } from 'react-router-dom';

function NavIcon({ icon: Icon, label, link }) {
  return (
    <Link to={"/" + link} className="text-xs flex flex-col items-center hover:text-indigo-400 hover:scale-110 duration-200" >
      <Icon className="transition" /> 
      <div>{label}</div>
    </Link>
  );
}

export default NavIcon;