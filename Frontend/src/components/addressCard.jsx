function AddressCard({ address, isCompact = false, onDelete }) {
    return (
        <div className={`group relative transition-all duration-300 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 
            ${isCompact ? 'bg-transparent' : 'bg-stone-900/40 border border-amber-50 p-4 md:p-5 rounded-2xl hover:border-amber-500/30'}`}>
            
            <div className="flex flex-col gap-1 w-full">
                <div className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                    <h2 className={`font-serif font-bold text-amber-50 group-hover:text-amber-400 ${isCompact ? 'text-base' : 'text-lg md:text-xl'}`}>
                        {address.label}
                    </h2>
                </div>
                
                <p className="text-[10px] md:text-xs text-stone-300 italic font-serif leading-relaxed line-clamp-2 sm:line-clamp-none">
                    {address.houseNo ? `${address.houseNo}, ` : ''}{address.street}, {address.locality}, {address.city} — {address.zipCode}
                </p>
                
                <p className="font-mono text-[8px] md:text-[10px] uppercase tracking-widest text-stone-500 mt-1">
                    Contact : <span className="text-stone-300">{address.contact}</span>
                </p>
            </div>

            {!isCompact && (
                <button 
                    onClick={(e) => { 
                        e.stopPropagation(); 
                        onDelete(address._id); // Logical fix: Uses _id from DB
                    }}
                    className="self-end sm:self-center p-2 text-stone-600 hover:text-red-500 transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            )}
        </div>
    );
}

export default AddressCard;