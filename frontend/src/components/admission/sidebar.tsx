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

const AdmissionSidebar = ({route}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname.split('/').pop();

    const handleItemClick = (id: string) => {
        navigate(`/admission/${id}`);
    };

    const Sidebar = () => (
        <div className="w-1/5 px-16 pt-8">
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
    );

    const MainContent = () => (
        <div className="w-4/5">
            <AdmissionTemplate id={route} />
        </div>
    );

    return (
        <div className="w-full flex">
            {Sidebar()}
            {MainContent()}
        </div>
    );
};

export default AdmissionSidebar;