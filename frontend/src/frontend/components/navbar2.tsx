import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import TopBar from './nav/topbar';
import MainNav from './nav/main';

const Navbar = () => {
    return (
        <nav className='w-full'>
            <TopBar/>
            <MainNav/>
        </nav>
    );
};

export default Navbar;