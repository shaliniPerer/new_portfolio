'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Terminal, CornerDownLeft, CircleAlert, Sparkles } from 'lucide-react';

interface TerminalLine {
  text: string;
  type: 'input' | 'output' | 'error' | 'success';
}

export default function FooterTerminalShell() {
  const [history, setHistory] = useState<TerminalLine[]>([
    { text: 'Interactive Personal Portfolio Shell - v2.4.0', type: 'success' },
    { text: 'Type "help" to view list of available dynamic operations.', type: 'output' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  // Auto scroll down as history updates (skip initial mount)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const command = inputValue.trim().toLowerCase();
    if (!command) return;

    const newHistory = [...history, { text: `visitor@portfolio:~$ ${inputValue}`, type: 'input' as const }];
    setInputValue('');

    switch (command) {
      case 'help':
        setHistory([
          ...newHistory,
          { text: 'Supported shell commands:', type: 'success' },
          { text: '  ls / view_files   — list mock workspace records', type: 'output' },
          { text: '  skills            — print the candidate core stack overview', type: 'output' },
          { text: '  status            — inspect hiring status and availability', type: 'output' },
          { text: '  secret            — decode easter-egg compiler messages', type: 'output' },
          { text: '  clear             — wash out the shell screen buffer', type: 'output' }
        ]);
        break;
      case 'ls':
      case 'view_files':
        setHistory([
          ...newHistory,
          { text: 'drwxr-xr-x  shalini_vithanage_workspace', type: 'success' },
          { text: '  -rw-r--r--  profile.json', type: 'output' },
          { text: '  -rw-r--r--  philosophy.ts', type: 'output' },
          { text: '  -rwxr-xr-x  runtime.env', type: 'output' },
          { text: '  -rw-r--r--  readme_recruites.txt', type: 'output' }
        ]);
        break;
      case 'skills':
        setHistory([
          ...newHistory,
          { text: 'DEPLOYABLE FE: React 19, Next.js 15, TypeScript 5, Tailwind CSS v4', type: 'success' },
          { text: 'BACKEND CORE : Node.js, Express, MySQL, MongoDB, Firebase APIs', type: 'output' },
          { text: 'OTHER STUFF  : REST APIs, JWT Session Checks, Git Pipelines, Docker, AWS', type: 'output' }
        ]);
        break;
      case 'status':
        setHistory([
          ...newHistory,
          { text: 'STATUS ACTIVE: Available for remote or hybrid hire contracts immediately.', type: 'success' },
          { text: 'Preferred scopes: Senior Full Stack Engineer, Web Architect, Component Dev.', type: 'output' }
        ]);
        break;
      case 'secret':
        setHistory([
          ...newHistory,
          { text: '🚨 [EASTER-EGG DECODED] 🚀', type: 'success' },
          { text: '"There are 10 types of people in this world: those who understand binary, and those who do not."', type: 'output' },
          { text: 'Prompt: If you read this secret, mention "CODE_GREEN" in your email subject to skip the initial HR screening!', type: 'success' }
        ]);
        break;
      case 'clear':
        setHistory([]);
        break;
      default:
        setHistory([
          ...newHistory,
          { text: `bash: command not found: "${command}". Type "help" to see valid commands.`, type: 'error' }
        ]);
        break;
    }
  };

  return (
    <footer className="bg-transparent border-t border-zinc-900 pt-12 pb-16">
      <div className="container mx-auto px-4 w-full max-w-7xl space-y-10">
        
        {/* Real Dynamic Shell */}
        <div className="border border-zinc-800 bg-zinc-950/40 rounded-lg overflow-hidden border-glow col-span-12">
          
          {/* Header */}
          <div className="bg-[#121214] border-b border-zinc-805 px-4 py-3 flex items-center justify-between font-mono text-[11px] text-zinc-550">
            <div className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-neon-green" />
              <span>TERMINAL COMMAND INTERPRETER Shell</span>
            </div>
            <div className="flex items-center gap-1.5 font-semibold text-neon-green">
              <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-ping" />
              <span>STABLE PORT: 3000</span>
            </div>
          </div>

          {/* Lines Printout area */}
          <div className="p-4 sm:p-5 font-mono text-xs sm:text-xs text-zinc-350 space-y-2.5 max-h-[220px] overflow-y-auto bg-black/90">
            {history.map((line, idx) => {
              let textClass = 'text-zinc-400';
              if (line.type === 'input') textClass = 'text-white font-semibold';
              if (line.type === 'success') textClass = 'text-neon-green font-medium text-glow-subtle';
              if (line.type === 'error') textClass = 'text-red-400';

              return (
                <div key={idx} className="whitespace-pre-wrap leading-relaxed">
                  {line.text}
                </div>
              );
            })}
            <div ref={terminalEndRef} />
          </div>

          {/* Form Command submitter */}
          <form onSubmit={handleCommandSubmit} className="flex border-t border-zinc-900 bg-black">
            <div className="pl-4 py-3 font-mono text-xs text-neon-green font-semibold select-none flex items-center shrink-0">
              guest@portfolio:~$
            </div>
            
            <input
              type="text"
              id="terminal-input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="type commands here... (e.g. skills, help, secret)"
              maxLength={40}
              className="flex-1 bg-transparent border-none text-zinc-150 font-mono text-xs px-3 focus:outline-none focus:ring-0 placeholder-zinc-700 font-bold"
              autoComplete="off"
              spellCheck={false}
            />

            <button
              type="submit"
              id="btn-submit-shell-cmd"
              className="px-4 bg-[#121214] border-l border-zinc-900 hover:bg-zinc-900 text-zinc-500 hover:text-neon-green transition-colors flex items-center justify-center cursor-pointer"
              title="Submit command"
            >
              <CornerDownLeft className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Sub-footer Copyright specifications */}
        <div className="border-t border-zinc-950 pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-zinc-650 font-mono gap-4">
          <div className="flex items-center gap-2">
            <span>&copy; {new Date().getFullYear()} Shalini Vithanage. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5"><CircleAlert className="w-3.5 h-3.5 text-zinc-600" /> Complies with SSR Next.js 15+ standalone rules</span>
            <span>|</span>
            <span className="text-zinc-600 text-[10px]">VER: CLOUD_RUN_STABLE</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
