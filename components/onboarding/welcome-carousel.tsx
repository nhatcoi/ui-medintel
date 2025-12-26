"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronRight, Pill, Clock, Smartphone, Heart } from "lucide-react"

interface WelcomeCarouselProps {
  onComplete: () => void
}

const slides = [
  {
    id: 1,
    title: "Take medicine correctly, every day",
    subtitle: "MedIntel helps you track prescriptions and reminds you when to take your medicine",
    icon: "medicine",
  },
  {
    id: 2,
    title: "How it works",
    features: [
      { icon: "camera", text: "Take a photo of your prescription" },
      { icon: "schedule", text: "Automatic medication schedule" },
      { icon: "bell", text: "Smart reminders & tracking" },
    ],
  },
  {
    id: 3,
    title: "Safety first",
    description: "MedIntel does not replace doctors. This app only supports treatment adherence.",
    disclaimer: true,
  },
]

export default function WelcomeCarousel({ onComplete }: WelcomeCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0)

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    } else {
      onComplete()
    }
  }

  const handlePrevious = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    }
  }

  const slide = slides[currentSlide]

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white px-6 py-8">
      {/* Top spacer and logo */}
      <div className="flex items-center justify-center mb-6">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold text-foreground">MedIntel</h1>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col justify-center items-center max-w-md mx-auto w-full">
        {/* Slide 1: Value Proposition */}
        {slide.id === 1 && (
          <div className="text-center space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-accent/10 rounded-2xl flex items-center justify-center">
                <Pill className="w-10 h-10 text-accent" />
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-foreground text-balance">{slide.title}</h2>
              <p className="text-lg text-muted-foreground text-balance">{slide.subtitle}</p>
            </div>
          </div>
        )}

        {/* Slide 2: How it works */}
        {slide.id === 2 && (
          <div className="text-center space-y-8 animate-in fade-in duration-500">
            <h2 className="text-4xl font-bold text-foreground">{slide.title}</h2>
            <div className="space-y-4 w-full">
              {slide.features &&
                slide.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 bg-white rounded-xl border border-border hover:border-primary/50 transition-colors"
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      {feature.icon === "camera" && <Pill className="w-6 h-6 text-primary" />}
                      {feature.icon === "schedule" && <Clock className="w-6 h-6 text-primary" />}
                      {feature.icon === "bell" && <Smartphone className="w-6 h-6 text-primary" />}
                    </div>
                    <p className="text-left font-medium text-foreground">{feature.text}</p>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Slide 3: Safety & Disclaimer */}
        {slide.id === 3 && (
          <div className="text-center space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center">
                <Heart className="w-10 h-10 text-primary" />
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-foreground">{slide.title}</h2>
              <p className="text-lg text-muted-foreground text-balance">{slide.description}</p>
            </div>
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-foreground font-medium">⚠️ {slide.disclaimer && "Medical Disclaimer"}</p>
              <p className="text-sm text-muted-foreground mt-2">{slide.description}</p>
            </div>
          </div>
        )}
      </div>

      {/* Progress dots */}
      <div className="flex justify-center gap-2 mb-8">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all ${index === currentSlide ? "bg-primary w-8" : "bg-border w-2"}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation buttons */}
      <div className="flex gap-3 max-w-md mx-auto w-full">
        <Button
          onClick={handlePrevious}
          disabled={currentSlide === 0}
          variant="outline"
          className="flex-1 h-12 border-border hover:bg-slate-50 bg-transparent"
        >
          Back
        </Button>
        <Button
          onClick={handleNext}
          className="flex-1 h-12 bg-primary hover:bg-primary/90 text-white font-semibold flex items-center justify-center gap-2"
        >
          {currentSlide === slides.length - 1 ? "Get Started" : "Next"}
          {currentSlide < slides.length - 1 && <ChevronRight className="w-4 h-4" />}
        </Button>
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-muted-foreground mt-6">
        <p>© 2025 MedIntel. All rights reserved.</p>
      </div>
    </div>
  )
}
