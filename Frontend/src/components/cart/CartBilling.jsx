import React from 'react';

const CartBilling = ({ subtotal, tax, deliveryFee, total }) => {
    return (
        <>
            <section className='font-merriweather'>
                <div className="flex items-center gap-3 mb-4">
                    <span className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center text-black font-bold text-xs">3</span>
                    <h2 className="text-xl font-bold text-stone-200">Payment Method</h2>
                </div>
                <div className="bg-stone-900/50 backdrop-blur-sm border border-white/10 p-6 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-all hover:border-amber-500/30">
                    <div className="flex items-center gap-4">
                        <div className="mt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-amber-500" fill="none" viewBox="0 0 18 18" stroke="currentColor">
                                <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0" />
                                <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="font-semibold text-stone-100 text-lg">Cash On Delivery</h3>
                            <p className="text-xs text-stone-400">Pay when you receive your order</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Calculations */}
            <section className="border-t-2 border-dashed border-stone-800 pt-8 mt-8">
                <div className="bg-stone-900/80 p-6 rounded-xl space-y-3 font-merriweather text-sm">
                    <div className="flex justify-between text-stone-400"><span>Item Total</span><span>₹{subtotal}</span></div>
                    <div className="flex justify-between text-stone-400"><span>Tax</span><span>₹{tax}</span></div>
                    <div className="flex justify-between text-stone-400"><span>Delivery Fee</span><span>₹{deliveryFee}</span></div>
                    <div className="h-px bg-white/10 my-4"></div>
                    <div className="flex justify-between text-lg font-bold text-stone-100"><span>To Pay</span><span className="text-amber-500">₹{total}</span></div>
                </div>
            </section>
        </>
    );
};

export default CartBilling;