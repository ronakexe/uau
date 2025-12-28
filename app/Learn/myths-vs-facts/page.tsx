"use client"

import { Suspense } from "react"
import { QuizSlideContainer } from "./components/QuizSlideContainer"
import { QuizProvider } from "./context/QuizContext"
import { Slide0_Title } from "./slides/Slide0_Title"
import { Slide1_MixingMyth } from "./slides/Slide1_MixingMyth"
import { Slide2_WarmingMyth } from "./slides/Slide2_WarmingMyth"
import { Slide3_HangoverMyth } from "./slides/Slide3_HangoverMyth"
import { Slide4_CarbonationMyth } from "./slides/Slide4_CarbonationMyth"
import { Slide5_GenderMyth } from "./slides/Slide5_GenderMyth"
import { Slide6_TeenMetabolismMyth } from "./slides/Slide6_TeenMetabolismMyth"
import { Slide7_CongenersMyth } from "./slides/Slide7_CongenersMyth"
import { Slide8_EnergyMyth } from "./slides/Slide8_EnergyMyth"
import { Slide9_Results } from "./slides/Slide9_Results"
import { useQuizNavigation } from "./hooks/useQuizNavigation"

function SlideshowContent() {
  const {
    currentSlide,
    totalSlides,
    goToSlide,
    nextSlide,
    prevSlide,
    canGoNext,
    canGoPrev,
  } = useQuizNavigation()

  const slides = [
    Slide0_Title,
    Slide1_MixingMyth,
    Slide2_WarmingMyth,
    Slide3_HangoverMyth,
    Slide4_CarbonationMyth,
    Slide5_GenderMyth,
    Slide6_TeenMetabolismMyth,
    Slide7_CongenersMyth,
    Slide8_EnergyMyth,
    Slide9_Results,
  ]

  const CurrentSlide = slides[currentSlide]

  return (
    <QuizSlideContainer
      currentSlide={currentSlide}
      totalSlides={totalSlides}
      goToSlide={goToSlide}
      nextSlide={nextSlide}
      prevSlide={prevSlide}
      canGoNext={canGoNext}
      canGoPrev={canGoPrev}
    >
      <CurrentSlide />
    </QuizSlideContainer>
  )
}

export default function MythsVsFactsPage() {
  return (
    <QuizProvider>
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center bg-white" role="status" aria-live="polite">
            <div className="text-gray-600">Loading quiz...</div>
          </div>
        }
      >
        <main id="main-content" role="main" aria-label="Myths vs. Facts Alcohol Awareness Quiz" className="bg-white">
          <SlideshowContent />
        </main>
      </Suspense>
    </QuizProvider>
  )
}

