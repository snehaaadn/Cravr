import React from "react";
import logo from "../../assets/logo.png";

export const EmptyCartState = ({ onBrowse }) => (
    <div className="h-full flex flex-col items-center justify-center text-center opacity-80 font-merriweather">
        <img src={logo} alt="Empty Cart" className="w-24 h-24 mb-4 grayscale invert" />
        <h3 className="text-xl font-bold text-stone-400">Your cart is empty</h3>
        <p className="text-stone-500 text-sm mt-2">Good food is waiting for you.</p>
        <button
            onClick={onBrowse}
            className="mt-6 px-6 py-2 border font-bold border-amber-500 text-amber-500 text-xs uppercase hover:bg-amber-500 hover:text-stone-900 transition-colors cursor-pointer"
        >
            Browse Menu
        </button>
    </div>
)

export const LoginRequiredState = ({onClose, onNavigate}) => (
    <div className="h-full flex flex-col items-center justify-center text-center font-merriweather opacity-80">
        <img src={logo} alt="Login Required" className="w-24 h-24 mb-6 grayscale invert" />
        <h3 className="text-xl font-bold text-stone-300 mb-2">Login Required</h3>
        <p className="text-stone-400 text-sm mb-6 max-w-[200px]">Please login to view your cart.</p>
        <button
            onClick={() => { onClose(); onNavigate('/login'); }}
            className="px-8 py-3 bg-amber-500 text-black font-bold uppercase tracking-widest text-xs rounded hover:bg-stone-200 transition-colors cursor-pointer"
        >
            Login Now
        </button>
    </div>
)