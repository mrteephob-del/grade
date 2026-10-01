import React from 'react';
import { COURSE_INFO } from '../data/mockStudents';
import { ExternalLink, Heart, Shield } from 'lucide-react';

export default function Footer({ onOpenGuide }) {
  return (
    <footer className="w-full bg-white border-t border-slate-200 py-8 px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-500 no-print">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left: University & Faculty Info */}
        <div className="text-center md:text-left">
          <div className="font-semibold text-slate-800 text-sm">
            {COURSE_INFO.courseNameTh} ({COURSE_INFO.courseCode})
          </div>
          <p className="text-slate-500 mt-0.5">
            {COURSE_INFO.faculty} • {COURSE_INFO.university}
          </p>
        </div>

        {/* Center: Notice */}
        <div className="flex items-center space-x-2 text-slate-400">
          <Shield className="w-3.5 h-3.5 text-emerald-600" />
          <span>ระบบรักษาความปลอดภัยข้อมูลส่วนบุคคลตามนโยบาย PDPA</span>
        </div>

        {/* Right: Quick Links */}
        <div className="flex items-center space-x-4">
          <a 
            href="https://www.nu.ac.th" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-nu-orange transition-colors flex items-center space-x-1"
          >
            <span>เว็บไซต์ ม.นเรศวร</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2">
        <div>
          © {new Date().getFullYear()} Naresuan University. All rights reserved.
        </div>
        <div className="flex items-center space-x-1">
          <span>Developed with</span>
          <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
          <span>for NU Digital Marketing Students</span>
        </div>
      </div>
    </footer>
  );
}
