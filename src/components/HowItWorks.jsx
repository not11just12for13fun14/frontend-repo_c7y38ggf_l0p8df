import React from 'react';
import { Brush, FileText, Wallet, CheckCircle2 } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    { icon: FileText, title: 'Brief', text: 'Clients submit a guided brief with goals, timeline, deliverables and references.' },
    { icon: Brush, title: 'Proposal', text: 'Creators accept, deny, or respond with a custom quote.' },
    { icon: Wallet, title: 'Escrow Payment', text: 'Client pays in full. Funds are held securely until sign-off.' },
    { icon: CheckCircle2, title: 'Workspace', text: 'All communication, updates and final files in one place.' },
  ];

  return (
    <section id="flow" className="max-w-6xl mx-auto px-4 py-16">
      <h3 className="text-2xl font-semibold tracking-tight text-center">How Phantasm Works</h3>
      <p className="text-slate-600 text-center max-w-2xl mx-auto mt-2">A simple, secure loop that protects both sides and keeps every project moving smoothly.</p>

      <div className="mt-8 grid md:grid-cols-4 gap-4">
        {steps.map(({ icon: Icon, title, text }) => (
          <div key={title} className="p-5 rounded-2xl border border-slate-200 bg-white">
            <div className="h-10 w-10 rounded-lg bg-indigo-600/10 text-indigo-700 flex items-center justify-center">
              <Icon className="h-5 w-5"/>
            </div>
            <h4 className="mt-3 font-medium">{title}</h4>
            <p className="text-sm text-slate-600 mt-1">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
