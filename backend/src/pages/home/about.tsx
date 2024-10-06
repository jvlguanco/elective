import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AboutEdit = () => {
    const [content, setContent] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [photos, setPhotos] = useState<FileList | null>(null);

    useEffect(() => {
        axios.get('http://localhost:5000/home/about')
            .then(response => {
                setContent(response.data[0].message);
            })
            .catch(error => {
                console.error('There was an error fetching the paragraph!', error);
            });
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhotos(e.target.files);
    };

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (photos && photos.length > 0) {
          const formData = new FormData();
          for (let i = 0; i < photos.length; i++) {
            formData.append('photos', photos[i]);
          }
          formData.append('location', 'AboutCollage');
    
          try {
            const res = await axios.post(
              `http://localhost:5000/home/collection?maxFiles=${photos.length}`, 
              formData, 
              {
                headers: { 'Content-Type': 'multipart/form-data' }
              }
            );
            setMessage(res.data);
          } catch (error) {
            setMessage('Failed to upload photos.');
          }
        } else {
          setMessage('Please select at least 1 photo.');
        }
    };

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

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
        // Reset the message when the user starts typing
        if (message) {
            setMessage('');
        }
    };

    return (
        <div className="w-full flex flex-col gap-6">
            <h2 className="text-2xl font-bold">Edit About Message at Home Page</h2>
            
            <form onSubmit={handleSubmit}>
                <textarea
                    className="w-full h-96 p-2 border rounded mb-4 overflow-y-auto"
                    value={content}
                    onChange={handleContentChange}
                ></textarea>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Update Paragraph
                </button>
            </form>

            {message && <p className="text-green-800 mb-4">{message}</p>}

            <h1 className="text-2xl font-bold mb-4">Upload Photos</h1>

            <form onSubmit={handleUpload} className="flex flex-col items-center">
                <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="mb-4"
                />
                <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                Upload
                </button>
            </form>
            {message && <p className="mt-4">{message}</p>}
        </div>
    );
}

export default AboutEdit