import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../context/authContext.jsx';
import { CartContext } from '../context/cartContext.jsx';
import Loading from './common/loading.jsx';

import CartHeader from './cart/CartHeader.jsx';
import { LoginRequiredState, EmptyCartState } from './cart/CartStates.jsx';
import CartAddressSection from './cart/CartAddress.jsx';
import CartItemsList from './cart/CartItem.jsx';
import CartBilling from './cart/CartBilling.jsx';
import CartFooter from './cart/CartFooter.jsx';

const CartSidebar = ({ isOpen, onClose, onBrowse }) => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const { cartItems, loading, cartTotal, updateQuantity, removeFromCart, placeOrder } = useContext(CartContext);

    const [address, setAddress] = useState([]);
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [addressError, setAddressError] = useState('');
    const [deliveryWarning, setDeliveryWarning] = useState('');
    const [isDeliverable, setIsDeliverable] = useState(true);

    // Initial Address Load
    useEffect(() => {
        if (user?.address) {
            setAddress(user.address);
            if (user.address.length > 0 && !selectedAddressId) {
                setSelectedAddressId(user.address[0]._id);
            }
        }
    }, [user, isOpen]);

    // Validation Logic
    useEffect(() => {
        checkDeliveryValidity();
    }, [selectedAddressId, cartItems]);

    const checkDeliveryValidity = () => {
        if (cartItems.length === 0 || !selectedAddressId) {
            setDeliveryWarning('');
            setIsDeliverable(true);
            return;
        }

        const selectedAddrObj = address.find(a => a._id === selectedAddressId);
        if (!selectedAddrObj) return;

        const userCity = selectedAddrObj.city ? selectedAddrObj.city.trim().toLowerCase() : "";
        const firstItem = cartItems[0];
        const restaurantCity = firstItem.dishID?.restaurantID?.address?.city?.trim().toLowerCase();

        if (restaurantCity && userCity && restaurantCity !== userCity) {
            setIsDeliverable(false);
            setDeliveryWarning(`Restaurant is in ${firstItem.dishID.restaurantID.address.city}, but you are ordering to ${selectedAddrObj.city}. We cannot deliver inter-city.`);
        } else {
            setIsDeliverable(true);
            setDeliveryWarning('');
        }
    };

    
    useEffect(() => {
        const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    useEffect(() => {
        if (isOpen) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'unset';
    }, [isOpen]);

    // Calculations
    const subtotal = cartTotal.toFixed(2);
    const tax = Math.round(subtotal * 0.18).toFixed(2);
    const deliveryFee = subtotal > 0 ? 20.00 : 0;
    const total = parseFloat(subtotal) + parseFloat(tax) + parseFloat(deliveryFee);

    // Handlers
    const handlePlaceOrder = async () => {
        setAddressError('');
        if (!isDeliverable) {
            setAddressError("Cannot place order: Location mismatch.");
            return;
        }

        const selectedAddress = address.find(addr => addr._id === selectedAddressId);
        if (!selectedAddress) {
            setAddressError("Please add a delivery destination to proceed.");
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

    if (loading) return <Loading />;

    return (
        <>
            <div
                className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-60 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            ></div>

            <div className={`fixed top-0 right-0 h-full w-full sm:w-[500px] bg-stone-950 border-l border-white/10 z-70 shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                
                <CartHeader onClose={onClose} />

                <div className="flex-1 overflow-y-auto p-6">
                    {!user ? (
                        <LoginRequiredState onClose={onClose} onNavigate={navigate} />
                    ) : cartItems.length === 0 ? (
                        <EmptyCartState onBrowse={onBrowse} />
                    ) : (
                        <div className="max-w-4xl mx-auto px-4 md:px-8 mt-8 space-y-8 font-merriweather">
                            
                            <CartAddressSection
                                addressList={address}
                                selectedAddressId={selectedAddressId}
                                onSelectAddress={(id) => { setSelectedAddressId(id); setAddressError(''); }}
                                onNavigate={navigate}
                                isDeliverable={isDeliverable}
                                deliveryWarning={deliveryWarning}
                                addressError={addressError}
                            />

                            <CartItemsList 
                                cartItems={cartItems} 
                                updateQuantity={updateQuantity} 
                                removeFromCart={removeFromCart} 
                            />

                            <CartBilling 
                                subtotal={subtotal} 
                                tax={tax} 
                                deliveryFee={deliveryFee} 
                                total={total} 
                            />
                        </div>
                    )}
                </div>

                {user && cartItems.length > 0 && (
                    <CartFooter 
                        total={total} 
                        onPlaceOrder={handlePlaceOrder} 
                        isDeliverable={isDeliverable} 
                    />
                )}
            </div>
        </>
    );
};

export default CartSidebar;