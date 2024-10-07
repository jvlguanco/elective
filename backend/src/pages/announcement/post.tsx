import axios from 'axios';
import React, { useState } from 'react';

const PostAnnouncement = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [images, setImages] = useState<FileList | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (images.length === 0) return;

        const formData = new FormData();
        formData.append('title', title);
        formData.append('body', body);
        Array.from(images).forEach((file) => {
            formData.append('images', file);
        });

        try {
        const response = await axios.post('http://localhost:5000/facebook/post', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        console.log('Post created with ID:', response.data.postId);
        } catch (error) {
        console.error('Error creating post:', error);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setImages(e.target.files);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4">
        <div className="mb-4">
            <label className="block text-gray-700">Title</label>
            <input
            type="text"
            className="mt-1 block w-full border-gray-300"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            />
        </div>
        <div className="mb-4">
            <label className="block text-gray-700">Body Text</label>
            <textarea
            className="mt-1 block w-full border-gray-300"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            ></textarea>
        </div>
        <div className="mb-4">
            <label className="block text-gray-700">Images</label>
            <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            required
            />
        </div>
        <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
        >
            Submit
        </button>
        </form>
    );
}

export default PostAnnouncement