/**
 * CSS animation utility classes
 * All animations are now handled via CSS classes defined in globals.css
 */

// Animation class names for use in components
export const animationClasses = {
  fadeIn: "animate-fade-in",
  fadeInUp: "animate-fade-in-up",
  scaleIn: "animate-scale-in",
  slideEnterRight: "animate-slide-enter-right",
  slideEnterLeft: "animate-slide-enter-left",
  slideExitRight: "animate-slide-exit-right",
  slideExitLeft: "animate-slide-exit-left",
  pulse: "animate-pulse-custom",
  wobble: "animate-wobble",
}

// Helper function to create staggered animation delays
export const getStaggerDelay = (index: number, baseDelay: number = 0.1) => {
  return `${baseDelay + index * 0.1}s`
}
