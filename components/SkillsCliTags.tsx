'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Download, Code, Cpu, ShieldAlert, BadgeCheck } from 'lucide-react';

interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'apis';
  description: string;
  command: string;
  mockInstallOutput: string[];
  vibeText: string;
}

const skills: Skill[] = [
  {
    name: 'React',
    category: 'frontend',
    description: 'Declarative component-driven user interface engine.',
    command: 'npm install react@19',
    vibeText: 'Concurrency & Server Actions integration optimized.',
    mockInstallOutput: [
      'Downloading react@19 - [1.2MB]',
      'Configuring virtual DOM diff systems...',
      'Linking React Fiber structures...',
      'Installed react@19.0.0 successfully!'
    ]
  },
  {
    name: 'Next.js',
    category: 'frontend',
    description: 'The React Framework for high-performance production.',
    command: 'npx create-next-app@latest',
    vibeText: 'App Router layout systems, SSR-optimized pipelines, and Standalone Builds.',
    mockInstallOutput: [
      'Locating Next.js 15 App router templates...',
      'Optimizing bundle compression parameters...',
      'Injecting standalone compiler hooks...',
      'Next.js 15 loaded — static asset caching ready!'
    ]
  },
  {
    name: 'TypeScript',
    category: 'frontend',
    description: 'Strict type safety with native compiler safety.',
    command: 'npm install -D typescript',
    vibeText: 'Stops runtime crashes entirely before code gets committed.',
    mockInstallOutput: [
      'Spinning up tsconfig compiler context...',
      'Analyzing interfaces, generic models, and strict nulls...',
      'Build compilation success. 0 compilation errors.'
    ]
  },
  {
    name: 'Tailwind CSS',
    category: 'frontend',
    description: 'Utility-first utility CSS layout system.',
    command: 'npm install tailwindcss @tailwindcss/postcss',
    vibeText: 'Engineered using lightning-fast CSS @import theme extensions.',
    mockInstallOutput: [
      'Importing tailwindcss utilities...',
      'Parsing custom developer neon @theme directives...',
      'Generated index CSS build size reduced to < 18Kb!'
    ]
  },
  {
    name: 'Node.js',
    category: 'backend',
    description: 'Server asynchronous JavaScript engine.',
    command: 'curl -fsSL https://nodejs.org',
    vibeText: 'Extremely scalable event loop architecture for non-blocking execution.',
    mockInstallOutput: [
      'Configuring event loop polling socket layers...',
      'Testing microservice latency thresholds...',
      'System cluster instance fully initialized.'
    ]
  },
  {
    name: 'Express.js',
    category: 'backend',
    description: 'Minimalist robust web controller framework.',
    command: 'npm install express',
    vibeText: 'Engineered for lightweight REST micro-frontends & OAuth proxying.',
    mockInstallOutput: [
      'Binding express.Router core configurations...',
      'Configuring CORS credentials & body parsers...',
      'Sub-route controllers instantiated.'
    ]
  },
  {
    name: 'MongoDB',
    category: 'database',
    description: 'Highly agile document-oriented persistence engine.',
    command: 'docker run --name mongo -d mongodb',
    vibeText: 'BSON format records, atomic aggregation models, and custom pipelines.',
    mockInstallOutput: [
      'Connecting dynamic cluster shard collections...',
      'Instantiating index structures for high retrieval...',
      'DB Connection Status: SECURE_ESTABLISHED.'
    ]
  },
  {
    name: 'MySQL',
    category: 'database',
    description: 'Relational database persistence manager.',
    command: 'mysql -u admin -p',
    vibeText: 'Transactional ACID safety, index indexing, query optimizations.',
    mockInstallOutput: [
      'Initializing pool of active connections...',
      'Mapping nested table relationships...',
      'Configured schema structure checks: 100% OK.'
    ]
  },
  {
    name: 'Firebase',
    category: 'devops',
    description: 'Firestore real-time DB & auth system setup.',
    command: 'npm install firebase@latest',
    vibeText: 'Subsecond persistence, security state bindings, serverless scaling.',
    mockInstallOutput: [
      'Bootstrapping firestore.rules permission matrix...',
      'Validating token authentication handlers...',
      'Firebase instance initialized. Sandbox ready.'
    ]
  },
  {
    name: 'AWS',
    category: 'devops',
    description: 'Cloud infrastructure provider & lambda serverless setup.',
    command: 'aws configure --profile production',
    vibeText: 'Multi-region deployments, EC2, IAM policies, and VPC routing configs.',
    mockInstallOutput: [
      'Querying active S3 buckets & Cloudfront mirrors...',
      'Validating AWS credentials and security keys...',
      'AWS Systems fully logged, edge networks functional.'
    ]
  },
  {
    name: 'REST API',
    category: 'apis',
    description: 'Stateless endpoints routing standard.',
    command: 'curl -i -X GET /api/v1/health',
    vibeText: 'High-speed JSON responses with correct HTTP standard headers.',
    mockInstallOutput: [
      'Parsing custom request router path mappings...',
      'Processing request headers & token validation...',
      'HTTP/1.1 200 OK — speed metrics matched.'
    ]
  },
  {
    name: 'Git',
    category: 'devops',
    description: 'Distributed repository tracker.',
    command: 'git commit -m "feat: push core code to production"',
    vibeText: 'Mastery over git rebase, cherry-pick, branch strategy, and actions.',
    mockInstallOutput: [
      'Scanning workspace edits...',
      'Compressing diff trees and blobs...',
      'Branch main synchronized. Build pipelines launched!'
    ]
  }
];

export default function SkillsCliTags() {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(skills[0]);
  const [installing, setInstalling] = useState(false);
  const [installProgress, setInstallProgress] = useState<string[]>([]);

  const runInstallSimulation = (skill: Skill) => {
    if (installing) return;
    
    setSelectedSkill(skill);
    setInstalling(true);
    setInstallProgress([]);

    const output = skill.mockInstallOutput;
    let index = 0;

    const animateOutput = () => {
      if (index < output.length) {
        setInstallProgress((prev) => [...prev, output[index]]);
        index++;
        setTimeout(animateOutput, 500);
      } else {
        setInstalling(false);
      }
    };

    animateOutput();
  };

  return (
    <section id="skills" className="py-20 bg-transparent relative border-b border-zinc-800/80 code-grid">

      <div className="container mx-auto px-4 w-full max-w-7xl">
        
        {/* Section Heading */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-2 font-mono text-xs text-neon-green">
            <span>$ cli search --query skills</span>
            <span className="w-1.5 h-3 bg-neon-green animate-blink" />
          </div>
          <h2 className="text-3xl md:text-4xl font-mono text-white tracking-tight">
            ~/technical_skillset
          </h2>
          <div className="w-20 h-1 bg-neon-green mt-3 shadow-sm rounded-full" />
        </div>

        {/* Skill layout containing interactive tag tags chips & the dynamic installation console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch font-sans">
          
          {/* Tech Stack Chips Block */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="space-y-6">
              <p className="text-zinc-400 text-sm md:text-base font-sans">
                Select or click on any module below to trigger an interactive CLI download simulation inside the terminal and inspect system-level capabilities:
              </p>

              {/* Categorized groups of skill cards buttons */}
              <div className="flex flex-wrap gap-3">
                {skills.map((skill) => {
                  const isCurrent = selectedSkill?.name === skill.name;
                  return (
                    <button
                      key={skill.name}
                      id={`skill-tag-${skill.name.toLowerCase().replace('.', '-')}`}
                      onClick={() => runInstallSimulation(skill)}
                      className={`font-mono text-xs cursor-pointer px-4 py-2.5 rounded-md border transition-all duration-200 uppercase tracking-wide flex items-center gap-2 ${
                        isCurrent 
                          ? 'bg-dark-green/30 border-neon-green text-neon-green text-glow-subtle' 
                          : 'bg-zinc-950/40 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-100'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${isCurrent ? 'bg-neon-green animate-ping' : 'bg-zinc-600'}`} />
                      <span>{skill.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Explanatory bottom label */}
            <div className="mt-8 p-4 bg-zinc-950/60 border border-zinc-900 rounded-lg flex items-start gap-3">
              <Cpu className="w-5 h-5 text-neon-green shrink-0 mt-0.5" />
              <div className="font-sans text-xs text-zinc-500 leading-relaxed">
                <span className="text-zinc-300 font-semibold block mb-0.5 font-mono">Modern Scalable Paradigms Built-In</span>
                Strict modular programming guidelines. Built purely using decoupled reusable components, zero unnecessary libraries, lightweight state persistence, and native browser optimizations to maximize core user metrics.
              </div>
            </div>
          </div>

          {/* CLI Installation Simulator Console - Right Column */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="border border-zinc-800 bg-[#09090b] rounded-lg shadow-2xl flex flex-col border-glow flex-1">
              
              {/* Header */}
              <div className="bg-[#121214] border-b border-zinc-800 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-zinc-400 font-mono text-xs">
                  <Terminal className="w-3.5 h-3.5 text-neon-green animate-pulse" />
                  <span>Developer Sandbox shell</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-zinc-700" />
                  <div className="w-2.5 h-2.5 rounded-full bg-neon-green/80 animate-pulse" />
                </div>
              </div>

              {/* Console Body */}
              <div className="p-5 font-mono text-xs sm:text-sm text-zinc-300 space-y-4 flex-1 flex flex-col justify-between bg-black/90">
                
                {/* Active Skill Summary */}
                {selectedSkill && (
                  <div className="space-y-3">
                    <div className="text-zinc-500 text-[11px] uppercase tracking-widest flex items-center justify-between border-b border-zinc-900 pb-2">
                      <span>Interactive Package details</span>
                      <span className="text-neon-green">{selectedSkill.category}</span>
                    </div>
                    
                    <h4 className="text-lg font-bold text-white flex items-center gap-2 text-glow-subtle">
                      <Code className="w-4 h-4 text-neon-green" />
                      {selectedSkill.name}
                    </h4>
                    
                    <p className="text-zinc-400 text-xs sm:text-xs tracking-wide leading-relaxed font-sans">
                      {selectedSkill.description}
                    </p>

                    <p className="text-neon-green/80 text-[11px] leading-relaxed italic bg-dark-green/10 border border-dark-green p-2 rounded font-sans">
                      &bull; {selectedSkill.vibeText}
                    </p>
                  </div>
                )}

                {/* Simulated CLI Terminal Command installation logs block */}
                <div className="bg-zinc-950 p-3 rounded-md border border-zinc-900 min-h-[160px] flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sky-450 text-xs">
                      <span>guest@portfolio:~$</span>
                      <span className="text-white font-semibold">
                        {selectedSkill ? selectedSkill.command : 'npm install'}
                      </span>
                    </div>

                    <div className="space-y-1 text-[11px] text-zinc-500">
                      {installProgress.map((prog, idx) => (
                        <p key={idx} className="flex items-center gap-2 text-zinc-400 font-mono">
                          <BadgeCheck className="w-3.5 h-3.5 text-neon-green shrink-0" />
                          <span>{prog}</span>
                        </p>
                      ))}
                      {installing && (
                        <p className="text-zinc-500 animate-pulse font-semibold">
                          &gt; Downloading components... PLEASE WAIT...
                        </p>
                      )}
                      {!installing && installProgress.length === 0 && selectedSkill && (
                        <p className="text-zinc-600 italic">
                          Click any technology to run installation pipeline.
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-[10px] text-zinc-500 mt-2 border-t border-zinc-900/60 pt-2 font-mono">
                    <div className="flex items-center gap-1 text-neon-green">
                      <Download className="w-3 h-3" />
                      <span>SPEED: 125 MB/s</span>
                    </div>
                    <span>|</span>
                    <span>SIZE: LIGHTWEIGHT</span>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
