import React, { useState, useMemo } from 'react';
import { 
  Users, 
  Award, 
  TrendingUp, 
  TrendingDown, 
  Search, 
  Download, 
  Filter, 
  Eye, 
  CheckCircle,
  BarChart2,
  FileSpreadsheet
} from 'lucide-react';
import { COURSE_INFO } from '../data/mockStudents';

export default function InstructorView({ students = [], onSelectStudent }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSec, setSelectedSec] = useState('ALL');
  const [selectedGrade, setSelectedGrade] = useState('ALL');

  // Calculate Class Statistics
  const stats = useMemo(() => {
    if (!students || students.length === 0) {
      return { total: 0, avg: 0, max: 0, min: 0, maxStudent: null, minStudent: null, passRate: 0, distribution: {} };
    }

    const validStudents = students.filter(s => !isNaN(s.total));
    const scores = validStudents.map(s => s.total);
    const total = students.length;
    const sum = scores.reduce((a, b) => a + b, 0);
    const avg = total > 0 ? (sum / total).toFixed(2) : 0;

    let maxStudent = null;
    let minStudent = null;
    if (validStudents.length > 0) {
      maxStudent = validStudents.reduce((prev, curr) => (curr.total > prev.total ? curr : prev), validStudents[0]);
      minStudent = validStudents.reduce((prev, curr) => (curr.total < prev.total ? curr : prev), validStudents[0]);
    }

    const max = maxStudent ? maxStudent.total : 0;
    const min = minStudent ? minStudent.total : 0;

    const passing = students.filter(s => s.grade !== 'F').length;
    const passRate = total > 0 ? ((passing / total) * 100).toFixed(0) : 0;

    // Distribution (F on the left, A on the right)
    const dist = { 'F': 0, 'D': 0, 'D+': 0, 'C': 0, 'C+': 0, 'B': 0, 'B+': 0, 'A': 0 };
    students.forEach(s => {
      if (dist[s.grade] !== undefined) {
        dist[s.grade]++;
      } else {
        dist['F']++;
      }
    });

    return { total, avg, max, min, maxStudent, minStudent, passRate, distribution: dist };
  }, [students]);

  // Unique sections
  const sections = useMemo(() => {
    const set = new Set(students.map(s => s.sec).filter(Boolean));
    return ['ALL', ...Array.from(set)];
  }, [students]);

  // Filter students
  const filteredStudents = useMemo(() => {
    return students.filter(s => {
      const matchSearch = 
        String(s.id).toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(s.name).toLowerCase().includes(searchTerm.toLowerCase());
      const matchSec = selectedSec === 'ALL' || s.sec === selectedSec;
      const matchGrade = selectedGrade === 'ALL' || s.grade === selectedGrade;
      return matchSearch && matchSec && matchGrade;
    });
  }, [students, searchTerm, selectedSec, selectedGrade]);

  // Export full table to CSV
  const handleExportCSV = () => {
    if (!students.length) return;
    const headers = ["เลขที่", "รหัสนิสิต", "ชื่อ-นามสกุล", "คะแนนเก็บ (50)", "สอบกลางภาค (20)", "สอบปลายภาค (25)", "คะแนนแบบฟอร์ม (5)", "รวม (100)", "เกรด", "หมายเหตุ"];
    const rows = students.map(s => [
      `"${s.no || ''}"`,
      `"${s.id}"`,
      `"${s.name}"`,
      s.collectedScore !== undefined ? s.collectedScore : s.assignment,
      s.midterm,
      s.final,
      s.formScore !== undefined ? s.formScore : (s.quiz || 5),
      s.total,
      `"${s.grade}"`,
      `"${s.remarks || ''}"`
    ]);

    const csvContent = "\uFEFF" + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `NU_Digital_Marketing_Grades_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 animate-fade-in">
      
      {/* Top Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 mb-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-semibold px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30 mb-2">
              <BarChart2 className="w-3.5 h-3.5" />
              <span>ภาพรวมผลการเรียน (Grade Overview Dashboard)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display tracking-tight">
              สถิติผลการเรียนวิชา {COURSE_INFO.courseNameTh}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              {COURSE_INFO.faculty} มหาวิทยาลัยนเรศวร • {COURSE_INFO.semester}
            </p>
          </div>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 mb-8">
        
        {/* Total Students */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center space-x-3 text-slate-500 mb-2">
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <Users className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <span className="text-xs sm:text-sm font-medium">นิสิตทั้งหมด</span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            {stats.total} <span className="text-xs font-normal text-slate-400">คน</span>
          </div>
        </div>

        {/* Average Score */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center space-x-3 text-slate-500 mb-2">
            <div className="p-2 rounded-xl bg-orange-50 text-nu-orange">
              <Award className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <span className="text-xs sm:text-sm font-medium">คะแนนเฉลี่ย</span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            {stats.avg} <span className="text-xs font-normal text-slate-400">/ 100</span>
          </div>
        </div>

        {/* Highest Score */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center space-x-3 text-slate-500 mb-2">
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <span className="text-xs sm:text-sm font-medium">คะแนนรวมสูงสุด</span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 font-display">
            {stats.max} <span className="text-xs font-normal text-slate-400">/ 100</span>
          </div>
          {stats.maxStudent && (
            <div className="text-xs text-slate-500 font-medium truncate mt-1" title={`${stats.maxStudent.name} (${stats.maxStudent.id})`}>
              {stats.maxStudent.name}
            </div>
          )}
        </div>

        {/* Lowest Score */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center space-x-3 text-slate-500 mb-2">
            <div className="p-2 rounded-xl bg-rose-50 text-rose-600">
              <TrendingDown className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <span className="text-xs sm:text-sm font-medium">คะแนนรวมต่ำสุด</span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-rose-600 font-display">
            {stats.min} <span className="text-xs font-normal text-slate-400">/ 100</span>
          </div>
          {stats.minStudent && (
            <div className="text-xs text-slate-500 font-medium truncate mt-1" title={`${stats.minStudent.name} (${stats.minStudent.id})`}>
              {stats.minStudent.name}
            </div>
          )}
        </div>

        {/* Passing Rate */}
        <div className="col-span-2 lg:col-span-1 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center space-x-3 text-slate-500 mb-2">
            <div className="p-2 rounded-xl bg-teal-50 text-teal-600">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <span className="text-xs sm:text-sm font-medium">อัตราผ่านเกณฑ์</span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-teal-600 font-display">
            {stats.passRate}%
          </div>
        </div>

      </div>

      {/* Grade Distribution Bar Chart */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm mb-8">
        <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center space-x-2">
          <BarChart2 className="w-5 h-5 text-nu-orange" />
          <span>การกระจายตัวของเกรด (Grade Distribution)</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {Object.entries(stats.distribution).map(([grade, count]) => {
            const pct = stats.total > 0 ? ((count / stats.total) * 100).toFixed(0) : 0;
            return (
              <div 
                key={grade}
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-center hover:border-orange-300 transition-colors"
              >
                <div className="text-lg font-black text-slate-800 font-display">
                  {grade}
                </div>
                <div className="text-2xl font-extrabold text-nu-orange my-1">
                  {count} <span className="text-xs font-normal text-slate-400">คน</span>
                </div>
                <div className="text-[11px] text-slate-500 font-medium">
                  {pct}% ของห้อง
                </div>
                {/* Visual bar */}
                <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2 overflow-hidden">
                  <div 
                    className="bg-nu-orange h-full rounded-full"
                    style={{ width: `${Math.min(100, Math.max(0, pct))}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Student List Table & Filter Section */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        
        {/* Table Toolbar */}
        <div className="p-4 sm:p-6 border-b border-slate-200 bg-slate-50/50">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="ค้นหาด้วยรหัสนิสิต หรือ ชื่อ-นามสกุล..."
                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-white rounded-xl border border-slate-300 focus:outline-none focus:border-nu-orange"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* Filter Section */}
              <div className="flex items-center space-x-1.5 bg-white border border-slate-300 rounded-xl px-2.5 py-1 text-xs">
                <span className="text-slate-400">เซกชัน:</span>
                <select
                  value={selectedSec}
                  onChange={(e) => setSelectedSec(e.target.value)}
                  className="bg-transparent font-medium text-slate-700 focus:outline-none"
                >
                  {sections.map(s => (
                    <option key={s} value={s}>{s === 'ALL' ? 'ทั้งหมด' : s}</option>
                  ))}
                </select>
              </div>

              {/* Filter Grade */}
              <div className="flex items-center space-x-1.5 bg-white border border-slate-300 rounded-xl px-2.5 py-1 text-xs">
                <span className="text-slate-400">เกรด:</span>
                <select
                  value={selectedGrade}
                  onChange={(e) => setSelectedGrade(e.target.value)}
                  className="bg-transparent font-medium text-slate-700 focus:outline-none"
                >
                  <option value="ALL">ทั้งหมด</option>
                  <option value="A">A</option>
                  <option value="B+">B+</option>
                  <option value="B">B</option>
                  <option value="C+">C+</option>
                  <option value="C">C</option>
                  <option value="D+">D+</option>
                  <option value="D">D</option>
                  <option value="F">F</option>
                </select>
              </div>

              <span className="text-xs text-slate-500 ml-2">
                พบ {filteredStudents.length} รายการ
              </span>
            </div>

          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-100/70 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-3 text-center">ลำดับ</th>
                <th className="py-3.5 px-4">รหัสนิสิต</th>
                <th className="py-3.5 px-4">ชื่อ-นามสกุล</th>
                <th className="py-3.5 px-3 text-right">คะแนนเก็บ (50)</th>
                <th className="py-3.5 px-3 text-right">กลางภาค (20)</th>
                <th className="py-3.5 px-3 text-right">ปลายภาค (25)</th>
                <th className="py-3.5 px-3 text-right">แบบฟอร์ม (5)</th>
                <th className="py-3.5 px-4 text-right font-bold text-slate-900">รวม (100)</th>
                <th className="py-3.5 px-4 text-center">เกรด</th>
                <th className="py-3.5 px-4 text-center">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-8 text-center text-slate-400">
                    ไม่พบข้อมูลนิสิตที่ตรงกับเงื่อนไขการค้นหา
                  </td>
                </tr>
              ) : (
                filteredStudents.map((s) => (
                  <tr key={s.id} className="hover:bg-orange-50/40 transition-colors">
                    <td className="py-3.5 px-3 text-center text-slate-400 font-mono text-xs">
                      {s.no || '-'}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-semibold text-slate-800">
                      {s.id}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-900">
                      {s.name}
                    </td>
                    <td className="py-3.5 px-3 text-right text-slate-600">{s.collectedScore !== undefined ? s.collectedScore : s.assignment}</td>
                    <td className="py-3.5 px-3 text-right text-slate-600">{s.midterm}</td>
                    <td className="py-3.5 px-3 text-right text-slate-600">{s.final}</td>
                    <td className="py-3.5 px-3 text-right text-slate-600">{s.formScore !== undefined ? s.formScore : (s.quiz || 5)}</td>
                    <td className="py-3.5 px-4 text-right font-bold text-nu-orange font-display">
                      {s.total}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className={`inline-block px-2.5 py-0.5 rounded-md font-bold text-xs ${
                        s.grade === 'A' ? 'bg-emerald-100 text-emerald-800' :
                        s.grade === 'B+' || s.grade === 'B' ? 'bg-blue-100 text-blue-800' :
                        s.grade === 'C+' || s.grade === 'C' ? 'bg-amber-100 text-amber-800' :
                        s.grade === 'D+' || s.grade === 'D' ? 'bg-orange-100 text-orange-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {s.grade}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => onSelectStudent(s)}
                        className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:border-nu-orange hover:text-nu-orange text-slate-600 text-xs font-medium transition-colors shadow-2xs"
                        title="ดูรายงานผลคะแนนของนิสิตคนนี้"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>เปิดดู</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
}
