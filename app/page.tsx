"use client"

import { useState } from "react"
import WelcomeCarousel from "@/components/onboarding/welcome-carousel"
import SignIn from "@/components/auth/auth-sign-in"
import SignUp from "@/components/auth/auth-sign-up"
import RoleSelection from "@/components/auth/role-selection"
import PatientOnboarding from "@/components/patient/patient-onboarding"
import CaregiverOnboarding from "@/components/caregiver/caregiver-onboarding"
import HomeDashboard from "@/components/dashboard/home-dashboard"
import PrescriptionWizard from "@/components/prescription/prescription-wizard"
import { Button } from "@/components/ui/button"

type Screen =
  | "welcome"
  | "sign-in"
  | "sign-up"
  | "role-selection"
  | "patient-onboarding"
  | "caregiver-onboarding"
  | "dashboard"
  | "prescription-flow"

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("welcome")
  const [userRole, setUserRole] = useState<"patient" | "caregiver">("patient")
  const [userName, setUserName] = useState<string>("Lan")

  const handleNavigation = (screen: Screen | string) => {
    setCurrentScreen(screen as Screen)
  }

  const goBack = () => {
    // Navigation history - go back to appropriate screen
    const backMap: Record<Screen, Screen> = {
      welcome: "welcome",
      "sign-in": "welcome",
      "sign-up": "sign-in",
      "role-selection": "sign-in",
      "patient-onboarding": "role-selection",
      "caregiver-onboarding": "role-selection",
      dashboard: "role-selection",
      "prescription-flow": "dashboard",
    }
    setCurrentScreen(backMap[currentScreen])
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Welcome Carousel */}
      {currentScreen === "welcome" && <WelcomeCarousel onComplete={() => handleNavigation("sign-in")} />}

      {/* Sign In Screen */}
      {currentScreen === "sign-in" && <SignIn onNavigate={handleNavigation} />}

      {/* Sign Up Screen */}
      {currentScreen === "sign-up" && <SignUp onNavigate={handleNavigation} />}

      {/* Role Selection Screen */}
      {currentScreen === "role-selection" && (
        <RoleSelection
          onNavigate={(role) => {
            setUserRole(role)
            if (role === "patient") {
              handleNavigation("patient-onboarding")
            } else {
              handleNavigation("caregiver-onboarding")
            }
          }}
        />
      )}

      {/* Patient Onboarding */}
      {currentScreen === "patient-onboarding" && (
        <PatientOnboarding
          onComplete={() => {
            setUserName("Lan")
            handleNavigation("dashboard")
          }}
          onBack={goBack}
        />
      )}

      {/* Caregiver Onboarding */}
      {currentScreen === "caregiver-onboarding" && (
        <CaregiverOnboarding
          onComplete={() => {
            setUserName("Lan")
            handleNavigation("dashboard")
          }}
          onBack={goBack}
        />
      )}

      {/* Home Dashboard */}
      {currentScreen === "dashboard" && (
        <HomeDashboard onNavigate={handleNavigation} userRole={userRole} userName={userName} />
      )}

      {/* Prescription Flow Wizard */}
      {currentScreen === "prescription-flow" && (
        <div className="min-h-screen bg-slate-50 py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-slate-900 mb-8 px-4">Add New Prescription</h1>
            {/* Prescription Wizard Flow */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-200">
              <PrescriptionWizard
                onComplete={() => handleNavigation("dashboard")}
                onCancel={() => handleNavigation("dashboard")}
              />
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
