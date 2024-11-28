import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManagementCommittee = () => {
    const [activeMembers, setActiveMembers] = useState([]);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/about/management-committee');
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
        <div className="w-full pt-8 pr-12">
            <h1 className="pb-2 border-b-2 border-gray-400 font-inter font-semibold text-[32px] text-navy-blue mb-4">
                MANAGEMENT COMMITTEE
            </h1>

            {loading ? (
                <div className="flex justify-center items-center mt-12">
                    <p className="text-gray-500 font-semibold">Loading...</p>
                </div>
            ) : (
                <div className="grid grid-cols-3 gap-6 mt-12">
                    {activeMembers.map((member) => (
                        <div key={member.id} className="flex flex-col items-center">
                            <img
                                src={`http://localhost:5000/${member.image}` || "/images/temp.png"}
                                alt={`${member.name}`}
                                className="w-4/6 h-4/5 object-cover"
                            />
                            <p className="font-semibold mt-2">{member.name}</p>
                            <p className="text-gray-500 text-center">{member.title}</p>
                            <p className="text-blue-500 ">{member.email}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ManagementCommittee;