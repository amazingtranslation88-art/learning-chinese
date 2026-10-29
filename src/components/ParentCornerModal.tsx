import React from 'react';
import { HeartHandshake, X, BookOpen, Clock, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';
import { sound } from '../utils/soundEffects';

interface ParentCornerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ParentCornerModal: React.FC<ParentCornerModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const tips = [
    {
      title: '1. Thời gian vàng 10 - 15 phút mỗi ngày',
      desc: 'Với học sinh mầm non & tiểu học, sự kiên trì mỗi ngày quan trọng hơn học dồn một buổi dài. Hãy cho con mở app nghe 3 câu khẩu ngữ và chơi 1 mini game vào khung giờ cố định (sau bữa tối hoặc trước khi ngủ).',
      emoji: '⏱️'
    },
    {
      title: '2. Nguyên tắc "Nghe nhiều trước - Bắt chước sau"',
      desc: 'Tiếng Trung là ngôn ngữ thanh điệu (4 thanh). Ba mẹ không biết tiếng Trung vẫn có thể hỗ trợ con bằng cách mở loa to, khuyến khích con nhại lại theo giọng đọc cô Liên và dùng nút Micro để AI chấm điểm.',
      emoji: '🎧'
    },
    {
      title: '3. Khen ngợi và tích lũy phần thưởng nhỏ',
      desc: 'Hệ thống đã tích hợp Level, XP và Kim Cương. Ba mẹ có thể thỏa thuận cùng con: Đạt chuỗi 7 ngày Streak sẽ được thưởng một món đồ chơi hoặc chuyến dã ngoại cuối tuần!',
      emoji: '🎁'
    },
    {
      title: '4. Kết hợp in Flashcard và dán từ vựng trong nhà',
      desc: 'Tải bộ Flashcards in màu tại mục "TÀI LIỆU MIỄN PHÍ" dán vào tủ lạnh, bàn học, cánh cửa để bé nhìn thấy mặt chữ Hán mỗi ngày một cách tự nhiên không gò bó.',
      emoji: '🖼️'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-gray-100 dark:border-slate-700">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-slate-700 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center text-xl">
              👨‍👩‍👧
            </div>
            <div>
              <h3 className="text-lg font-black text-gray-900 dark:text-gray-100">
                GÓC PHỤ HUYNH HỖ TRỢ CON HỌC TIẾNG TRUNG
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Lời khuyên sư phạm từ Cô giáo Bùi Ngọc Liên – Giáo viên Tiếng Trung
              </p>
            </div>
          </div>
          <button
            onClick={() => { sound.playClick(); onClose(); }}
            className="w-8 h-8 rounded-full bg-gray-100 dark:bg-slate-700 flex items-center justify-center text-gray-500 font-bold"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4">
          {tips.map((t, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-gray-50 dark:bg-slate-700/50 border border-gray-100 dark:border-slate-700 flex items-start gap-3"
            >
              <span className="text-3xl shrink-0 mt-0.5">{t.emoji}</span>
              <div>
                <h4 className="text-sm font-black text-gray-900 dark:text-gray-100">{t.title}</h4>
                <p className="text-xs text-gray-600 dark:text-gray-300 mt-1 leading-relaxed">{t.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 rounded-2xl bg-pink-50 dark:bg-slate-700/40 border border-pink-200 dark:border-slate-600 text-xs text-pink-900 dark:text-pink-300">
          💬 <strong>Hotline & Zalo tư vấn giáo trình phụ huynh:</strong> 0976817231 (Cô giáo Bùi Ngọc Liên).
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={() => { sound.playClick(); onClose(); }}
            className="px-6 py-2.5 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-black text-xs shadow-md transition"
          >
            Đã hiểu, cảm ơn cô giáo!
          </button>
        </div>
      </div>
    </div>
  );
};
