'use client';

import React, { useState } from 'react';
import { GitCommit, GitBranch, GitMerge, Terminal, Code2, Layers, Cpu } from 'lucide-react';

interface Position {
  hash: string;
  role: string;
  company: string;
  dateRange: string;
  tag?: string;
  responsibilities: string[];
  metrics: string;
}

export default function ExperienceCommitTree() {
  const [activeCommit, setActiveCommit] = useState<string | null>('c1bcf90');

  const timeline: Position[] = [
    {
      hash: 'c1bcf90',
      role: 'Full Stack Developer',
      company: 'Clickinmo Digital Solutions',
      dateRange: 'Jan 2024 - PRESENT',
      tag: 'HEAD -> main, origin/main',
      metrics: '55% page load reduction, 100% test passing ratios',
      responsibilities: [
        'Developing full-stack web applications and business systems using Next.js, Node.js, and modern web technologies.',
        'Building scalable backend services, REST APIs, cloud-based solutions, and managing deployments using AWS and CI/CD pipelines.',
        'Designing, developing, and deploying responsive websites and enterprise systems with focus on performance, security, scalability, and clean architecture.'
      ]
    },
    {
      hash: 'a90ae7e',
      role: 'Junior Full Stack Developer',
      company: 'Lush Ware',
      dateRange: 'Dec 2025 - Present',
      tag: 'origin/stable',
      metrics: 'Managed 10+ decoupled server microservices',
      responsibilities: [
        'Developed responsive and modern frontend applications using React.js, Next.js, and Tailwind CSS.',
        'Built and maintained scalable REST APIs and backend systems using Node.js, Express.js, MongoDB',
        'Collaborated with cross-functional teams to deploy applications, manage version control with GitHub'
      ]
    },
    {
      hash: 'f5cf11a',
      role: 'Freelance Web Developer',
      company: 'Self-Employed',
      dateRange: 'Jun 2025 - Present',
      metrics: 'Eliminated 80+ historic high-priority backlogs',
      responsibilities: [
        'Refactored monolithic Express endpoints into test-driven clean routing loops, incorporating Jest assertions.',
        'Managed responsive client-side visual elements using Tailwind Utility CSS classes, satisfying responsive layout targets.',
        'Integrated standard third-party telemetry, Stripe payment intents, and custom customer profiles.'
      ]
    },
    {
      hash: 'b2e041d',
      role: 'Intern Full Stack AI/ML Developer',
      company: 'Fedo Lab (PVT) Ltd.',
      dateRange: 'April 2025 - October 2025',
      metrics: 'Uptaked codebase from Bootstrap 4 to Tailwind',
      responsibilities: [
        'Designed, developed, tested, and deployed production-ready web applications using Python, JavaScript, React.js, and Next.js.',
        'Built scalable RESTful APIs and backend services using Node.js while integrating AI/ML models with TensorFlow and scikit-learn.',
        'Participated in Agile development, code reviews, debugging, performance optimization, and deployment workflows using GitHub and CI/CD practices.'
      ]
    }
  ];

  return (
    <section id="experience" className="py-24 bg-transparent relative border-b border-zinc-900 code-grid">

      <div className="container mx-auto px-4 w-full max-w-7xl">
        
        {/* Section Heading */}
        <div className="mb-14">
          <div className="flex items-center gap-2 mb-2 font-mono text-xs text-neon-green">
            <span>$ git log --oneline --graph --all</span>
            <span className="w-1.5 h-3 bg-neon-green animate-blink" />
          </div>
          <h2 className="text-3xl md:text-4xl font-mono text-white tracking-tight font-bold">
            ~/career_git_history
          </h2>
          <div className="w-20 h-1 bg-neon-green mt-3 shadow-md rounded-full" />
        </div>

        {/* Git Log Layout Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-2">
          
          {/* Interactive Commit Tree list - Left */}
          <div className="lg:col-span-5 border border-zinc-900 bg-zinc-950/40 backdrop-blur-md rounded-xl p-6 font-mono text-xs sm:text-sm flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center gap-2 justify-between mb-5 pb-3 border-b border-zinc-900 text-zinc-550 uppercase tracking-widest text-[10px]">
                <span>Interactive Commit Log</span>
                <span className="text-neon-green flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-ping" />
                  Ready
                </span>
              </div>

              {/* Graphic Timeline representations */}
              <div className="relative space-y-7 select-none">
                
                {/* Simulated vertical git line */}
                <div className="absolute left-[15px] top-4 bottom-4 w-[2px] bg-zinc-900" />

                {timeline.map((pos, idx) => {
                  const isActive = activeCommit === pos.hash;
                  return (
                    <button
                      key={pos.hash}
                      onClick={() => setActiveCommit(pos.hash)}
                      className={`relative flex items-start gap-4 text-left w-full pl-1 transition-all duration-300 cursor-pointer group ${
                        isActive ? 'text-neon-green' : 'text-zinc-500 hover:text-zinc-300'
                      }`}
                    >
                      {/* Interactive branch commit node */}
                      <div className="relative z-10 bg-black rounded-full flex items-center justify-center w-8 h-8 shrink-0 border border-zinc-900 group-hover:border-zinc-700 transition-colors">
                        <GitCommit className={`w-4 h-4 transition-all duration-300 ${isActive ? 'text-neon-green text-glow scale-110' : 'text-zinc-700'}`} />
                      </div>

                      <div className="pt-1 space-y-1">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded transition-colors duration-300 ${isActive ? 'bg-[#143a21] text-neon-green border border-neon-green/20' : 'bg-zinc-900/60 text-zinc-500 border border-transparent'}`}>
                            {pos.hash}
                          </span>
                          {pos.tag && (
                            <span className="text-[9px] text-amber-400 font-bold border border-amber-500/20 px-1.5 rounded bg-amber-500/5">
                              {pos.tag}
                            </span>
                          )}
                        </div>
                        
                        <div>
                          <p className={`font-bold transition-colors duration-300 text-xs sm:text-sm font-mono tracking-tight leading-snug ${isActive ? 'text-neon-green' : 'text-zinc-300'}`}>
                            {pos.role}
                          </p>
                          <p className="text-[10px] text-zinc-500 font-mono mt-1">
                            {pos.company}{" @ "}{pos.dateRange}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="border-t border-zinc-900 pt-4 mt-8 flex items-center gap-2 text-[10px] text-zinc-650 font-mono">
              <GitBranch className="w-3.5 h-3.5 text-zinc-700 animate-pulse" />
              <span>LOGGED // CHERRY-PICK PREVENTIONS ENABLED</span>
            </div>
          </div>

          {/* Active Commit Payload Details Display - Right */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="border border-zinc-900 bg-zinc-950/20 backdrop-blur-md rounded-xl shadow-2xl overflow-hidden flex flex-col flex-1">
              
              {/* Header */}
              <div className="bg-zinc-950/80 border-b border-zinc-900 px-5 py-4 flex items-center justify-between font-mono text-xs text-zinc-400">
                <div className="flex items-center gap-2.5">
                  <Terminal className="w-4 h-4 text-neon-green" />
                  <span>git show {activeCommit || 'c1bcf90'}</span>
                </div>
                <span className="text-zinc-550 uppercase tracking-widest text-[9px]">Diagnostics Payload</span>
              </div>

              {/* Payload Body info */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between bg-zinc-950/40">
                {timeline.map((pos) => {
                  if (pos.hash !== activeCommit) return null;
                  return (
                    <div key={pos.hash} className="space-y-6">
                      
                      {/* Meta stats block */}
                      <div className="space-y-2 border-b border-zinc-900 pb-5">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="text-zinc-550 text-[9px] uppercase font-mono tracking-wider">Active Commit SHA:</span>
                          <span className="text-neon-green font-mono text-xs font-bold">{pos.hash}</span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-mono text-white leading-tight tracking-tight">
                          {pos.role}
                        </h3>
                        <p className="text-zinc-400 text-sm font-sans font-medium flex items-center gap-2">
                          <span>{pos.company}</span>
                          <span className="text-zinc-600 font-mono text-xs">•</span>
                          <span className="text-xs font-mono text-zinc-500">{pos.dateRange}</span>
                        </p>
                      </div>

                      {/* Performance Indicators */}
                      <div className="p-4 bg-black/60 border border-zinc-900 rounded-lg space-y-1.5 font-mono text-xs">
                        <div className="text-[9px] text-zinc-500 uppercase tracking-widest flex items-center gap-1.5 mb-1">
                          <Cpu className="w-3.5 h-3.5 text-neon-green" /> KEY PERFORMANCE METRIC:
                        </div>
                        <p className="text-neon-green text-xs font-semibold leading-relaxed">{pos.metrics}</p>
                      </div>

                      {/* Responsibilities lists */}
                      <div className="space-y-3.5">
                        <span className="text-[9px] text-zinc-550 uppercase tracking-wider font-mono block">Git Change Delta Lines:</span>
                        <ul className="space-y-3">
                          {pos.responsibilities.map((resp, bIdx) => (
                            <li key={bIdx} className="flex items-start gap-3 font-sans text-xs sm:text-sm text-zinc-450 leading-relaxed">
                              <span className="text-emerald-500/95 font-mono font-bold shrink-0 select-none">+</span>
                              <span>{resp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                    </div>
                  );
                })}

                <div className="border-t border-zinc-900 pt-5 mt-8 flex items-center gap-2 text-zinc-500 font-mono text-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
                  <span className="text-[10px] text-zinc-600">Interactive history lookup complete. Review other commits.</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
