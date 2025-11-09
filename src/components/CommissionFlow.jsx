import React, { useMemo, useRef, useState } from 'react';
import { Calendar, Upload, DollarSign, Send, Quote, X, Check, MessageSquare } from 'lucide-react';

function FileInput({ onFiles }) {
  const inputRef = useRef(null);
  return (
    <div className="mt-2">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => onFiles(Array.from(e.target.files || []))}
        className="block w-full text-sm text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-slate-900 file:text-white hover:file:bg-slate-800"
      />
    </div>
  );
}

function StepBadge({ index, label, active, done }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-semibold ${done ? 'bg-emerald-600 text-white' : active ? 'bg-slate-900 text-white' : 'bg-slate-200 text-slate-700'}`}>{done ? <Check className="h-4 w-4"/> : index}</div>
      <span className={`text-sm ${active ? 'font-medium text-slate-900' : 'text-slate-600'}`}>{label}</span>
    </div>
  );
}

export default function CommissionFlow({ open, onClose, selectedService }) {
  const [step, setStep] = useState(1);
  const [files, setFiles] = useState([]);
  const [form, setForm] = useState({ goals: '', deliverables: '', timeline: '', budget: '' });
  const [submitted, setSubmitted] = useState(false);

  const canSubmitBrief = form.goals && form.deliverables && form.timeline && form.budget;

  const handleSubmitBrief = () => {
    if (!canSubmitBrief) return;
    setSubmitted(true);
    setStep(2);
  };

  const acceptQuote = () => setStep(3);
  const denyQuote = () => { setSubmitted(false); setStep(1); };

  const payAndStart = () => setStep(4);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-3xl rounded-2xl bg-white shadow-xl ring-1 ring-slate-200 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
          <div>
            <h3 className="font-semibold">Commission {selectedService || 'Service'}</h3>
            <p className="text-xs text-slate-500">A guided flow from brief to payment</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100"><X className="h-5 w-5"/></button>
        </div>

        <div className="grid md:grid-cols-4">
          <div className="p-4 border-r border-slate-200 space-y-3">
            <StepBadge index={1} label="Brief" active={step===1} done={step>1} />
            <StepBadge index={2} label="Proposal" active={step===2} done={step>2} />
            <StepBadge index={3} label="Payment" active={step===3} done={step>3} />
            <StepBadge index={4} label="Workspace" active={step===4} done={false} />
          </div>

          <div className="md:col-span-3 p-6">
            {step === 1 && (
              <div>
                <h4 className="text-lg font-semibold">Project Brief</h4>
                <p className="text-sm text-slate-600">Define your goals, timeline, deliverables and share any references.</p>

                <div className="mt-4 space-y-3">
                  <div>
                    <label className="text-sm font-medium">Project goals</label>
                    <textarea value={form.goals} onChange={(e)=>setForm({...form, goals:e.target.value})} className="mt-1 w-full rounded-lg border-slate-300 focus:border-slate-900 focus:ring-slate-900" rows={3} placeholder="What are you trying to achieve?" />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Deliverables</label>
                    <textarea value={form.deliverables} onChange={(e)=>setForm({...form, deliverables:e.target.value})} className="mt-1 w-full rounded-lg border-slate-300 focus:border-slate-900 focus:ring-slate-900" rows={2} placeholder="e.g., 1x 3000px PNG, layered PSD" />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm font-medium">Timeline</label>
                      <input value={form.timeline} onChange={(e)=>setForm({...form, timeline:e.target.value})} className="mt-1 w-full rounded-lg border-slate-300 focus:border-slate-900 focus:ring-slate-900" placeholder="e.g., 2 weeks" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Budget (USD)</label>
                      <input value={form.budget} onChange={(e)=>setForm({...form, budget:e.target.value})} type="number" className="mt-1 w-full rounded-lg border-slate-300 focus:border-slate-900 focus:ring-slate-900" placeholder="e.g., 500" />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium flex items-center gap-2"><Upload className="h-4 w-4"/> Reference images</label>
                    <FileInput onFiles={setFiles} />
                    {!!files.length && (
                      <div className="mt-3 grid grid-cols-4 gap-2">
                        {files.map((f, i) => (
                          <div key={i} className="aspect-square rounded-lg overflow-hidden bg-slate-100 flex items-center justify-center text-xs text-slate-500">
                            {f.name}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-3">
                  <button onClick={onClose} className="px-4 py-2 rounded-lg border border-slate-300 hover:bg-slate-50">Cancel</button>
                  <button disabled={!canSubmitBrief} onClick={handleSubmitBrief} className={`px-4 py-2 rounded-lg text-white ${canSubmitBrief ? 'bg-slate-900 hover:bg-slate-800' : 'bg-slate-400 cursor-not-allowed'}`}>
                    Submit Brief <Send className="inline ml-2 h-4 w-4"/>
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h4 className="text-lg font-semibold">Creator Proposal</h4>
                <p className="text-sm text-slate-600">The creator reviewed your brief and proposed a quote.</p>

                <div className="mt-4 rounded-xl border border-slate-200 p-4 bg-slate-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600">Service</p>
                      <p className="font-medium">{selectedService}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-slate-600">Quote</p>
                      <p className="font-semibold">${Number(form.budget || '500')}</p>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-slate-600">Timeline: {form.timeline || '2 weeks'}</p>
                </div>

                <div className="mt-6 flex items-center justify-end gap-3">
                  <button onClick={denyQuote} className="px-4 py-2 rounded-lg border border-slate-300 hover:bg-slate-50">Deny</button>
                  <button onClick={acceptQuote} className="px-4 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800">Accept & Continue</button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h4 className="text-lg font-semibold">Secure Payment</h4>
                <p className="text-sm text-slate-600">Your payment will be held in escrow and released only after final approval.</p>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border border-slate-200">
                    <label className="text-sm font-medium">Cardholder name</label>
                    <input className="mt-1 w-full rounded-lg border-slate-300 focus:border-slate-900 focus:ring-slate-900" placeholder="Jane Doe" />
                    <label className="mt-3 text-sm font-medium">Card number</label>
                    <input className="mt-1 w-full rounded-lg border-slate-300 focus:border-slate-900 focus:ring-slate-900" placeholder="4242 4242 4242 4242" />
                    <div className="grid grid-cols-2 gap-3 mt-3">
                      <div>
                        <label className="text-sm font-medium">Exp</label>
                        <input className="mt-1 w-full rounded-lg border-slate-300 focus:border-slate-900 focus:ring-slate-900" placeholder="MM/YY" />
                      </div>
                      <div>
                        <label className="text-sm font-medium">CVC</label>
                        <input className="mt-1 w-full rounded-lg border-slate-300 focus:border-slate-900 focus:ring-slate-900" placeholder="123" />
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                    <p className="text-sm text-slate-600">Amount</p>
                    <p className="text-2xl font-semibold">${Number(form.budget || '500')}</p>
                    <p className="mt-2 text-xs text-slate-500">Held in escrow by Phantasm. Funds are released to the creator only after you approve final delivery.</p>
                    <button onClick={payAndStart} className="mt-4 w-full px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700">Pay & Start Project</button>
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <ProjectWorkspace />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectWorkspace() {
  const [chat, setChat] = useState('');
  const [messages, setMessages] = useState([
    { from: 'Creator', text: 'Welcome to the workspace! I will share the first draft shortly.' },
  ]);
  const [annotations, setAnnotations] = useState([]);
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1400&auto=format&fit=crop');
  const [approved, setApproved] = useState(false);
  const [finalUnlocked, setFinalUnlocked] = useState(false);

  const addAnnotation = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    const text = prompt('Add a comment');
    if (text) setAnnotations([...annotations, { x, y, text }]);
  };

  const approveAndSignOff = () => {
    setApproved(true);
    setFinalUnlocked(true);
  };

  return (
    <div id="workspace" className="space-y-6">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-semibold">Project Workspace</h4>
        <div className="flex items-center gap-2">
          {!approved ? (
            <button onClick={approveAndSignOff} className="px-4 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800">Approve & Sign-Off</button>
          ) : (
            <span className="px-3 py-1 text-sm rounded-full bg-emerald-100 text-emerald-700">Approved</span>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="rounded-xl overflow-hidden border border-slate-200">
            <div className="relative">
              <img src={imageUrl} alt="Work update" className="w-full object-cover" onClick={addAnnotation} />
              {annotations.map((a, i) => (
                <div key={i} className="absolute" style={{ left: `${a.x}%`, top: `${a.y}%` }}>
                  <div className="translate-x-[-50%] translate-y-[-120%]">
                    <div className="px-2 py-1 rounded bg-slate-900 text-white text-xs shadow">{a.text}</div>
                    <div className="h-3 w-3 bg-slate-900 rotate-45 mx-auto -mt-1" />
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 border-t border-slate-200 flex items-center justify-between">
              <span className="text-sm text-slate-600">Click anywhere on the image to drop a comment</span>
              <label className="text-sm font-medium cursor-pointer">
                <input type="file" accept="image/*" className="hidden" onChange={(e)=>{
                  const f = e.target.files?.[0];
                  if (f) {
                    const url = URL.createObjectURL(f);
                    setImageUrl(url);
                    setAnnotations([]);
                  }
                }} />
                <span className="px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-50">Upload update</span>
              </label>
            </div>
          </div>

          <div className="mt-4 p-4 rounded-xl border border-slate-200">
            <h5 className="font-medium mb-2">Final Delivery</h5>
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium cursor-pointer">
                <input type="file" accept="image/*" className="hidden" />
                <span className="px-3 py-2 rounded-lg border border-slate-300 hover:bg-slate-50">Upload final files</span>
              </label>
              <a
                className={`px-3 py-2 rounded-lg ${finalUnlocked ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-slate-200 text-slate-600 cursor-not-allowed'}`}
                href={finalUnlocked ? imageUrl : undefined}
                download={finalUnlocked}
              >
                Download high-res
              </a>
            </div>
            <p className="mt-2 text-xs text-slate-500">Sign-off releases payment to the creator and unlocks downloads.</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-4 rounded-xl border border-slate-200">
            <h5 className="font-medium flex items-center gap-2"><MessageSquare className="h-4 w-4"/> Project chat</h5>
            <div className="mt-3 h-56 overflow-y-auto space-y-2 pr-1">
              {messages.map((m, i) => (
                <div key={i} className={`max-w-[80%] rounded-lg p-2 text-sm ${m.from === 'Creator' ? 'bg-slate-100' : 'bg-indigo-600 text-white ml-auto'}`}>
                  <p className="text-xs mb-1 opacity-70">{m.from}</p>
                  <p>{m.text}</p>
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-2">
              <input value={chat} onChange={(e)=>setChat(e.target.value)} className="flex-1 rounded-lg border-slate-300 focus:border-slate-900 focus:ring-slate-900" placeholder="Write a message" />
              <button onClick={()=>{ if (chat) { setMessages([...messages, { from:'You', text: chat }]); setChat(''); } }} className="px-3 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800">Send</button>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
            <h5 className="font-medium">Escrow status</h5>
            <p className="mt-1 text-sm text-slate-600">{approved ? 'Released to creator' : 'Held securely until your approval'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
