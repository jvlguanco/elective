import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import AboutEdit from '../pages/home/about';
import HeroEdit from '../pages/home/hero';
import PostAnnouncement from '../pages/announcement/post';
import NormalPostTable from '../pages/announcement/normal';
import HighlightedPostTable from '../pages/announcement/highlighted';
import TimePostTable from '../pages/announcement/time';
import JobForm from '../pages/career/create';
import JobTable from '../pages/career/all_listing';

const routes = {
    '/': ['About Section', 'Hero Section'],
    '/about': ['Team', 'History', 'Mission'],
    '/academics': ['Programs', 'Courses', 'Faculty'],
    '/admissions': ['Apply', 'Deadlines', 'Fees'],
    '/announcement': ['Create Post', 'View Normal Post', 'View Highlighted Posts', 'View Time-Restricted Posts'],
    '/careers': ['Create Opening', 'Manage Openings']
};

const sidebarItemContent = {
    'About Section': <AboutEdit/>,
    'Hero Section': <HeroEdit/>,
    'Create Post': <PostAnnouncement/>,
    'View Normal Post': <NormalPostTable/>,
    'View Highlighted Posts': <HighlightedPostTable/>,
    'View Time-Restricted Posts' : <TimePostTable/>,
    'Create Opening': <JobForm/>,
     'Manage Openings': <JobTable/>,
};

const Sidebar = () => {
    const location = useLocation();
    const items = routes[location.pathname];

    const [selectedItem, setSelectedItem] = useState(items[0]);
    const [activeItem, setActiveItem] = useState(items[0]);

    useEffect(() => {
        const defaultItem = items[0];
        setSelectedItem(defaultItem);
        setActiveItem(defaultItem);
    }, [items]);

    const handleItemClick = (item: string) => {
        setActiveItem(item);
        setSelectedItem(item);
    };

    return (
        <div className='flex w-full'>
            <div className='w-1/6 h-screen-minus-82 border-r-2 border-black flex flex-col gap-12 px-12 py-8'>
                <ul>
                    {items.map(item => (
                        <li
                            key={item}
                            className={`p-4 cursor-pointer ${activeItem === item ? 'text-red-500 font-bold' : 'text-black'}`}
                            onClick={() => handleItemClick(item)}
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            </div>

            <div className='px-12 py-6 w-5/6'>
                {sidebarItemContent[selectedItem]}
            </div>
        </div>
    );
}

export default Sidebar