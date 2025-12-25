import React, { useState } from 'react';

function AddressForm({ initialData, onSave, onCancel }) {
    // Optimized state mapping to your Schema
    const [formData, setFormData] = useState(initialData || {
        label: '', // e.g., Home/Work
        contact: '',
        houseNo: '',
        street: '',
        locality: '',
        city: '',
        state: '',
        zipCode: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="animate-in fade-in slide-in-from-bottom-4 duration-500 bg-stone-900/40 border border-amber-500/10 rounded-3xl p-8 backdrop-blur-md">
            <div className="border-b border-amber-500/10 pb-6 mb-8 flex justify-between items-center">
                <h2 className="text-3xl font-serif font-bold italic text-white uppercase tracking-tighter">
                    {initialData ? 'Update Record' : 'New Safe Zone'}
                </h2>
                <span className="font-mono text-[10px] text-amber-500/30 tracking-widest uppercase italic">Entry_Auth_882</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Field mappings for your addressSchema */}
                <div className="flex flex-col space-y-2">
                    <label className="font-mono text-[10px] uppercase tracking-widest text-stone-500">Label (Home/Work)</label>
                    <input name="label" value={formData.label} onChange={handleChange} className="bg-stone-950 border border-amber-500/10 rounded-xl px-4 py-3 text-amber-50 focus:outline-none focus:border-amber-500 transition-colors" placeholder="e.g. Headquarters" required />
                </div>
                <div className="flex flex-col space-y-2">
                    <label className="font-mono text-[10px] uppercase tracking-widest text-stone-500">Contact Number</label>
                    <input name="contact" value={formData.contact} onChange={handleChange} className="bg-stone-950 border border-amber-500/10 rounded-xl px-4 py-3 text-amber-50 focus:outline-none focus:border-amber-500 transition-colors" placeholder="+91..." required />
                </div>
                <div className="flex flex-col space-y-2">
                    <label className="font-mono text-[10px] uppercase tracking-widest text-stone-500">House / Flat No.</label>
                    <input type="number" name="houseNo" value={formData.houseNo} onChange={handleChange} className="bg-stone-950 border border-amber-500/10 rounded-xl px-4 py-3 text-amber-50 focus:outline-none focus:border-amber-500 transition-colors" placeholder="123" />
                </div>
                <div className="flex flex-col space-y-2">
                    <label className="font-mono text-[10px] uppercase tracking-widest text-stone-500">Street</label>
                    <input name="street" value={formData.street} onChange={handleChange} className="bg-stone-950 border border-amber-500/10 rounded-xl px-4 py-3 text-amber-50 focus:outline-none focus:border-amber-500 transition-colors" placeholder="Main St" required />
                </div>
                <div className="flex flex-col space-y-2">
                    <label className="font-mono text-[10px] uppercase tracking-widest text-stone-500">Locality</label>
                    <input name="locality" value={formData.locality} onChange={handleChange} className="bg-stone-950 border border-amber-500/10 rounded-xl px-4 py-3 text-amber-50 focus:outline-none focus:border-amber-500 transition-colors" placeholder="Area Name" />
                </div>
                <div className="flex flex-col space-y-2">
                    <label className="font-mono text-[10px] uppercase tracking-widest text-stone-500">City</label>
                    <input name="city" value={formData.city} onChange={handleChange} className="bg-stone-950 border border-amber-500/10 rounded-xl px-4 py-3 text-amber-50 focus:outline-none focus:border-amber-500 transition-colors" placeholder="Bengaluru" required />
                </div>
                <div className="flex flex-col space-y-2">
                    <label className="font-mono text-[10px] uppercase tracking-widest text-stone-500">State</label>
                    <input name="state" value={formData.state} onChange={handleChange} className="bg-stone-950 border border-amber-500/10 rounded-xl px-4 py-3 text-amber-50 focus:outline-none focus:border-amber-500 transition-colors" placeholder="Karnataka" required />
                </div>
                <div className="flex flex-col space-y-2">
                    <label className="font-mono text-[10px] uppercase tracking-widest text-stone-500">Zip Code</label>
                    <input name="zipCode" value={formData.zipCode} onChange={handleChange} className="bg-stone-950 border border-amber-500/10 rounded-xl px-4 py-3 text-amber-50 focus:outline-none focus:border-amber-500 transition-colors" placeholder="560001" required />
                </div>
            </div>

            <div className="mt-10 flex gap-4">
                <button type="submit" className="flex-1 bg-amber-500 text-stone-950 font-bold py-3 rounded-2xl text-xs uppercase tracking-widest hover:bg-white transition-all shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                    Commit Changes
                </button>
                <button type="button" onClick={onCancel} className="px-8 border border-stone-700 text-stone-500 font-bold rounded-2xl text-xs uppercase tracking-widest hover:text-white hover:border-white transition-all">
                    Abort
                </button>
            </div>
        </form>
    );
}

export default AddressForm;