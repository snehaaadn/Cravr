import React, { useState, useContext, useEffect } from 'react';
import AddressForm from '../components/addressForm';
import AddressCard from '../components/addressCard';
import { AuthContext } from '../context/authContext';

import {addAddressToUser} from '../services/api';

import logo from '../assets/logo.png';

function Addresses() {
    const [view, setView] = useState('list');
    const { user, login } = useContext(AuthContext);

    const [addresses, setAddresses] = useState(user?.address || []);

    useEffect(() => {
        setAddresses(user?.address || []);
    }, [user, view]);


    const handleSave = async (data) => {
        try{
            const response = await addAddressToUser(data);
            if(response.data.success){
                login(response.data.user, localStorage.getItem('token'));
                setView('list');
            } else {
                console.error("Failed to add address:", response.data.message);
            }
        }
        catch(error){
            console.error("Error while adding address:", error);
        }
    };

    if (view === 'form') {
        return <AddressForm onSave={handleSave} onCancel={() => setView('list')} />;
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-end border-b border-amber-500/10 pb-6 mb-8">
                <div>
                    <h1 className="text-4xl font-serif font-bold italic text-white uppercase tracking-widest">Addresses</h1>
                    <p className="font-mono text-[10px] text-stone-400 uppercase tracking-[0.4em] mt-1">Authorized Delivery Locations</p>
                </div>
                <button
                    onClick={() => { setView('form'); }}
                    className="bg-amber-500 text-stone-950 px-6 py-2 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-white transition-all"
                >
                    + New Entry
                </button>
            </div>

            <div className="space-y-3">
                {addresses.length === 0 ? (
                    <div className="flex flex-col items-center justify-center mt-20 space-y-4">
                        <img src={logo} alt="Cravr Logo" className="w-24 h-24 opacity-40" />
                        <p className="text-stone-300 font-mono text-[10px] uppercase tracking-widest text-center">
                            {user?.username || 'Unknown'}: No Addresses on Record.
                            <br />Please add a new address to proceed.
                        </p>
                    </div>
                ) : (
                    addresses.map((addr, index) => (
                        <AddressCard
                            key={addr._id}
                            address={addr}
                        />
                    ))
                )}
            </div>
        </div>
    );
}

export default Addresses;