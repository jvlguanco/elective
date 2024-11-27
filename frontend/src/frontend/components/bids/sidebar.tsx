import React, { useState, Suspense } from 'react';
import BidItem from './bid_item';
import Procurement from './procurement';
import Report from './report';
import Updates from './updates';
import Bidding from './bidding';

interface SidebarItem {
    name: string;
    component: React.ComponentType;
}

const staticSidebarData: SidebarItem[] = [
    { name: 'Bid Items', component: BidItem },
    { name: 'Annual Procurement Plan', component: Procurement },
    { name: 'Project Monitoring Report', component: Report },
    { name: 'Consolidated Updates of APP', component: Updates },
    { name: 'Competitive Bidding', component: Bidding },
];

const BidsSidebar = () => {
    const [selectedItem, setSelectedItem] = useState<string>(staticSidebarData[0]?.name || '');
    const [activeItem, setActiveItem] = useState<string>(staticSidebarData[0]?.name || '');

    const handleItemClick = (itemName: string) => {
        setActiveItem(itemName);
        setSelectedItem(itemName);
    };

    const SelectedComponent = staticSidebarData.find(item => item.name === selectedItem)?.component;

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
