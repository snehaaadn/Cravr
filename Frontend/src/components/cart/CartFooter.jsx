import React from 'react';

const CartFooter = ({ total, onPlaceOrder, isDeliverable }) => {
    return (
        <div className="p-6 bg-stone-900 border-t border-white/10 font-merriweather">
            <div className="flex justify-between items-center mb-4 text-sm text-stone-400">
                <span>Final Total</span>
                <span className="text-stone-100">₹{total}</span>
            </div>
            <button
                onClick={onPlaceOrder}
                disabled={!isDeliverable}
                className={`w-full py-4 font-bold uppercase tracking-[0.2em] rounded-lg shadow-lg transition-all 
                ${!isDeliverable 
                    ? 'bg-stone-800 text-stone-500 cursor-not-allowed border border-white/5' 
                    : 'bg-amber-500 hover:bg-stone-300 text-stone-950'
                }`}
            >
                {!isDeliverable ? "Check Address Warning" : "Place Order"}
            </button>
            <p className="text-center text-[10px] text-stone-600 uppercase tracking-widest mt-3 font-mono">
                Secure Payment Gateway
            </p>
        </div>
    );
};

export default CartFooter;