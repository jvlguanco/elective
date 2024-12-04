import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SupportStaff = () => {
    const [activeMembers, setActiveMembers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_ROOT}/about/support-staff`);
                setActiveMembers(response.data.active);
            } catch (error) {
                console.error('Error fetching members:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchMembers();
    }, []);

    return (
        <div className="w-full pt-8 px-4 md:pr-12 md:pl-0">
            <h1 className="pb-2 border-b-2 border-gray-400 font-inter font-semibold text-[24px] md:text-[32px] text-navy-blue mb-4">
                PRESIDENTIAL SUPPORT STAFF
            </h1>

            {loading ? (
                <div className="flex justify-center items-center mt-12">
                    <p className="text-gray-500 font-semibold">Loading...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
                    {activeMembers.map((member) => (
                        <div key={member.id} className="flex flex-col items-center">
                            <img
                                src={`${import.meta.env.VITE_API_ROOT}/${member.image}` || "/images/temp.png"}
                                alt={`${member.name}`}
                                className="w-32 h-40 md:w-48 md:h-60 object-cover"
                            />
                            <p className="font-semibold mt-2 text-center">{member.name}</p>
                            <p className="text-gray-500 text-sm md:text-base text-center">{member.title}</p>
                            <p className="text-blue-500 text-sm md:text-base text-center">{member.email}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SupportStaff;