# NU Digital Marketing Grade Viewer 🎓📊
### ระบบตรวจสอบเกรดและคะแนนแบบ Real-time มหาวิทยาลัยนเรศวร (Naresuan University)

เว็บแอปพลิเคชันสำหรับนิสิตมหาวิทยาลัยนเรศวรในการตรวจสอบผลคะแนนสอบ คะแนนเก็บ และเกรดที่คาดว่าจะได้รับในรายวิชา **Digital Marketing (การตลาดดิจิทัล)** โดยดึงข้อมูลแบบ Real-time จาก Google Sheet โดยตรง พร้อมระบบรักษาความเป็นส่วนตัว (Privacy-First) และแดชบอร์ดสถิติสำหรับอาจารย์ผู้สอน

---

## ✨ ฟีเจอร์หลัก (Key Features)

### 1. สำหรับนิสิต (Student Experience)
- 🔍 **ค้นหาด้วยรหัสนิสิต (Smart Search):** กรอกรหัสนิสิต 8 หลัก (เช่น `65051001`) หรือชื่อ-นามสกุล เพื่อดูผลการเรียนของตนเอง
- 🔒 **รักษาความเป็นส่วนตัว (Privacy-First):** นิสิตจะเห็นเฉพาะผลคะแนนของตนเองเท่านั้น ไม่สามารถเห็นคะแนนของเพื่อนร่วมชั้น
- 🏆 **เกรดและการประเมินผล (Grade Badge):** แสดงเกรดตัวอักษรขนาดใหญ่ (A, B+, B, C+, C, D+, D, F) พร้อมเอฟเฟกต์ Confetti ฉลองความสำเร็จสำหรับผู้ได้เกรด A
- 📊 **คะแนนเก็บย่อยพร้อม Progress Bar:**
  - คะแนนสอบกลางภาค (Midterm Exam - 25 คะแนน)
  - คะแนนสอบปลายภาค (Final Exam - 30 คะแนน)
  - งานมอบหมาย & โครงงานกลุ่ม (Assignment & Project - 20 คะแนน)
  - แบบทดสอบย่อย (Quiz - 15 คะแนน)
  - การเข้าเรียน & การมีส่วนร่วมในชั้นเรียน (Class Attendance - 10 คะแนน)
- 💬 **ข้อเสนอแนะจากอาจารย์ (Teacher Remarks):** แสดงคำแนะนำ สถานะการส่งงาน และหมายเหตุส่วนบุคคล
- 🖨️ **พิมพ์และบันทึกรายงานผล (Print / Export PDF):** มีปุ่มพิมพ์ใบสรุปผลคะแนนที่จัดเลย์เอาต์ทางการแบบเป็นระเบียบสวยงาม
- 📋 **คัดลอกสรุปผลคะแนน (1-Click Copy Summary):** คัดลอกข้อความสรุปส่งต่อให้อาจารย์หรือเก็บไว้ดู

### 2. สำหรับอาจารย์ผู้สอน (Instructor Mode)
- 📈 **แดชบอร์ดสถิติภาพรวม (Class Analytics):** คะแนนเฉลี่ย (Mean), คะแนนสูงสุด (Max), คะแนนต่ำสุด (Min), อัตราผ่านเกณฑ์ (Passing Rate)
- 📊 **กราฟการกระจายตัวของเกรด (Grade Distribution):** แท่งแสดงจำนวนนิสิตและสัดส่วนเปอร์เซ็นต์ในแต่ละเกรด (A ถึง F)
- 📑 **ตารางคะแนนรวมทั้งชั้นเรียน:** ค้นหา กรองตามกลุ่ม/เซกชัน (Sec) และเกรด พร้อมปุ่มคลิกดูรายงานผลรายบุคคล
- 📥 **ส่งออกข้อมูล CSV/Excel:** ดาวน์โหลดคะแนนทั้งห้องเป็นไฟล์ CSV นำไปเปิดใน Microsoft Excel หรือ Google Sheets ได้ทันที

### 3. การเชื่อมต่อ Google Sheet Real-time
- 🔄 รองรับการดึงข้อมูลสดจาก Google Sheet URL โดยตรงผ่าน Google Visualization API (GViz) / CSV Export
- ⚡ รองรับการเชื่อมต่อผ่าน **Google Apps Script Web App** เป็น REST API (ป้องกันปัญหา CORS และไม่ต้องเปิดสิทธิ์สาธารณะ)
- 🧪 มี **โหมดข้อมูลจำลอง (Demo Fallback Mode):** พรีโหลดข้อมูลนิสิต ม.นเรศวร สมจริง 12+ คน ทำให้ระบบสามารถเปิดทดสอบได้ทันที

---

## 🛠️ เทคโนโลยีที่ใช้ (Tech Stack)

- **Frontend:** React 19 + Vite 5 (โหลดไวเป็นพิเศษ ประสิทธิภาพสูง)
- **Styling:** Tailwind CSS 3.4 (ดีไซน์ Modern Minimalist โทนสีเทา-แสด มหาวิทยาลัยนเรศวร `#ED6B22` / `#58595B`)
- **Typography:** Google Fonts (Prompt & Kanit สำหรับภาษาไทยที่อ่านง่ายและสวยงาม)
- **Icons:** Lucide React
- **CSV Parsing:** PapaParse
- **Interactive Effects:** Canvas-Confetti

---

## 🚀 วิธีติดตั้งและรันในเครื่อง (Local Setup)

### 1. Clone หรือเปิดโฟลเดอร์โปรเจกต์
```bash
cd /Users/teephobwirachowatin/work/grade
```

### 2. ติดตั้ง Dependencies
```bash
npm install
```

### 3. รันเซิร์ฟเวอร์สำหรับพัฒนา (Development Server)
```bash
npm run dev
```
เปิดบราวเซอร์ที่: `http://localhost:5173/`

### 4. สั่ง Build เพื่อเตรียม Deploy
```bash
npm run build
```
ผลลัพธ์จะถูกสร้างไว้ในโฟลเดอร์ `dist/`

---

## 🌐 วิธีนำขึ้นใช้งานจริง (Deployment Guide)

### วิธีที่ 1: Deploy บน Vercel (แนะนำ - ฟรีและเร็วที่สุด)
1. สมัคร/เข้าสู่ระบบที่ [Vercel](https://vercel.com)
2. ติดตั้ง Vercel CLI หรือผูกกับ GitHub Repository:
   ```bash
   npx vercel
   ```
3. กด Enter ยอมรับการตั้งค่าเริ่มต้น Vercel จะตรวจพบว่าเป็น Vite Project อัตโนมัติและมอบ URL พร้อมใช้งานทันที

### วิธีที่ 2: Deploy บน Netlify (ฟรี)
1. รันคำสั่ง `npm run build`
2. ลากโฟลเดอร์ `dist/` ไปวางที่ [Netlify Drop](https://app.netlify.com/drop)
3. เว็บไซต์จะเปิดใช้งานทันที

### วิธีที่ 3: Deploy บน GitHub Pages
1. ติดตั้ง `gh-pages`:
   ```bash
   npm install -D gh-pages
   ```
2. เพิ่ม `"homepage": "https://<your-username>.github.io/<repo-name>"` ใน `package.json`
3. เพิ่มคำสั่งใน `scripts`:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist"
   ```
4. สั่ง `npm run deploy`

---

## 📋 วิธีตั้งค่า Google Sheet เพื่อให้เชื่อมต่อได้สมบูรณ์

Google Sheet เป้าหมาย:
`https://docs.google.com/spreadsheets/d/1iSChRpjoU_yKoHB7AV8qTceOB7wDLPviwsfBlhJVPnw/edit?gid=231322230#gid=231322230`

### วิธีที่ A: เปิดสิทธิ์แชร์ให้อ่านได้ (เร็วที่สุด 30 วินาที)
1. เปิดไฟล์ Google Sheet ด้านบนด้วยบัญชี Google ที่มีสิทธิ์แก้ไข
2. คลิกปุ่ม **"แชร์" (Share)** ที่มุมขวาบน
3. ในส่วน **การเข้าถึงทั่วไป (General access)** เปลี่ยนจาก "จำกัด" เป็น:
   **"ทุกคนที่มีลิงก์มีสิทธิ์ดู" (Anyone with the link can view)**
4. กด **เสร็จสิ้น (Done)**
5. กลับมาที่เว็บแอปแล้วกดปุ่ม **"รีเฟรช" (Refresh)** ข้อมูลจริงจะโหลดเข้ามาทันที

### วิธีที่ B: ใช้งานผ่าน Google Apps Script Web App (เสถียรที่สุด)
1. ในหน้า Google Sheet ให้คลิกเมนู **ส่วนขยาย (Extensions) → Apps Script**
2. ลบโค้ดเดิมแล้ววางโค้ดนี้:
   ```javascript
   function doGet(e) {
     try {
       var ss = SpreadsheetApp.getActiveSpreadsheet();
       var sheet = ss.getSheetByName("Sheet1") || ss.getSheets()[0];
       var data = sheet.getDataRange().getValues();
       return ContentService
         .createTextOutput(JSON.stringify(data))
         .setMimeType(ContentService.MimeType.JSON);
     } catch (err) {
       return ContentService
         .createTextOutput(JSON.stringify({ error: err.toString() }))
         .setMimeType(ContentService.MimeType.JSON);
     }
   }
   ```
3. กด **บันทึก (Save)**
4. คลิก **การทำให้ใช้งานได้ (Deploy) → การทำให้ใช้งานได้รายการใหม่ (New deployment)**
5. เลือกประเภท: **เว็บแอป (Web app)**
   - เรียกใช้ในฐานะ (Execute as): **ฉัน (Me)**
   - ผู้ที่มีสิทธิ์เข้าถึง (Who has access): **ทุกคน (Anyone)**
6. กด **ทำให้ใช้งานได้ (Deploy)** และคัดลอก **URL ของเว็บแอป**
7. นำ URL มาใส่ในเมนู **ตั้งค่า (Settings)** บนหน้าเว็บ NU Grade Viewer

---

## 📂 โครงสร้างโปรเจกต์ (Project Structure)

```
grade/
├── index.html                  # HTML5 Entry Point พร้อม Prompt & Kanit Google Fonts
├── package.json                # Project dependencies และ scripts
├── tailwind.config.js          # ปรับแต่งโทนสี NU Orange & NU Gray
├── postcss.config.js
├── vite.config.js
└── src/
    ├── main.jsx                # React Entry Point
    ├── App.jsx                 # Component หลัก เชื่อมโยง State, Search, และ Modals
    ├── index.css               # Tailwind directives และสไตล์การพิมพ์ (Print CSS)
    ├── data/
    │   └── mockStudents.js     # ข้อมูลตัวอย่างนิสิต ม.นเรศวร และเกณฑ์คะแนนวิชา Digital Marketing
    ├── services/
    │   └── googleSheetService.js # โมดูลดึงข้อมูลและแปลง CSV/GViz/Apps Script เป็น JSON
    └── components/
        ├── Navbar.jsx          # แถบนำทาง โลโก้ NU ปุ่มรีเฟรช และสลับโหมด
        ├── HeroSearch.jsx      # หน้าค้นหาพร้อมปุ่มตัวอย่างรหัสนิสิตทดสอบ
        ├── StudentResultCard.jsx # บัตรแสดงผลคะแนน เกรดตัวโต Confetti และ Progress Bars
        ├── InstructorView.jsx  # แดชบอร์ดอาจารย์ สถิติ Mean/Max/Min กราฟเกรด และตารางค้นหา
        ├── SettingsModal.jsx   # โมดูลตั้งค่า Sheet ID, GID และปุ่มทดสอบการเชื่อมต่อสด
        ├── SetupGuideModal.jsx # ป๊อปอัปแนะนำวิธีตั้งค่า Google Sheet และคัดลอกโค้ด Apps Script
        └── Footer.jsx          # ส่วนท้ายเว็บ ข้อมูลคณะบริหารธุรกิจฯ ม.นเรศวร และข้อความ PDPA
```

---

## 🧑‍💻 ผู้ดูแลและลิขสิทธิ์
รายวิชา **206331 การตลาดดิจิทัล (Digital Marketing)**  
คณะบริหารธุรกิจ เศรษฐศาสตร์และการสื่อสาร มหาวิทยาลัยนเรศวร (Naresuan University)
