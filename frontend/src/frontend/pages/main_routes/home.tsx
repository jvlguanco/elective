import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Compilation from "../../components/home/about/pictures";
import AboutText from "../../components/home/about/text";
import AnnouncementSection from "../../components/home/announcement2";

const Home = () => {
    const [videos, setVideos] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_ROOT}/home/videos/HeroVideo`);
                setVideos(response.data.data);
            } catch (err) {
                setError('Failed to load videos.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchVideos();
    }, []);

    return (
            <div>
                {loading ? (
                <div className="flex justify-center items-center h-40">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
                    <span className="ml-4 text-blue-500 font-medium">Loading videos...</span>
                </div>
                ) : error ? (
                <p className="text-center text-red-500">{error}</p>
                ) : (
                <video
                    src={`${import.meta.env.VITE_API_ROOT}/${videos[0].file_path}`}
                    autoPlay
                    muted
                    loop
                    controls={false}
                    className="w-full h-[250px] sm:h-[610px] object-cover"
                ></video>
                )}

            <div className="flex flex-col sm:flex-row w-full mt-10">
                <Compilation />
                <AboutText />
            </div>

            <AnnouncementSection />

            <div className="mt-20 px-4 sm:px-12 w-full h-auto flex flex-col gap-4">
                <h1 className="font-inter text-[28px] sm:text-[42px] font-semibold w-full text-navy-blue text-left">
                    LANDMARKS
                </h1>

                <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 items-center justify-center">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!4v1726987774465!6m8!1m7!1sgRaZjA_TXvSYNLeSTxtIRA!2m2!1d14.58670864888668!2d120.977512992867!3f249.40135792217936!4f0.4094205764633614!5f0.7820865974627469"
                        className="w-full sm:w-1/2 h-[250px] sm:h-[450px] rounded-md"
                        loading="lazy"
                    ></iframe>

                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.2120588157472!2d120.97792359975215!3d14.58698902520677!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397ca2336770053%3A0x1b731714778d3506!2sPamantasan%20ng%20Lungsod%20ng%20Maynila!5e0!3m2!1sen!2sph!4v1726987523267!5m2!1sen!2sph"
                        className="w-full sm:w-1/2 h-[250px] sm:h-[450px] rounded-md"
                        loading="lazy"
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default Home;