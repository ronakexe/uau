"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProgressIndicatorProps {
  currentSlide: number
  totalSlides: number
  onSlideClick: (slideIndex: number) => void
  variant?: "default" | "compact"
  prevSlide?: () => void
  nextSlide?: () => void
  canGoPrev?: boolean
  canGoNext?: boolean
}

/**
 * Shared progress indicator component with dots, slide counter, and navigation arrows
 * Automatically adjusts based on totalSlides prop
 */
export function ProgressIndicator({
  currentSlide,
  totalSlides,
  onSlideClick,
  variant = "default",
  prevSlide,
  nextSlide,
  canGoPrev = true,
  canGoNext = true,
}: ProgressIndicatorProps) {
  const isCompact = variant === "compact"
  const hasArrows = prevSlide !== undefined && nextSlide !== undefined
  
  const progressBox = (
    <div className="inline-block bg-white/95 backdrop-blur-sm rounded-lg border border-gray-200 shadow-lg p-3" role="navigation" aria-label="Slide navigation">
      <div className={`flex flex-col items-center ${isCompact ? 'space-y-2' : 'space-y-3'}`}>
        {/* Slide Dots */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => onSlideClick(index)}
              className={`${isCompact ? 'h-2 w-2' : 'h-3 w-3'} rounded-full transition-all ${
                index === currentSlide
                  ? isCompact
                    ? "bg-primary scale-125 w-8"
                    : "bg-primary scale-125"
                  : isCompact
                    ? "bg-gray-300 hover:bg-gray-400"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === currentSlide ? "true" : undefined}
            />
          ))}
        </div>

        {/* Slide Counter */}
        <div className={`text-center whitespace-nowrap ${isCompact ? 'text-xs text-gray-500' : 'text-sm text-muted-foreground'}`}>
          Slide {currentSlide + 1} of {totalSlides}
        </div>
      </div>
    </div>
  )

  if (!hasArrows) {
    return progressBox
  }

  return (
    <div className="flex items-center gap-3">
      {/* Previous Button */}
      <Button
        variant="outline"
        size="icon"
        onClick={prevSlide}
        disabled={!canGoPrev}
        className={`${isCompact ? 'h-10 w-10' : 'h-12 w-12'} rounded-full touch-manipulation bg-white border-gray-300 hover:bg-gray-50 flex-shrink-0 shadow-lg`}
        aria-label="Previous slide"
        aria-disabled={!canGoPrev}
      >
        <ChevronLeft className={isCompact ? 'h-5 w-5' : 'h-6 w-6'} />
      </Button>

      {/* Progress Box */}
      {progressBox}

      {/* Next Button with Tooltip */}
      <div className="relative group">
        <Button
          variant="outline"
          size="icon"
          onClick={nextSlide}
          disabled={!canGoNext}
          className={`${isCompact ? 'h-10 w-10' : 'h-12 w-12'} rounded-full touch-manipulation bg-white border-gray-300 hover:bg-gray-50 flex-shrink-0 shadow-lg`}
          aria-label="Next slide"
          aria-disabled={!canGoNext}
        >
          <ChevronRight className={isCompact ? 'h-5 w-5' : 'h-6 w-6'} />
        </Button>
        {!canGoNext && (
          <div className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 shadow-lg">
            Complete this slide before moving on
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
          </div>
        )}
      </div>
    </div>
  )
}

