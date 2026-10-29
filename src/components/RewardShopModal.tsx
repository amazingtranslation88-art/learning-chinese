import React, { useState, useEffect } from 'react';
import {
  Gamepad2,
  Gift,
  X,
  Sparkles,
  CheckCircle2,
  Plus,
  Play,
  RotateCcw,
  Volume2,
  ExternalLink,
  Trash2,
  Trophy,
  Flame,
  Award,
  ChevronRight,
  Send,
  HelpCircle
} from 'lucide-react';
import { UserProfile, RewardGameItem, ExerciseQuestion } from '../types';
import {
  saveStoredUser,
  getStoredRewardGames,
  saveStoredRewardGames,
  addRewardGame,
  deleteRewardGame,
  incrementRewardGamePlays,
  ADMIN_EMAIL
} from '../utils/storage';
import { sound, speakChinese, speakVietnamese, speakSmart } from '../utils/soundEffects';
import confetti from 'canvas-confetti';

interface RewardShopModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onUserUpdate: (u: UserProfile) => void;
}

const REWARD_STORE_ITEMS = [
  { id: 'av-panda-king', name: 'Mascot Vua Panda 3D', cost: 20, type: 'avatar', value: '👑', desc: 'Avatar vương miện hoàng gia dành cho học sinh xuất sắc' },
  { id: 'av-dragon', name: 'Linh Vật Rồng Vàng May Mắn', cost: 35, type: 'avatar', value: '🐉', desc: 'Linh vật truyền thống dũng mãnh, biểu tượng may mắn & kiên trì' },
  { id: 'av-unicorn', name: 'Kỳ Lân Tri Thức 3D', cost: 30, type: 'avatar', value: '🦄', desc: 'Linh thú thần thoại thông thái đồng hành cùng bé trên con đường học tập' },
  { id: 'av-rocket', name: 'Phi Thuyền Hán Tự', cost: 25, type: 'avatar', value: '🚀', desc: 'Avatar phi thuyền siêu tốc chinh phục đỉnh cao HSK' },
  { id: 'badge-master', name: 'Huy hiệu Trạng Nguyên Hán Tự', cost: 15, type: 'badge', value: '🏆 Trạng Nguyên Hán Tự', desc: 'Huy hiệu cao quý vinh danh trên bảng vàng hệ thống' },
  { id: 'badge-speed', name: 'Huy hiệu Thần Tốc Độ', cost: 15, type: 'badge', value: '⚡ Chiến Thần Tốc Độ', desc: 'Thưởng cho học sinh phản xạ từ vựng chớp nhoáng' },
  { id: 'badge-yct-champion', name: 'Huy hiệu Quán Quân YCT', cost: 20, type: 'badge', value: '🌟 Quán Quân YCT Quốc Tế', desc: 'Chứng nhận năng lực hoàn thành xuất sắc các thử thách YCT' },
  { id: 'badge-hsk-master', name: 'Huy hiệu Bách Phát HSK 3.0', cost: 25, type: 'badge', value: '🎯 Bách Phát Bách Trúng HSK 3.0', desc: 'Danh hiệu chinh phục hệ thống từ vựng HSK phiên bản mới nhất' },
];

export const RewardShopModal: React.FC<RewardShopModalProps> = ({
  isOpen,
  onClose,
  user,
  onUserUpdate,
}) => {
  const [activeTab, setActiveTab] = useState<'games' | 'redeem'>('games');
  const [selectedGradeFilter, setSelectedGradeFilter] = useState<string>('all');
  const [games, setGames] = useState<RewardGameItem[]>([]);
  
  // Game playing state
  const [playingGame, setPlayingGame] = useState<RewardGameItem | null>(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);
  const [hasClaimedReward, setHasClaimedReward] = useState(false);

  // Teacher Upload Game Modal State
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newGrade, setNewGrade] = useState('Tiểu học');
  const [newCategory, setNewCategory] = useState<RewardGameItem['category']>('quiz');
  const [newGems, setNewGems] = useState(20);
  const [newXp, setNewXp] = useState(50);
  const [newCoverEmoji, setNewCoverEmoji] = useState('🎮');
  const [newDescription, setNewDescription] = useState('');
  const [newExternalUrl, setNewExternalUrl] = useState('');
  // Quick custom question builder
  const [customQuestions, setCustomQuestions] = useState<ExerciseQuestion[]>([
    {
      id: 'cq-1',
      type: 'quiz',
      question: 'Từ nào có nghĩa là "Xin chào"?',
      hanzi: '你好',
      pinyin: 'Nǐ hǎo',
      options: ['你好 (Nǐ hǎo)', '再见 (Zàijiàn)', '谢谢 (Xièxie)', '对不起 (Duìbuqǐ)'],
      answer: '你好 (Nǐ hǎo)',
      explanation: '你好 là câu chào hỏi cơ bản nhất trong tiếng Trung.'
    }
  ]);

  // Load games from storage
  useEffect(() => {
    if (isOpen) {
      setGames(getStoredRewardGames());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const isTeacherOrAdmin =
    user.role === 'teacher' ||
    user.role === 'admin' ||
    (user.email && user.email.toLowerCase() === ADMIN_EMAIL.toLowerCase()) ||
    user.phone === '0976817231';

  // Buy Shop Item
  const handleBuy = (item: typeof REWARD_STORE_ITEMS[0]) => {
    if (user.gems < item.cost) {
      sound.playWrong();
      alert('Bé chưa đủ Kim Cương! Hãy vào tab "Chơi Game Nhận Thưởng" để tích lũy thêm Kim Cương nha!');
      return;
    }

    // Check if already owned
    if (item.type === 'badge' && user.badges.includes(item.value)) {
      alert('Bé đã sở hữu huy hiệu này rồi!');
      return;
    }

    sound.playVictory();
    confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });

    const updatedUser: UserProfile = {
      ...user,
      gems: user.gems - item.cost,
      avatar: item.type === 'avatar' ? item.value : user.avatar,
      badges: item.type === 'badge' ? [...user.badges, item.value] : user.badges,
    };

    saveStoredUser(updatedUser);
    onUserUpdate(updatedUser);
  };

  // Start Playing Game
  const handleStartGame = (game: RewardGameItem) => {
    sound.playClick();
    incrementRewardGamePlays(game.id);
    setPlayingGame(game);
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setGameFinished(false);
    setHasClaimedReward(false);
  };

  // Answer a Question
  const handleAnswerOption = (option: string) => {
    if (isAnswered || !playingGame || !playingGame.questions) return;
    const currentQ = playingGame.questions[currentQuestionIdx];
    setSelectedOption(option);
    setIsAnswered(true);

    const isCorrect = option === currentQ.answer;
    if (isCorrect) {
      sound.playCorrect();
      setScore((prev) => prev + 1);
    } else {
      sound.playWrong();
    }
  };

  // Next Question or Finish
  const handleNextQuestion = () => {
    if (!playingGame || !playingGame.questions) return;
    sound.playClick();
    if (currentQuestionIdx + 1 < playingGame.questions.length) {
      setCurrentQuestionIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      // Finished
      setGameFinished(true);
      sound.playVictory();
      confetti({ particleCount: 70, spread: 70, origin: { y: 0.55 } });
    }
  };

  // Claim Game Rewards
  const handleClaimReward = () => {
    if (!playingGame || hasClaimedReward) return;
    sound.playVictory();
    confetti({ particleCount: 80, spread: 80, origin: { y: 0.5 } });

    const earnedGems = playingGame.rewardGems;
    const earnedXp = playingGame.rewardXp;

    const newXp = user.xp + earnedXp;
    const newLevel = Math.floor(newXp / 300) + 1;
    const newGems = user.gems + earnedGems;

    const updatedUser: UserProfile = {
      ...user,
      gems: newGems,
      xp: newXp,
      level: newLevel,
    };

    saveStoredUser(updatedUser);
    onUserUpdate(updatedUser);
    setHasClaimedReward(true);
  };

  // Handle Teacher Upload Game
  const handleCreateGame = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      alert('Vui lòng nhập tên trò chơi!');
      return;
    }

    sound.playVictory();
    confetti({ particleCount: 60, spread: 60, origin: { y: 0.5 } });

    const created = addRewardGame({
      title: newTitle.trim(),
      grade: newGrade,
      category: newCategory,
      rewardGems: Number(newGems) || 15,
      rewardXp: Number(newXp) || 40,
      coverEmoji: newCoverEmoji || '🎮',
      authorName: user.name || 'Cô giáo Bùi Ngọc Liên',
      authorEmail: user.email || ADMIN_EMAIL,
      description: newDescription.trim() || 'Trò chơi học tập tương tác giúp ghi nhớ từ vựng và ngữ pháp tiếng Trung nhanh chóng.',
      externalUrl: newExternalUrl.trim() || undefined,
      questions: customQuestions,
    });

    setGames(getStoredRewardGames());
    setIsUploadModalOpen(false);
    // Reset form
    setNewTitle('');
    setNewDescription('');
    setNewExternalUrl('');
    alert(`Đã tải lên thành công trò chơi "${created.title}" vào Kho Game Đổi Thưởng!`);
  };

  // Handle Delete Game (for teacher)
  const handleDeleteGame = (id: string, title: string) => {
    if (confirm(`Cô Liên có chắc chắn muốn xóa trò chơi "${title}" không?`)) {
      sound.playClick();
      deleteRewardGame(id);
      setGames(getStoredRewardGames());
    }
  };

  // Filtered games
  const filteredGames = games.filter((g) => {
    if (selectedGradeFilter === 'all') return true;
    if (selectedGradeFilter === 'primary') return g.grade === 'Tiểu học';
    if (selectedGradeFilter === 'secondary') return g.grade.includes('Lớp 6') || g.grade.includes('Lớp 8');
    if (selectedGradeFilter === 'yct') return g.grade.includes('YCT');
    if (selectedGradeFilter === 'hsk') return g.grade.includes('HSK');
    if (selectedGradeFilter === 'wordwall') return g.category === 'external_wordwall';
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-gray-100 dark:border-slate-700 overflow-hidden">
        
        {/* Top Header */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white shrink-0">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-2xl shadow-inner border border-white/30">
                🎮
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg sm:text-xl font-black tracking-tight">
                    GAME HỌC TẬP ĐỔI THƯỞNG
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-amber-400 text-amber-950 text-[10px] font-black uppercase tracking-wider">
                    Cô Liên
                  </span>
                </div>
                <p className="text-xs text-emerald-100 mt-0.5">
                  Chơi game ôn luyện Hán Tự & Pinyin • Nhận Kim Cương 💎 đổi quà tặng độc quyền
                </p>
              </div>
            </div>

            {/* Gems balance & Close */}
            <div className="flex items-center gap-3">
              <div className="bg-black/25 backdrop-blur-md px-3.5 py-1.5 rounded-2xl border border-white/20 flex items-center gap-2">
                <span className="text-base">💎</span>
                <div className="text-left">
                  <div className="text-[10px] text-emerald-200 font-bold uppercase leading-tight">Kim Cương</div>
                  <div className="text-sm font-black text-amber-300 leading-tight">{user.gems} 💎</div>
                </div>
              </div>

              <button
                onClick={() => { sound.playClick(); onClose(); }}
                className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 active:scale-95 transition flex items-center justify-center text-white"
                title="Đóng"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Navigation Tabs & Teacher Upload Button */}
          <div className="flex flex-wrap items-center justify-between gap-2 mt-4 pt-3 border-t border-white/15">
            <div className="flex items-center gap-2">
              <button
                onClick={() => { sound.playClick(); setActiveTab('games'); }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-extrabold text-xs sm:text-sm transition ${
                  activeTab === 'games'
                    ? 'bg-white text-emerald-800 shadow-md scale-102'
                    : 'bg-white/15 text-white hover:bg-white/25'
                }`}
              >
                <Gamepad2 className="w-4 h-4 text-emerald-600" />
                <span>Kho Game Đổi Thưởng ({games.length})</span>
              </button>

              <button
                onClick={() => { sound.playClick(); setActiveTab('redeem'); }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-extrabold text-xs sm:text-sm transition ${
                  activeTab === 'redeem'
                    ? 'bg-white text-emerald-800 shadow-md scale-102'
                    : 'bg-white/15 text-white hover:bg-white/25'
                }`}
              >
                <Gift className="w-4 h-4 text-pink-500" />
                <span>Đổi Quà Tích Lũy 🎁</span>
              </button>
            </div>

            {/* Teacher Upload Button */}
            <button
              onClick={() => {
                sound.playClick();
                if (isTeacherOrAdmin) {
                  setIsUploadModalOpen(true);
                } else {
                  alert(
                    '✨ Tính năng tải trò chơi dành cho Cô giáo Bùi Ngọc Liên hoặc Giáo viên. Em hãy đăng nhập bằng tài khoản Giáo viên để tải trò chơi mới nhé!'
                  );
                }
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-orange-400 text-amber-950 font-black text-xs hover:brightness-105 active:scale-95 transition shadow-sm"
              title="Cô Liên tải game học tập mới lên hệ thống"
            >
              <Plus className="w-4 h-4" />
              <span>+ Cô Liên Tải Trò Chơi Mới</span>
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50/70 dark:bg-slate-900/60">
          
          {/* TAB 1: KHO GAME ĐỔI THƯỞNG */}
          {activeTab === 'games' && (
            <div className="space-y-4">
              {/* Category Filter Pills */}
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pb-2">
                {[
                  { id: 'all', label: 'Tất cả trò chơi' },
                  { id: 'primary', label: 'Tiểu học' },
                  { id: 'secondary', label: 'Lớp 6 – 9' },
                  { id: 'yct', label: 'Chuẩn YCT (1 – 6)' },
                  { id: 'hsk', label: 'Chuẩn HSK (1 – 3) 3.0' },
                  { id: 'wordwall', label: 'Game Wordwall / Quizlet' },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => { sound.playClick(); setSelectedGradeFilter(f.id); }}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition ${
                      selectedGradeFilter === f.id
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-slate-700 hover:border-emerald-400'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              {/* Games Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
                {filteredGames.map((game) => (
                  <div
                    key={game.id}
                    className="group bg-white dark:bg-slate-800 p-4 rounded-2xl border border-gray-200/80 dark:border-slate-700 hover:border-emerald-400 dark:hover:border-emerald-500 hover:shadow-lg transition flex flex-col justify-between relative overflow-hidden"
                  >
                    {/* Top row */}
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-100 to-teal-50 dark:from-emerald-950 dark:to-teal-900 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-2xl shadow-xs group-hover:scale-110 transition shrink-0">
                            {game.coverEmoji}
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] font-extrabold uppercase">
                                {game.grade}
                              </span>
                              {game.category === 'external_wordwall' && (
                                <span className="px-2 py-0.5 rounded-md bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 text-[10px] font-extrabold">
                                  Wordwall / Web
                                </span>
                              )}
                            </div>
                            <h4 className="text-sm font-black text-gray-900 dark:text-white mt-0.5 leading-snug line-clamp-1">
                              {game.title}
                            </h4>
                          </div>
                        </div>

                        {/* Delete for teacher */}
                        {isTeacherOrAdmin && (
                          <button
                            onClick={() => handleDeleteGame(game.id, game.title)}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition"
                            title="Xóa trò chơi"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2 mb-3">
                        {game.description}
                      </p>
                    </div>

                    {/* Bottom row: rewards & Play button */}
                    <div className="pt-2.5 border-t border-gray-100 dark:border-slate-700/80 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 font-black text-xs">
                          <span>💎</span>
                          <span>+{game.rewardGems} Kim Cương</span>
                        </div>
                        <div className="text-[11px] text-gray-500 dark:text-gray-400 font-bold hidden sm:block">
                          +{game.rewardXp} XP
                        </div>
                      </div>

                      <button
                        onClick={() => handleStartGame(game)}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs shadow-md shadow-emerald-600/20 active:scale-95 transition flex items-center gap-1.5 shrink-0"
                      >
                        <Play className="w-3.5 h-3.5 fill-white" />
                        <span>Chơi Ngay</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {filteredGames.length === 0 && (
                <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-3xl border border-dashed border-gray-300 dark:border-slate-700 p-6">
                  <Gamepad2 className="w-12 h-12 text-gray-400 mx-auto mb-2 opacity-50" />
                  <p className="text-sm font-bold text-gray-600 dark:text-gray-300">
                    Chưa có trò chơi nào trong phân mục này.
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Cô giáo Liên có thể bấm nút "+ Cô Liên Tải Trò Chơi Mới" để tạo ngay!
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: ĐỔI QUÀ TÍCH LŨY */}
          {activeTab === 'redeem' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-rose-500/10 border border-amber-300/50 dark:border-amber-700/50 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">🎁</span>
                  <div>
                    <h4 className="text-sm font-black text-gray-900 dark:text-gray-100">
                      Cửa Hàng Quà Tặng & Danh Hiệu Danh Dự
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Dùng số Kim Cương 💎 kiếm được từ các Game học tập để đổi Avatar 3D và Huy hiệu cao quý!
                    </p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-xs text-gray-500">Số dư bé có:</div>
                  <div className="text-base font-black text-emerald-600 dark:text-emerald-400">
                    {user.gems} 💎 Kim Cương
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {REWARD_STORE_ITEMS.map((item) => {
                  const isOwned = item.type === 'badge' ? user.badges.includes(item.value) : user.avatar === item.value;
                  return (
                    <div
                      key={item.id}
                      className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 flex items-center justify-between gap-3 hover:shadow-md transition"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-100 to-orange-50 dark:from-amber-950 dark:to-orange-900 flex items-center justify-center text-2xl shadow-inner shrink-0">
                          {item.value.includes(' ') ? '🏅' : item.value}
                        </div>
                        <div>
                          <h4 className="text-sm font-black text-gray-900 dark:text-gray-100">
                            {item.name}
                          </h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                            {item.desc}
                          </p>
                          <div className="text-xs font-black text-amber-600 dark:text-amber-400 mt-0.5">
                            Giá: {item.cost} 💎 Kim Cương
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => handleBuy(item)}
                        disabled={isOwned}
                        className={`px-3.5 py-2 rounded-xl font-black text-xs shrink-0 transition ${
                          isOwned
                            ? 'bg-gray-100 dark:bg-slate-700 text-gray-400 cursor-not-allowed'
                            : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md active:scale-95'
                        }`}
                      >
                        {isOwned ? 'Đã Sở Hữu' : `Đổi (${item.cost} 💎)`}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>

      </div>

      {/* MODAL CHƠI GAME TƯƠNG TÁC (GAME ARENA) */}
      {playingGame && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md animate-in zoom-in-95 duration-200">
          <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-emerald-500/40 overflow-hidden">
            
            {/* Arena Header */}
            <div className="p-4 bg-gradient-to-r from-emerald-600 to-teal-700 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{playingGame.coverEmoji}</span>
                <div>
                  <h4 className="text-base font-black leading-tight">{playingGame.title}</h4>
                  <div className="flex items-center gap-2 text-xs text-emerald-100 mt-0.5">
                    <span>Phần thưởng: +{playingGame.rewardGems} 💎</span>
                    <span>•</span>
                    <span>+{playingGame.rewardXp} XP</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => { sound.playClick(); setPlayingGame(null); }}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Arena Content */}
            <div className="p-5 sm:p-6 overflow-y-auto flex-1">
              
              {/* If it's an external Wordwall / Web game */}
              {playingGame.category === 'external_wordwall' && (
                <div className="space-y-4 text-center py-4">
                  <div className="w-20 h-20 mx-auto rounded-3xl bg-purple-100 dark:bg-purple-950 flex items-center justify-center text-4xl shadow-inner">
                    🌐
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-gray-900 dark:text-gray-100">
                      Trò Chơi Wordwall / Quizlet Trực Tuyến
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 max-w-md mx-auto mt-1">
                      {playingGame.description}
                    </p>
                  </div>

                  {playingGame.externalUrl && (
                    <div className="pt-2">
                      <a
                        href={playingGame.externalUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => sound.playClick()}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-black text-sm shadow-lg hover:scale-105 active:scale-95 transition"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Mở Trò Chơi Wordwall Trên Tab Mới</span>
                      </a>
                    </div>
                  )}

                  <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-left max-w-md mx-auto">
                    <p className="text-xs font-bold text-amber-900 dark:text-amber-300">
                      🎁 Sau khi bé hoàn thành các màn chơi trên Wordwall, bấm nút bên dưới để nhận ngay phần thưởng Kim Cương & XP nhé!
                    </p>
                  </div>

                  {!hasClaimedReward ? (
                    <button
                      onClick={handleClaimReward}
                      className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm shadow-md active:scale-95 transition"
                    >
                      Bé Đã Hoàn Thành & Nhận Thưởng ({playingGame.rewardGems} 💎)
                    </button>
                  ) : (
                    <div className="p-3 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 rounded-xl font-black text-sm">
                      🎉 Chúc mừng! Đã cộng +{playingGame.rewardGems} Kim Cương & +{playingGame.rewardXp} XP vào hồ sơ của bé!
                    </div>
                  )}
                </div>
              )}

              {/* If it's an interactive question-based game */}
              {playingGame.category !== 'external_wordwall' && playingGame.questions && playingGame.questions.length > 0 && !gameFinished && (
                <div className="space-y-4">
                  {/* Progress bar */}
                  <div className="flex items-center justify-between text-xs font-bold text-gray-500 mb-1">
                    <span>Câu {currentQuestionIdx + 1} / {playingGame.questions.length}</span>
                    <span className="text-emerald-600 dark:text-emerald-400">Đúng: {score} câu</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-slate-700 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-300"
                      style={{ width: `${((currentQuestionIdx + 1) / playingGame.questions.length) * 100}%` }}
                    />
                  </div>

                  {/* Question box */}
                  {/* Question Box - Question text only */}
                  {(() => {
                    const q = playingGame.questions[currentQuestionIdx];
                    return (
                      <div className="p-4 sm:p-5 rounded-2xl bg-gray-50 dark:bg-slate-700/50 border border-gray-200 dark:border-slate-600 text-left">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-extrabold text-[11px] uppercase">
                            Câu {currentQuestionIdx + 1} / {playingGame.questions.length}
                          </span>
                        </div>
                        <h3 className="text-base sm:text-lg font-black text-gray-900 dark:text-gray-100 leading-snug">
                          {q.question}
                        </h3>
                      </div>
                    );
                  })()}

                  {/* Options - With pronunciation audio for each answer option */}
                  {(() => {
                    const q = playingGame.questions[currentQuestionIdx];
                    return (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {q.options?.map((opt, idx) => {
                          const isSelected = selectedOption === opt;
                          const isCorrect = opt === q.answer;
                          
                          let btnStyle = 'bg-white dark:bg-slate-700 border-gray-200 dark:border-slate-600 text-gray-800 dark:text-gray-200 hover:border-emerald-500 hover:bg-emerald-50/50';
                          if (isAnswered) {
                            if (isCorrect) {
                              btnStyle = 'bg-emerald-500 text-white border-emerald-600 font-black shadow-md';
                            } else if (isSelected && !isCorrect) {
                              btnStyle = 'bg-rose-500 text-white border-rose-600 font-bold line-through';
                            } else {
                              btnStyle = 'opacity-50 border-gray-200 dark:border-slate-700';
                            }
                          }

                          return (
                            <button
                              key={idx}
                              onClick={() => handleAnswerOption(opt)}
                              disabled={isAnswered}
                              className={`p-3 sm:p-3.5 rounded-2xl border text-sm font-bold transition text-left flex items-center justify-between gap-2 ${btnStyle}`}
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                <span className="inline-block w-5 h-5 rounded-full bg-black/10 text-center leading-5 text-[11px] font-black shrink-0">
                                  {String.fromCharCode(65 + idx)}
                                </span>
                                <span className="truncate">{opt}</span>
                              </div>
                              <div className="flex items-center gap-1 shrink-0">
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    sound.playClick();
                                    speakSmart(opt);
                                  }}
                                  className="p-1 rounded-lg hover:bg-black/10 text-emerald-600 dark:text-emerald-300 hover:scale-110 transition"
                                  title="Nghe đọc đáp án này"
                                >
                                  <Volume2 className="w-3.5 h-3.5" />
                                </button>
                                {isAnswered && isCorrect && <CheckCircle2 className="w-4 h-4 text-white" />}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    );
                  })()}

                  {/* Explanation & Next - Detailed Answer & Pronunciation */}
                  {isAnswered && playingGame.questions && playingGame.questions[currentQuestionIdx] && (() => {
                    const currentQ = playingGame.questions[currentQuestionIdx];
                    return (
                      <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-2.5 animate-in fade-in duration-150">
                        {/* Correct answer row */}
                        <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-emerald-200/60 dark:border-emerald-800/60">
                          <div className="flex items-center gap-2 flex-wrap text-xs font-bold text-emerald-950 dark:text-emerald-100">
                            <span className="uppercase font-black text-emerald-700 dark:text-emerald-400">Đáp án đúng:</span>
                            <span className="font-extrabold">{currentQ.answer}</span>
                            {currentQ.hanzi && (
                              <span className="text-base font-serif font-black text-emerald-800 dark:text-emerald-200 ml-1">
                                ({currentQ.hanzi} {currentQ.pinyin && <span className="text-xs font-sans text-amber-600 dark:text-amber-400 font-bold">- {currentQ.pinyin}</span>})
                              </span>
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              sound.playClick();
                              speakSmart(currentQ.hanzi || String(currentQ.answer));
                            }}
                            className="px-2 py-0.5 rounded-lg bg-emerald-600 text-white font-bold text-[11px] flex items-center gap-1 shadow-2xs hover:scale-105 transition"
                            title="Nghe đọc đáp án đúng"
                          >
                            <Volume2 className="w-3 h-3" />
                            <span>Nghe đọc</span>
                          </button>
                        </div>

                        <div className="flex items-center justify-between gap-3">
                          <div className="text-xs text-emerald-900 dark:text-emerald-300 font-medium flex items-start gap-1.5 flex-1">
                            <span className="font-black shrink-0">💡 Giải thích:</span>
                            <span>{currentQ.explanation}</span>
                            <button
                              type="button"
                              onClick={() => speakVietnamese(currentQ.explanation || '')}
                              className="p-1 text-emerald-600 hover:bg-emerald-100 rounded-md shrink-0"
                              title="Nghe đọc giải thích"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <button
                            onClick={handleNextQuestion}
                            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-md shrink-0 active:scale-95 transition"
                          >
                            {currentQuestionIdx + 1 < (playingGame.questions?.length || 0) ? 'Câu Tiếp Theo ➔' : 'Xem Kết Quả 🏆'}
                          </button>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* Game Finished Screen */}
              {gameFinished && (
                <div className="text-center py-6 space-y-4">
                  <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-amber-400 to-orange-400 flex items-center justify-center text-4xl shadow-xl shadow-amber-400/30 animate-bounce">
                    🏆
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-gray-900 dark:text-gray-100">
                      XUẤT SẮC! BÉ ĐÃ HOÀN THÀNH MÀN CHƠI!
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Bé đã trả lời đúng {score} / {playingGame.questions?.length || 0} câu hỏi của trò chơi.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-sky-500/10 border border-emerald-300 dark:border-emerald-700 max-w-sm mx-auto flex items-center justify-around">
                    <div className="text-center">
                      <div className="text-2xl font-black text-amber-500">+{playingGame.rewardGems} 💎</div>
                      <div className="text-[11px] font-bold text-gray-600 dark:text-gray-400">Kim Cương Thưởng</div>
                    </div>
                    <div className="w-px h-8 bg-gray-300 dark:bg-slate-700" />
                    <div className="text-center">
                      <div className="text-2xl font-black text-emerald-600">+{playingGame.rewardXp} XP</div>
                      <div className="text-[11px] font-bold text-gray-600 dark:text-gray-400">Kinh Nghiệm</div>
                    </div>
                  </div>

                  {!hasClaimedReward ? (
                    <button
                      onClick={handleClaimReward}
                      className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-400 text-amber-950 font-black text-sm shadow-lg hover:scale-105 active:scale-95 transition"
                    >
                      🎁 Nhận Ngay {playingGame.rewardGems} Kim Cương & Lưu Điểm
                    </button>
                  ) : (
                    <div className="space-y-3">
                      <div className="p-3 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 rounded-2xl font-bold text-xs max-w-sm mx-auto">
                        ✅ Kim Cương đã được cộng vào tài khoản của bé!
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => {
                            setPlayingGame(null);
                            setActiveTab('redeem');
                          }}
                          className="px-4 py-2.5 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-black text-xs shadow-md"
                        >
                          Đến Shop Đổi Quà Ngay 🎁
                        </button>
                        <button
                          onClick={() => setPlayingGame(null)}
                          className="px-4 py-2.5 rounded-xl bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-200 font-bold text-xs"
                        >
                          Chọn Game Khác 🎮
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* MODAL CÔ GIÁO LIÊN TẢI GAME LÊN */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-70 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-amber-400/50 overflow-hidden">
            
            {/* Modal Header */}
            <div className="p-4 bg-gradient-to-r from-amber-500 via-orange-500 to-emerald-600 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">👩‍🏫</span>
                <div>
                  <h4 className="text-base font-black">CÔ LIÊN TẢI TRÒ CHƠI MỚI LÊN</h4>
                  <p className="text-[11px] text-amber-100">
                    Thêm game tương tác vào kho học tập để học sinh rinh quà
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleCreateGame} className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1">
              <div>
                <label className="block text-xs font-black text-gray-700 dark:text-gray-200 mb-1">
                  Tên trò chơi học tập *
                </label>
                <input
                  type="text"
                  required
                  placeholder="VD: Bắn Bong Bóng Từ Vựng HSK 1 - 3.0"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-black text-gray-700 dark:text-gray-200 mb-1">
                    Cấp lớp áp dụng
                  </label>
                  <select
                    value={newGrade}
                    onChange={(e) => setNewGrade(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-xs font-semibold"
                  >
                    <option value="Tiểu học">Tiểu học (Lớp 1 - 5)</option>
                    <option value="Lớp 6 - 9">Lớp 6 - 9 (THCS)</option>
                    <option value="Chuẩn YCT">Chuẩn YCT (1 – 6)</option>
                    <option value="Chuẩn HSK 3.0">Chuẩn HSK (1 – 3) 3.0</option>
                    <option value="Tất cả">Tất cả học sinh</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black text-gray-700 dark:text-gray-200 mb-1">
                    Dạng trò chơi
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as RewardGameItem['category'])}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-xs font-semibold"
                  >
                    <option value="quiz">Trắc nghiệm Hán Tự & Pinyin</option>
                    <option value="bubble_shoot">Bắn bóng từ vựng</option>
                    <option value="match">Nối từ & Ghép cặp</option>
                    <option value="wheel">Vòng quay may mắn</option>
                    <option value="memory">Lật thẻ trí nhớ</option>
                    <option value="external_wordwall">Link Wordwall / Quizlet / Web</option>
                  </select>
                </div>
              </div>

              {/* Rewards */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-black text-gray-700 dark:text-gray-200 mb-1">
                    Thưởng Kim Cương 💎
                  </label>
                  <input
                    type="number"
                    min="5"
                    max="100"
                    value={newGems}
                    onChange={(e) => setNewGems(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-gray-700 dark:text-gray-200 mb-1">
                    Thưởng XP ⚡
                  </label>
                  <input
                    type="number"
                    min="10"
                    max="200"
                    value={newXp}
                    onChange={(e) => setNewXp(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-xs font-semibold"
                  />
                </div>
              </div>

              {/* Emoji selector */}
              <div>
                <label className="block text-xs font-black text-gray-700 dark:text-gray-200 mb-1">
                  Icon đại diện cho game
                </label>
                <div className="flex items-center gap-2">
                  {['🎮', '🎯', '🐼', '🎡', '🧩', '🌐', '🔔', '⚡', '🚀', '📚'].map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => setNewCoverEmoji(emoji)}
                      className={`w-9 h-9 rounded-xl text-lg flex items-center justify-center transition ${
                        newCoverEmoji === emoji
                          ? 'bg-amber-400 scale-110 shadow-sm'
                          : 'bg-gray-100 dark:bg-slate-700 hover:bg-gray-200'
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              {/* External link (Wordwall / Quizlet / Canva) */}
              <div>
                <label className="block text-xs font-black text-gray-700 dark:text-gray-200 mb-1">
                  Đường dẫn game trực tuyến (Wordwall, Quizlet, Educaplay - nếu có)
                </label>
                <input
                  type="url"
                  placeholder="https://wordwall.net/resource/... hoặc https://quizlet.com/..."
                  value={newExternalUrl}
                  onChange={(e) => setNewExternalUrl(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-black text-gray-700 dark:text-gray-200 mb-1">
                  Mô tả / Hướng dẫn học sinh
                </label>
                <textarea
                  rows={2}
                  placeholder="Hướng dẫn cách chơi và mục tiêu bài học..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-sm shadow-lg active:scale-98 transition flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Đăng Tải Trò Chơi Lên Hệ Thống Ngay</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
