import { motion } from 'framer-motion';

interface ElectricProgressBarProps {
  progress: number; // 0 to 1
}

export const ElectricProgressBar = ({ progress }: ElectricProgressBarProps) => {
  return (
    <div className="relative h-2 w-full bg-slate-900/50 rounded-full overflow-hidden border border-slate-800 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
      {/* Background Energy Flow */}
      <motion.div 
        className="absolute inset-0 opacity-20"
        style={{
          background: 'linear-gradient(90deg, transparent, #1A9E8F, transparent)',
          backgroundSize: '200% 100%'
        }}
        animate={{
          backgroundPosition: ['200% 0%', '-200% 0%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Main Progress Bar */}
      <motion.div
        className="absolute top-0 left-0 h-full bg-amber-500 shadow-[0_0_20px_#1A9E8F,0_0_10px_#fff]"
        initial={{ width: 0 }}
        animate={{ width: `${progress * 100}%` }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Electric "Bolt" at the end of the bar */}
        <motion.div 
          className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-full bg-white blur-[2px]"
          animate={{
            opacity: [1, 0.5, 1],
            scaleX: [1, 1.5, 1],
          }}
          transition={{
            duration: 0.2,
            repeat: Infinity,
          }}
        />
      </motion.div>

      {/* Lightning Sparks (Randomly appearing) */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-0 w-[1px] h-full bg-white blur-[1px]"
            initial={{ left: '-10%', opacity: 0 }}
            animate={{
              left: ['0%', '100%'],
              opacity: [0, 1, 0],
              scaleY: [1, 2, 1],
            }}
            transition={{
              duration: 0.8,
              delay: i * 0.5,
              repeat: Infinity,
              ease: "circIn"
            }}
          />
        ))}
      </div>
    </div>
  );
};
