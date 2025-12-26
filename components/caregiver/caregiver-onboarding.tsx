"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Heart, ArrowLeft, Bell, Users } from "lucide-react"

interface CaregiverOnboardingProps {
  onComplete: () => void
  onBack: () => void
}

const relationshipOptions = ["Spouse", "Child", "Parent", "Sibling", "Friend", "Healthcare Professional", "Other"]

export default function CaregiverOnboarding({ onComplete, onBack }: CaregiverOnboardingProps) {
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    // Caregiver info
    caregiverName: "",
    caregiverEmail: "",
    caregiverPhone: "",
    relationship: "",
    // Patient info
    patientName: "",
    patientYearOfBirth: new Date().getFullYear() - 65,
    patientGender: "",
    // Notification preferences
    notifyMissedMedication: true,
    notifyLowReminders: true,
    notifyAbnormalMetrics: true,
    contactMethod: "sms",
  })

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
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
  const patientAge = currentYear - formData.patientYearOfBirth

  const isStep1Valid = formData.caregiverName && formData.caregiverEmail && formData.relationship
  const isStep2Valid = formData.patientName && formData.patientYearOfBirth && formData.patientGender
  const isStep3Valid = true

  const getStepValidation = () => {
    if (step === 1) return isStep1Valid
    if (step === 2) return isStep2Valid
    if (step === 3) return isStep3Valid
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
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full flex-1 transition-all ${i <= step ? "bg-primary" : "bg-border"}`}
            />
          ))}
        </div>

        {/* Step Title */}
        <div className="mt-8 mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            {step === 1 && "Your Information"}
            {step === 2 && "Patient Information"}
            {step === 3 && "Notification Settings"}
          </h2>
          <p className="text-muted-foreground text-sm">
            {step === 1 && "Tell us about yourself"}
            {step === 2 && "Information about the person you're caring for"}
            {step === 3 && "How should we notify you?"}
          </p>
        </div>
      </div>

      {/* Form Content */}
      <div className="flex-1 max-w-2xl mx-auto w-full">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Step 1: Caregiver Information */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="space-y-2">
                <label htmlFor="caregiverName" className="text-sm font-semibold text-foreground">
                  Your Full Name <span className="text-accent">*</span>
                </label>
                <Input
                  id="caregiverName"
                  type="text"
                  placeholder="Jane Doe"
                  value={formData.caregiverName}
                  onChange={(e) => handleInputChange("caregiverName", e.target.value)}
                  className="h-11 bg-white focus:border-primary focus:ring-1 focus:ring-primary text-base"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="caregiverEmail" className="text-sm font-semibold text-foreground">
                  Email Address <span className="text-accent">*</span>
                </label>
                <Input
                  id="caregiverEmail"
                  type="email"
                  placeholder="jane@example.com"
                  value={formData.caregiverEmail}
                  onChange={(e) => handleInputChange("caregiverEmail", e.target.value)}
                  className="h-11 bg-white focus:border-primary focus:ring-1 focus:ring-primary text-base"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="caregiverPhone" className="text-sm font-semibold text-foreground">
                  Phone Number (Optional)
                </label>
                <Input
                  id="caregiverPhone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={formData.caregiverPhone}
                  onChange={(e) => handleInputChange("caregiverPhone", e.target.value)}
                  className="h-11 bg-white focus:border-primary focus:ring-1 focus:ring-primary text-base"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">
                  Relationship to Patient <span className="text-accent">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {relationshipOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => handleInputChange("relationship", option)}
                      className={`py-3 px-4 rounded-lg font-medium border transition-all text-sm ${
                        formData.relationship === option
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

          {/* Step 2: Patient Information */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <Card className="bg-blue-50 border-blue-200 p-4 flex items-start gap-3">
                <Users className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-foreground mb-1">Patient Information</p>
                  <p className="text-sm text-muted-foreground">
                    Provide details about the person you're helping to manage their medications.
                  </p>
                </div>
              </Card>

              <div className="space-y-2">
                <label htmlFor="patientName" className="text-sm font-semibold text-foreground">
                  Patient's Full Name <span className="text-accent">*</span>
                </label>
                <Input
                  id="patientName"
                  type="text"
                  placeholder="John Doe"
                  value={formData.patientName}
                  onChange={(e) => handleInputChange("patientName", e.target.value)}
                  className="h-11 bg-white focus:border-primary focus:ring-1 focus:ring-primary text-base"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="patientYearOfBirth" className="text-sm font-semibold text-foreground">
                  Year of Birth <span className="text-accent">*</span>
                </label>
                <div className="flex gap-3">
                  <Input
                    id="patientYearOfBirth"
                    type="number"
                    min="1924"
                    max={currentYear}
                    value={formData.patientYearOfBirth}
                    onChange={(e) => handleInputChange("patientYearOfBirth", Number.parseInt(e.target.value))}
                    className="h-11 flex-1 bg-white focus:border-primary focus:ring-1 focus:ring-primary text-base"
                    required
                  />
                  <div className="flex items-center px-4 bg-blue-50 rounded-lg border border-border text-foreground font-medium min-w-max">
                    Age: {patientAge}
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
                      onClick={() => handleInputChange("patientGender", option)}
                      className={`py-3 px-4 rounded-lg font-medium border transition-all ${
                        formData.patientGender === option
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

          {/* Step 3: Notification Settings */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <Card className="bg-accent/5 border-accent/20 p-4 flex items-start gap-3">
                <Bell className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-foreground mb-1">Notification Preferences</p>
                  <p className="text-sm text-muted-foreground">
                    Choose when you want to be notified about {formData.patientName || "the patient"}.
                  </p>
                </div>
              </Card>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white border border-border rounded-lg hover:border-primary/50 transition-colors cursor-pointer">
                  <div>
                    <p className="font-semibold text-foreground text-sm">Missed Medication</p>
                    <p className="text-xs text-muted-foreground">Alert when medication is not taken on time</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.notifyMissedMedication}
                    onChange={(e) => handleInputChange("notifyMissedMedication", e.target.checked)}
                    className="w-5 h-5 cursor-pointer accent-primary"
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-white border border-border rounded-lg hover:border-primary/50 transition-colors cursor-pointer">
                  <div>
                    <p className="font-semibold text-foreground text-sm">Low Medication Reminders</p>
                    <p className="text-xs text-muted-foreground">Alert when medication supply is running low</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.notifyLowReminders}
                    onChange={(e) => handleInputChange("notifyLowReminders", e.target.checked)}
                    className="w-5 h-5 cursor-pointer accent-primary"
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-white border border-border rounded-lg hover:border-primary/50 transition-colors cursor-pointer">
                  <div>
                    <p className="font-semibold text-foreground text-sm">Abnormal Health Metrics</p>
                    <p className="text-xs text-muted-foreground">Alert for unusual vital signs or symptoms</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.notifyAbnormalMetrics}
                    onChange={(e) => handleInputChange("notifyAbnormalMetrics", e.target.checked)}
                    className="w-5 h-5 cursor-pointer accent-primary"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Preferred Contact Method</label>
                <div className="grid grid-cols-3 gap-2">
                  {["sms", "email", "call"].map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => handleInputChange("contactMethod", method)}
                      className={`py-3 px-4 rounded-lg font-medium border transition-all text-sm ${
                        formData.contactMethod === method
                          ? "bg-primary text-white border-primary"
                          : "bg-white text-foreground border-border hover:border-primary/50"
                      }`}
                    >
                      {method === "sms" ? "Text" : method === "call" ? "Call" : "Email"}
                    </button>
                  ))}
                </div>
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
              type={step === 3 ? "submit" : "button"}
              onClick={() => {
                if (step < 3) setStep(step + 1)
              }}
              disabled={!getStepValidation() || isLoading}
              className="flex-1 h-11 bg-primary hover:bg-primary/90 text-white font-semibold"
            >
              {isLoading ? "Finishing..." : step === 3 ? "Complete Setup" : "Continue"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
