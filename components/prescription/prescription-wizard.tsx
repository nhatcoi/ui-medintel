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
import ManualEntry from "./manual-entry"

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
    const [showManualEntry, setShowManualEntry] = useState(false)
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
                <h2 className="text-2xl font-bold text-slate-900">Thêm đơn thuốc mới</h2>
                <p className="text-slate-500 font-medium">Chọn phương thức bạn muốn thêm thông tin thuốc</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card
                    onClick={() => handleNext()}
                    className="p-8 border-2 border-dashed border-[#03428e]/20 hover:border-[#03428e] hover:bg-[#c2efff]/20 transition-all cursor-pointer flex flex-col items-center justify-center gap-4 group rounded-3xl"
                >
                    <div className="w-16 h-16 bg-[#c2efff] rounded-full flex items-center justify-center text-[#03428e] group-hover:bg-[#03428e] group-hover:text-white transition-all shadow-sm">
                        <Camera className="w-8 h-8" />
                    </div>
                    <div className="text-center">
                        <p className="font-bold text-slate-900 text-lg">Quét đơn thuốc</p>
                        <p className="text-xs text-slate-500 mt-1 font-semibold uppercase tracking-wider">Chụp ảnh hoặc tải tệp lên</p>
                    </div>
                </Card>

                <Card
                    onClick={() => setShowManualEntry(true)}
                    className="p-8 border-2 border-dashed border-[#f26523]/20 hover:border-[#f26523] hover:bg-[#f26523]/5 transition-all cursor-pointer flex flex-col items-center justify-center gap-4 group rounded-3xl"
                >
                    <div className="w-16 h-16 bg-[#f26523]/10 rounded-full flex items-center justify-center text-[#f26523] group-hover:bg-[#f26523] group-hover:text-white transition-all shadow-sm">
                        <FileText className="w-8 h-8" />
                    </div>
                    <div className="text-center">
                        <p className="font-bold text-slate-900 text-lg">Nhập thủ công</p>
                        <p className="text-xs text-slate-500 mt-1 font-semibold uppercase tracking-wider">Tự điền thông tin chi tiết</p>
                    </div>
                </Card>
            </div>

            <div className="bg-[#c2efff]/30 rounded-2xl p-6 border border-[#03428e]/10">
                <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#03428e] rounded-xl flex items-center justify-center text-white shrink-0 shadow-md">
                        <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                        <h4 className="font-bold text-[#03428e] text-sm mb-1 uppercase tracking-tight">Bảo mật thông tin</h4>
                        <p className="text-xs text-slate-600 leading-relaxed font-medium">
                            Dữ liệu y tế của bạn được xử lý an toàn và không bao giờ được chia sẻ với bên thứ ba.
                        </p>
                    </div>
                </div>
            </div>

            <Button onClick={onCancel} variant="ghost" className="w-full text-slate-400 font-bold hover:bg-transparent hover:text-slate-600 uppercase tracking-widest text-xs">
                Để sau
            </Button>
        </div>
    )

    // Step 2: Processing (Simulated)
    const renderProcessing = () => {
        return (
            <div className="py-12 flex flex-col items-center justify-center space-y-8">
                <div className="relative">
                    <div className="w-32 h-32 border-4 border-[#c2efff] rounded-full flex items-center justify-center animate-pulse">
                        <Zap className="w-12 h-12 text-[#03428e]" />
                    </div>
                    <div className="absolute top-0 left-0 w-32 h-32 border-t-4 border-[#f26523] rounded-full animate-spin"></div>
                </div>

                <div className="text-center space-y-4 max-w-sm">
                    <h2 className="text-2xl font-bold text-slate-900">Đang xử lý đơn thuốc</h2>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 text-sm text-slate-600 font-bold">
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                            <span>Tối ưu hóa hình ảnh...</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-slate-600 font-bold">
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                            <span>Xác định cấu trúc tài liệu...</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-[#03428e] font-extrabold uppercase tracking-tight">
                            <Loader2 className="w-4 h-4 animate-spin text-[#f26523]" />
                            <span>Trích xuất thuật ngữ y tế...</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-slate-300 font-bold">
                            <div className="w-4 h-4 border border-slate-200 rounded-full" />
                            <span>Phân loại liều lượng...</span>
                        </div>
                    </div>
                </div>

                <Button onClick={handleNext} variant="outline" className="border-[#03428e]/20 text-[#03428e] font-bold rounded-xl px-8">
                    Tiếp tục
                </Button>
            </div>
        )
    }

    // Step 3: Medical Analysis
    const renderAnalysis = () => (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-900">Thông tin trích xuất</h2>
                <Badge className="bg-[#c2efff] text-[#03428e] hover:bg-[#c2efff] border-none font-bold uppercase tracking-tight">
                    Hệ thống đề xuất
                </Badge>
            </div>

            <p className="text-slate-500 font-medium">Chúng tôi đã nhận diện các loại thuốc sau. Vui lòng xác nhận lại.</p>

            <div className="space-y-4">
                {[
                    { name: "Paracetamol 500mg", dose: "1 viên", freq: "2 lần/ngày", times: ["07:00 AM", "07:00 PM"], duration: "5 ngày" },
                    { name: "Amoxicillin 250mg", dose: "1 viên", freq: "3 lần/ngày", times: ["06:00 AM", "02:00 PM", "10:00 PM"], duration: "7 ngày" }
                ].map((med, idx) => (
                    <Card key={idx} className="p-5 border-[#03428e]/10 hover:border-[#03428e] transition-all rounded-3xl shadow-sm bg-white">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-[#c2efff] rounded-2xl flex items-center justify-center text-[#03428e] shadow-sm">
                                    <Pill className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-extrabold text-slate-900 text-lg">{med.name}</h4>
                                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">{med.dose} • {med.freq}</p>
                                </div>
                            </div>
                            <Button variant="ghost" size="sm" className="text-[#03428e] font-extrabold hover:bg-[#c2efff]/40 rounded-xl px-4">Sửa</Button>
                        </div>
                        <div className="flex gap-2 flex-wrap items-center">
                            {med.times.map((t, i) => (
                                <Badge key={i} variant="outline" className="bg-slate-50 text-slate-600 border-slate-200 font-extrabold px-3 py-1 rounded-lg">
                                    {t}
                                </Badge>
                            ))}
                            <div className="ml-auto flex items-center gap-2">
                                <Badge variant="outline" className="bg-[#f26523]/10 text-[#f26523] border-[#f26523]/20 font-extrabold px-3 py-1 rounded-lg">
                                    {med.duration}
                                </Badge>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            <div className="flex gap-4">
                <Button onClick={handleBack} variant="outline" className="flex-1 h-14 rounded-2xl border-slate-200 font-extrabold text-[#03428e]">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Quay lại
                </Button>
                <Button onClick={handleNext} className="flex-[2] h-14 bg-[#03428e] hover:bg-[#03428e]/90 text-white rounded-2xl font-extrabold shadow-lg shadow-[#03428e]/20">
                    Xác nhận & Kiểm tra an toàn <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
            </div>
        </div>
    )

    // Step 4: Safety Check
    const renderSafety = () => (
        <div className="space-y-6">
            <div className="text-center py-4">
                <div className="w-20 h-20 bg-[#c2efff] rounded-full flex items-center justify-center text-[#03428e] mx-auto mb-4 shadow-xl shadow-[#03428e]/10">
                    <ShieldCheck className="w-12 h-12" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Xác minh an toàn</h2>
                <p className="text-slate-500 font-medium">Kiểm tra tương tác thuốc và liều lượng tiêu chuẩn</p>
            </div>

            <div className="space-y-4">
                <Card className="p-6 border-green-100 bg-green-50/50 flex gap-4 items-center rounded-3xl">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 shrink-0 shadow-sm">
                        <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="font-extrabold text-slate-900 text-base">Liều lượng an toàn</p>
                        <p className="text-xs text-slate-500 font-medium leading-relaxed">Liều lượng của tất cả thuốc nằm trong giới hạn y tế quốc tế.</p>
                    </div>
                </Card>

                <Card className="p-6 border-green-100 bg-green-50/50 flex gap-4 items-center rounded-3xl">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 shrink-0 shadow-sm">
                        <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="font-extrabold text-slate-900 text-base">Không có tương tác xấu</p>
                        <p className="text-xs text-slate-500 font-medium leading-relaxed">Sự kết hợp các loại thuốc này không gây ra rủi ro đã được cảnh báo.</p>
                    </div>
                </Card>

                <Card className="p-6 border-[#f26523]/10 bg-[#f26523]/5 flex gap-4 items-center rounded-3xl">
                    <div className="w-12 h-12 bg-[#f26523]/10 rounded-full flex items-center justify-center text-[#f26523] shrink-0 shadow-sm">
                        <Zap className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="font-extrabold text-[#f26523] text-base">Lưu ý Kháng sinh</p>
                        <p className="text-xs text-slate-500 font-medium leading-relaxed">Amoxicillin là kháng sinh. Vui lòng uống đủ liệu trình 7 ngày.</p>
                    </div>
                </Card>
            </div>

            <Button onClick={handleNext} className="w-full h-15 bg-[#03428e] hover:bg-[#03428e]/90 text-white rounded-2xl text-lg font-extrabold shadow-xl shadow-[#03428e]/20 transition-all transform hover:scale-[1.01]">
                Tạo lịch uống thuốc của tôi
            </Button>
        </div>
    )

    // Step 5: Timeline
    const renderTimeline = () => (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-900">Lịch trình mới</h2>
                <Badge className="bg-[#03428e] text-white border-none font-bold uppercase tracking-widest px-3 py-1">Lịch hoạt động</Badge>
            </div>

            <div className="relative pl-6 border-l-3 border-[#c2efff] py-4 space-y-8 ml-2">
                {[
                    { time: "06:00 AM", name: "Amoxicillin 250mg", note: "1 viên • Trước bữa sáng" },
                    { time: "07:00 AM", name: "Paracetamol 500mg", note: "1 viên • Sau bữa sáng" },
                    { time: "02:00 PM", name: "Amoxicillin 250mg", note: "1 viên • Sau bữa trưa" },
                ].map((item, i) => (
                    <div key={i} className="relative">
                        <div className="absolute -left-[35px] top-2 w-5 h-5 bg-white border-3 border-[#03428e] rounded-full z-10 shadow-sm" />
                        <div className="bg-white p-5 rounded-[1.5rem] border border-slate-100 shadow-sm flex items-center justify-between hover:shadow-md hover:border-[#03428e]/10 transition-all cursor-default">
                            <div className="flex items-center gap-5">
                                <div className="text-[#03428e] font-extrabold text-sm bg-[#c2efff] px-4 py-2 rounded-xl shrink-0 shadow-sm">
                                    {item.time}
                                </div>
                                <div>
                                    <h5 className="font-extrabold text-slate-900 text-lg leading-tight">{item.name}</h5>
                                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wide mt-1">{item.note}</p>
                                </div>
                            </div>
                            <ChevronRight className="w-5 h-5 text-slate-300" />
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex gap-4 pt-4">
                <Button onClick={handleBack} variant="outline" className="flex-1 h-14 rounded-2xl border-slate-200 font-extrabold text-[#03428e]">
                    Xác minh lại
                </Button>
                <Button onClick={handleNext} className="flex-[2] h-14 bg-green-600 hover:bg-green-700 text-white rounded-2xl font-extrabold shadow-lg shadow-green-100">
                    Xác nhận & Lưu lịch trình
                </Button>
            </div>
        </div>
    )

    // Step 6: Success
    const renderSuccess = () => (
        <div className="py-12 flex flex-col items-center justify-center text-center space-y-8">
            <div className="w-28 h-28 bg-green-600 text-white rounded-full flex items-center justify-center shadow-2xl shadow-green-200 animate-bounce">
                <CheckCircle2 className="w-16 h-16" />
            </div>
            <div className="space-y-3">
                <h2 className="text-3xl font-black text-slate-900">Thành công!</h2>
                <p className="text-slate-500 max-w-xs mx-auto font-medium">
                    Lịch uống thuốc của bạn đã được tạo và thêm vào bảng điều khiển chính.
                </p>
            </div>

            <div className="bg-slate-50 rounded-[2rem] p-8 border border-slate-100 w-full max-w-sm shadow-inner">
                <div className="flex items-center justify-between mb-5">
                    <span className="text-sm font-extrabold text-[#03428e] uppercase tracking-widest">Thông báo</span>
                    <Badge className="bg-green-100 text-green-700 font-black border-none px-3">BẬT</Badge>
                </div>
                <p className="text-xs text-slate-400 font-bold leading-relaxed">
                    Chúng tôi sẽ nhắc bạn 15 phút trước mỗi liều thuốc. Chúc bạn mau khỏe!
                </p>
            </div>

            <Button onClick={onComplete} className="w-full h-15 bg-[#03428e] hover:bg-[#03428e]/90 text-white rounded-2xl text-lg font-black shadow-xl shadow-[#03428e]/20">
                Quay lại Trang chủ
            </Button>
        </div>
    )

    return (
        <div className="space-y-10">
            {/* Mini Breadcrumbs */}
            <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-2.5">
                    {["upload", "processing", "analysis", "safety", "timeline"].map((s, i) => (
                        <div
                            key={s}
                            className={`h-2 w-10 rounded-full transition-all duration-500 ${stepProgress[currentStep] >= stepProgress[s as Step]
                                ? "bg-[#03428e] shadow-sm"
                                : "bg-slate-200"
                                }`}
                        />
                    ))}
                </div>
                <span className="text-xs font-black text-[#03428e] tracking-widest uppercase bg-[#c2efff] px-3 py-1.5 rounded-lg ml-4">
                    BƯỚC {Object.keys(stepProgress).indexOf(currentStep) + 1} / 6
                </span>
            </div>

            <div className="mt-4">
                {showManualEntry ? (
                    <ManualEntry
                        onComplete={() => {
                            setShowManualEntry(false)
                            setCurrentStep("success")
                        }}
                        onCancel={() => setShowManualEntry(false)}
                    />
                ) : (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                        {currentStep === "upload" && renderUpload()}
                        {currentStep === "processing" && renderProcessing()}
                        {currentStep === "analysis" && renderAnalysis()}
                        {currentStep === "safety" && renderSafety()}
                        {currentStep === "timeline" && renderTimeline()}
                        {currentStep === "success" && renderSuccess()}
                    </div>
                )}
            </div>
        </div>
    )
}
