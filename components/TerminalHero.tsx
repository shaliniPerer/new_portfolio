'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Terminal, 
  Cpu, 
  Clock, 
  Code2, 
  FileCode, 
  GitBranch, 
  ChevronRight, 
  Sparkles, 
  Download, 
  Send, 
  Play, 
  Check, 
  Monitor, 
  Layers, 
  Braces, 
  Grid, 
  Workflow
} from 'lucide-react';

interface TechBadge {
  name: string;
  icon: React.ComponentType<any>;
  color: string;
}

const techBadges: TechBadge[] = [
  { name: 'React', icon: Code2, color: 'text-sky-400 border-sky-400/20' },
  { name: 'Next.js', icon: Layers, color: 'text-emerald-300 border-emerald-300/20' },
  { name: 'Node.js', icon: Cpu, color: 'text-green-300 border-green-300/20' },
  { name: 'MongoDB', icon: Braces, color: 'text-lime-400 border-lime-400/20' },
  { name: 'TypeScript', icon: FileCode, color: 'text-blue-400 border-blue-400/20' }
];

// VS Code code editor statements definitions
const codeSnippetLines = [
  'const developer = {',
  '  name: "Shalini Vithanage",',
  '  role: "Full Stack Developer",',
  '  stack: ["React", "Next.js", "Node.js", "Express", "MongoDB"],',
  '  focus: "Building real-world web solutions"',
  '};'
];

export default function TerminalHero() {
  const [typedText, setTypedText] = useState('');
  const [activeLine, setActiveLine] = useState(0);
  const [timestamp, setTimestamp] = useState('');
  const [compileSuccess, setCompileSuccess] = useState(false);
  const [isCompiling, setIsCompiling] = useState(false);
  
  // Interactive Mouse spotlight tracking
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 1. Live Realistic UTC Clock setup
  useEffect(() => {
    const stampTimeout = setTimeout(() => {
      const now = new Date();
      setTimestamp(now.toISOString().replace('T', ' ').substring(0, 19) + ' UTC');
    }, 0);
    return () => clearTimeout(stampTimeout);
  }, []);

  // 2. Continuous Typist Simulator within vscode code card
  useEffect(() => {
    let charIndex = 0;
    let timer: NodeJS.Timeout;

    const typeLine = () => {
      const currentTarget = codeSnippetLines[activeLine];
      if (charIndex <= currentTarget.length) {
        setTypedText(currentTarget.substring(0, charIndex));
        charIndex++;
        timer = setTimeout(typeLine, 50);
      } else {
        // Wait and transit to next code line, or restart block loop
        timer = setTimeout(() => {
          if (activeLine < codeSnippetLines.length - 1) {
            setTypedText('');
            setActiveLine((prev) => prev + 1);
          } else {
            // Initiate a mock code compilation build workflow
            setIsCompiling(true);
            setTimeout(() => {
              setIsCompiling(false);
              setCompileSuccess(true);
              
              // Remain in compiled state, then reset loop
              setTimeout(() => {
                setCompileSuccess(false);
                setTypedText('');
                setActiveLine(0);
              }, 4000);
            }, 1200);
          }
        }, 1200);
      }
    };

    typeLine();
    return () => clearTimeout(timer);
  }, [activeLine]);

  // 3. Canvas Matrix Code Rain Overlay (hardware optimized, low opacity for elegant subtle feel)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    const columns = Math.floor(width / 20) + 1;
    const ypos = Array(columns).fill(0);

    const matrixRain = () => {
      // Clear with high transparency for elegant fading trail
      ctx.fillStyle = 'rgba(0, 0, 0, 0.06)';
      ctx.fillRect(0, 0, width, height);

      // Render minimal matrix green rain drops
      ctx.fillStyle = 'rgba(134, 239, 172, 0.15)'; // Pastel green matrix trail
      ctx.font = '10px monospace';

      for (let i = 0; i < ypos.length; i++) {
        const text = Math.random() > 0.5 ? '0' : '1';
        const x = i * 20;
        const y = ypos[i];
        ctx.fillText(text, x, y);

        if (y > 100 + Math.random() * 10000) {
          ypos[i] = 0;
        } else {
          ypos[i] += 12;
        }
      }
      animationFrameId = requestAnimationFrame(matrixRain);
    };

    matrixRain();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleDownloadCV = () => {
    const cvText = `# SHALINI PERERA - PORTFOLIO RESUME
-----------------------------------------
ROLE: Full Stack Developer
EMAIL: Shalinirvithanage@gmail.com
STATUS: Active & Available for Hire

EDUCATION:
- B.Sc. in Computing and Information Systems

SPECIALIZATION:
- Full Stack Web Development

TECHNICAL STACKS:
- Frontend: React, Next.js, Tailwind CSS, JavaScript, TypeScript
- Backend: Node.js, Express.js, FastAPI, Laravel
- Databases: MongoDB, MySQL, Firebase, DynamoDB
- Deployment: VPS, CloudPanel, Nginx, PM2, Vercel

PROJECTS & EXPERIENCES:
- Custom Tourism Platforms (React, Next.js, FastAPI, PostgreSQL)
- Point of Sale (POS) Systems (React, Node.js, MySQL, Tailwind)
- Hostel & Learning Management Systems (LMS)
- Responsive Admin Dashboards & Secure REST APIs
- AI-based Application Workflows & Firestore syncs

DOWNLOAD TIMESTAMP: ${new Date().toISOString()}
=========================================
Generated automatically via Shalini Perera Personal Portfolio Terminal.`;

    const blob = new Blob([cvText], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = "shalini_vithanage_fullstack_cv.md";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home" 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative pt-20 pb-24 md:py-32 border-b border-zinc-900 bg-transparent overflow-hidden select-none"
    >
      {/* 1. Hardware Accelerated Matrix Canvas Stream in Background */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full object-cover opacity-15 pointer-events-none" 
      />

      {/* 2. Custom Neon Glowing Grid Backdrop with animated scanlines */}
      <div className="absolute inset-0 bg-code-grid pointer-events-none opacity-[0.14]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-[#020202] pointer-events-none" />
      
      {/* Cinematic ambient glow mesh cluster */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 w-[550px] h-[550px] bg-neon-green/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 translate-x-1/2 w-[480px] h-[480px] bg-emerald-500/5 blur-[170px] rounded-full pointer-events-none animate-pulse" style={{ animationDuration: '8s' }} />

      {/* 4. Interactive Mouse-follow Glowing Spotlight */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-500 hidden md:block"
        style={{
          background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(134, 239, 172, 0.08), transparent 50%)`,
          opacity: isHovered ? 1 : 0
        }}
      />

      {/* Scanning laser beam animation lines */}
      <div className="absolute left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-neon-green/30 to-transparent top-1/4 animate-scanlines-drift pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 w-full max-w-7xl">
        
        {/* Top Developer Hub metadata banner */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-12 font-mono text-[10px] text-zinc-500 tracking-wider uppercase border-b border-zinc-900 pb-5">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
            <span className="text-zinc-400 font-medium">FUTURISTIC_DEV_HUB: STATUS_STABLE</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden md:inline text-zinc-650">SYS_LOC: CLOUD_RUN // CD_STABLE</span>
            <span className="flex items-center gap-1.5 bg-zinc-950/80 px-2.5 py-1 rounded border border-zinc-900 text-neon-green/80 shadow-[0_0_12px_rgba(134,239,172,0.02)]">
              <Clock className="w-3 h-3 text-neon-green animate-pulse" />
              <span>{timestamp || '2026-05-26 16:40:00 UTC'}</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT COLUMN: Cinematic Text & Professional Statements */}
          <div className="lg:col-span-7 flex flex-col space-y-7">
            
            {/* Elegant micro tag badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#143a21]/40 border border-neon-green/20 text-neon-green font-mono text-xs w-fit shadow-[0_0_20px_rgba(134,239,172,0.06)] backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-neon-green animate-bounce" />
              <span className="tracking-widest uppercase text-[10px]">SYSTEM ARCHITECT // FULL STACK</span>
            </div>

            {/* Giant Title Typography paired deliberately */}
            <div className="space-y-4">
              <span className="block font-mono text-zinc-500 text-xs md:text-sm tracking-widest uppercase">
                &lt;Portfolio System v4.8 /&gt;
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-mono tracking-tight text-white leading-none font-bold">
                Shalini Vithanage
                <span className="block mt-3 font-sans font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-neon-green via-emerald-400 to-teal-300 text-glow-subtle drop-shadow-[0_0_15px_rgba(134,239,172,0.1)]">
                  Full Stack Developer
                </span>
              </h1>
            </div>

            

            {/* Floating Tech Stack Badges Horizontal strip */}
            <div className="py-1">
              <span className="block font-mono text-[9px] text-zinc-500 uppercase tracking-widest mb-3">Core Stack Capabilities</span>
              <div className="flex flex-wrap gap-2">
                {techBadges.map((badge, index) => {
                  const IconComp = badge.icon;
                  return (
                    <motion.div
                      key={badge.name}
                      animate={{ y: [0, -3, 0] }}
                      transition={{
                        repeat: Infinity,
                        duration: 3 + index,
                        ease: 'easeInOut'
                      }}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded bg-zinc-950/80 border ${badge.color} text-xs font-mono shadow-sm backdrop-blur-sm`}
                    >
                      <IconComp className="w-3.5 h-3.5" />
                      <span>{badge.name}</span>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <div className="pt-1 border-t border-zinc-900/40" />

            {/* PREMIUM BUTTONS BLOCK WITH SPRING SCALES AND GLOWS */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <motion.button
                id="btn-view-projects"
                onClick={() => scrollToSection('projects')}
                whileHover={{ scale: 1.04, boxShadow: "0 0 25px rgba(134,239,172,0.3)" }}
                whileTap={{ scale: 0.98 }}
                className="group relative cursor-pointer w-full sm:w-auto px-6 py-3.5 font-mono text-xs font-bold tracking-widest text-black bg-neon-green rounded border-glow-green overflow-hidden transition-all duration-300"
              >
                <span className="relative z-10 flex items-center gap-1.5 justify-center">
                  <span>VIEW_PROJECTS()</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-neon-green opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.button>
              
              <motion.button
                id="btn-contact-me"
                onClick={() => scrollToSection('contact')}
                whileHover={{ scale: 1.04, borderColor: 'rgba(134,239,172,0.5)', boxShadow: '0 0 20px rgba(134,239,172,0.1)' }}
                whileTap={{ scale: 0.98 }}
                className="group cursor-pointer w-full sm:w-auto px-6 py-3.5 font-mono text-xs font-bold tracking-widest text-zinc-300 border border-zinc-800 rounded hover:text-white hover:bg-zinc-950/70 transition-all duration-300"
              >
                <span>CONTACT_ME()</span>
              </motion.button>
            </div>
            
          </div>

          {/* RIGHT COLUMN: VS Code Inspired IDE Window Workspace Frame */}
          <div className="lg:col-span-5 flex flex-col relative">
            


            {/* The Main High Fidelity Visual IDE Widget Layout */}
            <div className="border border-zinc-800 bg-[#09090b]/90 rounded-lg shadow-2xl backdrop-blur-md overflow-hidden flex flex-col border-glow relative group hover:border-zinc-700/80 transition-colors duration-300">
              
              {/* IDE Top Window Header Bar */}
              <div className="bg-[#121214] border-b border-zinc-800/80 px-4 py-3.5 flex items-center justify-between">
                
                {/* Simulated Apple-Mac close, minimize, maximize circles */}
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80 hover:scale-110 transition-transform cursor-pointer" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:scale-110 transition-transform cursor-pointer" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80 hover:scale-110 transition-transform cursor-pointer" />
                </div>

                {/* Simulated active tab route path coordinates */}
                <div className="hidden sm:flex items-center gap-2 text-[11px] text-zinc-400 font-mono">
                  <Code2 className="w-3.5 h-3.5 text-neon-green" />
                  <span className="tracking-wide">src &gt; components &gt; Shalini.ts</span>
                </div>

                {/* Dummy indicator dot represent sandbox listening */}
                <div className="flex items-center gap-1.5 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800 text-[9px] font-mono text-zinc-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>3000 // LISTENING</span>
                </div>
              </div>

              {/* IDE Secondary Path / Breadcrumb & Interactive Files tab bar */}
              <div className="bg-[#0b0b0d] border-b border-zinc-900/80 px-2 flex items-center justify-between text-[11px] font-mono select-none">
                <div className="flex">
                  <div className="bg-[#09090b] text-neon-green px-4 py-2 border-r border-zinc-900 border-t-2 border-t-neon-green flex items-center gap-2">
                    <FileCode className="w-3 h-3 text-neon-green" />
                    <span>Shalini.ts</span>
                  </div>
                  <div className="text-zinc-500 px-4 py-2 hover:bg-zinc-900/40 hover:text-zinc-300 transition-colors duration-200 cursor-pointer flex items-center gap-2 border-r border-zinc-900">
                    <Braces className="w-3 h-3 text-purple-400" />
                    <span>packages.json</span>
                  </div>
                </div>
                
                <div className="pr-4 hidden sm:flex items-center gap-1 text-[10px] text-zinc-650">
                  <span>UTF-8</span>
                  <span>|</span>
                  <span>TypeScript</span>
                </div>
              </div>

              {/* Workspace Split Layout Grid (File Explorer on left, Code editor on right) */}
              <div className="grid grid-cols-12 min-h-[300px]">
                
                {/* Mini File Explorer Sidebar Column (3 cols) */}
                <div className="col-span-3 bg-[#0d0d10] border-r border-zinc-900/60 p-2.5 font-mono text-[10px] text-zinc-550 space-y-3.5 hidden sm:block">
                  <div className="text-[9px] uppercase tracking-widest text-zinc-500 font-semibold flex items-center justify-between px-1">
                    <span>EXPLORER</span>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-zinc-400 flex items-center gap-1 font-bold">
                      <ChevronRight className="w-3 h-3 text-zinc-600 rotate-90" />
                      <span>workspace</span>
                    </p>
                    <div className="pl-3.5 space-y-1.5 text-zinc-500">
                      <p className="flex items-center gap-1 hover:text-zinc-300 cursor-pointer">
                        <FileCode className="w-3 h-3 text-amber-500" />
                        <span>tourism_app.py</span>
                      </p>
                      <p className="flex items-center gap-1 hover:text-zinc-300 cursor-pointer">
                        <FileCode className="w-3 h-3 text-sky-400" />
                        <span>pos_system.tsx</span>
                      </p>
                      <p className="flex items-center gap-1 hover:text-zinc-300 cursor-pointer text-neon-green bg-dark-green/10 px-1 py-0.5 rounded border border-neon-green/10">
                        <FileCode className="w-3 h-3 text-neon-green" />
                        <span>ShaliniV.ts</span>
                      </p>
                      <p className="flex items-center gap-1 hover:text-zinc-300 cursor-pointer">
                        <FileCode className="w-3 h-3 text-amber-500" />
                        <span>lms_hostel.java</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* High Fidelity Highlight Code Editor body (9 cols) */}
                <div className="col-span-12 sm:col-span-9 bg-black/95 p-4 flex flex-col justify-between font-mono text-[11px] sm:text-xs">
                  
                  {/* Highlighted text syntax rendering code blocks */}
                  <div className="space-y-2.5 text-zinc-350 min-h-[200px]">
                    
                    {/* Rendered pre-typed lines in exact real syntax highlights */}
                    <div className="space-y-1.5 opacity-90 select-text">
                      {codeSnippetLines.slice(0, activeLine).map((line, idx) => (
                        <p key={idx} className="leading-relaxed flex items-start gap-3">
                          <span className="text-zinc-700 w-3 text-right select-none">{idx + 1}</span>
                          <span>
                            {line.startsWith('const') && (
                              <>
                                <span className="text-sky-450 font-medium">const </span>
                                <span className="text-amber-300 font-medium">developer </span>
                                <span className="text-white">= </span>
                                <span className="text-yellow-400">{`{`}</span>
                              </>
                            )}
                            {line.includes('name:') && (
                              <>
                                <span className="text-zinc-400">  name: </span>
                                <span className="text-neon-green font-semibold">{"\"Shalini Vithanage\""}</span>
                                <span className="text-zinc-400">,</span>
                              </>
                            )}
                            {line.includes('role:') && (
                              <>
                                <span className="text-zinc-400">  role: </span>
                                <span className="text-neon-green font-semibold">{"\"Full Stack Developer\""}</span>
                                <span className="text-zinc-400">,</span>
                              </>
                            )}
                            {line.includes('stack:') && (
                              <>
                                <span className="text-zinc-400">  stack: </span>
                                <span className="text-indigo-300">[</span>
                                <span className="text-neon-green">{"\"React\""}</span>
                                <span className="text-zinc-400 font-sans">, </span>
                                <span className="text-neon-green">{"\"Next.js\""}</span>
                                <span className="text-zinc-400 font-sans">, </span>
                                <span className="text-neon-green">{"\"Node.js\""}</span>
                                <span className="text-zinc-400 font-sans">, ...</span>
                                <span className="text-indigo-300">]</span>
                                <span className="text-zinc-400 font-sans">,</span>
                              </>
                            )}
                            {line.includes('focus:') && (
                              <>
                                <span className="text-zinc-400">  focus: </span>
                                <span className="text-neon-green">{"\"Building real-world web solutions\""}</span>
                              </>
                            )}
                            {line === '};' && (
                              <span className="text-yellow-400">{`};`}</span>
                            )}
                          </span>
                        </p>
                      ))}
                    </div>

                    {/* Cursor interactive active typing line */}
                    {activeLine < codeSnippetLines.length && (
                      <div className="flex items-center gap-3 bg-zinc-950/40 py-1 border-y border-zinc-900/60 leading-relaxed font-semibold">
                        <span className="text-neon-green w-3 text-right text-[10px] select-none animate-pulse">{activeLine + 1}</span>
                        <div className="flex items-center">
                          {codeSnippetLines[activeLine].startsWith('const') && (
                            <>
                              <span className="text-sky-450">const </span>
                              <span className="text-amber-300 ml-1">developer </span>
                              <span className="text-white ml-1">= </span>
                              <span className="text-yellow-400">{`{`}</span>
                            </>
                          )}
                          {!codeSnippetLines[activeLine].startsWith('const') && !codeSnippetLines[activeLine].startsWith('}') && (
                            <span className="text-neon-green">{typedText}</span>
                          )}
                          {codeSnippetLines[activeLine] === '};' && (
                            <span className="text-yellow-400">{`};`}</span>
                          )}
                          <span className="w-1.5 h-3.5 bg-neon-green ml-1 animate-blink inline-block" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Active Simulated Build Code Compilation Panel */}
                  <div className="bg-zinc-950 p-2.5 rounded border border-zinc-900 space-y-1.5 mt-2">
                    <div className="flex items-center justify-between text-[10px] text-zinc-500 uppercase tracking-widest border-b border-zinc-900/80 pb-1.5">
                      <span className="flex items-center gap-1 text-zinc-400">
                        <Workflow className="w-3.5 h-3.5 text-neon-green" />
                        <span>Build Terminal Console</span>
                      </span>
                      <span>guest@shalini_vithanage:~$</span>
                    </div>

                    <div className="text-[11px] font-mono whitespace-nowrap min-h-[36px] flex flex-col justify-center">
                      <AnimatePresence mode="wait">
                        {isCompiling && (
                          <motion.p 
                            key="compiling"
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            exit={{ opacity: 0 }}
                            className="text-amber-300 animate-pulse flex items-center gap-1.5"
                          >
                            <span>$ TSC COMPILING SOURCES... PLEASE WAIT...</span>
                          </motion.p>
                        )}
                        {compileSuccess && !isCompiling && (
                          <motion.div 
                            key="success"
                            initial={{ scale: 0.95, opacity: 0 }} 
                            animate={{ scale: 1, opacity: 1 }} 
                            exit={{ opacity: 0 }}
                            className="text-neon-green font-bold flex items-center gap-2"
                          >
                            <Check className="w-4 h-4 text-neon-green shrink-0 bg-dark-green/30 border border-neon-green p-0.5 rounded-full" />
                            <span>COMPILATION COMPLETED. 0 ERRORS. DEPLOYED TO EDGE.</span>
                          </motion.div>
                        )}
                        {!isCompiling && !compileSuccess && (
                          <motion.p 
                            key="idle"
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }}
                            className="text-zinc-550 italic"
                          >
                            &gt; Code editor typing simulation running in loops...
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                </div>
              </div>

              {/* IDE Bottom status indicator bar */}
              <div className="bg-[#121214] border-t border-zinc-800/80 px-3 py-1.5 flex items-center justify-between font-mono text-[9px] text-zinc-500 bg-gradient-to-r from-zinc-950 to-zinc-900">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 bg-dark-green/20 px-1.5 py-0.5 rounded border border-neon-green/20 text-neon-green font-bold uppercase select-none">
                    <GitBranch className="w-3 h-3 text-neon-green" />
                    <span>main</span>
                  </div>
                  <span className="hidden xs:inline">-- REPO_STABLE</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className="hidden sm:inline">Ln {activeLine + 1}, Col {typedText.length + 1}</span>
                  <span className="w-[1.5px] h-3 bg-zinc-800" />
                  <span>LF</span>
                  <span className="w-[1.5px] h-3 bg-zinc-800" />
                  <span>TypeScript JSX</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
