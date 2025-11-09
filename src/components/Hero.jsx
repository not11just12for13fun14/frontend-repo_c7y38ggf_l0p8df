import React from 'react';
import { Shield, Sparkles, ArrowRight } from 'lucide-react';

export default function Hero({ onCommissionClick }) {
  return (
    <section className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-fuchsia-50 pointer-events-none" />
      <div className="max-w-6xl mx-auto px-4 pt-16 pb-12">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-600/10 text-indigo-700 text-xs font-medium">
              <Shield className="h-4 w-4" /> Escrow-protected commissions
            </div>
            <h1 className="mt-4 text-4xl md:text-6xl font-bold tracking-tight text-slate-900">Phantasm — commission creative work without the chaos</h1>
            <p className="mt-4 text-slate-600 text-lg">A single, secure platform to go from brief to payment. Built for image-based projects like illustration, 3D art, and digital design.</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button onClick={onCommissionClick} className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 text-white hover:bg-slate-800">
                Commission a Creator <ArrowRight className="h-4 w-4" />
              </button>
              <button className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-800">
                <Sparkles className="h-4 w-4 text-indigo-600" /> Explore Profiles
              </button>
            </div>
            <p className="mt-4 text-sm text-slate-500">Creators get paid. Clients get clarity. Everyone gets peace of mind.</p>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl ring-1 ring-slate-200 bg-white">
              <img src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1400&auto=format&fit=crop" alt="Artist workspace" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
