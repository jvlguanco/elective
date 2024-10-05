import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AboutEdit = () => {
    const [content, setContent] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    useEffect(() => {
        axios.get('http://localhost:5000/home/about')
            .then(response => {
                setContent(response.data[0].message);
            })
            .catch(error => {
                console.error('There was an error fetching the paragraph!', error);
            });
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        axios.put('http://localhost:5000/home/about', { content })
            .then(response => {
                setMessage('Paragraph updated successfully.');
            })
            .catch(error => {
                console.error('There was an error updating the paragraph!', error);
            });
    };

    return (
        <div className="w-full flex flex-col gap-6">
            <h2 className="text-2xl font-bold">Edit About Message at Home Page</h2>
            
            <form onSubmit={handleSubmit}>
                <textarea
                    className="w-full h-96 p-2 border rounded mb-4 overflow-y-auto"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Update Paragraph
                </button>
            </form>

            {message && <p className="text-green-800 mb-4">{message}</p>}
        </div>
    );
}

export default AboutEdit