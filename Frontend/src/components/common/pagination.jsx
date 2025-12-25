import React from 'react';

const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage, sectionId }) => {
    const pageNumbers = [];
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    if (pageNumbers.length <= 1) return null;

    const handlePageChange = (number) => {
        if (number < 1 || number > totalPages) return;
        
        paginate(number); 

        if (sectionId) {
            const section = document.getElementById(sectionId);
            if (section) {
                const y = section.getBoundingClientRect().top + window.scrollY - 80;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        }
    };

    return (
        <div className="flex justify-center mt-12 space-x-2">
            <button 
                onClick={() => handlePageChange(currentPage - 1)}  
                disabled={currentPage === 1}
                className="px-4 py-2 bg-stone-900 border border-stone-700 text-white rounded-lg disabled:opacity-50 hover:bg-amber-500 hover:text-black transition-all font-bold text-sm"
            >
                Prev
            </button>

            {pageNumbers.map(number => {
                if (number === 1 || number === totalPages || (number >= currentPage - 1 && number <= currentPage + 1)) {
                     return (
                        <button 
                            key={number} 
                            onClick={() => handlePageChange(number)} 
                            className={`w-10 h-10 flex items-center justify-center rounded-lg border font-bold text-sm transition-all
                            ${currentPage === number 
                                ? 'bg-amber-500 text-black border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.4)]' 
                                : 'bg-stone-900 border-stone-700 text-gray-400 hover:border-gray-500'
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

            <button 
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-stone-900 border border-stone-700 text-white rounded-lg disabled:opacity-50 hover:bg-amber-500 hover:text-black transition-all font-bold text-sm"
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;