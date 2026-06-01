'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ExternalLink, 
  Github, 
  Terminal, 
  Code, 
  Layers, 
  Flame, 
  Shield, 
  ArrowUpRight, 
  Sparkles, 
  Cpu, 
  FolderGit2,
  CheckCircle2,
  X,
  Database,
  Activity,
  Server,
  Code2
} from 'lucide-react';

interface Project {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  category: 'all' | 'frontend' | 'backend' | 'fullstack';
  tech: string[];
  liveUrl: string;
  imgUrl: string;
  
  serverCore: string;
  isFeatured?: boolean;
}

function getDemoLinkProps(url: string) {
  const isExternal = /^https?:\/\//.test(url);

  return {
    target: isExternal ? '_blank' : undefined,
    rel: isExternal ? 'noopener noreferrer' : undefined,
  };
}

const projects: Project[] = [
  {
    id: 'proj-1',
    name: 'NT Australian Tourism Management Consultants',
    description: 'NT Australian Tourism Management Consultants is a professional tourism consultancy dedicated to delivering innovative tourism strategies, destination development solutions, and sustainable travel management services across Australia.',
    longDescription: 'NT Australian Tourism Management Consultants is a trusted tourism consultancy specializing in tourism development, destination management, hospitality consulting, and strategic travel solutions across Australia. Our mission is to support tourism businesses, resorts, travel operators, and hospitality organizations in creating exceptional travel experiences while achieving sustainable growth and long-term success.',
    category: 'frontend',
    tech: ['React', 'Tailwind', 'JavaScript'],
    liveUrl: 'https://nttravel.dewmindi.online',
    imgUrl: '/au.png',
    
    serverCore: 'Next.js Server Actions',
  },
  {
    id: 'proj-2',
    name: 'Tourism Website for Rich Travel',
    description: 'A dynamic tourism website for Rich Travel, featuring high-density crypto telemetry tracking currency conversions, live interactive transaction curves, secure MetaMask auth hooks, and rigorous security metrics.',
    longDescription: 'Built a high-performance tourism website for Rich Travel, integrating real-time cryptocurrency price tracking, interactive transaction visualizations, and secure MetaMask authentication. The platform is optimized for speed and security, ensuring a seamless user experience while maintaining robust protection against vulnerabilities.',
    category: 'frontend',
    tech: ['Wordpress', 'HTML5', 'CSS3'],
    liveUrl: 'https://rich.thewavedigital.com.lk/',
    imgUrl: '/wordpress.png',
    
    serverCore: 'Nginx + WS Streams'
  },
  {
    id: 'proj-3',
    name: 'Dharma Deshana',
    description: 'Dharmadeshana is a dedicated platform for announcing and promoting Buddhist Dharma sermons (Dharmadeshana) taking place across Sri Lanka.',
    longDescription: 'Dharmadeshana is a comprehensive online platform designed to connect Buddhist devotees with Dharma sermons, religious discussions, and spiritual events held throughout Sri Lanka. The website provides timely announcements of upcoming Dharmadeshana programs organized by temples, monasteries, religious organizations, and Buddhist communities across the country.',
    category: 'backend',
    tech: ['Node.js', 'Express.js', 'Next.js', 'Tailwind', 'TypeScript'],
    liveUrl: 'https://dharmadeshana.lk/',
    imgUrl: '/dharma.png',
    
    serverCore: 'PM2 Live Daemon'
  },
  {
    id: 'proj-4',
    name: 'Into The Wild - Luxury Hotel',
    description: 'Into The Wild is a modern and elegant tourism website developed using Next.js, Tailwind CSS, and TypeScript.',
    longDescription: 'Into The Wild is a premium tourism and hospitality website built with Next.js, Tailwind CSS, and TypeScript, offering a fast, scalable, and highly responsive web experience. Designed with a focus on luxury, elegance, and usability, the platform enables travelers to explore accommodations, discover local attractions, view immersive galleries, and access detailed information about available experiences.',
    category: 'frontend',
    tech: ['Next.js', '', 'TypeScript', 'Tailwind CSS'],
    liveUrl: 'https://into-the-wild-seven.vercel.app',
    imgUrl: '/wild.png',
   
    serverCore: 'AudioNode Stream Engine'
  },
  {
    id: 'proj-5',
    name: 'Minds Construction Website',
    description: 'The platform showcases construction services, completed projects, and company expertise through a modern, responsive, and visually engaging design.',
    longDescription: 'Minds Construction is a modern construction and engineering website built with Next.js, Tailwind CSS, and TypeScript to establish a strong digital presence for the company. The platform highlights construction services, residential and commercial projects, engineering solutions, and company achievements through an elegant and professional interface.',
    category: 'backend',
    tech: ['Next.js', '', 'TypeScript', 'Tailwind CSS'],
    liveUrl: 'https://minds-constructions.vercel.app/',
    imgUrl: '/const.png',
    
    serverCore: 'Express 5 Security Core'
  },
  {
    id: 'proj-6',
    name: 'Minds Hotel',
    description: 'The platform provides guests with an intuitive experience for exploring accommodations, viewing amenities, and making reservations through a responsive and visually appealing interface.',
    longDescription: 'Minds Hotel is a comprehensive hospitality website built with Next.js, Tailwind CSS, and TypeScript to deliver a fast, secure, and user-friendly experience for travelers. The platform allows visitors to browse room categories, explore hotel facilities, view image galleries, and submit booking inquiries with ease.',
    category: 'fullstack',
    tech: ['Next.js', '', 'TypeScript', 'Tailwind CSS'],
    liveUrl: 'https://minds.lk/',
    imgUrl: '/minds.png',
  
    serverCore: 'WS Server Authorities'
  }
];

// High-fidelity digital "Kotu Kotu" (grid blocks) hover overlay component
function PixelHoverGrid({ isActive }: { isActive: boolean }) {
  // 6x4 Grid of square blocks
  const rows = 4;
  const cols = 6;
  const totalCells = rows * cols;

  return (
    <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 pointer-events-none transition-opacity duration-300 z-10">
      {Array.from({ length: totalCells }).map((_, index) => {
        // Calculate coordinate-based variables
        const row = Math.floor(index / cols);
        const col = index % cols;
        const delay = (row + col) * 0.04;

        return (
          <div
            key={index}
            className="border-[0.5px] border-white/5 flex items-center justify-center relative overflow-hidden"
          >
            {/* The animating outline borders (dara) in white color */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={
                isActive
                  ? { 
                      scale: [0.9, 1, 0.92, 1.02, 0.95],
                      opacity: [0, 0.5, 0.1, 0.65, 0.2] 
                    }
                  : { scale: 0.9, opacity: 0 }
              }
              transition={{
                duration: 1.5,
                repeat: isActive ? Infinity : 0,
                repeatType: 'reverse',
                delay: delay,
                ease: 'easeInOut',
              }}
              className="absolute inset-0 border border-white/20 bg-transparent"
            />
          </div>
        );
      })}
    </div>
  );
}

export default function ProjectsDeck() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'frontend' | 'backend' | 'fullstack'>('all');
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = projects.filter(
    (proj) => selectedCategory === 'all' || proj.category === selectedCategory
  );

  return (
    <section id="projects" className="py-24 bg-transparent relative border-b border-zinc-850 code-grid overflow-hidden">

      <div className="container mx-auto px-4 w-full max-w-7xl relative z-10">
        
        {/* Section Heading with high-fidelity CLI vibe */}
        <div className="mb-16 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-mono text-xs text-neon-green">
              <span>$ ls projects --filter={selectedCategory}</span>
              <span className="w-1.5 h-3.5 bg-neon-green animate-blink" />
            </div>
            <h2 className="text-3xl md:text-4xl font-mono text-white tracking-tight">
            ~/active_deployments
          </h2>
            <div className="w-24 h-1 bg-neon-green shadow-sm rounded-full" />
          </div>

          <p className="text-zinc-400 font-sans text-sm md:text-base max-w-md leading-relaxed border-l-2 border-zinc-800 pl-4">
            A curated selection of modern applications. Ranging from interactive frontend modules to secure backend controllers and high-performance databases.
          </p>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-12 border-b border-zinc-900 pb-6">
          {(['all', 'frontend', 'backend', 'fullstack'] as const).map((cat) => (
            <button
              key={cat}
              id={`filter-tab-${cat}`}
              onClick={() => setSelectedCategory(cat)}
              className={`font-mono text-xs px-4 py-2 rounded-md transition-all duration-200 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-dark-green/30 text-neon-green border border-neon-green/60 text-glow-subtle'
                  : 'bg-zinc-950/60 text-zinc-400 border border-zinc-900 hover:text-white hover:border-zinc-700'
              }`}
            >
              {`ls_category_${cat}()`}
            </button>
          ))}
        </div>

        {/* Dynamic masonry/grid system using framer-motion stagger elements */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                key={project.id}
                onMouseEnter={() => setHoveredCardId(project.id)}
                onMouseLeave={() => setHoveredCardId(null)}
                className={`group relative flex flex-col justify-between border rounded-xl overflow-hidden bg-zinc-950/40 backdrop-blur-md transition-all duration-500 hover:translate-y-[-6px] ${
                  hoveredCardId === project.id 
                    ? 'border-neon-green/70 shadow-[0_0_24px_rgba(134,239,172,0.12)]' 
                    : 'border-zinc-900'
                }`}
              >
                
                {/* Embedded spotlight visual relative position */}
                {hoveredCardId === project.id && (
                  <div className="absolute inset-0 bg-gradient-to-b from-neon-green/5 to-transparent pointer-events-none transition-opacity duration-300" />
                )}

                {/* VS Code title bar wrapper with interactive mock controls */}
                <div className="bg-[#0b0b0d] border-b border-zinc-900 px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400/50" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/50" />
                    <span className="w-2.5 h-2.5 rounded-full bg-neon-green/50 animate-pulse" />
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-zinc-500 font-mono">
                    <Terminal className="w-3 h-3 text-neon-green animate-pulse" />
                    <span className="text-zinc-450 hover:text-neon-green transition-colors cursor-pointer" onClick={() => setSelectedProject(project)}>
                      [VIEW_DETAILS]
                    </span>
                  </div>
                </div>

                {/* Main Card Content Container */}
                <div className="flex flex-col flex-1">
                  
                  {/* Container for Image Preview with overlay zoom effects */}
                  <div 
                    onClick={() => setSelectedProject(project)}
                    className="relative h-48 w-full bg-[#050505] overflow-hidden group/img cursor-pointer"
                  >
                    {/* The specialized Digital "Kotu Kotu" Pixel blocks Grid Overlay */}
                    <PixelHoverGrid isActive={hoveredCardId === project.id} />
                    
                    <Image
                      src={project.imgUrl}
                      alt={project.name}
                      fill
                      sizes="(max-width: 768px) 105vw, (max-width: 1200px) 50vw, 33vw"
                      referrerPolicy="no-referrer"
                      className="object-cover transition-all duration-700 ease-out grayscale group-hover/img:scale-105 group-hover/img:grayscale-0 group-hover:opacity-80"
                    />

                    {/* Gradient shading overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent pointer-events-none" />
                    
                    {/* Featured Tag Badge */}
                    {project.isFeatured && (
                      <div className="absolute top-3 left-3 bg-neon-green text-black text-[9px] font-mono tracking-widest uppercase font-bold py-1 px-2.5 rounded-md shadow-lg flex items-center gap-1 z-20">
                        <Sparkles className="w-2.5 h-2.5" />
                        <span>Featured</span>
                      </div>
                    )}

                    {/* Dynamic Specs stats overlay displayed neatly on top */}
                   

                  </div>

                  {/* Text Description Frame */}
                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <h3 
                        onClick={() => setSelectedProject(project)}
                        className="text-lg font-mono font-bold text-white group-hover:text-neon-green transition-colors duration-300 cursor-pointer"
                      >
                        {project.name}
                      </h3>
                      
                      <p className="text-zinc-400 text-xs sm:text-sm font-sans leading-relaxed line-clamp-3">
                        {project.description}
                      </p>
                    </div>

                    {/* Tech list tag chips */}
                    <div className="space-y-3 pt-2">
                      <span className="block font-mono text-[9px] text-zinc-500 uppercase tracking-widest">Stack Specs:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {project.tech.map((tag) => (
                          <span
                            key={tag}
                            className="font-mono text-[9px] px-2 py-1 rounded bg-zinc-950 text-zinc-455 border border-zinc-900 uppercase tracking-wider hover:border-neon-green/30 transition-colors"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>

                </div>

                {/* Actions bottom strip: Demo/Github button components */}
                <div className="bg-[#0b0b0d]/50 border-t border-zinc-900/80 p-4 flex items-center justify-between gap-4 select-none">
                 

                  <a
                    href={project.liveUrl}
                    {...getDemoLinkProps(project.liveUrl)}
                    className="flex-1 font-mono text-center text-xs py-2 bg-[#121214] hover:bg-neon-green text-neon-green hover:text-black border border-neon-green/30 hover:border-neon-green rounded transition-all duration-300 flex items-center justify-center gap-1.5 font-semibold text-glow-subtle-hover"
                  >
                    <span>Run Demo</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Informative bottom console bar */}
        <div className="mt-16 bg-zinc-950/60 border border-zinc-900 rounded-lg p-4 max-w-3xl mx-auto flex items-start gap-3.5 font-sans">
          <FolderGit2 className="w-5 h-5 text-neon-green shrink-0 mt-0.5" />
          <div className="text-xs text-zinc-500 leading-relaxed font-mono">
            <span className="text-zinc-300 block mb-1 font-bold">System Repositories Sync: STABLE</span>
            Projects listed in this portfolio are synced dynamically to continuous development builds, ensuring reliable test assertions, standalone distribution configurations, and high performance scores.
          </div>
        </div>

      </div>

      {/* LUXURIOUS INTERACTIVE PROJECT INSPECTOR MODAL POPUP */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Backdrop Blur overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            />

            {/* Modal Body container */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="relative w-full max-w-3xl bg-[#09090b] border border-neon-green/30 rounded-xl overflow-hidden shadow-[0_0_50px_rgba(134,239,172,0.15)] z-10 flex flex-col max-h-[90vh] md:max-h-[85vh]"
            >
              
              {/* Secondary glowing scanlines inside modal */}
              <div className="absolute inset-0 bg-code-grid opacity-15 pointer-events-none z-0" />
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-neon-green/30 to-transparent z-0" />

              {/* Modal window header (VS code terminal header look) */}
              <div className="relative z-10 bg-[#121214] border-b border-zinc-800/80 px-4 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-neon-green" />
                  <span className="font-mono text-xs text-zinc-300 font-bold tracking-wider">
                    SYSTEM_INSPECTOR://{selectedProject.id}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono bg-dark-green/30 text-neon-green px-2 py-0.5 rounded border border-neon-green/20">
                    STATUS_OK
                  </span>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="p-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Main Modal body content list (scrollable) */}
              <div className="relative z-10 p-6 overflow-y-auto space-y-6 flex-1 scrollbar-thin">
                
                {/* Visual Header containing image & name parameters */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  
                  {/* Selected project visualization viewport */}
                  <div className="md:col-span-4 relative h-36 w-full rounded-lg overflow-hidden border border-zinc-800">
                    <Image
                      src={selectedProject.imgUrl}
                      alt={selectedProject.name}
                      fill
                      referrerPolicy="no-referrer"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                  </div>

                  {/* Core description indices */}
                  <div className="md:col-span-8 space-y-2">
                    <span className="font-mono text-[10px] bg-neon-green/10 text-neon-green px-2 py-1 rounded tracking-wider uppercase">
                      {selectedProject.category} compilation
                    </span>
                    <h3 className="text-2xl font-mono font-bold text-white tracking-tight">
                      {selectedProject.name}
                    </h3>
                    <p className="text-zinc-400 text-xs sm:text-sm font-sans leading-relaxed">
                      {selectedProject.longDescription}
                    </p>
                  </div>

                </div>

                {/* Technical diagnostics logs parameters block */}
                <div className="bg-black border border-zinc-900 p-4 rounded-lg space-y-3.5">
                  <div className="flex items-center gap-1.5 border-b border-zinc-900/80 pb-2">
                    <Activity className="w-3.5 h-3.5 text-neon-green" />
                    <span className="font-mono text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
                      Telemetric Diagnostics / Compilation Parameters
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-[11px] text-zinc-350">
                    <div className="bg-zinc-950/80 p-2.5 rounded border border-zinc-900/60">
                      <span className="text-zinc-500 block uppercase text-[9px] mb-1">Response Speed</span>
                      <span className="text-neon-green font-bold flex items-center gap-1">
                        <Cpu className="w-3 h-3" />
                        
                      </span>
                    </div>

                    <div className="bg-zinc-950/80 p-2.5 rounded border border-zinc-900/60">
                      <span className="text-zinc-500 block uppercase text-[9px] mb-1">Execution Architecture</span>
                      <span className="text-indigo-300 font-bold flex items-center gap-1">
                        <Server className="w-3 h-3" />
                        {selectedProject.serverCore}
                      </span>
                    </div>

                    <div className="bg-zinc-950/80 p-2.5 rounded border border-zinc-900/60">
                      <span className="text-zinc-500 block uppercase text-[9px] mb-1">Automated Test Assertions</span>
                      <span className="text-amber-400 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        
                      </span>
                    </div>
                  </div>
                </div>

                {/* Detailed checklist specifications list */}
                <div className="space-y-3">
                  <span className="block font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
                    Included Packages & Technical Integrations:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((tag) => (
                      <div
                        key={tag}
                        className="font-mono text-xs px-3 py-1.5 rounded-md bg-zinc-950/90 text-zinc-300 border border-zinc-850 flex items-center gap-1.5"
                      >
                        <Code2 className="w-3 h-3 text-neon-green" />
                        <span>{tag}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Simulated live console logs pipeline */}
                <div className="bg-zinc-950 border border-zinc-900 p-4 rounded-lg space-y-1.5 font-mono text-[10px]">
                  <p className="text-zinc-500 uppercase tracking-widest text-[9px] border-b border-zinc-900 pb-1 flex items-center justify-between">
                    <span>Shell Core Output Stream</span>
                    <span>bash v5.0.18</span>
                  </p>
                  <p className="text-zinc-450">&gt; verifying manifest signature... valid checksum</p>
                  <p className="text-zinc-450">&gt; resolving framework packages dependency trees...</p>
                  <p className="text-neon-green font-semibold">&gt; launch process optimized successfully at edge router nodes (0 ms latency)</p>
                  <p className="text-zinc-450">&gt; memory footprint allocation: 28MB cache optimized buffers</p>
                </div>

              </div>

              {/* Modal buttons toolbar */}
              <div className="relative z-10 bg-[#0d0d10] border-t border-zinc-800/80 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-[10px] font-mono text-zinc-500">
                  Exit workspace explorer panel by pressing ESC or clicking backdrop
                </span>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                 

                  <a
                    href={selectedProject.liveUrl}
                    {...getDemoLinkProps(selectedProject.liveUrl)}
                    onClick={() => setSelectedProject(null)}
                    className="flex-1 sm:flex-none cursor-pointer px-4 py-2 font-mono text-xs font-bold bg-neon-green text-black border border-neon-green rounded hover:bg-emerald-400 transition shadow-[0_0_15px_rgba(134,239,172,0.2)]"
                  >
                    <span className="flex items-center justify-center gap-1.5">
                      <span>EXECUTE_DEMO()</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </a>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
