import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ParagraphWithNewlines = ({ text }: { text: string }) => {
    return (
        <p className="font-istok text-sm sm:text-base">
            {text.split('\n').map((line, index) => (
                <span key={index}>
                    {line}
                    <br />
                </span>
            ))}
        </p>
    );
};

const AboutText = () => {
    const [data, setData] = useState<string>('');

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_ROOT}/home/about`)
            .then((response) => {
                setData(response.data[0]['message']);
            })
            .catch((error) => {
                console.error('There was an error fetching data!', error);
                setData(
                    'Pamantasan ng Lungsod ng Maynila (PLM) is the first and only chartered and autonomous university funded by a city government. It was created by the Congress of the Philippines by virtue of Republic Act No. 4196 or “An Act Authorizing the City of Manila to Establish and Operate the University of City of Manila” on June 19, 1965\n\nThe university first opened its gates on July 17, 1967 to 556 first-year students at its campus in the historic Intramuros district, which served as the seat of power during the Spanish occupation. Currently, about 10,000 graduate and post-graduate students grace its halls to receive PLM’s quality education.'
                );
            });
    }, []);

    return (
        <div className="w-full sm:w-1/2 h-auto sm:h-[550px] px-4 sm:px-10 py-4 flex flex-col gap-4">
            <h1 className="font-inter text-[28px] sm:text-[42px] font-semibold">
                About the University
            </h1>

            <ParagraphWithNewlines text={data} />

            <button className="bg-navy-blue px-4 py-2 rounded-full text-sm sm:text-base font-inter font-semibold text-yellow-500">
                Read More
            </button>
        </div>
    );
};

export default AboutText;