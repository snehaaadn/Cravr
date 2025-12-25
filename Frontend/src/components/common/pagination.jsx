import React from 'react';

const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
    const pageNumbers = [];

    // Calculate total pages
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    // Don't show if there's only 1 page
    if (pageNumbers.length <= 1) return null;

    return (
        <div className="flex justify-center mt-12 space-x-2">
            {/* Previous Button */}
            <button 
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-stone-900 border border-stone-700 text-white rounded-lg disabled:opacity-50 hover:bg-amber-500 hover:text-black hover:border-amber-500 transition-all font-bold text-sm"
            >
                Prev
            </button>

            {/* Page Numbers */}
            {pageNumbers.map(number => {
                // Logic to show limited page numbers (Optional: simplified for now)
                if (number === 1 || number === pageNumbers.length || (number >= currentPage - 1 && number <= currentPage + 1)) {
                     return (
                        <button key={number} onClick={() => paginate(number)} className={`w-10 h-10 flex items-center justify-center rounded-lg border font-bold text-sm transition-all
                            ${currentPage === number 
                                ? 'bg-amber-500 text-black border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.4)]' 
                                : 'bg-stone-900 border-stone-700 text-gray-400 hover:text-white hover:border-gray-500'
                            }`}
                        >
                            {number}
                        </button>
                    );
                } else if (number === currentPage - 2 || number === currentPage + 2) {
                     return <span key={number} className="px-2 text-gray-600">...</span>;
                }
                return null;
            })}

            {/* Next Button */}
            <button 
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === pageNumbers.length}
                className="px-4 py-2 bg-stone-900 border border-stone-700 text-white rounded-lg disabled:opacity-50 hover:bg-amber-500 hover:text-black hover:border-amber-500 transition-all font-bold text-sm"
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;