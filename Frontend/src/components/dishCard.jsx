import React from "react";


const DishCard = ({ data }) => (
    <div className="flex bg-gray-900 rounded-2xl overflow-hidden shadow-md border border-gray-800 hover:border-gray-700 transition-all duration-300">
        <div className="w-1/3 md:w-40 relative">
            <img src={data.image} alt={data.name} className="w-full h-full object-cover" />
            <div className="absolute top-2 left-2">
                <div className="w-4 h-4 border border-green-500 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
            </div>
        </div>
        <div className="flex-1 p-4 flex flex-col justify-between relative">
            <div>
                <h3 className="text-lg font-bold text-white font-merriweather">{data.name}</h3>
                <p className="text-xs text-amber-500 font-bold mb-1">{data.restaurant}</p>
                <p className="text-gray-400 text-xs line-clamp-2">{data.description}</p>
            </div>
            <div className="flex justify-between items-end mt-4">
                <span className="text-xl font-bold text-white">₹{data.price}</span>
                <button className="bg-amber-500 hover:bg-amber-400 text-black font-bold px-6 py-2 rounded-lg text-sm shadow-[0_0_15px_rgba(245,158,11,0.3)] hover:shadow-[0_0_20px_rgba(245,158,11,0.5)] transition-all active:scale-95">
                    ADD +
                </button>
            </div>
        </div>
    </div>
);
export default DishCard;