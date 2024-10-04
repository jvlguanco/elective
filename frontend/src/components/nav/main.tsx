import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const MainNav = () => {
    const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
    const [isAcademicDropdownOpen, setIsAcademicDropdownOpen] = useState(false);

    return (
        <div className='w-full h-fit flex justify-between items-center bg-white'>
            <div className="flex gap-4 items-center px-8 py-2">
                <img src="./images/Logo.png" alt="Logo" className="h-16 w-16" />
                <div>
                    <h1 className='font-serif text-lg font-semibold text-custom-yellow'>PAMANTASAN NG LUNGSOD NG MAYNILA</h1>
                    <h3 className='text-sm'>University of the City of Manila</h3>
                </div>
            </div>

            <ul className="flex list-none m-0 p-0">
                <li className="mr-6">
                    <NavLink to="/" className={({ isActive }) => (isActive ? 'text-red-500 font-bold' : 'text-black')} end>
                        Home
                    </NavLink>
                </li>

                <li className="mr-6">
                    <NavLink to="/about" className={({ isActive }) => (isActive ? 'text-red-500 font-bold' : 'text-black')} end>
                        About
                    </NavLink>
                </li>

                <li className="mr-6">
                    <NavLink to="/academics" className={({ isActive }) => (isActive ? 'text-red-500 font-bold' : 'text-black')} end>
                        Academics
                    </NavLink>
                </li>

                <li className="mr-6">
                    <NavLink to="/admissions" className={({ isActive }) => (isActive ? 'text-red-500 font-bold' : 'text-black')} end>
                        Admissions
                    </NavLink>
                </li>

                <li className="mr-6">
                    <NavLink to="/announcement" className={({ isActive }) => (isActive ? 'text-red-500 font-bold' : 'text-black')} end>
                        Announcements
                    </NavLink>
                </li>
            </ul>
        </div>
    );
}

export default MainNav