import React, { useState } from 'react';

function ReviewEntry({ item, onSave, onCancel }) {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [comment, setComment] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ itemId: item.id, rating, comment });
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 bg-stone-900/60 border border-amber-500 rounded-[2.5rem] p-10 backdrop-blur-xl">
            {/* Header */}
            <div className="border-b border-amber-500/10 pb-6 mb-8 flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-serif font-bold italic text-stone-50 uppercase tracking-tighter">
                        Quality Assessment
                    </h2>
                    <p className="font-mono text-[10px] text-stone-300 uppercase tracking-widest mt-1">
                        Target: {item.name}
                    </p>
                </div>
                <img src={item.imgURL} className="w-16 h-16 rounded-full object-cover border border-amber-50" alt="" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-10">
                {/* 10 Star Rating System */}
                <div className="space-y-4">
                    <label className="font-mono text-[10px] uppercase tracking-[0.3em] text-amber-50">
                        Rating Scale (1-10)
                    </label>
                    <div className="flex gap-2 justify-between">
                        {[...Array(10)].map((_, index) => {
                            const starValue = index + 1;
                            return (
                                <button
                                    key={starValue}
                                    type="button"
                                    className={`text-2xl transition-all duration-200 ${
                                        starValue <= (hover || rating) ? 'text-amber-500 scale-125' : 'text-stone-500'
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
                    <div className="flex justify-between text-[8px] font-mono text-stone-300 uppercase tracking-widest">
                        <span>Deficient</span>
                        <span className="text-amber-400">Current: {rating}/10</span>
                        <span>Exceptional</span>
                    </div>
                </div>

                {/* Detailed Intelligence (Review) */}
                <div className="space-y-3">
                    <label className="font-mono text-[10px] uppercase tracking-[0.3em] text-amber-50">
                        Feedback
                    </label>
                    <textarea 
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full bg-stone-950 border border-amber-50 rounded-2xl p-6 text-amber-50 font-mono text-sm focus:outline-none focus:border-amber-500 transition-all min-h-[150px] placeholder:text-stone-400"
                        placeholder="Type your report here..."
                    />
                </div>

                {/* Actions */}
                <div className="flex gap-4">
                    <button 
                        type="submit"
                        className="flex-1 bg-amber-500 text-stone-950 font-bold py-4 rounded-2xl text-xs uppercase tracking-widest hover:bg-white transition-all shadow-[0_0_20px_rgba(245,158,11,0.2)]"
                    >
                        File Review
                    </button>
                    <button 
                        type="button"
                        onClick={onCancel}
                        className="px-10 border border-stone-500 text-stone-400 font-bold rounded-2xl text-xs uppercase tracking-widest hover:text-white transition-all"
                    >
                        Abort
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ReviewEntry;