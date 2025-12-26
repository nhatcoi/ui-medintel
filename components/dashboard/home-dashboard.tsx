"use client"

import { useState } from "react"
import {
  Heart,
  LogOut,
  Settings,
  Pill,
  Bell,
  Clock,
  AlertCircle,
  CheckCircle2,
  Camera,
  Users,
  Plus,
  ArrowRight,
  Activity,
  Calendar,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface HomeDashboardProps {
  onNavigate: (screen: string) => void
  userRole?: "patient" | "caregiver"
  userName?: string
}

interface Medication {
  id: string
  name: string
  dosage: string
  time: string
  status: "taken" | "upcoming" | "missed"
  nextDue?: string
}

export default function HomeDashboard({ onNavigate, userRole = "patient", userName = "Lan" }: HomeDashboardProps) {
  const [medications, setMedications] = useState<Medication[]>([
    { id: "1", name: "Lisinopril", dosage: "10mg", time: "08:00 AM", status: "taken" },
    { id: "2", name: "Metformin", dosage: "500mg", time: "12:00 PM", status: "upcoming", nextDue: "2 hours" },
    { id: "3", name: "Atorvastatin", dosage: "20mg", time: "06:00 PM", status: "upcoming", nextDue: "8 hours" },
  ])

  const handleMarkAsTaken = (id: string) => {
    setMedications(medications.map((med) => (med.id === id ? { ...med, status: "taken" as const } : med)))
  }

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good morning"
    if (hour < 18) return "Good afternoon"
    return "Good evening"
  }

  const takenCount = medications.filter((m) => m.status === "taken").length
  const totalCount = medications.length
  const progressValue = totalCount > 0 ? (takenCount / totalCount) * 100 : 0

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-600">
                MedIntel
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="text-slate-500 hover:text-blue-600 hover:bg-blue-50">
                <Bell className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-slate-500 hover:text-blue-600 hover:bg-blue-50">
                <Settings className="w-5 h-5" />
              </Button>
              <div className="h-8 w-[1px] bg-slate-200 mx-2" />
              <Button
                variant="outline"
                onClick={() => onNavigate("welcome")}
                className="border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-red-600 hover:border-red-100 transition-all"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8">
          {/* Hero Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-none px-3 py-1">
                  {userRole === "patient" ? "Patient Account" : "Caregiver Account"}
                </Badge>
                <Badge variant="outline" className="text-slate-500 border-slate-200">
                  <Calendar className="w-3 h-3 mr-1" />
                  {new Date().toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}
                </Badge>
              </div>
              <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
                {getGreeting()}, <span className="text-blue-600">{userName}</span>
              </h1>
              <p className="mt-2 text-lg text-slate-500">
                {userRole === "patient"
                  ? "Your health journey is looking great today."
                  : `Monitoring health status for ${userName}.`}
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200 rounded-2xl h-14 px-6 flex items-center gap-2 transition-all transform hover:scale-[1.02]"
                onClick={() => onNavigate("prescription-flow")}
              >
                <Plus className="w-5 h-5" />
                Add Prescription
              </Button>
            </div>
          </div>

          {/* Quick Stats & Progress */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-6 border-none shadow-sm bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Activity className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium bg-white/20 px-2 py-1 rounded-full uppercase tracking-wider">
                  Today
                </span>
              </div>
              <p className="text-blue-100 text-sm font-medium mb-1">Adherence Rate</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">{Math.round(progressValue)}%</span>
                <span className="text-blue-200 text-xs">+{takenCount} doses</span>
              </div>
              <Progress value={progressValue} className="h-2 bg-white/20 mt-4" />
            </Card>

            <Card className="p-6 border-none shadow-sm bg-white group hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-green-50 rounded-lg group-hover:bg-green-100 transition-colors">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                </div>
              </div>
              <p className="text-slate-400 text-sm font-medium mb-1">Doses Taken</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-slate-900">{takenCount}</span>
                <span className="text-slate-400 text-xs">of {totalCount} total</span>
              </div>
              <div className="mt-4 flex gap-1">
                {[...Array(totalCount)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 flex-1 rounded-full ${i < takenCount ? "bg-green-500" : "bg-slate-100"}`}
                  />
                ))}
              </div>
            </Card>

            <Card className="p-6 border-none shadow-sm bg-white group hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-amber-50 rounded-lg group-hover:bg-amber-100 transition-colors">
                  <Clock className="w-5 h-5 text-amber-600" />
                </div>
              </div>
              <p className="text-slate-400 text-sm font-medium mb-1">Next Lesson</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-slate-900">
                  {medications.find((m) => m.status === "upcoming")?.time || "Done"}
                </span>
              </div>
              <p className="mt-4 text-xs text-slate-500 flex items-center gap-1">
                {medications.find((m) => m.status === "upcoming")?.name || "No more doses today"}
              </p>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Medication Timeline */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-900">Medication Schedule</h2>
                <Button variant="link" className="text-blue-600 font-semibold p-0 h-auto">
                  View All <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>

              {medications.length === 0 ? (
                <Card className="p-12 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center bg-transparent">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                    <Pill className="w-8 h-8 text-slate-300" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Empty Schedule</h3>
                  <p className="text-slate-500 max-w-xs mt-1">
                    You haven't added any medications yet. Use the scan or manual entry to start.
                  </p>
                  <Button
                    onClick={() => onNavigate("prescription-flow")}
                    className="mt-6 bg-blue-600 hover:bg-blue-700"
                  >
                    Add Now
                  </Button>
                </Card>
              ) : (
                <div className="space-y-4">
                  {medications.map((med) => (
                    <Card key={med.id} className="p-0 overflow-hidden border-none shadow-sm hover:shadow-md transition-all">
                      <div className="flex h-full">
                        <div
                          className={`w-2 ${med.status === "taken"
                              ? "bg-green-500"
                              : med.status === "missed"
                                ? "bg-red-500"
                                : "bg-blue-500"
                            }`}
                        />
                        <div className="flex-1 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex items-start gap-4">
                            <div
                              className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${med.status === "taken"
                                  ? "bg-green-50"
                                  : med.status === "missed"
                                    ? "bg-red-50"
                                    : "bg-blue-50"
                                }`}
                            >
                              <Pill
                                className={`w-6 h-6 ${med.status === "taken"
                                    ? "text-green-600"
                                    : med.status === "missed"
                                      ? "text-red-600"
                                      : "text-blue-600"
                                  }`}
                              />
                            </div>
                            <div>
                              <h4 className="text-lg font-bold text-slate-900 leading-tight">{med.name}</h4>
                              <p className="text-slate-500 text-sm font-medium">
                                {med.dosage} • <span className="text-slate-400 capitalize">{med.status}</span>
                              </p>
                              <div className="flex items-center gap-4 mt-2">
                                <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded-lg">
                                  <Clock className="w-3.5 h-3.5" />
                                  {med.time}
                                </span>
                                {med.nextDue && (
                                  <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">
                                    In {med.nextDue}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          {med.status === "upcoming" && (
                            <div className="flex gap-2">
                              <Button
                                onClick={() => handleMarkAsTaken(med.id)}
                                className="bg-green-600 hover:bg-green-700 text-white rounded-xl px-6 h-11"
                              >
                                Mark as Taken
                              </Button>
                              <Button
                                variant="outline"
                                className="border-slate-200 text-slate-600 rounded-xl h-11"
                              >
                                Remind Later
                              </Button>
                            </div>
                          )}
                          {med.status === "taken" && (
                            <div className="flex items-center text-green-600 font-bold bg-green-50 px-4 py-2 rounded-xl border border-green-100">
                              <CheckCircle2 className="w-5 h-5 mr-2" />
                              Completed
                            </div>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar Tools */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">Health Toolkit</h2>
              <div className="grid grid-cols-1 gap-4">
                <Card
                  className="p-4 border-none shadow-sm bg-white hover:bg-blue-50 transition-colors cursor-pointer group"
                  onClick={() => onNavigate("prescription-flow")}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <Camera className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 group-hover:text-blue-700">Scan Prescription</h4>
                      <p className="text-xs text-slate-500">AI-powered medication entry</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 border-none shadow-sm bg-white hover:bg-indigo-50 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                      <Users className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 group-hover:text-indigo-700">Caregiver Contact</h4>
                      <p className="text-xs text-slate-500">Quickly reach your support</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 border-none shadow-sm bg-white hover:bg-red-50 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all">
                      <AlertCircle className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 group-hover:text-red-700">Drug Interactions</h4>
                      <p className="text-xs text-slate-500">Check safety & side effects</p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Health Tip */}
              <Card className="p-6 bg-gradient-to-br from-slate-800 to-slate-900 text-white border-none shadow-xl rounded-3xl overflow-hidden relative">
                <div className="relative z-10">
                  <Badge className="bg-blue-500 text-white border-none mb-4">Health Tip</Badge>
                  <h4 className="text-lg font-bold mb-2">Hydration is Key</h4>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Drinking water with your medication helps absorption and prevents throat irritation. Aim for a full
                    glass!
                  </p>
                  <Button variant="link" className="text-blue-400 p-0 mt-4 font-bold">
                    Learn more about absorption
                  </Button>
                </div>
                <div className="absolute top-[-20px] right-[-20px] w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
