'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FileCode, Folder, ChevronRight, HardDrive, CheckCircle2, Award, Terminal } from 'lucide-react';

type FileKey = 'profile.json' | 'philosophy.ts' | 'runtime.env';

interface FileContent {
  language: string;
  lines: string[];
}

export default function AboutCodeEditor() {
  const [activeFile, setActiveFile] = useState<FileKey>('profile.json');

  const files: Record<FileKey, FileContent> = {
    'profile.json': {
      language: 'json',
      lines: [
        '{',
        '  "name": "Shalini Vithanage",',
        '  "education": "B.Sc.(Joint Major)Computing and Information Systems and Statistics",',
        '  "specialization": "Full Stack Web Development",',
        '  "frontend": ["React", "Next.js", "Tailwind CSS", "JavaScript", "TypeScript"],',
        '  "backend": ["Node.js", "Express.js", "FastAPI", "Python"],',
        '  "databases": ["MongoDB", "MySQL", "Firebase", "DynamoDB"],',
        '  "deployment": ["VPS", "CloudPanel", "Nginx", "PM2"],',
        '  "interest": "Creating practical, scalable, and professional web systems"',
        '}'
      ]
    },
    'philosophy.ts': {
      language: 'typescript',
      lines: [
        'import { FullStackDeveloper } from "@shalini/core";',
        '',
        'export class DevelopmentPhilosophy extends FullStackDeveloper {',
        '  readonly coreRule = "Build clean, practical, and user-friendly systems.";',
        '',
        '  /**',
        '   * Orchestrate high-fidelity systems with robust backend pipelines',
        '   */',
        '  async deploySystem() {',
        '    return {',
        '      environment: ["VPS", "CloudPanel", "Nginx", "PM2"],',
        '      dataIntegrity: ["MongoDB", "MySQL", "Firebase", "DynamoDB"],',
        '      apis: "Robust and secure REST routing"',
        '    };',
        '  }',
        '}'
      ]
    },
    'runtime.env': {
      language: 'yaml',
      lines: [
        '# Developer Active Environment Specifications',
        'RUNTIME_ENV: Production',
        'DEVT_LANGUAGE: TypeScript 5.x',
        'FRONTEND_CORE: Next.js 15+ (App Router, Server Components)',
        'STYLING_ENGINE: Tailwind CSS v4 (Full @theme Optimization)',
        'PRIMARY_DATABASE: Firestore + Firebase Authentication APIs',
        'CONTAINER_HOST: Cloud Run Nodes (Nginx Reverse Proxy Ready)',
        'LOG_VERBOSITY: High-Performance Diagnostic Output',
        'MONITORING: OpenTelemetry + Realtime Uptime Heartbeat'
      ]
    }
  };

  return (
    <section id="about" className="py-20 bg-transparent relative border-b border-zinc-800/80 code-grid">

      <div className="container mx-auto px-4 w-full max-w-7xl">
        {/* Section Heading */}
        <div className="mb-14">
          <div className="flex items-center gap-2 mb-2 font-mono text-xs text-neon-green">
            <span>$ cat info/about.md</span>
            <span className="w-1.5 h-3 bg-neon-green animate-blink" />
          </div>
          <h2 className="text-3xl md:text-4xl font-mono text-white tracking-tight">
            ~/about_me
          </h2>
          <div className="w-20 h-1 bg-neon-green mt-3 shadow-sm rounded-full mb-8" />
          
          {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl font-sans">
            <div className="space-y-4">
              <p className="text-zinc-350 text-sm md:text-[15px] leading-relaxed">
                I am a Full Stack Developer with a strong interest in creating complete web applications from frontend design to backend development and deployment. I have worked on projects such as tourism platforms, POS systems, learning management systems, hostel management systems, admin dashboards, and AI-based applications.
              </p>
            </div>
            <div className="space-y-4">
              <p className="text-zinc-400 text-sm md:text-[15px] leading-relaxed">
                I have hands-on experience with React, Next.js, Node.js, Express.js, MongoDB, MySQL, Firebase, and API development. I also have experience deploying applications using VPS hosting, CloudPanel, Nginx, PM2, and Vercel.
              </p>
              <p className="text-neon-green text-sm font-medium font-mono flex items-center gap-2">
                <span className="animate-pulse">&gt;</span> Focus: Building clean, responsive, secure, and user-friendly systems.
              </p>
            </div>
          </div> */}
        </div>

        {/* IDE UI Representation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* File Explorer Sidebar - Left Column */}
          <div className="lg:col-span-4 border border-zinc-800 bg-[#09090b] rounded-lg p-4 font-mono text-sm border-glow">
            <div className="flex items-center gap-2 text-zinc-400 text-xs uppercase font-semibold pb-3 mb-3 border-b border-zinc-900">
              <HardDrive className="w-3.5 h-3.5 text-neon-green" />
              <span>Project Files Explorer</span>
            </div>

            <div className="space-y-4">
              <div>
                <div id="dir-portfolio" className="flex items-center gap-2 text-zinc-400 font-medium pb-2 select-none">
                  <ChevronRight className="w-3.5 h-3.5 text-zinc-500" />
                  <Folder className="w-4 h-4 text-emerald-500" />
                  <span>shalini_vithanage_workspace</span>
                </div>
                
                <div className="pl-6 space-y-1">
                  {(Object.keys(files) as FileKey[]).map((fileName) => {
                    const isActive = activeFile === fileName;
                    return (
                      <button
                        key={fileName}
                        id={`file-tab-${fileName.replace('.', '-')}`}
                        onClick={() => setActiveFile(fileName)}
                        className={`w-full flex items-center gap-2 px-3 py-2 rounded text-left transition-colors duration-200 cursor-pointer ${
                          isActive 
                            ? 'bg-dark-green/30 border border-neon-green/20 text-neon-green text-glow-subtle' 
                            : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/40'
                        }`}
                      >
                        <FileCode className={`w-3.5 h-3.5 ${isActive ? 'text-neon-green' : 'text-zinc-500'}`} />
                        <span>{fileName}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Extra System Metric Badges */}
              <div className="border-t border-zinc-900 pt-4 mt-2 space-y-3">
                <div className="p-3 bg-zinc-950 rounded-md border border-zinc-900/80 space-y-2">
                  <div className="flex items-center gap-2 text-zinc-400 text-xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-neon-green" />
                    <span>Unit Test Success</span>
                  </div>
                  <div className="w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-neon-green h-full w-[100%]" />
                  </div>
                  <p className="text-[10px] text-zinc-500">124 / 124 passing checks (100% stable)</p>
                </div>

                <div className="p-3 bg-zinc-950 rounded-md border border-zinc-900/80 space-y-2">
                  <div className="flex items-center gap-2 text-zinc-400 text-xs">
                    <Award className="w-3.5 h-3.5 text-neon-green" />
                    <span>System Architecture</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 leading-normal">
                    Designed around reusable React elements, isolated styled modules, and robust asynchronous data pipelines to ensure extreme browser performance.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Active File Code Editor View - Right Column */}
          <div className="lg:col-span-8 flex flex-col">
            <div className="border border-zinc-800 bg-[#09090b] rounded-lg shadow-2xl overflow-hidden flex flex-col border-glow">
              
              {/* Editor Tabs list */}
              <div className="bg-[#121214] border-b border-zinc-800 flex items-center justify-between px-4 overflow-hidden">
                <div className="flex overflow-x-auto min-w-0 flex-1">
                  {(Object.keys(files) as FileKey[]).map((fileName) => {
                    const isActive = activeFile === fileName;
                    return (
                      <button
                        key={fileName}
                        onClick={() => setActiveFile(fileName)}
                        className={`px-3 sm:px-4 py-3 font-mono text-xs text-left border-r border-zinc-800 flex items-center gap-2 transition-all duration-200 cursor-pointer relative shrink-0 ${
                          isActive 
                            ? 'bg-[#09090b] text-neon-green border-t-2 border-t-neon-green font-medium' 
                            : 'bg-transparent text-zinc-500 hover:text-zinc-300'
                        }`}
                      >
                        <span>{fileName}</span>
                      </button>
                    );
                  })}
                </div>
                
                <div className="flex items-center gap-2 py-2">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest hidden sm:inline">UTF-8 // typescript</span>
                  <div className="w-2 h-2 rounded-full bg-neon-green" />
                </div>
              </div>

              {/* Editor Code Pane with lines numbers */}
              <div className="p-5 font-mono text-xs sm:text-sm overflow-x-auto min-h-[360px] bg-[#070708] flex items-stretch">
                <div className="text-zinc-600 select-none border-r border-zinc-900 pr-4 mr-4 space-y-1 text-right min-w-[24px]">
                  {files[activeFile].lines.map((_, index) => (
                    <div key={index}>{index + 1}</div>
                  ))}
                </div>

                <div className="flex-1 space-y-1">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeFile}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.18 }}
                      className="space-y-1"
                    >
                      {files[activeFile].lines.map((line, index) => {
                        // Custom syntax coloring depending on type
                        let coloredLine = <span className="text-zinc-300">{line}</span>;

                        if (activeFile === 'profile.json') {
                          // Quick custom color parsing rules for JSON keys
                          const regex = /(".*?")(\s*:\s*)(.*)/;
                          const match = line.match(regex);
                          if (match) {
                            const isValueString = match[3].startsWith('"');
                            const isValueStatusActive = match[3].includes('ACTIVE');
                            
                            coloredLine = (
                              <span>
                                <span className="text-emerald-400 font-medium">{match[1]}</span>
                                <span className="text-zinc-400">{match[2]}</span>
                                <span className={isStatusHighlight(match[3])}>{match[3]}</span>
                              </span>
                            );
                          }
                        } else if (activeFile === 'philosophy.ts') {
                          // Very basic TS color representation
                          if (line.startsWith('import') || line.startsWith('export') || line.startsWith('class') || line.startsWith('readonly') || line.startsWith('async') || line.startsWith('return') || line.includes('if ') || line.includes('throw ')) {
                            const words = line.split(' ');
                            coloredLine = (
                              <span>
                                {words.map((w, idx) => {
                                  const isKeyword = ['import', 'export', 'class', 'readonly', 'async', 'return', 'if', 'throw', 'new', 'extends', 'static'].includes(w.replace('(', '').replace(')', ''));
                                  return (
                                    <span key={idx} className={isKeyword ? 'text-pink-400 font-medium' : 'text-zinc-300'}>
                                      {w}{idx < words.length - 1 ? ' ' : ''}
                                    </span>
                                  );
                                })}
                              </span>
                            );
                          } else if (line.startsWith('  /**') || line.startsWith('   *') || line.startsWith('   */')) {
                            coloredLine = <span className="text-emerald-600 font-mono italic">{line}</span>;
                          }
                        } else if (activeFile === 'runtime.env') {
                          // Env formatting
                          if (line.startsWith('#')) {
                            coloredLine = <span className="text-zinc-500 italic">{line}</span>;
                          } else {
                            const splitIdx = line.indexOf(':');
                            if (splitIdx > -1) {
                              coloredLine = (
                                <span>
                                  <span className="text-sky-400 font-medium">{line.substring(0, splitIdx)}</span>
                                  <span className="text-zinc-400">:</span>
                                  <span className="text-neon-green">{line.substring(splitIdx + 1)}</span>
                                </span>
                              );
                            }
                          }
                        }

                        return (
                          <div key={index} className="whitespace-pre">
                            {coloredLine}
                          </div>
                        );
                      })}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Status footer bar resembling VS Code */}
              <div className="bg-[#121214] border-t border-zinc-800 px-4 py-2 flex items-center justify-between text-[11px] text-zinc-500 font-mono">
                <div className="flex items-center gap-3">
                  <span className="text-neon-green flex items-center gap-1">
                    <Terminal className="w-3.5 h-3.5" />
                    STATUS: READY
                  </span>
                  <span>Branch: <span className="text-zinc-300">main</span></span>
                </div>
                <div className="flex items-center gap-3">
                  <span>Lines: {files[activeFile].lines.length}</span>
                  <span>TypeScript 5.x</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

function isStatusHighlight(val: string): string {
  if (val.includes('ACTIVE')) return 'text-neon-green font-bold text-glow-subtle';
  if (val.includes('Candidate') || val.includes('Lead')) return 'text-sky-400';
  if (val.startsWith('"')) return 'text-amber-300';
  return 'text-zinc-300';
}
