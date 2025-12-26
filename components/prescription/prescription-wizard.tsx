"use client"

import { useState, useEffect } from "react"
import {
    Camera,
    Upload,
    FileText,
    ShieldCheck,
    Calendar,
    CheckCircle2,
    ArrowRight,
    ArrowLeft,
    Loader2,
    AlertTriangle,
    Zap,
    Clock,
    Pill,
    ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

type Step = "upload" | "processing" | "analysis" | "safety" | "timeline" | "success"

interface PrescriptionData {
    ten_thuoc: string
    so_vien_moi_lan: number
    so_lan_ngay: number
    thoi_diem: string[]
    so_ngay: number
    instruction?: string
}

export default function PrescriptionWizard({ onComplete, onCancel }: { onComplete: () => void; onCancel: () => void }) {
    const [currentStep, setCurrentStep] = useState<Step>("upload")
    const [progress, setProgress] = useState(0)
    const [capturedImage, setCapturedImage] = useState<string | null>(null)
    const [structuredData, setStructuredData] = useState<PrescriptionData[]>([])

    // Progress mapping
    const stepProgress: Record<Step, number> = {
        upload: 20,
        processing: 40,
        analysis: 60,
        safety: 80,
        timeline: 95,
        success: 100,
    }

    useEffect(() => {
        setProgress(stepProgress[currentStep])
    }, [currentStep])

    const handleNext = () => {
        if (currentStep === "upload") setCurrentStep("processing")
        else if (currentStep === "processing") setCurrentStep("analysis")
        else if (currentStep === "analysis") setCurrentStep("safety")
        else if (currentStep === "safety") setCurrentStep("timeline")
        else if (currentStep === "timeline") setCurrentStep("success")
        else if (currentStep === "success") onComplete()
    }

    const handleBack = () => {
        if (currentStep === "processing") setCurrentStep("upload")
        else if (currentStep === "analysis") setCurrentStep("processing")
        else if (currentStep === "safety") setCurrentStep("analysis")
        else if (currentStep === "timeline") setCurrentStep("safety")
        else onCancel()
    }

    // Step 1: Upload
    const renderUpload = () => (
        <div className="space-y-6">
            <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-slate-900">Upload Prescription</h2>
                <p className="text-slate-500">Take a clear photo or upload an image of your prescription</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="p-8 border-2 border-dashed border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all cursor-pointer flex flex-col items-center justify-center gap-4 group">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                        <Camera className="w-8 h-8" />
                    </div>
                    <div className="text-center">
                        <p className="font-bold text-slate-900">Capture Image</p>
                        <p className="text-xs text-slate-500 mt-1">Use your device camera</p>
                    </div>
                </Card>

                <Card className="p-8 border-2 border-dashed border-slate-200 hover:border-indigo-500 hover:bg-indigo-50 transition-all cursor-pointer flex flex-col items-center justify-center gap-4 group">
                    <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                        <Upload className="w-8 h-8" />
                    </div>
                    <div className="text-center">
                        <p className="font-bold text-slate-900">Upload Photo</p>
                        <p className="text-xs text-slate-500 mt-1">Select from gallery</p>
                    </div>
                </Card>
            </div>

            <div className="bg-amber-50 rounded-xl p-4 border border-amber-100 flex gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                <p className="text-sm text-amber-800">
                    Ensure the photo is taken in good lighting and the text is clearly visible for better OCR results.
                </p>
            </div>

            <Button onClick={handleNext} className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-lg font-bold">
                Continue to AI Scanning
            </Button>
        </div>
    )

    // Step 2: Processing (Simulated)
    const renderProcessing = () => {
        return (
            <div className="py-12 flex flex-col items-center justify-center space-y-8">
                <div className="relative">
                    <div className="w-32 h-32 border-4 border-blue-100 rounded-full flex items-center justify-center animate-pulse">
                        <Zap className="w-12 h-12 text-blue-600" />
                    </div>
                    <div className="absolute top-0 left-0 w-32 h-32 border-t-4 border-blue-600 rounded-full animate-spin"></div>
                </div>

                <div className="text-center space-y-4 max-w-sm">
                    <h2 className="text-2xl font-bold text-slate-900">Analyzing Your Prescription</h2>
                    <div className="space-y-2">
                        <div className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                            <span>Enhancing image contrast...</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                            <span>Correcting perspective...</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-slate-900 font-bold">
                            <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                            <span>Extracting medical terms (OCR)...</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-slate-300">
                            <div className="w-4 h-4 border border-slate-200 rounded-full" />
                            <span>Structuring dosage data...</span>
                        </div>
                    </div>
                </div>

                <Button onClick={handleNext} variant="outline" className="border-slate-200">
                    Skip Animation (Demo)
                </Button>
            </div>
        )
    }

    // Step 3: Medical Analysis
    const renderAnalysis = () => (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-900">Extracted Information</h2>
                <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-none">
                    AI Suggestion
                </Badge>
            </div>

            <p className="text-slate-500">We've identified the following medications. Please verify they are correct.</p>

            <div className="space-y-4">
                {[
                    { name: "Paracetamol 500mg", dose: "1 pill", freq: "2 times/day", times: ["07:00 AM", "07:00 PM"], duration: "5 days" },
                    { name: "Amoxicillin 250mg", dose: "1 capsule", freq: "3 times/day", times: ["06:00 AM", "02:00 PM", "10:00 PM"], duration: "7 days" }
                ].map((med, idx) => (
                    <Card key={idx} className="p-4 border-slate-200 hover:border-blue-300 transition-all">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                                    <Pill className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900">{med.name}</h4>
                                    <p className="text-xs text-slate-500">{med.dose} • {med.freq}</p>
                                </div>
                            </div>
                            <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">Edit</Button>
                        </div>
                        <div className="flex gap-2 flex-wrap">
                            {med.times.map((t, i) => (
                                <Badge key={i} variant="outline" className="bg-slate-50 text-slate-600 border-slate-200 font-medium">
                                    {t}
                                </Badge>
                            ))}
                            <Badge variant="outline" className="bg-indigo-50 text-indigo-600 border-indigo-100 font-medium ml-auto">
                                {med.duration}
                            </Badge>
                        </div>
                    </Card>
                ))}
            </div>

            <div className="flex gap-4">
                <Button onClick={handleBack} variant="outline" className="flex-1 h-14 rounded-2xl border-slate-200 font-bold">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back
                </Button>
                <Button onClick={handleNext} className="flex-[2] h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold">
                    Verify & Security Check <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
            </div>
        </div>
    )

    // Step 4: Safety Check
    const renderSafety = () => (
        <div className="space-y-6">
            <div className="text-center py-4">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-4">
                    <ShieldCheck className="w-12 h-12" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Safety Verification</h2>
                <p className="text-slate-500">Checking for interactions and dosage safety</p>
            </div>

            <div className="space-y-4">
                <Card className="p-4 border-green-100 bg-green-50/50 flex gap-4 items-center">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 shrink-0">
                        <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="font-bold text-slate-900 text-sm">Safe Dosage</p>
                        <p className="text-xs text-slate-500">Dosages for all medications are within international medical standards.</p>
                    </div>
                </Card>

                <Card className="p-4 border-green-100 bg-green-50/50 flex gap-4 items-center">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 shrink-0">
                        <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="font-bold text-slate-900 text-sm">No Negative Interactions</p>
                        <p className="text-xs text-slate-500">The combination of medications does not present known risks.</p>
                    </div>
                </Card>

                <Card className="p-4 border-indigo-100 bg-indigo-50/50 flex gap-4 items-center">
                    <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 shrink-0">
                        <Zap className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="font-bold text-slate-900 text-sm">Antibiotic Awareness</p>
                        <p className="text-xs text-slate-500">Amoxicillin is an antibiotic. Please complete the full 7-day course.</p>
                    </div>
                </Card>
            </div>

            <Button onClick={handleNext} className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-lg font-bold shadow-lg shadow-blue-100">
                Generate My Schedule
            </Button>
        </div>
    )

    // Step 5: Timeline
    const renderTimeline = () => (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-900">Your New Timeline</h2>
                <Badge className="bg-indigo-600 text-white border-none">Active Schedule</Badge>
            </div>

            <div className="relative pl-6 border-l-2 border-slate-100 py-2 space-y-8">
                {[
                    { time: "06:00 AM", name: "Amoxicillin 250mg", note: "1 capsule • Before breakfast" },
                    { time: "07:00 AM", name: "Paracetamol 500mg", note: "1 pill • After breakfast" },
                    { time: "02:00 PM", name: "Amoxicillin 250mg", note: "1 capsule • After lunch" },
                ].map((item, i) => (
                    <div key={i} className="relative">
                        <div className="absolute -left-[31px] top-1.5 w-4 h-4 bg-white border-2 border-blue-600 rounded-full z-10" />
                        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-4">
                                <div className="text-blue-600 font-bold text-sm bg-blue-50 px-3 py-1 rounded-lg shrink-0">
                                    {item.time}
                                </div>
                                <div>
                                    <h5 className="font-bold text-slate-900">{item.name}</h5>
                                    <p className="text-xs text-slate-500">{item.note}</p>
                                </div>
                            </div>
                            <ChevronRight className="w-5 h-5 text-slate-300" />
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex gap-4">
                <Button onClick={handleBack} variant="outline" className="flex-1 h-14 rounded-2xl border-slate-200">
                    Re-verify
                </Button>
                <Button onClick={handleNext} className="flex-[2] h-14 bg-green-600 hover:bg-green-700 text-white rounded-2xl font-bold">
                    Confirm & Save Schedule
                </Button>
            </div>
        </div>
    )

    // Step 6: Success
    const renderSuccess = () => (
        <div className="py-12 flex flex-col items-center justify-center text-center space-y-6">
            <div className="w-24 h-24 bg-green-600 text-white rounded-full flex items-center justify-center shadow-2xl shadow-green-200 animate-bounce">
                <CheckCircle2 className="w-14 h-14" />
            </div>
            <div className="space-y-2">
                <h2 className="text-3xl font-extrabold text-slate-900">Success!</h2>
                <p className="text-slate-500 max-w-xs mx-auto">
                    Your medication schedule has been successfully created and added to your dashboard.
                </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 w-full max-w-sm">
                <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-slate-500">Notifications</span>
                    <Badge className="bg-green-100 text-green-700">Enabled</Badge>
                </div>
                <p className="text-xs text-slate-400">
                    We'll remind you 15 minutes before each dose. Stay healthy!
                </p>
            </div>

            <Button onClick={onComplete} className="w-full h-14 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl text-lg font-bold">
                Back to Dashboard
            </Button>
        </div>
    )

    return (
        <div className="space-y-8">
            {/* Mini Breadcrumbs */}
            <div className="flex items-center justify-between px-4">
                <div className="flex items-center gap-2">
                    {["upload", "processing", "analysis", "safety", "timeline"].map((s, i) => (
                        <div
                            key={s}
                            className={`h-1.5 w-8 rounded-full ${stepProgress[currentStep] >= stepProgress[s as Step]
                                    ? "bg-blue-600"
                                    : "bg-slate-200"
                                }`}
                        />
                    ))}
                </div>
                <span className="text-xs font-bold text-slate-400 tracking-widest uppercase">
                    Step {Object.keys(stepProgress).indexOf(currentStep) + 1} of 6
                </span>
            </div>

            <div className="mt-8">
                {currentStep === "upload" && renderUpload()}
                {currentStep === "processing" && renderProcessing()}
                {currentStep === "analysis" && renderAnalysis()}
                {currentStep === "safety" && renderSafety()}
                {currentStep === "timeline" && renderTimeline()}
                {currentStep === "success" && renderSuccess()}
            </div>
        </div>
    )
}
