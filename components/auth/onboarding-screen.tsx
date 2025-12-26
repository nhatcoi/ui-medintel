"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Heart, ArrowLeft } from "lucide-react"

interface OnboardingScreenProps {
  onNavigate: () => void
}

const commonAllergies = [
  "Penicillin",
  "Aspirin",
  "Ibuprofen",
  "Acetaminophen",
  "Sulfonamides",
  "Cephalosporins",
  "Fluoroquinolones",
  "Macrolides",
]

export default function OnboardingScreen({ onNavigate }: OnboardingScreenProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    yearOfBirth: new Date().getFullYear() - 30,
    weight: "",
    allergies: [] as string[],
    otherAllergies: "",
  })
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const toggleAllergy = (allergy: string) => {
    setFormData((prev) => ({
      ...prev,
      allergies: prev.allergies.includes(allergy)
        ? prev.allergies.filter((a) => a !== allergy)
        : [...prev.allergies, allergy],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      alert("Profile created successfully! Your health information is saved.")
    }, 1500)
  }

  const currentYear = new Date().getFullYear()
  const age = currentYear - formData.yearOfBirth

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white px-6 py-8 md:px-8">
      {/* Header */}
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-foreground">MediCare</h1>
          </div>
          <button
            onClick={onNavigate}
            className="text-primary hover:text-primary/80 transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Indicator */}
        <div className="flex gap-2 mb-8">
          <div
            className={`h-2 rounded-full transition-all ${step >= 1 ? "bg-primary flex-1" : "bg-border flex-1"}`}
          ></div>
          <div
            className={`h-2 rounded-full transition-all ${step >= 2 ? "bg-primary flex-1" : "bg-border flex-1"}`}
          ></div>
        </div>

        {/* Form Title */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            {step === 1 ? "Personal Information" : "Medication Allergies"}
          </h2>
          <p className="text-muted-foreground">
            {step === 1
              ? "Help us personalize your health experience"
              : "Let us know about any medication allergies for safe drug checking"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Step 1: Personal Information */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              {/* Full Name */}
              <div className="space-y-2">
                <label htmlFor="fullName" className="text-sm font-semibold text-foreground">
                  Full Name <span className="text-accent">*</span>
                </label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  className="h-11 border-border bg-white text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>

              {/* Year of Birth */}
              <div className="space-y-2">
                <label htmlFor="yearOfBirth" className="text-sm font-semibold text-foreground">
                  Year of Birth <span className="text-accent">*</span>
                </label>
                <div className="flex gap-4">
                  <Input
                    id="yearOfBirth"
                    type="number"
                    min="1924"
                    max={currentYear}
                    value={formData.yearOfBirth}
                    onChange={(e) => handleInputChange("yearOfBirth", Number.parseInt(e.target.value))}
                    className="h-11 border-border bg-white text-foreground focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                  <div className="flex items-center px-4 bg-slate-50 rounded-lg border border-border text-foreground font-medium">
                    Age: {age}
                  </div>
                </div>
              </div>

              {/* Weight */}
              <div className="space-y-2">
                <label htmlFor="weight" className="text-sm font-semibold text-foreground">
                  Weight (kg) <span className="text-accent">*</span>
                </label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="70"
                  value={formData.weight}
                  onChange={(e) => handleInputChange("weight", e.target.value)}
                  className="h-11 border-border bg-white text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>

              {/* Next Button */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  onClick={onNavigate}
                  className="flex-1 h-11 border border-border bg-white text-foreground hover:bg-slate-50 font-semibold rounded-lg transition-colors"
                >
                  Back
                </Button>
                <Button
                  type="button"
                  onClick={() => setStep(2)}
                  disabled={!formData.fullName || !formData.weight}
                  className="flex-1 h-11 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Allergies */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              {/* Common Allergies */}
              <div className="space-y-3">
                <p className="text-sm font-semibold text-foreground">Select common medication allergies</p>
                <div className="grid grid-cols-2 gap-2">
                  {commonAllergies.map((allergy) => (
                    <button
                      key={allergy}
                      type="button"
                      onClick={() => toggleAllergy(allergy)}
                      className={`px-4 py-3 rounded-lg font-medium transition-all border ${
                        formData.allergies.includes(allergy)
                          ? "bg-primary text-white border-primary"
                          : "bg-white text-foreground border-border hover:border-primary/50"
                      }`}
                    >
                      {allergy}
                    </button>
                  ))}
                </div>
              </div>

              {/* Other Allergies */}
              <div className="space-y-2">
                <label htmlFor="otherAllergies" className="text-sm font-semibold text-foreground">
                  Other Allergies
                </label>
                <textarea
                  id="otherAllergies"
                  placeholder="List any other medication allergies or reactions..."
                  value={formData.otherAllergies}
                  onChange={(e) => handleInputChange("otherAllergies", e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-border bg-white rounded-lg text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary resize-none"
                />
              </div>

              {/* Info Card */}
              <Card className="bg-blue-50 border-blue-200 p-4">
                <div className="flex gap-3">
                  <Heart className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-1">Your data is safe</p>
                    <p className="text-sm text-muted-foreground">
                      All health information is encrypted and stored securely. We never share your data with third
                      parties.
                    </p>
                  </div>
                </div>
              </Card>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 h-11 border border-border bg-white text-foreground hover:bg-slate-50 font-semibold rounded-lg transition-colors"
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 h-11 bg-accent hover:bg-accent/90 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Creating Profile..." : "Complete Setup"}
                </Button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
