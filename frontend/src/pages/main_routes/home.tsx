import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Carousel from "../../components/carousel";
import Compilation from "../../components/home/about/pictures";
import AboutText from "../../components/home/about/text";
import AnnouncementSection from "../../components/home/announcement";

const images = [
    './images/image3.jpg',
    './images/image3.jpg',
    './images/image3.jpg',
];

const Home = () => {
    const [image, setImage] = useState([]);

    useEffect(() => {
        axios
        .get('http://localhost:5000/image/background')
        .then((response) => {
            setImage(response.data);
        })
        .catch((error) => {
            console.error('Error fetching image:', error);
        });
    }, []);

    // const [images, setImages] = useState([]);

    // useEffect(() => {
    //     axios
    //     .get('http://localhost:5000/images/background')
    //     .then((response) => {
    //         setImages(response.data);
    //     })
    //     .catch((error) => {
    //         console.error('Error fetching images:', error);
    //     });
    // }, []);

    // console.log(image)

    return (
        <div>
            <div className="relative w-full h-screen overflow-hidden">
                {image && (
                    <img src={`data:image/*;base64,${image.data}`}alt="" className='h-full w-full object-cover absolute' />
                )}

                <div className="absolute top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 z-0"></div>

                <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-between z-10 pt-52 pb-28">
                    <div className="flex flex-col justify-center items-center gap-6">
                        <img src="./images/Logo.png" alt="" className="h-72 w-72"/>
                        <div className="flex items-center justify-center flex-col text-white gap-1">
                            <h1 className="text-2xl font-serif font-medium">PAMANTASAN NG LUNGSOD NG MAYNILA</h1>
                            <h2 className="text-lg font-light font-inter">University of the City of Manila</h2>
                            <h3 className="text-base font-thin font-inter">Karunungan, Kaunlaran at Kadakilaan</h3>
                        </div>
                    </div>

                    <div className="mb-12 bg-red-800 text-white px-4 py-2 rounded-full">
                        APPLY NOW
                    </div>
                </div>
            </div>
            
            <div className="flex w-full mt-10">
                <Compilation/>
                <AboutText/>
            </div>

            <div className="mt-10">
                <Carousel images={images}/>
            </div>

            <AnnouncementSection/>

            <div className="mt-10 w-full h-auto flex flex-col gap-4">
                <h1 className="font-inter text-[42px] font-semibold mx-24 w-full text-navy-blue">LANDMARKS</h1>

                <div className="flex gap-10 items-center justify-center px-24">
                    <iframe src="https://www.google.com/maps/embed?pb=!4v1726987774465!6m8!1m7!1sgRaZjA_TXvSYNLeSTxtIRA!2m2!1d14.58670864888668!2d120.977512992867!3f249.40135792217936!4f0.4094205764633614!5f0.7820865974627469" width="50%" height="450" loading="lazy"></iframe>

                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.2120588157472!2d120.97792359975215!3d14.58698902520677!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397ca2336770053%3A0x1b731714778d3506!2sPamantasan%20ng%20Lungsod%20ng%20Maynila!5e0!3m2!1sen!2sph!4v1726987523267!5m2!1sen!2sph" width="50%" height="450" loading="lazy"></iframe>
                </div>
            </div>
        </div>
    )
}

export default Home;