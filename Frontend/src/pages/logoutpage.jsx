import React, { useEffect } from 'react';

function LogoutView({ onConfirmLogout }) {

    return (
        <div className="animate-in fade-in zoom-in-95 duration-700 flex flex-col items-center justify-center min-h-[500px] text-center">
            
            {/* Visual Shutdown Indicator */}
            <div className="relative mb-12">
                <div className="w-24 h-24 border-2 border-amber-500/20 rounded-full flex items-center justify-center animate-pulse">
                    <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-mono text-[10px] text-amber-500 font-bold uppercase tracking-tighter">Exit</span>
                </div>
            </div>

            {/* Termination Briefing */}
            <div className="max-w-md w-full bg-stone-800 border border-amber-50 rounded-4xl p-8 backdrop-blur-md">
                <h1 className="text-4xl font-serif font-bold italic text-amber-50 mb-2 uppercase tracking-tighter">
                    Logout ?
                </h1>
                <p className="font-mono text-[10px] text-stone-400 uppercase tracking-widest mb-6">
                    We hope to see you again soon.
                </p>

                {/* Action Buttons: Red vs Stone */}
                <div className="flex flex-col gap-3">
                    <button 
                        onClick={onConfirmLogout}
                        className="w-full bg-amber-50 text-amber-500 font-bold py-4 rounded-2xl text-xs uppercase tracking-[0.2em] hover:bg-amber-500 hover:text-amber-50 hover:scale-[1.02] active:scale-95 transition-all"
                    >
                        Confirm Logout
                    </button>
                    <button 
                        className="w-full text-stone-200 font-mono text-[10px] uppercase tracking-widest hover:text-amber-500 transition-colors py-2"
                        onClick={() => window.location.reload()} // Quick way to "Abort"
                    >
                        Abort and Resume
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LogoutView;