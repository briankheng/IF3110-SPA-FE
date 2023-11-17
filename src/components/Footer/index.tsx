import React from 'react';
import useAuth from '../../contexts/AuthContext';
import logo from '../../assets/images/logo.png';

const Footer: React.FC = () => {
    const { isAuthenticated } = useAuth();

    return (
        isAuthenticated && (
            <div className="flex items-center justify-between bg-gray-800 p-5 px-8 z-50 text-white">
                <div className="flex items-center space-x-3">
                    <img src={logo} alt="Logo" className="h-6 w-6" />
                    <p className="text-base">KBLMovie.</p>
                </div>

                {/* Right Side Links */}
                <div className="flex items-center">
                    <p className="text-base">© KBL Company. All rights reserved.</p>
                </div>
            </div>
        )
    );
};

export default Footer;