import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="px-4 py-2 flex justify-between items-center border-t-4 border-yellow-500">
      <div className="flex gap-4 items-center">
        <img src='./images/Logo.png' alt="Logo" className="h-20" />
        <div>
          <h1 className='font-serif text-lg font-semibold text-yellow-600'>PAMANTASAN NG LUNGSOD NG MAYNILA</h1>
          <h3 className='text-sm text-gray-600'>University of the City of Manila</h3>
        </div>
      </div> 
      <ul className="flex list-none m-0 p-0">
        <li className="ml-6">
          <NavLink to="/" className={({ isActive }) => isActive ? "text-red-500 font-bold" : "text-black"} end>Home</NavLink>
        </li>
        <li className="ml-6">
          <NavLink to="/about" className={({ isActive }) => isActive ? "text-red-500 font-bold" : "text-black"}>About</NavLink>
        </li>
        <li className="ml-6">
          <NavLink to="/academics" className={({ isActive }) => isActive ? "text-red-500 font-bold" : "text-black"}>Academics</NavLink>
        </li>
        <li className="ml-6">
          <NavLink to="/admissions" className={({ isActive }) => isActive ? "text-red-500 font-bold" : "text-black"}>Admissions</NavLink>
        </li>
        <li className="ml-6">
          <NavLink to="/announcements" className={({ isActive }) => isActive ? "text-red-500 font-bold" : "text-black"}>Announcements</NavLink>
        </li>
        <li className="ml-6">
          <NavLink to="/downloads" className={({ isActive }) => isActive ? "text-red-500 font-bold" : "text-black"}>Downloads</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;