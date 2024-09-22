import { Email, Facebook, Instagram, Place, PrivacyTip } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';

const Footer = () => {
    return (
      <div className='w-full bg-red-700 text-white px-2 py-4 flex mt-10 gap-4'>
        <div className='w-1/3 flex flex-col'>
            <div className='w-full flex gap-2'>
                <div className='w-1/4 flex justify-end'>
                    <img src="./images/Logo.png" alt="Logo" className="h-20 w-20" />
                </div>
                
                <div className='w-2/3 flex flex-col gap-1 justify-center'>
                    <h1 className={`font-serif text-lg font-semibold`}>PAMANTASAN NG LUNGSOD NG MAYNILA</h1>
                    <h3 className={`text-sm`}>University of the City of Manila</h3>
                </div>
            </div>

            <div className='w-full flex gap-2'>
                <div className='w-1/4'></div>
                
                <div className='w-2/3 flex flex-col gap-1 justify-center'>
                    <h1 className=''>© 2024 PLM, All rights reserved.</h1>
                </div>
            </div>

            <div className='w-full flex gap-2 mt-2'>
                <div className='w-1/4'></div>
                
                <div className='w-2/3 flex gap-4'>
                    <Email style={{ fontSize: 22, color: 'white' }}/>
                    <Facebook style={{ fontSize: 22, color: 'white' }}/>
                    <Instagram style={{ fontSize: 22, color: 'white' }}/>
                </div>
            </div>
        </div>

        <div className='w-1/3 flex flex-col gap-4'>
            <div className="flex gap-4">
                <Place style={{ fontSize: 28, color: 'white' }}/>
                <p>Gen. Luna Cor. Muralla St. Intramurous, Manila</p>
            </div>

            <div className="flex gap-4">
                <Email style={{ fontSize: 28, color: 'white' }}/>
                <p>plmwebsite@plm.edu.ph</p>
            </div>

            <div className="flex gap-4">
                <PrivacyTip style={{ fontSize: 28, color: 'white' }}/>
                <p>Privacy Policy</p>
            </div>
        </div>

        <div className='w-1/3 flex flex-col gap-4'>
            <h1 className='font-inter font-semibold'>Other Links:</h1>

            <div className='flex flex-col gap-1'>
                <NavLink to="/careers">
                    Careers
                </NavLink>

                <NavLink to="/bids-and-awards">
                    Bids and Awards
                </NavLink>

                <NavLink to="/downloads">
                    Downloads
                </NavLink>

                <NavLink to="/catalog">
                    Online Public Access Catalog
                </NavLink>
            </div>

        </div>
      </div>
    );
  };
  
  export default Footer;