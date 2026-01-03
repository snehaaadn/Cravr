import logo from '../../assets/logo.png';

function Loading() {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/40 backdrop-blur-md transition-opacity duration-500">
            
            <div className="relative flex items-center justify-center mb-8">
                
                <div className="absolute w-40 h-40 border-4 border-amber-500/30 border-t-amber-500 rounded-full animate-spin"></div>
                
                <div className="absolute w-32 h-32 border-2 border-white/10 border-b-white/50 rounded-full animate-spin-reverse-slow"></div>

                <img 
                    src={logo} 
                    alt="Logo" 
                    className="relative w-24 h-24 object-contain drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]" 
                />
            </div>
        </div>
    );
}

export default Loading;