import React from 'react';
import AddressForm from '../components/addressForm';
import AddressCard from '../components/addressCard';
import { useState } from 'react';

function Addresses() {
    const [view, setView] = useState('list'); // 'list' | 'form'
    const [editTarget, setEditTarget] = useState(null);

    // Placeholder data matching your schema
    const [addresses, setAddresses] = useState([
        { id: '1', label: 'Home', contact: '987969xxxx', houseNo: 12, street: 'Church St', locality: 'Kalyan Nagar', city: 'Bengaluru', state: 'KA', zipCode: '560043' }
    ]);

    const handleSave = (data) => {
        // Logic to update existing or add new
        if (editTarget) {
            setAddresses(prev => prev.map(a => a.id === data.id ? data : a));
        } else {
            setAddresses(prev => [...prev, { ...data, id: Date.now().toString() }]);
        }
        setView('list');
    };

    if (view === 'form') {
        return <AddressForm initialData={editTarget} onSave={handleSave} onCancel={() => setView('list')} />;
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-end border-b border-amber-500/10 pb-6 mb-8">
                <div>
                    <h1 className="text-4xl font-serif font-bold italic text-white uppercase tracking-widest">Addresses</h1>
                    <p className="font-mono text-[10px] text-stone-500 uppercase tracking-[0.4em] mt-1">Authorized Delivery Locations</p>
                </div>
                <button 
                    onClick={() => { setEditTarget(null); setView('form'); }}
                    className="bg-amber-500 text-stone-950 px-6 py-2 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-white transition-all"
                >
                    + New Entry
                </button>
            </div>

            <div className="space-y-3">
                {addresses.map((add) => (
                    <AddressCard 
                        key={add.id} 
                        add={add} 
                        onEdit={(target) => { setEditTarget(target); setView('form'); }} 
                    />
                ))}
            </div>
        </div>
    );
}

export default Addresses;