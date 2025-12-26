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
                <Button variant="ghost" size="icon" onClick={onCancel} className="rounded-full hover:bg-[#c2efff]/30 text-[#03428e]">
                    <ArrowLeft className="w-5 h-5" />
                </Button>
                <h2 className="text-2xl font-black text-slate-900">Nhập thủ công</h2>
            </div>

            <Card className="p-8 border-[#03428e]/10 shadow-sm rounded-[2rem] bg-white">
                <div className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="med-name" className="text-slate-700 font-extrabold uppercase tracking-tight text-xs ml-1">Tên thuốc</Label>
                        <Input
                            id="med-name"
                            placeholder="VD: Paracetamol"
                            className="h-14 rounded-2xl border-slate-100 bg-slate-50 focus:bg-white focus:ring-[#03428e]/20 transition-all font-bold"
                            value={medData.name}
                            onChange={(e) => setMedData({ ...medData, name: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="dosage" className="text-slate-700 font-extrabold uppercase tracking-tight text-xs ml-1">Liều lượng</Label>
                            <Input
                                id="dosage"
                                placeholder="VD: 500mg"
                                className="h-14 rounded-2xl border-slate-100 bg-slate-50 focus:bg-white focus:ring-[#03428e]/20 transition-all font-bold"
                                value={medData.dosage}
                                onChange={(e) => setMedData({ ...medData, dosage: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="duration" className="text-slate-700 font-extrabold uppercase tracking-tight text-xs ml-1">Số ngày uống</Label>
                            <Input
                                id="duration"
                                type="number"
                                className="h-14 rounded-2xl border-slate-100 bg-slate-50 focus:bg-white focus:ring-[#03428e]/20 transition-all font-bold"
                                value={medData.duration}
                                onChange={(e) => setMedData({ ...medData, duration: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label className="text-slate-700 font-extrabold uppercase tracking-tight text-xs ml-1">Thời gian nhắc nhở</Label>
                            <Button variant="outline" size="sm" onClick={handleAddTime} className="text-[#03428e] border-[#03428e]/20 hover:bg-[#c2efff]/30 h-9 rounded-xl font-bold px-4">
                                <Plus className="w-4 h-4 mr-1" /> Thêm giờ
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {medData.times.map((time, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                    <div className="relative flex-1">
                                        <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#03428e]/40" />
                                        <Input
                                            type="text"
                                            value={time}
                                            onChange={(e) => handleTimeChange(idx, e.target.value)}
                                            className="pl-11 h-12 rounded-xl bg-slate-50 border-slate-100 font-bold focus:bg-white transition-all shadow-sm"
                                        />
                                    </div>
                                    {medData.times.length > 1 && (
                                        <Button variant="ghost" size="icon" onClick={() => handleRemoveTime(idx)} className="text-slate-300 hover:text-[#f26523] hover:bg-[#f26523]/5 rounded-full h-10 w-10 transition-colors">
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
                <Button onClick={onCancel} variant="outline" className="flex-1 h-15 rounded-2xl border-slate-200 font-bold text-slate-500 hover:bg-slate-50">
                    Hủy bỏ
                </Button>
                <Button onClick={onComplete} className="flex-[2] h-15 bg-[#03428e] hover:bg-[#03428e]/90 text-white rounded-2xl font-black shadow-xl shadow-[#03428e]/20 tracking-tight">
                    Lưu thông tin thuốc
                </Button>
            </div>
        </div>
    )
}
