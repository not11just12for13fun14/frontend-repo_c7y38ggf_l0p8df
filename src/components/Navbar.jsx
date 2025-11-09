import React from 'react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-white/70 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-fuchsia-500 flex items-center justify-center text-white font-bold">P</div>
          <div>
            <p className="text-xl font-semibold tracking-tight">Phantasm</p>
            <p className="text-xs text-slate-500 -mt-0.5">Commission creative work securely</p>
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm text-slate-700">
          <a className="hover:text-slate-900" href="#creator">Creators</a>
          <a className="hover:text-slate-900" href="#flow">How it works</a>
          <a className="hover:text-slate-900" href="#workspace">Workspace</a>
        </nav>
        <div className="flex items-center gap-2">
          <button className="px-3 py-2 text-sm rounded-lg border border-slate-300 hover:bg-slate-50">Log in</button>
          <button className="px-3 py-2 text-sm rounded-lg bg-slate-900 text-white hover:bg-slate-800">Sign up</button>
        </div>
      </div>
    </header>
  );
}
