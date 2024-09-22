import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isHome = location.pathname === '/';
  const navbarClass = isHome && !isScrolled ? 'bg-transparent' : 'bg-white shadow-md border-yellow-500 border-b-4';
  const titleHome = isHome && !isScrolled ? 'text-white' : 'text-yellow-600';
  const otherHome = isHome && !isScrolled ? 'text-white' : 'text-black';


  return (
    <nav className={`fixed w-full top-0 px-4 py-2 flex justify-between items-center transition-colors duration-300 ${navbarClass}`}>
      <div className="flex gap-4 items-center">
        <img src="./images/Logo.png" alt="Logo" className="h-20" />
        <div>
          <h1 className={`font-serif text-lg font-semibold ${titleHome}`}>PAMANTASAN NG LUNGSOD NG MAYNILA</h1>
          <h3 className={`text-sm ${otherHome}`}>University of the City of Manila</h3>
        </div>
      </div>
      <ul className="flex list-none m-0 p-0">
        <li className="ml-6">
          <NavLink to="/" className={({ isActive }) => (isActive ? 'text-red-500 font-bold' : otherHome)} end>
            Home
          </NavLink>
        </li>
        <li className="ml-6">
          <NavLink to="/about" className={({ isActive }) => (isActive ? 'text-red-500 font-bold' : otherHome)}>
            About
          </NavLink>
        </li>
        <li className="ml-6">
          <NavLink to="/academics" className={({ isActive }) => (isActive ? 'text-red-500 font-bold' : otherHome)}>
            Academics
          </NavLink>
        </li>
        <li className="ml-6">
          <NavLink to="/admissions" className={({ isActive }) => (isActive ? 'text-red-500 font-bold' : otherHome)}>
            Admissions
          </NavLink>
        </li>
        <li className="ml-6">
          <NavLink to="/announcements" className={({ isActive }) => (isActive ? 'text-red-500 font-bold' : otherHome)}>
            Announcements
          </NavLink>
        </li>
        <li className="ml-6">
          <NavLink to="/downloads" className={({ isActive }) => (isActive ? 'text-red-500 font-bold' : otherHome)}>
            Downloads
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;