import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import LatestAnnouncements from '../../components/announcement/latest';

const display = {
    Latest: <LatestAnnouncements/>,
    Highlighted: <div>Highlighted Announcements</div>,
    Special: <div>Special Announcements</div>,
}

const Announcement = () => {
    const [hasTimePost, setHasTimePost] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    var navTitles = ['Latest', 'Highlighted', 'Special'];
    const [selectedItem, setSelectedItem] = useState(navTitles[0]);

    const checkSpecialPost = () => {
        setIsLoading(true);
        axios.get('http://localhost:5000/announcement/check-time-post')
            .then((response) => {
                setHasTimePost(response.data.success);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching post IDs:', error);
                setIsLoading(false);
            });
    };

    useEffect(() => {
        checkSpecialPost();
    }, []);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p>Loading...</p>
            </div>
        );
    }

    if(!hasTimePost)
    {
        navTitles = ['Latest', 'Highlighted'];
        setSelectedItem(navTitles[0]);
    }

    return (
        <div className="flex w-full flex-col">
            <div className="mt-4 w-full h-fit px-96 py-4 flex justify-evenly items-center">
                {navTitles.map((item, index) => (
                    <span
                        key={index}
                        onClick={() => setSelectedItem(item)}
                        className={`px-4 py-2 cursor-pointer transition-colors duration-300 font-inter font-semibold ${
                            selectedItem === item
                                ? 'text-red-600 border-b-2 border-red-500'
                                : 'text-gray-800 hover:text-red-500'
                        }`}
                    >
                        {item} Announcements
                    </span>
                ))}
            </div>

            <div className="mt-8">
                {display[selectedItem]}
            </div>
        </div>
    )
}

export default Announcement;