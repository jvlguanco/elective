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
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleItemClick = (itemName: string) => {
        setActiveItem(itemName);
        setSelectedItem(itemName);
        setDropdownOpen(false); // Close dropdown on selection
    };

    const SelectedComponent = staticSidebarData.find(item => item.name === selectedItem)?.component;

    const Sidebar = () => {
        if (staticSidebarData.length === 0) {
            return null; // No sidebar items, render nothing
        }

        return (
            <>
                {/* Mobile Sidebar */}
                <div className="md:hidden w-full p-4 border-b">
                    <button
                        onClick={() => setDropdownOpen(prev => !prev)}
                        className="w-full text-left p-2 bg-yellow-500 text-white rounded-md"
                    >
                        {selectedItem || 'Select an Option'}
                    </button>
                    {dropdownOpen && (
                        <ul className="mt-2 bg-white shadow-lg rounded-md">
                            {staticSidebarData.map(item => (
                                <li
                                    key={item.name}
                                    className={`p-4 cursor-pointer ${
                                        activeItem === item.name
                                            ? 'text-yellow-600 font-bold'
                                            : 'text-black hover:text-yellow-600'
                                    }`}
                                    onClick={() => handleItemClick(item.name)}
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
            </>
        );
    };

    const MainContent = () => {
        if (!SelectedComponent) {
            return (
                <div className="w-full flex justify-center items-center p-8">
                    <p className="text-gray-500 font-semibold">No content available for this section.</p>
                </div>
            );
        }

        return (
            <div className="w-full md:w-4/5">
                <Suspense fallback={<div>Loading...</div>}>
                    <SelectedComponent />
                </Suspense>
            </div>
        );
    };

    return (
        <div className="w-full flex flex-col md:flex-row">
            {Sidebar()}
            {MainContent()}
        </div>
    );
};

export default BidsSidebar;