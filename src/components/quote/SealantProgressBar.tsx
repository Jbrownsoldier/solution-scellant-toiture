import { motion } from 'framer-motion';

interface SealantProgressBarProps {
  progress: number; // 0 to 1
}

export const SealantProgressBar = ({ progress }: SealantProgressBarProps) => {
  return (
    <div className="relative h-2.5 w-full bg-slate-950/80 rounded-full overflow-hidden border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
      {/* Background Liquid Shimmer */}
      <motion.div 
        className="absolute inset-0 opacity-15"
        style={{
          background: 'linear-gradient(90deg, transparent, #1A9E8F, transparent)',
          backgroundSize: '200% 100%'
        }}
        animate={{
          backgroundPosition: ['200% 0%', '-200% 0%'],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Main Protective Coat Progress Bar */}
      <motion.div
        className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#1A9E8F] to-[#0ea5e9] shadow-[0_0_15px_rgba(26,158,143,0.5),0_0_5px_#fff]"
        initial={{ width: 0 }}
        animate={{ width: `${progress * 100}%` }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Hydrophobic Flow Highlight at the leading edge */}
        <motion.div 
          className="absolute right-0 top-0 h-full w-6 bg-gradient-to-r from-transparent to-white/40 blur-[1px]"
          animate={{
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      {/* Hydrophobic Water Droplets (Gentle floating beads) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-cyan-200/40 blur-[0.5px]"
            style={{
              width: 3 + (i % 2) * 2, // 3px or 5px
              height: 3 + (i % 2) * 2,
              top: `${20 + (i * 20) % 60}%`
            }}
            initial={{ left: '-5%', opacity: 0 }}
            animate={{
              left: ['0%', '100%'],
              opacity: [0, 0.8, 0],
              y: [0, (i % 2 === 0 ? -1 : 1) * 2, 0]
            }}
            transition={{
              duration: 2.5 + i * 0.4,
              delay: i * 0.7,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>
    </div>
  );
};
