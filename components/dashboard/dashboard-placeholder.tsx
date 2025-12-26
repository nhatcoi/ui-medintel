"use client"

import { Heart, LogOut, Settings, Pill, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface DashboardPlaceholderProps {
  onNavigate: (screen: string) => void
}

export default function DashboardPlaceholder({ onNavigate }: DashboardPlaceholderProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-foreground">MedIntel</h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-slate-50 rounded-lg transition-colors">
              <Bell className="w-5 h-5 text-muted-foreground" />
            </button>
            <button className="p-2 hover:bg-slate-50 rounded-lg transition-colors">
              <Settings className="w-5 h-5 text-muted-foreground" />
            </button>
            <Button onClick={() => onNavigate("welcome")} variant="outline" className="h-10 border-border">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-2">Welcome to MedIntel</h2>
          <p className="text-lg text-muted-foreground">Your medication management dashboard</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="p-6 bg-white border-border">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Medications Today</p>
                <p className="text-3xl font-bold text-foreground">3</p>
                <p className="text-xs text-green-600 mt-2">All taken on time</p>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <Pill className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white border-border">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Upcoming Doses</p>
                <p className="text-3xl font-bold text-foreground">2</p>
                <p className="text-xs text-blue-600 mt-2">Next in 3 hours</p>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <Bell className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white border-border">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Medication Streak</p>
                <p className="text-3xl font-bold text-foreground">7</p>
                <p className="text-xs text-primary mt-2">Days in a row</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-primary" />
              </div>
            </div>
          </Card>
        </div>

        {/* Today's Medications */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-foreground mb-6">Today's Medications</h3>
          <div className="space-y-4">
            {[
              { time: "08:00 AM", medication: "Lisinopril 10mg", status: "taken" },
              { time: "12:00 PM", medication: "Metformin 500mg", status: "taken" },
              { time: "06:00 PM", medication: "Atorvastatin 20mg", status: "pending" },
            ].map((item, index) => (
              <Card key={index} className="p-4 bg-white border-border flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <div>
                    <p className="font-semibold text-foreground">{item.medication}</p>
                    <p className="text-sm text-muted-foreground">{item.time}</p>
                  </div>
                </div>
                <div
                  className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                    item.status === "taken" ? "bg-green-50 text-green-700" : "bg-yellow-50 text-yellow-700"
                  }`}
                >
                  {item.status === "taken" ? "Taken" : "Pending"}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Info Section */}
        <Card className="p-6 bg-blue-50 border-blue-200">
          <div className="flex items-start gap-4">
            <Heart className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-bold text-foreground mb-2">Dashboard Setup Complete</h4>
              <p className="text-sm text-muted-foreground mb-3">
                You're all set to start managing your medications safely with MedIntel. Your health information is
                encrypted and stored securely.
              </p>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Receive medication reminders at your preferred times</li>
                <li>Track your medication adherence and health metrics</li>
                <li>Share emergency information with trusted caregivers</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
