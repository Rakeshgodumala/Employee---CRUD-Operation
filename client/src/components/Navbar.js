import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // adjust path as needed

const Navbar = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleLogout = () => {
        const confirmlogout = window.confirm("Are you sure you want to Logout?");
        if(confirmlogout){
            logout();
             navigate('/login');
        }  
    };

    return (
        <nav
            className="d-flex justify-content-between align-items-center px-4 py-3 flex-wrap"
            style={{ backgroundColor: '#232F3E', color: 'white' }}
        >
            <div
                className="d-flex align-items-center"
                style={{ cursor: 'pointer' }}
                onClick={() => navigate('/dashboard')}
            >
                <img
                    src="/images/microsoft shirt pista house.png"
                    alt="profile"
                    width="40"
                    height="40"
                    style={{ borderRadius: '50%', marginRight: '10px', objectFit: 'cover' }}
                />
                <div className="fw-bold fs-5">Dashboard | My Profile</div>
            </div>

            <div className="d-flex gap-3 flex-wrap">
                {user?.role == 'admin' &&
                    <button
                        className="btn btn-link text-white text-decoration-none"
                        onClick={() => navigate('/add')}
                    >
                        Add Employee
                    </button>
                }

                <button className="btn btn-link text-white text-decoration-none">
                    Manage Notification
                </button>

                <button className="btn btn-link text-white text-decoration-none">
                    Company Banners
                </button>

                <button className="btn btn-danger" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
