"use client"

import { Suspense } from "react"
import { SlideContainer } from "./components/SlideContainer"
import { BACProvider } from "./context/BACContext"
import { Slide0_Title } from "./slides/Slide0_Title"
import { Slide1_Education } from "./slides/Slide1_Education"
import { Slide2_BACBasics } from "./slides/Slide2_BACBasics"
import { Slide3_CalculatorIntro } from "./slides/Slide3_CalculatorIntro"
import { Slide4_InteractiveCalc } from "./slides/Slide4_InteractiveCalc"
import { Slide5_ReactionTime } from "./slides/Slide5_ReactionTime"
import { Slide6_Vision } from "./slides/Slide6_Vision"
import { Slide7_Decision } from "./slides/Slide7_Decision"
import { Slide8_LegalLimits } from "./slides/Slide8_LegalLimits"
import { Slide9_Summary } from "./slides/Slide9_Summary"
import { Slide10_Resources } from "./slides/Slide10_Resources"
import { useSlideNavigation } from "./hooks/useSlideNavigation"

function SlideshowContent() {
  const {
    currentSlide,
    totalSlides,
    goToSlide,
    nextSlide,
    prevSlide,
    canGoNext,
    canGoPrev,
  } = useSlideNavigation()

  const slides = [
    Slide0_Title,
    Slide1_Education,
    Slide2_BACBasics,
    Slide3_CalculatorIntro,
    Slide4_InteractiveCalc,
    Slide5_ReactionTime,
    Slide6_Vision,
    Slide7_Decision,
    Slide8_LegalLimits,
    Slide9_Summary,
    Slide10_Resources,
  ]

  const CurrentSlide = slides[currentSlide]

  return (
    <SlideContainer
      currentSlide={currentSlide}
      totalSlides={totalSlides}
      goToSlide={goToSlide}
      nextSlide={nextSlide}
      prevSlide={prevSlide}
      canGoNext={canGoNext}
      canGoPrev={canGoPrev}
    >
      <CurrentSlide />
    </SlideContainer>
  )
}

export default function BACSimulatorPage() {
  return (
    <BACProvider>
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center" role="status" aria-live="polite">
            Loading slideshow...
          </div>
        }
      >
        <main id="main-content" role="main" aria-label="BAC Impact Simulator Slideshow">
          <SlideshowContent />
        </main>
      </Suspense>
    </BACProvider>
  )
}

