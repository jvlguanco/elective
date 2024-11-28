import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const HeroEdit = () => {
    const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
    const [message, setMessage] = useState<string>('');
    const location = "HeroVideo"
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
          setSelectedVideo(e.target.files[0]);
        }
    };

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
    
        if (!selectedVideo) {
          setMessage('Please select a video file.');
          return;
        }
    
        const formData = new FormData();
        formData.append('video', selectedVideo);
        formData.append('location', location);
    
        try {
          const response = await axios.post(`${import.meta.env.VITE_API_ROOT}/home/hero-video`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
    
          setMessage('Video has been Uploaded');

          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
        } catch (error) {
          setMessage('Error uploading video');
          console.error(error);
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
            <form onSubmit={handleUpload} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Select Video</label>
                    <input
                        type="file"
                        accept="video/*"
                        ref={fileInputRef}
                        onChange={handleVideoChange}
                        className="mt-1 p-2 border rounded"
                    />
                </div>
   
                <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                Upload Video
                </button>
            </form>
        </div>
    );
}

export default HeroEdit