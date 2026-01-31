
import React, { useState } from 'react';
import { InstitutionInfo } from '../types.ts';

interface SettingsFormProps {
  initialInfo: InstitutionInfo;
  onSave: (info: InstitutionInfo) => void;
}

const SettingsForm: React.FC<SettingsFormProps> = ({ initialInfo, onSave }) => {
  const [info, setInfo] = useState(initialInfo);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(info);
    alert('Institution information updated successfully!');
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden animate-fade-in">
      <div className="p-8 border-b border-slate-100 bg-slate-50">
        <h3 className="text-xl font-bold text-slate-800">Institution Information</h3>
        <p className="text-slate-500 text-sm">Update your School/College details for report card branding.</p>
      </div>
      
      <form onSubmit={handleSubmit} className="p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-600">Institution Name</label>
            <input 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500"
              value={info.name}
              onChange={(e) => setInfo({...info, name: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-600">Address</label>
            <input 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500"
              value={info.address}
              onChange={(e) => setInfo({...info, address: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-600">Email Address</label>
            <input 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500"
              value={info.email}
              onChange={(e) => setInfo({...info, email: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-600">Phone Number</label>
            <input 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500"
              value={info.phone}
              onChange={(e) => setInfo({...info, phone: e.target.value})}
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-bold text-slate-600">Logo URL</label>
            <div className="flex gap-4">
              <input 
                className="flex-1 px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500"
                value={info.logoUrl}
                onChange={(e) => setInfo({...info, logoUrl: e.target.value})}
                placeholder="https://..."
              />
              <img src={info.logoUrl} className="w-12 h-12 rounded-lg object-contain bg-slate-100 p-1 border" alt="Logo preview" />
            </div>
          </div>
        </div>
        
        <div className="flex justify-end pt-4">
          <button 
            type="submit"
            className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default SettingsForm;
