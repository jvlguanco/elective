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
        return <div>Loading data...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!data.length) {
        return <div>No data available</div>;
    }

    return (
        <div className="w-full pt-8 pr-12">
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th className="border border-gray-300 p-2">Office</th>
                        <th className="border border-gray-300 p-2">Email</th>
                        <th className="border border-gray-300 p-2">Contact Number</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td className="border border-gray-300 p-2">
                                {item.college_name || item.office_name}
                            </td>
                            <td className="border border-gray-300 p-2">{item.email}</td>
                            <td className="border border-gray-300 p-2">{item.contact_number}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Contact;