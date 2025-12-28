"use client"

import { ProgressIndicator } from "@/components/ui/progress-indicator"
import { ScoreDisplay } from "./ScoreDisplay"
import { ProgressBar } from "./ProgressBar"

interface QuizSlideContainerProps {
  children: React.ReactNode
  currentSlide: number
  totalSlides: number
  goToSlide: (slideIndex: number) => void
  nextSlide: () => void
  prevSlide: () => void
  canGoNext: boolean
  canGoPrev: boolean
}

export function QuizSlideContainer({
  children,
  currentSlide,
  totalSlides,
  goToSlide,
  nextSlide,
  prevSlide,
  canGoNext,
  canGoPrev,
}: QuizSlideContainerProps) {
  // Calculate current myth number (slides 1-8 are myths, 0 is title, 9 is results)
  const currentMyth = currentSlide >= 1 && currentSlide <= 8 ? currentSlide : 0

  return (
    <div className="relative min-h-screen w-full bg-white">
      {/* Skip to main content link */}
      <a
        href="#main-content"
        className="absolute -left-[9999px] z-50 rounded-lg bg-primary px-4 py-2 text-primary-foreground focus:left-4 focus:top-4"
      >
        Skip to main content
      </a>

      {/* Top Bar with Score and Progress */}
      <div className="fixed top-16 left-0 right-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <ScoreDisplay />
            {currentMyth > 0 && (
              <div className="w-full md:w-64">
                <ProgressBar currentMyth={currentMyth} totalMyths={8} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Slide Content */}
      <div
        className="w-full pt-36 pb-24"
        role="region"
        aria-label={`Slide ${currentSlide + 1} of ${totalSlides}`}
        aria-live="polite"
      >
        {children}
      </div>

      {/* Bottom Progress Indicator with Navigation */}
      <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 px-4">
        <ProgressIndicator
          currentSlide={currentSlide}
          totalSlides={totalSlides}
          onSlideClick={goToSlide}
          prevSlide={prevSlide}
          nextSlide={nextSlide}
          canGoPrev={canGoPrev}
          canGoNext={canGoNext}
          variant="compact"
        />
      </div>
    </div>
  )
}

