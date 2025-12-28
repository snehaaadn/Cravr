import React, { useState } from 'react';

function ReviewEntry({ item, onSave, onCancel }) {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [comment, setComment] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ itemId: item.id || item._id, rating, comment });
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 bg-stone-900/60 border border-amber-500 rounded-2xl md:rounded-[2.5rem] p-5 md:p-10 backdrop-blur-xl max-w-4xl mx-auto w-full">
            {/* Header: Responsive flex scaling */}
            <div className="border-b border-amber-500/10 pb-4 md:pb-6 mb-6 md:mb-8 flex flex-row justify-between items-center gap-4">
                <div className="flex-1 min-w-0">
                    <h2 className="text-2xl md:text-3xl font-serif font-bold italic text-stone-50 uppercase tracking-tighter">
                        Assessment
                    </h2>
                    <p className="font-mono text-[8px] md:text-[10px] text-stone-300 uppercase tracking-widest mt-1 truncate">
                        Target: {item.name}
                    </p>
                </div>
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-stone-800 shrink-0 border border-amber-50 overflow-hidden">
                    <img src={item.imgURL} alt="" className="w-full h-full object-cover grayscale" />
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 md:space-y-10">
                {/* Rating Scale: Wrapped for mobile screens */}
                <div className="space-y-4">
                    <label className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] text-amber-50">
                        Rating Scale (1-10)
                    </label>
                    <div className="flex flex-wrap gap-2 sm:gap-1 justify-center md:justify-between">
                        {[...Array(10)].map((_, index) => {
                            const starValue = index + 1;
                            return (
                                <button
                                    key={starValue}
                                    type="button"
                                    className={`text-xl md:text-2xl transition-all duration-200 ${
                                        starValue <= (hover || rating) ? 'text-amber-500 scale-110' : 'text-stone-700'
                                    }`}
                                    onClick={() => setRating(starValue)}
                                    onMouseEnter={() => setHover(starValue)}
                                    onMouseLeave={() => setHover(0)}
                                >
                                    ★
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Feedback Area: Responsive sizing */}
                <div className="space-y-3">
                    <label className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-amber-50">
                        Detailed Feedback
                    </label>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full bg-stone-950 border border-amber-50 rounded-xl md:rounded-2xl p-4 md:p-6 text-amber-50 font-mono text-xs md:text-sm focus:border-amber-500 transition-all min-h-[120px] md:min-h-[180px] placeholder:text-stone-600 outline-none"
                        placeholder="Type report..."
                        required
                    />
                </div>

                {/* Actions: Stacking on mobile */}
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                    <button 
                        type="submit" 
                        className="flex-1 bg-amber-500 text-stone-950 font-bold py-3 md:py-4 rounded-xl md:rounded-2xl text-[10px] md:text-xs uppercase tracking-widest hover:bg-white transition-all shadow-[0_0_20px_rgba(245,158,11,0.2)]"
                    >
                        File Review
                    </button>
                    <button 
                        type="button" 
                        onClick={onCancel} 
                        className="flex-1 sm:flex-none px-8 md:px-10 border border-stone-700 text-stone-500 font-bold rounded-xl md:rounded-2xl text-[10px] md:text-xs uppercase tracking-widest hover:text-white hover:border-white transition-all"
                    >
                        Abort
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ReviewEntry;