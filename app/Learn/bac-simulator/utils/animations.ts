import { Variants } from "framer-motion"

/**
 * Reusable Framer Motion animation configurations
 */

// Slide transition variants with transitions embedded
// This approach avoids TypeScript issues by defining transitions within variants
export const slideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1], // cubic-bezier for smooth animation
    },
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1],
    },
  }),
}

// Fade transition variants
export const fadeVariants: Variants = {
  enter: {
    opacity: 0,
    y: -20,
  },
  center: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: 20,
  },
}

// Slide transition configuration - kept for backward compatibility
// Note: Transitions are now embedded in slideVariants for better type safety
// This can be used as a fallback or for components that don't use variants
export const slideTransition = {
  duration: 0.4,
  ease: [0.4, 0, 0.2, 1] as const, // cubic-bezier for smooth animation
}

// Fade transition configuration
export const fadeTransition = {
  duration: 0.4,
  ease: "easeInOut",
}

// Number animation configuration
export const numberAnimation = {
  duration: 0.5,
  ease: [0.4, 0, 0.2, 1], // Custom cubic-bezier
}

// Micro-interaction variants
export const buttonHoverVariants: Variants = {
  rest: {
    scale: 1,
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
    },
  },
  tap: {
    scale: 0.95,
  },
}

// Pulse animation for warnings
export const pulseVariants: Variants = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [1, 0.8, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
}

// Wobble animation for impairment effects
export const wobbleVariants: Variants = {
  animate: {
    rotate: [0, -2, 2, -2, 2, 0],
    transition: {
      duration: 0.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
}

// Stagger children animation
export const staggerContainer: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export const staggerItem: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
    },
  },
}

// Scale in animation
export const scaleInVariants: Variants = {
  initial: {
    scale: 0,
    opacity: 0,
  },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20,
    },
  },
}

// Progress bar animation
export const progressBarVariants: Variants = {
  initial: {
    width: 0,
  },
  animate: (progress: number) => ({
    width: `${progress}%`,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  }),
}

