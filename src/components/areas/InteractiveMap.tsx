import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Zap } from 'lucide-react';

const regions = [
  {
    id: 'montreal',
    name: 'Montréal (HQ)',
    path: 'M 150,100 L 250,100 L 300,180 L 200,250 L 100,180 Z',
    nodePos: { x: 200, y: 170 },
    status: 'Operational',
    latency: '0.4ms',
    color: 'fill-secondary/20 hover:fill-secondary/40'
  },
  {
    id: 'rivesud',
    name: 'Rive-Sud / Longueuil',
    path: 'M 100,180 L 200,250 L 250,350 L 150,400 L 50,300 Z',
    nodePos: { x: 150, y: 290 },
    status: 'Operational',
    latency: '0.8ms',
    color: 'fill-slate-100/60 hover:fill-secondary/30'
  },
  {
    id: 'rivenord',
    name: 'Rive-Nord / Repentigny',
    path: 'M 300,180 L 450,150 L 550,220 L 500,320 L 400,250 Z',
    nodePos: { x: 420, y: 220 },
    status: 'Operational',
    latency: '1.2ms',
    color: 'fill-slate-100/60 hover:fill-secondary/30'
  }
];

export function InteractiveMap() {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  return (
    <div className="relative w-full h-full min-h-[500px] flex items-center justify-center bg-slate-50 rounded-xl overflow-hidden border border-slate-100">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,102,204,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,102,204,0.02)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none"></div>

      {/* Radar Sweep Container */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="w-[1200px] h-[1200px] rounded-full border border-secondary/5 opacity-30 relative"
        >
          <div className="absolute top-0 right-1/2 w-px h-1/2 bg-gradient-to-t from-secondary/35 to-transparent blur-[1px]"></div>
          <div className="absolute top-0 right-1/2 w-20 h-1/2 bg-secondary/5 blur-2xl rounded-full origin-bottom"></div>
        </motion.div>
      </div>

      {/* Main SVG Map */}
      <svg 
        viewBox="0 0 600 500" 
        className="relative z-10 w-full max-w-[800px] h-auto drop-shadow-[0_8px_30px_rgba(10,37,64,0.04)]"
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Region Paths */}
        {regions.map((region) => (
          <motion.path
            key={region.id}
            d={region.path}
            className={`${region.color} transition-all duration-500 cursor-pointer stroke-slate-200 stroke-1`}
            onHoverStart={() => setHoveredRegion(region.id)}
            onHoverEnd={() => setHoveredRegion(null)}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              strokeWidth: hoveredRegion === region.id ? 2 : 1,
              stroke: hoveredRegion === region.id ? '#0066CC' : 'rgba(15,23,42,0.1)'
            }}
          />
        ))}

        {/* Hub Nodes */}
        {regions.map((region) => (
          <g key={`node-${region.id}`} className="pointer-events-none">
            {/* Outer Pulse */}
            <motion.circle
              cx={region.nodePos.x}
              cy={region.nodePos.y}
              r={12}
              className="fill-secondary/20"
              animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            {/* Inner Core */}
            <circle
              cx={region.nodePos.x}
              cy={region.nodePos.y}
              r={4}
              className="fill-secondary"
              filter="url(#glow)"
            />
            {/* Label */}
            <text
              x={region.nodePos.x}
              y={region.nodePos.y + 20}
              className="fill-slate-500 font-headline font-black uppercase text-[10px] tracking-widest text-center"
              textAnchor="middle"
            >
              {region.id === 'rivesud' ? 'RIVE-SUD' : region.id === 'rivenord' ? 'RIVE-NORD' : region.id.toUpperCase()}
            </text>
          </g>
        ))}

        {/* Energy Flow Lines (Static placeholders for tech feel) */}
        <motion.path 
          d="M 200,170 Q 175,230 150,290" 
          fill="none" 
          stroke="url(#flowGradient)" 
          strokeWidth="1" 
          strokeDasharray="4 4"
          animate={{ strokeDashoffset: -20 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <motion.path 
          d="M 200,170 Q 310,195 420,220" 
          fill="none" 
          stroke="url(#flowGradient)" 
          strokeWidth="1" 
          strokeDasharray="4 4"
          animate={{ strokeDashoffset: -20 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />

        <defs>
          <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(0,102,204,0)" />
            <stop offset="50%" stopColor="rgba(0,102,204,0.5)" />
            <stop offset="100%" stopColor="rgba(0,102,204,0)" />
          </linearGradient>
        </defs>
      </svg>

      {/* Interactive Tooltip Overlay */}
      <AnimatePresence>
        {hoveredRegion && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-8 left-8 right-8 z-20"
          >
            <div className="glass-panel p-6 flex flex-col md:flex-row items-center justify-between gap-6 border-secondary/20 bg-white/95">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center border border-secondary/20">
                  <Activity className="w-6 h-6 text-secondary animate-pulse" />
                </div>
                <div className="text-left">
                  <h4 className="text-primary font-headline font-black uppercase text-lg tracking-tight">
                    {regions.find(r => r.id === hoveredRegion)?.name}
                  </h4>
                  <p className="text-slate-500 text-xs font-sans uppercase font-bold tracking-wider">STATUT DE SERVICE : <span className="text-secondary font-bold">ACTIF</span></p>
                </div>
              </div>

              <div className="flex gap-8">
                <div className="text-center">
                  <div className="text-slate-400 text-[10px] font-headline uppercase font-bold tracking-widest mb-1">Activité</div>
                  <div className="text-primary font-sans text-xl font-bold">Stable</div>
                </div>
                <div className="text-center border-l border-slate-200 pl-8">
                  <div className="text-slate-400 text-[10px] font-headline uppercase font-bold tracking-widest mb-1">Délai d'intervention</div>
                  <div className="text-secondary font-sans text-xl font-bold">
                    &lt; 24h
                  </div>
                </div>
                <div className="text-center border-l border-slate-200 pl-8">
                  <div className="text-slate-400 text-[10px] font-headline uppercase font-bold tracking-widest mb-1">Disponibilité</div>
                  <div className="flex items-center gap-2 mt-1">
                    <Zap className="w-4 h-4 text-secondary fill-secondary" />
                    <span className="text-primary font-headline font-black text-xs uppercase tracking-widest">
                       100%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Status Badge (Initial state) */}
      {!hoveredRegion && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute top-8 left-8 bg-white/90 backdrop-blur-md border border-slate-100 p-4 rounded-lg z-20 shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-secondary animate-ping"></div>
            <span className="text-primary font-headline text-[10px] font-black uppercase tracking-[0.2em]">Couverture Active</span>
          </div>
        </motion.div>
      )}
    </div>
  );
}
