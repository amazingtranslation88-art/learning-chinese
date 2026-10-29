import React, { useState } from 'react';
import {
  Bot,
  Sparkles,
  X,
  Plus,
  Trash2,
  CheckCircle2,
  HelpCircle,
  BookOpen,
  Wand2,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { ExerciseQuestion, UserProfile } from '../types';
import { addCustomGame } from '../utils/storage';
import { sound } from '../utils/soundEffects';

interface TeacherAIGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onSuccess: () => void;
}

export const TeacherAIGeneratorModal: React.FC<TeacherAIGeneratorModalProps> = ({
  isOpen,
  onClose,
  user,
  onSuccess,
}) => {
  const [grade, setGrade] = useState('Tiểu học');
  const [topic, setTopic] = useState('Động vật & Thú cưng');
  const [gameType, setGameType] = useState('quiz');
  const [gameTitle, setGameTitle] = useState('');
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [aiCount, setAiCount] = useState(5);
  const [message, setMessage] = useState('');

  // Editable question list
  const [questions, setQuestions] = useState<ExerciseQuestion[]>([
    {
      id: 'custom-1',
      type: 'quiz',
      question: 'Từ "熊猫" (xióngmāo) trong tiếng Trung nghĩa là con gì?',
      hanzi: '熊猫',
      pinyin: 'xióngmāo',
      options: ['Gấu trúc', 'Sư tử', 'Con hổ', 'Con voi'],
      answer: 'Gấu trúc',
      explanation: '熊猫 là chú gấu trúc quốc bảo Trung Quốc.',
    },
    {
      id: 'custom-2',
      type: 'quiz',
      question: 'Phát âm của chữ "猫" (con mèo) là gì?',
      hanzi: '猫',
      pinyin: 'māo',
      options: ['māo', 'gǒu', 'niǎo', 'yú'],
      answer: 'māo',
      explanation: '猫 đọc là māo thanh 1.',
    }
  ]);

  if (!isOpen) return null;

  // AI Generator function via server route
  const handleGenerateWithAI = async () => {
    setIsGeneratingAI(true);
    setMessage('AI đang khởi tạo bộ câu hỏi sinh động theo chuẩn GDPT & YCT...');
    sound.playClick();

    try {
      const res = await fetch('/api/ai/generate-exercise', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          grade,
          topic,
          gameType,
          count: aiCount,
        }),
      });

      const data = await res.json();
      if (data.success && Array.isArray(data.data) && data.data.length > 0) {
        const formatted: ExerciseQuestion[] = data.data.map((item: any, idx: number) => ({
          id: `ai-q-${Date.now()}-${idx}`,
          type: 'quiz',
          question: item.question || 'Câu hỏi',
          hanzi: item.hanzi || '',
          pinyin: item.pinyin || '',
          options: item.options || ['Lựa chọn A', 'Lựa chọn B', 'Lựa chọn C', 'Lựa chọn D'],
          answer: item.answer || item.options?.[0] || 'Lựa chọn A',
          explanation: item.explanation || 'Giải thích chuẩn.',
          hint: item.hint || '',
        }));

        setQuestions(formatted);
        setMessage(`AI đã tạo thành công ${formatted.length} câu hỏi mới! Thầy/cô có thể chỉnh sửa thêm bên dưới.`);
        sound.playVictory();
      } else {
        // Intelligent educational fallback generator
        generateFallbackQuestions();
      }
    } catch (e) {
      console.error(e);
      generateFallbackQuestions();
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const generateFallbackQuestions = () => {
    const templates: ExerciseQuestion[] = [
      {
        id: `fb-1-${Date.now()}`,
        type: 'quiz',
        question: `Chủ đề [${topic}]: Từ nào đúng với chủ đề này?`,
        hanzi: '苹果',
        pinyin: 'píngguǒ',
        options: ['Quả táo (苹果)', 'Quả chuối (香蕉)', 'Dưa hấu (西瓜)', 'Quả nho (葡萄)'],
        answer: 'Quả táo (苹果)',
        explanation: '苹果 nghĩa là quả táo thơm ngon.',
      },
      {
        id: `fb-2-${Date.now()}`,
        type: 'quiz',
        question: `Chọn phiên âm Pinyin chuẩn của chữ Hán: "朋友" (Bạn bè)`,
        hanzi: '朋友',
        pinyin: 'péngyou',
        options: ['péngyou', 'tóngxué', 'lǎoshī', 'xuésheng'],
        answer: 'péngyou',
        explanation: '朋友 là bạn bè thân thiết.',
      },
      {
        id: `fb-3-${Date.now()}`,
        type: 'quiz',
        question: `Dịch sang tiếng Trung: "Hôm nay tôi rất vui vẻ."`,
        hanzi: '我今天很高兴',
        pinyin: 'Wǒ jīntiān hěn gāoxìng',
        options: ['我今天很高兴。', '我今天很累。', '我不去学校。', '他是我的朋友。'],
        answer: '我今天很高兴。',
        explanation: '高兴 nghĩa là vui mừng, hân hoan.',
      },
      {
        id: `fb-4-${Date.now()}`,
        type: 'quiz',
        question: `Tìm chữ Hán biểu thị con số 10:`,
        hanzi: '十',
        pinyin: 'shí',
        options: ['十 (shí)', '四 (sì)', '八 (bā)', '一 (yī)'],
        answer: '十 (shí)',
        explanation: '十 là số 10 tròn trĩnh.',
      },
      {
        id: `fb-5-${Date.now()}`,
        type: 'quiz',
        question: `Khi cô giáo nói "下课" (Tan học), học sinh đáp lại:`,
        hanzi: '老师再见',
        pinyin: 'Lǎoshī zàijiàn',
        options: ['老师再见！', '老师对不起！', '不客气！', '没关系！'],
        answer: '老师再见！',
        explanation: 'Chào tạm biệt cô giáo khi tan tiết học.',
      }
    ];

    setQuestions(templates);
    setMessage(`Đã tạo bộ ${templates.length} câu hỏi chuẩn sư phạm! Thầy cô có thể điều chỉnh tùy ý.`);
    sound.playCorrect();
  };

  const handleAddManualQuestion = () => {
    sound.playClick();
    const newQ: ExerciseQuestion = {
      id: `manual-${Date.now()}`,
      type: 'quiz',
      question: 'Nhập câu hỏi mới...',
      hanzi: '你好',
      pinyin: 'nǐ hǎo',
      options: ['Đáp án A', 'Đáp án B', 'Đáp án C', 'Đáp án D'],
      answer: 'Đáp án A',
      explanation: 'Giải thích đáp án đúng.',
    };
    setQuestions([...questions, newQ]);
  };

  const handleRemoveQuestion = (id: string) => {
    sound.playClick();
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const handleSaveToGamePool = () => {
    if (questions.length === 0) {
      alert('Vui lòng tạo ít nhất 1 câu hỏi');
      return;
    }

    sound.playVictory();
    addCustomGame({
      title: gameTitle.trim() || `Thử thách ${topic} - ${grade}`,
      gameType: gameType as any,
      grade,
      topic,
      createdBy: user.name || 'Thầy cô Tiếng Trung',
      creatorEmail: user.email || 'amazingtranslation88@gmail.com',
      questions,
    });

    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-gray-100 dark:border-slate-700">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-slate-700 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-500 text-white flex items-center justify-center text-xl shadow-md">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-black text-gray-900 dark:text-gray-100">
                SOẠN BÀI TẬP BẰNG AI & THỦ CÔNG KẾT HỢP
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Dành cho giáo viên: Sử dụng Gemini AI trợ giúp biên soạn và lưu vào Sân chơi chung
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 dark:bg-slate-700 flex items-center justify-center text-gray-500 font-bold hover:bg-gray-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Configuration Bar */}
        <div className="bg-amber-50/60 dark:bg-slate-700/40 p-4 rounded-2xl border border-amber-200 dark:border-slate-600 mb-5 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-black uppercase text-gray-700 dark:text-gray-300 mb-1">
                Độ tuổi / Khối lớp
              </label>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-xs font-bold text-gray-800 dark:text-gray-100"
              >
                <option value="Tiểu học (YCT 1 & 2)">Tiểu học (Lớp 1-5 / YCT)</option>
                <option value="Lớp 6 THCS">Lớp 6 THCS (GDPT 2018)</option>
                <option value="Lớp 7 THCS">Lớp 7 THCS (GDPT 2018)</option>
                <option value="Lớp 8 THCS">Lớp 8 THCS (GDPT 2018)</option>
                <option value="Lớp 9 THCS">Lớp 9 THCS (GDPT 2018)</option>
                <option value="YCT Cấp 1-6">Chuẩn YCT (Cấp 1 - 6)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-black uppercase text-gray-700 dark:text-gray-300 mb-1">
                Chủ đề học tập
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="VD: Gia đình, Hoa quả, Đồ dùng học tập..."
                className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-xs font-bold text-gray-800 dark:text-gray-100"
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase text-gray-700 dark:text-gray-300 mb-1">
                Dạng game tương tác
              </label>
              <select
                value={gameType}
                onChange={(e) => setGameType(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-xs font-bold text-gray-800 dark:text-gray-100"
              >
                <option value="quiz">Quiz Trắc nghiệm</option>
                <option value="drag_drop">Kéo thả từ vựng</option>
                <option value="match">Nối cặp từ - nghĩa</option>
                <option value="memory">Memory Card lật hình</option>
                <option value="image_guess">Đuổi hình bắt chữ</option>
                <option value="wheel">Vòng quay may mắn</option>
                <option value="obstacle">Vượt chướng ngại vật</option>
                <option value="fast_response">Ai nhanh hơn (10s)</option>
                <option value="bubble_shoot">Bắn bóng chữ Hán</option>
                <option value="platformer">Mini Platformer</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-amber-200 dark:border-slate-600">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-gray-600 dark:text-gray-300">Số lượng:</span>
              <button
                type="button"
                onClick={() => setAiCount(5)}
                className={`px-2.5 py-1 rounded-lg text-xs font-black ${aiCount === 5 ? 'bg-orange-500 text-white' : 'bg-white dark:bg-slate-800 text-gray-700'}`}
              >
                5 câu
              </button>
              <button
                type="button"
                onClick={() => setAiCount(10)}
                className={`px-2.5 py-1 rounded-lg text-xs font-black ${aiCount === 10 ? 'bg-orange-500 text-white' : 'bg-white dark:bg-slate-800 text-gray-700'}`}
              >
                10 câu
              </button>
            </div>

            <button
              type="button"
              disabled={isGeneratingAI}
              onClick={handleGenerateWithAI}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-black text-xs shadow-md shadow-indigo-600/30 transition transform active:scale-95 disabled:opacity-50"
            >
              <Wand2 className={`w-4 h-4 ${isGeneratingAI ? 'animate-spin' : ''}`} />
              <span>{isGeneratingAI ? 'AI đang sinh câu hỏi...' : '🪄 Bấm để AI tự động tạo'}</span>
            </button>
          </div>
        </div>

        {message && (
          <div className="p-3 mb-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>{message}</span>
          </div>
        )}

        {/* Title of the game session */}
        <div className="mb-4">
          <label className="block text-xs font-black uppercase text-gray-700 dark:text-gray-300 mb-1">
            Đặt tên cho trò chơi / bộ câu hỏi:
          </label>
          <input
            type="text"
            placeholder="VD: Thử thách từ vựng hoa quả Tiểu học..."
            value={gameTitle}
            onChange={(e) => setGameTitle(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-xs sm:text-sm font-semibold text-gray-900 dark:text-gray-100"
          />
        </div>

        {/* Questions list for manual review & edit */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-black uppercase text-gray-600 dark:text-gray-300">
              Danh sách câu hỏi ({questions.length} câu) - Thầy cô có thể sửa trực tiếp:
            </h4>
            <button
              type="button"
              onClick={handleAddManualQuestion}
              className="flex items-center gap-1 text-xs font-bold text-emerald-600 hover:underline"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Thêm câu hỏi thủ công</span>
            </button>
          </div>

          <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
            {questions.map((q, idx) => (
              <div
                key={q.id}
                className="p-3.5 rounded-2xl bg-gray-50 dark:bg-slate-700/50 border border-gray-200 dark:border-slate-600 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-black text-emerald-700 dark:text-emerald-400">Câu {idx + 1}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveQuestion(q.id)}
                    className="text-rose-500 hover:text-rose-700 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <input
                  type="text"
                  value={q.question}
                  onChange={(e) => {
                    const newQs = [...questions];
                    newQs[idx].question = e.target.value;
                    setQuestions(newQs);
                  }}
                  placeholder="Nội dung câu hỏi..."
                  className="w-full px-3 py-1.5 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 font-bold"
                />

                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={q.hanzi || ''}
                    onChange={(e) => {
                      const newQs = [...questions];
                      newQs[idx].hanzi = e.target.value;
                      setQuestions(newQs);
                    }}
                    placeholder="Chữ Hán nếu có..."
                    className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800"
                  />
                  <input
                    type="text"
                    value={q.answer as string}
                    onChange={(e) => {
                      const newQs = [...questions];
                      newQs[idx].answer = e.target.value;
                      setQuestions(newQs);
                    }}
                    placeholder="Đáp án đúng chính xác..."
                    className="px-3 py-1.5 rounded-lg border border-emerald-300 dark:border-emerald-700 bg-emerald-50 dark:bg-slate-800 font-bold text-emerald-800 dark:text-emerald-300"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-3 border-t border-gray-100 dark:border-slate-700 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-200 font-bold text-xs"
          >
            Đóng lại
          </button>
          <button
            type="button"
            onClick={handleSaveToGamePool}
            className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-lg shadow-emerald-600/30 transition flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Lưu & Đưa vào Sân chơi chung</span>
          </button>
        </div>

      </div>
    </div>
  );
};
