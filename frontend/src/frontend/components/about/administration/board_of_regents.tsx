import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BoardOfRegents = () => {
    const [activeMembers, setActiveMembers] = useState([]);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_ROOT}/about/board-of-regents`);
                setActiveMembers(response.data.active);
            } catch (error) {
                console.error('Error fetching members:', error);
            }
        };
        fetchMembers();
    }, []);

    return (
        <div className="w-full pt-8 px-4 md:pr-12 md:pl-0">
            <h1 className="pb-2 border-b-2 border-gray-400 font-inter font-semibold text-[24px] md:text-[32px] text-navy-blue">
                BOARD OF REGENTS
            </h1>

            <p className="mt-2 mb-4 text-sm md:text-base">
                The Board of Regents, the highest policy-making body of the university, sets and steers the direction of the university to fulfill its vision and mission.<br /><br />

                The Board presents a stellar lineup comprised of esteemed professionals in their respective fields. They bring with them expertise that would help PLM realize its goals.<br /><br />

                The Chairperson of the Board and the University President are elected from among the regents themselves. The Chairperson presides over all the meetings of the Board, while the University President serves as its ex-officio Vice-Chair.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-12">
                {activeMembers.map((member) => (
                    <div key={member.id} className="flex flex-col items-center">
                        <img
                            src={`${import.meta.env.VITE_API_ROOT}/${member.image}` || "/images/temp.png"}
                            alt={`${member.name}`}
                            className="w-32 h-32 md:w-4/6 md:h-4/5 object-cover"
                        />
                        <p className="font-semibold mt-2 text-center">{member.name}</p>
                        <p className="text-gray-500 text-sm text-center">{member.title}</p>
                    </div>
                ))}
            </div>

            <h2 className="font-inter font-semibold text-[20px] md:text-[24px] text-navy-blue mt-8">
                Composition
            </h2>

            <p className="mt-2 mb-4 text-sm md:text-base">
                The Board of Regents is a collegial body composed of seven (7) highly distinguished members, six (6) of whom are appointed by the Mayor of the city of Manila, with the consent of the then-Municipal Board, which is now the City Council of Manila. Of the six members appointed by the Mayor, the PLM Charter prescribes that one comes from the faculty, another is a distinguished alumnus, and one of the others from the field of education. The university regents are chosen on the basis of their professional competence. They are men of high and eminent integrity and distinguished professionals among the citizenry. The Division of City Schools (DCS) superintendent of Manila sits as an ex-officio member of the Board of Regents and becomes the 7th member of the Board.
            </p>

            <h2 className="font-inter font-semibold text-[20px] md:text-[24px] text-navy-blue mt-8">
                Term of Office
            </h2>

            <p className="mt-2 mb-4 text-sm md:text-base">
                Confirmed regential appointees automatically serve for a fixed term of six (6) years or until their successors shall have been appointed and qualified. They may therefore serve for more than 6 years on a hold-over capacity, provided no replacement shall have been qualified as of yet.<br /><br />
                In case an incumbent regent cannot finish his term of six years by reason of resignation, death or other incapacities, the vacancy shall be filled by an appointment by the Mayor of the City of Manila, with the consent of the City Council, and the appointee shall hold office for the unexpired portion of the term, instead of the fixed term of six (6) years.
            </p>
        </div>
    );
};

export default BoardOfRegents;