import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface OfficeItem {
    id: number;
    office_name: string;
    description: string;
    vision: string;
    mission: string;
    status: string;
    org_chart: string;
    email: string;
    contact_number: string;
}

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

const Offices = ({ id }: { id: number }) => {
    const [officeItem, setOfficeItem] = useState<OfficeItem | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOffice = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/office/information`, {
                    params: { id },
                });
                if (response.data.length > 0) {
                    setOfficeItem(response.data[0]);
                }
            } catch (error) {
                console.error('Error fetching office data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOffice();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!officeItem) {
        return <div>No office found for this ID.</div>;
    }

    return(
        <div className="w-full pt-8 pr-12">
            <div>
                {officeItem.org_chart ? (
                    <img
                        src={`http://localhost:5000/${officeItem.org_chart}`}
                        alt="Organizational Chart"
                        className="w-full h-[600px] object-contain border rounded"
                    />
                ) : (
                    <p>No organizational chart found</p>
                )}
            </div>

            <h1 className="pb-2 border-b-2 border-gray-400 font-inter font-semibold text-[32px] text-navy-blue my-4 uppercase">
                {officeItem.office_name}
            </h1>

            <ParagraphWithNewlines text={officeItem?.description || "No description available"} />

            <h2 className="font-inter font-semibold text-[24px] text-navy-blue mt-8">
                Mission
            </h2>

            <ParagraphWithNewlines text={officeItem?.mission || "No mission available"} />

            <h2 className="font-inter font-semibold text-[24px] text-navy-blue mt-8">
                Vision
            </h2>

            <ParagraphWithNewlines text={officeItem?.vision || "No vision available"} />

        </div>
    )
}

export default Offices;  