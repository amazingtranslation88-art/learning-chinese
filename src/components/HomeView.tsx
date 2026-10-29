import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  GraduationCap,
  Headphones,
  Video,
  Gamepad2,
  FolderDown,
  Sparkles,
  Award,
  Users,
  Eye,
  Download,
  MessageSquare,
  Clock,
  HeartHandshake,
  Star,
  ChevronRight,
  Flame,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Play,
  Compass,
  Swords,
  RotateCcw,
  Plus,
  X
} from 'lucide-react';

import { NavTab } from './Navbar';
import { UserProfile, StudentRank } from '../types';
import {
  getStoredMaterials,
  getSystemStats,
  MATERIALS_UPDATED_EVENT,
  getRealtimeStudentLeaderboard,
  refreshAndSyncLeaderboard,
  adminUpdateStudentXP,
  isAuthorizedPublisher
} from '../utils/storage';
import { sound } from '../utils/soundEffects';
import confetti from 'canvas-confetti';

interface HomeViewProps {
  onNavigate: (tab: NavTab) => void;
  user: UserProfile;
  onOpenDaily: () => void;
  onOpenParentCorner: () => void;
  onOpenShop: () => void;
  bilingualMode: boolean;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  user,
  onOpenDaily,
  onOpenParentCorner,
  onOpenShop,
  bilingualMode,
}) => {
  const [secondsSpent, setSecondsSpent] = useState<number>(0);
  const [studentGradeFilter, setStudentGradeFilter] = useState<'all' | 'primary' | 'grade6' | 'grade7' | 'grade8' | 'grade9'>('all');
  const [materials, setMaterials] = useState(() => getStoredMaterials());
  const [studentsList, setStudentsList] = useState<StudentRank[]>(() => getRealtimeStudentLeaderboard());
  const [isUpdatingLeaderboard, setIsUpdatingLeaderboard] = useState(false);
  const [updateMessage, setUpdateMessage] = useState('');

  // Award modal for amazingtranslation88@gmail.com
  const [awardModalOpen, setAwardModalOpen] = useState(false);
  const [awardStudentName, setAwardStudentName] = useState('');
  const [awardXpAmount, setAwardXpAmount] = useState(100);
  const [awardBadge, setAwardBadge] = useState('⭐ Học Sinh Xuất Sắc');

  const stats = getSystemStats();
  const canManageLeaderboard = isAuthorizedPublisher(user);

  useEffect(() => {
    const handleUpdate = () => {
      setMaterials(getStoredMaterials());
      setStudentsList(getRealtimeStudentLeaderboard());
    };
    window.addEventListener(MATERIALS_UPDATED_EVENT, handleUpdate);
    return () => {
      window.removeEventListener(MATERIALS_UPDATED_EVENT, handleUpdate);
    };
  }, []);

  // Real-time update leaderboard on mount
  useEffect(() => {
    setStudentsList(getRealtimeStudentLeaderboard());
  }, [user.xp, user.streak, user.level]);

  // Active study clock counter
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsSpent((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Filter students based on grade
  const filteredStudents = studentsList.filter((st) => {
    if (studentGradeFilter === 'primary') return st.className.includes('Lớp 1') || st.className.includes('Lớp 2') || st.className.includes('Lớp 3') || st.className.includes('Lớp 4') || st.className.includes('Lớp 5') || st.className.includes('Tiểu học');
    if (studentGradeFilter === 'grade6') return st.className.includes('Lớp 6');
    if (studentGradeFilter === 'grade7') return st.className.includes('Lớp 7');
    if (studentGradeFilter === 'grade8') return st.className.includes('Lớp 8');
    if (studentGradeFilter === 'grade9') return st.className.includes('Lớp 9');
    return true;
  });

  const handleRefreshLeaderboard = async () => {
    sound.playClick();
    setIsUpdatingLeaderboard(true);
    setUpdateMessage('');
    try {
      const fresh = await refreshAndSyncLeaderboard();
      setStudentsList(fresh);
      sound.playVictory();
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      setUpdateMessage('🎉 Đã cập nhật Bảng Vàng theo kết quả tương tác & học tập thực tế!');
      setTimeout(() => setUpdateMessage(''), 4500);
    } catch (err) {
      console.warn('Leaderboard sync error:', err);
    } finally {
      setIsUpdatingLeaderboard(false);
    }
  };

  const handleAwardSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!awardStudentName.trim()) return;

    sound.playVictory();
    const updated = await adminUpdateStudentXP(awardStudentName.trim(), Number(awardXpAmount), awardBadge);
    setStudentsList(updated);
    setAwardModalOpen(false);
    setAwardStudentName('');
    setUpdateMessage(`🌟 Đã cộng +${awardXpAmount} XP cho em ${awardStudentName.trim()} thành công!`);
    confetti({ particleCount: 75, spread: 55, origin: { y: 0.6 } });
    setTimeout(() => setUpdateMessage(''), 4500);
  };

  // 3D Big Action Buttons for Home (Bỏ Bài giảng điện tử theo yêu cầu)
  const bigButtons = [
    {
      tab: 'yct' as NavTab,
      titleVi: 'CHUẨN YCT1 – YCT6',
      countText: 'Trọn bộ 6 Cấp độ Hanban YCT',
      emoji: '🏆',
      bgGradient: 'from-amber-400 via-orange-500 to-yellow-600',
      badgeColor: 'bg-amber-100 text-amber-800',
      borderHover: 'hover:border-amber-300',
      desc: 'Luyện thi chứng chỉ quốc tế YCT từ Cấp độ 1 đến Cấp độ 6 với đề thi và audio chuẩn.'
    },
    {
      tab: 'hsk' as NavTab,
      titleVi: 'CHUẨN HSK (1 – 3) 3.0',
      countText: 'Tiêu chuẩn mới nhất HSK 3.0',
      emoji: '🎯',
      bgGradient: 'from-violet-500 via-purple-600 to-indigo-700',
      badgeColor: 'bg-violet-100 text-violet-800',
      borderHover: 'hover:border-violet-300',
      desc: 'Luyện thi HSK 1, 2, 3 chuẩn 3.0: 500 từ cốt lõi, 772 từ tích lũy, 973 từ mở rộng và ngữ pháp thực chiến.'
    },
    {
      tab: 'listening_speaking' as NavTab,
      titleVi: 'LUYỆN NGHE – NÓI & SỬA LỖI',
      countText: 'Thu âm & Chấm điểm sửa lỗi',
      emoji: '🎧',
      bgGradient: 'from-pink-500 via-rose-500 to-fuchsia-600',
      badgeColor: 'bg-pink-100 text-pink-800',
      borderHover: 'hover:border-pink-300',
      desc: 'Nghe phát âm chuẩn, học sinh bấm nút thu âm để nói và được AI chỉ ra lỗi, sửa lỗi từng âm!'
    },
    {
      tab: 'videos' as NavTab,
      titleVi: 'VIDEO BÀI GIẢNG',
      countText: '25+ Video tuyển chọn',
      emoji: '🎬',
      bgGradient: 'from-red-500 via-rose-600 to-orange-600',
      badgeColor: 'bg-red-100 text-red-800',
      borderHover: 'hover:border-red-300',
      desc: 'Video sinh động theo từng Unit, hình ảnh trực quan, dễ nhớ, có phụ đề song ngữ.'
    },
    {
      tab: 'games' as NavTab,
      titleVi: 'TRÒ CHƠI & ĐỔI QUÀ',
      countText: '10 Dạng Game & Cửa Hàng Quà 🎁',
      emoji: '🎮',
      bgGradient: 'from-teal-400 via-emerald-500 to-green-600',
      badgeColor: 'bg-teal-100 text-teal-800',
      borderHover: 'hover:border-teal-300',
      desc: '10 trò chơi trí tuệ, thi đấu rèn luyện và dùng Kim Cương đổi Avatar 3D, danh hiệu Trạng Nguyên!'
    },
    {
      tab: 'explore_china' as NavTab,
      titleVi: 'CÙNG KHÁM PHÁ TRUNG QUỐC',
      countText: 'Văn hóa • Danh thắng • Công nghệ',
      emoji: '🏮',
      bgGradient: 'from-red-600 via-rose-600 to-amber-600',
      badgeColor: 'bg-red-100 text-red-800',
      borderHover: 'hover:border-red-300',
      desc: 'Vạn Lý Trường Thành, Cố Cung, Kinh kịch, Trà đạo, Tàu cao tốc Fuxing, Tứ đại danh tác, Khổng Tử, Lý Bạch.'
    },
    {
      tab: 'storytelling' as NavTab,
      titleVi: 'KỂ CHUYỆN TIẾNG TRUNG',
      countText: 'Ngụ ngôn & Thần thoại có Audio',
      emoji: '📖',
      bgGradient: 'from-pink-500 via-rose-500 to-amber-500',
      badgeColor: 'bg-pink-100 text-pink-800',
      borderHover: 'hover:border-pink-300',
      desc: 'Kho truyện song ngữ với giọng đọc chuẩn Bắc Kinh: Thầy bói xem voi, Ôm cây đợi thỏ, Cáo mượn oai hùm...'
    },
    {
      tab: 'free_docs' as NavTab,
      titleVi: 'TÀI LIỆU MIỄN PHÍ',
      countText: 'PDF, Flashcard, Đề thi YCT',
      emoji: '📚',
      bgGradient: 'from-blue-500 via-teal-600 to-emerald-700',
      badgeColor: 'bg-blue-100 text-blue-800',
      borderHover: 'hover:border-blue-300',
      desc: 'Tải về miễn phí 100%: Giáo trình YCT, phiếu tập viết nét chữ Hán, phiếu ôn tập.'
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-8 pb-8 sm:pb-12 animate-in fade-in duration-300">
      
      {/* Welcome Banner Card - Compact on Mobile */}
      <div className="bg-gradient-to-br from-emerald-500/10 via-teal-500/10 to-sky-500/10 dark:from-emerald-950/30 dark:via-teal-950/30 dark:to-sky-950/30 rounded-2xl sm:rounded-3xl p-3.5 sm:p-7 border border-emerald-200/60 dark:border-emerald-800/60 shadow-md sm:shadow-lg">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-6">
          <div className="flex items-center gap-3 sm:gap-4 text-left w-full sm:w-auto">
            <div className="w-12 h-12 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl bg-gradient-to-tr from-emerald-400 to-teal-300 flex items-center justify-center text-2xl sm:text-4xl shadow-md sm:shadow-xl shadow-emerald-500/20 shrink-0">
              🐼
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="bg-emerald-600 text-white font-black text-[11px] sm:text-xs px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-2xs">
                  Cô giáo Bùi Ngọc Liên
                </span>
                <span className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">
                  {new Date().toLocaleDateString('vi-VN', { weekday: 'short', day: 'numeric', month: 'numeric' })}
                </span>
              </div>
              <h2 className="text-base sm:text-2xl md:text-3xl font-black text-gray-800 dark:text-gray-100 mt-0.5 truncate">
                Chào <span className="text-emerald-600 dark:text-emerald-400">{user.name}</span>!
              </h2>
              <p className="text-[11px] sm:text-sm text-gray-600 dark:text-gray-300 line-clamp-1 sm:line-clamp-none">
                Kho bài giảng 3D, Đấu Trường Hán Ngữ &amp; Văn hóa Trung Hoa chuẩn GDPT.
              </p>
            </div>
          </div>

          {/* Quick Action Badges */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 w-full sm:w-auto overflow-x-auto scrollbar-none pb-0.5">
            {/* Cùng khám phá Trung Quốc */}
            <button
              onClick={() => { sound.playClick(); onNavigate('explore_china'); }}
              className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2.5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-red-600 to-amber-600 text-white font-black shadow-xs hover:scale-105 active:scale-95 transition shrink-0 text-xs"
              title="Khám phá danh thắng, văn hóa, khoa học Trung Quốc"
            >
              <Compass className="w-3.5 h-3.5 text-amber-200" />
              <span className="text-[11px] sm:text-xs font-bold">Cùng Khám Phá Trung Quốc</span>
            </button>

            {/* Đấu Trường Hán Ngữ */}
            <button
              onClick={() => { sound.playClick(); onOpenShop(); }}
              className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2.5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 text-white font-black shadow-xs hover:scale-105 active:scale-95 transition shrink-0 text-xs"
              title="Đấu Trường Hán Ngữ - Thi đấu nhận thưởng"
            >
              <Swords className="w-3.5 h-3.5 text-amber-300" />
              <span className="text-[11px] sm:text-xs font-bold">Đấu Trường Hán Ngữ</span>
            </button>

            {/* Kể chuyện tiếng Trung */}
            <button
              onClick={() => { sound.playClick(); onNavigate('storytelling'); }}
              className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2.5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-black shadow-xs hover:scale-105 active:scale-95 transition shrink-0 text-xs"
              title="Kể chuyện tiếng Trung có audio"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-200" />
              <span className="text-[11px] sm:text-xs font-bold">Kể Chuyện</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3D Large Buttons Grid (KHO HỌC LIỆU SỐ TIẾNG TRUNG 3D - BỎ BÀI GIẢNG ĐIỆN TỬ) */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-base sm:text-2xl font-black text-gray-800 dark:text-gray-100 flex items-center gap-1.5">
              <span className="text-xl sm:text-2xl">🚀</span>
              <span>KHO HỌC LIỆU SỐ TIẾNG TRUNG 3D</span>
            </h2>
            <p className="text-[11px] sm:text-sm text-gray-500 dark:text-gray-400">
              Chọn chứng chỉ quốc tế hoặc thể loại bài học để học ngay
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-5">
          {bigButtons.map((btn, idx) => (
            <div
              key={idx}
              onClick={() => { sound.playClick(); onNavigate(btn.tab); }}
              className={`group relative rounded-2xl sm:rounded-3xl p-3 sm:p-5 text-white bg-gradient-to-br ${btn.bgGradient} shadow-md sm:shadow-xl hover:shadow-2xl transition-all duration-300 transform active:scale-98 cursor-pointer flex flex-col justify-between border-2 border-white/20 select-none overflow-hidden`}
            >
              <div className="absolute inset-0 bg-white/5 opacity-40 group-hover:opacity-60 transition" />

              <div className="relative z-10 flex items-start justify-between mb-1.5 sm:mb-3">
                <span className="text-2xl sm:text-4xl filter drop-shadow group-hover:scale-110 transition-transform">
                  {btn.emoji}
                </span>
                <span className="text-[9px] sm:text-xs font-black uppercase px-2 py-0.5 rounded-full bg-black/20 backdrop-blur-md text-white border border-white/20 shrink-0">
                  {btn.countText}
                </span>
              </div>

              <div className="relative z-10 my-0.5 sm:my-1">
                <h3 className="text-sm sm:text-lg font-black tracking-tight leading-tight drop-shadow-sm">
                  {btn.titleVi}
                </h3>
                <p className="hidden sm:block text-xs text-white/90 mt-1 font-medium line-clamp-2 leading-relaxed">
                  {btn.desc}
                </p>
              </div>

              <div className="relative z-10 mt-2 sm:mt-4 pt-1.5 sm:pt-3 border-t border-white/20 flex items-center justify-between text-[11px] sm:text-xs font-bold text-white/90">
                <span>Vào học</span>
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2 Important Highlight Sections: 10-Minute Daily & Parents' Corner */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Daily 10-Minute Micro-Lesson */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white p-6 shadow-xl flex flex-col justify-between">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-black/20 text-xs font-black uppercase tracking-wider">
                ⚡ Mỗi ngày 1 bài học 10 phút
              </span>
              <span className="text-xs font-bold text-amber-200">Chuẩn sư phạm</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black mb-2">
              Thói Quen Vàng: 10 Phút Giỏi Tiếng Trung
            </h3>
            <p className="text-xs sm:text-sm text-amber-100 leading-relaxed max-w-md">
              Chỉ với 10 phút mỗi ngày: Bé nghe 3 câu khẩu ngữ, luyện phát âm cùng cô Liên và làm 5 câu đố nhanh để duy trì chuỗi Streak!
            </p>
          </div>
          <div className="relative z-10 mt-5 flex items-center gap-3">
            <button
              onClick={() => { sound.playClick(); onOpenDaily(); }}
              className="px-5 py-2.5 rounded-2xl bg-white text-orange-600 font-black text-xs sm:text-sm shadow-md hover:bg-orange-50 transition active:scale-95"
            >
              Bắt đầu 10 phút ngay
            </button>
            <div className="text-xs font-semibold text-amber-100 flex items-center gap-1">
              <Flame className="w-4 h-4 text-yellow-300 fill-yellow-300" />
              <span>Chuỗi hiện tại: {user.streak} ngày</span>
            </div>
          </div>
        </div>

        {/* Parent Support Corner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-teal-600 via-cyan-600 to-sky-700 text-white p-6 shadow-xl flex flex-col justify-between">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-black/20 text-xs font-black uppercase tracking-wider">
                👨‍👩‍👧 Góc phụ huynh đồng hành
              </span>
              <span className="text-xs font-bold text-teal-200">Lời khuyên chuyên gia</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black mb-2">
              Cách Giúp Con Học Tiếng Trung Tự Nhiên
            </h3>
            <p className="text-xs sm:text-sm text-teal-100 leading-relaxed max-w-md">
              Cẩm nang dành riêng cho cha mẹ: Hướng dẫn bé luyện nghe thụ động khi ăn sáng, dùng thẻ Flashcard và khích lệ con tự tin phát âm.
            </p>
          </div>
          <div className="relative z-10 mt-5 flex items-center gap-3">
            <button
              onClick={() => { sound.playClick(); onOpenParentCorner(); }}
              className="px-5 py-2.5 rounded-2xl bg-white text-teal-700 font-black text-xs sm:text-sm shadow-md hover:bg-teal-50 transition active:scale-95"
            >
              Xem hướng dẫn phụ huynh
            </button>
            <span className="text-xs text-teal-100 font-semibold">100% Miễn phí &amp; thiết thực</span>
          </div>
        </div>
      </div>

      {/* SYSTEM STATS & REAL-TIME STUDY CLOCK */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 sm:p-7 shadow-lg border border-gray-100 dark:border-slate-700">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-100 dark:border-slate-700">
          <div>
            <h3 className="text-lg sm:text-xl font-black text-gray-800 dark:text-gray-100 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
              <span>THỐNG KÊ HOẠT ĐỘNG HỆ THỐNG</span>
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Dữ liệu thời gian thực được đồng bộ trên toàn kho học liệu
            </p>
          </div>

          <div className="flex items-center gap-3 bg-emerald-50 dark:bg-emerald-950/40 px-4 py-2 rounded-2xl border border-emerald-200 dark:border-emerald-800">
            <Clock className="w-5 h-5 text-emerald-600 animate-pulse" />
            <div>
              <div className="text-[10px] font-black uppercase text-emerald-700 dark:text-emerald-400">
                Thời gian bạn học hôm nay
              </div>
              <div className="text-lg font-black text-emerald-900 dark:text-emerald-200 tracking-wider">
                {formatTimer(secondsSpent)}
              </div>
            </div>
          </div>
        </div>

        {/* 5 Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 text-center">
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-slate-700/50 border border-amber-100 dark:border-slate-600">
            <Users className="w-6 h-6 text-amber-600 mx-auto mb-1" />
            <div className="text-xl sm:text-2xl font-black text-gray-800 dark:text-gray-100">
              {stats.membersCount.toLocaleString()}
            </div>
            <div className="text-xs font-bold text-gray-500 dark:text-gray-400">Lượt thành viên</div>
          </div>

          <div className="p-4 rounded-2xl bg-sky-50 dark:bg-slate-700/50 border border-sky-100 dark:border-slate-600">
            <TrendingUp className="w-6 h-6 text-sky-600 mx-auto mb-1" />
            <div className="text-xl sm:text-2xl font-black text-gray-800 dark:text-gray-100">
              {stats.visitsCount.toLocaleString()}
            </div>
            <div className="text-xs font-bold text-gray-500 dark:text-gray-400">Lượt truy cập</div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-slate-700/50 border border-emerald-100 dark:border-slate-600">
            <Eye className="w-6 h-6 text-emerald-600 mx-auto mb-1" />
            <div className="text-xl sm:text-2xl font-black text-gray-800 dark:text-gray-100">
              {stats.totalViews.toLocaleString()}
            </div>
            <div className="text-xs font-bold text-gray-500 dark:text-gray-400">Lượt xem bài</div>
          </div>

          <div className="p-4 rounded-2xl bg-purple-50 dark:bg-slate-700/50 border border-purple-100 dark:border-slate-600">
            <Download className="w-6 h-6 text-purple-600 mx-auto mb-1" />
            <div className="text-xl sm:text-2xl font-black text-gray-800 dark:text-gray-100">
              {stats.totalDownloads.toLocaleString()}
            </div>
            <div className="text-xs font-bold text-gray-500 dark:text-gray-400">Lượt tải học liệu</div>
          </div>

          <div className="col-span-2 sm:col-span-1 p-4 rounded-2xl bg-rose-50 dark:bg-slate-700/50 border border-rose-100 dark:border-slate-600">
            <MessageSquare className="w-6 h-6 text-rose-600 mx-auto mb-1" />
            <div className="text-xl sm:text-2xl font-black text-gray-800 dark:text-gray-100">
              {stats.totalComments.toLocaleString()}
            </div>
            <div className="text-xs font-bold text-gray-500 dark:text-gray-400">Lượt bình luận</div>
          </div>
        </div>
      </div>

      {/* BẢNG VÀNG HỌC CHĂM - ĐƯỢC TÍNH THEO KẾT QUẢ THỰC TẾ & NÚT CẬP NHẬT CHO amazingtranslation88@gmail.com */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 sm:p-7 shadow-lg border border-gray-100 dark:border-slate-700">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🏆</span>
              <h3 className="text-lg sm:text-xl font-black text-gray-800 dark:text-gray-100">
                BẢNG VÀNG HỌC CHĂM – KẾT QUẢ THỰC TẾ HỌC VIÊN
              </h3>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Thứ hạng tự động tính theo XP tích lũy, chuỗi ngày học và điểm số tương tác thực tế của học sinh
            </p>
          </div>

          {/* Action buttons & Grade filter tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto justify-between lg:justify-end">
            
            {/* Admin Buttons for amazingtranslation88@gmail.com */}
            {canManageLeaderboard && (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleRefreshLeaderboard}
                  disabled={isUpdatingLeaderboard}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white font-black text-xs shadow-md hover:brightness-105 active:scale-95 transition"
                  title="Cập nhật bảng vàng theo thời điểm thực tế từ cơ sở dữ liệu"
                >
                  <RotateCcw className={`w-3.5 h-3.5 ${isUpdatingLeaderboard ? 'animate-spin' : ''}`} />
                  <span>{isUpdatingLeaderboard ? 'Đang cập nhật...' : 'Cập nhật bảng vàng thực tế'}</span>
                </button>

                <button
                  onClick={() => setAwardModalOpen(true)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-black text-xs shadow-md active:scale-95 transition"
                  title="Cộng điểm thưởng hoặc thêm học sinh vào bảng vàng"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Thưởng XP học sinh</span>
                </button>
              </div>
            )}

            {/* Grade filter tabs */}
            <div className="flex items-center gap-1 bg-gray-100 dark:bg-slate-700 p-1 rounded-xl text-xs font-bold">
              <button
                onClick={() => setStudentGradeFilter('all')}
                className={`px-3 py-1.5 rounded-lg transition ${studentGradeFilter === 'all' ? 'bg-white dark:bg-slate-600 text-emerald-600 dark:text-emerald-300 shadow-xs' : 'text-gray-600 dark:text-gray-300'}`}
              >
                Tất cả
              </button>
              <button
                onClick={() => setStudentGradeFilter('primary')}
                className={`px-3 py-1.5 rounded-lg transition ${studentGradeFilter === 'primary' ? 'bg-white dark:bg-slate-600 text-emerald-600 dark:text-emerald-300 shadow-xs' : 'text-gray-600 dark:text-gray-300'}`}
              >
                Tiểu học
              </button>
              <button
                onClick={() => setStudentGradeFilter('grade6')}
                className={`px-3 py-1.5 rounded-lg transition ${studentGradeFilter === 'grade6' ? 'bg-white dark:bg-slate-600 text-emerald-600 dark:text-emerald-300 shadow-xs' : 'text-gray-600 dark:text-gray-300'}`}
              >
                Lớp 6
              </button>
              <button
                onClick={() => setStudentGradeFilter('grade7')}
                className={`px-3 py-1.5 rounded-lg transition ${studentGradeFilter === 'grade7' ? 'bg-white dark:bg-slate-600 text-emerald-600 dark:text-emerald-300 shadow-xs' : 'text-gray-600 dark:text-gray-300'}`}
              >
                Lớp 7
              </button>
              <button
                onClick={() => setStudentGradeFilter('grade8')}
                className={`px-3 py-1.5 rounded-lg transition ${studentGradeFilter === 'grade8' ? 'bg-white dark:bg-slate-600 text-emerald-600 dark:text-emerald-300 shadow-xs' : 'text-gray-600 dark:text-gray-300'}`}
              >
                Lớp 8
              </button>
              <button
                onClick={() => setStudentGradeFilter('grade9')}
                className={`px-3 py-1.5 rounded-lg transition ${studentGradeFilter === 'grade9' ? 'bg-white dark:bg-slate-600 text-emerald-600 dark:text-emerald-300 shadow-xs' : 'text-gray-600 dark:text-gray-300'}`}
              >
                Lớp 9
              </button>
            </div>
          </div>
        </div>

        {/* Update feedback banner */}
        {updateMessage && (
          <div className="mb-4 p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-200 text-xs font-bold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{updateMessage}</span>
          </div>
        )}

        {/* Scrollable Leaderboard Table */}
        <div className="overflow-x-auto rounded-2xl border border-gray-100 dark:border-slate-700 max-h-[460px] overflow-y-auto">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-200 text-xs font-black uppercase z-10">
              <tr>
                <th className="p-3 text-center w-14">Hạng</th>
                <th className="p-3">Học sinh</th>
                <th className="p-3">Lớp &amp; Trường</th>
                <th className="p-3 text-center">Chuỗi ngày</th>
                <th className="p-3 text-center">Level</th>
                <th className="p-3 text-right">Tổng XP Thực Tế</th>
                <th className="p-3">Danh hiệu</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-700 text-xs sm:text-sm font-semibold">
              {filteredStudents.map((st) => (
                <tr
                  key={st.rank}
                  className={`hover:bg-emerald-50/50 dark:hover:bg-slate-700/50 transition ${
                    st.rank === 1
                      ? 'bg-amber-50/60 dark:bg-amber-950/20 font-bold'
                      : st.rank === 2
                      ? 'bg-slate-50/80 dark:bg-slate-700/20'
                      : st.rank === 3
                      ? 'bg-orange-50/40 dark:bg-orange-950/20'
                      : ''
                  }`}
                >
                  <td className="p-3 text-center">
                    <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full font-black text-xs ${
                      st.rank === 1
                        ? 'bg-amber-500 text-white'
                        : st.rank === 2
                        ? 'bg-slate-400 text-white'
                        : st.rank === 3
                        ? 'bg-orange-400 text-white'
                        : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {st.rank}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{st.avatar}</span>
                      <span className="font-black text-gray-900 dark:text-gray-100">{st.name}</span>
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="font-bold text-gray-700 dark:text-gray-300">{st.className}</div>
                    <div className="text-[11px] text-gray-500 dark:text-gray-400 line-clamp-1">{st.school}</div>
                  </td>
                  <td className="p-3 text-center font-bold text-orange-600 dark:text-orange-400">
                    🔥 {st.streak} ngày
                  </td>
                  <td className="p-3 text-center font-bold text-emerald-600 dark:text-emerald-400">
                    Lv.{st.level}
                  </td>
                  <td className="p-3 text-right font-black text-amber-600 dark:text-amber-400">
                    {st.xp.toLocaleString()} XP
                  </td>
                  <td className="p-3">
                    <span className="text-[11px] font-black px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                      {st.badge}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Admin Award / Update Student XP Modal (Only for amazingtranslation88@gmail.com) */}
      {awardModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-100 dark:border-slate-700">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-slate-700 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">⭐</span>
                <h3 className="text-base font-black text-gray-900 dark:text-gray-100">
                  THƯỞNG XP &amp; CẬP NHẬT HỌC SINH BẢNG VÀNG
                </h3>
              </div>
              <button
                onClick={() => setAwardModalOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 dark:bg-slate-700 flex items-center justify-center text-gray-500 hover:bg-gray-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAwardSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-black uppercase text-gray-700 dark:text-gray-300 mb-1">
                  Tên học sinh <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="VD: Nguyễn Minh Anh, Trần Gia Bảo..."
                  value={awardStudentName}
                  onChange={(e) => setAwardStudentName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-xs sm:text-sm font-semibold text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-gray-700 dark:text-gray-300 mb-1">
                  Số điểm XP cộng thêm
                </label>
                <input
                  type="number"
                  min="10"
                  max="5000"
                  value={awardXpAmount}
                  onChange={(e) => setAwardXpAmount(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-xs sm:text-sm font-semibold text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-gray-700 dark:text-gray-300 mb-1">
                  Danh hiệu trao tặng
                </label>
                <select
                  value={awardBadge}
                  onChange={(e) => setAwardBadge(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-xs sm:text-sm font-semibold text-gray-900 dark:text-gray-100"
                >
                  <option value="⭐ Quán Quân Bảng Vàng">⭐ Quán Quân Bảng Vàng</option>
                  <option value="🌟 Ngôi Sao Chăm Học">🌟 Ngôi Sao Chăm Học</option>
                  <option value="⚡ Thần Tốc Độ Hán Tự">⚡ Thần Tốc Độ Hán Tự</option>
                  <option value="🔥 Chăm Học 30 Ngày">🔥 Chăm Học 30 Ngày</option>
                  <option value="💎 Siêu Trí Tuệ YCT">💎 Siêu Trí Tuệ YCT</option>
                </select>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setAwardModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-200 font-bold text-xs"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-md transition"
                >
                  Cập nhật ngay vào bảng vàng
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
