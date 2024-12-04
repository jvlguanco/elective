import { useState, useRef, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const MainNav = () => {
    const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
    const [isAdmissionDropdownOpen, setIsAdmissionDropdownOpen] = useState(false);
    const [isAcademicDropdownOpen, setIsAcademicDropdownOpen] = useState(false);
    const [isStudentDropdownOpen, setIsStudentDropdownOpen] = useState(false);
    const [isFacultyDropdownOpen, setIsFacultyDropdownOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

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
                dropdown.style.left = '0';
            }
        }
    };

    useEffect(() => {
        if (isAboutDropdownOpen) adjustDropdownPosition(aboutDropdownRef);
        if (isAdmissionDropdownOpen) adjustDropdownPosition(admissionDropdownRef);
        if (isAcademicDropdownOpen) adjustDropdownPosition(academicDropdownRef);
    }, [isAboutDropdownOpen, isAdmissionDropdownOpen, isAcademicDropdownOpen]);

    const toggleMenu = () => setMenuOpen(!menuOpen);

    const DropdownIndicator = ({ isOpen }) => (
        <span className={`ml-2 transform transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}>▼</span>
    );

    return (
        <div className="w-full h-fit flex justify-between items-center bg-white border-b-2 border-gray-500">
            <div className="flex gap-4 items-center px-8 py-2">
                <img src="/images/Logo.png" alt="Logo" className="h-16 w-16" />
                <div>
                    <h1 className="font-serif text-lg font-semibold text-custom-yellow">PAMANTASAN NG LUNGSOD NG MAYNILA</h1>
                    <h3 className="text-sm">University of the City of Manila</h3>
                </div>
            </div>

            <button
                className="md:hidden block px-4"
                onClick={toggleMenu}
                aria-label="Toggle menu"
            >
                <span className="block w-6 h-1 bg-black mb-1"></span>
                <span className="block w-6 h-1 bg-black mb-1"></span>
                <span className="block w-6 h-1 bg-black"></span>
            </button>

            <ul className="hidden md:flex list-none m-0 p-0">
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
                        About <DropdownIndicator isOpen={isAboutDropdownOpen}/>
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
                        Academics <DropdownIndicator isOpen={isAcademicDropdownOpen}/>
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
                        Admissions <DropdownIndicator isOpen={isAdmissionDropdownOpen}/>
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

            {menuOpen && (
                <div className="fixed top-0 right-0 h-full w-3/4 bg-white shadow-lg z-50 p-6 overflow-y-auto">
                    <button
                        className="absolute top-4 right-4 text-black text-xl"
                        onClick={toggleMenu}
                        aria-label="Close menu"
                    >
                        &times;
                    </button>
                    <ul className="list-none space-y-4">
                        <li>
                            <NavLink to="/" className="block py-2 text-lg font-medium" onClick={toggleMenu}>
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <button
                                className="block w-full text-left py-2 text-lg font-medium flex justify-between items-center"
                                onClick={() => {
                                    setIsAboutDropdownOpen(!isAboutDropdownOpen)
                                    setIsAcademicDropdownOpen(false)
                                    setIsAdmissionDropdownOpen(false)
                                    setIsFacultyDropdownOpen(false)
                                    setIsStudentDropdownOpen(false)
                                }}
                                aria-expanded={isAboutDropdownOpen}
                            >
                                About <DropdownIndicator isOpen={isAboutDropdownOpen} />
                            </button>
                            {isAboutDropdownOpen && (
                                <ul className="ml-4 mt-2 space-y-2 border-l-2 border-gray-300 pl-2">
                                    <li>
                                        <NavLink
                                            to="/about/profile"
                                            className="block py-2"
                                            onClick={toggleMenu}
                                        >
                                            University Profile
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/about/administration"
                                            className="block py-2"
                                            onClick={toggleMenu}
                                        >
                                            Administration
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/about/offices"
                                            className="block py-2"
                                            onClick={toggleMenu}
                                        >
                                            Offices
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/about/contact"
                                            className="block py-2"
                                            onClick={toggleMenu}
                                        >
                                            Contact
                                        </NavLink>
                                    </li>
                                </ul>
                            )}
                        </li>
                        <li>
                            <button
                                className="block w-full text-left py-2 text-lg font-medium flex justify-between items-center"
                                onClick={() => {
                                    setIsAboutDropdownOpen(false)
                                    setIsAcademicDropdownOpen(!isAcademicDropdownOpen)
                                    setIsAdmissionDropdownOpen(false)
                                    setIsFacultyDropdownOpen(false)
                                    setIsStudentDropdownOpen(false)
                                }}
                                aria-expanded={isAcademicDropdownOpen}
                            >
                                Academics <DropdownIndicator isOpen={isAcademicDropdownOpen} />
                            </button>
                            {isAcademicDropdownOpen && (
                                <ul className="ml-4 mt-2 space-y-2 border-l-2 border-gray-300 pl-2">
                                    <li>
                                        <NavLink
                                            to="/academic/colleges"
                                            className="block py-2"
                                            onClick={toggleMenu}
                                        >
                                            Colleges
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/academic/graduate"
                                            className="block py-2"
                                            onClick={toggleMenu}
                                        >
                                            Graduate and Professional Studies
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/academic/calendar"
                                            className="block py-2"
                                            onClick={toggleMenu}
                                        >
                                            Academic Calendar
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/academic/obe"
                                            className="block py-2"
                                            onClick={toggleMenu}
                                        >
                                            Outcome-Based Education
                                        </NavLink>
                                    </li>
                                </ul>
                            )}
                        </li>
                        <li>
                            <button
                                className="block w-full text-left py-2 text-lg font-medium flex justify-between items-center"
                                onClick={() => {
                                    setIsAboutDropdownOpen(false)
                                    setIsAcademicDropdownOpen(false)
                                    setIsAdmissionDropdownOpen(!isAdmissionDropdownOpen)
                                    setIsFacultyDropdownOpen(false)
                                    setIsStudentDropdownOpen(false)
                                }}
                                aria-expanded={isAdmissionDropdownOpen}
                            >
                                Admissions <DropdownIndicator isOpen={isAdmissionDropdownOpen} />
                            </button>
                            {isAdmissionDropdownOpen && (
                                <ul className="ml-4 mt-2 space-y-2 border-l-2 border-gray-300 pl-2">
                                    <li>
                                        <NavLink
                                            to="/admission/PLMAT"
                                            className="block py-2"
                                            onClick={toggleMenu}
                                        >
                                            PLM Admission Test (PLMAT)
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/admission/CMAT"
                                            className="block py-2"
                                            onClick={toggleMenu}
                                        >
                                            College of Medicine Admission Test
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/admission/CLAT"
                                            className="block py-2"
                                            onClick={toggleMenu}
                                        >
                                            College of Law Admission Test (CLAT)
                                        </NavLink>
                                    </li>
                                </ul>
                            )}
                        </li>
                        <li>
                            <NavLink
                                to="/announcement"
                                className="block py-2 text-lg font-medium"
                                onClick={toggleMenu}
                            >
                                Announcements
                            </NavLink>
                        </li>
                        <li>
                            <button
                                className="block w-full text-left py-2 text-lg font-medium flex justify-between items-center"
                                onClick={() => {
                                    setIsAboutDropdownOpen(false)
                                    setIsAcademicDropdownOpen(false)
                                    setIsAdmissionDropdownOpen(false)
                                    setIsFacultyDropdownOpen(false)
                                    setIsStudentDropdownOpen(!isStudentDropdownOpen)
                                }}
                                aria-expanded={isStudentDropdownOpen}
                            >
                                Student <DropdownIndicator isOpen={isStudentDropdownOpen} />
                            </button>
                            {isStudentDropdownOpen && (
                                <ul className="ml-4 mt-2 space-y-2 border-l-2 border-gray-300 pl-2">
                                    <li>
                                        <NavLink
                                            to="/student/crs"
                                            className="block py-2"
                                            onClick={toggleMenu}
                                        >
                                            Computerized Registration System (CRS)
                                        </NavLink>
                                    </li>
                                    <li>
                                        <a
                                            href="https://web2.plm.edu.ph/sfe/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block py-2"
                                        >
                                            Student Faculty Evaluation
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="https://library.plm.edu.ph/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block py-2"
                                        >
                                            Online Public Access Catalog
                                        </a>
                                    </li>
                                </ul>
                            )}
                        </li>
                        <li>
                            <button
                                className="block w-full text-left py-2 text-lg font-medium flex justify-between items-center"
                                onClick={() => {
                                    setIsAboutDropdownOpen(false)
                                    setIsAcademicDropdownOpen(false)
                                    setIsAdmissionDropdownOpen(false)
                                    setIsFacultyDropdownOpen(!isFacultyDropdownOpen)
                                    setIsStudentDropdownOpen(false)
                                }}
                                aria-expanded={isFacultyDropdownOpen}
                            >
                                Faculty <DropdownIndicator isOpen={isFacultyDropdownOpen} />
                            </button>
                            {isFacultyDropdownOpen && (
                                <ul className="ml-4 mt-2 space-y-2 border-l-2 border-gray-300 pl-2">
                                    <li>
                                        <NavLink
                                            to="/faculty/crs"
                                            className="block py-2"
                                            onClick={toggleMenu}
                                        >
                                            Computerized Registration System (CRS)
                                        </NavLink>
                                    </li>
                                    <li>
                                        <a
                                            href="https://web2.plm.edu.ph/sfe/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block py-2"
                                        >
                                            Student Faculty Evaluation
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="https://library.plm.edu.ph/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block py-2"
                                        >
                                            Online Public Access Catalog
                                        </a>
                                    </li>
                                </ul>
                            )}
                        </li>
                        <li>
                            <a
                                href="https://web2.plm.edu.ph/ars/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block py-2 text-lg font-medium"
                            >
                                Alumni
                            </a>
                        </li>
                        <li>
                            <NavLink to="/partner" className="block py-2 text-lg font-medium" onClick={toggleMenu}>
                                Partner
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/scholarship" className="block py-2 text-lg font-medium" onClick={toggleMenu}>
                                Scholarship
                            </NavLink>
                        </li>
                    </ul>
                </div>
            )}

        </div>
    );
};

export default MainNav;