"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Heart, Mail, Lock, Apple } from "lucide-react"

interface LoginScreenProps {
  onNavigate: () => void
}

export default function LoginScreen({ onNavigate }: LoginScreenProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      onNavigate()
    }, 1000)
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-b from-white to-slate-50 px-6 py-8 md:px-8">
      {/* Header with Logo */}
      <div className="flex items-center justify-center mb-12">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold text-foreground">MedIntel</h1>
        </div>
      </div>

      {/* Login Form Container */}
      <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
        {/* Title Section */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-2">Welcome Back</h2>
          <p className="text-muted-foreground text-sm">Manage your health information securely</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4 mb-6">
          {/* Email/Phone Input */}
          <div className="space-y-2">
            <label htmlFor="email" className="sr-only">
              Email or Phone Number
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 w-5 h-5 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="Email or phone number"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 h-12 border-border bg-white focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          {/* Password Input */}
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
                className="pl-10 h-12 border-border bg-white focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          {/* Forgot Password Link */}
          <div className="text-right mb-4">
            <a href="#" className="text-sm text-primary hover:text-primary/80 font-medium">
              Forgot password?
            </a>
          </div>

          {/* Login Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-colors"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-border"></div>
          <span className="text-xs text-muted-foreground font-medium">OR</span>
          <div className="flex-1 h-px bg-border"></div>
        </div>

        {/* Social Login Buttons */}
        <div className="space-y-3">
          <button className="w-full h-12 border border-border bg-white hover:bg-slate-50 rounded-lg flex items-center justify-center gap-3 transition-colors font-medium text-foreground">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Sign in with Google
          </button>

          <button className="w-full h-12 border border-border bg-white hover:bg-slate-50 rounded-lg flex items-center justify-center gap-3 transition-colors font-medium text-foreground">
            <Apple className="w-5 h-5" />
            Sign in with Apple
          </button>
        </div>

        {/* Sign Up Link */}
        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <a href="#" className="text-primary hover:text-primary/80 font-semibold">
              Sign up
            </a>
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-muted-foreground space-y-2">
        <p>Your health information is encrypted and secure</p>
        <p>© 2025 MediCare. All rights reserved.</p>
      </div>
    </div>
  )
}
