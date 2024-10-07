import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import AboutEdit from '../pages/home/about';
import HeroEdit from '../pages/home/hero';
import PostAnnouncement from '../pages/announcement/post';

const routes = {
    '/': ['About', 'Hero'],
    '/about': ['Team', 'History', 'Mission'],
    '/academics': ['Programs', 'Courses', 'Faculty'],
    '/admissions': ['Apply', 'Deadlines', 'Fees'],
    '/announcement': ['Create Post', 'View Highlighted Posts', 'View Other Posts'],
};

const sidebarItemContent = {
    About: <AboutEdit/>,
    Hero: <HeroEdit/>,
    'Create Post': <PostAnnouncement/>
};

const Sidebar = () => {
    const location = useLocation();
    const items = routes[location.pathname];

    const [selectedItem, setSelectedItem] = useState(items[0]);
    const [activeItem, setActiveItem] = useState(items[0]);

    useEffect(() => {
        const defaultItem = routes[location.pathname][0];
        setSelectedItem(defaultItem);
        setActiveItem(defaultItem);
    }, [location.pathname]);

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
                            {item}{location.pathname != '/announcement' ? ' Section' : ''}
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