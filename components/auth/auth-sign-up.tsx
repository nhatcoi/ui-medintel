"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Heart, Mail, Lock, ArrowLeft } from "lucide-react"

interface SignUpProps {
  onNavigate: (screen: string) => void
}

export default function SignUp({ onNavigate }: SignUpProps) {
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [otp, setOtp] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    if (step === 1 && password === confirmPassword) {
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false)
        setStep(2)
      }, 1000)
    }
  }

  const handleOTPVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      onNavigate("role-selection")
    }, 1000)
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-b from-white to-slate-50 px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-12">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold text-foreground">MedIntel</h1>
        </div>
        <button onClick={() => onNavigate("sign-in")} className="text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>

      {/* Form Container */}
      <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-2">Create Account</h2>
          <p className="text-muted-foreground text-sm">{step === 1 ? "Set up your account" : "Verify your email"}</p>
        </div>

        {/* Step 1: Email & Password */}
        {step === 1 && (
          <form onSubmit={handleSignUp} className="space-y-4 mb-6">
            <div className="space-y-2">
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Email or phone number"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12 bg-white focus:border-primary focus:ring-1 focus:ring-primary"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 h-12 bg-white focus:border-primary focus:ring-1 focus:ring-primary"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="sr-only">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 w-5 h-5 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10 h-12 bg-white focus:border-primary focus:ring-1 focus:ring-primary"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading || password !== confirmPassword}
              className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-semibold"
            >
              {isLoading ? "Creating account..." : "Continue"}
            </Button>
          </form>
        )}

        {/* Step 2: OTP Verification */}
        {step === 2 && (
          <form onSubmit={handleOTPVerify} className="space-y-4 mb-6">
            <p className="text-sm text-muted-foreground text-center mb-4">We sent a verification code to {email}</p>
            <div className="space-y-2">
              <label htmlFor="otp" className="sr-only">
                Verification Code
              </label>
              <Input
                id="otp"
                type="text"
                placeholder="Enter 6-digit code"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                className="h-12 bg-white text-center text-lg font-semibold focus:border-primary focus:ring-1 focus:ring-primary"
                required
              />
            </div>
            <Button
              type="submit"
              disabled={isLoading || otp.length !== 6}
              className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-semibold"
            >
              {isLoading ? "Verifying..." : "Verify & Continue"}
            </Button>
          </form>
        )}

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <button onClick={() => onNavigate("sign-in")} className="text-primary hover:text-primary/80 font-semibold">
              Sign in
            </button>
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-muted-foreground space-y-2">
        <p>Your health information is encrypted and secure</p>
        <p>© 2025 MedIntel. All rights reserved.</p>
      </div>
    </div>
  )
}
