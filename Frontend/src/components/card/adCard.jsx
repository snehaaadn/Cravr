const AdCard = ({ text }) => {
    return (
        <div className="group relative w-40 h-40 md:w-60 md:h-60 rounded-full shadow-xl hover:shadow-amber-500/50 transition-all duration-500 ease-out transform overflow-hidden animate-float-delay">

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300"></div>

            {/* Text Content */}
            <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
                <span className="text-amber-50 text-sm md:text-xl font-bold drop-shadow-md group-hover:text-white transition-colors italic font-serif">
                    {text}
                </span>
            </div>
        </div>
    );
};

export default AdCard;