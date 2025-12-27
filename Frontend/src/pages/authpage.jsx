import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import { userSignup, userLogin } from '../services/api';

// Import assets
import pizzaImg from '../assets/category/pizza.webp';
import burgerImg from '../assets/category/burger.webp';
import noodlesImg from '../assets/category/noodles.webp';
import shakeImg from '../assets/category/shake.webp';
import pastaImg from '../assets/category/pasta.webp';
import biryaniImg from '../assets/category/biryani.webp';
import cakeImg from '../assets/category/cake.webp';
import dosaImg from '../assets/category/dosa.webp';

function AuthPage() {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        username: '',
        phone: '',
        email: '',
        password: ''
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAuth = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (isLogin) {
                // --- LOGIN FLOW ---
                const response = await userLogin(formData.phone, formData.password);

                if (response.data.success || response.data.token) {
                    // Use the context function to update state and localStorage
                    login(response.data.user, response.data.token);
                    navigate('/');
                } else {
                    setError("Login failed. Please check your credentials.");
                }
            } else {
                // --- SIGNUP FLOW ---
                const signupRes = await userSignup(formData);

                if (signupRes.data.success) {
                    // Auto-login after successful signup
                    const loginRes = await userLogin(formData.phone, formData.password);

                    if (loginRes.data.success) {
                        login(loginRes.data.user, loginRes.data.token);
                        navigate('/');
                    }
                }
            }

        } catch (err) {
            console.error(err);
            // Better error handling to display specific messages from backend
            const msg = err.response?.data?.message || "Authentication Failed. Please check your connection.";
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    const baseRow1 = [pizzaImg, burgerImg, noodlesImg, shakeImg];
    const baseRow2 = [pastaImg, biryaniImg, cakeImg, dosaImg];
    const baseRow3 = [burgerImg, cakeImg, pizzaImg, biryaniImg];

    const row1 = [...baseRow1, ...baseRow1, ...baseRow1];
    const row2 = [...baseRow2, ...baseRow2, ...baseRow2];
    const row3 = [...baseRow3, ...baseRow3, ...baseRow3];

    // Zig-Zag "Receipt" Edge
    const jaggedEdgeStyle = {
        background: `linear-gradient(-45deg, transparent 16px, #ffffff 16px), 
                     linear-gradient(45deg, transparent 16px, #ffffff 16px)`,
        backgroundRepeat: 'repeat-x',
        backgroundSize: '20px 20px',
        backgroundPosition: 'left bottom',
        height: '32px',
        width: '100%',
        position: 'absolute',
        bottom: '-16px',
        left: '0',
        zIndex: 20
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-stone-950 relative overflow-hidden font-mono selection:bg-amber-400 selection:text-black">

            {/* 1. ANIMATED BACKGROUND: The Infinite Stream */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-radial-gradient from-stone-900/80 via-stone-950/90 to-black z-10 pointer-events-none"></div>

                <div className="absolute inset-0 flex flex-col justify-center items-center gap-6 opacity-30 select-none pointer-events-none transform -rotate-12 scale-125">

                    {/* Row 1: Scroll Left */}
                    <div className="flex gap-6 animate-scroll-left w-max">
                        {row1.map((img, i) => (
                            <div key={i} className="w-72 h-44 shrink-0 rounded-xl overflow-hidden shadow-2xl border border-white/10 grayscale hover:grayscale-0 transition-all duration-500">
                                <img src={img} className="w-full h-full object-cover" alt="" />
                            </div>
                        ))}
                    </div>

                    {/* Row 2: Scroll Right */}
                    <div className="flex gap-6 animate-scroll-right w-max">
                        {row2.map((img, i) => (
                            <div key={i} className="w-72 h-44 shrink-0 rounded-xl overflow-hidden shadow-2xl border border-white/10 grayscale hover:grayscale-0 transition-all duration-500">
                                <img src={img} className="w-full h-full object-cover" alt="" />
                            </div>
                        ))}
                    </div>

                    {/* Row 3: Scroll Left */}
                    <div className="flex gap-6 animate-scroll-left w-max">
                        {row3.map((img, i) => (
                            <div key={i} className="w-72 h-44 shrink-0 rounded-xl overflow-hidden shadow-2xl border border-white/10 grayscale hover:grayscale-0 transition-all duration-500">
                                <img src={img} className="w-full h-full object-cover" alt="" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 2. THE RECEIPT CONTAINER */}
            <div className="relative z-20 w-full max-w-sm bg-white shadow-[0_0_50px_rgba(0,0,0,0.5)] pt-8 pb-4 px-6 sm:px-8 m-4 animate-fade-in-up transform transition-all hover:scale-[1.01]">
                <div className="absolute inset-0 bg-gray-50 opacity-50 pointer-events-none mix-blend-multiply"></div>

                {/* --- HEADER --- */}
                <div className="text-center border-b-2 border-dashed border-gray-300 pb-6 mb-6 relative">
                    <span className="text-5xl text-black font-pacifico block mb-2 hover:text-amber-600 transition-colors">
                        Cravr
                    </span>
                    <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-bold">
                        Crave it. We'll bring it.
                    </p>
                    <p className="text-xs text-gray-400 mt-2 font-medium">
                        {new Date().toLocaleDateString()} • {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>

                    <div className="mt-5 flex justify-between text-[10px] font-bold text-gray-600 bg-gray-100 p-2 rounded border border-gray-200">
                        <span>TBL: WEB-01</span>
                        <span>SRV: AUTH-BOT</span>
                        <span>CHK: #8824</span>
                    </div>
                </div>

                {/* --- THE FORM --- */}
                <div className="space-y-4 relative">
                    <h2 className="text-xl font-black text-center uppercase tracking-wider mb-6 border-y-2 border-black py-2">
                        {isLogin ? "LOGIN TICKET" : "NEW REGISTRY"}
                    </h2>

                    {/* ADDED: Error Message Display */}
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative text-xs font-bold uppercase mb-4 text-center">
                            {error}
                        </div>
                    )}

                    <form className="space-y-4" onSubmit={handleAuth}>

                        {!isLogin && (
                            <div className="flex flex-col group">
                                <label className="text-[10px] uppercase font-bold text-gray-400 mb-1 group-focus-within:text-amber-600 transition-colors">Item: Full Name
                                    <span className='text-gray-400 align-top text-[8px] relative -top-0.5 group-focus-within:text-amber-600 transition-colors'>*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="ENTER YOUR NAME"
                                    name="username"
                                    onChange={handleInputChange}
                                    required
                                    className="border-b-2 border-gray-300 bg-transparent py-1 focus:outline-none focus:border-black font-bold text-lg placeholder-gray-200 transition-colors uppercase"
                                />
                            </div>
                        )}

                        <div className="flex flex-col group">
                            <label className="text-[10px] uppercase font-bold text-gray-400 mb-1 group-focus-within:text-amber-600 transition-colors">Item: Phone Number
                                <span className='text-gray-400 align-top text-[8px] relative -top-0.5 group-focus-within:text-amber-600 transition-colors'>*</span>
                            </label>
                            <input
                                type="tel"
                                placeholder="+91-XXXXXXXXXX"
                                name="phone"
                                onChange={handleInputChange}
                                required
                                className="border-b-2 border-gray-300 bg-transparent py-1 focus:outline-none focus:border-black font-bold text-lg placeholder-gray-200 transition-colors uppercase"
                            />
                        </div>

                        {!isLogin && (
                            <div className="flex flex-col group">
                                <label className="text-[10px] uppercase font-bold text-gray-400 mb-1 group-focus-within:text-amber-600 transition-colors">Item: Email ID</label>
                                <input
                                    type="email"
                                    placeholder="USER@MAIL.COM"
                                    name="email"
                                    onChange={handleInputChange}
                                    className="border-b-2 border-gray-300 bg-transparent py-1 focus:outline-none focus:border-black font-bold text-lg placeholder-gray-200 transition-colors uppercase"
                                />
                            </div>
                        )}

                        <div className="flex flex-col group">
                            <label className="text-[10px] uppercase font-bold text-gray-400 mb-1 group-focus-within:text-amber-600 transition-colors">Item: {isLogin ? "Password" : "set password"}
                                <span className='text-gray-400 align-top text-[8px] relative -top-0.5 group-focus-within:text-amber-600 transition-colors'>*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="********"
                                    name="password"
                                    onChange={handleInputChange}
                                    required
                                    className="w-full border-b-2 border-gray-300 bg-transparent py-1 focus:outline-none focus:border-black font-bold text-lg placeholder-gray-200 transition-colors pr-8"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-0 bottom-2 text-gray-400 hover:text-amber-600 focus:outline-none"
                                >
                                    {showPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* --- TOTAL / BUTTON --- */}
                        <div className="pt-6 border-t-2 border-dashed border-gray-300 mt-6">
                            <div className="flex justify-between items-center text-xl font-black mb-4">
                                <span>TOTAL</span>
                                <span>{isLogin ? "₹0.00" : "FREE"}</span>
                            </div>

                            <button className="w-full bg-black text-white font-bold py-4 hover:bg-stone-800 transition-all uppercase tracking-widest text-sm relative overflow-hidden group shadow-lg">
                                <span className="relative z-10 group-hover:text-amber-400 transition-colors duration-300">
                                    {loading ? "PRINTING..." : (isLogin ? "CONFIRM ORDER" : "PRINT TICKET")}
                                </span>
                            </button>
                        </div>
                    </form>
                </div>

                {/* --- FOOTER --- */}
                <div className="text-center mt-8 pb-4 relative">
                    <p className="text-xs text-gray-500 mb-4 font-bold">
                        {isLogin ? "New Customer?" : "Already Registered?"}{" "}
                        <button onClick={() => setIsLogin(!isLogin)} className="underline decoration-2 decoration-amber-500 text-black hover:text-amber-600 ml-1">
                            {isLogin ? "Get a Ticket" : "Find Order"}
                        </button>
                    </p>

                    {/* Barcode */}
                    <div className="h-10 w-2/3 mx-auto flex justify-between items-end px-2 opacity-80 mix-blend-multiply">
                        {[...Array(24)].map((_, i) => (
                            <div key={i} className={`bg-black h-full ${Math.random() > 0.5 ? 'w-0.5' : 'w-1'}`}></div>
                        ))}
                    </div>
                    <p className="text-[10px] text-gray-400 mt-2 uppercase tracking-widest">Thank You For Visiting</p>

                </div>

                {/* --- THE JAGGED BOTTOM EDGE --- */}
                <div style={jaggedEdgeStyle}></div>
            </div>
        </div>
    );
}

export default AuthPage;