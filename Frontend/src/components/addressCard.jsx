function AddressCard({ address }) {
    return (
        <div className="group relative bg-stone-900/40 border border-amber-50 p-5 rounded-2xl hover:bg-stone-800/60 hover:border-amber-500/30 transition-all duration-300 flex justify-between items-center">
            
            {/* Left Side: Label & Location Info */}
            <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                    <h2 className="font-serif font-bold text-xl text-amber-50 group-hover:text-amber-400 transition-colors">
                        {address.label}
                    </h2>
                </div>
                <p className="text-xs text-stone-300 italic font-serif max-w-md">
                    {address.houseNo ? `${address.houseNo}, ` : ''}{address.street}, {address.locality}, {address.city} — {address.zipCode}
                </p>
                <p className="font-mono text-[10px] uppercase tracking-widest text-stone-300">
                    Contact : {address.contact}
                </p>
            </div>

        </div>
    );
}

export default AddressCard;