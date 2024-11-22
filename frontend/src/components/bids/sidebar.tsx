import React, { useState, useEffect, Suspense } from 'react';

interface SidebarItem {
    name: string;
    component: string;
}

const staticSidebarData: SidebarItem[] = [
    { name: 'Bid Items', component: 'bid_item' },
    { name: 'Annual Procurement Plan', component: 'procurement' },
    { name: 'Project Monitoring Report', component: 'report' },
    { name: 'Consolidated Updates of APP', component: 'updates' },
    { name: 'Competitive Bidding', component: 'bidding' },
];

const loadComponent = (componentName: string) => {
    return React.lazy(() =>
        import(`./${componentName}`).catch(() => ({
            default: () => <div>No content available</div>,
        }))
    );
};

const BidsSidebar = () => {
    const [selectedItem, setSelectedItem] = useState<string>(staticSidebarData[0]?.name || '');
    const [activeItem, setActiveItem] = useState<string>(staticSidebarData[0]?.name || '');

    const handleItemClick = (itemName: string) => {
        setActiveItem(itemName);
        setSelectedItem(itemName);
    };

    const selectedComponentName = staticSidebarData.find(item => item.name === selectedItem)?.component;
    const SelectedComponent = selectedComponentName ? loadComponent(selectedComponentName) : null;

    return (
        <div className="w-full flex">
            <div className="w-1/5 px-16 pt-8">
                <ul>
                    {staticSidebarData.map(item => (
                        <li
                            key={item.name}
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
                    {SelectedComponent ? <SelectedComponent /> : <div>No content available</div>}
                </Suspense>
            </div>
        </div>
    );
};

export default BidsSidebar;