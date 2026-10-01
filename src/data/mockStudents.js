import { REAL_STUDENTS_RAW } from './realStudentList';

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

export function getDefaultRemarks(grade, total) {
  if (grade === 'A') return 'ผลการเรียนยอดเยี่ยม คะแนนรวมอยู่ในระดับเกียรตินิยม';
  if (grade === 'B+' || grade === 'B') return 'ผลการเรียนอยู่ในเกณฑ์ดี มีความตั้งใจและส่งงานครบถ้วน';
  if (grade === 'C+' || grade === 'C') return 'ผ่านเกณฑ์ตามมาตรฐานรายวิชา ผลงานคะแนนเก็บอยู่ในเกณฑ์น่าพึงพอใจ';
  if (grade === 'D+' || grade === 'D') return 'ผ่านเกณฑ์ขั้นต่ำ แนะนำให้ทบทวนเนื้อหาเพิ่มเติมเพื่อพัฒนาต่อยอด';
  return 'ไม่ผ่านเกณฑ์รายวิชา โปรดติดต่ออาจารย์ผู้สอนเพื่อรับคำแนะนำ';
}

export const MOCK_STUDENTS = REAL_STUDENTS_RAW.map(item => {
  const [no, id, name, classwork, midterm, final, form, total, grade] = item;
  return {
    no,
    id: String(id).trim(),
    name: String(name).trim(),
    faculty: "มหาวิทยาลัยนเรศวร",
    major: "การตลาดดิจิทัล (Digital Marketing)",
    sec: "Sec 1",
    classwork: parseFloat(classwork),
    maxClasswork: 50,
    midterm: parseFloat(midterm),
    maxMidterm: 20,
    final: parseFloat(final),
    maxFinal: 25,
    form: parseFloat(form),
    maxForm: 5,
    total: parseFloat(total),
    grade: String(grade).trim(),
    remarks: getDefaultRemarks(grade, total),
    status: getGradeStatus(grade)
  };
});

export const COURSE_INFO = {
  courseCode: "206331",
  courseNameTh: "การตลาดดิจิทัล",
  courseNameEn: "Digital Marketing",
  semester: "ภาคเรียนที่ 1 ปีการศึกษา 2568",
  faculty: "คณะบริหารธุรกิจ เศรษฐศาสตร์และการสื่อสาร",
  university: "มหาวิทยาลัยนเรศวร (Naresuan University)",
  instructor: "ผู้สอน: ทีมคณาจารย์ประจำวิชาการตลาดดิจิทัล",
  maxScore: 100,
  scoreCriteria: [
    { grade: "A", min: 80, max: 100, color: "text-emerald-600 bg-emerald-50 border-emerald-200" },
    { grade: "B+", min: 75, max: 79.99, color: "text-teal-600 bg-teal-50 border-teal-200" },
    { grade: "B", min: 70, max: 74.99, color: "text-blue-600 bg-blue-50 border-blue-200" },
    { grade: "C+", min: 65, max: 69.99, color: "text-cyan-600 bg-cyan-50 border-cyan-200" },
    { grade: "C", min: 60, max: 64.99, color: "text-amber-600 bg-amber-50 border-amber-200" },
    { grade: "D+", min: 55, max: 59.99, color: "text-orange-600 bg-orange-50 border-orange-200" },
    { grade: "D", min: 50, max: 54.99, color: "text-rose-600 bg-rose-50 border-rose-200" },
    { grade: "F", min: 0, max: 49.99, color: "text-red-700 bg-red-50 border-red-200" },
  ]
};
