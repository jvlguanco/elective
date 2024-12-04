import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LatestAnnouncements from '../../components/announcement/latest';
import HighlightedAnnouncements from '../../components/announcement/highlight';
import TimeAnnouncements from '../../components/announcement/special';

const display = {
    Latest: <LatestAnnouncements />,
    Highlighted: <HighlightedAnnouncements />,
    Special: <TimeAnnouncements />,
};

const Announcement = () => {
    const [hasTimePost, setHasTimePost] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [navTitles, setNavTitles] = useState(['Latest', 'Highlighted', 'Special']);
    const [selectedItem, setSelectedItem] = useState(navTitles[0]);

    const checkSpecialPost = () => {
        setIsLoading(true);
        axios
            .get(`${import.meta.env.VITE_API_ROOT}/announcement/check-time-post`)
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

    useEffect(() => {
        if (!hasTimePost) {
            setNavTitles(['Latest', 'Highlighted']);
            setSelectedItem('Latest');
        } else {
            setNavTitles(['Latest', 'Highlighted', 'Special']);
        }
    }, [hasTimePost]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col w-full">
            <div className="mt-4 w-full px-4 md:px-24 lg:px-96 py-4 flex flex-col md:flex-row justify-evenly items-center">
                <div className="md:hidden w-full">
                    <select
                        value={selectedItem}
                        onChange={(e) => setSelectedItem(e.target.value)}
                        className="w-full p-2 border rounded-md bg-white text-gray-800"
                    >
                        {navTitles.map((item, index) => (
                            <option key={index} value={item}>
                                {item} Announcements
                            </option>
                        ))}
                    </select>
                </div>

                <div className="hidden md:flex w-full justify-evenly">
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
            </div>

            <div className="mt-8 px-4 md:px-24 lg:px-96">{display[selectedItem]}</div>
        </div>
    );
};

export default Announcement;