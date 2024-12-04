import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AdmissionTemplate from './template';

interface SidebarItem {
    name: string;
    id: string;
}

const sidebarData: SidebarItem[] = [
    { name: 'PLM Admission Test', id: 'PLMAT' },
    { name: 'College of Law Admission Test', id: 'CLAT' },
    { name: 'College of Medicine Admission Test', id: 'CMAT' },
];

const AdmissionSidebar = ({ route }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname.split('/').pop();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleItemClick = (id: string) => {
        navigate(`/admission/${id}`);
        setDropdownOpen(false); // Close dropdown on item selection
    };

    const Sidebar = () => (
        <>
            {/* Mobile Sidebar */}
            <div className="md:hidden w-full p-4 border-b">
                <button
                    onClick={() => setDropdownOpen((prev) => !prev)}
                    className="w-full text-left p-2 bg-yellow-500 text-white rounded-md"
                >
                    {currentPath
                        ? sidebarData.find((item) => item.id === currentPath)?.name || 'Select an Option'
                        : 'Select an Option'}
                </button>
                {dropdownOpen && (
                    <ul className="mt-2 bg-white shadow-lg rounded-md">
                        {sidebarData.map((item) => (
                            <li
                                key={item.id}
                                className={`p-4 cursor-pointer ${
                                    currentPath === item.id
                                        ? 'text-yellow-600 font-bold'
                                        : 'text-black hover:text-yellow-600'
                                }`}
                                onClick={() => handleItemClick(item.id)}
                            >
                                {item.name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Desktop Sidebar */}
            <div className="hidden md:block w-1/5 px-16 pt-8">
                <ul>
                    {sidebarData.map((item) => (
                        <li
                            key={item.id}
                            className={`p-4 cursor-pointer ${
                                currentPath === item.id
                                    ? 'text-yellow-600 font-bold border-yellow-600 border-l-4'
                                    : 'text-black border-l-2 hover:text-yellow-600'
                            }`}
                            onClick={() => handleItemClick(item.id)}
                        >
                            {item.name}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );

    const MainContent = () => (
        <div className="w-full md:w-4/5">
            <AdmissionTemplate id={route} />
        </div>
    );

    return (
        <div className="w-full flex flex-col md:flex-row">
            {Sidebar()}
            {MainContent()}
        </div>
    );
};

export default AdmissionSidebar;