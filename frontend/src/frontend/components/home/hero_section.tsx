import { useState, useEffect } from 'react';
import axios from 'axios';

const Hero = () => {
    const [image, setImage] = useState([]);

    useEffect(() => {
        axios
        .get(`${import.meta.env.VITE_API_ROOT}/image/background`)
        .then((response) => {
            setImage(response.data);
        })
        .catch((error) => {
            console.error('Error fetching image:', error);
        });
    }, []);

    return(
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
    )
}

export default Hero;