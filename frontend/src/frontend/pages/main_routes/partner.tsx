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

const Partners = ({location}) => {
    const [partnerData, setPartnerData] = useState({
        title: "",
        description: "",
        individuals: "",
        providers: "",
        how: "",
        who: "",
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPartner = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/other/partner`);
                setPartnerData(data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        fetchPartner();
    }, []);

    if (loading) return <p>Loading...</p>;

    return (
        <div className="w-full">
            <div className="relative w-full h-72">
                <img src="/images/background.jpg"  alt="" className="w-full h-full  object-cover object-[center_30%]"/>
                <div className="absolute top-0 left-0 w-full h-full bg-black opacity-65"></div>
                <span className="absolute bottom-10 left-24 font-inter text-white font-bold text-[36px] pl-9 border-l-4 border-yellow-500">
                    {location === 'partner' ? 
                        'PARTNERS' : location === 'scholarship' ?
                        'SCHOLARSHIP AND FINANCIAL AID' : 'UNKNOWN LOCATION'}
                </span>
            </div>

            <div className="px-12 py-6 flex flex-col gap-4">
                <p>
                PLM partners with foundations and generous individuals to provide poor but deserving students the fighting chance that they deserve. Depending on the partners, scholars receive monthly stipends, book allowances, and even a year-end bonus.
                </p>

                <h2 className="font-inter font-semibold text-[24px] text-navy-blue mt-4">
                    {partnerData.title}
                </h2>

                <p>
                    <ParagraphWithNewlines text={partnerData.description}/>
                </p>

                <h2 className="font-inter font-semibold text-[24px] text-navy-blue mt-4">
                    Scholarship Providers
                </h2>

                <p>
                    <ParagraphWithNewlines text={partnerData.providers}/>
                </p>

                <h2 className="font-inter font-semibold text-[24px] text-navy-blue mt-4">
                    Individual Sponsors/Providers
                </h2>

                <p>
                    <ParagraphWithNewlines text={partnerData.individuals}/>
                </p>

                <h2 className="font-inter font-semibold text-[24px] text-navy-blue mt-4">
                    Frequently Asked Questions (FAQs)
                </h2>

                <h3 className="font-inter font-semibold text-[20px] text-navy-blue mt-4">
                    How are scholars selected?
                </h3>

                <p>
                    The scholarship providers evaluate and approve applications based on the following requirements:
                </p>

                <p>
                    <ParagraphWithNewlines text={partnerData.how}/>
                </p>

                <h3 className="font-inter font-semibold text-[20px] text-navy-blue mt-4">
                    Who can become scholarship providers?
                </h3>

                <p>
                    <ParagraphWithNewlines text={partnerData.who}/>
                </p>
            </div>

        </div>
    )
}

export default Partners;