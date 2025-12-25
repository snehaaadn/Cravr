import React from "react";
import { Link} from 'react-router-dom';

const RestaurantCard = ({ data }) => (
    <Link to={`/restaurant/${data.id}`} className="block h-full">
        <div className="group relative bg-gray-900 rounded-2xl overflow-hidden shadow-lg border border-gray-800 hover:border-amber-500/50 transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
            <div className="relative h-48 overflow-hidden">
                <div className="flex flex-row items-center justify-center">
                    <img src={data.image} alt={data.name} className=" h-48 w-48 object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="absolute inset-0 bg-linear-to-t from-gray-900 to-transparent opacity-90"></div>
                <div className="absolute bottom-3 left-3 flex items-center space-x-2">
                    <span className="bg-green-600 text-white text-xs font-bold px-2 py-0.5 rounded flex items-center">
                        {data.rating} ★
                    </span>
                    <span className="text-gray-300 text-xs font-medium">{data.time}</span>
                </div>
            </div>
            <div className="p-4">
                <h3 className="text-xl font-bold text-white font-merriweather mb-1 group-hover:text-amber-400 transition-colors">{data.name}</h3>
                <div className="flex justify-between items-center border-t border-gray-800 pt-3">
                    <span className="text-gray-500 text-xs uppercase tracking-wide">{data.location}</span>
                    <span className="text-amber-500 font-bold text-sm">{data.price}</span>
                </div>
            </div>
        </div>
    </Link>
);
export default RestaurantCard;