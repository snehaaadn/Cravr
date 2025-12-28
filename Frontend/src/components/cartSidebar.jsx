import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import logo from '../assets/logo.png';
import AddressCard from './addressCard.jsx';

import { AuthContext } from '../context/authContext.jsx';
import { CartContext } from '../context/cartContext.jsx';
import Loading from './common/loading.jsx';

const CartSidebar = ({ isOpen, onClose, onBrowse }) => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [address, setAddress] = useState([]);
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); 

    useEffect(() => {
        if (user?.address) {
            setAddress(user.address);
            if (user.address.length > 0 && !selectedAddressId) {
                setSelectedAddressId(user.address[0]._id);
            }
        }
    }, [user, isOpen]);


    const { cartItems, loading, cartTotal, updateQuantity, removeFromCart, placeOrder } = useContext(CartContext);

    // --- CALCULATIONS ---
    const subtotal = cartTotal.toFixed(2);
    const tax = Math.round(subtotal * 0.18).toFixed(2);
    const deliveryFee = subtotal > 0 ? 20 : 0;
    const total = parseFloat(subtotal) + parseFloat(tax) + parseFloat(deliveryFee);

    // Close on Escape key
    useEffect(() => {
        const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    // Prevent scrolling when open
    useEffect(() => {
        if (isOpen) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'unset';
    }, [isOpen]);

    const handlePlaceOrder = async () => {
        const selectedAddress = address.find(addr => addr._id === selectedAddressId);

        if (!selectedAddress) {
            alert("Select Delivery Destination.");
            return;
        }

        const billingData = {
            subTotal: parseFloat(subtotal),
            tax: parseFloat(tax),
            deliveryFee: parseFloat(deliveryFee),
            totalAmount: total,
            paymentMethod: "Cash On Delivery", 
            shippingAddress: selectedAddress 
        };

        const result = await placeOrder(billingData);
        if (result.success) {
            onClose();
            navigate('/profile');
        } else {
            alert(result.message || "Order Transmission Failed.");
        }
    };

    const handleChangeAddress = () => {
        if (address.length === 0) {
            navigate('/profile');
            onClose();
            return;
        }
        setIsDropdownOpen(!isDropdownOpen); 
    };

    const selectNewAddress = (id) => {
        setSelectedAddressId(id);
        setIsDropdownOpen(false); 
    };

    const getItemName = (item) => item.dishID?.name || "Unknown Dish";
    const getItemPrice = (item) => item.dishID?.price || 0;
    const getItemImage = (item) => item.dishID?.imageUrl || logo;
    const getItemId = (item) => item.dishID?._id || item.dishID;

    const getItemRestaurant = (item) => {
        if (!item.dishID) return "Loading...";

        if (item.dishID.restaurantID && item.dishID.restaurantID.name) {
            return item.dishID.restaurantID.name;
        }

        if (item.dishID.restaurant && item.dishID.restaurant.name) {
            return item.dishID.restaurant.name;
        }

        return "Cravr Partner";
    };

    if (loading) {
        return (
            <Loading />
        );
    }

    return (
        <>
            <div
                className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-60 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            ></div>

            {/* SIDEBAR PANEL */}
            <div
                className={`fixed top-0 right-0 h-full w-full sm:w-[500px] bg-stone-950 border-l border-white/10 z-70 shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                {/* --- HEADER --- */}
                <div className="flex items-center justify-between p-5 border-b border-white/10 bg-stone-900/50 backdrop-blur-md z-10">
                    <h2 className="text-xl font-bold font-merriweather text-white">Your Cart</h2>
                    <button onClick={onClose} className="p-2 text-stone-400 hover:text-white transition-colors rounded-full hover:bg-white/5">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                {/* --- CONTENT AREA --- */}
                <div className="flex-1 overflow-y-auto p-6">

                    {/* NOT LOGGED IN */}
                    {!user ? (
                        <div className="h-full flex flex-col items-center justify-center text-center font-merriweather opacity-80">
                            <img src={logo} alt="Login Required" className="w-24 h-24 mb-6 grayscale invert" />
                            <h3 className="text-xl font-bold text-stone-300 mb-2">Login Required</h3>
                            <p className="text-stone-400 text-sm mb-6 max-w-[200px]">Please login first to add items to your cart.</p>
                            <button
                                onClick={() => { onClose(); navigate('/login'); }}
                                className="px-8 py-3 bg-amber-500 text-black font-bold uppercase tracking-widest text-xs rounded hover:bg-stone-200 transition-colors cursor-pointer"
                            >
                                Login Now
                            </button>
                        </div>
                    )

                        // EMPTY CART
                        : cartItems.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-center opacity-80 font-merriweather">
                                <img src={logo} alt="Empty Cart" className="w-24 h-24 mb-4 grayscale invert" />
                                <h3 className="text-xl font-bold text-stone-400">Your cart is empty</h3>
                                <p className="text-stone-500 text-sm mt-2">Good food is waiting for you.</p>
                                <button
                                    onClick={onBrowse}
                                    className="mt-6 px-6 py-2 border font-bold border-amber-500 text-amber-500 text-xs uppercase hover:bg-amber-500 hover:text-stone-900 transition-colors cursor-pointer"
                                >
                                    Browse Menu
                                </button>
                            </div>
                        )

                            // ITEMS IN CART
                            : (
                                <div className="max-w-4xl mx-auto px-4 md:px-8 mt-8 space-y-8 font-merriweather">

                                    {/* --- ADDRESS SECTION --- */}
                                    <section>
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center text-black font-bold text-xs">1</span>
                                            <h2 className="text-xl font-bold text-stone-200">Delivery Address</h2>
                                        </div>

                                        <div className="bg-stone-900/50 backdrop-blur-sm border border-white/10 p-4 rounded-xl transition-all hover:border-amber-500/30">
                                            <div className="flex flex-col gap-2">
                                                <div className="flex gap-4 items-start">
                                                    <div className="mt-1">
                                                        <svg className="w-6 h-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        </svg>
                                                    </div>

                                                    <div className="flex-1">
                                                        {address.length > 0 && selectedAddressId ? (
                                                            address.filter(addr => addr._id === selectedAddressId).map((addr) => (
                                                                <AddressCard key={addr._id} address={addr} isCompact={true} />
                                                            ))
                                                        ) : (
                                                            /* when no address exists */
                                                            <div className="py-2">
                                                                <p className="text-stone-400 italic text-sm">No saved locations found.</p>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* --- TOGGLE LINK --- */}
                                                <div className="border-t border-white/5 pt-2 mt-1 flex justify-end">
                                                    <button
                                                        onClick={handleChangeAddress}
                                                        className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-amber-500/80 hover:text-amber-400 transition-colors group"
                                                    >
                                                        {address.length === 0 ? "Add New Address" : isDropdownOpen ? "Keep Current" : "Change Location"}
                                                        <svg
                                                            className={`w-3 h-3 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : 'translate-x-0 group-hover:translate-x-1'}`}
                                                            fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                                        >
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                        </svg>
                                                    </button>
                                                </div>

                                                {/* Dropdown Selection Logic */}
                                                {isDropdownOpen && address.length == 1 && (
                                                    <div className="mt-4 space-y-3 animate-in fade-in slide-in-from-top-2">
                                                        <p className="text-stone-400 italic text-sm">No other saved locations found.</p>
                                                    </div>

                                                )}:{(address.length > 1 && isDropdownOpen) && (
                                                    <div className="mt-4 space-y-3 animate-in fade-in slide-in-from-top-2">
                                                        {address
                                                            .filter(addr => addr._id !== selectedAddressId)
                                                            .map((addr) => (
                                                                <div
                                                                    key={addr._id}
                                                                    onClick={() => {
                                                                        selectNewAddress(addr._id);
                                                                    }}
                                                                    className="cursor-pointer"
                                                                >
                                                                    <AddressCard address={addr} isCompact={true} />
                                                                </div>
                                                            ))}
                                                    </div>
                                                )
                                                }
                                            </div>
                                        </div>
                                    </section>
                                    {/* --- CART ITEMS SECTION --- */}
                                    <section>
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center text-stone-950 font-bold text-xs">2</span>
                                            <h2 className="text-xl font-bold text-stone-200">Order Summary</h2>
                                        </div>

                                        <div className="bg-stone-900/30 border border-white/5 rounded-xl overflow-hidden divide-y divide-white/5">
                                            {cartItems.map((item) => (
                                                <div key={getItemId(item)} className="p-4 md:p-6 flex gap-4 md:gap-6 group hover:bg-stone-900/80 transition-colors">

                                                    {/* Image */}
                                                    <div className="w-20 h-20 md:w-24 md:h-24 shrink-0 overflow-hidden rounded-lg bg-stone-800">
                                                        <img src={getItemImage(item)} alt={getItemImage(item)} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                    </div>

                                                    {/* Details */}
                                                    <div className="flex-1 flex flex-col justify-between">
                                                        <div>
                                                            <div className="flex justify-between items-start">
                                                                <h3 className="font-bold text-lg text-white leading-tight">{getItemName(item)}</h3>

                                                                <span className="text-amber-500 font-bold whitespace-nowrap shrink-0">₹{(getItemPrice(item) * item.quantity).toFixed(2)}</span>
                                                            </div>
                                                            <p className="text-xs font-mono text-stone-500 uppercase tracking-wide mt-1">{getItemRestaurant(item)}</p>
                                                        </div>

                                                        {/* Quantity Control */}
                                                        <div className="flex items-center gap-4 mt-3">
                                                            <div className="flex items-center bg-stone-950 border border-stone-700 rounded overflow-hidden">
                                                                <button
                                                                    onClick={() => updateQuantity(getItemId(item), item.quantity - 1)}
                                                                    className="w-8 h-7 flex items-center justify-center text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
                                                                >
                                                                    -
                                                                </button>
                                                                <span className="w-8 h-7 flex items-center justify-center font-mono text-sm font-bold text-white border-x border-stone-800">
                                                                    {item.quantity}
                                                                </span>
                                                                <button
                                                                    onClick={() => updateQuantity(getItemId(item), item.quantity + 1)}
                                                                    className="w-8 h-7 flex items-center justify-center text-amber-500 hover:bg-stone-800 transition-colors"
                                                                >
                                                                    +
                                                                </button>
                                                            </div>
                                                            <button
                                                                onClick={() => removeFromCart(getItemId(item))}
                                                                className="text-xs text-red-500/70 hover:text-red-500 underline decoration-dotted"
                                                            >
                                                                Remove
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </section>

                                    {/* --- Payment SECTION --- */}
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

                                    {/* --- BILLING SECTION --- */}
                                    <section className="border-t-2 border-dashed border-stone-800 pt-8 mt-8">
                                        <div className="bg-stone-900/80 p-6 rounded-xl space-y-3 font-merriweather text-sm">
                                            <div className="flex justify-between text-stone-400">
                                                <span>Item Total</span>
                                                <span>₹{subtotal}</span>
                                            </div>
                                            <div className="flex justify-between text-stone-400">
                                                <span>Tax (5%)</span>
                                                <span>₹{tax}</span>
                                            </div>
                                            <div className="flex justify-between text-stone-400">
                                                <span>Delivery Fee</span>
                                                <span>₹{deliveryFee}</span>
                                            </div>
                                            <div className="h-px bg-white/10 my-4"></div>
                                            <div className="flex justify-between text-lg font-bold text-stone-100">
                                                <span>To Pay</span>
                                                <span className="text-amber-500">₹{total}</span>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            )}
                </div>

                {/* --- CHECKOUT --- */}
                {user && cartItems.length > 0 && (
                    <div className="p-6 bg-stone-900 border-t border-white/10 font-merriweather">
                        <div className="flex justify-between items-center mb-4 text-sm text-stone-400">
                            <span>Final Total</span>
                            <span className="text-stone-100">₹{total}</span>
                        </div>
                        <button
                            onClick={handlePlaceOrder}
                            className="w-full py-4 bg-amber-500 hover:bg-stone-300 text-stone-950 font-bold uppercase tracking-[0.2em] rounded-lg shadow-lg transition-all"
                        >
                            Place Order
                        </button>
                        <p className="text-center text-[10px] text-stone-600 uppercase tracking-widest mt-3 font-mono">
                            Secure Payment Gateway
                        </p>
                    </div>
                )}
            </div>
        </>
    );
};

export default CartSidebar;