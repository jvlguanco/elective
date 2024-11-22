import React, { useState, useEffect, Suspense  } from 'react';
import { useLocation } from 'react-router-dom';

interface SidebarItem {
    name: string;
    component: string;
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
        { name: 'PLM Colleges', component: 'PLM Colleges' },
        { name: 'PLM Offices', component: 'PLM Offices' },
        { name: 'PLM Executives', component: 'PLM Executives' },
    ],
};

const loadComponent = (componentName: string, location: string) => {
    return React.lazy(() => import(`./${location}/${componentName}`).catch(() => ({ default: () => <div>No content available</div> })));
};

const AboutSidebar = () => { 
    const location = useLocation();
    const routeKey = location.pathname.split('/')[2] ?? 'profile';

    const [sidebarData, setSidebarData] = useState(staticSidebarData);
    const [selectedItem, setSelectedItem] = useState<string>('');
    const [activeItem, setActiveItem] = useState<string>('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOffices = async () => {
            try {
                // const response = await fetch('/api/offices');
                // const officeData = await response.json();

                // const formattedOffices = officeData.map((office: any) => ({
                //     name: office.name,
                //     component: office.componentName,
                // }));

                const formattedOffices = [
                    { name: 'Accounting Office', component: 'template' },
                    { name: 'Budget Office', component: 'template' },
                    { name: 'Center of University Extension Services', component: 'template' },
                    { name: 'General Services Office', component: 'template' },
                    { name: 'Internal Audit Office', component: 'template' },
                    { name: 'Office of Graduate/Professional Studies', component: 'template' },
                    { name: 'Office of Guidance & Testing Services', component: 'template' },
                    { name: 'Office of NSTP', component: 'template' },
                    { name: 'Office of Student Development Services', component: 'template' },
                    { name: 'Office of the University Legal Counsel', component: 'template' },
                    { name: 'Office of the University Registrar', component: 'template' },
                    { name: 'Office of the University Secretary', component: 'template' },
                    { name: 'Office of the VP for Research', component: 'template' },
                    { name: 'Physical Facilities Management Office', component: 'template' },
                    { name: 'Planning And Management Office', component: 'template' },
                    { name: 'PLM Law Center', component: 'template' },
                    { name: 'Procurement Office', component: 'template' },
                    { name: 'Property & Supplies Office', component: 'template' },
                    { name: 'Revenue Generation Office', component: 'template' },
                    { name: 'University Health Services', component: 'template' },
                    { name: 'University Library', component: 'template' },
                    { name: 'University Research Center', component: 'template' },
                ]

                setSidebarData(prevData => ({
                    ...prevData,
                    offices: formattedOffices,
                }));
            } catch (error) {
                console.error('Failed to fetch offices data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOffices();
    }, []);

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

    const selectedComponentName = items.find(item => item.name === selectedItem)?.component;
    const SelectedComponent = selectedComponentName ? loadComponent(selectedComponentName, routeKey) : null;

    if (loading) {
        return <div>Loading content...</div>;
    }

    return(
        <div className='w-full flex'>
            <div className='w-1/5 px-16 pt-8'>
                <ul>
                    {items.map(item => (
                        <li
                            key={item.name}
                            className={`p-4  cursor-pointer ${activeItem === item.name ? 'text-yellow-600 font-bold border-yellow-600 border-l-4' : 'text-black border-l-2 hover:text-yellow-600'}`}
                            onClick={() => handleItemClick(item.name)}
                        >
                            {item.name} 
                        </li>
                    ))}
                </ul>
            </div>
    
            <div className="w-4/5">
            <Suspense fallback={<div>Loading...</div>}>
                    {SelectedComponent ? 
                        (routeKey === 'offices' 
                            ? <SelectedComponent location={selectedItem} />
                            : <SelectedComponent />) 
                        : <div>No content available</div>}
                </Suspense>
            </div>
        </div>
    )
}

export default AboutSidebar;  