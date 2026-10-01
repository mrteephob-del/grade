import React, { useState } from 'react';
import { 
  X, 
  BookOpen, 
  Copy, 
  Check, 
  ExternalLink, 
  FileSpreadsheet, 
  Code2, 
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export default function SetupGuideModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [copiedCode, setCopiedCode] = useState(false);
  const [activeTab, setActiveTab] = useState('sheet'); // 'sheet' | 'apps_script'

  const appsScriptCode = `function doGet(e) {
  try {
    // ดึง Spreadsheet ตาม Sheet ID
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    // หรือระบุชีตเป้าหมาย:
    var sheet = ss.getSheetByName("Sheet1") || ss.getSheets()[0];
    
    // ดึงข้อมูลทั้งหมด
    var data = sheet.getDataRange().getValues();
    
    // ส่งข้อมูลกลับเป็น JSON
    return ContentService
      .createTextOutput(JSON.stringify(data))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(appsScriptCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full overflow-hidden max-h-[90vh] flex flex-col animate-slide-up">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-200 bg-slate-50/70">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-orange-100 text-nu-orange">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                คู่มือการเชื่อมต่อ Google Sheet Real-time
              </h3>
              <p className="text-xs text-slate-500">
                เลือกวิธีตั้งค่าเพื่อให้ระบบดึงคะแนนจาก Google Sheet ได้อย่างถูกต้อง
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

        {/* Tab Selector */}
        <div className="flex border-b border-slate-200 px-6 pt-3 bg-slate-50/30 gap-4">
          <button
            onClick={() => setActiveTab('sheet')}
            className={`pb-3 text-xs sm:text-sm font-semibold border-b-2 flex items-center space-x-2 transition-all ${
              activeTab === 'sheet'
                ? 'border-nu-orange text-nu-orange'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>วิธีที่ 1: ตั้งค่าสิทธิ์แชร์ Google Sheet (แนะนำ รวดเร็วที่สุด)</span>
          </button>

          <button
            onClick={() => setActiveTab('apps_script')}
            className={`pb-3 text-xs sm:text-sm font-semibold border-b-2 flex items-center space-x-2 transition-all ${
              activeTab === 'apps_script'
                ? 'border-nu-orange text-nu-orange'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>วิธีที่ 2: Google Apps Script Web App (เสถียรและปลอดภัย)</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-left text-xs sm:text-sm">
          
          {activeTab === 'sheet' ? (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-orange-50/80 border border-orange-200 text-orange-950">
                <span className="font-bold block mb-1">💡 เหมาะสำหรับ:</span>
                การใช้งานทั่วไปที่ต้องการความสะดวกรวดเร็ว เพียงตั้งค่าสิทธิ์แชร์ให้อ่านได้ ระบบจะดึงข้อมูลผ่าน CSV Export อัตโนมัติทุกครั้งที่มีการอัปเดต Sheet
              </div>

              <ol className="space-y-3.5 list-decimal list-inside text-slate-700">
                <li className="leading-relaxed">
                  <span className="font-semibold text-slate-900">เปิด Google Sheet คะแนน:</span> 
                  {' '}เข้าไปที่ไฟล์ Google Sheet ของอาจารย์
                </li>
                <li className="leading-relaxed">
                  <span className="font-semibold text-slate-900">คลิกปุ่ม "แชร์" (Share):</span> 
                  {' '}ที่มุมขวาบนของหน้าจอ Google Sheet
                </li>
                <li className="leading-relaxed">
                  <span className="font-semibold text-slate-900">เปลี่ยนการเข้าถึงทั่วไป (General access):</span> 
                  {' '}จาก "จำกัด" (Restricted) ให้เปลี่ยนเป็น <span className="font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">"ทุกคนที่มีลิงก์มีสิทธิ์ดู" (Anyone with the link can view)</span>
                </li>
                <li className="leading-relaxed">
                  <span className="font-semibold text-slate-900">กดปุ่ม "เสร็จสิ้น" (Done):</span> 
                  {' '}หลังจากนั้นกลับมากดปุ่ม <b>"รีเฟรชข้อมูล"</b> บนเว็บนี้ ระบบจะดึงข้อมูลคะแนนจริงขึ้นมาทันที!
                </li>
              </ol>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-600 text-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-600 inline mr-1.5 mb-0.5" />
                <span>แม้จะเปิดแชร์เป็น "มีสิทธิ์ดู" หน้านิสิตในเว็บนี้จะแสดงเฉพาะข้อมูลรายบุคคลของผู้ที่ค้นหาด้วยรหัสนิสิตเท่านั้น</span>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-200 text-blue-950">
                <span className="font-bold block mb-1">🚀 ข้อดีของวิธี Apps Script:</span>
                ไม่จำเป็นต้องเปิดสิทธิ์ Google Sheet ให้เป็นสาธารณะ และตอบสนองเป็น JSON อย่างรวดเร็ว ป้องกันปัญหา CORS ได้ 100%
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800 text-xs uppercase tracking-wider">
                    โค้ดสำหรับ Google Apps Script:
                  </span>
                  <button
                    onClick={handleCopyCode}
                    className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
                  >
                    {copiedCode ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">คัดลอกแล้ว</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>คัดลอกโค้ด</span>
                      </>
                    )}
                  </button>
                </div>

                <pre className="bg-slate-900 text-slate-100 p-3.5 rounded-xl font-mono text-xs overflow-x-auto">
                  {appsScriptCode}
                </pre>
              </div>

              <ol className="space-y-3 list-decimal list-inside text-slate-700">
                <li>เปิด Google Sheet แล้วไปที่เมนู <b>ส่วนขยาย (Extensions) → Apps Script</b></li>
                <li>ลบโค้ดเดิมทั้งหมดออก แล้ววางโค้ดด้านบนลงไป</li>
                <li>คลิกปุ่ม <b>บันทึก (Save)</b> จากนั้นกด <b>การทำให้ใช้งานได้ (Deploy) → การทำให้ใช้งานได้รายการใหม่ (New deployment)</b></li>
                <li>เลือกประเภท <b>เว็บแอป (Web app)</b>:
                  <ul className="pl-6 pt-1 space-y-1 text-xs list-disc">
                    <li>เรียกใช้ในฐานะ (Execute as): <b>ฉัน (Me)</b></li>
                    <li>ผู้ที่มีสิทธิ์เข้าถึง (Who has access): <b>ทุกคน (Anyone)</b></li>
                  </ul>
                </li>
                <li>คลิก <b>ทำให้ใช้งานได้ (Deploy)</b> แล้วคัดลอก URL ของ Web App ที่ได้มาใส่ใน <b>ตั้งค่า (Settings)</b> ของเว็บนี้</li>
              </ol>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-xs sm:text-sm font-semibold transition-colors"
          >
            เข้าใจแล้ว / ปิดหน้าต่าง
          </button>
        </div>

      </div>
    </div>
  );
}
