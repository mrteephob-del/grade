import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Award, 
  BookOpen, 
  Calendar, 
  CheckCircle2, 
  ClipboardCheck, 
  Copy, 
  FileText, 
  HelpCircle, 
  Percent, 
  Printer, 
  Share2, 
  Sparkles, 
  TrendingUp, 
  User, 
  Users 
} from 'lucide-react';
import { COURSE_INFO } from '../data/mockStudents';

export default function StudentResultCard({ student, onResetSearch }) {
  if (!student) return null;

  // Trigger confetti for high achievers (Grade A)
  useEffect(() => {
    if (student.grade === 'A') {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#ED6B22', '#F97316', '#10B981', '#3B82F6', '#F59E0B']
        });
      } catch (e) {
        // Fallback silently if confetti fails
      }
    }
  }, [student.id, student.grade]);

  const handlePrint = () => {
    window.print();
  };

  const handleCopySummary = () => {
    const text = `ผลการเรียนรายวิชา ${COURSE_INFO.courseCode} ${COURSE_INFO.courseNameTh} (${COURSE_INFO.semester})
รหัสนิสิต: ${student.id} (${student.name})
คะแนนรวม: ${student.total} / 100 คะแนน
เกรดที่คาดว่าจะได้รับ: ${student.grade}
สถานะ: ${student.status}`;
    navigator.clipboard.writeText(text);
    alert('คัดลอกผลคะแนนเรียบร้อยแล้ว');
  };

  // Grade badge color configuration
  const getGradeTheme = (grade) => {
    switch (grade) {
      case 'A':
        return {
          bg: 'bg-emerald-500',
          text: 'text-emerald-700',
          badgeBg: 'bg-emerald-50',
          badgeBorder: 'border-emerald-200',
          glow: 'shadow-emerald-500/30'
        };
      case 'B+':
      case 'B':
        return {
          bg: 'bg-blue-600',
          text: 'text-blue-700',
          badgeBg: 'bg-blue-50',
          badgeBorder: 'border-blue-200',
          glow: 'shadow-blue-500/30'
        };
      case 'C+':
      case 'C':
        return {
          bg: 'bg-amber-500',
          text: 'text-amber-700',
          badgeBg: 'bg-amber-50',
          badgeBorder: 'border-amber-200',
          glow: 'shadow-amber-500/30'
        };
      case 'D+':
      case 'D':
        return {
          bg: 'bg-orange-500',
          text: 'text-orange-700',
          badgeBg: 'bg-orange-50',
          badgeBorder: 'border-orange-200',
          glow: 'shadow-orange-500/30'
        };
      default:
        return {
          bg: 'bg-rose-600',
          text: 'text-rose-700',
          badgeBg: 'bg-rose-50',
          badgeBorder: 'border-rose-200',
          glow: 'shadow-rose-500/30'
        };
    }
  };

  const gradeTheme = getGradeTheme(student.grade);

  const scoreItems = [
    {
      title: 'คะแนนเก็บสะสม (Coursework & Assignments)',
      score: student.collectedScore !== undefined ? student.collectedScore : student.assignment,
      max: student.maxCollected || 50,
      icon: ClipboardCheck,
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'bg-blue-600',
      badge: 'คะแนนเก็บ 50%'
    },
    {
      title: 'คะแนนสอบกลางภาค (Midterm Exam)',
      score: student.midterm,
      max: student.maxMidterm || 20,
      icon: BookOpen,
      color: 'from-amber-500 to-orange-500',
      bgColor: 'bg-amber-500',
      badge: 'คะแนนสอบกลางภาค 20%'
    },
    {
      title: 'คะแนนสอบปลายภาค (Final Exam)',
      score: student.final,
      max: student.maxFinal || 25,
      icon: TrendingUp,
      color: 'from-orange-500 to-rose-500',
      bgColor: 'bg-orange-600',
      badge: 'คะแนนสอบปลายภาค 25%'
    },
    {
      title: 'คะแนนแบบฟอร์ม & การมีส่วนร่วม (Form & Activity)',
      score: student.formScore !== undefined ? student.formScore : (student.quiz || 5),
      max: student.maxForm || 5,
      icon: Sparkles,
      color: 'from-emerald-500 to-teal-600',
      bgColor: 'bg-emerald-600',
      badge: 'คะแนนแบบฟอร์ม 5%'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 animate-slide-up">
      
      {/* Action Bar (Print / Share / Reset) - Hidden on Print */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 no-print">
        <button
          onClick={onResetSearch}
          className="inline-flex items-center space-x-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-nu-orange transition-colors"
        >
          <span>← ค้นหารหัสนิสิตอื่น</span>
        </button>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleCopySummary}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 transition-colors shadow-2xs"
            title="คัดลอกสรุปผลคะแนน"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>คัดลอกสรุป</span>
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-nu-orange text-white hover:bg-orange-600 transition-colors shadow-xs"
            title="พิมพ์หรือบันทึกเป็น PDF"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>พิมพ์รายงานผล</span>
          </button>
        </div>
      </div>

      {/* Main Student Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden print:border-none print:shadow-none">
        
        {/* Card Header with NU Official Banner */}
        <div className="relative bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-6 sm:p-8 overflow-hidden">
          {/* Subtle Orange Accent Line */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-nu-orange via-amber-500 to-orange-600" />
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            {/* Student Info */}
            <div className="flex items-start space-x-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white flex-shrink-0 shadow-inner">
                <User className="w-7 h-7 sm:w-8 sm:h-8 text-orange-400" />
              </div>
              
              <div className="text-left">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="font-mono text-xs px-2.5 py-0.5 rounded-md bg-white/20 font-semibold text-orange-300">
                    {student.id}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-md bg-white/10 text-slate-300 font-medium">
                    {student.sec}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {student.status}
                  </span>
                </div>
                
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-display">
                  {student.name}
                </h3>
                
                <p className="text-xs sm:text-sm text-slate-300 font-light mt-0.5">
                  {student.faculty} • {student.major}
                </p>
              </div>
            </div>

            {/* Course & Semester Info */}
            <div className="text-left md:text-right border-t md:border-t-0 border-white/10 pt-4 md:pt-0">
              <div className="text-xs font-semibold text-orange-400 uppercase tracking-wider">
                {COURSE_INFO.courseCode}
              </div>
              <div className="text-sm font-medium text-slate-200">
                {COURSE_INFO.courseNameTh}
              </div>
              <div className="text-xs text-slate-400">
                {COURSE_INFO.semester}
              </div>
            </div>

          </div>
        </div>

        {/* Grade & Total Score Hero Section */}
        <div className="p-6 sm:p-8 bg-slate-50/50 border-b border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Projected Grade Showcase */}
            <div className="md:col-span-4 flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-slate-200 shadow-sm text-center">
              <span className="text-xs font-semibold text-slate-500 tracking-wider uppercase mb-1">
                เกรดที่คาดว่าจะได้รับ
              </span>
              <div className={`w-24 h-24 sm:w-28 sm:h-28 rounded-2xl flex items-center justify-center text-4xl sm:text-5xl font-black text-white shadow-lg ${gradeTheme.bg} ${gradeTheme.glow} mb-2 transform hover:scale-105 transition-transform`}>
                {student.grade}
              </div>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${gradeTheme.badgeBg} ${gradeTheme.badgeBorder} ${gradeTheme.text}`}>
                {student.status}
              </span>
            </div>

            {/* Total Score Gauge */}
            <div className="md:col-span-8 flex flex-col justify-center bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-slate-700 flex items-center space-x-1.5">
                  <Award className="w-4 h-4 text-nu-orange" />
                  <span>คะแนนรวมทั้งหมด (Total Score)</span>
                </span>
                <div className="text-right">
                  <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
                    {student.total}
                  </span>
                  <span className="text-sm text-slate-500 font-medium"> / 100</span>
                </div>
              </div>

              {/* Linear Progress Bar */}
              <div className="w-full bg-slate-100 rounded-full h-4 overflow-hidden mb-3 border border-slate-200 p-0.5">
                <div 
                  className="bg-gradient-to-r from-amber-500 via-nu-orange to-orange-600 h-full rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${Math.min(100, Math.max(0, student.total))}%` }}
                />
              </div>

              {/* University Grading Scale Reference Bar */}
              <div className="pt-2 border-t border-slate-100">
                <div className="text-[11px] text-slate-400 font-medium mb-1 flex justify-between">
                  <span>เกณฑ์การตัดเกรดอิงเกณฑ์ (Standard Criteria)</span>
                  <span>A = 80+ | B = 70+ | C = 60+ | D = 50+</span>
                </div>
                <div className="grid grid-cols-8 gap-1 text-[10px] font-mono text-center">
                  {COURSE_INFO.scoreCriteria.map((c) => (
                    <div 
                      key={c.grade}
                      className={`py-1 rounded border transition-colors ${
                        student.grade === c.grade 
                          ? 'bg-nu-orange text-white font-bold border-nu-orange shadow-xs' 
                          : 'bg-slate-50 text-slate-500 border-slate-200'
                      }`}
                    >
                      {c.grade}
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Detailed Breakdown Section */}
        <div className="p-6 sm:p-8">
          <h4 className="text-base font-bold text-slate-900 mb-4 flex items-center space-x-2">
            <FileText className="w-5 h-5 text-nu-orange" />
            <span>รายละเอียดคะแนนเก็บแต่ละส่วน (Score Breakdown)</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {scoreItems.map((item, idx) => {
              const Icon = item.icon;
              const percent = Math.round((item.score / item.max) * 100);

              return (
                <div 
                  key={idx}
                  className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-orange-300 transition-all shadow-2xs hover:shadow-sm"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2.5">
                      <div className={`p-2 rounded-xl text-white ${item.bgColor} shadow-2xs`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-semibold text-slate-800">
                          {item.title}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {item.badge}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-base sm:text-lg font-bold text-slate-900 font-display">
                        {item.score}
                        <span className="text-xs font-normal text-slate-400"> / {item.max}</span>
                      </div>
                      <div className="text-[11px] font-semibold text-nu-orange">
                        {percent}%
                      </div>
                    </div>
                  </div>

                  {/* Micro Progress Bar */}
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div 
                      className={`h-full rounded-full bg-gradient-to-r ${item.color} transition-all duration-700 ease-out`}
                      style={{ width: `${Math.min(100, Math.max(0, percent))}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Teacher Feedback / Remarks */}
          <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-orange-50/70 to-amber-50/70 border border-orange-200/80">
            <div className="flex items-start space-x-3">
              <div className="p-2 rounded-xl bg-orange-100 text-nu-orange flex-shrink-0 mt-0.5">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h5 className="text-xs sm:text-sm font-bold text-slate-900">
                  ข้อเสนอแนะและหมายเหตุจากอาจารย์ผู้สอน
                </h5>
                <p className="text-xs sm:text-sm text-slate-700 mt-1 leading-relaxed">
                  "{student.remarks}"
                </p>
                <div className="mt-2 text-[11px] text-slate-500">
                  {COURSE_INFO.instructor} • อัปเดตล่าสุดตามบันทึกการสอน
                </div>
              </div>
            </div>
          </div>

          {/* Official Disclaimer Note */}
          <div className="mt-6 text-center text-xs text-slate-400 font-light border-t border-slate-100 pt-4">
            * ผลคะแนนและเกรดนี้เป็นข้อมูลเบื้องต้นเพื่อให้นิสิตติดตามผลการเรียนอย่างต่อเนื่อง เกรดอย่างเป็นทางการจะประกาศผ่านระบบทะเบียนมหาวิทยาลัยนเรศวร (REG NU)
          </div>

        </div>

      </div>

    </div>
  );
}
