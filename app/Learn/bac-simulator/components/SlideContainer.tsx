"use client"

import { useEffect, useRef } from "react"
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
  const prevSlideRef = useRef(currentSlide)
  const renderCountRef = useRef(0)
  const slideContentRef = useRef<HTMLDivElement>(null)

  // #region agent log
  useEffect(() => {
    renderCountRef.current += 1
    fetch('http://127.0.0.1:7242/ingest/938c7e20-ba6b-40b5-a08a-495b85ed855f',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'SlideContainer.tsx:35',message:'SlideContainer render',data:{currentSlide,prevSlide:prevSlideRef.current,renderCount:renderCountRef.current},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
    if (currentSlide !== prevSlideRef.current) {
      fetch('http://127.0.0.1:7242/ingest/938c7e20-ba6b-40b5-a08a-495b85ed855f',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'SlideContainer.tsx:38',message:'Slide changed detected',data:{from:prevSlideRef.current,to:currentSlide},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
      prevSlideRef.current = currentSlide
    }
  }, [currentSlide])
  // #endregion

  // #region agent log
  useEffect(() => {
    const element = slideContentRef.current
    if (!element) return

    const handleAnimationStart = (e: AnimationEvent) => {
      fetch('http://127.0.0.1:7242/ingest/938c7e20-ba6b-40b5-a08a-495b85ed855f',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'SlideContainer.tsx:50',message:'CSS animation started',data:{animationName:e.animationName,currentSlide},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
    }
    const handleAnimationEnd = (e: AnimationEvent) => {
      fetch('http://127.0.0.1:7242/ingest/938c7e20-ba6b-40b5-a08a-495b85ed855f',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'SlideContainer.tsx:53',message:'CSS animation ended',data:{animationName:e.animationName,currentSlide},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
    }
    const handleTransitionStart = (e: TransitionEvent) => {
      fetch('http://127.0.0.1:7242/ingest/938c7e20-ba6b-40b5-a08a-495b85ed855f',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'SlideContainer.tsx:56',message:'CSS transition started',data:{propertyName:e.propertyName,currentSlide},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
    }

    element.addEventListener('animationstart', handleAnimationStart)
    element.addEventListener('animationend', handleAnimationEnd)
    element.addEventListener('transitionstart', handleTransitionStart)

    return () => {
      element.removeEventListener('animationstart', handleAnimationStart)
      element.removeEventListener('animationend', handleAnimationEnd)
      element.removeEventListener('transitionstart', handleTransitionStart)
    }
  }, [currentSlide])
  // #endregion

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

      {/* Slide Content - Use key for React updates, but transitions won't retrigger */}
      <div
        ref={slideContentRef}
        key={currentSlide}
        className="w-full opacity-100 transition-opacity duration-200 ease-in-out"
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
