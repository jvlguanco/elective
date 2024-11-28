import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const AboutEdit = () => {
    const [content, setContent] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [photos, setPhotos] = useState<FileList | null>(null);
    const [filePaths, setFilePaths] = useState<string[]>([]);
    const location = "AboutCollage";
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_ROOT}/home/about`)
            .then(response => {
                setContent(response.data[0].message);
            })
            .catch(error => {
                console.error('There was an error fetching the paragraph!', error);
            });
    }, []);

    useEffect(() => {
        const fetchPhotos = async () => {
          try {
            const response = await fetch(`${import.meta.env.VITE_API_ROOT}/home/photos/${location}`);
            const data = await response.json();
            setFilePaths(data.map((item: { file_path: string }) => item.file_path));
          } catch (error) {
            console.error('Error fetching photos:', error);
          }
        };
    
        fetchPhotos();
    }, [location]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhotos(e.target.files);
    };

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (photos && photos.length == 4) {
          const formData = new FormData();
          for (let i = 0; i < photos.length; i++) {
            formData.append('photos', photos[i]);
          }
          formData.append('location', location);
    
          try {
            const res = await axios.post(
              `${import.meta.env.VITE_API_ROOT}/home/collection?maxFiles=${photos.length}`, 
              formData, 
              {
                headers: { 'Content-Type': 'multipart/form-data' }
              }
            );
            setMessage(res.data);

            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
          } catch (error) {
            setMessage('Failed to upload photos.');
          }
        } else {
          setMessage('Please select a total of 4 photos.');
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        axios.put(`${import.meta.env.VITE_API_ROOT}/home/about`, { content })
            .then(response => {
                setMessage('Paragraph updated successfully.');
            })
            .catch(error => {
                console.error('There was an error updating the paragraph!', error);
            });
    };

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);

        if (message) {
            setMessage('');
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
            <h2 className="text-2xl font-bold mb-4">Edit About Message at Home Page</h2>
            
            <form onSubmit={handleSubmit} className='mb-8'>
                <textarea
                    className="w-full h-56 p-2 border rounded mb-2 overflow-y-auto"
                    value={content}
                    onChange={handleContentChange}
                ></textarea>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700" 
                >
                    Update Paragraph
                </button>
            </form>

            <h1 className="text-2xl font-bold mb-2">Change Photo Collage in the About Section</h1>

            <div className='h-80 w-full flex gap-2'>
                {filePaths ? (
                    filePaths.map((photo, index) => (
                        <img
                          key={index}
                          src={`${import.meta.env.VITE_API_ROOT}/${photo}`}
                          alt={`Uploaded Photo ${index + 1}`}
                          className="w-1/4 h-full object-cover"
                        />
                    ))
                ) : (
                    <p>No file found</p>
                )}
            </div>

            <form onSubmit={handleUpload} className="flex flex-col mt-4">
                <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                ref={fileInputRef}
                className="mb-2"
                />
                <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded w-fit hover:bg-blue-700"
                >
                Upload
                </button>
            </form>
        </div>
    );
}

export default AboutEdit