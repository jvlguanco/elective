import React, { useState, useEffect, Suspense  } from 'react';
import { useLocation } from 'react-router-dom';

interface SidebarItem {
    name: string;
    component: string;
}

const sidebarData: Record<string, SidebarItem[]> = {
    'profile': [
        { name: 'Vision/Mission', component: 'vission_mission' },
        { name: 'Seal and Symbols', component: 'seal' },
        { name: 'PLM History', component: 'history' },
        { name: 'University Hymn', component: 'hymm' },
    ],
    'administration': [
        { name: 'Board of Regents', component: 'Board of Regents' },
        { name: 'The President', component: 'The President' },
        { name: 'Vice Presidents and Assistant Vice Presidents', component: 'Vice Presidents and Assistant Vice Presidents' },
        { name: 'Directors and Chiefs', component: 'Directors and Chiefs' },
        { name: 'Deans', component: 'Deans' },
        { name: 'Organizational Chart', component: 'Organizational Chart' },
        { name: 'Presidential Support Staff', component: 'Presidential Support Staff' },
    ],
    'offices': [
        { name: 'Accounting Office', component: 'Accounting Office' },
        { name: 'Budget Office', component: 'Budget Office' },
        { name: 'Center of University Extension Services', component: 'Center of University Extension Services' },
        { name: 'General Services Office', component: 'General Services Office' },
        { name: 'Internal Audit Office', component: 'Internal Audit Office' },
        { name: 'Office of Graduate/Professional Studies', component: 'Office of Graduate/Professional Studies' },
        { name: 'Office of Guidance & Testing Services', component: 'Office of Guidance & Testing Services' },
        { name: 'Office of NSTP', component: 'Office of NSTP' },
        { name: 'Office of Student Development Services', component: 'Office of Student Development Services' },
        { name: 'Office of the University Legal Counsel', component: 'Office of the University Legal Counsel' },
        { name: 'Office of the University Registrar', component: 'Office of the University Registrar' },
        { name: 'Office of the University Secretary', component: 'Office of the University Secretary' },
        { name: 'Office of the VP for Research', component: 'Office of the VP for Research' },
        { name: 'Physical Facilities Management Office', component: 'Physical Facilities Management Office' },
        { name: 'Planning And Management Office', component: 'Planning And Management Office' },
        { name: 'PLM Law Center', component: 'PLM Law Center' },
        { name: 'Procurement Office', component: 'Procurement Office' },
        { name: 'Property & Supplies Office', component: 'Property & Supplies Office' },
        { name: 'Revenue Generation Office', component: 'Revenue Generation Office' },
        { name: 'University Health Services', component: 'University Health Services' },
        { name: 'University Library', component: 'University Library' },
        { name: 'University Research Center', component: 'University Research Center' },
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
    const items = sidebarData[routeKey] ?? [];

    const [selectedItem, setSelectedItem] = useState<string>(items[0]?.name || '');
    const [activeItem, setActiveItem] = useState<string>(items[0]?.name || '');

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
                    {SelectedComponent ? <SelectedComponent /> : <div>No content available</div>}
                </Suspense>
            </div>
        </div>
    )
}

export default AboutSidebar;  