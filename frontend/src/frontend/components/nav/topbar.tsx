import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const TopBar = () => {
    const [isStudentDropdownOpen, setIsStudentDropdownOpen] = useState(false);
    const [isFacultyDropdownOpen, setIsFacultyDropdownOpen] = useState(false);

    return (
        <div className='w-full h-fit bg-red-700 py-1 px-8'>
            <ul className="flex list-none justify-end font-inter font-medium ">
                <li
                    className="mr-6 relative"
                    onClick={() => 
                        {
                            if(isStudentDropdownOpen){
                                setIsStudentDropdownOpen(false)
                            } else {
                                setIsStudentDropdownOpen(true)
                                setIsFacultyDropdownOpen(false)
                            }
                        }
                    }
                >
                    <span className="cursor-pointer text-white">
                    STUDENT
                    </span>
                    
                    {isStudentDropdownOpen && (
                    <div
                        className="absolute top-full mt-1 bg-gray-800 shadow-lg rounded w-72 text-white flex flex-col z-10"
                        onClick={() => setIsStudentDropdownOpen(false)}
                    >
                        <NavLink to="/student/crs" className="px-4 py-2 hover:bg-red-700">
                        Computerized Registration System (CRS)
                        </NavLink>
                        <a
                            href='https://web2.plm.edu.ph/sfe/'
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 hover:bg-red-700"
                        >
                            Student Faculty Evaluation
                        </a>
                        <a
                            href='https://library.plm.edu.ph/'
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 hover:bg-red-700"
                        >
                            Online Public Access Catalog
                        </a>
                    </div>
                    )}
                </li>

                <li
                    className="mr-6 relative"
                    onClick={() => 
                        {
                            if(isFacultyDropdownOpen){
                                setIsFacultyDropdownOpen(false)
                            } else {
                                setIsFacultyDropdownOpen(true)
                                setIsStudentDropdownOpen(false)
                            }
                        }
                    }
                >
                    <span className="cursor-pointer text-white">
                    FACULTY
                    </span>
                    
                    {isFacultyDropdownOpen && (
                    <div
                        className="absolute top-full mt-1 bg-gray-800 shadow-lg rounded w-72 text-white flex flex-col z-10"
                        onClick={() => setIsFacultyDropdownOpen(false)}
                    >
                        <NavLink to="/faculty/crs" className="px-4 py-2 hover:bg-red-700">
                        Computerized Registration System (CRS)
                        </NavLink>
                        <a
                            href='https://web2.plm.edu.ph/sfe/'
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 hover:bg-red-700"
                        >
                            Student Faculty Evaluation
                        </a>
                        <a
                            href='https://library.plm.edu.ph/'
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 hover:bg-red-700"
                        >
                            Online Public Access Catalog
                        </a>
                    </div>
                    )}
                </li>

                <li className="mr-6">
                    <a
                        href='https://web2.plm.edu.ph/ars/'
                        target="_blank"
                        rel="noopener noreferrer"
                        className='text-white'
                    >
                        ALUMNI
                    </a>
                </li>
                <li className="mr-6">
                    <NavLink to="/partner" className='text-white'>
                    PARTNER
                    </NavLink>
                </li>
                <li className="mr-6">
                    <NavLink to="/scholarship" className='text-white'>
                    SCHOLARSHIP
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}

export default TopBar;