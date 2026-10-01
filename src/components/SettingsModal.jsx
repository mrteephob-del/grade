import React, { useState } from 'react';
import { 
  X, 
  Settings, 
  Database, 
  ExternalLink, 
  Check, 
  AlertTriangle, 
  RefreshCw, 
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { DEFAULT_SHEET_CONFIG, fetchGradeData } from '../services/googleSheetService';

export default function SettingsModal({ 
  isOpen, 
  onClose, 
  config, 
  onSaveConfig 
}) {
  if (!isOpen) return null;

  const [formConfig, setFormConfig] = useState({ ...config });
  const [testStatus, setTestStatus] = useState(null); // { loading, success, message }

  const handleTestConnection = async () => {
    setTestStatus({ loading: true, message: 'กำลังทดสอบเชื่อมต่อ Google Sheet...' });
    try {
      const res = await fetchGradeData({ ...formConfig, useMockFallback: false });
      if (res.success && res.data.length > 0) {
        setTestStatus({
          loading: false,
          success: true,
          message: `เชื่อมต่อสำเร็จ! ดึงข้อมูลได้ ${res.data.length} รายการ จาก ${res.source}`
        });
      } else {
        setTestStatus({
          loading: false,
          success: false,
          message: 'ไม่สามารถดึงข้อมูลได้: โปรดตรวจสอบว่าได้ตั้งค่าสิทธิ์แชร์ Google Sheet เป็น "ทุกคนที่มีลิงก์มีสิทธิ์ดู" แล้วหรือยัง'
        });
      }
    } catch (err) {
      setTestStatus({
        loading: false,
        success: false,
        message: `ข้อผิดพลาด: ${err.message}`
      });
    }
  };

  const handleReset = () => {
    setFormConfig({ ...DEFAULT_SHEET_CONFIG });
    setTestStatus(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveConfig(formConfig);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden max-h-[90vh] flex flex-col animate-slide-up">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-200 bg-slate-50/70">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-orange-100 text-nu-orange">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                ตั้งค่าแหล่งข้อมูล (Data Settings)
              </h3>
              <p className="text-xs text-slate-500">
                กำหนดค่า Google Sheet และโหมดการทำงาน
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 text-left">
          
          {/* Mode Switch: Demo vs Live */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-bold text-slate-800 flex items-center space-x-1.5">
                  <Sparkles className="w-4 h-4 text-nu-orange" />
                  <span>ใช้ข้อมูลตัวอย่าง (Demo Fallback)</span>
                </label>
                <p className="text-xs text-slate-500 mt-0.5">
                  สลับใช้ข้อมูลนิสิตจำลองอัตโนมัติหาก Google Sheet ยังไม่เปิดสิทธิ์สาธารณะ
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={formConfig.useMockFallback} 
                  onChange={(e) => setFormConfig({ ...formConfig, useMockFallback: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-nu-orange"></div>
              </label>
            </div>
          </div>

          {/* Google Sheet ID */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Google Sheet ID
            </label>
            <input
              type="text"
              value={formConfig.sheetId}
              onChange={(e) => setFormConfig({ ...formConfig, sheetId: e.target.value })}
              placeholder="e.g. 1iSChRpjoU_yKoHB7AV8qTceOB7wDLPviwsfBlhJVPnw"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-mono text-slate-800 focus:outline-none focus:border-nu-orange"
            />
            <span className="text-[11px] text-slate-400 mt-1 block">
              รหัสตารางจาก URL ของ Google Sheet
            </span>
          </div>

          {/* GID */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Sheet GID (Tab ID)
            </label>
            <input
              type="text"
              value={formConfig.gid}
              onChange={(e) => setFormConfig({ ...formConfig, gid: e.target.value })}
              placeholder="e.g. 231322230"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-mono text-slate-800 focus:outline-none focus:border-nu-orange"
            />
            <span className="text-[11px] text-slate-400 mt-1 block">
              เลขประจำแท็บแผ่นงาน (อยู่หลัง #gid= ใน URL)
            </span>
          </div>

          {/* Apps Script Web App URL (Optional) */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Google Apps Script Web App URL (ตัวเลือกเสริม)
            </label>
            <input
              type="url"
              value={formConfig.appsScriptUrl}
              onChange={(e) => setFormConfig({ ...formConfig, appsScriptUrl: e.target.value })}
              placeholder="https://script.google.com/macros/s/.../exec"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-mono text-slate-800 focus:outline-none focus:border-nu-orange"
            />
            <span className="text-[11px] text-slate-400 mt-1 block">
              หากสร้าง Apps Script Web App จะดึงข้อมูลได้เร็วและไม่ต้องเปิดแชร์ Sheet สู่สาธารณะ
            </span>
          </div>

          {/* Live Sheet Link */}
          <div className="pt-1">
            <a
              href={`https://docs.google.com/spreadsheets/d/${formConfig.sheetId}/edit#gid=${formConfig.gid}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 text-xs text-nu-orange hover:underline font-medium"
            >
              <span>เปิดดู Google Sheet ต้นฉบับในแท็บใหม่</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Test Status Feedback */}
          {testStatus && (
            <div className={`p-3.5 rounded-xl text-xs flex items-start space-x-2 border ${
              testStatus.loading ? 'bg-blue-50 text-blue-700 border-blue-200' :
              testStatus.success ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
              'bg-amber-50 text-amber-800 border-amber-200'
            }`}>
              {testStatus.loading ? (
                <RefreshCw className="w-4 h-4 animate-spin flex-shrink-0 mt-0.5" />
              ) : testStatus.success ? (
                <Check className="w-4 h-4 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              )}
              <span className="leading-relaxed">{testStatus.message}</span>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-200">
            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleReset}
                className="px-3 py-2 rounded-xl text-slate-500 hover:text-slate-700 hover:bg-slate-100 text-xs font-semibold flex items-center space-x-1 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>คืนค่าเดิม</span>
              </button>

              <button
                type="button"
                onClick={handleTestConnection}
                disabled={testStatus?.loading}
                className="px-3 py-2 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center space-x-1 transition-colors"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${testStatus?.loading ? 'animate-spin' : ''}`} />
                <span>ทดสอบเชื่อมต่อ</span>
              </button>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-nu-orange hover:bg-orange-600 text-white text-xs sm:text-sm font-semibold shadow-md transition-colors"
            >
              บันทึกและใช้งาน
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
