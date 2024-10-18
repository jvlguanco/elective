import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import VissionMission from './univ_profile/vission_mission';

const routes = {
    'profile': ['Vision/Mission', 'Seal and Symbols', 'PLM History', ' University Hymn'],
    'administration': ['Board of Regents', 'The President', 'Vice Presidents and Assistant Vice Presidents', 'Directors and Chiefs', 'Deans'],
};

const sidebarItemContent = {
    'profile': {
        'Vision/Mission': <VissionMission />,
        'Seal and Symbols': <div>Seal and Symbols Content</div>,
        'PLM History': <div>PLM History Content</div>,
        'University Hymn': <div>University Hymn Content</div>,
    },
    'administration': {
        'Board of Regents': <div>Board of Regents Content</div>,
        'The President': <div>The President Content</div>,
        'Vice Presidents and Assistant Vice Presidents': <div>Vice Presidents Content</div>,
        'Directors and Chiefs': <div>Directors and Chiefs Content</div>,
        'Deans': <div>Deans Content</div>,
    },
};

const AboutSidebar = () => { 
    const location = useLocation();
    const routeKey = location.pathname.split('/')[2] ?? 'profile';
    const items = routes[routeKey];

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

    const content = sidebarItemContent[routeKey]?.[selectedItem] || <div>No content available</div>;

    return(
        <div className='w-full flex'>
            <div className='w-1/5 px-16 pt-8'>
                <ul>
                    {items.map(item => (
                        <li
                            key={item}
                            className={`p-4  cursor-pointer ${activeItem === item ? 'text-yellow-600 font-bold border-yellow-600 border-l-4' : 'text-black border-l-2 hover:text-yellow-600'}`}
                            onClick={() => handleItemClick(item)}
                        >
                            {item} 
                        </li>
                    ))}
                </ul>
            </div>
    
            <div className="w-4/5">
                {content}
            </div>
        </div>
    )
}

export default AboutSidebar;  