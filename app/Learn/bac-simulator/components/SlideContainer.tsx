"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProgressIndicator } from "./ProgressIndicator"

interface SlideContainerProps {
  children: React.ReactNode
  currentSlide: number
  totalSlides: number
  goToSlide: (slideIndex: number) => void
  nextSlide: () => void
  prevSlide: () => void
  canGoNext: boolean
  canGoPrev: boolean
}

export function SlideContainer({
  children,
  currentSlide,
  totalSlides,
  goToSlide,
  nextSlide,
  prevSlide,
  canGoNext,
  canGoPrev,
}: SlideContainerProps) {
  const [displaySlide, setDisplaySlide] = useState(currentSlide)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (currentSlide !== displaySlide) {
      // Fade out
      setIsVisible(false)
      
      // After fade out, update slide and fade in
      const timer = setTimeout(() => {
        setDisplaySlide(currentSlide)
        setIsVisible(true)
      }, 200) // Short fade duration

      return () => clearTimeout(timer)
    }
  }, [currentSlide, displaySlide])

  return (
    <div className="relative min-h-screen w-full">
      {/* Skip to main content link */}
      <a
        href="#main-content"
        className="absolute -left-[9999px] z-50 rounded-lg bg-primary px-4 py-2 text-primary-foreground focus:left-4 focus:top-4"
      >
        Skip to main content
      </a>

      {/* Navigation Buttons */}
      <div className="fixed left-2 top-1/2 z-50 -translate-y-1/2 md:left-4">
        <Button
          variant="outline"
          size="icon"
          onClick={prevSlide}
          disabled={!canGoPrev}
          className="h-12 w-12 rounded-full touch-manipulation"
          aria-label="Previous slide"
          aria-disabled={!canGoPrev}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
      </div>

      <div className="fixed right-2 top-1/2 z-50 -translate-y-1/2 md:right-4">
        <Button
          variant="outline"
          size="icon"
          onClick={nextSlide}
          disabled={!canGoNext}
          className="h-12 w-12 rounded-full touch-manipulation"
          aria-label="Next slide"
          aria-disabled={!canGoNext}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      {/* Slide Content */}
      <div
        key={displaySlide}
        className={`w-full transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"}`}
        role="region"
        aria-label={`Slide ${currentSlide + 1} of ${totalSlides}`}
        aria-live="polite"
      >
        {children}
      </div>

      {/* Progress Indicator */}
      <div className="fixed bottom-4 left-1/2 z-50 w-full max-w-2xl -translate-x-1/2 px-4 md:bottom-8">
        <ProgressIndicator
          currentSlide={currentSlide}
          totalSlides={totalSlides}
          onSlideClick={goToSlide}
        />
      </div>
    </div>
  )
}
