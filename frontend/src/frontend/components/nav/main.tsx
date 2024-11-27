import { useState, useRef, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const MainNav = () => {
    const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
    const [isAdmissionDropdownOpen, setIsAdmissionDropdownOpen] = useState(false);
    const [isAcademicDropdownOpen, setIsAcademicDropdownOpen] = useState(false);

    const aboutDropdownRef = useRef(null);
    const admissionDropdownRef = useRef(null);
    const academicDropdownRef = useRef(null);

    const location = useLocation();
    const currentLocation = location.pathname;

    const adjustDropdownPosition = (dropdownRef) => {
        const dropdown = dropdownRef.current;
        if (dropdown) {
            const rect = dropdown.getBoundingClientRect();
            if (rect.right > window.innerWidth) {
                dropdown.style.left = `-${rect.right - window.innerWidth}px`;
            } else {
                dropdown.style.left = '0'; // Reset if no overflow
            }
        }
    };

    useEffect(() => {
        if (isAboutDropdownOpen) adjustDropdownPosition(aboutDropdownRef);
        if (isAdmissionDropdownOpen) adjustDropdownPosition(admissionDropdownRef);
        if (isAcademicDropdownOpen) adjustDropdownPosition(academicDropdownRef);
    }, [isAboutDropdownOpen, isAdmissionDropdownOpen, isAcademicDropdownOpen]);

    return (
        <div className="w-full h-fit flex justify-between items-center bg-white border-b-2 border-gray-500">
            <div className="flex gap-4 items-center px-8 py-2">
                <img src="/images/Logo.png" alt="Logo" className="h-16 w-16" />
                <div>
                    <h1 className="font-serif text-lg font-semibold text-custom-yellow">PAMANTASAN NG LUNGSOD NG MAYNILA</h1>
                    <h3 className="text-sm">University of the City of Manila</h3>
                </div>
            </div>

            <ul className="flex list-none m-0 p-0">
                <li className="mr-6 relative group">
                    <NavLink to="/" className={currentLocation === "/" ? 'text-red-500 font-bold' : 'text-black'} end>
                        Home
                    </NavLink>
                </li>

                <li
                    className="mr-6 relative group"
                    onClick={() => {
                        setIsAboutDropdownOpen(!isAboutDropdownOpen);
                        setIsAdmissionDropdownOpen(false);
                        setIsAcademicDropdownOpen(false);
                    }}
                >
                    <span
                        className={`cursor-pointer ${currentLocation.startsWith('/about') ? 'text-red-500 font-bold' : 'text-black'}`}
                    >
                        About
                    </span>

                    {isAboutDropdownOpen && (
                        <div
                            ref={aboutDropdownRef}
                            className="absolute top-12 mt-1 bg-white w-72 flex flex-col z-10"
                        >
                            <li className="hover:bg-gray-200">
                                <NavLink to="/about/profile" className="block px-4 py-2">
                                    University Profile
                                </NavLink>
                            </li>
                            <li className="hover:bg-gray-200">
                                <NavLink to="/about/administration" className="block px-4 py-2">
                                    Administration
                                </NavLink>
                            </li>
                            <li className="hover:bg-gray-200">
                                <NavLink to="/about/offices" className="block px-4 py-2">
                                    Offices
                                </NavLink>
                            </li>
                            <li className="hover:bg-gray-200">
                                <NavLink to="/about/contact" className="block px-4 py-2">
                                    Contact
                                </NavLink>
                            </li>
                        </div>
                    )}
                </li>

                <li
                    className="mr-6 relative group"
                    onClick={() => {
                        setIsAcademicDropdownOpen(!isAcademicDropdownOpen);
                        setIsAboutDropdownOpen(false);
                        setIsAdmissionDropdownOpen(false);
                    }}
                >
                    <span
                        className={`cursor-pointer ${currentLocation.startsWith('/academic') ? 'text-red-500 font-bold' : 'text-black'}`}
                    >
                        Academics
                    </span>

                    {isAcademicDropdownOpen && (
                        <div
                            ref={academicDropdownRef}
                            className="absolute top-12 mt-1 bg-white w-72 flex flex-col z-10"
                        >
                            <li className="hover:bg-gray-200">
                                <NavLink to="/academic/colleges" className="block px-4 py-2">
                                    Colleges
                                </NavLink>
                            </li>
                            <li className="hover:bg-gray-200">
                                <NavLink to="/academic/graduate" className="block px-4 py-2">
                                    Office for Graduate and Professional Studies
                                </NavLink>
                            </li>
                            <li className="hover:bg-gray-200">
                                <NavLink to="/academic/calendar" className="block px-4 py-2">
                                    Academic Calendar
                                </NavLink>
                            </li>
                            <li className="hover:bg-gray-200">
                                <NavLink to="/academic/obe" className="block px-4 py-2">
                                    Outcome-Based Education (OBE)
                                </NavLink>
                            </li>
                        </div>
                    )}
                </li>

                <li
                    className="mr-6 relative group"
                    onClick={() => {
                        setIsAdmissionDropdownOpen(!isAdmissionDropdownOpen);
                        setIsAboutDropdownOpen(false);
                        setIsAcademicDropdownOpen(false);
                    }}
                >
                    <span
                        className={`cursor-pointer ${currentLocation.startsWith('/admission') ? 'text-red-500 font-bold' : 'text-black'}`}
                    >
                        Admissions
                    </span>

                    {isAdmissionDropdownOpen && (
                        <div
                            ref={admissionDropdownRef}
                            className="absolute top-12 mt-1 bg-white w-72 flex flex-col z-10"
                        >
                            <li className="hover:bg-gray-200">
                                <NavLink to="/admission/PLMAT" className="block px-4 py-2">
                                    PLM Admission Test (PLMAT)
                                </NavLink>
                            </li>
                            <li className="hover:bg-gray-200">
                                <NavLink to="/admission/CMAT" className="block px-4 py-2">
                                    College of Medicine Admission Test
                                </NavLink>
                            </li>
                            <li className="hover:bg-gray-200">
                                <NavLink to="/admission/CLAT" className="block px-4 py-2">
                                    College of Law Admission Test (CLAT)
                                </NavLink>
                            </li>
                        </div>
                    )}
                </li>

                <li className="mr-6 relative group">
                    <NavLink
                        to="/announcement"
                        className={({ isActive }) => (isActive ? 'text-red-500 font-bold' : 'text-black')}
                        end
                    >
                        Announcements
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};

export default MainNav;