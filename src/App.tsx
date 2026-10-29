import React, { useState, useEffect } from 'react';
import { HeaderBanner } from './components/HeaderBanner';
import { Navbar, NavTab } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { UnitsView } from './components/UnitsView';
import { ListeningSpeakingView } from './components/ListeningSpeakingView';
import { VideoLessonsView } from './components/VideoLessonsView';
import { LecturesView } from './components/LecturesView';
import { GamesHubView } from './components/GamesHubView';
import { FreeDocumentsView } from './components/FreeDocumentsView';
import { UploadModal } from './components/UploadModal';
import { EditModal } from './components/EditModal';
import { AuthModal } from './components/AuthModal';
import { ParentCornerModal } from './components/ParentCornerModal';
import { DailyLessonModal } from './components/DailyLessonModal';
import { ChineseArenaModal } from './components/ChineseArenaModal';
import { ExploreChinaView } from './components/ExploreChinaView';
import { StorytellingView } from './components/StorytellingView';
import { TeacherAIGeneratorModal } from './components/TeacherAIGeneratorModal';
import { Footer } from './components/Footer';


import {
  PRIMARY_UNITS,
  GRADE_6_UNITS,
  GRADE_7_UNITS,
  GRADE_8_UNITS,
  GRADE_9_UNITS,
  YCT_ALL_LEVELS_UNITS,
  HSK_ALL_LEVELS_UNITS
} from './data/mockData';
import { UserProfile, LectureMaterial } from './types';
import {
  getStoredUser,
  saveStoredUser,
  getStoredMaterials,
  logoutUser,
  fetchMaterialsFromServer,
  fetchAccountsFromServer,
  subscribeToFirestoreMaterials,
  MATERIALS_UPDATED_EVENT,
  isAuthorizedPublisher,
  syncUserProfileToAccount,
} from './utils/storage';
import { sound } from './utils/soundEffects';
import { Plus, Upload, Lock, ShieldCheck } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [user, setUser] = useState<UserProfile>(getStoredUser());
  const [materials, setMaterials] = useState<LectureMaterial[]>(getStoredMaterials());
  
  // Modals state - gate with login modal if not logged in
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [uploadPresetGrade, setUploadPresetGrade] = useState<string | undefined>(undefined);
  const [authModalOpen, setAuthModalOpen] = useState(!user.isLoggedIn);
  const [parentCornerOpen, setParentCornerOpen] = useState(false);
  const [dailyModalOpen, setDailyModalOpen] = useState(false);
  const [shopModalOpen, setShopModalOpen] = useState(false);
  const [teacherAIOpen, setTeacherAIOpen] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState<LectureMaterial | null>(null);

  const handleOpenUploadForGrade = (presetGrade?: string) => {
    setUploadPresetGrade(presetGrade);
    setUploadModalOpen(true);
  };

  // Automatically keep login modal open if user is not logged in
  useEffect(() => {
    if (!user.isLoggedIn) {
      setAuthModalOpen(true);
    }
  }, [user.isLoggedIn]);

  // Synchronize shared materials from Firebase Cloud Firestore & server on mount
  useEffect(() => {
    fetchMaterialsFromServer().then((mats) => setMaterials(mats));
    fetchAccountsFromServer();

    // Real-time Firestore streaming listener
    const unsubscribeFirestore = subscribeToFirestoreMaterials((mats) => {
      setMaterials(mats);
    });

    const handleMaterialsUpdate = () => {
      setMaterials(getStoredMaterials());
    };
    window.addEventListener(MATERIALS_UPDATED_EVENT, handleMaterialsUpdate);

    // Heartbeat sync every 8 seconds
    const interval = setInterval(() => {
      fetchMaterialsFromServer().then((mats) => setMaterials(mats));
    }, 8000);

    return () => {
      unsubscribeFirestore();
      window.removeEventListener(MATERIALS_UPDATED_EVENT, handleMaterialsUpdate);
      clearInterval(interval);
    };
  }, []);

  // When user logs in or changes account, fetch latest materials from server immediately
  useEffect(() => {
    if (user.isLoggedIn) {
      fetchMaterialsFromServer().then((mats) => setMaterials(mats));
      fetchAccountsFromServer();
    }
  }, [user.isLoggedIn, user.email, user.phone]);

  const handleLogout = () => {
    sound.playClick();
    if (window.confirm('Bạn có chắc muốn đăng xuất khỏi tài khoản không?')) {
      const unauthUser = logoutUser();
      setUser(unauthUser);
      setAuthModalOpen(true);
    }
  };

  // App settings state
  const [darkMode, setDarkMode] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [bilingualMode, setBilingualMode] = useState(true);

  // Apply dark mode class to html document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Sync sound synthesizer state
  useEffect(() => {
    sound.enabled = soundEnabled;
  }, [soundEnabled]);

  const refreshMaterials = () => {
    fetchMaterialsFromServer().then((mats) => setMaterials(mats));
  };

  const handleAddXp = (amount: number) => {
    const newXp = user.xp + amount;
    const newLevel = Math.floor(newXp / 300) + 1;
    const newGems = user.gems + Math.floor(amount / 10);
    const updated = {
      ...user,
      xp: newXp,
      level: newLevel,
      gems: newGems,
    };
    setUser(updated);
    saveStoredUser(updated);
    syncUserProfileToAccount(updated);
  };

  const handleCompleteDaily = () => {
    handleAddXp(50);
    const updated = {
      ...user,
      streak: user.streak + 1,
    };
    setUser(updated);
    saveStoredUser(updated);
    syncUserProfileToAccount(updated);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-sans transition-colors duration-200">
      
      {/* 1. Header Banner 1280x250 */}
      <HeaderBanner user={user} />

      {/* 2. Main Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
        user={user}
        onOpenAuth={() => setAuthModalOpen(true)}
        onLogout={handleLogout}
        onOpenShop={() => setShopModalOpen(true)}
        onOpenDaily={() => setDailyModalOpen(true)}
        onOpenParentCorner={() => setParentCornerOpen(true)}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(!soundEnabled)}
      />

      {/* Unauthenticated Notification Banner */}
      {!user.isLoggedIn && (
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white px-4 py-2.5 text-center text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm animate-pulse">
          <Lock className="w-4 h-4 shrink-0" />
          <span>
            Hệ thống yêu cầu đăng nhập bằng <strong>Số điện thoại</strong> hoặc <strong>Gmail</strong> đã đăng ký để tiếp tục học tập.
          </span>
          <button
            onClick={() => setAuthModalOpen(true)}
            className="ml-2 px-3 py-1 rounded-full bg-white text-orange-600 hover:bg-yellow-100 font-extrabold text-xs shadow-xs transition"
          >
            Đăng nhập ngay
          </button>
        </div>
      )}

      {/* 3. Main Views Container */}
      <main className="flex-1 max-w-[1280px] w-full mx-auto px-3 sm:px-6 pt-5">
        {activeTab === 'home' && (
          <HomeView
            onNavigate={(tab) => setActiveTab(tab)}
            user={user}
            onOpenDaily={() => setDailyModalOpen(true)}
            onOpenParentCorner={() => setParentCornerOpen(true)}
            onOpenShop={() => setShopModalOpen(true)}
            bilingualMode={false}
          />
        )}

        {activeTab === 'primary' && (
          <UnitsView
            gradeType="primary"
            units={PRIMARY_UNITS}
            user={user}
            materials={materials}
            onMaterialsChange={refreshMaterials}
            onOpenUpload={handleOpenUploadForGrade}
            onOpenEdit={(mat) => setEditingMaterial(mat)}
            onAddXp={handleAddXp}
          />
        )}

        {activeTab === 'grade6' && (
          <UnitsView
            gradeType="grade6"
            units={GRADE_6_UNITS}
            user={user}
            materials={materials}
            onMaterialsChange={refreshMaterials}
            onOpenUpload={handleOpenUploadForGrade}
            onOpenEdit={(mat) => setEditingMaterial(mat)}
            onAddXp={handleAddXp}
          />
        )}

        {activeTab === 'grade7' && (
          <UnitsView
            gradeType="grade7"
            units={GRADE_7_UNITS}
            user={user}
            materials={materials}
            onMaterialsChange={refreshMaterials}
            onOpenUpload={handleOpenUploadForGrade}
            onOpenEdit={(mat) => setEditingMaterial(mat)}
            onAddXp={handleAddXp}
          />
        )}

        {activeTab === 'grade8' && (
          <UnitsView
            gradeType="grade8"
            units={GRADE_8_UNITS}
            user={user}
            materials={materials}
            onMaterialsChange={refreshMaterials}
            onOpenUpload={handleOpenUploadForGrade}
            onOpenEdit={(mat) => setEditingMaterial(mat)}
            onAddXp={handleAddXp}
          />
        )}

        {activeTab === 'grade9' && (
          <UnitsView
            gradeType="grade9"
            units={GRADE_9_UNITS}
            user={user}
            materials={materials}
            onMaterialsChange={refreshMaterials}
            onOpenUpload={handleOpenUploadForGrade}
            onOpenEdit={(mat) => setEditingMaterial(mat)}
            onAddXp={handleAddXp}
          />
        )}

        {activeTab === 'yct' && (
          <UnitsView
            gradeType="yct"
            units={YCT_ALL_LEVELS_UNITS}
            user={user}
            materials={materials}
            onMaterialsChange={refreshMaterials}
            onOpenUpload={handleOpenUploadForGrade}
            onOpenEdit={(mat) => setEditingMaterial(mat)}
            onAddXp={handleAddXp}
          />
        )}

        {activeTab === 'hsk' && (
          <UnitsView
            gradeType="hsk"
            units={HSK_ALL_LEVELS_UNITS}
            user={user}
            materials={materials}
            onMaterialsChange={refreshMaterials}
            onOpenUpload={handleOpenUploadForGrade}
            onOpenEdit={(mat) => setEditingMaterial(mat)}
            onAddXp={handleAddXp}
          />
        )}

        {activeTab === 'lectures' && (
          <LecturesView
            materials={materials}
            user={user}
            onMaterialsChange={refreshMaterials}
            onOpenUpload={() => handleOpenUploadForGrade()}
            onOpenEdit={(mat) => setEditingMaterial(mat)}
            onOpenAuth={() => setAuthModalOpen(true)}
          />
        )}

        {activeTab === 'listening_speaking' && (
          <ListeningSpeakingView onAddXp={handleAddXp} />
        )}

        {activeTab === 'videos' && (
          <VideoLessonsView />
        )}

        {activeTab === 'games' && (
          <GamesHubView
            user={user}
            onAddXp={handleAddXp}
            onOpenTeacherAI={() => setTeacherAIOpen(true)}
            bilingualMode={bilingualMode}
            onUserUpdate={(updated) => setUser(updated)}
          />
        )}

        {activeTab === 'explore_china' && (
          <ExploreChinaView />
        )}

        {activeTab === 'storytelling' && (
          <StorytellingView />
        )}

        {activeTab === 'free_docs' && (
          <FreeDocumentsView />
        )}

      </main>

      {/* 4. Floating Upload Button at Bottom Right (Dành riêng cho amazingtranslation88@gmail.com) */}
      {isAuthorizedPublisher(user) && (
        <div className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-40">
          <button
            onClick={() => {
              sound.playClick();
              handleOpenUploadForGrade();
            }}
            className="group flex items-center justify-center w-11 h-11 sm:w-auto sm:h-auto sm:px-5 sm:py-3 rounded-full bg-gradient-to-r from-orange-500 via-amber-500 to-emerald-600 text-white font-black text-xs sm:text-sm shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 ring-2 ring-white/50 dark:ring-slate-800"
            title="Đăng tải tài nguyên / bài giảng mới"
          >
            <Upload className="w-5 h-5 shrink-0" />
            <span className="hidden sm:inline ml-2">Đăng tài nguyên</span>
          </button>
        </div>
      )}

      {/* 5. Modals */}
      <UploadModal
        isOpen={uploadModalOpen}
        onClose={() => {
          setUploadModalOpen(false);
          setUploadPresetGrade(undefined);
        }}
        user={user}
        initialGrade={uploadPresetGrade}
        onSuccess={refreshMaterials}
        onOpenAuth={() => setAuthModalOpen(true)}
      />

      <EditModal
        material={editingMaterial}
        user={user}
        onClose={() => setEditingMaterial(null)}
        onSuccess={refreshMaterials}
      />

      <AuthModal
        isOpen={!user.isLoggedIn || authModalOpen}
        onClose={() => {
          if (user.isLoggedIn) {
            setAuthModalOpen(false);
          }
        }}
        user={user}
        onUserChange={(updated) => {
          setUser(updated);
          if (updated.isLoggedIn) {
            setAuthModalOpen(false);
          }
        }}
      />

      <ParentCornerModal
        isOpen={parentCornerOpen}
        onClose={() => setParentCornerOpen(false)}
      />

      <DailyLessonModal
        isOpen={dailyModalOpen}
        onClose={() => setDailyModalOpen(false)}
        onCompleteDaily={handleCompleteDaily}
      />

      <ChineseArenaModal
        isOpen={shopModalOpen}
        onClose={() => setShopModalOpen(false)}
        user={user}
        onUserUpdate={(updated) => setUser(updated)}
      />


      <TeacherAIGeneratorModal
        isOpen={teacherAIOpen}
        onClose={() => setTeacherAIOpen(false)}
        user={user}
        onSuccess={refreshMaterials}
      />

      {/* 6. Footer */}
      <Footer />

    </div>
  );
}
