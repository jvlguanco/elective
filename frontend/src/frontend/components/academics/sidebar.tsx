import React, { useState, useEffect } from 'react';
import Colleges from './colleges';
import Calendar from './calendar';
import OBE from './obe';
import Graduate from './graduate';

interface SidebarItem {
    name: string;
    id: string;
}

interface VariableProps {
    route: string;
}

const componentMap: Record<string, React.FC<any>> = {
    colleges: Colleges,
    calendar: Calendar,
    obe: OBE,
    graduate: Graduate,
};

const AcademicSidebar: React.FC<VariableProps> = ({ route }) => {
    const routeKey = route || 'colleges';

    const [sidebarData, setSidebarData] = useState<SidebarItem[]>([]);
    const [selectedItem, setSelectedItem] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        const fetchSidebarData = async () => {
            if (routeKey === 'colleges') {
                setLoading(true);
                try {
                    const response = await fetch(`${import.meta.env.VITE_API_ROOT}/about/college`);
                    const { active } = await response.json();

                    const formattedData = active.map((college: any) => ({
                        name: college.college_name,
                        id: college.college_id,
                    }));

                    setSidebarData(formattedData);
                } catch (error) {
                    console.error('Failed to fetch colleges data:', error);
                } finally {
                    setLoading(false);
                }
            } else {
                setSidebarData([]);
            }
        };

        fetchSidebarData();
    }, [routeKey]);

    useEffect(() => {
        if (sidebarData.length > 0 && !selectedItem) {
            setSelectedItem(sidebarData[0].id);
        }
    }, [sidebarData, selectedItem]);

    const handleItemClick = (id: string) => {
        setSelectedItem(id);
        setDropdownOpen(false); // Close dropdown on item selection
    };

    const SelectedComponent = componentMap[routeKey] || (() => <div>No content available</div>);

    if (loading) {
        return <div>Loading content...</div>;
    }

    const showSidebar = routeKey === 'colleges' && sidebarData.length > 0;

    const Sidebar = () => (
        showSidebar && (
            <>
                <div className="md:hidden w-full p-4 border-b">
                    <button
                        onClick={() => setDropdownOpen((prev) => !prev)}
                        className="w-full text-left p-2 bg-yellow-500 text-white rounded-md"
                    >
                        {selectedItem
                            ? sidebarData.find((item) => item.id === selectedItem)?.name || 'Select an Option'
                            : 'Select an Option'}
                    </button>
                    {dropdownOpen && (
                        <ul className="mt-2 bg-white shadow-lg rounded-md">
                            {sidebarData.map((item) => (
                                <li
                                    key={item.id}
                                    className={`p-4 cursor-pointer ${
                                        selectedItem === item.id
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

                <div className="hidden md:block w-1/5 px-16 pt-8">
                    <ul>
                        {sidebarData.map((item) => (
                            <li
                                key={item.id}
                                className={`p-4 cursor-pointer ${
                                    selectedItem === item.id
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
        )
    );

    const MainContent = () => (
        <div className={`w-full ${showSidebar ? 'md:w-4/5' : 'md:w-full'}`}>
            <SelectedComponent id={selectedItem} />
        </div>
    );

    return (
        <div className="w-full flex flex-col md:flex-row">
            {showSidebar && Sidebar()}
            {MainContent()}
        </div>
    );
};

export default AcademicSidebar;