import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import HeroSearch from './components/HeroSearch';
import StudentResultCard from './components/StudentResultCard';
import InstructorView from './components/InstructorView';
import SettingsModal from './components/SettingsModal';
import SetupGuideModal from './components/SetupGuideModal';
import Footer from './components/Footer';
import { 
  DEFAULT_SHEET_CONFIG, 
  fetchGradeData 
} from './services/googleSheetService';
import { COURSE_INFO } from './data/mockStudents';
import { CheckCircle2, AlertTriangle, Info } from 'lucide-react';

const STORAGE_KEY = 'nu_grade_sheet_config_v1';

export default function App() {
  const [config, setConfig] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_SHEET_CONFIG;
    } catch {
      return DEFAULT_SHEET_CONFIG;
    }
  });

  const [students, setStudents] = useState([]);
  const [dataSource, setDataSource] = useState('mock_data');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [notification, setNotification] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchedStudent, setSearchedStudent] = useState(null);
  const [searchError, setSearchError] = useState('');

  const [instructorMode, setInstructorMode] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  // Load data from Google Sheet or Fallback
  const loadData = useCallback(async (customConfig = config, showToast = true) => {
    setIsRefreshing(true);
    try {
      const result = await fetchGradeData(customConfig);
      if (result.success && result.data.length > 0) {
        setStudents(result.data);
        setDataSource(result.source);
        setLastUpdated(result.timestamp);
        
        if (showToast) {
          setNotification({
            type: result.source === 'mock_data' ? 'info' : 'success',
            message: result.message
          });
          setTimeout(() => setNotification(null), 4000);
        }

        // If a student was already searched, re-match with updated data
        if (searchQuery) {
          const match = result.data.find(
            s => s.id.toLowerCase() === searchQuery.toLowerCase() ||
                 s.name.toLowerCase().includes(searchQuery.toLowerCase())
          );
          if (match) {
            setSearchedStudent(match);
          }
        }
      } else {
        setNotification({
          type: 'warning',
          message: result.message || 'ไม่สามารถโหลดข้อมูลจาก Google Sheet ได้ กำลังใช้ข้อมูลตัวอย่าง'
        });
        setTimeout(() => setNotification(null), 5000);
      }
    } catch (err) {
      console.error(err);
      setNotification({
        type: 'warning',
        message: 'เกิดข้อผิดพลาดในการโหลดข้อมูล: ' + err.message
      });
      setTimeout(() => setNotification(null), 5000);
    } finally {
      setIsRefreshing(false);
    }
  }, [config, searchQuery]);

  // Initial load
  useEffect(() => {
    loadData(config, false);
  }, [loadData, config]);

  // Handle Search
  const handleSearch = (query) => {
    const q = query.trim().toLowerCase();
    if (!q) {
      setSearchError('กรุณากรอกรหัสนิสิตหรือชื่อ-นามสกุล');
      return;
    }

    setSearchError('');
    const match = students.find(
      s => s.id.toLowerCase() === q || s.name.toLowerCase().includes(q)
    );

    if (match) {
      setSearchedStudent(match);
      setInstructorMode(false);
      // Scroll smoothly to results
      setTimeout(() => {
        window.scrollTo({ top: 380, behavior: 'smooth' });
      }, 100);
    } else {
      setSearchedStudent(null);
      setSearchError(`ไม่พบข้อมูลนิสิตสำหรับ "${query}" โปรดตรวจสอบรหัสนิสิต 8 หลัก หรือติดต่ออาจารย์ผู้สอน`);
    }
  };

  // Reset Search
  const handleResetSearch = () => {
    setSearchedStudent(null);
    setSearchQuery('');
    setSearchError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Save Config from Settings Modal
  const handleSaveConfig = (newConfig) => {
    setConfig(newConfig);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newConfig));
    } catch (e) {
      console.error(e);
    }
    loadData(newConfig, true);
  };

  // Select student from Instructor View
  const handleSelectStudentFromInstructor = (student) => {
    setSearchedStudent(student);
    setSearchQuery(student.id);
    setInstructorMode(false);
    window.scrollTo({ top: 380, behavior: 'smooth' });
  };

  // Quick sample IDs for chips representing different grade ranges
  const quickSamples = [
    students.find(s => s.grade === 'B+'),
    students.find(s => s.grade === 'B'),
    students.find(s => s.grade === 'C+'),
    students.find(s => s.grade === 'C'),
    students.find(s => s.grade === 'D+'),
  ].filter(Boolean);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 relative selection:bg-orange-500 selection:text-white">
      
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md animate-slide-up shadow-2xl rounded-2xl overflow-hidden border border-slate-200">
          <div className={`p-4 flex items-start space-x-3 ${
            notification.type === 'success' ? 'bg-emerald-600 text-white' :
            notification.type === 'warning' ? 'bg-amber-600 text-white' :
            'bg-slate-900 text-white'
          }`}>
            {notification.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
            ) : notification.type === 'warning' ? (
              <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            ) : (
              <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
            )}
            <div className="text-xs sm:text-sm font-medium leading-relaxed">
              {notification.message}
            </div>
            <button 
              onClick={() => setNotification(null)}
              className="text-white/80 hover:text-white text-xs ml-2"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Header Navigation */}
      <Navbar
        dataSource={dataSource}
        isRefreshing={isRefreshing}
        onRefresh={() => loadData(config, true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenGuide={() => setIsGuideOpen(true)}
        instructorMode={instructorMode}
        setInstructorMode={setInstructorMode}
        lastUpdated={lastUpdated}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {instructorMode ? (
          /* Instructor Mode: Analytics & Full Class Roster */
          <div className="py-8">
            <InstructorView
              students={students}
              onSelectStudent={handleSelectStudentFromInstructor}
            />
          </div>
        ) : (
          /* Student Search & Result Mode */
          <div>
            <HeroSearch
              onSearch={handleSearch}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              errorMessage={searchError}
              quickSampleIds={quickSamples}
              isLoading={isRefreshing}
            />

            {/* Result Card when found */}
            {searchedStudent && (
              <StudentResultCard
                student={searchedStudent}
                onResetSearch={handleResetSearch}
              />
            )}
          </div>
        )}
      </main>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        config={config}
        onSaveConfig={handleSaveConfig}
      />

      {/* Setup Guide Modal */}
      <SetupGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />

      {/* Footer */}
      <Footer onOpenGuide={() => setIsGuideOpen(true)} />

    </div>
  );
}
