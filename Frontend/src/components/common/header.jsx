import react from 'react';
import { useState } from 'react';
import {Link} from 'react-router-dom';
import food from '../../assets/food.svg';

function Header() {
    const [searchTerm, setSearchTerm] = useState('');
    const user = true; // From Auth Context

    return (
        <>
        <div className='flex justify-between b-g-white shadow-md'>
            <div className='m-1 p-3 flex items-center space-x-2 cursor-pointer hover:scale-105 transition duration-300 ease-in-out'>
                <img src={food} alt="Food"  className='hover:-rotate-12'/>
                <p className='text-3xl font-bold font-serif -tracking-tight hover:scale-110 hover:text-orange-600 transition duration-300 ease-in-out'
                href="#"
                >
                    <Link to="/">Cravr</Link>
                </p>
            </div>
            
            <div className='flex flex-col justify-center m-1 p-3'>
            <div className='flex flex-row justify-between items-center space-x-6'>
            
                <p className='flex items-center hover:scale-105 transition duration-300 ease-in-out'
                onChange={(e) => setSearchTerm(e.target.value)}
                >
                    <input type="text" placeholder= {`Search for restaurants or dishes ${searchTerm}`} className='rounded-full border px-4 py-1 w-140 focus:outline-none'/>
                </p>
                

                <ul className='flex justify-items-center mx-2 space-x-6 font-light font-mono text-md'>
                    <li className='inline p-2 hover:scale-105 cursor-pointer hover:underline transition duration-300 ease-in-out'><Link to="/">Home</Link></li>
                    <li className='inline p-2 hover:scale-105 cursor-pointer hover:underline transition duration-300 ease-in-out'><Link to="/about">About</Link></li>
                    <li className='inline p-2 hover:scale-105 cursor-pointer hover:underline transition duration-300 ease-in-out'><Link to="/restaurants">Restaurants</Link></li>
                    
                    {user ? (
                        <li className='inline p-2 hover:scale-105 cursor-pointer hover:underline transition duration-300 ease-in-out'><Link to="/profile">Profile</Link></li>
                    ) : (
                        <li className='inline p-2 hover:scale-105 cursor-pointer hover:underline transition duration-300 ease-in-out'><Link to="/login">Login/SignUp</Link></li>
                    )}
                    
                    <li className='inline p-2 hover:cursor-pointer'>
                    <Link to="/cart">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:fill-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    </Link>
                    </li>
                </ul>
            </div>
            </div>
        </div>
        </>
    )
}
export default Header;