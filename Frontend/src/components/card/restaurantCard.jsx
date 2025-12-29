import React from "react";
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

const RestaurantCard = ({ data }) => {
    return (
        <Link to={`/restaurant/${data.id}`} className="block h-full w-full">
            <div className="group relative w-full h-full bg-stone-950 p-2 transition-transform duration-500 hover:-translate-y-2">

                {/* --- MAIN CONTAINER --- */}
                <div className="relative h-full w-full bg-[#1c1917] rounded-lg shadow-2xl overflow-hidden flex flex-col">
                    <div className="absolute inset-2 border-[1.5px] border-dashed border-stone-700 rounded-sm group-hover:border-amber-500/50 transition-colors duration-500 z-0"></div>

                    {/* --- CONTENT AREA --- */}
                    <div className="relative z-10 flex-1 flex flex-col items-center text-center pt-8 pb-6 px-6">
                        <div className="text-amber-600 mb-3 opacity-70 group-hover:opacity-100 transition-opacity">
                            {/* <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z" /></svg> */}
                            <img src={logo} alt="Logo" className="w-10 h-10" />
                        </div>

                        <span className="text-[16px] font-bold font-pacifico tracking-[0.2em] text-stone-500 mb-3">
                            {"Cravr"}
                        </span>

                        <h3 className="text-2xl font-merriweather font-medium text-stone-100 leading-tight mb-4 group-hover:text-amber-400 transition-colors">
                            {data.name}
                        </h3>

                        {/* Divider */}
                        <div className="flex items-center gap-2 w-full justify-center opacity-70 mb-6">
                            <div className="h-px w-12 bg-amber-400"></div>
                            <div className="w-1.5 h-1.5 rotate-45 border border-amber-400"></div>
                            <div className="h-px w-12 bg-amber-400"></div>
                        </div>

                        {/* --- DETAILS --- */}
                        <div className="mt-auto grid grid-cols-3 w-full border-t border-stone-800 pt-4">

                            {/* Rating */}
                            <div className="flex flex-col items-center border-r border-stone-800">
                                <span className="text-amber-400 font-bold text-sm">{data.rating || 4.2}</span>
                                <span className="text-[8px] text-stone-600 uppercase tracking-widest mt-1">Score</span>
                            </div>

                            {/* Location */}
                            <div className="flex flex-col items-center border-r border-stone-800">
                                <span className="text-[12px] text-stone-300 text-sm font-bold font-mono">{data.location || "Not Available"}</span>
                                <span className="text-[8px] text-stone-600 uppercase tracking-widest mt-1">Location</span>
                            </div>

                            {/* Menu */}
                            <button className="flex flex-col items-center text-stone-300 font-bold text-sm font-mono hover:text-amber-400 transition-colors cursor-pointer">
                                View Menu
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* --- The Bottom --- */}
                    <div className="absolute bottom-0 left-0 w-full h-1/2 bg-linear-to-t from-black/50 to-transparent pointer-events-none"></div>

                    <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-stone-600 rounded-tl group-hover:border-amber-500 transition-colors"></div>
                    <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-stone-600 rounded-tr group-hover:border-amber-500 transition-colors"></div>
                    <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-stone-600 rounded-bl group-hover:border-amber-500 transition-colors"></div>
                    <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-stone-600 rounded-br group-hover:border-amber-500 transition-colors"></div>

                </div>
            </div>
        </Link>
    );
};

export default RestaurantCard;