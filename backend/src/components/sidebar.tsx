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
import BoardOfRegents from '../pages/administration/board';
import Presidents from '../pages/administration/president';
import ManagementCommittee from '../pages/administration/committee';
import DirectorsAndChiefs from '../pages/administration/director';
import Colleges from '../pages/academics/colleges';

const routes = {
    admin: {
        '/': ['About Section', 'Hero Section'],
        '/about': ['Board of Regents Member' , 'President', 'Management Committee', 'Directors and Chiefs', 'Offices', 'Contact'],
        '/academics': ['Colleges', 'Office of Graduate and Professional Studies', 'Academic Calendar', 'Outcome-Based Education'],
        '/admissions': ['PLMAT', 'CMAT', 'CLAT'],
        '/announcement': ['Create Post', 'View Normal Post', 'View Highlighted Posts', 'View Time-Restricted Posts'],
        '/others': ['Create Opening', 'Manage Openings', 'Create Bids', 'Create']
    },

    others: {
        '/': ['About Section', 'Hero Section'],
        '/about': ['Board of Regents Member' , 'President', 'Management Committee', 'Directors and Chiefs', 'Deans', 'Offices', 'Contact'],
        '/academics': ['Colleges', 'Office of Graduate and Professional Studies', 'Academic Calendar', 'Outcome-Based Education'],
        '/admissions': ['PLMAT', 'CMAT', 'CLAT'],
        '/announcement': ['Create Post', 'View Normal Post', 'View Highlighted Posts', 'View Time-Restricted Posts'],
    },

    career: {
        '/': ['Create Opening', 'Manage Openings']
    },

    bid_awards: {
        '/': ['About Section', 'Hero Section'],
    },

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
    'Board of Regents Member': <BoardOfRegents/>,
    'President': <Presidents/>,
    'Management Committee': <ManagementCommittee/>,
    'Directors and Chiefs': <DirectorsAndChiefs/>,
    'Colleges': <Colleges/>
};

const Sidebar = ({role}) => {
    const location = useLocation();
    const items = routes[role]?.[location.pathname];

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