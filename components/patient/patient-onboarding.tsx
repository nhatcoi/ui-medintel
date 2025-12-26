"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Heart, ArrowLeft, Clock, AlertCircle } from "lucide-react"

interface PatientOnboardingProps {
  onComplete: () => void
  onBack: () => void
}

const healthConditions = [
  "Hypertension",
  "Diabetes",
  "Heart disease",
  "Asthma",
  "Arthritis",
  "Thyroid disorder",
  "Kidney disease",
]

export default function PatientOnboarding({ onComplete, onBack }: PatientOnboardingProps) {
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    yearOfBirth: new Date().getFullYear() - 30,
    gender: "",
    healthConditions: [] as string[],
    otherCondition: "",
    weight: "",
    height: "",
    wakeUpTime: "07:00",
    sleepTime: "22:00",
    notificationsEnabled: true,
    agreeToTerms: false,
  })

  const handleInputChange = (field: string, value: string | number | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const toggleCondition = (condition: string) => {
    setFormData((prev) => ({
      ...prev,
      healthConditions: prev.healthConditions.includes(condition)
        ? prev.healthConditions.filter((c) => c !== condition)
        : [...prev.healthConditions, condition],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      onComplete()
    }, 1500)
  }

  const currentYear = new Date().getFullYear()
  const age = currentYear - formData.yearOfBirth

  const isStep1Valid = formData.fullName && formData.yearOfBirth && formData.gender
  const isStep2Valid = true
  const isStep3Valid = formData.weight && formData.height
  const isStep4Valid = formData.wakeUpTime && formData.sleepTime
  const isStep5Valid = formData.agreeToTerms

  const getStepValidation = () => {
    if (step === 1) return isStep1Valid
    if (step === 2) return isStep2Valid
    if (step === 3) return isStep3Valid
    if (step === 4) return isStep4Valid
    if (step === 5) return isStep5Valid
    return false
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white px-6 py-8">
      {/* Header */}
      <div className="max-w-2xl mx-auto w-full mb-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-foreground">MedIntel</h1>
          </div>
          <button
            onClick={onBack}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full flex-1 transition-all ${i <= step ? "bg-primary" : "bg-border"}`}
            />
          ))}
        </div>

        {/* Step Title */}
        <div className="mt-8 mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            {step === 1 && "Basic Information"}
            {step === 2 && "Health Background"}
            {step === 3 && "Body Metrics"}
            {step === 4 && "Daily Routine"}
            {step === 5 && "Confirm Information"}
          </h2>
          <p className="text-muted-foreground text-sm">
            {step === 1 && "Tell us about yourself"}
            {step === 2 && "Any existing health conditions? (Optional)"}
            {step === 3 && "Your physical measurements"}
            {step === 4 && "When do you wake up and sleep?"}
            {step === 5 && "Please review your information"}
          </p>
        </div>
      </div>

      {/* Form Content */}
      <div className="flex-1 max-w-2xl mx-auto w-full">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Step 1: Basic Information */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in duration-300">
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
                  className="h-11 bg-white focus:border-primary focus:ring-1 focus:ring-primary text-base"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="yearOfBirth" className="text-sm font-semibold text-foreground">
                  Year of Birth <span className="text-accent">*</span>
                </label>
                <div className="flex gap-3">
                  <Input
                    id="yearOfBirth"
                    type="number"
                    min="1924"
                    max={currentYear}
                    value={formData.yearOfBirth}
                    onChange={(e) => handleInputChange("yearOfBirth", Number.parseInt(e.target.value))}
                    className="h-11 flex-1 bg-white focus:border-primary focus:ring-1 focus:ring-primary text-base"
                    required
                  />
                  <div className="flex items-center px-4 bg-blue-50 rounded-lg border border-border text-foreground font-medium min-w-max">
                    Age: {age}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">
                  Gender <span className="text-accent">*</span>
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {["Male", "Female", "Other"].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => handleInputChange("gender", option)}
                      className={`py-3 px-4 rounded-lg font-medium border transition-all ${
                        formData.gender === option
                          ? "bg-primary text-white border-primary"
                          : "bg-white text-foreground border-border hover:border-primary/50"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Health Background */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="space-y-3">
                <p className="text-sm font-semibold text-foreground">Select any conditions you have</p>
                <div className="grid grid-cols-2 gap-2">
                  {healthConditions.map((condition) => (
                    <button
                      key={condition}
                      type="button"
                      onClick={() => toggleCondition(condition)}
                      className={`px-4 py-3 rounded-lg font-medium transition-all border text-sm ${
                        formData.healthConditions.includes(condition)
                          ? "bg-primary text-white border-primary"
                          : "bg-white text-foreground border-border hover:border-primary/50"
                      }`}
                    >
                      {condition}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="otherCondition" className="text-sm font-semibold text-foreground">
                  Other Conditions (Optional)
                </label>
                <textarea
                  id="otherCondition"
                  placeholder="List any other health conditions..."
                  value={formData.otherCondition}
                  onChange={(e) => handleInputChange("otherCondition", e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-border bg-white rounded-lg text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary resize-none text-base"
                />
              </div>

              <Card className="bg-blue-50 border-blue-200 p-4">
                <p className="text-sm text-foreground">
                  <strong>Note:</strong> This helps us provide better medication recommendations, but medical decisions
                  should always be made with your doctor.
                </p>
              </Card>
            </div>
          )}

          {/* Step 3: Body Metrics */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in duration-300">
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
                  className="h-11 bg-white focus:border-primary focus:ring-1 focus:ring-primary text-base"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="height" className="text-sm font-semibold text-foreground">
                  Height (cm) <span className="text-accent">*</span>
                </label>
                <Input
                  id="height"
                  type="number"
                  placeholder="175"
                  value={formData.height}
                  onChange={(e) => handleInputChange("height", e.target.value)}
                  className="h-11 bg-white focus:border-primary focus:ring-1 focus:ring-primary text-base"
                  required
                />
              </div>

              <Card className="bg-blue-50 border-blue-200 p-4">
                <p className="text-sm text-foreground">
                  <strong>BMI Information:</strong> This helps us provide medication dosage recommendations that are
                  appropriate for your body.
                </p>
              </Card>
            </div>
          )}

          {/* Step 4: Daily Routine */}
          {step === 4 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="space-y-2">
                <label htmlFor="wakeUpTime" className="text-sm font-semibold text-foreground">
                  Wake-up Time <span className="text-accent">*</span>
                </label>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-muted-foreground" />
                  <Input
                    id="wakeUpTime"
                    type="time"
                    value={formData.wakeUpTime}
                    onChange={(e) => handleInputChange("wakeUpTime", e.target.value)}
                    className="h-11 bg-white focus:border-primary focus:ring-1 focus:ring-primary text-base"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="sleepTime" className="text-sm font-semibold text-foreground">
                  Sleep Time <span className="text-accent">*</span>
                </label>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-muted-foreground" />
                  <Input
                    id="sleepTime"
                    type="time"
                    value={formData.sleepTime}
                    onChange={(e) => handleInputChange("sleepTime", e.target.value)}
                    className="h-11 bg-white focus:border-primary focus:ring-1 focus:ring-primary text-base"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <label htmlFor="notificationsEnabled" className="text-sm font-semibold text-foreground cursor-pointer">
                  Allow medication reminders
                </label>
                <input
                  id="notificationsEnabled"
                  type="checkbox"
                  checked={formData.notificationsEnabled}
                  onChange={(e) => handleInputChange("notificationsEnabled", e.target.checked)}
                  className="w-5 h-5 cursor-pointer accent-primary"
                />
              </div>
            </div>
          )}

          {/* Step 5: Confirmation */}
          {step === 5 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <Card className="p-6 space-y-4 border border-border">
                <h3 className="font-bold text-foreground text-lg">Your Profile Summary</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Name:</span>
                    <span className="font-medium text-foreground">{formData.fullName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Age:</span>
                    <span className="font-medium text-foreground">{age} years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Gender:</span>
                    <span className="font-medium text-foreground">{formData.gender}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Weight/Height:</span>
                    <span className="font-medium text-foreground">
                      {formData.weight}kg / {formData.height}cm
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Wake-up time:</span>
                    <span className="font-medium text-foreground">{formData.wakeUpTime}</span>
                  </div>
                </div>
              </Card>

              <div className="flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div className="space-y-2">
                  <p className="font-semibold text-sm text-foreground">Medical Disclaimer</p>
                  <p className="text-xs text-muted-foreground">
                    MedIntel does not replace medical advice. Always consult your doctor before starting new medications
                    or treatments.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <input
                  id="agreeToTerms"
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={(e) => handleInputChange("agreeToTerms", e.target.checked)}
                  className="w-5 h-5 mt-1 cursor-pointer accent-primary"
                  required
                />
                <label htmlFor="agreeToTerms" className="text-sm text-foreground cursor-pointer">
                  I understand that MedIntel does not replace medical advice and I will consult my doctor for medical
                  decisions
                </label>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              onClick={() => setStep(step - 1)}
              disabled={step === 1}
              variant="outline"
              className="flex-1 h-11 border-border hover:bg-slate-50 bg-transparent"
            >
              Back
            </Button>
            <Button
              type={step === 5 ? "submit" : "button"}
              onClick={() => {
                if (step < 5) setStep(step + 1)
              }}
              disabled={!getStepValidation() || isLoading}
              className="flex-1 h-11 bg-primary hover:bg-primary/90 text-white font-semibold"
            >
              {isLoading ? "Finishing..." : step === 5 ? "Finish Setup" : "Continue"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
