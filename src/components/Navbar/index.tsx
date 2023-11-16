import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../contexts/AuthContext';
import userImage from '../../assets/images/user.png';
import logo from '../../assets/images/logo.png';

const Navbar: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const { logout, isAuthenticated, isAdmin, name, coin } = useAuth();
    const navigate = useNavigate();

    const handleSearch = () => {
        console.log('Searching for:', searchQuery);
        navigate("/search?title=" + searchQuery);
    };

    const handleEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    const handleLogout = () => {
        // Basically calling logout
        logout();
        window.location.href = "/";
    };

    return (
        isAuthenticated && (
            <div className="flex items-center justify-between bg-gray-800 p-5 px-8 sticky top-0 z-50">
                <div className="flex items-center space-x-10">
                    {/* Logo */}
                    <Link to="/" className="text-white text-lg font-bold">
                        <img src={logo} alt="Logo" className="h-8 w-8" />
                    </Link>

                    {/* Search */}
                    <div className="ml-4 flex items-center">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyPress={handleEnterPress}
                            className="bg-gray-700 text-white px-3 py-1 rounded-xl"
                        />
                        <button onClick={handleSearch} className="text-white ml-2">
                            <i className="fas fa-search"></i>
                        </button>
                    </div>
                </div>

                {/* Right Side Links */}
                <div className="flex items-center space-x-5">
                    {/* Category */}
                    <Link to="/choose-category" className="text-white mx-2 hover:bg-gray-600 p-2 px-5 rounded-3xl">
                        Category
                    </Link>

                    {/* RedeemToken */}
                    {isAdmin === true ? 
                        <Link to="/create-album" className="text-white mx-2 hover:bg-gray-600 p-2 px-5 rounded-3xl">
                            Create Album
                        </Link> :
                        <Link to="/redeem-token" className="text-white mx-2 hover:bg-gray-600 p-2 px-5 rounded-3xl">
                            Redeem Token
                        </Link>
                    }

                    {/* UserName */}
                    <div
                        className="flex items-center text-white mx-2 hover:bg-gray-600 p-2 px-5 rounded-3xl z-50 group"
                        onMouseEnter={() => console.log('Show popover')}
                    >
                        <img src={userImage} alt="User" className="h-6 w-6 rounded-full mr-2" />
                        <div className="group-hover:block relative z-50">
                            <h1 className="pl-2">{name}</h1>
                            {isAdmin === false ?  <h1 className="text-xs pl-2">Coins : {coin}</h1> : <></>}
                            <div className="group-hover:block hidden absolute bg-gray-700 p-2 mt-2 rounded z-50">
                                <button onClick={handleLogout} className="z-[100] px-5">Logout</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};

export default Navbar;