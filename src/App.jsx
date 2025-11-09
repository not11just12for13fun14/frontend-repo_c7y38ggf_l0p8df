import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CreatorProfile from './components/CreatorProfile';
import HowItWorks from './components/HowItWorks';
import CommissionFlow from './components/CommissionFlow';

export default function App() {
  const [openCommission, setOpenCommission] = useState(false);
  const [selectedService, setSelectedService] = useState('Digital Portrait');

  const handleOpenCommission = (service) => {
    if (service) setSelectedService(service);
    setOpenCommission(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-white to-slate-50 text-slate-900">
      <Navbar />
      <Hero onCommissionClick={() => handleOpenCommission()} />
      <CreatorProfile onCommission={(service)=> handleOpenCommission(service)} />
      <HowItWorks />

      <footer className="border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-10 text-sm text-slate-600 flex flex-col md:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Phantasm. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-slate-900">Privacy</a>
            <a href="#" className="hover:text-slate-900">Terms</a>
            <a href="#" className="hover:text-slate-900">Contact</a>
          </div>
        </div>
      </footer>

      <CommissionFlow open={openCommission} onClose={()=>setOpenCommission(false)} selectedService={selectedService} />
    </div>
  );
}
