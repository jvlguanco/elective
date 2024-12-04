import { useState, useEffect } from 'react';
import axios from 'axios';

const ParagraphWithNewlines = ({ text }: { text: string }) => {
    return (
        <p className="font-istok">
            {text.split('\n').map((line, index) => (
                <span key={index}>
                    {line}
                    <br />
                </span>
            ))}
        </p>
    );
};

const Partners = ({ location }: { location: string }) => {
    const [partnerData, setPartnerData] = useState({
        title: '',
        description: '',
        individuals: '',
        providers: '',
        how: '',
        who: '',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchPartner = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_API_ROOT}/other/partner`);
                setPartnerData(data);
            } catch (err) {
                console.error(err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        fetchPartner();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-72">
                <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-72">
                <p className="text-red-500">Failed to load data. Please try again later.</p>
            </div>
        );
    }

    return (
        <div className="w-full">
            {/* Background Section */}
            <div className="relative w-full h-72 md:h-96">
                <img
                    src="/images/background.jpg"
                    alt="Background"
                    className="w-full h-full object-cover object-[center_30%]"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-65"></div>
                <span
                    className="absolute bottom-4 left-6 md:bottom-10 md:left-24 font-inter text-white font-bold text-[24px] md:text-[36px] pl-4 md:pl-9 border-l-4 border-yellow-500"
                >
                    {location === 'partner'
                        ? 'PARTNERS'
                        : location === 'scholarship'
                        ? 'SCHOLARSHIP AND FINANCIAL AID'
                        : 'UNKNOWN LOCATION'}
                </span>
            </div>

            {/* Content Section */}
            <div className="px-6 md:px-12 py-6 flex flex-col gap-4">
                <p className="text-sm md:text-base">
                    PLM partners with foundations and generous individuals to provide poor but deserving
                    students the fighting chance that they deserve. Depending on the partners, scholars receive
                    monthly stipends, book allowances, and even a year-end bonus.
                </p>

                {/* Render Sections Dynamically */}
                {[
                    { title: partnerData.title, content: partnerData.description },
                    { title: 'Scholarship Providers', content: partnerData.providers },
                    { title: 'Individual Sponsors/Providers', content: partnerData.individuals },
                ].map((section, index) => (
                    <div key={index}>
                        <h2 className="font-inter font-semibold text-[20px] md:text-[24px] text-navy-blue mt-4">
                            {section.title}
                        </h2>
                        <ParagraphWithNewlines text={section.content} />
                    </div>
                ))}

                {/* FAQs Section */}
                <div className="mt-4">
                    <h2 className="font-inter font-semibold text-[24px] text-navy-blue">
                        Frequently Asked Questions (FAQs)
                    </h2>

                    <h3 className="font-inter font-semibold text-[20px] text-navy-blue mt-4">
                        How are scholars selected?
                    </h3>
                    <p>The scholarship providers evaluate and approve applications based on the following requirements:</p>
                    <ParagraphWithNewlines text={partnerData.how} />

                    <h3 className="font-inter font-semibold text-[20px] text-navy-blue mt-4">
                        Who can become scholarship providers?
                    </h3>
                    <ParagraphWithNewlines text={partnerData.who} />
                </div>
            </div>
        </div>
    );
};

export default Partners;