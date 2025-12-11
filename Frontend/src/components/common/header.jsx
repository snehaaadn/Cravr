import react from 'react';
import { useState } from 'react';
function Header() {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <>
        <div className='flex justify-between b-g-white shadow-md'>
            <div className='m-1 p-3'>
                <p className='text-3xl font-bold font-serif -tracking-tight hover:scale-110'
                href="#"
                >
                    Cravr
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
                    <li className='inline p-2 hover:scale-105 cursor-pointer hover:underline transition duration-300 ease-in-out' href="/">Home</li>
                    <li className='inline p-2 hover:scale-105 cursor-pointer hover:underline transition duration-300 ease-in-out' href="/about">About</li>
                    <li className='inline p-2 hover:scale-105 cursor-pointer hover:underline transition duration-300 ease-in-out' href="/restaurants">Restaurants</li>
                    <li className='inline p-2 hover:scale-105 cursor-pointer hover:underline transition duration-300 ease-in-out' href="/login"> Login/Signup</li>
                    <li className='inline p-2 hover:cursor-pointer'
                    href="/cart"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:fill-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    </li>
                </ul>
            </div>
            </div>
        </div>
        </>
    )
}
export default Header;