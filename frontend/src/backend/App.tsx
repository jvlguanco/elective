import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './components/navbar';
import Sidebar from './components/sidebar';
import Login from './components/login';

const Backend = () => {
    const [role, setRole] = useState('admin');
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        setRole(null);
        navigate('/');
    };

    return (
        <>
            {role ? (
                <>
                    <Navbar role={role} onLogout={handleLogout} />
                    <Sidebar role={role} />
                </>
            ) : (
                <Login setRole={setRole} />
            )}
        </>
    );
};

export default Backend;