import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import handleScrollToTop from '../../utils/scrollToTop';
import logo from '../../assets/logo.png';
import CartSidebar from '../cartSidebar';

import {AuthContext} from '../../context/authContext';

function Header() {
    const [searchTerm, setSearchTerm] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    // Handle Search Submission
    const handleSearchSubmit = (e) => {
        if (e.key === 'Enter' && searchTerm.trim() !== '') { // 
            navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
            setSearchTerm('');
            setIsMenuOpen(false);
            handleScrollToTop();
        }
    }

    return (
        <>
            <nav className='bg-stone-900 w-full sticky top-0 z-50'>
                <div className='max-w-full mx-auto px-4 sm:px-6 lg:px-8'>
                    <div className='flex justify-between items-center h-20'>

                        {/* LOGO */}
                        <img src={logo} alt="Logo" className='w-12 h-12 p-1 object-contain' />
                        <div className='flex items-center space-x-2 cursor-pointer hover:scale-105 transition duration-300 ease-in-out'>
                            <Link to="/" onClick={handleScrollToTop} className='text-4xl text-amber-400 tracking-wide font-pacifico transition duration-300 ease-in-out'>
                                Cravr
                            </Link>
                        </div>

                        {/* DESKTOP MENU */}
                        <div className='hidden lg:flex flex-1 justify-end items-center space-x-10 text-md font-merriweather'>
                            {/* Search Bar */}
                            <div className='relative group'>
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onKeyDown={handleSearchSubmit}
                                    placeholder="Search for Restaurants & Dishes..."
                                    className='rounded-full text-amber-50 border border-gray-300 px-4 py-2 w-64 lg:w-96 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all duration-300'
                                />
                            </div>

                            {/* Desktop Navigation Links */}
                            <ul className='flex text-amber-50 items-center space-x-10'>
                                <li className='hover:scale-105 cursor-pointer hover:underline transition duration-300 decoration-amber-400 underline-offset-4'><Link to="/" onClick={handleScrollToTop}>Home</Link></li>
                                <li className='hover:scale-105 cursor-pointer hover:underline transition duration-300 decoration-amber-400 underline-offset-4'><Link to="/about">About</Link></li>
                                <li className='hover:scale-105 cursor-pointer hover:underline transition duration-300 decoration-amber-400 underline-offset-4'><ScrollLink to="nearByRestaurants" smooth={true} duration={500} offset={-80}>Restaurants</ScrollLink></li>

                                {user != null ? (
                                    <li className='hover:scale-105 cursor-pointer hover:underline transition duration-300 decoration-amber-400 underline-offset-4'><Link to="/profile">Profile</Link></li>
                                ) : (
                                    <li className='hover:scale-105 cursor-pointer hover:underline transition duration-300 decoration-amber-400 underline-offset-4'><Link to="/login">Login/SignUp</Link></li>
                                )}

                                {/* Desktop Cart Icon */}
                                <li className='hover:scale-110 transition duration-300 cursor-pointer'>
                                    <button onClick={() => setIsCartOpen(true)} className="focus:outline-none">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:fill-amber-400 transition-colors text-amber-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    </button>
                                </li>
                            </ul>
                        </div>

                        {/* MOBILE */}
                        <div className='bg-black lg:hidden flex items-center space-x-4'>

                            {/* Mobile Cart Icon */}
                            <button onClick={() => setIsCartOpen(true)} className='text-amber-50 hover:text-amber-400 transition-colors focus:outline-none'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:fill-amber-400 transition-colors text-amber-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </button>

                            {/* Hamburger Button */}
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className='text-amber-50 hover:text-amber-400 focus:outline-none transition-transform duration-300 active:scale-90'
                            >
                                {isMenuOpen ? (
                                    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                ) : (
                                    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* MOBILE MENU DROPDOWN */}
                <div className={` lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className='bg-black border-t font-medium text-lg tracking-wide font-merriweather border-gray-100 px-4 pt-4 pb-6 space-y-4 shadow-inner'>

                        {/* Mobile Search */}
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search for Restaurants & Dishes..."
                            className='w-full rounded-full border border-amber-400 text-amber-50 px-4 py-3 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400'
                        />

                        {/* Mobile Links */}
                        <ul className='flex flex-col space-y-3 text-lg text-amber-50'>
                            <li><Link to="/" onClick={() => setIsMenuOpen(false)} className='block py-2 hover:bg-amber-950/80 hover:text-amber-400 hover:pl-2 transition-all duration-300 rounded-lg'>Home</Link></li>
                            <li><Link to="/about" onClick={() => setIsMenuOpen(false)} className='block py-2 hover:bg-amber-950/80 hover:text-amber-400 hover:pl-2 transition-all duration-300 rounded-lg'>About</Link></li>
                            <li><Link to="/restaurants" onClick={() => setIsMenuOpen(false)} className='block py-2 hover:bg-amber-950/80 hover:text-amber-400 hover:pl-2 transition-all duration-300 rounded-lg'>Restaurants</Link></li>

                            {user != null ? (
                                <li><Link to="/profile" onClick={() => setIsMenuOpen(false)} className='block py-2 hover:bg-amber-950/80 hover:text-amber-400 hover:pl-2 transition-all duration-300 rounded-lg'>Profile</Link></li>
                            ) : (
                                <li><Link to="/login" onClick={() => setIsMenuOpen(false)} className='block py-2 hover:bg-amber-950/80 hover:text-amber-400 hover:pl-2 transition-all duration-300 rounded-lg'>Login/SignUp</Link></li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>

            <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </>
    )
}

export default Header;