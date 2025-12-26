"use client"

import { useState } from "react"
import { Pill, Clock, Calendar, CheckCircle2, ArrowLeft, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ManualEntry({ onComplete, onCancel }: { onComplete: () => void; onCancel: () => void }) {
    const [medData, setMedData] = useState({
        name: "",
        dosage: "",
        frequency: "2",
        times: ["07:00 AM", "07:00 PM"],
        duration: "5",
    })

    const handleAddTime = () => {
        setMedData({ ...medData, times: [...medData.times, "12:00 PM"] })
    }

    const handleRemoveTime = (index: number) => {
        const newTimes = medData.times.filter((_, i) => i !== index)
        setMedData({ ...medData, times: newTimes })
    }

    const handleTimeChange = (index: number, value: string) => {
        const newTimes = [...medData.times]
        newTimes[index] = value
        setMedData({ ...medData, times: newTimes })
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={onCancel} className="rounded-full">
                    <ArrowLeft className="w-5 h-5" />
                </Button>
                <h2 className="text-2xl font-bold text-slate-900">Manual Entry</h2>
            </div>

            <Card className="p-6 border-slate-200">
                <div className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="med-name" className="text-slate-700 font-bold">Medication Name</Label>
                        <Input
                            id="med-name"
                            placeholder="e.g. Paracetamol"
                            className="h-12 rounded-xl"
                            value={medData.name}
                            onChange={(e) => setMedData({ ...medData, name: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="dosage" className="text-slate-700 font-bold">Dosage</Label>
                            <Input
                                id="dosage"
                                placeholder="e.g. 500mg"
                                className="h-12 rounded-xl"
                                value={medData.dosage}
                                onChange={(e) => setMedData({ ...medData, dosage: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="duration" className="text-slate-700 font-bold">Duration (Days)</Label>
                            <Input
                                id="duration"
                                type="number"
                                className="h-12 rounded-xl"
                                value={medData.duration}
                                onChange={(e) => setMedData({ ...medData, duration: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label className="text-slate-700 font-bold">Reminder Times</Label>
                            <Button variant="outline" size="sm" onClick={handleAddTime} className="text-blue-600 border-blue-200 hover:bg-blue-50 h-8 rounded-lg">
                                <Plus className="w-4 h-4 mr-1" /> Add Time
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {medData.times.map((time, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                    <div className="relative flex-1">
                                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                        <Input
                                            type="text"
                                            value={time}
                                            onChange={(e) => handleTimeChange(idx, e.target.value)}
                                            className="pl-10 h-11 rounded-xl bg-slate-50 border-slate-100"
                                        />
                                    </div>
                                    {medData.times.length > 1 && (
                                        <Button variant="ghost" size="icon" onClick={() => handleRemoveTime(idx)} className="text-slate-300 hover:text-red-500 rounded-full h-8 w-8">
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Card>

            <div className="flex gap-4">
                <Button onClick={onCancel} variant="outline" className="flex-1 h-14 rounded-2xl border-slate-200">
                    Cancel
                </Button>
                <Button onClick={onComplete} className="flex-[2] h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold shadow-lg shadow-blue-100">
                    Save Medication
                </Button>
            </div>
        </div>
    )
}
