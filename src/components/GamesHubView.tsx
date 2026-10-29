import React, { useState, useEffect } from 'react';
import {
  Gamepad2,
  Sparkles,
  Award,
  Play,
  RotateCcw,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Clock,
  Flame,
  Volume2,
  Plus,
  Bot,
  Shuffle,
  ShieldAlert,
  ArrowRight,
  Gift
} from 'lucide-react';
import { ExerciseQuestion, UserProfile, CustomGameItem } from '../types';
import { sound, speakChinese, speakVietnamese, speakSmart } from '../utils/soundEffects';
import { getStoredCustomGames, addCustomGame, saveStoredUser } from '../utils/storage';
import confetti from 'canvas-confetti';


export type GameModeType =
  | 'quiz'
  | 'drag_drop'
  | 'match'
  | 'memory'
  | 'image_guess'
  | 'wheel'
  | 'obstacle'
  | 'fast_response'
  | 'bubble_shoot'
  | 'platformer';

interface GamesHubViewProps {
  user: UserProfile;
  onAddXp: (amount: number) => void;
  onOpenTeacherAI: () => void;
  bilingualMode: boolean;
  onUserUpdate?: (u: UserProfile) => void;
}


// Built-in 5 questions for each of the 10 games
const DEFAULT_GAME_QUESTIONS: Record<GameModeType, ExerciseQuestion[]> = {
  quiz: [
    { id: 'q1', type: 'quiz', question: 'Từ nào sau đây có nghĩa là "Xin chào"?', hanzi: '你好', pinyin: 'Nǐ hǎo', options: ['你好 (Nǐ hǎo)', '再见 (Zàijiàn)', '谢谢 (Xièxie)', '对不起 (Duìbuqǐ)'], answer: '你好 (Nǐ hǎo)', explanation: '你好 là câu chào hỏi cơ bản nhất.' },
    { id: 'q2', type: 'quiz', question: 'Số 6 trong tiếng Trung phát âm là gì?', hanzi: '六', pinyin: 'liù', options: ['sì (4)', 'wǔ (5)', 'liù (6)', 'qī (7)'], answer: 'liù (6)', explanation: '六 là số 6, đọc là liù.' },
    { id: 'q3', type: 'quiz', question: '"Mẹ" trong tiếng Trung viết chữ Hán là:', hanzi: '妈妈', pinyin: 'māma', options: ['爸爸', '妈妈', '姐姐', '弟弟'], answer: '妈妈', explanation: '妈妈 nghĩa là Mẹ, có bộ Nữ (女).' },
    { id: 'q4', type: 'quiz', question: 'Dịch câu "Tôi là học sinh" sang tiếng Trung:', hanzi: '我是学生', pinyin: 'Wǒ shì xuésheng', options: ['我是老师', '我是学生', '我是中国人', '我是朋友'], answer: '我是学生', explanation: '学生 là học sinh.' },
    { id: 'q5', type: 'quiz', question: 'Từ "明天见" có ý nghĩa là gì?', hanzi: '明天见', pinyin: 'Míngtiān jiàn', options: ['Ngày mai gặp lại', 'Hôm qua gặp lại', 'Cảm ơn bạn', 'Chúc ngủ ngon'], answer: 'Ngày mai gặp lại', explanation: '明天 là ngày mai, 见 là gặp.' }
  ],
  drag_drop: [
    { id: 'dd1', type: 'fill', question: 'Chọn từ ghép đúng: "Nǐ ____" (Xin chào bạn)', hanzi: '你 ____', options: ['好 (hǎo)', '见 (jiàn)', '去 (qù)', '叫 (jiào)'], answer: '好 (hǎo)', explanation: '你好 ghép thành câu Xin chào.' },
    { id: 'dd2', type: 'fill', question: 'Chọn từ ghép đúng: "Xiè ____" (Cảm ơn)', hanzi: '谢 ____', options: ['谢 (xie)', '客 (kè)', '起 (qǐ)', '师 (shī)'], answer: '谢 (xie)', explanation: '谢谢 là Cảm ơn.' },
    { id: 'dd3', type: 'fill', question: 'Chọn từ còn thiếu: "Wǒ ____ Yuènán rén." (Tôi là người VN)', hanzi: '我 ____ 越南人。', options: ['是 (shì)', '有 (yǒu)', '叫 (jiào)', '爱 (ài)'], answer: '是 (shì)', explanation: '我是越南人 nghĩa là Tôi là người Việt Nam.' },
    { id: 'dd4', type: 'fill', question: 'Chọn từ: "Một quả táo" -> "Yī ____ píngguǒ"', hanzi: '一 ____ 苹果', options: ['个 (gè)', '只 (zhī)', '本 (běn)', '张 (zhāng)'], answer: '个 (gè)', explanation: 'Lượng từ quả táo là 个 (gè).' },
    { id: 'dd5', type: 'fill', question: 'Chọn từ: "Tạm biệt" -> "Zài ____"', hanzi: '再 ____', options: ['见 (jiàn)', '好 (hǎo)', '在 (zài)', '去 (qù)'], answer: '见 (jiàn)', explanation: '再见 là Hẹn gặp lại / Tạm biệt.' }
  ],
  match: [
    { id: 'm1', type: 'match', question: 'Nối từ "爸爸" với nghĩa thích hợp:', hanzi: '爸爸', pinyin: 'bàba', options: ['Bố / Ba', 'Mẹ', 'Anh trai', 'Em gái'], answer: 'Bố / Ba', explanation: '爸爸 nghĩa là Bố.' },
    { id: 'm2', type: 'match', question: 'Nối từ "猫" (māo) với con vật đúng:', hanzi: '猫', pinyin: 'māo', options: ['Con mèo', 'Con chó', 'Con cá', 'Con chim'], answer: 'Con mèo', explanation: '猫 là con mèo.' },
    { id: 'm3', type: 'match', question: 'Nối từ "水" (shuǐ) với đồ uống đúng:', hanzi: '水', pinyin: 'shuǐ', options: ['Nước lọc', 'Sữa tươi', 'Trà đào', 'Nước ngọt'], answer: 'Nước lọc', explanation: '水 là nước uống.' },
    { id: 'm4', type: 'match', question: 'Nối từ "红色" (hóngsè) với màu sắc:', hanzi: '红色', pinyin: 'hóngsè', options: ['Màu đỏ', 'Màu xanh', 'Màu vàng', 'Màu trắng'], answer: 'Màu đỏ', explanation: '红色 là màu đỏ.' },
    { id: 'm5', type: 'match', question: 'Nối từ "中国" (Zhōngguó) với quốc gia:', hanzi: '中国', pinyin: 'Zhōngguó', options: ['Trung Quốc', 'Việt Nam', 'Nước Mỹ', 'Nhật Bản'], answer: 'Trung Quốc', explanation: '中国 là Trung Quốc.' }
  ],
  memory: [
    { id: 'mem1', type: 'match', question: 'Ghép cặp thẻ Hán tự & Pinyin: "大"', hanzi: '大', options: ['dà (To lớn)', 'xiǎo (Nhỏ)', 'duō (Nhiều)', 'shǎo (Ít)'], answer: 'dà (To lớn)', explanation: '大 đọc là dà.' },
    { id: 'mem2', type: 'match', question: 'Ghép cặp thẻ Hán tự & Pinyin: "小"', hanzi: '小', options: ['xiǎo (Nhỏ bé)', 'dà (To lớn)', 'bái (Trắng)', 'hóng (Đỏ)'], answer: 'xiǎo (Nhỏ bé)', explanation: '小 đọc là xiǎo.' },
    { id: 'mem3', type: 'match', question: 'Ghép cặp thẻ Hán tự & Pinyin: "山"', hanzi: '山', options: ['shān (Núi non)', 'shuǐ (Nước)', 'tiān (Trời)', 'rì (Mặt trời)'], answer: 'shān (Núi non)', explanation: '山 nghĩa là Núi.' },
    { id: 'mem4', type: 'match', question: 'Ghép cặp thẻ Hán tự & Pinyin: "月"', hanzi: '月', options: ['yuè (Mặt trăng / Tháng)', 'rì (Mặt trời)', 'mù (Mắt)', 'kǒu (Miệng)'], answer: 'yuè (Mặt trăng / Tháng)', explanation: '月 là mặt trăng.' },
    { id: 'mem5', type: 'match', question: 'Ghép cặp thẻ Hán tự & Pinyin: "人"', hanzi: '人', options: ['rén (Con người)', 'dà (To lớn)', 'tóu (Đầu)', 'shǒu (Tay)'], answer: 'rén (Con người)', explanation: '人 nghĩa là Con người.' }
  ],
  image_guess: [
    { id: 'ig1', type: 'quiz', question: 'Đuổi hình bắt chữ 🍎: Quả táo trong tiếng Trung là gì?', hanzi: '🍎', options: ['苹果 (píngguǒ)', '香蕉 (xiāngjiāo)', '西瓜 (xīguā)', '葡萄 (pútao)'], answer: '苹果 (píngguǒ)', explanation: '苹果 là quả táo.' },
    { id: 'ig2', type: 'quiz', question: 'Đuổi hình bắt chữ 🐶: Chú cún con đáng yêu là:', hanzi: '🐶', options: ['小狗 (xiǎogǒu)', '小猫 (xiǎomāo)', '小鸟 (xiǎoniǎo)', '小鱼 (xiǎoyú)'], answer: '小狗 (xiǎogǒu)', explanation: '狗 là chú cún con.' },
    { id: 'ig3', type: 'quiz', question: 'Đuổi hình bắt chữ ☀️: Mặt trời tỏa nắng chói chang:', hanzi: '☀️', options: ['太阳 (tàiyáng)', '月亮 (yuèliang)', '星星 (xīngxing)', '白云 (báiyún)'], answer: '太阳 (tàiyáng)', explanation: '太阳 là mặt trời.' },
    { id: 'ig4', type: 'quiz', question: 'Đuổi hình bắt chữ 🚗: Xe ô tô chạy trên đường là:', hanzi: '🚗', options: ['汽车 (qìchē)', '飞机 (fēijī)', '轮船 (lúnchuán)', '自行车 (zìxíngchē)'], answer: '汽车 (qìchē)', explanation: '汽车 là xe hơi.' },
    { id: 'ig5', type: 'quiz', question: 'Đuổi hình bắt chữ 📚: Quyển sách yêu thích của bé:', hanzi: '📚', options: ['书 (shū)', '笔 (bǐ)', '尺子 (chǐzi)', '包 (bāo)'], answer: '书 (shū)', explanation: '书 là sách.' }
  ],
  wheel: [
    { id: 'w1', type: 'quiz', question: 'Vòng quay may mắn trúng ô Số đếm: "三" là số mấy?', hanzi: '三', options: ['Số 1', 'Số 2', 'Số 3', 'Số 4'], answer: 'Số 3', explanation: '三 là số 3.' },
    { id: 'w2', type: 'quiz', question: 'Vòng quay trúng ô Động vật: "Gấu trúc" là gì?', hanzi: '🐼', options: ['熊猫 (xióngmāo)', '老虎 (lǎohǔ)', '大象 (dàxiàng)', '狮子 (shīzi)'], answer: '熊猫 (xióngmāo)', explanation: '熊猫 là chú gấu trúc Panda.' },
    { id: 'w3', type: 'quiz', question: 'Vòng quay trúng ô Gia đình: "姐姐" là ai?', hanzi: '姐姐', options: ['Chị gái', 'Em gái', 'Mẹ', 'Bà ngoại'], answer: 'Chị gái', explanation: '姐姐 là chị gái.' },
    { id: 'w4', type: 'quiz', question: 'Vòng quay trúng ô Màu sắc: "黄色" là màu gì?', hanzi: '黄色', options: ['Màu vàng', 'Màu đỏ', 'Màu xanh', 'Màu đen'], answer: 'Màu vàng', explanation: '黄色 là màu vàng.' },
    { id: 'w5', type: 'quiz', question: 'Vòng quay trúng ô Thức ăn: "米饭" là món gì?', hanzi: '米饭', options: ['Cơm trắng', 'Mì sợi', 'Bánh bao', 'Sủi cảo'], answer: 'Cơm trắng', explanation: '米饭 là cơm trắng.' }
  ],
  obstacle: [
    { id: 'ob1', type: 'quiz', question: 'Vượt chướng ngại vật 1: Điền chữ Hán: "Nǐ hǎo" -> ____', hanzi: 'Nǐ hǎo', options: ['你好', '谢谢', '再见', '老师'], answer: '你好', explanation: 'Nhảy qua tảng đá thành công!' },
    { id: 'ob2', type: 'quiz', question: 'Vượt chướng ngại vật 2: Con số sau số "七" (7) là số nào?', hanzi: '七 + 1 = ?', options: ['八 (8)', '九 (9)', '六 (6)', '十 (10)'], answer: '八 (8)', explanation: 'Vượt qua hố sâu thành công!' },
    { id: 'ob3', type: 'quiz', question: 'Vượt chướng ngại vật 3: Từ trái nghĩa với "大" (To) là:', hanzi: '大 <-> ?', options: ['小 (xiǎo)', '多 (duō)', '高 (gāo)', '长 (cháng)'], answer: '小 (xiǎo)', explanation: 'Leo qua vách đá thành công!' },
    { id: 'ob4', type: 'quiz', question: 'Vượt chướng ngại vật 4: "Bác sĩ" trong tiếng Trung là:', hanzi: 'Bác sĩ', options: ['医生 (yīshēng)', '老师 (lǎoshī)', '工人 (gōngrén)', '警察 (jǐngchá)'], answer: '医生 (yīshēng)', explanation: 'Vượt qua dòng sông thành công!' },
    { id: 'ob5', type: 'quiz', question: 'Vượt chướng ngại vật 5 (Về đích): "Chúc mừng bạn" nói sao?', hanzi: '祝贺你', options: ['祝贺你！', '对不起！', '没关系！', '不用谢！'], answer: '祝贺你！', explanation: 'Về đích quán quân xuất sắc!' }
  ],
  fast_response: [
    { id: 'fr1', type: 'quiz', question: 'Phản xạ chớp nhoáng (10s): "1 + 1 = 二", đúng hay sai?', hanzi: '一 + 一 = 二', options: ['Đúng (对)', 'Sai (不对)'], answer: 'Đúng (对)', explanation: '1 + 1 = 2.' },
    { id: 'fr2', type: 'quiz', question: 'Phản xạ chớp nhoáng: "再见" dùng khi gặp mặt hay chia tay?', hanzi: '再见', options: ['Chia tay tạm biệt', 'Khi mới gặp chào nhau'], answer: 'Chia tay tạm biệt', explanation: '再见 là hẹn gặp lại.' },
    { id: 'fr3', type: 'quiz', question: 'Phản xạ chớp nhoáng: "十" là số 10 hay số 4?', hanzi: '十', options: ['Số 10', 'Số 4'], answer: 'Số 10', explanation: '十 là số 10.' },
    { id: 'fr4', type: 'quiz', question: 'Phản xạ chớp nhoáng: "爸爸" là Bố hay là Mẹ?', hanzi: '爸爸', options: ['Bố', 'Mẹ'], answer: 'Bố', explanation: '爸爸 là Bố.' },
    { id: 'fr5', type: 'quiz', question: 'Phản xạ chớp nhoáng: "Trung Quốc" viết là 中国, chuẩn không?', hanzi: '中国', options: ['Chuẩn xác 100%', 'Sai rồi'], answer: 'Chuẩn xác 100%', explanation: '中国 là Trung Quốc.' }
  ],
  bubble_shoot: [
    { id: 'bs1', type: 'quiz', question: 'Bắn trúng quả bóng chứa số "五" (5):', hanzi: '五', options: ['Bóng 5 (五)', 'Bóng 2 (二)', 'Bóng 8 (八)', 'Bóng 9 (九)'], answer: 'Bóng 5 (五)', explanation: 'Bắn trúng bóng số 5 vỡ tan tạo thành pháo hoa!' },
    { id: 'bs2', type: 'quiz', question: 'Bắn quả bóng mang chữ "Ngọt ngào" (甜 - tián):', hanzi: '甜', options: ['甜 (tián - ngọt)', '苦 (kǔ - đắng)', '辣 (là - cay)', '酸 (suān - chua)'], answer: '甜 (tián - ngọt)', explanation: 'Bóng nổ giòn giã!' },
    { id: 'bs3', type: 'quiz', question: 'Bắn quả bóng chứa từ "Đi học" (上学):', hanzi: '上学', options: ['上学 (shàngxué)', '放学 (fàngxué)', '睡觉 (shuìjiào)', '吃饭 (chīfàn)'], answer: '上学 (shàngxué)', explanation: 'Tuyệt cú mèo!' },
    { id: 'bs4', type: 'quiz', question: 'Bắn quả bóng chứa chữ "Hảo" (Tốt đẹp):', hanzi: '好', options: ['好 (hǎo)', '坏 (huài)', '多 (duō)', '少 (shǎo)'], answer: '好 (hǎo)', explanation: 'Bắn trúng tâm!' },
    { id: 'bs5', type: 'quiz', question: 'Bắn quả bóng chứa "Mặt trời" (日):', hanzi: '日', options: ['日 (rì)', '月 (yuè)', '水 (shuǐ)', '火 (huǒ)'], answer: '日 (rì)', explanation: 'Bắn hạ thành công mục tiêu!' }
  ],
  platformer: [
    { id: 'pf1', type: 'quiz', question: 'Nhảy ăn ngôi sao: Chữ Hán nào có nghĩa là "Mặt trăng"?', hanzi: 'Mặt trăng', options: ['月 (yuè)', '日 (rì)', '木 (mù)', '土 (tǔ)'], answer: '月 (yuè)', explanation: 'Nhảy thu thập được 1 ngôi sao vàng!' },
    { id: 'pf2', type: 'quiz', question: 'Nhảy qua bậc thang: "Bốn" trong tiếng Trung viết là:', hanzi: 'Số 4', options: ['四 (sì)', '三 (sān)', '五 (wǔ)', '六 (liù)'], answer: '四 (sì)', explanation: 'Nhảy qua bậc thang an toàn!' },
    { id: 'pf3', type: 'quiz', question: 'Mở rương báu: "Nước" trong tiếng Trung viết là:', hanzi: 'Nước', options: ['水 (shuǐ)', '火 (huǒ)', '金 (jīn)', '木 (mù)'], answer: '水 (shuǐ)', explanation: 'Mở được rương báu kim cương!' },
    { id: 'pf4', type: 'quiz', question: 'Vượt dốc cao: "Người" viết là chữ nào?', hanzi: 'Con người', options: ['人 (rén)', '大 (dà)', '天 (tiān)', '太 (tài)'], answer: '人 (rén)', explanation: 'Lên đỉnh dốc thành công!' },
    { id: 'pf5', type: 'quiz', question: 'Chinh phục cúp vàng: Chữ "Tốt / Khỏe" là:', hanzi: 'Tốt', options: ['好 (hǎo)', '坏 (huài)', '大 (dà)', '小 (xiǎo)'], answer: '好 (hǎo)', explanation: 'Chiến thắng màn chơi Platformer!' }
  ]
};

const GAME_CARDS: { id: GameModeType; nameVi: string; nameZh: string; desc: string; emoji: string; color: string; badge: string }[] = [
  { id: 'quiz', nameVi: 'Quiz Trắc Nghiệm', nameZh: '选择题挑战', desc: 'Thi đấu trả lời nhanh, tính điểm chuỗi liên hoàn kiểu Kahoot sôi động.', emoji: '🎯', color: 'from-blue-500 to-indigo-600', badge: 'Hot nhất' },
  { id: 'drag_drop', nameVi: 'Kéo Thả Từ Vựng', nameZh: '拖拽填空', desc: 'Kéo ghép các từ Hán tự vào ô trống để hoàn thành câu hoàn chỉnh.', emoji: '🧩', color: 'from-emerald-500 to-teal-600', badge: 'Tương tác' },
  { id: 'match', nameVi: 'Nối Cặp Từ – Nghĩa', nameZh: '连线配对', desc: 'Nối chữ Hán với phiên âm Pinyin và nghĩa tiếng Việt tương ứng.', emoji: '🔗', color: 'from-amber-500 to-orange-600', badge: 'Kinh điển' },
  { id: 'memory', nameVi: 'Memory Card Lật Hình', nameZh: '翻牌记忆', desc: 'Luyện trí nhớ siêu đẳng bằng cách lật các cặp thẻ Hán tự bí mật.', emoji: '🃏', color: 'from-purple-500 to-pink-600', badge: 'Rèn trí nhớ' },
  { id: 'image_guess', nameVi: 'Đuổi Hình Bắt Chữ', nameZh: '看图猜字', desc: 'Nhìn hình ảnh, emoji sinh động đoán nhanh từ vựng tiếng Trung.', emoji: '🖼️', color: 'from-rose-500 to-red-600', badge: 'Trực quan' },
  { id: 'wheel', nameVi: 'Vòng Quay May Mắn', nameZh: '幸运大转盘', desc: 'Quay vòng xoay trúng chủ đề ngẫu nhiên và nhận thưởng XP khổng lồ.', emoji: '🎡', color: 'from-yellow-400 to-amber-600', badge: 'Vui nhộn' },
  { id: 'obstacle', nameVi: 'Vượt Chướng Ngại Vật', nameZh: '障碍闯关', desc: 'Vượt qua từng cạm bẫy, tảng đá bằng cách trả lời đúng câu hỏi.', emoji: '🏃', color: 'from-cyan-500 to-blue-600', badge: 'Kịch tính' },
  { id: 'fast_response', nameVi: 'Ai Nhanh Hơn (10s)', nameZh: '反应极限', desc: 'Đồng hồ đếm ngược 10 giây mỗi câu! Thử thách tốc độ tư duy.', emoji: '⚡', color: 'from-red-500 to-orange-500', badge: 'Tốc độ' },
  { id: 'bubble_shoot', nameVi: 'Bắn Bóng Tiếng Trung', nameZh: '射击气球', desc: 'Ngắm bắn chính xác vào các quả bóng bay mang đáp án chữ Hán đúng.', emoji: '🎈', color: 'from-teal-400 to-emerald-600', badge: 'Xạ thủ' },
  { id: 'platformer', nameVi: 'Mini Game Platformer', nameZh: '跳跃冒险', desc: 'Nhảy qua các bục đá thần kỳ và thu thập đủ các ngôi sao chữ Hán.', emoji: '⭐', color: 'from-violet-500 to-purple-700', badge: 'Phiêu lưu' },
];

export const GamesHubView: React.FC<GamesHubViewProps> = ({
  user,
  onAddXp,
  onOpenTeacherAI,
  bilingualMode,
  onUserUpdate,
}) => {
  const [activeGame, setActiveGame] = useState<GameModeType | null>(null);
  const [hubTab, setHubTab] = useState<'games' | 'rewards'>('games');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [gameScore, setGameScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [countdown, setCountdown] = useState<number>(10);

  // Custom games created by teachers
  const [customGames, setCustomGames] = useState<CustomGameItem[]>([]);

  useEffect(() => {
    setCustomGames(getStoredCustomGames());
  }, []);

  const REWARD_STORE_ITEMS = [
    { id: 'av-panda-king', name: 'Mascot Vua Panda 3D', cost: 20, type: 'avatar', value: '👑', desc: 'Avatar vương miện hoàng gia dành cho học sinh xuất sắc' },
    { id: 'av-dragon', name: 'Linh Vật Rồng Vàng May Mắn', cost: 35, type: 'avatar', value: '🐉', desc: 'Linh vật truyền thống dũng mãnh, may mắn & kiên cường' },
    { id: 'av-unicorn', name: 'Kỳ Lân Tri Thức 3D', cost: 30, type: 'avatar', value: '🦄', desc: 'Linh thú thần thoại thông thái đồng hành cùng bé học tập' },
    { id: 'av-rocket', name: 'Phi Thuyền Hán Tự', cost: 25, type: 'avatar', value: '🚀', desc: 'Avatar phi thuyền siêu tốc chinh phục đỉnh cao HSK' },
    { id: 'badge-master', name: 'Huy hiệu Trạng Nguyên Hán Tự', cost: 15, type: 'badge', value: '🏆 Trạng Nguyên Hán Tự', desc: 'Huy hiệu cao quý vinh danh trên bảng vàng hệ thống' },
    { id: 'badge-speed', name: 'Huy hiệu Thần Tốc Độ', cost: 15, type: 'badge', value: '⚡ Chiến Thần Tốc Độ', desc: 'Thưởng cho học sinh phản xạ từ vựng chớp nhoáng' },
    { id: 'badge-yct-champion', name: 'Huy hiệu Quán Quân YCT', cost: 20, type: 'badge', value: '🌟 Quán Quân YCT Quốc Tế', desc: 'Chứng nhận năng lực hoàn thành xuất sắc các bài thi YCT' },
    { id: 'badge-hsk-master', name: 'Huy hiệu Bách Phát HSK 3.0', cost: 25, type: 'badge', value: '🎯 Bách Phát Bách Trúng HSK 3.0', desc: 'Danh hiệu chinh phục hệ thống từ vựng HSK phiên bản mới nhất' },
  ];

  const handleBuyReward = (item: typeof REWARD_STORE_ITEMS[0]) => {
    if (user.gems < item.cost) {
      sound.playWrong();
      alert('Bé chưa đủ Kim Cương! Hãy chơi thêm các trò chơi để tích lũy thêm Kim Cương nha!');
      return;
    }
    if (item.type === 'badge' && user.badges.includes(item.value)) {
      alert('Bé đã sở hữu huy hiệu này rồi!');
      return;
    }
    sound.playVictory();
    confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
    const updatedUser: UserProfile = {
      ...user,
      gems: user.gems - item.cost,
      avatar: item.type === 'avatar' ? item.value : user.avatar,
      badges: item.type === 'badge' ? [...user.badges, item.value] : user.badges,
    };
    saveStoredUser(updatedUser);
    if (onUserUpdate) onUserUpdate(updatedUser);
  };


  // Timer for fast_response mode
  useEffect(() => {
    if (activeGame === 'fast_response' && !isAnswered && !isGameOver) {
      if (countdown > 0) {
        const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        return () => clearTimeout(timer);
      } else {
        // Time out
        setIsAnswered(true);
        setIsCorrect(false);
        sound.playWrong();
      }
    }
  }, [activeGame, countdown, isAnswered, isGameOver]);

  const questions = activeGame ? DEFAULT_GAME_QUESTIONS[activeGame] : [];
  const currentQ = questions[currentIdx];

  const handleStartGame = (mode: GameModeType) => {
    sound.playClick();
    setActiveGame(mode);
    setCurrentIdx(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setGameScore(0);
    setIsGameOver(false);
    setCountdown(10);
  };

  const handleSelectOption = (opt: string) => {
    if (isAnswered) return;
    sound.playClick();
    setSelectedAnswer(opt);
    setIsAnswered(true);

    const correct = opt.trim().toLowerCase() === (currentQ.answer as string).trim().toLowerCase();
    setIsCorrect(correct);

    if (correct) {
      sound.playCorrect();
      setGameScore((prev) => prev + 1);
      onAddXp(20);
    } else {
      sound.playWrong();
    }
  };

  const handleNextQ = () => {
    sound.playClick();
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setCountdown(10);
    } else {
      setIsGameOver(true);
      sound.playVictory();
      confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
      onAddXp(60);
    }
  };

  // Anti-accidental exit confirmation button
  const handleExitGame = () => {
    if (!isGameOver) {
      if (window.confirm('Bạn có chắc muốn tạm dừng trò chơi không? Điểm số vòng này sẽ chưa được lưu hết.')) {
        sound.playClick();
        setActiveGame(null);
      }
    } else {
      sound.playClick();
      setActiveGame(null);
    }
  };

  // Game Hub Selection View
  if (!activeGame) {
    return (
      <div className="space-y-8 pb-12 animate-in fade-in duration-300">
        
        {/* Banner */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="inline-block bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-2">
              🎮 Đấu Trường Gamification 3D
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black">
              SÂN CHƠI TRÒ CHƠI
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-emerald-100 mt-1 max-w-xl">
              10 trò chơi trí tuệ thiết kế riêng cho học sinh Tiểu học và THCS. Học mà chơi – Chơi mà giỏi!
            </p>
          </div>

          {/* Teacher AI Design Action */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenTeacherAI();
            }}
            className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-400 text-amber-950 font-black text-sm shadow-xl hover:scale-105 active:scale-95 transition shrink-0"
          >
            <Bot className="w-5 h-5" />
            <span>Thầy cô soạn bài & AI tạo game</span>
          </button>
        </div>


        {/* Sub-tabs: Sân chơi game & Đổi quà tích lũy */}
        <div className="flex items-center gap-3 border-b border-gray-200 dark:border-slate-700 pb-3">
          <button
            onClick={() => { sound.playClick(); setHubTab('games'); }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-black text-sm transition ${
              hubTab === 'games'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-slate-700 hover:border-emerald-400'
            }`}
          >
            <Gamepad2 className="w-4 h-4" />
            <span>SÂN CHƠI TRÒ CHƠI (10 DẠNG GAME)</span>
          </button>

          <button
            onClick={() => { sound.playClick(); setHubTab('rewards'); }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-black text-sm transition ${
              hubTab === 'rewards'
                ? 'bg-pink-600 text-white shadow-md shadow-pink-600/30'
                : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-slate-700 hover:border-pink-400'
            }`}
          >
            <Gift className="w-4 h-4 text-amber-300" />
            <span>ĐỔI QUÀ TÍCH LŨY ({user.gems} 💎)</span>
          </button>
        </div>

        {hubTab === 'games' ? (
          <div className="space-y-8">
            {/* 10 Game Modes Grid */}
            <div>
              <div className="flex items-center justify-between mb-4">

            <h3 className="text-lg sm:text-xl font-black text-gray-800 dark:text-gray-100 flex items-center gap-2">
              <Gamepad2 className="w-5 h-5 text-emerald-600" />
              <span>DANH SÁCH 10 TRÒ CHƠI TƯƠNG TÁC ĐÃ SẴN SÀNG</span>
            </h3>
            <span className="text-xs font-bold text-gray-500">Mỗi game tối thiểu 5 câu hỏi</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {GAME_CARDS.map((card) => (
              <div
                key={card.id}
                onClick={() => handleStartGame(card.id)}
                className={`group relative rounded-3xl p-5 text-white bg-gradient-to-br ${card.color} shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between border-2 border-white/20 overflow-hidden select-none`}
              >
                <div className="flex items-start justify-between mb-2">
                  <span className="text-4xl filter drop-shadow group-hover:scale-110 transition-transform">
                    {card.emoji}
                  </span>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-black/25 text-white">
                    {card.badge}
                  </span>
                </div>

                <div>
                  <h4 className="text-base font-black leading-snug drop-shadow-sm">
                    {card.nameVi}
                  </h4>
                  <p className="text-[11px] text-white/90 mt-1 line-clamp-2 leading-relaxed">
                    {card.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between text-xs font-black">
                  <span>Chơi ngay</span>
                  <div className="w-6 h-6 rounded-full bg-white/25 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <Play className="w-3.5 h-3.5 fill-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Custom Teacher Shared Games Pool */}
        {customGames.length > 0 && (
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-slate-700">
            <h3 className="text-base sm:text-lg font-black text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span>SÂN CHƠI DO THẦY CÔ THIẾT KẾ ({customGames.length} bài)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {customGames.map((cg) => (
                <div
                  key={cg.id}
                  onClick={() => handleStartGame(cg.gameType as GameModeType)}
                  className="p-4 rounded-2xl bg-gray-50 dark:bg-slate-700/50 hover:bg-emerald-50 dark:hover:bg-slate-700 border border-gray-200 dark:border-slate-600 transition cursor-pointer flex items-center justify-between"
                >
                  <div>
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      {cg.grade} • {cg.topic}
                    </span>
                    <h4 className="text-sm font-black text-gray-900 dark:text-gray-100 mt-1">
                      {cg.title}
                    </h4>
                    <p className="text-[11px] text-gray-500">Người tạo: {cg.createdBy}</p>
                  </div>
                  <Play className="w-5 h-5 text-emerald-600 shrink-0 ml-2" />
                </div>
              ))}
            </div>
          </div>
        )}
          </div>
        ) : (
          /* TAB 2: ĐỔI QUÀ TÍCH LŨY */
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="p-5 rounded-3xl bg-gradient-to-r from-amber-500/15 via-pink-500/15 to-purple-500/15 border-2 border-pink-300 dark:border-pink-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-pink-500 text-white flex items-center justify-center text-3xl shadow-lg shrink-0">
                  🎁
                </div>
                <div>
                  <h3 className="text-lg font-black text-gray-900 dark:text-gray-100">
                    CỬA HÀNG ĐỔI QUÀ TÍCH LŨY
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-300 mt-0.5">
                    Đổi điểm thưởng Kim Cương 💎 tích lũy từ các chiến thắng trong 10 dạng game để sở hữu Mascot 3D và Huy hiệu vinh danh!
                  </p>
                </div>
              </div>
              <div className="bg-white dark:bg-slate-800 px-4 py-2.5 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-sm text-right shrink-0">
                <div className="text-[10px] font-bold text-gray-500 uppercase">Số dư của bạn</div>
                <div className="text-lg font-black text-pink-600 dark:text-pink-400">
                  {user.gems} 💎 Kim Cương
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {REWARD_STORE_ITEMS.map((item) => {
                const isOwned = item.type === 'badge' ? user.badges.includes(item.value) : user.avatar === item.value;
                return (
                  <div
                    key={item.id}
                    className="p-5 rounded-3xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 hover:border-pink-400 dark:hover:border-pink-500 hover:shadow-xl transition flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-amber-100 to-pink-100 dark:from-slate-700 dark:to-pink-950 flex items-center justify-center text-3xl shadow-inner mb-3">
                        {item.value.includes(' ') ? '🏅' : item.value}
                      </div>
                      <h4 className="text-sm font-black text-gray-900 dark:text-gray-100 text-center leading-snug">
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-1 line-clamp-2">
                        {item.desc}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-100 dark:border-slate-700/80 flex items-center justify-between gap-2">
                      <span className="text-xs font-black text-amber-600 dark:text-amber-400">
                        {item.cost} 💎
                      </span>
                      <button
                        onClick={() => handleBuyReward(item)}
                        disabled={isOwned}
                        className={`px-3 py-1.5 rounded-xl font-black text-xs transition ${
                          isOwned
                            ? 'bg-gray-100 dark:bg-slate-700 text-gray-400 cursor-not-allowed'
                            : 'bg-pink-600 hover:bg-pink-700 text-white shadow-md active:scale-95'
                        }`}
                      >
                        {isOwned ? 'Đã có' : 'Đổi ngay'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    );
  }


  // Active Game Playing View
  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12 animate-in zoom-in-95 duration-200">
      
      {/* Game Header Bar */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 shadow-lg border border-gray-100 dark:border-slate-700 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={handleExitGame}
            title="Thoát trò chơi"
            className="px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 text-gray-700 dark:text-gray-200 text-xs font-black transition flex items-center gap-1"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />
            <span>Thoát ra</span>
          </button>
          <div>
            <h3 className="text-base font-black text-gray-800 dark:text-gray-100 uppercase">
              {GAME_CARDS.find((c) => c.id === activeGame)?.nameVi}
            </h3>
            <span className="text-xs text-gray-500">
              Câu {currentIdx + 1} / {questions.length}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {activeGame === 'fast_response' && !isGameOver && (
            <div className={`flex items-center gap-1 font-black text-sm px-3 py-1 rounded-xl ${countdown <= 3 ? 'bg-red-500 text-white animate-pulse' : 'bg-amber-100 text-amber-900'}`}>
              <Clock className="w-4 h-4" />
              <span>{countdown}s</span>
            </div>
          )}

          <div className="flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-950/40 px-3.5 py-1.5 rounded-2xl border border-emerald-200 text-xs font-black text-emerald-700 dark:text-emerald-300">
            <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
            <span>Điểm: {gameScore} đúng</span>
          </div>
        </div>
      </div>

      {!isGameOver && currentQ ? (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100 dark:border-slate-700">
          
          {/* Question Display - Clean question prompt only */}
          <div className="mb-6">
            <h4 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-gray-100 leading-snug">
              {currentQ.question}
            </h4>
          </div>

          {/* Options Grid - With pronunciation audio for each answer option */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {currentQ.options?.map((opt, i) => {
              let optStyle = 'bg-gray-50 dark:bg-slate-700/70 border-gray-200 dark:border-slate-600 text-gray-800 dark:text-gray-100 hover:border-emerald-400';
              if (isAnswered) {
                if (opt.trim().toLowerCase() === (currentQ.answer as string).trim().toLowerCase()) {
                  optStyle = 'bg-emerald-500 text-white border-emerald-600 font-black shadow-md';
                } else if (selectedAnswer === opt) {
                  optStyle = 'bg-rose-500 text-white border-rose-600 font-bold';
                }
              }

              return (
                <button
                  key={i}
                  disabled={isAnswered}
                  onClick={() => handleSelectOption(opt)}
                  className={`p-3.5 sm:p-4 rounded-2xl border-2 text-left font-bold text-sm sm:text-base transition-all duration-200 active:scale-98 flex items-center justify-between gap-2 ${optStyle}`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="inline-block w-6 h-6 rounded-full bg-black/10 text-center leading-6 text-xs mr-1 font-black shrink-0">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="truncate">{opt}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Feedback & Detailed Answer Explanation with Audio */}
          {isAnswered && (
            <div className={`p-4 rounded-2xl mb-6 ${isCorrect ? 'bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 text-emerald-900 dark:text-emerald-200' : 'bg-rose-50 dark:bg-rose-950/40 border border-rose-200 text-rose-900 dark:text-rose-200'}`}>
              <div className="font-black text-sm">
                {isCorrect ? '🎉 Hoan hô! Câu trả lời chính xác (+20 XP)' : '💡 Chưa đúng rồi, em hãy chú ý đáp án và giải thích nhé:'}
              </div>

              {/* Correct answer display with pronunciation */}
              <div className="mt-2.5 p-3 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-emerald-200 dark:border-emerald-800/60 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-extrabold uppercase text-emerald-700 dark:text-emerald-400">
                    Đáp án đúng:
                  </span>
                  <span className="text-base font-black text-emerald-900 dark:text-emerald-100">
                    {currentQ.answer}
                  </span>
                  {currentQ.hanzi && (
                    <span className="text-lg font-black font-serif text-emerald-800 dark:text-emerald-200 ml-1">
                      ({currentQ.hanzi} {currentQ.pinyin && <span className="text-xs text-amber-600 dark:text-amber-400 font-sans font-bold">- {currentQ.pinyin}</span>})
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    speakSmart(currentQ.hanzi || String(currentQ.answer));
                  }}
                  className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs"
                  title="Nghe phát âm chuẩn đáp án đúng"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Nghe đọc</span>
                </button>
              </div>

              <div className="text-xs mt-2.5 text-gray-700 dark:text-gray-300 flex items-start gap-2">
                <span className="font-bold shrink-0">💡 Giải thích:</span>
                <span className="flex-1">{currentQ.explanation}</span>
                <button
                  type="button"
                  onClick={() => speakVietnamese(currentQ.explanation || '')}
                  className="p-1 text-emerald-600 hover:bg-emerald-100 rounded-md shrink-0"
                  title="Nghe đọc giải thích"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Next Button */}
          {isAnswered && (
            <div className="flex justify-end">
              <button
                onClick={handleNextQ}
                className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm shadow-lg shadow-emerald-600/30 transition flex items-center gap-2"
              >
                <span>{currentIdx < questions.length - 1 ? 'Câu tiếp theo' : 'Xem tổng kết vòng chơi'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      ) : (
        /* Game Over Trophy Screen */
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-slate-700 text-center">
          <span className="text-7xl animate-bounce inline-block mb-3">👑</span>
          <h3 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-gray-100">
            CHIẾN THẮNG TRÒ CHƠI XUẤT SẮC!
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
            Bé đã hoàn thành xuất sắc thử thách với kết quả <span className="text-emerald-600 font-black">{gameScore}/{questions.length}</span> câu đúng và nhận được <span className="text-amber-500 font-black">+80 XP</span>!
          </p>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => handleStartGame(activeGame)}
              className="px-5 py-3 rounded-2xl bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 text-gray-700 dark:text-gray-200 font-bold text-xs flex items-center gap-1.5 transition"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Chơi lại game này</span>
            </button>
            <button
              onClick={() => setActiveGame(null)}
              className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-md transition"
            >
              Chọn game khác trong Sân chơi
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
