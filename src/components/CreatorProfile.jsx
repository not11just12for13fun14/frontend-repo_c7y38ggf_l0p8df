import React, { useState } from 'react';
import { Image, CheckCircle2, XCircle, PencilLine } from 'lucide-react';

export default function CreatorProfile({ onCommission }) {
  const [selectedService, setSelectedService] = useState('Digital Portrait');

  const services = [
    { name: 'Digital Portrait', price: 250, description: 'High-res stylized portrait, 1 subject, simple background.' },
    { name: '3D Character', price: 600, description: 'Posed character render with basic materials and lighting.' },
    { name: 'Logo Design', price: 400, description: '3 exploration concepts + 1 final logo with brand sheet.' },
  ];

  const gallery = [
    'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?q=80&w=1400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1557264337-e8a93017fe92?q=80&w=1400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=1400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1556745757-8d76bdb6984b?q=80&w=1400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1503602642458-232111445657?q=80&w=1400&auto=format&fit=crop',
  ];

  return (
    <section id="creator" className="max-w-6xl mx-auto px-4 py-16">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-full bg-gradient-to-tr from-indigo-600 to-fuchsia-500 text-white flex items-center justify-center font-bold text-lg">AC</div>
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Ava Cortez</h2>
              <p className="text-slate-500">Illustration • 3D • Brand Design</p>
            </div>
          </div>

          <p className="mt-4 text-slate-600">I help brands and people tell unforgettable visual stories. 8+ years delivering illustration, character design, and clean brand identities. Available for image-based commissions only.</p>

          <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-3">
            {gallery.map((src, i) => (
              <div key={i} className="aspect-square rounded-xl overflow-hidden ring-1 ring-slate-200 bg-white">
                <img src={src} alt="Portfolio item" className="h-full w-full object-cover"/>
              </div>
            ))}
          </div>
        </div>

        <aside className="space-y-4">
          <div className="p-4 rounded-xl border border-slate-200 bg-white">
            <h3 className="font-semibold">Commissionable Services</h3>
            <div className="mt-3 space-y-2">
              {services.map((s) => (
                <button
                  key={s.name}
                  onClick={() => setSelectedService(s.name)}
                  className={`w-full text-left p-3 rounded-lg border ${selectedService === s.name ? 'border-slate-900 bg-slate-900/90 text-white' : 'border-slate-300 hover:bg-slate-50'}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{s.name}</span>
                    <span className="text-sm">${s.price}</span>
                  </div>
                  <p className={`text-sm mt-1 ${selectedService === s.name ? 'text-slate-200' : 'text-slate-500'}`}>{s.description}</p>
                </button>
              ))}
            </div>
            <button
              onClick={() => onCommission(selectedService)}
              className="mt-4 w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800"
            >
              <PencilLine className="h-4 w-4"/> Commission Me
            </button>
            <p className="mt-2 text-xs text-slate-500">Escrow protected • Full refunds if denied • No hidden fees</p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white">
            <h4 className="font-semibold flex items-center gap-2"><Image className="h-4 w-4 text-indigo-600"/> Project guarantees</h4>
            <ul className="mt-2 space-y-2 text-sm text-slate-600">
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5"/> Payment held in escrow until you approve</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5"/> Transparent timelines and files in one workspace</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5"/> Final delivery unlocks high-res downloads</li>
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}
