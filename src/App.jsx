import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { Rocket, Code, Cloud, Github, Linkedin, Mail, Music, VolumeX, Terminal as TerminalIcon, X, ExternalLink, Cpu, Globe, User, Telescope, ScanFace } from 'lucide-react';

// ==================================================================================
// --- 1. CONFIGURATION: EDIT EVERYTHING HERE ---
// ==================================================================================
const USER_DATA = {
  name: "Atharva Vishwas Dalvi",
  role: "AI/ML Architect & SDE",
  
  social: {
    github: "https://github.com/atharvadv", 
    linkedin: "https://www.linkedin.com/in/atharva-dalvi", 
    email: "mailto:atharvavdalvi@gmail.com"
  },

  // NOW SPLIT INTO 3 COLUMNS
  aboutColumns: [
    {
      id: 1,
      title: "THE OPERATOR",
      icon: <User className="text-cyan-400" />,
      text: "Final year ENTC student at I²IT Pune (2026). I exist at the intersection of Hardware and Artificial Intelligence. My mission is to build systems that don't just compute, but comprehend."
    },
    {
      id: 2,
      title: "THE ARCHITECT",
      icon: <Cpu className="text-purple-400" />,
      text: "Why Space? Because distributed systems are the modern cosmos. I designed this portfolio to reflect my code philosophy: vast, complex, and precise. I bridge raw neural architectures with production cloud infra."
    },
    {
      id: 3,
      title: "THE OBSERVER",
      icon: <Telescope className="text-green-400" />,
      text: "When the terminal closes, I look up. As an amateur astronomer, tracking celestial coordinates grounds me. It reminds me that even the largest datasets are small compared to the galaxy."
    }
  ],

  techStack: [
    { name: 'C++', type: 'Core' },
    { name: 'Python', type: 'AI' },
    { name: 'TensorFlow', type: 'AI' },
    { name: 'React.js', type: 'Web' },
    { name: 'AWS Cloud', type: 'Infra' },
    { name: 'Docker', type: 'DevOps' }
  ],

  projects: [
    {
      id: 1,
      title: "AI Note Generator",
      crux: "Audio/Video to Notes via LLM",
      tags: ['Python', 'OpenAI', 'React'],
      icon: <Cpu className="text-cyan-400"/>,
      details: "A comprehensive learning platform sponsored by ONESNZEROS TECH SOLUTIONS. This system ingests audio and video lectures, transcribing them with high fidelity. It then uses RAG (Retrieval-Augmented Generation) on faculty-uploaded syllabi to generate structured notes, strictly preventing global AI hallucinations by grounding answers in the provided academic context."
    },
    {
      id: 2,
      title: "Geofencing System",
      crux: "IPR Granted Security Tech",
      tags: ['IoT', 'C++', 'GPS'],
      icon: <Globe className="text-green-400"/>,
      details: "An academic project that received IPR (Intellectual Property Rights) recognition. This system utilizes GPS modules and custom hardware logic to create virtual perimeters, triggering automated security protocols when unauthorized traversals occur."
    },
    {
      id: 3,
      title: "Astronomy Log App",
      crux: "Stargazing Data Tracker",
      tags: ['Mobile', 'Data', 'UI/UX'],
      icon: <Cloud className="text-purple-400"/>,
      details: "A specialized application for amateur astronomers to log observations, track celestial coordinates, and document visibility conditions. Features a dark-mode first UI to preserve night vision during observation sessions."
    },
  ]
};

// --- ASSETS ---
const TEXTURES = {
  GALAXY: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/NGC_4414_%28NASA-med%29.jpg/1200px-NGC_4414_%28NASA-med%29.jpg",
  MARS: "https://www.solarsystemscope.com/textures/download/8k_mars.jpg",
  MOON: "https://www.solarsystemscope.com/textures/download/8k_moon.jpg",
  SUN: "https://www.solarsystemscope.com/textures/download/8k_sun.jpg" 
};

// --- CONFIG: STARS ---
const NAV_STARS = [
  { id: 0, label: "GALAXY", color: "#67e8f9", filter: "hue-rotate(180deg) brightness(1.5) contrast(1.1)", speed: "20s" },
  { id: 1, label: "ABOUT", color: "#fca5a5", filter: "hue-rotate(0deg) saturate(1.5) brightness(1.3)", speed: "40s" }, 
  { id: 2, label: "WORK", color: "#d8b4fe", filter: "hue-rotate(240deg) brightness(1.3) contrast(1.1)", speed: "25s" },
  { id: 3, label: "CONTACT", color: "#86efac", filter: "hue-rotate(90deg) brightness(1.3) contrast(1.1)", speed: "30s" },
];

const NoiseFilter = () => (
  <svg style={{ display: 'none' }}>
    <defs>
      <filter id="noiseFilter">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
    </defs>
  </svg>
);

export default function App() {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [currentOrbit, setCurrentOrbit] = useState('Galaxy');
  const [isTraversing, setIsTraversing] = useState(false); 
  const [warpColor, setWarpColor] = useState(NAV_STARS[0]); 
  const [selectedProject, setSelectedProject] = useState(null);

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });

  useEffect(() => {
    const audio = document.getElementById('space-audio');
    const enableAudio = () => { if (audio?.paused) { audio.play().catch(()=>{}); setIsMusicPlaying(true); } window.removeEventListener('click', enableAudio); };
    window.addEventListener('click', enableAudio);

    const unsubscribe = smoothProgress.onChange((v) => {
      if (v < 0.25) setCurrentOrbit('Galaxy');
      else if (v < 0.5) setCurrentOrbit('Mars');
      else if (v < 0.75) setCurrentOrbit('Moon');
      else setCurrentOrbit('Earth');
    });
    return () => { unsubscribe(); window.removeEventListener('click', enableAudio); };
  }, [smoothProgress]);

  const handleWarp = (targetIndex, starTheme) => {
    if (isTraversing) return; 
    setWarpColor(starTheme); 
    setIsTraversing(true); 
    const sections = containerRef.current?.querySelectorAll('section');
    if (sections?.[targetIndex]) {
      sections[targetIndex].scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setTimeout(() => { setIsTraversing(false); }, 1200);
  };

  return (
    <div ref={containerRef} className="relative font-sans text-gray-200 selection:bg-cyan-500/30 bg-black overflow-x-hidden">
      
      <style>{`
        @keyframes spin-galaxy { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .galaxy-spin { animation: spin-galaxy 180s linear infinite; will-change: transform; transform: translateZ(0); }
        @keyframes pulse-core { 0%, 100% { opacity: 0.3; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.05); } }
        .core-pulse { animation: pulse-core 6s ease-in-out infinite; }
      `}</style>

      <NoiseFilter />
      <audio id="space-audio" loop><source src="/space-ambient.mp3" type="audio/mpeg" /></audio>

      {/* --- BACKGROUND ENGINE --- */}
      <div className="fixed inset-0 z-0"><StarCanvas isWarping={isTraversing} /></div>

      {/* --- HUD --- */}
      <motion.nav className="fixed top-0 w-full z-50 px-6 py-6" initial={{ y: -100 }} animate={{ y: 0 }}>
        <div className="max-w-7xl mx-auto glass-card rounded-full px-8 py-4 flex justify-between items-center border border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: warpColor.color, boxShadow: `0 0 10px ${warpColor.color}` }} />
            <span className="text-sm font-light tracking-[0.2em] text-cyan-100">ORBIT: <span className="font-bold text-white">{currentOrbit.toUpperCase()}</span></span>
          </div>
          <div className="hidden md:block text-xs font-bold tracking-widest text-white/40 uppercase">System Online</div>
        </div>
      </motion.nav>

      <motion.button onClick={() => {
        const audio = document.getElementById('space-audio');
        if (audio) { isMusicPlaying ? audio.pause() : audio.play(); setIsMusicPlaying(!isMusicPlaying); }
      }} className="fixed bottom-10 left-10 z-50 glass-card p-4 rounded-full hover:bg-white/10 transition-all shadow-[0_0_20px_rgba(34,211,238,0.2)]">
        {isMusicPlaying ? <Music className="w-6 h-6 text-cyan-400"/> : <VolumeX className="w-6 h-6 text-white/50"/>}
      </motion.button>

      <div className="fixed top-24 right-12 z-50 flex flex-col gap-12 items-center">
        {NAV_STARS.map((star, index) => (
          <div key={star.id} className="group relative cursor-pointer z-20" onClick={() => handleWarp(index, star)}>
            <div className="relative w-12 h-12 flex items-center justify-center">
               <InteractiveStar texture={TEXTURES.SUN} size="40px" filter={star.filter} speed={star.speed} color={star.color} />
            </div>
            <div className="absolute right-14 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <span className="text-[10px] font-bold tracking-[0.2em] text-white whitespace-nowrap" style={{ textShadow: `0 0 10px ${star.color}` }}>{star.label}</span>
            </div>
          </div>
        ))}
      </div>

      <div className={`fixed inset-0 pointer-events-none z-[40] transition-opacity duration-500 ${isTraversing ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-transparent to-purple-500/10 mix-blend-screen" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_120%)]" />
      </div>

      {/* =====================================================================================
          SECTION 1: GALAXY (CENTERED NAME + 3 COLUMN ABOUT)
      ===================================================================================== */}
      <section className="relative h-screen w-full overflow-hidden z-10 perspective-[1200px]">
        
        {/* --- CONTENT LAYER --- */}
        <div className="absolute inset-0 z-20 max-w-7xl mx-auto px-6 flex flex-col items-center justify-center h-[85%]">
            
            {/* NAME: Linear & Centered */}
            <motion.div 
                initial={{ opacity: 0, y: -20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 1.2 }}
                className="text-center mb-12 flex-shrink-0"
            >
                <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold text-white mb-2 drop-shadow-2xl uppercase tracking-tighter whitespace-nowrap">
                    {USER_DATA.name}
                </h1>
                <p className="text-sm md:text-xl text-cyan-200/80 font-light tracking-[0.3em] uppercase mt-2">
                   {USER_DATA.role}
                </p>
            </motion.div>

            {/* 3 COLUMNS: About, Design, Hobby */}
            <div className="grid md:grid-cols-3 gap-6 w-full">
                {USER_DATA.aboutColumns.map((col, i) => (
                    <motion.div 
                        key={col.id}
                        initial={{ opacity: 0, y: 30 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        transition={{ delay: 0.5 + (i * 0.2), duration: 0.8 }}
                        whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.05)", borderColor: "rgba(255, 255, 255, 0.3)" }}
                        className="glass-card p-6 bg-black/30 border border-white/10 backdrop-blur-md rounded-[1.5rem] flex flex-col items-center text-center group cursor-default"
                    >
                        <div className="p-3 bg-white/5 rounded-full mb-4 group-hover:bg-white/10 transition-colors">
                            {col.icon}
                        </div>
                        <h3 className="text-xs font-bold tracking-[0.2em] text-white/70 mb-3 uppercase">{col.title}</h3>
                        <p className="text-gray-400 font-light leading-relaxed text-xs md:text-sm">
                            {col.text}
                        </p>
                    </motion.div>
                ))}
            </div>

            <div className="mt-12">
                 <button onClick={() => handleWarp(1, NAV_STARS[1])} className="text-[10px] tracking-[0.3em] text-white/50 hover:text-white transition-colors flex items-center gap-2">
                    INITIATE SEQUENCE <Rocket className="w-3 h-3" />
                </button>
            </div>
        </div>

        {/* --- GALAXY LAYER (Bottom Floor) --- */}
        <div className="absolute inset-x-0 bottom-[-25%] h-[90%] flex items-end justify-center z-0 pointer-events-none">
             <div className="relative w-full h-full flex items-center justify-center transform perspective-[1000px]">
                <InteractiveGalaxyVortex texture={TEXTURES.GALAXY} tilt={82} />
             </div>
        </div>
      </section>

      {/* --- SECTION 2: MARS (Tech Stack) --- */}
      <section className="relative min-h-screen w-full flex items-center overflow-hidden z-10 py-20">
        <div className="max-w-7xl mx-auto w-full px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="flex items-center justify-center">
             <InteractivePlanet texture={TEXTURES.MARS} size="min(70vw, 480px)" color="#ef4444" speed="100s" />
          </div>
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <div className="glass-card p-10 rounded-[2.5rem] border-l-4 border-red-500 bg-black/60 shadow-2xl relative">
               <div className="flex items-center gap-3 mb-8 text-red-500 border-b border-red-500/20 pb-4">
                  <TerminalIcon size={20} />
                  <span className="text-sm font-mono tracking-widest uppercase">Tech Stack Inventory</span>
               </div>
               <div className="space-y-6">
                 <p className="text-lg text-gray-300 leading-relaxed font-light">
                   Engineering core active. Specializing in high-performance computing and AI integration.
                 </p>
                 <div className="grid grid-cols-2 gap-4 mt-8">
                    {USER_DATA.techStack.map(t => (
                      <div key={t.name} className="flex items-center gap-2 text-xs font-mono text-red-200/70 bg-red-950/20 p-3 rounded border border-red-500/10 hover:bg-red-900/30 transition-colors cursor-default">
                          <div className="w-1.5 h-1.5 bg-red-500 rounded-full" /> 
                          <span className="font-bold text-white">{t.name}</span>
                          <span className="ml-auto opacity-50 text-[10px]">{t.type}</span>
                      </div>
                    ))}
                 </div>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- SECTION 3: MOON (Dynamic Projects) --- */}
      <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden py-20 z-10">
        <div className="absolute inset-0 flex items-center justify-center z-0 opacity-90">
           <InteractivePlanet texture={TEXTURES.MOON} size="min(75vh, 750px)" color="#ffffff" speed="200s" />
        </div>
        <div className="max-w-6xl w-full px-6 z-10">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-5xl md:text-8xl font-bold text-center mb-16 text-white uppercase tracking-tighter drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">Missions</motion.h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {USER_DATA.projects.map((project) => (
                <div key={project.id} onClick={() => setSelectedProject(project)}>
                    <ProjectCard 
                        title={project.title} 
                        desc={project.crux} 
                        tags={project.tags} 
                        icon={project.icon}
                    />
                </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 4: EARTH (Contact) --- */}
      <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden z-10">
        <div className="absolute inset-0 realistic-horizon" style={{ backgroundPosition: 'center 75%' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        <motion.div initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} className="text-center z-20 px-4">
          <h2 className="text-6xl md:text-9xl font-bold mb-6 text-white tracking-tighter drop-shadow-2xl">CONTACT</h2>
          <p className="text-xl text-blue-200/100 mb-12 font-light tracking-[0.5em] uppercase">Exist to Persist</p>
          
          <div className="flex flex-wrap gap-6 justify-center">
            <ContactBtn icon={Github} label="GitHub" link={USER_DATA.social.github} />
            <ContactBtn icon={Linkedin} label="LinkedIn" link={USER_DATA.social.linkedin} />
            <ContactBtn icon={Mail} label="Email" link={USER_DATA.social.email} />
          </div>

          <div className="mt-32 text-blue-400/60 text-[12px] tracking-[0.8em] font-mono">Created By {USER_DATA.name}</div>
        </motion.div>
      </section>

      {/* --- PROJECT DETAILS MODAL --- */}
      <AnimatePresence>
        {selectedProject && (
            <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
                onClick={() => setSelectedProject(null)}
            >
                <motion.div 
                    initial={{ scale: 0.9, y: 50 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 50 }}
                    className="glass-card max-w-2xl w-full bg-black border border-white/10 rounded-3xl overflow-hidden relative"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500" />
                    <button onClick={() => setSelectedProject(null)} className="absolute top-6 right-6 text-white/50 hover:text-white"><X /></button>
                    
                    <div className="p-10">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-white/10 rounded-xl">{selectedProject.icon}</div>
                            <div>
                                <h3 className="text-3xl font-bold text-white uppercase tracking-tight">{selectedProject.title}</h3>
                                <div className="text-cyan-400 text-sm font-mono tracking-widest mt-1">CONFIDENTIAL // {selectedProject.id.toString().padStart(3, '0')}</div>
                            </div>
                        </div>

                        <p className="text-gray-300 leading-relaxed mb-8 text-lg font-light border-l-2 border-white/20 pl-4">
                            {selectedProject.details}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-8">
                            {selectedProject.tags.map(t => (
                                <span key={t} className="text-xs font-mono bg-white/5 border border-white/10 px-3 py-1 rounded text-white/70">#{t}</span>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

// --- SUBCOMPONENTS ---

function ProjectCard({ title, desc, tags, icon }) {
  return (
    <motion.div whileHover={{ y: -10, backgroundColor: "rgba(255,255,255,0.05)" }} className="glass-card p-8 rounded-[2rem] group bg-black/40 border border-white/5 shadow-xl transition-all cursor-pointer h-full flex flex-col">
      <div className="flex justify-between items-start mb-6">
        <h3 className="text-xl font-bold group-hover:text-cyan-300 transition-colors uppercase tracking-tight">{title}</h3>
        <div className="p-3 bg-white/5 rounded-2xl text-white/70">{icon}</div>
      </div>
      <p className="text-gray-400 mb-8 font-light leading-relaxed text-sm flex-grow">{desc}</p>
      <div className="flex gap-2 flex-wrap mt-auto">
        {tags.map(t => <span key={t} className="text-[10px] font-mono border border-white/10 px-3 py-1 rounded-full text-white/50">{t}</span>)}
      </div>
    </motion.div>
  );
}

function ContactBtn({ icon: Icon, label, link }) {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className="glass-card px-10 py-4 rounded-full flex items-center gap-3 hover:bg-white/10 hover:scale-105 transition-all border border-white/10 group">
      <Icon className="w-5 h-5 text-cyan-400 group-hover:text-white transition-colors" />
      <span className="font-bold text-xs tracking-[0.2em] uppercase">{label}</span>
      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity ml-2" />
    </a>
  );
}

function InteractiveGalaxyVortex({ texture, tilt = 75 }) {
  const size = "min(120vw, 1400px)"; 
  return (
    <div style={{ width: size, height: size, perspective: '1200px' }} className="relative flex items-center justify-center pointer-events-none">
      <motion.div 
        className="absolute rounded-full"
        initial={{ opacity: 0, scale: 0.5, rotateX: 60 }}
        animate={{ opacity: 1, scale: 1, rotateX: tilt }} 
        transition={{ duration: 2.5, ease: "easeOut" }}
        style={{ width: '100%', height: '100%', transformStyle: 'preserve-3d' }}
      >
          <div className="galaxy-spin w-full h-full absolute inset-0 rounded-full" style={{ maskImage: 'radial-gradient(circle, black 0%, black 40%, transparent 68%)', WebkitMaskImage: 'radial-gradient(circle, black 0%, black 40%, transparent 68%)' }}>
             <div className="absolute inset-0 w-full h-full rounded-full" style={{ backgroundImage: `url(${texture})`, backgroundSize: 'cover', backgroundPosition: 'center', mixBlendMode: 'screen', filter: 'brightness(0.7) contrast(1.5) hue-rotate(-10deg)' }}/>
             <div className="absolute inset-0 w-full h-full rounded-full opacity-20 mix-blend-overlay" style={{ filter: 'url(#noiseFilter)' }}/>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-[20%] h-[20%] bg-blue-900/30 rounded-full blur-[40px] mix-blend-screen" />
             <div className="core-pulse relative w-[12%] h-[12%] rounded-full blur-[20px] mix-blend-screen">
                <div className="absolute inset-0 bg-cyan-100 opacity-40 rounded-full" />
                <div className="absolute inset-0 opacity-40" style={{ filter: 'url(#noiseFilter)' }} />
             </div>
          </div>
      </motion.div>
    </div>
  );
}

function InteractiveStar({ texture, size, filter, speed, color }) {
  return (
    <div className="relative flex items-center justify-center">
      <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} className="absolute rounded-full blur-xl" style={{ width: `calc(${size} * 1.5)`, height: `calc(${size} * 1.5)`, background: color, opacity: 0.2 }} />
      <motion.div whileHover={{ scale: 1.2 }} className="rounded-full relative z-10 overflow-hidden" style={{ width: size, height: size, boxShadow: `inset 0 0 10px rgba(255,255,255,0.8), 0 0 10px ${color}, 0 0 20px ${color}, 0 0 30px ${color}` }}>
        <div className="absolute inset-0 w-full h-full animate-rotate" style={{ backgroundImage: `url(${texture})`, backgroundSize: '200%', animationDuration: speed, filter: filter }} />
        <div className="absolute inset-0 rounded-full mix-blend-screen" style={{ background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.2) 20%, transparent 70%)' }} />
      </motion.div>
    </div>
  );
}

function InteractivePlanet({ texture, size, color, speed }) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} className="rounded-full relative" style={{ width: size, height: size }}>
      <div className="planet-texture animate-rotate" style={{ backgroundImage: `url(${texture})`, animationDuration: speed }} />
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-black/80 via-transparent to-transparent pointer-events-none shadow-[inset_-25px_-20px_60px_rgba(0,0,0,0.9)]" />
    </motion.div>
  );
}

const StarCanvas = ({ isWarping }) => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let w = window.innerWidth, h = window.innerHeight;
    canvas.width = w; canvas.height = h;
    let stars = Array.from({ length: 1000 }, () => ({ x: Math.random() * w - w / 2, y: Math.random() * h - h / 2, z: Math.random() * w, o: Math.random() }));
    const animate = () => {
      ctx.fillStyle = "black"; ctx.fillRect(0, 0, w, h); ctx.translate(w / 2, h / 2);
      stars.forEach(s => {
        s.z -= isWarping ? 35 : 0.6; if (s.z <= 0) s.z = w;
        const x = s.x * (w / s.z), y = s.y * (w / s.z), size = (1 - s.z / w) * 2.5;
        ctx.beginPath();
        if (isWarping) { ctx.strokeStyle = `rgba(255, 255, 255, ${s.o})`; ctx.lineWidth = 1.5; ctx.moveTo(x, y); ctx.lineTo(x * 1.2, y * 1.2); ctx.stroke(); } 
        else { ctx.fillStyle = `rgba(255, 255, 255, ${s.o})`; ctx.arc(x, y, size, 0, Math.PI * 2); ctx.fill(); }
      });
      ctx.setTransform(1, 0, 0, 1, 0, 0); requestAnimationFrame(animate);
    };
    animate();
    const rs = () => { w=window.innerWidth; h=window.innerHeight; canvas.width=w; canvas.height=h; };
    window.addEventListener('resize', rs); return () => window.removeEventListener('resize', rs);
  }, [isWarping]);
  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
};