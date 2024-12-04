import { Email, Facebook, Instagram, Place } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';

const Footer = () => {
    return (
        <div className="w-full bg-red-700 text-white px-4 py-6 flex flex-wrap gap-6 mt-10">
            {/* Left Section */}
            <div className="w-full md:w-1/3 flex flex-col items-center md:items-start">
                <div className="flex gap-6 justify-center md:justify-start items-center mb-4">
                    <img src="/images/Logo.png" alt="Logo" className="h-16 w-16 md:h-20 md:w-20" />
                    <img src="/images/haribon.png" alt="Logo" className="h-16 w-16 md:h-20 md:w-20" />
                    <img src="/images/bagong_pilipinas.png" alt="Logo" className="h-16 w-16 md:h-20 md:w-20" />
                </div>

                <div className="text-center md:text-left">
                    <h1 className="font-serif text-lg font-semibold">PAMANTASAN NG LUNGSOD NG MAYNILA</h1>
                    <h3 className="text-sm">University of the City of Manila</h3>
                </div>

                <div className="flex gap-4 mt-4 justify-center md:justify-start">
                    <Email style={{ fontSize: 22, color: 'white' }} />
                    <Facebook style={{ fontSize: 22, color: 'white' }} />
                    <Instagram style={{ fontSize: 22, color: 'white' }} />
                </div>
            </div>

            {/* Middle Section */}
            <div className="w-full md:w-1/3 flex flex-col gap-4 items-center md:items-start">
                <p className="text-center md:text-left">For more information, you may contact us at:</p>

                <div className="flex gap-4 items-center">
                    <Place style={{ fontSize: 28, color: 'white' }} />
                    <p>
                        <b>Address:</b> Gen. Luna Cor. Muralla Streets, Intramurous Manila, Philippines 1002
                    </p>
                </div>

                <div className="flex gap-4 items-center">
                    <Email style={{ fontSize: 28, color: 'white' }} />
                    <p>
                        <b>Email:</b> plmwebsite@plm.edu.ph
                    </p>
                </div>

                <div className="w-full text-center md:text-left mt-4">
                    <h1>© 2024 PLM, All rights reserved.</h1>
                </div>
            </div>

            {/* Right Section */}
            <div className="w-full md:w-1/3 flex flex-col gap-4 items-center md:items-start">
                <h1 className="font-inter font-semibold text-center md:text-left">Other Links:</h1>

                <div className="flex flex-wrap justify-center md:justify-start gap-10">
                    <div className="flex flex-col gap-2">
                        <NavLink to="/careers">Careers</NavLink>
                        <NavLink to="/bids-and-awards">Bids and Awards</NavLink>
                        <NavLink to="/downloads">Downloads</NavLink>
                    </div>

                    <div className="flex flex-col gap-2">
                        <a
                            href="https://library.plm.edu.ph/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Online Public Access Catalog
                        </a>
                        <NavLink to="/privacy">Privacy Policy</NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
