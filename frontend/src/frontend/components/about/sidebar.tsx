import React, { useState, useEffect, Suspense } from 'react';
import { useLocation } from 'react-router-dom';

interface SidebarItem {
    id?: number;
    name: string;
    component: string;
    status?: string;
}

const staticSidebarData: Record<string, SidebarItem[]> = {
    'profile': [
        { name: 'Vision/Mission', component: 'vission_mission' },
        { name: 'Seal and Symbols', component: 'seal' },
        { name: 'PLM History', component: 'history' },
        { name: 'University Hymn', component: 'hymn' },
    ],
    'administration': [
        { name: 'Board of Regents', component: 'board_of_regents' },
        { name: 'The President', component: 'president' },
        { name: 'Management Committee', component: 'management_committee' },
        { name: 'Directors and Chiefs', component: 'directors' },
        { name: 'Deans', component: 'deans' },
        { name: 'Organizational Chart', component: 'org_chart' },
        { name: 'Presidential Support Staff', component: 'support_staff' },
    ],
    'contact': [
        { name: 'PLM Colleges', component: 'template' },
        { name: 'PLM Offices', component: 'template' },
    ],
};

const loadComponent = (componentName: string, location: string) => {
    return React.lazy(() =>
        import(`./${location}/${componentName}.tsx`).catch(() => ({
            default: () => <div>No content available</div>,
        }))
    );
};

const AboutSidebar = () => {
    const location = useLocation();
    const routeKey = location.pathname.split('/')[2] ?? 'profile';
    
    const [sidebarData, setSidebarData] = useState(staticSidebarData);
    const [selectedItem, setSelectedItem] = useState<string>('');
    const [activeItem, setActiveItem] = useState<string>('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (routeKey === 'offices') {
            const fetchOffices = async () => {
                try {
                    const response = await fetch(`${import.meta.env.VITE_API_ROOT}/office/information`);
                    const officeData: SidebarItem[] = await response.json();

                    const activeOffices = officeData
                        .filter((office) => office.status === 'active')
                        .map((office) => ({
                            id: office.id,
                            name: office.office_name,
                            component: 'template',
                        }));

                    setSidebarData((prevData) => ({
                        ...prevData,
                        offices: activeOffices,
                    }));
                } catch (error) {
                    console.error('Failed to fetch offices data:', error);
                } finally {
                    setLoading(false);
                }
            };

            fetchOffices();
        } else {
            setLoading(false);
        }
    }, [routeKey]);

    const items = sidebarData[routeKey] || [];

    useEffect(() => {
        const defaultItem = items[0]?.name || '';
        setSelectedItem(defaultItem);
        setActiveItem(defaultItem);
    }, [items]);

    const handleItemClick = (itemName: string) => {
        setActiveItem(itemName);
        setSelectedItem(itemName);
    };

    const selectedComponent = items.find((item) => item.name === selectedItem);
    const SelectedComponent = selectedComponent
        ? loadComponent(selectedComponent.component, routeKey)
        : null;

    if (loading) {
        return <div>Loading content...</div>;
    }

    return (
        <div className="w-full flex">
            <div className="w-1/5 px-16 pt-8">
                <ul>
                    {items.map((item, index) => (
                        <li
                            key={item.id ?? index}
                            className={`p-4 cursor-pointer ${
                                activeItem === item.name
                                    ? 'text-yellow-600 font-bold border-yellow-600 border-l-4'
                                    : 'text-black border-l-2 hover:text-yellow-600'
                            }`}
                            onClick={() => handleItemClick(item.name)}
                        >
                            {item.name}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="w-4/5">
                <Suspense fallback={<div>Loading...</div>}>
                    {SelectedComponent ? (
                        routeKey === 'offices' && selectedComponent?.id ? (
                            <SelectedComponent id={selectedComponent.id} />
                        ) : routeKey === 'contact' ? (
                            <SelectedComponent location={selectedItem} />
                        ) : (
                            <SelectedComponent />
                        )
                    ) : (
                        <div>No content available</div>
                    )}
                </Suspense>
            </div>
        </div>
    );
};

export default AboutSidebar;