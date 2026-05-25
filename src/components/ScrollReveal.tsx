import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  /** 'fade-up' | 'fade-in' | 'fade-left' | 'fade-right' */
  variant?: 'fade-up' | 'fade-in' | 'fade-left' | 'fade-right';
  /** Delay in seconds before this element animates */
  delay?: number;
  /** Duration in seconds */
  duration?: number;
  /** For staggered children grids — applies to parent only */
  stagger?: boolean;
}

const variantMap = {
  'fade-up':    { hidden: { opacity: 0, y: 40 },  visible: { opacity: 1, y: 0 } },
  'fade-in':    { hidden: { opacity: 0 },           visible: { opacity: 1 } },
  'fade-left':  { hidden: { opacity: 0, x: -40 },  visible: { opacity: 1, x: 0 } },
  'fade-right': { hidden: { opacity: 0, x: 40 },   visible: { opacity: 1, x: 0 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

export function ScrollReveal({
  children,
  className,
  variant = 'fade-up',
  delay = 0,
  duration = 0.6,
  stagger = false,
}: ScrollRevealProps) {
  const chosen = stagger ? staggerContainer : variantMap[variant];

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={chosen}
      transition={stagger ? undefined : { duration, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}

/** Wrap individual items inside a stagger ScrollReveal parent */
export function ScrollRevealItem({
  children,
  className,
  variant = 'fade-up',
  duration = 0.55,
}: Omit<ScrollRevealProps, 'delay' | 'stagger'>) {
  return (
    <motion.div
      className={className}
      variants={variantMap[variant]}
      transition={{ duration, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}
