"use client"

import { Heart, Users, UserCircle } from "lucide-react"

interface RoleSelectionProps {
  onNavigate: (role: "patient" | "caregiver") => void
}

export default function RoleSelection({ onNavigate }: RoleSelectionProps) {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-b from-blue-50 to-white px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-center mb-12">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold text-foreground">MedIntel</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-2">How are you using MedIntel?</h2>
          <p className="text-muted-foreground">Select your role to continue</p>
        </div>

        <div className="space-y-4">
          {/* Patient Card */}
          <button
            onClick={() => onNavigate("patient")}
            className="w-full p-6 bg-white border-2 border-border hover:border-primary hover:shadow-lg rounded-xl transition-all group"
          >
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-primary/10 group-hover:bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors">
                <UserCircle className="w-8 h-8 text-primary" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-bold text-foreground mb-1">I am a Patient</h3>
                <p className="text-sm text-muted-foreground">Track my own medications and health information</p>
              </div>
            </div>
          </button>

          {/* Caregiver Card */}
          <button
            onClick={() => onNavigate("caregiver")}
            className="w-full p-6 bg-white border-2 border-border hover:border-accent hover:shadow-lg rounded-xl transition-all group"
          >
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-accent/10 group-hover:bg-accent/20 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors">
                <Users className="w-8 h-8 text-accent" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-bold text-foreground mb-1">I am a Caregiver</h3>
                <p className="text-sm text-muted-foreground">Help manage medications for a loved one</p>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-muted-foreground">
        <p>© 2025 MedIntel. All rights reserved.</p>
      </div>
    </div>
  )
}
