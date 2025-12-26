"use client"

import { motion } from "framer-motion"
import { progressBarVariants } from "../utils/animations"

interface ProgressIndicatorProps {
  currentSlide: number
  totalSlides: number
  onSlideClick: (slideIndex: number) => void
}

export function ProgressIndicator({
  currentSlide,
  totalSlides,
  onSlideClick,
}: ProgressIndicatorProps) {
  const progress = ((currentSlide + 1) / totalSlides) * 100

  return (
    <div className="w-full space-y-4" role="navigation" aria-label="Slide navigation">
      {/* Progress Bar */}
      <div className="relative h-2 w-full overflow-hidden rounded-full bg-muted">
        <motion.div
          className="h-full bg-primary"
          variants={progressBarVariants}
          initial="initial"
          animate="animate"
          custom={progress}
        />
      </div>

      {/* Slide Dots */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => onSlideClick(index)}
            className={`h-3 w-3 rounded-full transition-all ${
              index === currentSlide
                ? "bg-primary scale-125"
                : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentSlide ? "true" : undefined}
          />
        ))}
      </div>

      {/* Slide Counter */}
      <div className="text-center text-sm text-muted-foreground">
        Slide {currentSlide + 1} of {totalSlides}
      </div>
    </div>
  )
}

