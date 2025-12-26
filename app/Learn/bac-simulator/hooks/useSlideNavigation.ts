import { useState, useEffect, useCallback } from "react"
import { useSearchParams, useRouter } from "next/navigation"

const TOTAL_SLIDES = 11 // Slides 0-10

/**
 * Hook for managing slide navigation state
 */
export function useSlideNavigation() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [currentSlide, setCurrentSlide] = useState(0)

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
      router.replace(`/Learn/bac-simulator${newUrl}`, { scroll: false })
    },
    [router, searchParams]
  )

  const goToSlide = useCallback(
    (slideIndex: number) => {
      if (slideIndex >= 0 && slideIndex < TOTAL_SLIDES) {
        setCurrentSlide(slideIndex)
        updateURL(slideIndex)
        // Scroll to top on slide change
        window.scrollTo({ top: 0, behavior: "smooth" })
      }
    },
    [updateURL]
  )

  const nextSlide = useCallback(() => {
    if (currentSlide < TOTAL_SLIDES - 1) {
      goToSlide(currentSlide + 1)
    }
  }, [currentSlide, goToSlide])

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) {
      goToSlide(currentSlide - 1)
    }
  }, [currentSlide, goToSlide])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
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

  return {
    currentSlide,
    totalSlides: TOTAL_SLIDES,
    goToSlide,
    nextSlide,
    prevSlide,
    canGoNext: currentSlide < TOTAL_SLIDES - 1,
    canGoPrev: currentSlide > 0,
  }
}

