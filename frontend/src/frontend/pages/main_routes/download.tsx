import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Download {
    id: number;
    title: string;
    section: string;
    file_path: string;
}

const Download = () => {
    const [downloads, setDownloads] = useState<Download[]>([]);
    const [sections, setSections] = useState<{ label: string; value: string }[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchDownloads = async () => {
        setLoading(true);
        try {
            const res = await axios.get('http://localhost:5000/other/downloads');
            setDownloads(res.data);
        } catch (err) {
            console.error(err);
            alert('Error fetching downloads');
        } finally {
            setLoading(false);
        }
    };

    const fetchSections = async () => {
        try {
            const res = await axios.get('http://localhost:5000/other/sections');
            setSections(
                res.data.map((section: { section: string }) => ({
                    label: section.section,
                    value: section.section,
                }))
            );
        } catch (err) {
            console.error(err);
            alert('Error fetching sections');
        }
    };

    useEffect(() => {
        fetchDownloads();
        fetchSections();
    }, []);

    const groupBySection = (downloads: Download[]) => {
        return downloads.reduce((acc: Record<string, Download[]>, download) => {
            if (!acc[download.section]) {
                acc[download.section] = [];
            }
            acc[download.section].push(download);
            return acc;
        }, {});
    };

    const groupedDownloads = groupBySection(downloads);

    return (
        <div className="w-full pt-8 px-12">
            <h1 className="pb-2 border-b-2 border-gray-400 font-inter font-semibold text-[32px] text-navy-blue">
                Downloads
            </h1>

            {loading ? (
                <p className="text-center mt-4">Loading...</p>
            ) : (
                sections.map((section) => (
                    <div key={section.value} className="mt-8">
                        <h2 className="font-inter font-semibold text-[24px] text-navy-blue">
                            {section.label}
                        </h2>
                        <table className="w-full mt-4 table-fixed border-collapse border border-gray-300">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="w-3/4 border border-gray-300 px-4 py-2 text-left text-navy-blue font-semibold">
                                        Title
                                    </th>
                                    <th className="w-1/4 border border-gray-300 px-4 py-2 text-left text-navy-blue font-semibold">
                                        Download Link
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {groupedDownloads[section.value]?.map((download) => (
                                    <tr key={download.id} className="hover:bg-gray-100">
                                        <td className="border border-gray-300 px-4 py-2">
                                            {download.title}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            <a
                                                href={download.file_path}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 underline"
                                            >
                                                Download
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                                {groupedDownloads[section.value]?.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={2}
                                            className="border border-gray-300 px-4 py-2 text-center text-gray-500"
                                        >
                                            No downloads available.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                ))
            )}
        </div>
    );
};

export default Download;