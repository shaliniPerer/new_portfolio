'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Cpu, Shield, HelpCircle, Server, Check } from 'lucide-react';

interface SystemLoadingScreenProps {
  onComplete: () => void;
}

const bootLines = [
  { text: 'SYSTEM INITIATED: PORTFOLIO_KERNEL_BOOT_V4.8', type: 'info' },
  { text: 'RESOLVING SECURITY GATEWAYS & TLS ROUTING...', type: 'process' },
  { text: 'CONNECTING INTEGRITY CLUSTER (MONGODB, REDIS, FIRESTORE)...', type: 'process' },
  { text: 'STATE SECURED: EXTREME STRENGTH CRYPTO KEYS VERIF', type: 'success' },
  { text: 'OPTIMIZING NEXT.JS APPMOUNT AND SERVER HANDSHAKE...', type: 'process' },
  { text: 'DEPLOYING LIGHTSPEED TAILWIND STYLING PIPELINE...', type: 'process' },
  { text: 'INITIALIZATION STABLE. LAUNCHING WORKSPACE ENVIRONMENT.', type: 'success' }
];

export default function SystemLoadingScreen({ onComplete }: SystemLoadingScreenProps) {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isDoneOnProgress, setIsDoneOnProgress] = useState(false);

  // Animate lines sequentially
  useEffect(() => {
    if (currentLineIndex < bootLines.length - 1) {
      const timer = setTimeout(() => {
        setCurrentLineIndex((prev) => prev + 1);
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [currentLineIndex]);

  // Animate progress bar to 100%
  useEffect(() => {
    const totalTime = 2200; // Total loading time in ms
    const intervalTime = 30;
    const increment = 100 / (totalTime / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setIsDoneOnProgress(true);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  // Exit callback after progress completion + minor delay
  useEffect(() => {
    if (isDoneOnProgress) {
      const timer = setTimeout(() => {
        onComplete();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isDoneOnProgress, onComplete]);

  return (
    <div className="fixed inset-0 bg-[#020202] text-zinc-300 font-mono z-50 flex flex-col justify-center items-center px-6">
      
      {/* Decorative scanline laser effect overlay */}
      <div className="absolute inset-0 scanlines opacity-[0.03] pointer-events-none" />
      
      {/* Glow dot in background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-neon-green/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-xl space-y-6 relative z-10 border border-zinc-900 bg-zinc-950/80 p-6 rounded-lg backdrop-blur-md">
        
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-zinc-900 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-neon-green animate-pulse" />
            <span className="text-xs text-zinc-400 font-bold">SYSTEM_BOOT_SEQUENCE://a8ef8ef2</span>
          </div>
          <span className="text-[10px] text-zinc-650 bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-800">
            LOADER ENG_OK
          </span>
        </div>

        {/* Diagnostic Lines Area */}
        <div className="space-y-2 h-44 overflow-y-auto text-xs scrollbar-none">
          {bootLines.slice(0, currentLineIndex + 1).map((line, idx) => (
            <motion.div
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.15 }}
              key={idx}
              className="flex items-start gap-2.5 leading-relaxed"
            >
              {line.type === 'success' ? (
                <span className="text-neon-green font-bold">[ OK ]</span>
              ) : line.type === 'process' ? (
                <span className="text-amber-400 font-bold">[ .. ]</span>
              ) : (
                <span className="text-zinc-500 font-bold">[ II ]</span>
              )}

              <span className={line.type === 'success' ? 'text-neon-green font-semibold' : 'text-zinc-300'}>
                {line.text}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Loading Progress Section */}
        <div className="space-y-2 pt-4 border-t border-zinc-900">
          <div className="flex justify-between items-center text-xs text-zinc-500">
            <span>UPDATING LOCAL ENVIRONMENT MODULES</span>
            <span className="text-neon-green font-bold font-mono">{Math.round(progress)}%</span>
          </div>

          <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden border border-zinc-900/40">
            <motion.div
              className="h-full bg-neon-green shadow-[0_0_8px_#86efac]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Footer simulation details */}
        <div className="flex items-center justify-between text-[10px] text-zinc-500 font-mono mt-2">
          <span>HOST: SECURE ROOT ACCESS</span>
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-neon-green rounded-full animate-ping" />
            <span>ACTIVE INTERFACES: SH_ONLINE</span>
          </span>
        </div>

      </div>
    </div>
  );
}
