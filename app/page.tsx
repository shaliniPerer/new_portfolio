'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { 
  Code2, 
  Menu, 
  X, 
  FileCode, 
  Cpu, 
  GitBranch
} from 'lucide-react';

/* Lazy loaded modular sub-sections built previously */
import TerminalHero from '@/components/TerminalHero';
import AboutCodeEditor from '@/components/AboutCodeEditor';
import SkillsCliTags from '@/components/SkillsCliTags';
import ProjectsDeck from '@/components/ProjectsDeck';
import ExperienceCommitTree from '@/components/ExperienceCommitTree';
import ServicesStatusGrid from '@/components/ServicesStatusGrid';
import ContactTerminalForm from '@/components/ContactTerminalForm';
import FooterTerminalShell from '@/components/FooterTerminalShell';
import CyberBackground from '@/components/CyberBackground';

type TabKey = 'home' | 'about' | 'skills' | 'projects' | 'experience' | 'services' | 'contact';

interface NavTab {
  key: TabKey;
  label: string;
  icon: string;
}

export default function Page() {
  const [activeTab, setActiveTab] = useState<TabKey>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Ensure page always starts at top on load
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  // Monitor reading scrolls to update current active visual indicators
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const tabs: NavTab[] = [
    { key: 'home', label: 'home.sh', icon: 'sh' },
    { key: 'about', label: 'about.json', icon: 'json' },
    { key: 'skills', label: 'skills.cmd', icon: 'cmd' },
    { key: 'projects', label: 'projects.yml', icon: 'yml' },
    { key: 'experience', label: 'experience.git', icon: 'git' },
    { key: 'services', label: 'services.py', icon: 'py' },
    { key: 'contact', label: 'contact.ts', icon: 'ts' }
  ];

  const handleScrollToId = (id: string) => {
    setMobileMenuOpen(false);
    setActiveTab(id as TabKey);
    const element = document.getElementById(id);
    if (element) {
      // Smooth scroll offsets taking sticky navbar into account
      const offset = 64; 
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-transparent text-[#d4d4d8] font-sans selection:bg-neon-green/30 selection:text-white relative opacity-100">
      
      {/* Elegantly animated full-screen background backdrop */}
      <CyberBackground />
      
      {/* Laser reading progress indicator */}
      <motion.div 
        id="scroll-laser-progress"
        style={{ scaleX }} 
        className="fixed top-0 left-0 right-0 h-0.5 bg-neon-green origin-left z-50 shadow-[0_0_8px_#86efac]" 
      />

      {/* Sticky IDE tab-header navigation bar */}
      <nav id="ide-top-nav" className="sticky top-0 z-40 bg-[#020202]/90 border-b border-zinc-900 backdrop-blur-md">
        <div className="container mx-auto px-4 w-full max-w-7xl flex items-center justify-between h-14">
          
          {/* Brand logo */}
          <div className="flex items-center gap-2 font-mono text-sm tracking-tight text-white cursor-pointer select-none" onClick={() => handleScrollToId('home')}>
            <Code2 className="w-5 h-5 text-neon-green" />
            <span className="font-bold">DEV_ENV://</span>
            <span className="text-zinc-300 font-normal">shalini_Vithanage</span>
          </div>

          {/* Desktop Visual files tabs */}
          <div className="hidden lg:flex items-stretch h-full font-mono text-xs text-zinc-500">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  id={`nav-tab-${tab.key}`}
                  onClick={() => handleScrollToId(tab.key)}
                  className={`px-3.5 flex items-center gap-1.5 border-r border-zinc-900 transition-all cursor-pointer relative h-full ${
                    isActive 
                      ? 'bg-black text-neon-green font-semibold border-b-2 border-b-neon-green' 
                      : 'hover:text-zinc-200 hover:bg-zinc-950/50'
                  }`}
                >
                  <FileCode className={`w-3.5 h-3.5 ${isActive ? 'text-neon-green' : 'text-zinc-700'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Call to action anchor */}
          <div className="hidden lg:flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
            <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest select-none">Uptime: 100% OK</span>
          </div>

          {/* Responsive Mobile Toggle */}
          <button
            id="mobile-nav-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1 rounded text-zinc-400 hover:text-white cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Dynamic Mobile Menu drawers */}
        {mobileMenuOpen && (
          <div id="mobile-menu-drawer" className="lg:hidden absolute top-14 left-0 right-0 bg-black border-b border-zinc-900 p-4 space-y-2 flex flex-col font-mono text-sm z-30">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  id={`mobile-nav-tab-${tab.key}`}
                  onClick={() => handleScrollToId(tab.key)}
                  className={`w-full text-left px-3 py-2.5 rounded-md flex items-center gap-2.5 transition cursor-pointer ${
                    isActive 
                      ? 'bg-[#154622]/30 text-neon-green border border-neon-green/20' 
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-950/40'
                  }`}
                >
                  <FileCode className={`w-4 h-4 ${isActive ? 'text-neon-green' : 'text-zinc-650'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}

            <div className="border-t border-zinc-900/60 pt-3 mt-2 flex items-center justify-between text-[11px] text-zinc-500">
              <span>Hiring Status: Host Available</span>
              <span className="text-neon-green font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-neon-green rounded-full" /> Live online
              </span>
            </div>
          </div>
        )}
      </nav>

      {/* Main Single-Screen Dash Layout Content Blocks */}
      <main id="portal-canvas-blocks">
        <TerminalHero />
        <AboutCodeEditor />
        <SkillsCliTags />
        <ProjectsDeck />
        <ExperienceCommitTree />
        <ServicesStatusGrid />
        <ContactTerminalForm />
      </main>

      {/* Footer Interpreter console */}
      <FooterTerminalShell />

    </div>
  );
}
