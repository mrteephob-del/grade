import React from 'react';
import { 
  GraduationCap, 
  RefreshCw, 
  Settings, 
  HelpCircle, 
  ShieldCheck, 
  Database,
  BarChart3
} from 'lucide-react';
import { COURSE_INFO } from '../data/mockStudents';

export default function Navbar({ 
  dataSource, 
  isRefreshing, 
  onRefresh, 
  onOpenSettings, 
  onOpenGuide,
  instructorMode,
  setInstructorMode,
  lastUpdated
}) {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & University / Course Branding */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-nu-orange via-orange-500 to-amber-600 text-white shadow-md shadow-orange-500/25 ring-2 ring-orange-100">
              <span className="font-display font-extrabold text-lg sm:text-xl tracking-tight">NU</span>
              <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-500 ring-2 ring-white">
                <span className="h-1.5 w-1.5 rounded-full bg-white animate-ping"></span>
              </span>
            </div>
            
            <div className="text-left">
              <div className="flex items-center space-x-2">
                <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-snug">
                  NU Grade Viewer
                </h1>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-orange-100 text-orange-800 border border-orange-200">
                  {COURSE_INFO.courseCode}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium line-clamp-1">
                {COURSE_INFO.courseNameTh} ({COURSE_INFO.courseNameEn}) • ม.นเรศวร
              </p>
            </div>
          </div>

          {/* Action Tools */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Data Source Badge */}
            <div className="hidden md:flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-medium border bg-slate-50 text-slate-600 border-slate-200">
              <Database className="w-3.5 h-3.5 text-nu-orange" />
              <span>
                {dataSource === 'google_sheet' && 'Google Sheet (Real-time)'}
                {dataSource === 'apps_script' && 'Google Apps Script'}
                {dataSource === 'mock_data' && 'โหมดสาธิต (Demo Data)'}
              </span>
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
            </div>

            {/* Refresh Button */}
            <button
              id="refresh-data-btn"
              onClick={onRefresh}
              disabled={isRefreshing}
              title="ดึงข้อมูลล่าสุดจาก Google Sheet"
              className="inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-lg text-slate-600 hover:text-nu-orange hover:bg-orange-50 border border-slate-200 transition-colors duration-150 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 sm:w-4.5 sm:h-4.5 ${isRefreshing ? 'animate-spin text-nu-orange' : ''}`} />
            </button>

            {/* Instructor View Toggle */}
            <button
              id="toggle-instructor-btn"
              onClick={() => setInstructorMode(!instructorMode)}
              className={`inline-flex items-center space-x-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 border ${
                instructorMode
                  ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                  : 'bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-100 border-slate-200'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">
                {instructorMode ? 'กลับสู่หน้าค้นหา' : 'ภาพรวม'}
              </span>
              <span className="sm:hidden">
                {instructorMode ? 'ค้นหา' : 'ภาพรวม'}
              </span>
            </button>

            {/* Settings Button */}
            <button
              id="open-settings-btn"
              onClick={onOpenSettings}
              title="ตั้งค่า Google Sheet"
              className="inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors"
            >
              <Settings className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </button>

            {/* Help / Guide Button */}
            <button
              id="open-guide-btn"
              onClick={onOpenGuide}
              title="คู่มือการเชื่อมต่อ Google Sheet"
              className="inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors"
            >
              <HelpCircle className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </button>

          </div>

        </div>
      </div>
    </header>
  );
}
