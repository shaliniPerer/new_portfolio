'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Github, Linkedin, Terminal, Send, CheckCircle, ShieldAlert, Cpu, Network } from 'lucide-react';

export default function ContactTerminalForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [status, setStatus] = useState<'IDLE' | 'TRANSMITTING' | 'SUCCESS' | 'ERROR'>('IDLE');
  const [logs, setLogs] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTransmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('ERROR');
      setLogs(['Validation failure: all payload parameters must be non-empty.', 'Transmission halted.']);
      setTimeout(() => setStatus('IDLE'), 4000);
      return;
    }

    setStatus('TRANSMITTING');
    setLogs([
      'Formulating payload objects in local buffer...',
      'Opening secure route /api/contact...',
      'Dispatching request to SMTP gateway...'
    ]);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const result = (await response.json()) as { error?: string };
        const hint =
          response.status === 503
            ? 'Hint: create .env.local with CONTACT_EMAIL_USER and CONTACT_EMAIL_APP_PASSWORD, then restart npm run dev.'
            : response.status === 502
              ? 'Hint: verify Gmail app password and that CONTACT_EMAIL_USER is a Gmail address.'
              : 'Hint: open terminal logs for /api/contact details.';
        setStatus('ERROR');
        setLogs((prev) => [
          ...prev,
          `Gateway rejected payload: ${result.error ?? 'unknown error'}`,
          hint,
          'Transmission halted.',
        ]);
        setTimeout(() => setStatus('IDLE'), 4000);
        return;
      }

      setLogs((prev) => [
        ...prev,
        'SMTP gateway accepted payload... 200 OK.',
        'Message delivered to shalinirvithanage@gmail.com.',
        'Ready code transmission finalized!',
      ]);
      setStatus('SUCCESS');
      setFormData({ name: '', email: '', message: '' });
    } catch {
      setStatus('ERROR');
      setLogs((prev) => [
        ...prev,
        'Network failure while contacting gateway.',
        'Transmission halted.',
      ]);
      setTimeout(() => setStatus('IDLE'), 4000);
    }
  };

  const resetFormStatus = () => {
    setStatus('IDLE');
    setLogs([]);
  };

  return (
    <section id="contact" className="py-20 bg-transparent relative border-b border-zinc-800/80 code-grid">

      <div className="container mx-auto px-4 w-full max-w-7xl">
        
        {/* Section Heading */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-2 font-mono text-xs text-neon-green">
            <span>$ curl -X POST /api/contact</span>
            <span className="w-1.5 h-3 bg-neon-green animate-blink" />
          </div>
          <h2 className="text-3xl md:text-4xl font-mono text-white tracking-tight">
            ~/establish_link
          </h2>
          <div className="w-20 h-1 bg-neon-green mt-3 shadow-sm rounded-full" />
        </div>

        {/* Form and info logs layout wrapper */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-2">
          
          {/* Form input - Left Column */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="border border-zinc-900 bg-zinc-950/40 backdrop-blur-md rounded-xl p-6 sm:p-7 shadow-2xl">
              <div className="flex items-center justify-between pb-3.5 mb-6 border-b border-zinc-900 text-[#71717a] font-mono text-[10px] uppercase tracking-wider">
                <span>Active contact form socket</span>
                <span className="text-neon-green flex items-center gap-1.5 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
                  Channel: Secure
                </span>
              </div>

              {status !== 'SUCCESS' ? (
                <form id="contact-form" onSubmit={handleTransmit} className="space-y-5">
                  <div className="space-y-2">
                    <label htmlFor="input-name" className="block text-xs uppercase font-mono text-zinc-500 tracking-widest">
                      visitor_name *
                    </label>
                    <input
                      type="text"
                      id="input-name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Eleanor Vance"
                      className="w-full bg-black/40 border border-zinc-900 focus:border-neon-green/40 focus:bg-[#030303]/90 rounded-lg px-4 py-3.5 font-sans text-sm text-zinc-200 placeholder-zinc-700 focus:outline-none transition-all duration-300"
                      disabled={status === 'TRANSMITTING'}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="input-email" className="block text-xs uppercase font-mono text-zinc-500 tracking-widest">
                      visitor_email *
                    </label>
                    <input
                      type="email"
                      id="input-email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. eleanor@vance-systems.com"
                      className="w-full bg-black/40 border border-zinc-900 focus:border-neon-green/40 focus:bg-[#030303]/90 rounded-lg px-4 py-3.5 font-sans text-sm text-zinc-200 placeholder-zinc-700 focus:outline-none transition-all duration-300"
                      disabled={status === 'TRANSMITTING'}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="text-message" className="block text-xs uppercase font-mono text-zinc-500 tracking-widest">
                      message_body *
                    </label>
                    <textarea
                      id="text-message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={5}
                      placeholder="Type your architectural requirements, project details, or interview scopes here..."
                      className="w-full bg-black/40 border border-zinc-900 focus:border-neon-green/40 focus:bg-[#030303]/90 rounded-lg px-4 py-3.5 font-sans text-sm text-zinc-200 placeholder-zinc-700 focus:outline-none transition-all duration-300 resize-none"
                      disabled={status === 'TRANSMITTING'}
                    />
                  </div>

                  {status === 'ERROR' && (
                    <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 text-red-400 font-mono text-xs rounded">
                      <ShieldAlert className="w-4 h-4 shrink-0" />
                      <span>Validation failure: Please compile all required inputs correctly!</span>
                    </div>
                  )}

                  <div className="pt-2">
                    <motion.button
                      type="submit"
                      id="btn-transmit-payload"
                      disabled={status === 'TRANSMITTING'}
                      whileHover={{ scale: 1.04, boxShadow: "0 0 20px rgba(134,239,172,0.3)" }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full sm:w-auto font-mono text-xs px-6 py-3.5 cursor-pointer bg-neon-green text-black font-extrabold tracking-widest uppercase rounded flex items-center justify-center gap-2 transition-all duration-300"
                    >
                      <span>{status === 'TRANSMITTING' ? 'transmitting()...' : 'transmit_payload()'}</span>
                      <Send className="w-3.5 h-3.5" />
                    </motion.button>
                  </div>
                </form>
              ) : (
                /* Success visual verification message */
                <div className="text-center py-10 space-y-6">
                  <div className="inline-flex items-center justify-center bg-[#143a21]/30 border border-neon-green/20 p-4.5 rounded-full shadow-[0_0_20px_rgba(134,239,172,0.04)]">
                    <CheckCircle className="w-12 h-12 text-neon-green animate-bounce" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-xl font-mono text-white font-bold">TRANSMISSION CONFIRMED</h3>
                    <p className="text-zinc-450 text-sm font-sans max-w-md mx-auto leading-relaxed">
                      Your form parameters have compiled successfully and been written to the mail gateway. Shalini will reply back shortly.
                    </p>
                  </div>

                  <motion.button
                    id="btn-reset-transmission"
                    onClick={resetFormStatus}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="cursor-pointer font-mono text-xs px-4 py-2.5 border border-zinc-800 hover:border-zinc-650 hover:text-white rounded text-zinc-400 transition-colors duration-200"
                  >
                    reset_channel()
                  </motion.button>
                </div>
              )}
            </div>
          </div>

          {/* Social Links & Active cli status - Right Column */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            {/* Active System Telemetry log output terminal */}
            <div className="border border-zinc-800 bg-[#09090b] rounded-lg p-5 flex-1 flex flex-col justify-between border-glow">
              <div>
                <div className="flex items-center gap-2 pb-2 mb-4 border-b border-zinc-900 text-zinc-500 uppercase font-mono text-[10px] tracking-widest">
                  <Terminal className="w-3.5 h-3.5 text-neon-green" />
                  <span>TRANSMISSION STREAM CONSOLE</span>
                </div>

                <div className="space-y-2 text-[11px] font-mono min-h-[180px]">
                  {logs.map((log, logIdx) => (
                    <p key={logIdx} className="text-zinc-400">
                      <span className="text-zinc-600 font-bold mr-1.5">&gt;</span>
                      {log}
                    </p>
                  ))}
                  {status === 'TRANSMITTING' && (
                    <p className="text-neon-green animate-pulse">&gt; Piping dynamic logs... Awaiting gateway confirmation...</p>
                  )}
                  {status === 'IDLE' && (
                    <p className="text-zinc-600 italic">SYSTEM IDLE. Awaiting developer forms submit events to open socket line...</p>
                  )}
                </div>
              </div>

              {/* Host indicators */}
              <div className="flex items-center gap-2 border-t border-zinc-900 pt-3 text-[10px] text-zinc-500 font-mono uppercase">
                <Network className="w-3.5 h-3.5 text-zinc-650 shrink-0" />
                <span className="break-all">DNS Address: Shalinirvithanage@gmail.com</span>
              </div>
            </div>

            {/* Social communication panel */}
            <div className="border border-zinc-800 bg-[#09090b] rounded-lg p-5 border-glow">
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono block mb-4 border-b border-zinc-900 pb-2">
                External Anchor Nodes (Socials)
              </span>

              <div className="grid grid-cols-2 gap-4">
                
                {/* GitHub */}
                <a
                  href="https://github.com/shaliniPerer"
                  target="_blank"
                  className="flex items-center gap-3 p-3 bg-black border border-zinc-850 hover:border-glow hover:border-neon-green/45 rounded transition duration-200"
                >
                  <div className="p-1.5 bg-zinc-950 rounded text-zinc-400">
                    <Github className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider block">GitHub</span>
                    {/* <span className="text-xs font-mono text-white">/shalini_Vithanage</span> */}
                  </div>
                </a>

                {/* LinkedIn */}
                <a
                  href="www.linkedin.com/in/shalini-vithanage"
                  target="_blank"
                  className="flex items-center gap-3 p-3 bg-black border border-zinc-850 hover:border-glow hover:border-neon-green/45 rounded transition duration-200"
                >
                  <div className="p-1.5 bg-zinc-950 rounded text-zinc-400">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider block">LinkedIn</span>
                    {/* <span className="text-xs font-mono text-white">/in/shalini-vithanage</span> */}
                  </div>
                </a>

                {/* Email Direct mailto Link */}
                <a
                  href="mailto:Shalinirvithanage@gmail.com"
                  className="flex items-center gap-3 p-3 bg-black border border-zinc-850 hover:border-glow hover:border-neon-green/45 rounded transition duration-200 col-span-2"
                >
                  <div className="p-1.5 bg-zinc-950 rounded text-zinc-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider block">Secure Email Redirect</span>
                    <span className="text-xs font-mono text-neon-green">shalinirvithanage@gmail.com</span>
                  </div>
                </a>

              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
