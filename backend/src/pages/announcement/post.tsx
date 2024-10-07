import axios from 'axios';
import React, { useState } from 'react';

const PostAnnouncement = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [images, setImages] = useState<FileList | null>(null);
    const [postType, setPostType] = useState('Normal');
    const [endDate, setEndDate] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (images.length === 0) return;

        const formData = new FormData();
        formData.append('title', title);
        formData.append('body', body);
        formData.append('postType', postType);
        Array.from(images).forEach((file) => {
            formData.append('images', file);
        });

        if (postType === 'Time-Restricted') {
            formData.append('endDate', endDate);
        }

        setLoading(true); 

        try {
            const response = await axios.post('http://localhost:5000/facebook/post', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            console.log('Post created with ID:', response.data.postId);
        } catch (error) {
            console.error('Error creating post:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setImages(e.target.files);
    };

    const handlePostTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPostType(e.target.value);
    };

    return (
        <div className="w-full max-w-lg mx-auto bg-gray-200 shadow-lg rounded-lg p-6 relative">
            {loading && (
                <div className="absolute inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-10">
                    <div className="text-white text-lg font-semibold">Submitting...</div>
                </div>
            )}
            <h1 className='text-3xl font-bold text-gray-800 mb-6'>Create a Facebook Post</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="mb-4">
                    <label className="text-lg font-semibold text-gray-600 mb-2 block">Header of the Post</label>
                    <input
                        type="text"
                        className="mt-1 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="text-lg font-semibold text-gray-600 mb-2 block">Body Text</label>
                    <textarea
                        className="w-full h-40 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        required
                    ></textarea>
                </div>

                <div className="mb-4">
                    <label className="text-lg font-semibold text-gray-600 mb-2 block">Images</label>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleFileChange}
                        required
                        className="mt-1 w-full text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                </div>

                <div className="mb-4">
                    <label className="text-lg font-semibold text-gray-600 mb-2 block">Post Type</label>
                    <div className="flex space-x-6">
                        {['Normal', 'Highlighted', 'Time-Restricted'].map((type) => (
                            <label key={type} className="flex items-center space-x-2 text-gray-700 cursor-pointer">
                                <input
                                    type="radio"
                                    value={type}
                                    checked={postType === type}
                                    onChange={handlePostTypeChange}
                                    className="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                                />
                                <span className="text-lg">{type}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {postType === 'Time-Restricted' && (
                    <div className="mb-4">
                        <label className="text-lg font-semibold text-gray-600 mb-2 block">End Date</label>
                        <input
                            type="date"
                            className="mt-1 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            required={postType === 'Time-Restricted'}
                        />
                    </div>
                )}

                <button
                    type="submit"
                    className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg shadow-md font-semibold text-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    disabled={loading}
                >
                    {loading ? 'Submitting...' : 'Submit'}
                </button>
            </form>
        </div>
    );
}

export default PostAnnouncement