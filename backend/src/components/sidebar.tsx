import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className='w-1/6 h-screen-minus-82 border-r-2 border-black flex flex-col gap-12 px-12 py-8'>
             <NavLink to="/" className={({ isActive }) => (isActive ? 'text-red-500 font-bold' : 'text-black')} end>
                About Section
            </NavLink>

            {/* <NavLink to="/home" className={({ isActive }) => (isActive ? 'text-red-500 font-bold' : 'text-black')} end>
                Home
            </NavLink>

            <NavLink to="/" className={({ isActive }) => (isActive ? 'text-red-500 font-bold' : 'text-black')} end>
                Home
            </NavLink>

            <NavLink to="/" className={({ isActive }) => (isActive ? 'text-red-500 font-bold' : 'text-black')} end>
                Home
            </NavLink>

            <NavLink to="/" className={({ isActive }) => (isActive ? 'text-red-500 font-bold' : 'text-black')} end>
                Home
            </NavLink> */}
        </div>
    );
}

export default Sidebar