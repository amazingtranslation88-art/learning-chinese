import React, { useState } from 'react';
import {
  Swords,
  Trophy,
  X,
  Clock,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Play,
  RotateCcw,
  Volume2,
  Award,
  Flame,
  Shield,
  Plus,
  BookOpen,
  Send,
  Trash2
} from 'lucide-react';
import { UserProfile, ExerciseQuestion } from '../types';
import { saveStoredUser, ADMIN_EMAIL } from '../utils/storage';
import { sound, speakChinese, speakVietnamese, speakSmart } from '../utils/soundEffects';
import confetti from 'canvas-confetti';

interface ChineseArenaModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onUserUpdate: (u: UserProfile) => void;
}

export interface ArenaCompetition {
  id: string;
  title: string;
  category: 'language' | 'culture' | 'history' | 'all';
  level: string; // e.g. "Tiểu học & THCS", "Mọi cấp độ", "Nâng cao"
  timePerQuestion: number; // in seconds, e.g. 20
  rewardGems: number;
  rewardXp: number;
  author: string;
  badge: string;
  coverEmoji: string;
  description: string;
  questions: ExerciseQuestion[];
}

export const INITIAL_ARENA_CONTESTS: ArenaCompetition[] = [
  {
    id: 'arena-lang-1',
    title: 'Đại Chiến Hán Tự & Thành Ngữ 4 Chữ (成语)',
    category: 'language',
    level: 'Mọi cấp độ',
    timePerQuestion: 20,
    rewardGems: 30,
    rewardXp: 80,
    author: 'Cô giáo Bùi Ngọc Liên',
    badge: 'Ngôn Ngữ Hán',
    coverEmoji: '📜',
    description: 'Thử thách độ am hiểu cấu trúc chữ Hán, bộ thủ và các thành ngữ kinh điển: 一石二鸟, 井底之蛙, 塞翁失马...',
    questions: [
      {
        id: 'al-1',
        type: 'quiz',
        question: 'Thành ngữ "井底之蛙" (Jǐngdǐzhīwā) có nghĩa là gì?',
        hanzi: '井底之蛙',
        pinyin: 'Jǐngdǐzhīwā',
        options: ['Ếch ngồi đáy giếng (tầm nhìn hạn hẹp)', 'Bắt cá hai tay', 'Cá chép vượt vũ môn', 'Chim sợ cành cong'],
        answer: 'Ếch ngồi đáy giếng (tầm nhìn hạn hẹp)',
        explanation: '井 (giếng), 底 (đáy), 蛙 (con ếch) - ám chỉ người hiểu biết nông cạn nhưng lại tự mãn.'
      },
      {
        id: 'al-2',
        type: 'quiz',
        question: 'Bộ thủ nào sau đây thường liên quan đến nước, sông ngòi?',
        hanzi: '氵 (三点水)',
        pinyin: 'sān diǎn shuǐ',
        options: ['Bộ Chấm Thủy (氵)', 'Bộ Hỏa (灬)', 'Bộ Mộc (木)', 'Bộ Thổ (土)'],
        answer: 'Bộ Chấm Thủy (氵)',
        explanation: 'Bộ Chấm Thủy (氵) biến thể của chữ Thủy (水), xuất hiện trong 河 (hà - sông), 海 (hải - biển), 江 (giang).'
      },
      {
        id: 'al-3',
        type: 'quiz',
        question: 'Thành ngữ "一举两得" (Yījǔliǎngdé) tương đương với câu tục ngữ Việt Nam nào?',
        hanzi: '一举两得',
        pinyin: 'Yījǔliǎngdé',
        options: ['Một công đôi việc / Nhất cử lưỡng tiện', 'Qua cầu rút ván', 'Trăm nghe không bằng một thấy', 'Uống nước nhớ nguồn'],
        answer: 'Một công đôi việc / Nhất cử lưỡng tiện',
        explanation: '一举 (một hành động), 两得 (được hai điều lợi) = Một mũi tên trúng hai đích.'
      },
      {
        id: 'al-4',
        type: 'quiz',
        question: 'Từ nào sau đây là lượng từ chuẩn để đếm "con ngựa" (马 - mǎ)?',
        hanzi: '一 ____ 马',
        pinyin: 'Yī ____ mǎ',
        options: ['匹 (pǐ)', '只 (zhī)', '头 (tóu)', '条 (tiáo)'],
        answer: '匹 (pǐ)',
        explanation: 'Trong tiếng Trung, lượng từ cho ngựa là 匹 (pǐ) -> 一匹马 (một con ngựa).'
      },
      {
        id: 'al-5',
        type: 'quiz',
        question: 'Câu chúc "Vạn sự như ý" trong tiếng Trung viết là:',
        hanzi: '万事如意',
        pinyin: 'Wànshì rúyì',
        options: ['万事如意 (Wànshì rúyì)', '身体健康 (Shēntǐ jiànkāng)', '新年快乐 (Xīnnián kuàilè)', '心想事成 (Xīnxiǎng shìchéng)'],
        answer: '万事如意 (Wànshì rúyì)',
        explanation: '万事 (vạn sự), 如意 (như ý nguyện).'
      }
    ]
  },
  {
    id: 'arena-culture-1',
    title: 'Hùng Biện Văn Hóa & Phong Tục Cổ Truyền Trung Hoa',
    category: 'culture',
    level: 'Văn hóa sâu sắc',
    timePerQuestion: 25,
    rewardGems: 35,
    rewardXp: 90,
    author: 'Cô giáo Bùi Ngọc Liên',
    badge: 'Văn Hóa Truyền Thống',
    coverEmoji: '🏮',
    description: 'Khám phá các phong tục lễ hội lớn: Tết Nguyên Đán, Tết Trung Thu, Bát đại ẩm thực, Trà đạo và Kinh kịch.',
    questions: [
      {
        id: 'ac-1',
        type: 'quiz',
        question: 'Vào dịp Tết Nguyên Đán (Chun Jie), người phương Bắc Trung Quốc có phong tục cùng nhau ăn món gì?',
        hanzi: '饺子 (Jiǎozi)',
        pinyin: 'Jiǎozi',
        options: ['Sủi cảo (饺子 - hình giống thỏi vàng)', 'Bánh trôi nước (汤圆)', 'Bánh nếp lá chuối', 'Bánh bao chiên'],
        answer: 'Sủi cảo (饺子 - hình giống thỏi vàng)',
        explanation: 'Sủi cảo (饺子) có hình dáng như nén bạc nén vàng (nguyên bảo), tượng trưng cho sự sung túc tài lộc.'
      },
      {
        id: 'ac-2',
        type: 'quiz',
        question: 'Trong nghệ thuật Kinh Kịch Bắc Kinh (京剧), mặt nạ vẽ màu ĐỎ biểu thị nhân vật nào?',
        hanzi: '红色脸谱',
        pinyin: 'Hóngsè liǎnpǔ',
        options: ['Trung nghĩa, quả cảm, chính trực (như Quan Công)', 'Gian xảo, xảo quyệt, phản trắc (như Tào Tháo)', 'Hung bạo, tàn nhẫn', 'Hài hước, hề kịch'],
        answer: 'Trung nghĩa, quả cảm, chính trực (như Quan Công)',
        explanation: 'Mặt nạ đỏ biểu trưng cho sự trung can nghĩa khí và lòng dũng cảm, điển hình là Quan Vũ.'
      },
      {
        id: 'ac-3',
        type: 'quiz',
        question: 'Ẩm thực Tứ Xuyên (川菜) nổi tiếng thế giới với đặc trưng hương vị nào?',
        hanzi: '麻辣 (Málà)',
        pinyin: 'Málà',
        options: ['Cay nồng và tê đầu lưỡi (ớt và hạt tiêu Tứ Xuyên)', 'Ngọt đậm đà và thanh đạm', 'Chua cay miền sông nước', 'Mặn và béo ngậy'],
        answer: 'Cay nồng và tê đầu lưỡi (ớt và hạt tiêu Tứ Xuyên)',
        explanation: 'Vị "Ma La" (麻辣 - Ma là tê, Lạt là cay) với hoa tiêu Tứ Xuyên tạo nên bản sắc độc nhất vô nhị.'
      },
      {
        id: 'ac-4',
        type: 'quiz',
        question: 'Tết Đoan Ngọ (端午节 - mùng 5 tháng 5 âm lịch) gắn liền với phong tục đua thuyền rồng và tưởng nhớ nhân vật nào?',
        hanzi: '屈原 (Khuất Nguyên)',
        pinyin: 'Qū Yuán',
        options: ['Khuất Nguyên (屈原)', 'Khổng Tử (孔子)', 'Lý Bạch (李白)', 'Nhạc Phi (岳飞)'],
        answer: 'Khuất Nguyên (屈原)',
        explanation: 'Tết Đoan Ngọ ăn bánh ú bánh chưng lá dong (粽子) và đua thuyền rồng để tưởng niệm đại thi hào yêu nước Khuất Nguyên.'
      },
      {
        id: 'ac-5',
        type: 'quiz',
        question: 'Trong "Văn phòng tứ bảo" (四宝) của thư pháp Trung Hoa, 4 món gồm:',
        hanzi: '笔、墨、纸、砚',
        pinyin: 'Bǐ, mò, zhǐ, yàn',
        options: ['Bút lông, Mực tàu, Giấy xuyến chỉ, Nghiên mài mực', 'Bút sắt, Màu nước, Tranh thêu, Khung ảnh', 'Trà, Ấm, Chén, Bàn trà', 'Đàn, Kỳ, Thi, Họa'],
        answer: 'Bút lông, Mực tàu, Giấy xuyến chỉ, Nghiên mài mực',
        explanation: 'Văn phòng tứ bảo: Bút (笔), Mặc (墨), Chỉ (纸), Nghiên (砚).'
      }
    ]
  },
  {
    id: 'arena-hist-1',
    title: 'Đấu Trường Lịch Sử Nghìn Năm & Tứ Đại Danh Tác',
    category: 'history',
    level: 'Sử thi kinh điển',
    timePerQuestion: 25,
    rewardGems: 40,
    rewardXp: 100,
    author: 'Cô giáo Bùi Ngọc Liên',
    badge: 'Sử Thi & Văn Học',
    coverEmoji: '⚔️',
    description: 'Chinh phục các mốc son lịch sử: Tần Thủy Hoàng, Con đường tơ lụa và Tứ đại danh tác lừng lẫy năm châu.',
    questions: [
      {
        id: 'ah-1',
        type: 'quiz',
        question: 'Vị hoàng đế đầu tiên thống nhất Trung Hoa, lập ra chế độ phong kiến tập quyền là ai?',
        hanzi: '秦始皇 (Tần Thủy Hoàng)',
        pinyin: 'Qín Shǐhuáng',
        options: ['Tần Thủy Hoàng (Doanh Chính)', 'Hán Vũ Đế (Lưu Triệt)', 'Đường Thái Tông (Lý Thế Dân)', 'Khang Hy Đại Đế'],
        answer: 'Tần Thủy Hoàng (Doanh Chính)',
        explanation: 'Năm 221 TCN, Tần Thủy Hoàng thống nhất 6 nước, thống nhất văn tự, tiền tệ, đo lường và xây dựng Vạn Lý Trường Thành.'
      },
      {
        id: 'ah-2',
        type: 'quiz',
        question: 'Tác phẩm nào KHÔNG thuộc "Tứ Đại Danh Tác" của văn học cổ điển Trung Quốc?',
        hanzi: '四大名著',
        pinyin: 'Sì dà míngzhù',
        options: ['Liêu Trai Chí Dị (Bồ Tùng Linh)', 'Tây Du Ký (Ngô Thừa Ân)', 'Tam Quốc Diễn Nghĩa (La Quán Trung)', 'Hồng Lâu Mộng (Tào Tuyết Cần)'],
        answer: 'Liêu Trai Chí Dị (Bồ Tùng Linh)',
        explanation: 'Tứ đại danh tác gồm: Tây Du Ký, Tam Quốc Diễn Nghĩa, Thủy Hử và Hồng Lâu Mộng.'
      },
      {
        id: 'ah-3',
        type: 'quiz',
        question: 'Ai là người mở ra "Con đường tơ lụa" (丝绸之路) huyền thoại nối liền Á - Âu dưới thời nhà Hán?',
        hanzi: '张骞 (Trương Khiên)',
        pinyin: 'Zhāng Qiān',
        options: ['Trương Khiên (đi Tây Vực)', 'Trịnh Hòa (hạ Tây Dương)', 'Huyền Trang (đi Tây Thiên)', 'Tư Mã Thiên (viết Sử Ký)'],
        answer: 'Trương Khiên (đi Tây Vực)',
        explanation: 'Trương Khiên vâng lệnh Hán Vũ Đế đi sứ Tây Vực, mở ra tuyến thương mại và giao lưu văn hóa vĩ đại Con đường tơ lụa.'
      },
      {
        id: 'ah-4',
        type: 'quiz',
        question: 'Triều đại nào trong lịch sử Trung Hoa được coi là thời kỳ rực rỡ nhất của thơ ca với Lý Bạch và Đỗ Phủ?',
        hanzi: '唐朝 (Thời nhà Đường)',
        pinyin: 'Táng cháo',
        options: ['Nhà Đường (Đường thi)', 'Nhà Tống (Tống từ)', 'Nhà Nguyên (Nguyên khúc)', 'Nhà Minh (Tiểu thuyết)'],
        answer: 'Nhà Đường (Đường thi)',
        explanation: 'Thời nhà Đường là đỉnh cao chói lọi của thi ca phương Đông, sản sinh ra Thi tiên Lý Bạch, Thi thánh Đỗ Phủ.'
      },
      {
        id: 'ah-5',
        type: 'quiz',
        question: 'Trong "Tam Quốc Diễn Nghĩa", ba huynh đệ kết nghĩa tại đâu để thề cùng sống chết vì đại nghĩa?',
        hanzi: '桃园三结义',
        pinyin: 'Táo yuán sān jiéyì',
        options: ['Vườn Đào (Đào viên kết nghĩa)', 'Chùa Thiếu Lâm', 'Bến Xích Bích', 'Vạn Lý Trường Thành'],
        answer: 'Vườn Đào (Đào viên kết nghĩa)',
        explanation: 'Lưu Bị, Quan Vũ, Trương Phi "Đào viên tam kết nghĩa" (Kết nghĩa vườn đào) là biểu tượng bất hủ của lòng trung tín.'
      }
    ]
  }
];

export const ChineseArenaModal: React.FC<ChineseArenaModalProps> = ({
  isOpen,
  onClose,
  user,
  onUserUpdate,
}) => {
  const [contests, setContests] = useState<ArenaCompetition[]>(() => {
    try {
      const saved = localStorage.getItem('ms_lien_arena_contests');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_ARENA_CONTESTS;
  });

  const [activeCategory, setActiveCategory] = useState<'all' | 'language' | 'culture' | 'history'>('all');
  
  // In-arena gameplay state
  const [activeContest, setActiveContest] = useState<ArenaCompetition | null>(null);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(20);
  const [correctCount, setCorrectCount] = useState(0);
  const [isMatchOver, setIsMatchOver] = useState(false);
  const [hasClaimed, setHasClaimed] = useState(false);

  // Teacher Upload Contest State
  const [isTeacherUploadOpen, setIsTeacherUploadOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<'language' | 'culture' | 'history'>('language');
  const [newLevel, setNewLevel] = useState('Tiểu học & THCS');
  const [newRewardGems, setNewRewardGems] = useState(30);
  const [newRewardXp, setNewRewardXp] = useState(80);
  const [newEmoji, setNewEmoji] = useState('⚔️');
  const [newDesc, setNewDesc] = useState('');

  // Countdown timer for arena
  React.useEffect(() => {
    if (!activeContest || answered || isMatchOver) return;

    if (timerSeconds <= 0) {
      // Timeout
      setAnswered(true);
      sound.playWrong();
      return;
    }

    const timer = setTimeout(() => {
      setTimerSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [activeContest, timerSeconds, answered, isMatchOver]);

  if (!isOpen) return null;

  const isTeacherOrAdmin =
    user.role === 'teacher' ||
    user.role === 'admin' ||
    (user.email && user.email.toLowerCase() === ADMIN_EMAIL.toLowerCase()) ||
    user.phone === '0976817231';

  const handleStartContest = (contest: ArenaCompetition) => {
    sound.playClick();
    setActiveContest(contest);
    setCurrentQIndex(0);
    setSelectedOpt(null);
    setAnswered(false);
    setTimerSeconds(contest.timePerQuestion || 20);
    setCorrectCount(0);
    setIsMatchOver(false);
    setHasClaimed(false);
  };

  const handleAnswer = (option: string) => {
    if (answered || !activeContest) return;
    setSelectedOpt(option);
    setAnswered(true);

    const q = activeContest.questions[currentQIndex];
    const isCorrect = option === q.answer;

    if (isCorrect) {
      sound.playCorrect();
      setCorrectCount((prev) => prev + 1);
    } else {
      sound.playWrong();
    }
  };

  const handleNextQuestion = () => {
    if (!activeContest) return;
    sound.playClick();

    if (currentQIndex + 1 < activeContest.questions.length) {
      setCurrentQIndex((prev) => prev + 1);
      setSelectedOpt(null);
      setAnswered(false);
      setTimerSeconds(activeContest.timePerQuestion || 20);
    } else {
      // Match Over
      setIsMatchOver(true);
      sound.playVictory();
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.55 } });
    }
  };

  const handleClaimArenaRewards = () => {
    if (!activeContest || hasClaimed) return;
    sound.playVictory();
    confetti({ particleCount: 120, spread: 100, origin: { y: 0.5 } });

    // Medal calculation
    const totalQ = activeContest.questions.length;
    const ratio = correctCount / totalQ;
    let medalName = 'Huy chương Đồng 🥉 Đấu Sĩ Hán Ngữ';
    if (ratio === 1) medalName = 'Huy chương Vàng 🥇 Quán Quân Đấu Trường Hán Ngữ';
    else if (ratio >= 0.7) medalName = 'Huy chương Bạc 🥈 Á Quân Đấu Trường Hán Ngữ';

    const earnedGems = activeContest.rewardGems;
    const earnedXp = activeContest.rewardXp;

    const newGems = user.gems + earnedGems;
    const newXp = user.xp + earnedXp;
    const newLevel = Math.floor(newXp / 300) + 1;
    const newBadges = user.badges.includes(medalName) ? user.badges : [...user.badges, medalName];

    const updatedUser: UserProfile = {
      ...user,
      gems: newGems,
      xp: newXp,
      level: newLevel,
      badges: newBadges,
    };

    saveStoredUser(updatedUser);
    onUserUpdate(updatedUser);
    setHasClaimed(true);
  };

  const handleCreateArenaContest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      alert('Vui lòng nhập tên cuộc thi!');
      return;
    }

    sound.playVictory();
    confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });

    const newContest: ArenaCompetition = {
      id: `contest-${Date.now()}`,
      title: newTitle.trim(),
      category: newCategory,
      level: newLevel,
      timePerQuestion: 25,
      rewardGems: Number(newRewardGems) || 30,
      rewardXp: Number(newRewardXp) || 80,
      author: user.name || 'Cô giáo Bùi Ngọc Liên',
      badge: newCategory === 'language' ? 'Ngôn Ngữ Hán' : newCategory === 'culture' ? 'Văn Hóa Cổ Truyền' : 'Lịch Sử Nghìn Năm',
      coverEmoji: newEmoji,
      description: newDesc.trim() || 'Cuộc thi tranh tài đấu trường kiểm tra kiến thức ngôn ngữ, lịch sử và văn hóa Trung Hoa.',
      questions: [
        {
          id: 'q-custom-1',
          type: 'quiz',
          question: 'Chữ "Trung" trong "Trung Quốc" viết là:',
          hanzi: '中',
          pinyin: 'zhōng',
          options: ['中 (zhōng)', '国 (guó)', '文 (wén)', '人 (rén)'],
          answer: '中 (zhōng)',
          explanation: '中 là trung tâm, 中国 là Trung Quốc.'
        },
        {
          id: 'q-custom-2',
          type: 'quiz',
          question: 'Tết Trung Thu theo âm lịch rơi vào ngày nào?',
          hanzi: '中秋节',
          pinyin: 'Zhōngqiū jié',
          options: ['Rằm tháng 8 (15/8 âm lịch)', 'Mùng 1 tháng 1 âm lịch', 'Mùng 5 tháng 5 âm lịch', 'Rằm tháng Giêng (15/1)'],
          answer: 'Rằm tháng 8 (15/8 âm lịch)',
          explanation: 'Tết Trung Thu ngắm trăng rằm tháng 8 và ăn bánh trung thu.'
        }
      ]
    };

    const updated = [newContest, ...contests];
    setContests(updated);
    try {
      localStorage.setItem('ms_lien_arena_contests', JSON.stringify(updated));
    } catch {}

    setIsTeacherUploadOpen(false);
    setNewTitle('');
    setNewDesc('');
    alert(`Đã tải lên thành công cuộc thi "${newContest.title}" vào Đấu Trường Hán Ngữ!`);
  };

  const handleDeleteContest = (id: string, title: string) => {
    if (confirm(`Cô Liên có chắc muốn xóa cuộc thi "${title}" khỏi Đấu Trường không?`)) {
      sound.playClick();
      const updated = contests.filter((c) => c.id !== id);
      setContests(updated);
      try {
        localStorage.setItem('ms_lien_arena_contests', JSON.stringify(updated));
      } catch {}
    }
  };

  const filteredContests = contests.filter((c) => {
    if (activeCategory === 'all') return true;
    return c.category === activeCategory;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-amber-500/40 overflow-hidden">
        
        {/* Arena Top Header */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-red-700 via-rose-700 to-amber-700 text-white shrink-0 shadow-md">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-13 h-13 rounded-2xl bg-amber-400/20 backdrop-blur-sm border-2 border-amber-300 flex items-center justify-center text-3xl shadow-inner">
                ⚔️
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg sm:text-xl font-black tracking-tight text-amber-200 flex items-center gap-2">
                    <span>ĐẤU TRƯỜNG HÁN NGỮ</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-amber-400 text-amber-950 font-black">
                      TRANH CÚP
                    </span>
                  </h3>
                </div>
                <p className="text-xs text-rose-100 mt-0.5 font-medium">
                  Ngân hàng đề thi tranh tài: <strong>Ngôn ngữ Hán • Văn hóa Cổ truyền • Lịch sử Nghìn năm</strong>
                </p>
              </div>
            </div>

            {/* User Arena Stats & Close */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="bg-black/30 backdrop-blur-md px-3.5 py-1.5 rounded-2xl border border-amber-400/30 flex items-center gap-2">
                <span className="text-lg">🏆</span>
                <div className="text-left">
                  <div className="text-[10px] text-amber-200 font-bold uppercase leading-tight">Kim Cương Đấu Sĩ</div>
                  <div className="text-sm font-black text-amber-300 leading-tight">{user.gems} 💎</div>
                </div>
              </div>

              <button
                onClick={() => { sound.playClick(); onClose(); }}
                className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 active:scale-95 transition flex items-center justify-center text-white"
                title="Đóng Đấu Trường"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Category Tabs & Teacher Button */}
          <div className="flex flex-wrap items-center justify-between gap-2 mt-4 pt-3 border-t border-white/15">
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto">
              {[
                { id: 'all', label: 'Tất cả đấu trường' },
                { id: 'language', label: 'Ngôn Ngữ & Hán Tự (成语)' },
                { id: 'culture', label: 'Văn Hóa & Nghệ Thuật' },
                { id: 'history', label: 'Lịch Sử & Tứ Đại Danh Tác' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => { sound.playClick(); setActiveCategory(cat.id as any); }}
                  className={`px-3 py-1.5 rounded-xl font-extrabold text-xs transition whitespace-nowrap ${
                    activeCategory === cat.id
                      ? 'bg-amber-400 text-amber-950 shadow-md font-black scale-102'
                      : 'bg-white/15 text-white hover:bg-white/25'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Teacher Add Contest */}
            <button
              onClick={() => {
                sound.playClick();
                if (isTeacherOrAdmin) {
                  setIsTeacherUploadOpen(true);
                } else {
                  alert('✨ Tính năng bổ sung đề thi Đấu Trường dành riêng cho Cô giáo Bùi Ngọc Liên. Bạn hãy đăng nhập tài khoản Giáo viên để trải nghiệm nhé!');
                }
              }}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-400 text-amber-950 hover:bg-amber-300 font-black text-xs transition shadow-xs shrink-0"
              title="Cô Liên bổ sung đề thi Đấu Trường"
            >
              <Plus className="w-4 h-4" />
              <span>+ Cô Liên Thêm Đề Thi</span>
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50 dark:bg-slate-900/80">
          
          {/* Welcome Announcement Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-orange-500/10 border border-amber-300/60 dark:border-amber-700/60 flex items-center justify-between gap-4 mb-5">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🏛️</span>
              <div>
                <h4 className="text-sm font-black text-gray-900 dark:text-gray-100">
                  Chào mừng thí sinh <span className="text-red-600 dark:text-red-400 font-extrabold">{user.name}</span> bước vào Đấu Trường Hán Ngữ!
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-300 mt-0.5">
                  Mỗi cuộc thi gồm các câu hỏi bấm giờ tính điểm. Trả lời đúng 100% để rinh <strong>Huy chương Vàng 🥇</strong> và <strong>+30-40 💎 Kim Cương</strong>!
                </p>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300 font-black text-xs shrink-0">
              <Flame className="w-4 h-4 text-red-600 animate-bounce" />
              <span>{filteredContests.length} Đề thi sẵn sàng</span>
            </div>
          </div>

          {/* Contests Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredContests.map((contest) => (
              <div
                key={contest.id}
                className="group bg-white dark:bg-slate-800 p-4 sm:p-5 rounded-2xl border border-gray-200 dark:border-slate-700 hover:border-red-400 dark:hover:border-red-500 hover:shadow-xl transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2.5">
                    <div className="flex items-center gap-3">
                      <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-amber-100 via-rose-100 to-red-100 dark:from-red-950 dark:to-amber-950 border border-amber-300 dark:border-amber-700 flex items-center justify-center text-3xl shadow-xs group-hover:scale-110 transition shrink-0">
                        {contest.coverEmoji}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="px-2 py-0.5 rounded-md bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 text-[10px] font-black uppercase">
                            {contest.badge}
                          </span>
                          <span className="px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-[10px] font-black">
                            {contest.questions.length} Câu hỏi • {contest.timePerQuestion}s/câu
                          </span>
                        </div>
                        <h4 className="text-sm font-black text-gray-900 dark:text-gray-100 mt-1 leading-snug">
                          {contest.title}
                        </h4>
                      </div>
                    </div>

                    {isTeacherOrAdmin && (
                      <button
                        onClick={() => handleDeleteContest(contest.id, contest.title)}
                        className="p-1 rounded-lg text-gray-400 hover:text-red-500 transition"
                        title="Xóa đề thi"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2 mb-3">
                    {contest.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-100 dark:border-slate-700 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="px-2.5 py-1 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 font-black text-xs flex items-center gap-1">
                      <span>💎</span>
                      <span>+{contest.rewardGems} Kim Cương</span>
                    </div>
                    <div className="text-[11px] font-bold text-gray-500">+{contest.rewardXp} XP</div>
                  </div>

                  <button
                    onClick={() => handleStartContest(contest)}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 hover:brightness-110 text-white font-black text-xs shadow-md shadow-red-600/25 active:scale-95 transition flex items-center gap-1.5 shrink-0"
                  >
                    <Swords className="w-4 h-4" />
                    <span>Lên Võ Đài ⚔️</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* MODAL TRỰC TIẾP TRANH TÀI (ARENA COMBAT BATTLE) */}
      {activeContest && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-in zoom-in-95 duration-200">
          <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl border-2 border-red-500/60 overflow-hidden">
            
            {/* Arena Header */}
            <div className="p-4 bg-gradient-to-r from-red-700 via-rose-800 to-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{activeContest.coverEmoji}</span>
                <div>
                  <h4 className="text-base font-black leading-tight text-amber-200">{activeContest.title}</h4>
                  <div className="flex items-center gap-2 text-xs text-rose-200 mt-0.5">
                    <span>Đấu Trường: {activeContest.badge}</span>
                    <span>•</span>
                    <span>Phần thưởng: +{activeContest.rewardGems} 💎</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => { sound.playClick(); setActiveContest(null); }}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Arena Body */}
            <div className="p-5 sm:p-6 overflow-y-auto flex-1">
              {!isMatchOver ? (
                <div className="space-y-4">
                  {/* Top combat status */}
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-gray-500">
                      Hiệp đấu: <strong>{currentQIndex + 1} / {activeContest.questions.length}</strong>
                    </span>

                    {/* Timer badge */}
                    <div className={`flex items-center gap-1 px-3 py-1 rounded-full font-black text-xs ${
                      timerSeconds <= 5
                        ? 'bg-red-500 text-white animate-pulse'
                        : 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-200'
                    }`}>
                      <Clock className="w-3.5 h-3.5" />
                      <span>{timerSeconds}s</span>
                    </div>

                    <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">
                      Điểm trúng: {correctCount} câu
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-slate-700 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-red-500 via-amber-500 to-emerald-500 transition-all duration-300"
                      style={{ width: `${((currentQIndex + 1) / activeContest.questions.length) * 100}%` }}
                    />
                  </div>

                  {/* Question Box */}
                  {/* Question Prompt - Only question text, no premature answers or readings */}
                  {(() => {
                    const q = activeContest.questions[currentQIndex];
                    return (
                      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-gray-50 to-white dark:from-slate-700/60 dark:to-slate-800 border border-gray-200 dark:border-slate-600 text-left">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300 font-extrabold text-[11px] uppercase">
                            Đấu trường câu {currentQIndex + 1}
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
                    const q = activeContest.questions[currentQIndex];
                    return (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {q.options?.map((opt, idx) => {
                          const isSelected = selectedOpt === opt;
                          const isCorrect = opt === q.answer;

                          let btnStyle = 'bg-white dark:bg-slate-700 border-gray-200 dark:border-slate-600 text-gray-800 dark:text-gray-200 hover:border-red-400 hover:bg-red-50/40';
                          if (answered) {
                            if (isCorrect) {
                              btnStyle = 'bg-emerald-500 text-white border-emerald-600 font-black shadow-md';
                            } else if (isSelected && !isCorrect) {
                              btnStyle = 'bg-rose-500 text-white border-rose-600 font-bold line-through';
                            } else {
                              btnStyle = 'opacity-40 border-gray-200 dark:border-slate-700';
                            }
                          }

                          return (
                            <button
                              key={idx}
                              onClick={() => handleAnswer(opt)}
                              disabled={answered}
                              className={`p-3 sm:p-3.5 rounded-2xl border text-sm font-bold transition text-left flex items-center justify-between gap-2 ${btnStyle}`}
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                <span className="inline-block w-5 h-5 rounded-full bg-black/10 text-center leading-5 text-[11px] font-black shrink-0">
                                  {String.fromCharCode(65 + idx)}
                                </span>
                                <span className="truncate">{opt}</span>
                              </div>
                              {answered && isCorrect && (
                                <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    );
                  })()}

                  {/* Explanation & Next button - With full answer details, Hanzi, Pinyin & pronunciation */}
                  {answered && (
                    <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 space-y-2.5 animate-in fade-in duration-150">
                      {/* Correct answer row */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-amber-200/60 dark:border-amber-800/60">
                        <div className="flex items-center gap-2 flex-wrap text-xs font-bold text-amber-950 dark:text-amber-100">
                          <span className="uppercase font-black text-red-700 dark:text-red-400">Đáp án chuẩn:</span>
                          <span className="font-extrabold">{activeContest.questions[currentQIndex].answer}</span>
                          {activeContest.questions[currentQIndex].hanzi && (
                            <span className="text-base font-serif font-black text-red-700 dark:text-amber-300 ml-1">
                              ({activeContest.questions[currentQIndex].hanzi} {activeContest.questions[currentQIndex].pinyin && <span className="text-xs font-sans text-gray-600 dark:text-gray-300">- {activeContest.questions[currentQIndex].pinyin}</span>})
                            </span>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            sound.playClick();
                            speakSmart(activeContest.questions[currentQIndex].hanzi || String(activeContest.questions[currentQIndex].answer));
                          }}
                          className="px-2 py-0.5 rounded-lg bg-red-600 text-white font-bold text-[11px] flex items-center gap-1 shadow-2xs hover:scale-105 transition"
                          title="Nghe đọc chuẩn đáp án"
                        >
                          <Volume2 className="w-3 h-3" />
                          <span>Nghe đọc</span>
                        </button>
                      </div>

                      {/* Explanation content and Next action */}
                      <div className="flex items-center justify-between gap-3">
                        <div className="text-xs text-amber-950 dark:text-amber-200 font-medium flex items-start gap-1.5 flex-1">
                          <span className="font-black shrink-0">💡 Kiến giải:</span>
                          <span>{activeContest.questions[currentQIndex].explanation}</span>
                          <button
                            type="button"
                            onClick={() => speakVietnamese(activeContest.questions[currentQIndex].explanation || '')}
                            className="p-1 text-amber-700 hover:bg-amber-100 rounded-md shrink-0"
                            title="Nghe đọc kiến giải"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <button
                          onClick={handleNextQuestion}
                          className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-xs shadow-md shrink-0 active:scale-95 transition"
                        >
                          {currentQIndex + 1 < activeContest.questions.length ? 'Hiệp Đấu Tiếp ➔' : 'Tổng Kết Trận 🏆'}
                        </button>
                      </div>
                    </div>
                  )}

                </div>
              ) : (
                /* MATCH FINISHED SUMMARY */
                <div className="text-center py-6 space-y-4">
                  <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-amber-400 to-yellow-300 flex items-center justify-center text-4xl shadow-xl shadow-amber-400/40 animate-bounce">
                    🥇
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-gray-900 dark:text-gray-100">
                      VINH QUANG ĐẤU TRƯỜNG HÁN NGỮ!
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Chiến sĩ <strong className="text-red-600">{user.name}</strong> đã hoàn thành xuất sắc thử thách {activeContest.title}!
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-gradient-to-r from-red-500/10 via-amber-500/10 to-emerald-500/10 border border-amber-300 dark:border-amber-700 max-w-sm mx-auto flex items-center justify-around">
                    <div className="text-center">
                      <div className="text-2xl font-black text-red-600">{correctCount} / {activeContest.questions.length}</div>
                      <div className="text-[11px] font-bold text-gray-500">Câu Đúng</div>
                    </div>
                    <div className="w-px h-8 bg-gray-300 dark:bg-slate-700" />
                    <div className="text-center">
                      <div className="text-2xl font-black text-amber-500">+{activeContest.rewardGems} 💎</div>
                      <div className="text-[11px] font-bold text-gray-500">Kim Cương Thưởng</div>
                    </div>
                    <div className="w-px h-8 bg-gray-300 dark:bg-slate-700" />
                    <div className="text-center">
                      <div className="text-2xl font-black text-emerald-600">+{activeContest.rewardXp} XP</div>
                      <div className="text-[11px] font-bold text-gray-500">Kinh Nghiệm</div>
                    </div>
                  </div>

                  {!hasClaimed ? (
                    <button
                      onClick={handleClaimArenaRewards}
                      className="px-6 py-3 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 text-white font-black text-sm shadow-xl hover:scale-105 active:scale-95 transition"
                    >
                      🏆 Nhận Huy Chương & {activeContest.rewardGems} Kim Cương Đấu Sĩ
                    </button>
                  ) : (
                    <div className="space-y-3">
                      <div className="p-3 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 rounded-2xl font-bold text-xs max-w-sm mx-auto">
                        ✅ Đã trao Huy chương & cộng Kim Cương vào hồ sơ của bạn!
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => setActiveContest(null)}
                          className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-xs shadow-md"
                        >
                          Chọn Cuộc Thi Khác ⚔️
                        </button>
                        <button
                          onClick={() => {
                            setActiveContest(null);
                            onClose();
                          }}
                          className="px-4 py-2.5 rounded-xl bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-200 font-bold text-xs"
                        >
                          Rời Đấu Trường
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

      {/* TEACHER UPLOAD CONTEST MODAL */}
      {isTeacherUploadOpen && (
        <div className="fixed inset-0 z-70 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-lg w-full max-h-[90vh] flex flex-col shadow-2xl border border-red-500/50 overflow-hidden">
            <div className="p-4 bg-gradient-to-r from-red-700 to-amber-700 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">👩‍🏫</span>
                <h4 className="text-base font-black">CÔ LIÊN THÊM ĐỀ THI ĐẤU TRƯỜNG</h4>
              </div>
              <button
                onClick={() => setIsTeacherUploadOpen(false)}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateArenaContest} className="p-5 overflow-y-auto space-y-4 flex-1">
              <div>
                <label className="block text-xs font-black text-gray-700 dark:text-gray-200 mb-1">
                  Tên cuộc thi Đấu Trường *
                </label>
                <input
                  type="text"
                  required
                  placeholder="VD: Đại Chiến Tam Quốc & Nhân Vật Lịch Sử"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-xs font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-black text-gray-700 dark:text-gray-200 mb-1">
                    Lĩnh vực thi đấu
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-xs font-semibold"
                  >
                    <option value="language">Ngôn Ngữ & Hán Tự</option>
                    <option value="culture">Văn Hóa Cổ Truyền</option>
                    <option value="history">Lịch Sử & Danh Tác</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-black text-gray-700 dark:text-gray-200 mb-1">
                    Thưởng Kim Cương 💎
                  </label>
                  <input
                    type="number"
                    min="10"
                    max="100"
                    value={newRewardGems}
                    onChange={(e) => setNewRewardGems(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-xs font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-gray-700 dark:text-gray-200 mb-1">
                  Mô tả cuộc thi
                </label>
                <textarea
                  rows={2}
                  placeholder="Giới thiệu nội dung trọng tâm của đề thi..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-xs font-semibold"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-red-600 to-amber-600 text-white font-black text-sm shadow-lg active:scale-98 transition flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Xuất Bản Cuộc Thi Lên Đấu Trường Ngay</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
