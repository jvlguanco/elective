import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ParagraphWithNewlines = ({ text }: { text: string }) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;

    return (
        <p className="font-istok">
            {text.split('\n').map((line, index) => (
                <span key={index}>
                    {line.split(urlRegex).map((segment, subIndex) => {
                        if (urlRegex.test(segment)) {
                            return (
                                <a
                                    key={subIndex}
                                    href={segment}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 underline"
                                >
                                    {segment}
                                </a>
                            );
                        }
                        return <span key={subIndex}>{segment}</span>;
                    })}
                    <br />
                </span>
            ))}
        </p>
    );
};

const AdmissionTemplate = ({ id }: { id: string }) => {
    const [admissionData, setAdmissionData] = useState<{
        name: string,
        description: string;
        requirements: string;
        qualifications: string;
        process: string;
        status: string
    } | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAdmissionData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/admission/information/${id}`);
                setAdmissionData(response.data);
            } catch (err) {
                setError(err.response?.data?.error || "An error occurred");
            }
        };

        fetchAdmissionData();
    }, [id]);

    console.log(admissionData)

    if (error) {
        return (
            <div className="w-full pt-8 px-12">
                <p className="text-red-500 mt-4">{error}</p>
            </div>
        );
    }

    if (!admissionData) {
        return (
            <div className="w-full pt-8 px-12">
                <p className="text-gray-500 mt-4">Loading...</p>
            </div>
        );
    }

    return (
        <div className="w-full pt-8 px-12">
            <h1 className="pb-2 border-b-2 border-gray-400 font-inter font-semibold text-[32px] text-navy-blue flex items-center gap-2">
                {admissionData.name} : 
                <span 
                    className={`
                    ${admissionData.status.toLowerCase() === 'open' ? 'text-green-500' : 'text-red-500'}
                    `}
                >
                    {admissionData.status.toUpperCase()}
                </span>
            </h1>

            <div className="mt-4">
                <ParagraphWithNewlines text={admissionData.description} />
            </div>

            <h2 className="font-inter font-semibold text-[24px] text-navy-blue mt-8">
                Requirements
            </h2>

            <div className="mt-4">
                <ParagraphWithNewlines text={admissionData.requirements} />
            </div>

            <h2 className="font-inter font-semibold text-[24px] text-navy-blue mt-8">
                Qualification
            </h2>

            <div className="mt-4">
                <ParagraphWithNewlines text={admissionData.qualifications} />
            </div>

            <h2 className="font-inter font-semibold text-[24px] text-navy-blue mt-8">
                Process
            </h2>

            <div className="mt-4">
                <ParagraphWithNewlines text={admissionData.process} />
            </div>
        </div>
    );
};

export default AdmissionTemplate;
