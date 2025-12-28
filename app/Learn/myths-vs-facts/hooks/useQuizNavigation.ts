import { useState, useEffect, useCallback } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { useQuizContext } from "../context/QuizContext"

const TOTAL_SLIDES = 10 // Title (0) + 8 myths (1-8) + Results (9)

/**
 * Hook for managing quiz slide navigation state
 * Prevents advancing from myth slides until answer is submitted
 */
export function useQuizNavigation() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [currentSlide, setCurrentSlide] = useState(0)
  const { hasAnswered } = useQuizContext()

  // Initialize from URL query param if present
  useEffect(() => {
    const slideParam = searchParams.get("slide")
    if (slideParam) {
      const slideIndex = parseInt(slideParam, 10)
      if (!isNaN(slideIndex) && slideIndex >= 0 && slideIndex < TOTAL_SLIDES) {
        setCurrentSlide(slideIndex)
      }
    }
  }, [searchParams])

  // Update URL when slide changes
  const updateURL = useCallback(
    (slideIndex: number) => {
      const params = new URLSearchParams(searchParams.toString())
      if (slideIndex === 0) {
        params.delete("slide")
      } else {
        params.set("slide", slideIndex.toString())
      }
      const newUrl = params.toString() ? `?${params.toString()}` : ""
      router.replace(`/Learn/myths-vs-facts${newUrl}`, { scroll: false })
    },
    [router, searchParams]
  )

  const goToSlide = useCallback(
    (slideIndex: number) => {
      if (slideIndex >= 0 && slideIndex < TOTAL_SLIDES) {
        // For myth slides (1-8), check if answered before allowing navigation
        // BUT: Allow navigation from title slide (0) to first myth (1) or from results (9) back to review
        // Only block if navigating from another myth slide to an unanswered myth slide
        // AND the current slide hasn't been answered (prevent skipping ahead without answering)
        if (slideIndex >= 1 && slideIndex <= 8 && currentSlide >= 1 && currentSlide <= 8) {
          const destinationAnswered = hasAnswered(slideIndex)
          const currentAnswered = hasAnswered(currentSlide)
          // Allow if: current slide answered (forward progression) OR destination answered (review)
          // Block only if: current not answered AND trying to go to unanswered destination
          if (!currentAnswered && !destinationAnswered) {
            // Can't skip ahead to unanswered myth slides without answering current
            return
          }
        }
        setCurrentSlide(slideIndex)
        updateURL(slideIndex)
        // Scroll to top on slide change
        window.scrollTo({ top: 0, behavior: "smooth" })
      }
    },
    [updateURL, hasAnswered, currentSlide]
  )

  const nextSlide = useCallback(() => {
    if (currentSlide < TOTAL_SLIDES - 1) {
      // For myth slides (1-8), require answer before advancing
      if (currentSlide >= 1 && currentSlide <= 8) {
        if (!hasAnswered(currentSlide)) {
          return // Can't advance without answering
        }
      }
      goToSlide(currentSlide + 1)
    }
  }, [currentSlide, goToSlide, hasAnswered])

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) {
      goToSlide(currentSlide - 1)
    }
  }, [currentSlide, goToSlide])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Allow navigation with arrow keys, but respect answer requirement
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault()
        nextSlide()
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault()
        prevSlide()
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [nextSlide, prevSlide])

  // Check if can advance (for UI)
  const canGoNext = currentSlide < TOTAL_SLIDES - 1 && 
    (currentSlide === 0 || currentSlide > 8 || hasAnswered(currentSlide))

  return {
    currentSlide,
    totalSlides: TOTAL_SLIDES,
    goToSlide,
    nextSlide,
    prevSlide,
    canGoNext,
    canGoPrev: currentSlide > 0,
  }
}

