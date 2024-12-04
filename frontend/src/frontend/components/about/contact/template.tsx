import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface DataItem {
    office_name?: string;
    college_name?: string;
    email: string;
    contact_number: string;
}

const Contact = ({ location }: { location: string }) => {
    const [data, setData] = useState<DataItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                if (location === 'PLM Colleges') {
                    const response = await axios.get(`${import.meta.env.VITE_API_ROOT}/about/college`);
                    const { active } = response.data;
                    setData(active);
                } else if (location === 'PLM Offices') {
                    const response = await axios.get(`${import.meta.env.VITE_API_ROOT}/office/information`);
                    setData(response.data);
                } else {
                    setData([]);
                }
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [location]);

    if (loading) {
        return (
            <div className="w-full flex justify-center items-center pt-8">
                <p className="text-gray-500 font-semibold">Loading data...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full flex justify-center items-center pt-8">
                <p className="text-red-500 font-semibold">{error}</p>
            </div>
        );
    }

    if (!data.length) {
        return (
            <div className="w-full flex justify-center items-center pt-8">
                <p className="text-gray-500 font-semibold">No data available</p>
            </div>
        );
    }

    return (
        <div className="w-full pt-8 px-4 md:pr-12 md:pl-0">
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 p-2 text-left text-sm md:text-base">Office</th>
                            <th className="border border-gray-300 p-2 text-left text-sm md:text-base">Email</th>
                            <th className="border border-gray-300 p-2 text-left text-sm md:text-base">Contact Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="border border-gray-300 p-2 text-sm md:text-base">
                                    {item.college_name || item.office_name}
                                </td>
                                <td className="border border-gray-300 p-2 text-sm md:text-base">
                                    {item.email}
                                </td>
                                <td className="border border-gray-300 p-2 text-sm md:text-base">
                                    {item.contact_number}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Contact;