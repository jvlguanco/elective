import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ParagraphWithNewlines = ({ text }: { text: string }) => {
    return (
        <p className="font-istok">
            {text.split('\n').map((line, index) => (
                <span key={index}>
                    {line}
                    <br />
                </span>
            ))}
        </p>
    );
};

const President = () => {
    const [activePresident, setActivePresident] = useState(null); // Use null for initial state
    const [inactivePresident, setInactivePresident] = useState([]); 
    const [isLoading, setIsLoading] = useState(true); // Add loading state
    const [error, setError] = useState(null); // Add error state

    useEffect(() => {
        const fetchPresident = async () => {
            try {
                const response = await axios.get('http://localhost:5000/about/presidents');
                setActivePresident(response.data.activePresident);
                setInactivePresident(response.data.formerPresidents);
            } catch (error) {
                console.error('Error fetching members:', error);
                setError('Failed to fetch president data.');
            } finally {
                setIsLoading(false); // Ensure loading state is updated
            }
        };
        fetchPresident();
    }, []);

    if (isLoading) {
        return (
            <div className="w-full pt-8 pr-12 text-center">
                <h1 className="text-gray-500 font-inter text-[24px]">Loading...</h1>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full pt-8 pr-12 text-center">
                <h1 className="text-red-500 font-inter text-[24px]">{error}</h1>
            </div>
        );
    }

    return (
        <div className="w-full pt-8 pr-12">
            <h1 className="pb-2 border-b-2 border-gray-400 font-inter font-semibold text-[32px] text-navy-blue">
                The President
            </h1>
            
            <img
                src={`http://localhost:5000/${activePresident?.image || "/images/temp.png"}`}
                alt={activePresident?.name || "Default President"}
                className="w-80 h-96 object-cover mt-6"
            />

            <div className='mt-4 border-b-2 border-gray-400 pb-6'>
                <ParagraphWithNewlines text={activePresident?.description || "No description available"} />
            </div>
            
            <h2 className="font-inter font-semibold text-[24px] text-navy-blue mt-2">
                Past University Presidents
            </h2>

            <div className="grid grid-cols-3 gap-6 mt-12">
                {inactivePresident.map((president) => (
                    <div key={president.id} className="flex flex-col items-center">
                        <img src={`http://localhost:5000/${president.image}` || "/images/temp.png"} alt={`${president.name}`} className="w-4/6 h-4/5 object-cover" />
                        <p className="font-semibold mt-2">{president.name}</p>
                    </div>
                ))}
            </div>
            
        </div>
    );
};

export default President;