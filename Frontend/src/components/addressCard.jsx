function AddressCard({ add, onEdit }) {
    return (
        <div className="group relative bg-stone-900/40 border border-amber-50 p-5 rounded-2xl hover:bg-stone-800/60 hover:border-amber-500/30 transition-all duration-300 flex justify-between items-center">
            
            {/* Left Side: Label & Location Info */}
            <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                    <h2 className="font-serif font-bold text-xl text-amber-50 group-hover:text-amber-400 transition-colors">
                        {add.label}
                    </h2>
                </div>
                <p className="text-xs text-stone-300 italic font-serif max-w-md">
                    {add.houseNo ? `${add.houseNo}, ` : ''}{add.street}, {add.locality}, {add.city} — {add.zipCode}
                </p>
                <p className="font-mono text-[10px] uppercase tracking-widest text-stone-300">
                    Contact : {add.contact}
                </p>
            </div>

            {/* Right Side: Action Logic */}
            <div className="flex items-center gap-4">
                <button 
                    onClick={() => onEdit(add)}
                    className="p-3 bg-stone-950 border border-amber-50 rounded-xl text-amber-50 hover:text-amber-400 hover:border-amber-500 transition-all active:scale-90"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default AddressCard;