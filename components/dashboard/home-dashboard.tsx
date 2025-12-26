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
    if (hour < 12) return "Chào buổi sáng"
    if (hour < 18) return "Chào buổi chiều"
    return "Chào buổi tối"
  }

  const takenCount = medications.filter((m) => m.status === "taken").length
  const totalCount = medications.length
  const progressValue = totalCount > 0 ? (takenCount / totalCount) * 100 : 0

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#03428e]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-[#03428e] rounded-xl flex items-center justify-center shadow-lg shadow-[#03428e]/20">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-[#03428e]">
                MedIntel
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="text-slate-500 hover:text-[#03428e] hover:bg-[#c2efff]/30">
                <Bell className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-slate-500 hover:text-[#03428e] hover:bg-[#c2efff]/30">
                <Settings className="w-5 h-5" />
              </Button>
              <div className="h-8 w-[1px] bg-slate-200 mx-2" />
              <Button
                variant="outline"
                onClick={() => onNavigate("welcome")}
                className="border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-[#f26523] hover:border-[#f26523]/20 transition-all"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Đăng xuất
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
                <Badge variant="secondary" className="bg-[#c2efff] text-[#03428e] hover:bg-[#c2efff] border-none px-3 py-1 font-semibold">
                  {userRole === "patient" ? "Tài khoản Bệnh nhân" : "Tài khoản Người thân"}
                </Badge>
                <Badge variant="outline" className="text-slate-500 border-slate-200">
                  <Calendar className="w-3 h-3 mr-1" />
                  {new Date().toLocaleDateString("vi-VN", { weekday: "long", month: "long", day: "numeric" })}
                </Badge>
              </div>
              <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
                {getGreeting()}, <span className="text-[#03428e]">{userName}</span>
              </h1>
              <p className="mt-2 text-lg text-slate-500 font-medium">
                {userRole === "patient"
                  ? "Hôm nay sức khỏe của bạn đang rất tốt."
                  : `Đang theo dõi tình trạng sức khỏe của ${userName}.`}
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                size="lg"
                className="bg-[#03428e] hover:bg-[#03428e]/90 text-white shadow-lg shadow-[#03428e]/20 rounded-2xl h-14 px-6 flex items-center gap-2 transition-all transform hover:scale-[1.02]"
                onClick={() => onNavigate("prescription-flow")}
              >
                <Plus className="w-5 h-5" />
                Thêm đơn thuốc
              </Button>
            </div>
          </div>

          {/* Quick Stats & Progress */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-6 border-none shadow-sm bg-gradient-to-br from-[#03428e] to-[#044db3] text-white overflow-hidden relative">
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-white/10 rounded-lg">
                    <Activity className="w-5 h-5 text-[#c2efff]" />
                  </div>
                  <span className="text-xs font-bold bg-white/10 px-2 py-1 rounded-full uppercase tracking-wider">
                    Hôm nay
                  </span>
                </div>
                <p className="text-[#c2efff]/80 text-sm font-bold mb-1">Tỷ lệ tuân thủ</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold">{Math.round(progressValue)}%</span>
                  <span className="text-[#c2efff]/60 text-xs text-nowrap">+{takenCount} liều đã uống</span>
                </div>
                <Progress value={progressValue} className="h-2 bg-white/10 mt-4" />
              </div>
              <div className="absolute top-[-20%] right-[-10%] w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
            </Card>

            <Card className="p-6 border-none shadow-sm bg-white group hover:shadow-md transition-all border-l-4 border-l-green-500">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-green-50 rounded-lg group-hover:bg-green-100 transition-colors">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                </div>
              </div>
              <p className="text-slate-400 text-sm font-bold mb-1 uppercase tracking-tight">Số liều đã uống</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-slate-900">{takenCount}</span>
                <span className="text-slate-400 text-xs font-medium">trên tổng {totalCount} liều</span>
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

            <Card className="p-6 border-none shadow-sm bg-white group hover:shadow-md transition-all border-l-4 border-l-[#f26523]">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-[#f26523]/10 rounded-lg group-hover:bg-[#f26523]/20 transition-colors">
                  <Clock className="w-5 h-5 text-[#f26523]" />
                </div>
              </div>
              <p className="text-slate-400 text-sm font-bold mb-1 uppercase tracking-tight">Liều tiếp theo</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-slate-900">
                  {medications.find((m) => m.status === "upcoming")?.time || "Hoàn tất"}
                </span>
              </div>
              <p className="mt-4 text-xs text-slate-500 flex items-center gap-1 font-semibold">
                {medications.find((m) => m.status === "upcoming")?.name || "Không còn liều nào hôm nay"}
              </p>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Medication Timeline */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-900">Lịch uống thuốc</h2>
                <Button variant="link" className="text-[#03428e] font-bold p-0 h-auto hover:text-[#f26523] transition-colors">
                  Xem tất cả <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>

              {medications.length === 0 ? (
                <Card className="p-12 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center bg-transparent rounded-3xl">
                  <div className="w-16 h-16 bg-[#c2efff]/30 rounded-full flex items-center justify-center mb-4">
                    <Pill className="w-8 h-8 text-[#03428e]/40" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Chưa có lịch uống thuốc</h3>
                  <p className="text-slate-500 max-w-xs mt-1 font-medium">
                    Bạn chưa thêm loại thuốc nào. Hãy sử dụng chức năng quét hoặc nhập thủ công.
                  </p>
                  <Button
                    onClick={() => onNavigate("prescription-flow")}
                    className="mt-6 bg-[#03428e] hover:bg-[#03428e]/90 text-white rounded-xl"
                  >
                    Thêm ngay
                  </Button>
                </Card>
              ) : (
                <div className="space-y-4">
                  {medications.map((med) => (
                    <Card key={med.id} className="p-0 overflow-hidden border-none shadow-sm hover:shadow-md transition-all rounded-3xl">
                      <div className="flex h-full">
                        <div
                          className={`w-2 ${med.status === "taken"
                              ? "bg-green-500"
                              : med.status === "missed"
                                ? "bg-red-500"
                                : "bg-[#03428e]"
                            }`}
                        />
                        <div className="flex-1 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex items-start gap-4">
                            <div
                              className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${med.status === "taken"
                                  ? "bg-green-50"
                                  : med.status === "missed"
                                    ? "bg-red-50"
                                    : "bg-[#c2efff]/40"
                                }`}
                            >
                              <Pill
                                className={`w-6 h-6 ${med.status === "taken"
                                    ? "text-green-600"
                                    : med.status === "missed"
                                      ? "text-red-600"
                                      : "text-[#03428e]"
                                  }`}
                              />
                            </div>
                            <div>
                              <h4 className="text-lg font-bold text-slate-900 leading-tight">{med.name}</h4>
                              <p className="text-slate-500 text-sm font-bold">
                                {med.dosage} • <span className={`capitalize ${med.status === "taken" ? "text-green-600" : med.status === "missed" ? "text-red-600" : "text-[#03428e]"
                                  }`}>{med.status === "taken" ? "Đã uống" : med.status === "missed" ? "Bỏ lỡ" : "Sắp tới"}</span>
                              </p>
                              <div className="flex items-center gap-4 mt-2">
                                <span className="flex items-center gap-1.5 text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1.5 rounded-lg">
                                  <Clock className="w-3.5 h-3.5" />
                                  {med.time}
                                </span>
                                {med.nextDue && (
                                  <span className="text-xs font-bold text-[#03428e] bg-[#c2efff] px-2.5 py-1.5 rounded-lg outline outline-[#03428e]/10">
                                    Còn {med.nextDue}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          {med.status === "upcoming" && (
                            <div className="flex gap-2">
                              <Button
                                onClick={() => handleMarkAsTaken(med.id)}
                                className="bg-[#03428e] hover:bg-[#03428e]/90 text-white rounded-xl px-6 h-11 font-bold"
                              >
                                Đã uống
                              </Button>
                              <Button
                                variant="outline"
                                className="border-slate-200 text-slate-600 rounded-xl h-11 font-bold hover:bg-[#c2efff]/20"
                              >
                                Nhắc lại sau
                              </Button>
                            </div>
                          )}
                          {med.status === "taken" && (
                            <div className="flex items-center text-green-600 font-bold bg-green-50 px-4 py-2 rounded-xl border border-green-100">
                              <CheckCircle2 className="w-5 h-5 mr-2" />
                              Hoàn tất
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
              <h2 className="text-2xl font-bold text-slate-900">Công cụ hỗ trợ</h2>
              <div className="grid grid-cols-1 gap-4">
                <Card
                  className="p-4 border-none shadow-sm bg-white hover:bg-[#c2efff]/20 transition-all cursor-pointer group rounded-3xl"
                  onClick={() => onNavigate("prescription-flow")}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#c2efff] rounded-2xl flex items-center justify-center text-[#03428e] group-hover:bg-[#03428e] group-hover:text-white transition-all shadow-sm">
                      <Camera className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 group-hover:text-[#03428e]">Quét đơn thuốc</h4>
                      <p className="text-xs text-slate-500 font-semibold">Tự động xử lý tài liệu y tế</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 border-none shadow-sm bg-white hover:bg-[#f26523]/5 transition-all cursor-pointer group rounded-3xl">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#f26523]/10 rounded-2xl flex items-center justify-center text-[#f26523] group-hover:bg-[#f26523] group-hover:text-white transition-all shadow-sm">
                      <Users className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 group-hover:text-[#f26523]">Người thân hỗ trợ</h4>
                      <p className="text-xs text-slate-500 font-semibold">Liên lạc nhanh với người thân</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 border-none shadow-sm bg-white hover:bg-[#03428e]/5 transition-all cursor-pointer group rounded-3xl">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#03428e]/10 rounded-2xl flex items-center justify-center text-[#03428e] group-hover:bg-[#03428e] group-hover:text-white transition-all shadow-sm">
                      <AlertCircle className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 group-hover:text-[#03428e]">Tương tác thuốc</h4>
                      <p className="text-xs text-slate-500 font-semibold">Kiểm tra an toàn & tác dụng phụ</p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Health Tip */}
              <Card className="p-6 bg-gradient-to-br from-[#03428e] to-[#011a3b] text-white border-none shadow-xl rounded-[2.5rem] overflow-hidden relative">
                <div className="relative z-10">
                  <Badge className="bg-[#f26523] text-white border-none mb-4 font-bold px-3 py-1">Lời khuyên sức khỏe</Badge>
                  <h4 className="text-lg font-bold mb-2">Uống đủ nước</h4>
                  <p className="text-slate-300 text-sm leading-relaxed font-medium">
                    Uống nước cùng với thuốc giúp cơ thể hấp thụ tốt hơn và tránh kích ứng cổ họng. Hãy uống hết một cốc nước đầy!
                  </p>
                  <Button variant="link" className="text-[#c2efff] p-0 mt-4 font-bold hover:text-white transition-colors">
                    Tìm hiểu thêm về hấp thụ thuốc
                  </Button>
                </div>
                <div className="absolute top-[-20px] right-[-20px] w-32 h-32 bg-[#c2efff]/10 rounded-full blur-3xl"></div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
