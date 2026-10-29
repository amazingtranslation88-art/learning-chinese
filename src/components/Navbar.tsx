import React, { useState } from 'react';
import {
  Home,
  BookOpen,
  GraduationCap,
  Presentation,
  Headphones,
  Video,
  Gamepad2,
  FolderDown,
  User,
  Flame,
  Award,
  Sun,
  Moon,
  Volume2,
  VolumeX,
  Menu,
  X,
  Sparkles,
  Gift,
  Clock,
  HeartHandshake,
  LogOut,
  KeyRound,
  Phone,
  Mail,
  Compass,
  Swords
} from 'lucide-react';

import { UserProfile } from '../types';
import { sound } from '../utils/soundEffects';

export type NavTab =
  | 'home'
  | 'primary'
  | 'grade6'
  | 'grade7'
  | 'grade8'
  | 'grade9'
  | 'yct'
  | 'hsk'
  | 'lectures'
  | 'listening_speaking'
  | 'videos'
  | 'games'
  | 'explore_china'
  | 'storytelling'
  | 'free_docs';

interface NavbarProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  user: UserProfile;
  onOpenAuth: () => void;
  onLogout?: () => void;
  onOpenShop: () => void; // Used for Đấu Trường Hán Ngữ
  onOpenDaily: () => void;
  onOpenParentCorner: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  user,
  onOpenAuth,
  onLogout,
  onOpenShop,
  onOpenDaily,
  onOpenParentCorner,
  darkMode,
  onToggleDarkMode,
  soundEnabled,
  onToggleSound,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { id: NavTab; labelVi: string; icon: any; color: string; badge?: string }[] = [
    { id: 'home', labelVi: 'TRANG CHỦ', icon: Home, color: 'text-amber-500' },
    { id: 'yct', labelVi: 'CHUẨN YCT1 – YCT6', icon: Award, color: 'text-amber-600', badge: 'YCT1 - YCT6' },
    { id: 'hsk', labelVi: 'CHUẨN HSK (1 – 3)', icon: Award, color: 'text-violet-500', badge: '3.0 Mới' },
    { id: 'lectures', labelVi: 'BÀI GIẢNG ĐIỆN TỬ', icon: Presentation, color: 'text-rose-500', badge: 'PPTX' },
    { id: 'listening_speaking', labelVi: 'LUYỆN NGHE – NÓI', icon: Headphones, color: 'text-purple-500' },
    { id: 'videos', labelVi: 'VIDEO BÀI GIẢNG', icon: Video, color: 'text-red-500' },
    { id: 'games', labelVi: 'TRÒ CHƠI', icon: Gamepad2, color: 'text-emerald-600', badge: '10 Game & Quà' },
    { id: 'explore_china', labelVi: 'KHÁM PHÁ TRUNG QUỐC', icon: Compass, color: 'text-amber-600', badge: 'Mới' },
    { id: 'storytelling', labelVi: 'KỂ CHUYỆN', icon: Sparkles, color: 'text-pink-500', badge: 'Audio' },
    { id: 'free_docs', labelVi: 'TÀI LIỆU MIỄN PHÍ', icon: FolderDown, color: 'text-teal-500' },
  ];

  const handleSelectTab = (tab: NavTab) => {
    sound.playClick();
    onTabChange(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/95 dark:bg-slate-900/95 border-b border-emerald-100 dark:border-slate-800 shadow-sm transition-all duration-200">
      {/* Top Quick Bar - Automatically hidden on mobile when scrolled to save maximum space */}
      <div className={`max-w-[1280px] mx-auto px-2 sm:px-4 py-1 ${isScrolled ? 'hidden sm:flex' : 'flex'} items-center justify-between text-xs border-b border-gray-100 dark:border-slate-800/80 gap-1.5 transition-all duration-200`}>
        
        {/* Left Quick Navigation (Non-wrapping, compact badges) */}
        <div className="flex items-center gap-1.5 shrink-0 whitespace-nowrap overflow-x-auto scrollbar-none py-0.5">
          {/* Cùng Khám Phá Trung Quốc */}
          <button
            onClick={() => { sound.playClick(); onTabChange('explore_china'); }}
            className="flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-full bg-gradient-to-r from-red-600 to-amber-500 text-white font-black hover:brightness-105 active:scale-95 transition text-[11px] sm:text-xs shadow-2xs shrink-0"
            title="Cùng khám phá danh thắng, văn hóa, khoa học, nhân vật Trung Quốc"
          >
            <Compass className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>Cùng khám phá Trung Quốc</span>
          </button>

          {/* Đấu Trường Hán Ngữ */}
          <button
            onClick={() => { sound.playClick(); onOpenShop(); }}
            className="flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-full bg-amber-500/15 border border-amber-300 dark:border-amber-700 text-red-900 dark:text-amber-200 font-black hover:bg-amber-100 transition text-[11px] sm:text-xs shadow-2xs shrink-0"
            title="Đấu Trường Hán Ngữ - Tranh tài Ngôn ngữ & Văn hóa"
          >
            <Swords className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-red-600" />
            <span>Đấu Trường Hán Ngữ ({user.gems} 💎)</span>
          </button>

          {/* Kể Chuyện Tiếng Trung */}
          <button
            onClick={() => { sound.playClick(); onTabChange('storytelling'); }}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-pink-100 dark:bg-pink-950/60 text-pink-700 dark:text-pink-300 font-bold hover:bg-pink-200 transition"
            title="Kể chuyện bằng tiếng Trung"
          >
            <Sparkles className="w-3.5 h-3.5 text-pink-500" />
            <span>Kể chuyện</span>
          </button>

          {/* Góc phụ huynh */}
          <button
            onClick={() => { sound.playClick(); onOpenParentCorner(); }}
            className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-pink-50 dark:bg-pink-950/40 text-pink-700 dark:text-pink-300 font-bold hover:bg-pink-100 transition"
          >
            <HeartHandshake className="w-3.5 h-3.5 text-pink-500" />
            <span>Góc phụ huynh</span>
          </button>
        </div>

        {/* Right User Stats & Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Sound Toggle */}
          <button
            onClick={() => { onToggleSound(); sound.playClick(); }}
            title={soundEnabled ? 'Tắt âm thanh' : 'Bật âm thanh'}
            className="p-1 sm:p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-600 dark:text-gray-300 transition"
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500" /> : <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />}
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => { sound.playClick(); onToggleDarkMode(); }}
            title={darkMode ? 'Chuyển chế độ sáng' : 'Chuyển chế độ tối'}
            className="p-1 sm:p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-600 dark:text-gray-300 transition"
          >
            {darkMode ? <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" /> : <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-600" />}
          </button>

          {/* User Profile Mini Bar / Login Button */}
          {user.isLoggedIn ? (
            <div className="flex items-center gap-1 sm:gap-2 pl-1 sm:pl-2 border-l border-gray-200 dark:border-slate-700">
              <div
                onClick={() => { sound.playClick(); onOpenAuth(); }}
                className="flex items-center gap-1.5 cursor-pointer hover:opacity-90 transition"
                title="Xem & chỉnh sửa hồ sơ cá nhân"
              >
                <div className="hidden md:flex items-center gap-1.5 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-800 text-[11px] font-bold text-amber-800 dark:text-amber-300">
                  <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500 animate-pulse" />
                  <span>{user.streak} ngày</span>
                </div>

                <div className="flex items-center gap-1 sm:gap-1.5 bg-emerald-50 dark:bg-emerald-950/40 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full border border-emerald-200 dark:border-emerald-700 text-xs font-bold text-emerald-800 dark:text-emerald-300">
                  <span className="text-sm sm:text-base">{user.avatar}</span>
                  <div className="flex flex-col text-left">
                    <span className="font-extrabold max-w-[70px] sm:max-w-[130px] truncate leading-tight text-[11px] sm:text-xs">
                      {user.name}
                    </span>
                    <span className="text-[9px] sm:text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold leading-tight flex items-center gap-1">
                      {user.role === 'teacher' ? (
                        <span className="text-purple-600 dark:text-purple-400 font-bold">Giáo viên</span>
                      ) : (
                        <span>{user.grade || `Lv.${user.level}`}</span>
                      )}
                    </span>
                  </div>
                </div>
              </div>

              {onLogout && (
                <button
                  onClick={() => { sound.playClick(); onLogout(); }}
                  title="Đăng xuất tài khoản"
                  className="p-1 sm:px-2 sm:py-1 rounded-full bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-900/50 text-rose-600 dark:text-rose-300 text-xs font-bold transition border border-rose-200 dark:border-rose-800"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline ml-1">Đăng xuất</span>
                </button>
              )}
            </div>
          ) : (
            <button
              onClick={() => { sound.playClick(); onOpenAuth(); }}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-white font-black text-xs shadow-md hover:scale-105 active:scale-95 transition"
            >
              <KeyRound className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>Đăng nhập</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Navigation Menu Bar */}
      <nav className="max-w-[1280px] mx-auto px-2 sm:px-4">
        <div className={`flex items-center justify-between ${isScrolled ? 'h-10 sm:h-14' : 'h-11 sm:h-14'} transition-all duration-200`}>
          
          {/* Logo Brand Title: on mobile when scrolled, keeps only panda logo and MS. LIÊN CHINA */}
          <div
            onClick={() => handleSelectTab('home')}
            className="flex items-center gap-2 cursor-pointer group shrink-0 mr-2"
          >
            <div className={`${isScrolled ? 'w-8 h-8' : 'w-9 h-9 sm:w-10 sm:h-10'} rounded-xl sm:rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white text-base sm:text-xl shadow-md group-hover:scale-105 transition-all`}>
              🐼
            </div>
            <div>
              <span className="text-xs sm:text-base font-black tracking-tight text-emerald-800 dark:text-emerald-400 block leading-tight">
                MS. LIÊN CHINA
              </span>
              {!isScrolled && (
                <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 hidden sm:block leading-tight">
                  Kho học liệu số GDPT & YCT
                </span>
              )}
            </div>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-1.5 overflow-x-auto py-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectTab(item.id)}
                  className={`relative flex items-center gap-1 px-2.5 py-1.5 xl:px-3 xl:py-2 rounded-xl text-xs xl:text-xs font-black transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 scale-102'
                      : 'text-gray-700 dark:text-gray-200 hover:bg-emerald-50 dark:hover:bg-slate-800 hover:text-emerald-600 dark:hover:text-emerald-400'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : item.color}`} />
                  <span>{item.labelVi}</span>
                  {item.badge && (
                    <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-black uppercase ml-0.5 ${
                      isActive ? 'bg-amber-300 text-amber-950' : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => { sound.playClick(); setMobileMenuOpen(!mobileMenuOpen); }}
              className="p-2 rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-3 border-t border-gray-100 dark:border-slate-800 grid grid-cols-2 sm:grid-cols-3 gap-2 animate-in fade-in slide-in-from-top-2 duration-200 max-h-[75vh] overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectTab(item.id)}
                  className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-bold text-left transition ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'bg-gray-50 dark:bg-slate-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : item.color}`} />
                  <div className="flex-1 min-w-0">
                    <div className="truncate font-black">{item.labelVi}</div>
                    {item.badge && (
                      <span className="text-[9px] text-amber-600 dark:text-amber-400 font-bold block">
                        {item.badge}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}

            {/* Mobile Quick Action Buttons */}
            <div className="col-span-2 sm:col-span-3 space-y-2">

              <button
                onClick={() => {
                  sound.playClick();
                  setMobileMenuOpen(false);
                  handleSelectTab('explore_china');
                }}
                className="w-full flex items-center justify-between p-2.5 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 text-white text-xs font-black shadow-xs"
              >
                <div className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-amber-200" />
                  <span>Cùng Khám Phá Trung Quốc</span>
                </div>
                <span className="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded-full">Khám phá</span>
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  setMobileMenuOpen(false);
                  onOpenShop();
                }}
                className="w-full flex items-center justify-between p-2.5 rounded-xl bg-gradient-to-r from-red-700 via-rose-700 to-amber-700 text-white text-xs font-black shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <Swords className="w-4 h-4 text-amber-300" />
                  <span>ĐẤU TRƯỜNG HÁN NGỮ</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-black/30 text-[10px] text-amber-200">
                  {user.gems} 💎 Kim Cương
                </span>
              </button>
            </div>


            {/* Mobile Auth Row */}
            <div className="col-span-2 sm:col-span-3 pt-2 mt-1 border-t border-gray-200 dark:border-slate-700 flex items-center justify-between gap-2">

              <button
                onClick={() => {
                  sound.playClick();
                  setMobileMenuOpen(false);
                  onOpenAuth();
                }}
                className="flex-1 flex items-center gap-2 p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 text-xs font-bold"
              >
                <span className="text-lg">{user.avatar}</span>
                <div className="text-left truncate">
                  <div className="font-extrabold truncate">{user.name || 'Đăng nhập tài khoản'}</div>
                  <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium truncate">
                    {user.isLoggedIn ? (user.phone || user.email || 'Đã đăng nhập') : 'Bấm để đăng nhập'}
                  </div>
                </div>
              </button>

              {user.isLoggedIn && onLogout && (
                <button
                  onClick={() => {
                    sound.playClick();
                    setMobileMenuOpen(false);
                    onLogout();
                  }}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-300 text-xs font-bold"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Thoát</span>
                </button>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
