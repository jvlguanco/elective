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

    useEffect(() => {
        const fetchSidebarData = async () => {
            if (routeKey === 'colleges') {
                setLoading(true);
                try {
                    const response = await fetch('http://localhost:5000/about/college');
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
    
    const handleItemClick = (id: string) => setSelectedItem(id);

    const SelectedComponent = componentMap[routeKey] || (() => <div>No content available</div>);

    if (loading) {
        return <div>Loading content...</div>;
    }

    const Sidebar = () =>
        routeKey === 'colleges' && (
            <div className="w-1/5 px-16 pt-8">
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
        );

    const MainContent = () => (
        <div className={`w-${routeKey === 'colleges' ? '4/5' : 'full'}`}>
            <SelectedComponent id={selectedItem} />
        </div>
    );

    return (
        <div className="w-full flex">
            {Sidebar()}
            {MainContent()}
        </div>
    );
};

export default AcademicSidebar;