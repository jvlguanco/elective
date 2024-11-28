import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const OrganizationalChart = () => {
    const [chartPath, setChartPath] = useState<string | null>(null);
    const [message, setMessage] = useState<string>('');
    const [chartFile, setChartFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const location = "OrganizationalChart";

    useEffect(() => {
        const fetchChart = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/home/photos/${location}`);
                if (response.data[0]?.file_path) {
                    setChartPath(response.data[0].file_path);
                } else {
                    setChartPath(null);
                }
            } catch (error) {
                console.error('Error fetching organizational chart:', error);
                setChartPath(null);
            }
        };

        fetchChart();
    }, [location]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setChartFile(files[0]);
        }
    };

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();

        if (chartFile) {
            const formData = new FormData();
            formData.append('photos', chartFile);
            formData.append('location', location);

            try {
                const res = await axios.post(
                    `http://localhost:5000/home/collection?maxFiles=1`,
                    formData,
                    { headers: { 'Content-Type': 'multipart/form-data' } }
                );
                setMessage('Organizational chart uploaded successfully.');
                setChartPath(res.data.file_path);
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            } catch (error) {
                console.error('Failed to upload chart:', error);
                setMessage('Failed to upload organizational chart.');
            }
        } else {
            setMessage('Please select a chart file to upload.');
        }
    };

    useEffect(() => {
        if (message) {
            alert(message);
            setMessage('');
        }
    }, [message]);

    return (
        <div className="w-full flex flex-col">
            <h2 className="text-2xl font-bold mb-4">Edit Organizational Chart</h2>

            <div className="mb-8">
                {chartPath ? (
                    <img
                        src={`http://localhost:5000/${chartPath}`}
                        alt="Organizational Chart"
                        className="w-full h-[625px] object-contain border rounded"
                    />
                ) : (
                    <p>No organizational chart found</p>
                )}
            </div>

            <form onSubmit={handleUpload} className="flex flex-col">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    className="mb-2"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded w-fit hover:bg-blue-700"
                >
                    Upload Chart
                </button>
            </form>
        </div>
    );
};

export default OrganizationalChart;