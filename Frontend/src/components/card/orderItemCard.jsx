import React from "react";

function OrderItemCard({ item, image, hasRated, onRate }) {
    return (
        <div className="bg-stone-950/50 border border-white/5 rounded-2xl p-4 md:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group transition-all hover:border-amber-500/30">
            <div className="flex items-center gap-4 md:gap-6 w-full">
                <div className="relative shrink-0">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-stone-800 overflow-hidden flex items-center justify-center">
                        {image ? (
                            <img
                                src={image}
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all"
                                alt={item.name}
                            />
                        ) : (
                            <span className="font-serif italic text-stone-600 text-[8px] uppercase tracking-tighter">No_Img</span>
                        )}
                    </div>
                    <span className="absolute -top-2 -right-2 bg-amber-500 text-black text-[9px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-stone-950">
                        {item.quantity}
                    </span>
                </div>
                <div className="min-w-0">
                    <h3 className="text-amber-50 font-bold text-lg md:text-xl truncate">{item.name}</h3>
                    <p className="text-amber-400 font-mono text-[9px] uppercase tracking-tighter">Unit: ₹{item.price}</p>
                </div>
            </div>

            <div className="flex gap-2 w-full sm:w-auto">
                <button
                    onClick={() => onRate(item)}
                    className={`flex-1 sm:flex-none px-5 py-2 border rounded-lg text-[9px] uppercase font-bold transition-all
                                            ${hasRated
                            ? 'bg-amber-500/10 border-amber-500 text-amber-500' 
                            : 'bg-amber-500 text-stone-900 hover:bg-stone-200' 
                        }`}
                >
                    {hasRated ? 'Rated' : 'Rate'}
                </button>
            </div>
        </div>
    )
}

export default OrderItemCard;