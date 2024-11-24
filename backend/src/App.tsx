import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import Sidebar from './components/sidebar';
import Login from './components/login';

const App = () => {
    const [role, setRole] = useState('admin');

    const handleLogout = () => {
        localStorage.removeItem('token');
        setRole(null);
    };

    return (
        <BrowserRouter>
            {role ? (
                <>
                    <Navbar role={role} onLogout={handleLogout} />
                    <Sidebar role={role} />
                </>
            ) : (
                <Login setRole={setRole} />
            )}
        </BrowserRouter>
    );
};

export default App;