import React, { useState } from 'react';
import { Search, Sparkles, Shield, UserCheck, AlertCircle, ArrowRight } from 'lucide-react';
import { COURSE_INFO } from '../data/mockStudents';

export default function HeroSearch({ 
  onSearch, 
  searchQuery, 
  setSearchQuery, 
  errorMessage, 
  quickSampleIds = [],
  isLoading
}) {
  const [inputVal, setInputVal] = useState(searchQuery || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputVal.trim()) {
      onSearch(inputVal.trim());
    }
  };

  const handleSelectSample = (id) => {
    setInputVal(id);
    onSearch(id);
  };

  return (
    <div className="relative pt-6 pb-8 sm:pt-10 sm:pb-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
      
      {/* Decorative Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-96 h-72 sm:h-96 bg-gradient-to-tr from-orange-400/20 to-amber-300/20 blur-3xl pointer-events-none rounded-full -z-10" />

      {/* Hero Badge */}
      <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200/80 text-nu-orange text-xs sm:text-sm font-medium mb-4 animate-fade-in shadow-xs">
        <Sparkles className="w-3.5 h-3.5 text-nu-orange" />
        <span>ระบบตรวจสอบคะแนน & เกรดแบบ Real-time</span>
        <span className="text-slate-300">•</span>
        <span className="text-slate-600">{COURSE_INFO.semester}</span>
      </div>

      {/* Main Title */}
      <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight font-display mb-3">
        วิชา <span className="text-transparent bg-clip-text bg-gradient-to-r from-nu-orange to-amber-600">{COURSE_INFO.courseNameTh}</span>
      </h2>
      <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto mb-8 font-light">
        {COURSE_INFO.faculty} มหาวิทยาลัยนเรศวร
        <br className="hidden sm:inline" /> กรอกรหัสนิสิตหรือชื่อ-นามสกุล เพื่อตรวจสอบคะแนนสอบ คะแนนเก็บ และเกรดที่คาดการณ์
      </p>

      {/* Search Input Box */}
      <div className="max-w-xl mx-auto">
        <form onSubmit={handleSubmit} className="relative group">
          <div className="relative flex items-center bg-white rounded-2xl shadow-xl shadow-slate-200/60 border-2 border-slate-200 focus-within:border-nu-orange transition-all duration-300 overflow-hidden p-1.5 sm:p-2">
            
            <div className="pl-3 sm:pl-4 text-slate-400">
              <Search className="w-5 h-5 text-slate-400 group-focus-within:text-nu-orange transition-colors" />
            </div>

            <input
              id="student-search-input"
              type="text"
              value={inputVal}
              onChange={(e) => {
                setInputVal(e.target.value);
                setSearchQuery(e.target.value);
              }}
              placeholder="กรอกรหัสนิสิต 8 หลัก (เช่น 65051001)"
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-slate-800 text-sm sm:text-base font-medium placeholder-slate-400 focus:outline-none bg-transparent"
              autoComplete="off"
            />

            {inputVal && (
              <button
                type="button"
                onClick={() => {
                  setInputVal('');
                  setSearchQuery('');
                }}
                className="p-1 mr-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 text-xs"
              >
                ✕
              </button>
            )}

            <button
              id="submit-search-btn"
              type="submit"
              disabled={isLoading || !inputVal.trim()}
              className="inline-flex items-center justify-center space-x-1.5 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-nu-orange to-orange-600 text-white font-semibold text-xs sm:text-sm hover:from-orange-600 hover:to-orange-700 shadow-md shadow-orange-500/25 active:scale-95 transition-all disabled:opacity-50 disabled:pointer-events-none"
            >
              <span>{isLoading ? 'กำลังค้นหา...' : 'ตรวจสอบคะแนน'}</span>
              <ArrowRight className="w-4 h-4 hidden sm:inline" />
            </button>
          </div>
        </form>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mt-3 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm flex items-center justify-center space-x-2 animate-fade-in">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Quick Sample IDs Chips */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-xs text-slate-500">
          <span className="font-medium text-slate-400">ตัวอย่างรหัสนิสิตสำหรับทดสอบ:</span>
          {quickSampleIds.map((item) => (
            <button
              key={item.id}
              onClick={() => handleSelectSample(item.id)}
              className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:border-nu-orange hover:text-nu-orange hover:bg-orange-50/50 transition-colors shadow-2xs font-mono font-medium"
              title={`${item.name} (${item.grade})`}
            >
              {item.id} ({item.grade})
            </button>
          ))}
        </div>

        {/* Privacy Note */}
        <div className="mt-6 inline-flex items-center space-x-2 text-xs text-slate-400 bg-slate-100/80 px-3.5 py-1.5 rounded-full">
          <Shield className="w-3.5 h-3.5 text-emerald-600" />
          <span>ระบบรักษาความเป็นส่วนตัว: แสดงเฉพาะข้อมูลคะแนนของตนเองเท่านั้น</span>
        </div>

      </div>

    </div>
  );
}
