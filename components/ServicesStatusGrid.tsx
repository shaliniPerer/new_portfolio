'use client';

import React, { useState, useEffect } from 'react';
import { Cpu, Terminal, Network, Shield, Settings, Activity } from 'lucide-react';

interface ServiceBox {
  id: string;
  codename: string;
  title: string;
  capabilities: string[];
  description: string;
  threadCount: number;
}

export default function ServicesStatusGrid() {
  const [activeSubsystem, setActiveSubsystem] = useState<string | null>('sub1');
  const [systemUptime, setSystemUptime] = useState<number>(100021);

  // Increment simulated uptime
  useEffect(() => {
    const timer = setInterval(() => {
      setSystemUptime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const services: ServiceBox[] = [
    {
      id: 'sub1',
      codename: 'scale-frontend-node',
      title: 'Frontend Engineering',
      capabilities: ['Single Page Applications', 'SSR App Router optimization', 'Tailwind custom theme models', 'Zero bundle clutter design'],
      description: 'Delivering highly interactive client layouts utilizing responsive design models, clean animations (motion), and high Lighthouse performance optimization.',
      threadCount: 24
    },
    {
      id: 'sub2',
      codename: 'scalability-backend-workers',
      title: 'Backend API Pipelines',
      capabilities: ['Secure Token Gateways', 'Robust Route Controllers', 'Optimized Database Indexing', 'Event Loop Rate limits'],
      description: 'Developing stateless, highly scalable RESTful microservices. Leveraging express routing algorithms and atomic persistence indexes to serve millions of operations safely.',
      threadCount: 42
    },
    {
      id: 'sub3',
      codename: 'enterprise-solution-core',
      title: 'Full Stack Orchestration',
      capabilities: ['Robust decoupled components', 'Shared Typescript schemas', 'Security verification keys', 'Persistent user profiles'],
      description: 'Assembling complete web platforms connecting client designs cleanly to database persistence logic, utilizing state persistence (local storage/Firestore) and JWT checks.',
      threadCount: 16
    },
    {
      id: 'sub4',
      codename: 'monitoring-analytics-deck',
      title: 'Metrics & Admin Dashboards',
      capabilities: ['Data Visualization', 'Interactive SVG plots', 'Active cluster tracking', 'Dynamic JSON feeds'],
      description: 'Constructing robust admin telemetry interfaces with detailed real-time monitoring charts, customizable tables, and layout modules.',
      threadCount: 18
    },
    {
      id: 'sub5',
      codename: 'lambda-serverless-edge',
      title: 'Cloud Deployment Architectures',
      capabilities: ['AWS Lambda triggers', 'Nginx Proxies config', 'Docker compose containers', 'Standalone static compilation'],
      description: 'Configuring safe cloud infrastructures across AWS nodes and Cloud Run services, ensuring stable asset content delivery and zero configuration server latency.',
      threadCount: 12
    },
    {
      id: 'sub6',
      codename: 'patch-diagnostics-kernel',
      title: 'Bug Fixing & Architecture Cleanups',
      capabilities: ['Test Harness implementations', 'Strict ESLint validation', 'Infinite re-render elimination', 'Typescript safety integration'],
      description: 'Debugging and streamlining sluggish codebases. Restructuring legacy structures, decoupling dependencies, and implementing standard type validations to arrest potential crashes.',
      threadCount: 8
    }
  ];

  return (
    <section id="services" className="py-20 bg-transparent relative border-b border-zinc-800/80 code-grid">

      <div className="container mx-auto px-4 w-full max-w-7xl">
        
        {/* Section Heading */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono text-xs text-neon-green">
              <span>$ systemctl status subsystems</span>
              <span className="w-1.5 h-3 bg-neon-green animate-blink" />
            </div>
            <h2 className="text-3xl md:text-4xl font-mono text-white tracking-tight">
              ~/active_services
            </h2>
            <div className="w-20 h-1 bg-neon-green mt-3 shadow-sm rounded-full" />
          </div>

          <div className="font-mono text-xs text-zinc-500 bg-zinc-950 p-2 rounded border border-zinc-950 flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 bg-neon-green rounded-full animate-ping" />
            <span>CLUSTER_UPTIME: {systemUptime.toLocaleString()}s (100% OK)</span>
          </div>
        </div>

        {/* Services DevOps Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc) => {
            const isSelected = activeSubsystem === svc.id;
            return (
              <div
                key={svc.id}
                onClick={() => setActiveSubsystem(svc.id)}
                className={`group relative flex flex-col justify-between border rounded-xl p-6 transition-all duration-300 cursor-pointer select-none ${
                  isSelected 
                    ? 'border-neon-green/50 bg-[#050507]/60 backdrop-blur-md shadow-[0_0_24px_rgba(134,239,172,0.1)]' 
                    : 'border-zinc-900 bg-zinc-950/30 backdrop-blur-sm hover:border-zinc-800 hover:bg-zinc-950/50'
                }`}
              >
                {/* Header Codename styling */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-[9px] font-mono tracking-widest text-[#71717a] uppercase pb-2.5 border-b border-zinc-900">
                    <span className="flex items-center gap-1.5 font-semibold text-zinc-400 min-w-0 overflow-hidden">
                      <Settings className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-neon-green animate-spin' : 'text-zinc-700'}`} style={{ animationDuration: '6s' }} />
                      <span className="truncate">CONTAINER://{svc.codename}</span>
                    </span>
                    
                    <span className="text-neon-green font-bold flex items-center gap-1">
                      <span className="w-1 h-1 bg-neon-green rounded" />
                      SYS_READY
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base sm:text-lg font-mono font-bold text-white group-hover:text-neon-green transition-colors">
                      {svc.title}
                    </h3>
                    
                    <p className="text-zinc-400 text-xs sm:text-xs font-sans mt-2.5 leading-relaxed">
                      {svc.description}
                    </p>
                  </div>

                  {/* Capabilities List outputs */}
                  <div className="space-y-1.5 pt-2">
                    {svc.capabilities.map((cap, capIdx) => (
                      <div key={capIdx} className="flex items-center gap-2 text-[11px] font-mono text-zinc-500 font-medium">
                        <span className="text-neon-green font-bold">+</span>
                        <span className="text-zinc-455">{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer simulation metrics */}
                <div className="mt-6 pt-3 border-t border-zinc-900 flex items-center justify-between font-mono text-[9px] text-zinc-550">
                  <span className="flex items-center gap-1">
                    <Cpu className="w-3.5 h-3.5 text-zinc-700" />
                    Threads: {svc.threadCount}
                  </span>

                  <span className="flex items-center gap-1.5 text-neon-green font-semibold">
                    <Activity className="w-4 h-4 animate-pulse text-neon-green" />
                    Load: Core Active
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
