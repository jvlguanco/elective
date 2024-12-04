import { Email, Facebook, Instagram, Place } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';

const Footer = () => {
    return (
        <div className="w-full bg-red-700 text-white px-4 py-6 flex flex-col md:flex-row mt-10 gap-8">
            {/* Logo and University Info */}
            <div className="md:w-1/3 flex flex-col items-center md:items-start">
                <div className="flex justify-center gap-6 mb-4">
                    <img src="/images/Logo.png" alt="Logo" className="h-20 w-20" />
                    <img src="/images/haribon.png" alt="Logo" className="h-20 w-20" />
                    <img src="/images/bagong_pilipinas.png" alt="Logo" className="h-20 w-20" />
                </div>
                <div className="text-center md:text-left">
                    <h1 className="font-serif text-lg font-semibold">
                        PAMANTASAN NG LUNGSOD NG MAYNILA
                    </h1>
                    <h3 className="text-sm">University of the City of Manila</h3>
                </div>
                <div className="flex justify-center md:justify-start gap-4 mt-4">
                    <Email className="cursor-pointer" style={{ fontSize: 24, color: 'white' }} />
                    <Facebook className="cursor-pointer" style={{ fontSize: 24, color: 'white' }} />
                    <Instagram className="cursor-pointer" style={{ fontSize: 24, color: 'white' }} />
                </div>
            </div>

            {/* Contact Information */}
            <div className="md:w-1/3 flex flex-col items-center md:items-start text-center md:text-left">
                <p className="mb-4">For more information, you may contact us at:</p>
                <div className="flex items-center gap-4 mb-2">
                    <Place style={{ fontSize: 28, color: 'white' }} />
                    <p>
                        <b>Address:</b> Gen. Luna Cor. Muralla Streets, Intramuros Manila, Philippines
                        1002
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <Email style={{ fontSize: 28, color: 'white' }} />
                    <p>
                        <b>Email:</b> plmwebsite@plm.edu.ph
                    </p>
                </div>
                <div className="mt-6">
                    <h1>© 2024 PLM, All rights reserved.</h1>
                </div>
            </div>

            {/* Links Section */}
            <div className="md:w-1/3 flex flex-col items-center md:items-start">
                <h1 className="font-inter font-semibold mb-4">Other Links:</h1>
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                        <NavLink to="/careers" className="hover:underline">
                            Careers
                        </NavLink>
                        <NavLink to="/bids-and-awards" className="hover:underline">
                            Bids and Awards
                        </NavLink>
                        <NavLink to="/downloads" className="hover:underline">
                            Downloads
                        </NavLink>
                    </div>
                    <div className="flex flex-col gap-2">
                        <a
                            href="https://library.plm.edu.ph/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                        >
                            Online Public Access Catalog
                        </a>
                        <NavLink to="/privacy" className="hover:underline">
                            Privacy Policy
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;