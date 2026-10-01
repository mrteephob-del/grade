import Papa from 'papaparse';
import { MOCK_STUDENTS } from '../data/mockStudents';

export const DEFAULT_SHEET_CONFIG = {
  sheetId: '1iSChRpjoU_yKoHB7AV8qTceOB7wDLPviwsfBlhJVPnw',
  gid: '231322230',
  appsScriptUrl: '',
  useMockFallback: true,
};

// Calculate letter grade based on total score
export function calculateGrade(score) {
  const num = parseFloat(score);
  if (isNaN(num)) return '-';
  if (num >= 80) return 'A';
  if (num >= 75) return 'B+';
  if (num >= 70) return 'B';
  if (num >= 65) return 'C+';
  if (num >= 60) return 'C';
  if (num >= 55) return 'D+';
  if (num >= 50) return 'D';
  return 'F';
}

// Map score to a grade status label in Thai
export function getGradeStatus(grade) {
  switch (grade) {
    case 'A': return 'ผ่านเกณฑ์ดีเยี่ยม (Excellent)';
    case 'B+': return 'ผ่านเกณฑ์ดีมาก (Very Good)';
    case 'B': return 'ผ่านเกณฑ์ดี (Good)';
    case 'C+': return 'ผ่านเกณฑ์ค่อนข้างดี (Fairly Good)';
    case 'C': return 'ผ่านเกณฑ์ปานกลาง (Fair)';
    case 'D+': return 'ผ่านเกณฑ์ระดับต่ำ (Poor)';
    case 'D': return 'ผ่านเกณฑ์ขั้นต่ำ (Very Poor)';
    case 'F': return 'ไม่ผ่านเกณฑ์ (Fail)';
    default: return 'อยู่ระหว่างประมวลผล';
  }
}

// Clean and normalize column header names
function normalizeHeader(header) {
  return String(header || '').trim().toLowerCase().replace(/\s+/g, ' ');
}

// Convert parsed CSV rows into standardized student objects
export function transformRowsToStudents(rows) {
  if (!rows || rows.length === 0) return [];

  // Find the header row (sometimes sheet has title rows at the top)
  let headerIndex = 0;
  for (let i = 0; i < Math.min(5, rows.length); i++) {
    const rowStr = JSON.stringify(rows[i]).toLowerCase();
    if (rowStr.includes('รหัส') || rowStr.includes('student') || rowStr.includes('id') || rowStr.includes('ชื่อ')) {
      headerIndex = i;
      break;
    }
  }

  const rawHeaders = rows[headerIndex];
  if (!Array.isArray(rawHeaders)) {
    // Already an object array (e.g. from Apps Script or Papa with header: true)
    return rows.map(processStudentObject).filter(s => s && s.id);
  }

  const headers = rawHeaders.map(h => normalizeHeader(h));
  const dataRows = rows.slice(headerIndex + 1);

  // Map header indices
  let idIdx = headers.findIndex(h => /รหัส|student.*id|^id$|code/i.test(h));
  let nameIdx = headers.findIndex(h => /ชื่อ|name|fullname|นิสิต/i.test(h));
  let secIdx = headers.findIndex(h => /sec|ตอน|กลุ่ม|group/i.test(h));
  let totalIdx = headers.findIndex(h => /รวม|total|sum|คะแนนรวม|100/i.test(h));
  let gradeIdx = headers.findIndex(h => /เกรด|grade/i.test(h));
  let remarkIdx = headers.findIndex(h => /หมายเหตุ|remark|note|สถานะ|status/i.test(h));

  // Sub-scores
  let midtermIdx = headers.findIndex(h => /mid|กลางภาค/i.test(h));
  let finalIdx = headers.findIndex(h => /fin|ปลายภาค/i.test(h));
  let quizIdx = headers.findIndex(h => /quiz|ควิซ|ย่อย/i.test(h));
  let assignIdx = headers.findIndex(h => /assign|งาน|การบ้าน|โปรเจกต์|project/i.test(h));
  let attendIdx = headers.findIndex(h => /attend|เช็คชื่อ|มีส่วนร่วม|participat|เวลาเรียน/i.test(h));

  const students = [];

  for (const row of dataRows) {
    if (!row || row.length === 0) continue;

    // Check if row has an ID
    let rawId = idIdx !== -1 ? String(row[idIdx] || '').trim() : '';
    // If not found in designated column, try to find 8-digit number (common Thai student ID)
    if (!rawId || rawId.length < 5) {
      const match = row.find(col => /^\d{8}$/.test(String(col).trim()));
      if (match) rawId = String(match).trim();
    }

    if (!rawId || rawId === 'undefined' || rawId.toLowerCase() === 'id') continue;

    const name = nameIdx !== -1 ? String(row[nameIdx] || '').trim() : 'นิสิต';
    const sec = secIdx !== -1 ? String(row[secIdx] || '').trim() : 'Sec 1';

    const midterm = midtermIdx !== -1 ? parseFloat(row[midtermIdx]) || 0 : 0;
    const final = finalIdx !== -1 ? parseFloat(row[finalIdx]) || 0 : 0;
    const quiz = quizIdx !== -1 ? parseFloat(row[quizIdx]) || 0 : 0;
    const assignment = assignIdx !== -1 ? parseFloat(row[assignIdx]) || 0 : 0;
    const attendance = attendIdx !== -1 ? parseFloat(row[attendIdx]) || 0 : 0;

    let total = totalIdx !== -1 ? parseFloat(row[totalIdx]) : NaN;
    if (isNaN(total)) {
      total = Math.round((midterm + final + quiz + assignment + attendance) * 100) / 100;
    }

    let grade = gradeIdx !== -1 ? String(row[gradeIdx] || '').trim() : '';
    if (!grade || grade === '-') {
      grade = calculateGrade(total);
    }

    const remarks = remarkIdx !== -1 ? String(row[remarkIdx] || '').trim() : 'ส่งงานครบถ้วน';

    students.push({
      id: rawId,
      name: name,
      sec: sec,
      faculty: "คณะบริหารธุรกิจ เศรษฐศาสตร์และการสื่อสาร",
      major: "การตลาดดิจิทัล (Digital Marketing)",
      attendance: attendance,
      maxAttendance: 10,
      assignment: assignment,
      maxAssignment: 20,
      quiz: quiz,
      maxQuiz: 15,
      midterm: midterm,
      maxMidterm: 25,
      final: final,
      maxFinal: 30,
      total: total,
      grade: grade,
      remarks: remarks || "สถานะการประเมินปกติ",
      status: getGradeStatus(grade)
    });
  }

  return students;
}

function processStudentObject(obj) {
  if (!obj) return null;
  const keys = Object.keys(obj);
  const idKey = keys.find(k => /รหัส|student.*id|^id$|code/i.test(k));
  const nameKey = keys.find(k => /ชื่อ|name|fullname/i.test(k));
  const secKey = keys.find(k => /sec|ตอน|กลุ่ม/i.test(k));
  const totalKey = keys.find(k => /รวม|total|sum/i.test(k));
  const gradeKey = keys.find(k => /เกรด|grade/i.test(k));
  const remarkKey = keys.find(k => /หมายเหตุ|remark|note/i.test(k));

  const id = idKey ? String(obj[idKey]).trim() : String(obj.id || '');
  if (!id) return null;

  const total = totalKey ? parseFloat(obj[totalKey]) : (parseFloat(obj.total) || 0);
  const grade = gradeKey && obj[gradeKey] ? String(obj[gradeKey]).trim() : calculateGrade(total);

  return {
    id: id,
    name: nameKey ? String(obj[nameKey]).trim() : (obj.name || 'นิสิต'),
    sec: secKey ? String(obj[secKey]).trim() : (obj.sec || 'Sec 1'),
    faculty: obj.faculty || "คณะบริหารธุรกิจ เศรษฐศาสตร์และการสื่อสาร",
    major: obj.major || "การตลาดดิจิทัล (Digital Marketing)",
    attendance: parseFloat(obj.attendance) || 10,
    maxAttendance: 10,
    assignment: parseFloat(obj.assignment) || 20,
    maxAssignment: 20,
    quiz: parseFloat(obj.quiz) || 15,
    maxQuiz: 15,
    midterm: parseFloat(obj.midterm) || 25,
    maxMidterm: 25,
    final: parseFloat(obj.final) || 30,
    maxFinal: 30,
    total: total,
    grade: grade,
    remarks: remarkKey && obj[remarkKey] ? String(obj[remarkKey]) : (obj.remarks || "สถานะปกติ"),
    status: getGradeStatus(grade)
  };
}

// Main fetch function with multi-source fallback
export async function fetchGradeData(config = DEFAULT_SHEET_CONFIG) {
  const { sheetId, gid, appsScriptUrl, useMockFallback } = config;

  // 1. Try Google Apps Script Web App if provided
  if (appsScriptUrl && appsScriptUrl.trim()) {
    try {
      const response = await fetch(appsScriptUrl.trim(), { method: 'GET' });
      if (response.ok) {
        const json = await response.json();
        if (Array.isArray(json) && json.length > 0) {
          const students = transformRowsToStudents(json);
          if (students.length > 0) {
            return {
              success: true,
              data: students,
              source: 'apps_script',
              message: `โหลดข้อมูลจาก Google Apps Script สำเร็จ (${students.length} รายการ)`,
              timestamp: new Date()
            };
          }
        }
      }
    } catch (err) {
      console.warn('Apps Script fetch failed:', err);
    }
  }

  // 2. Try Direct Google Sheet CSV Export
  if (sheetId) {
    const urls = [
      `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=${gid || '0'}`,
      `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&gid=${gid || '0'}`
    ];

    for (const url of urls) {
      try {
        const response = await fetch(url);
        if (response.ok) {
          const csvText = await response.text();
          // Check if response is actually HTML login page
          if (csvText.includes('<!DOCTYPE html>') || csvText.includes('<html') || csvText.includes('accounts.google.com')) {
            throw new Error('Google Sheet ต้องตั้งค่าการแชร์เป็น "ทุกคนที่มีลิงก์มีสิทธิ์ดู" (Anyone with the link can view)');
          }

          const parsed = Papa.parse(csvText, { skipEmptyLines: true });
          if (parsed.data && parsed.data.length > 1) {
            const students = transformRowsToStudents(parsed.data);
            if (students.length > 0) {
              return {
                success: true,
                data: students,
                source: 'google_sheet',
                message: `โหลดข้อมูลจาก Google Sheet แบบ Real-time สำเร็จ (${students.length} รายการ)`,
                timestamp: new Date()
              };
            }
          }
        }
      } catch (err) {
        console.warn(`Direct CSV fetch failed for ${url}:`, err.message);
      }
    }
  }

  // 3. Fallback to Demo / Mock Data if enabled or required
  if (useMockFallback !== false) {
    return {
      success: true,
      data: MOCK_STUDENTS,
      source: 'mock_data',
      message: 'ใช้ข้อมูลจำลอง (Demo Mode) นิสิตวิชา Digital Marketing มหาวิทยาลัยนเรศวร',
      timestamp: new Date(),
      isDemo: true
    };
  }

  return {
    success: false,
    data: [],
    source: 'error',
    message: 'ไม่สามารถดึงข้อมูลได้ โปรดตรวจสอบการแชร์ Google Sheet หรือใช้ข้อมูลจำลอง',
    timestamp: new Date()
  };
}
