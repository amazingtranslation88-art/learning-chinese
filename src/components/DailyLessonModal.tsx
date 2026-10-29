import React, { useState, useEffect } from 'react';
import { Clock, Sparkles, CheckCircle2, Volume2, X, RotateCcw, Award } from 'lucide-react';
import { sound, speakChinese } from '../utils/soundEffects';
import confetti from 'canvas-confetti';

interface DailyLessonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCompleteDaily: () => void;
}

const DAILY_CARDS = [
  { hanzi: '早上好！', pinyin: 'Zǎoshang hǎo!', vi: 'Chào buổi sáng!', tip: 'Chúc bố mẹ và thầy cô buổi sáng an lành' },
  { hanzi: '祝你快乐！', pinyin: 'Zhù nǐ kuàilè!', vi: 'Chúc bạn vui vẻ!', tip: 'Mẫu câu chúc mừng bạn bè' },
  { hanzi: '我喜欢汉语。', pinyin: 'Wǒ xǐhuan hànyǔ.', vi: 'Em rất thích môn Tiếng Trung.', tip: 'Khẩu ngữ biểu thị niềm đam mê học tập' }
];

export const DailyLessonModal: React.FC<DailyLessonModalProps> = ({ isOpen, onClose, onCompleteDaily }) => {
  const [step, setStep] = useState(0);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (!isOpen || isCompleted) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen, isCompleted]);

  if (!isOpen) return null;

  const current = DAILY_CARDS[step];

  const handleNext = () => {
    sound.playClick();
    if (step < DAILY_CARDS.length - 1) {
      setStep(step + 1);
    } else {
      setIsCompleted(true);
      sound.playVictory();
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      onCompleteDaily();
    }
  };

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-gray-100 dark:border-slate-700 text-center">
        
        {/* Top header */}
        <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-slate-700 mb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-500 animate-spin" style={{ animationDuration: '10s' }} />
            <span className="font-black text-sm text-gray-800 dark:text-gray-100 uppercase">
              Mỗi ngày 10 phút ({formatTimer(timeLeft)})
            </span>
          </div>

          <button
            onClick={() => { sound.playClick(); onClose(); }}
            className="w-8 h-8 rounded-full bg-gray-100 dark:bg-slate-700 flex items-center justify-center text-gray-500 font-bold"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {!isCompleted ? (
          <div>
            <div className="text-xs font-bold text-amber-600 mb-2">
              Khẩu ngữ ngày hôm nay ({step + 1}/{DAILY_CARDS.length})
            </div>

            <div className="p-6 rounded-3xl bg-gradient-to-b from-amber-50 to-orange-50 dark:from-slate-700/60 dark:to-slate-700/30 border border-amber-200 dark:border-slate-600 my-4">
              <div className="text-4xl sm:text-5xl font-black font-serif text-gray-900 dark:text-gray-100 mb-2">
                {current.hanzi}
              </div>
              <div className="text-lg font-bold text-amber-600 dark:text-amber-400 mb-1">
                {current.pinyin}
              </div>
              <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                {current.vi}
              </div>
              <div className="mt-3 text-xs text-gray-500 italic">
                💡 {current.tip}
              </div>

              <button
                onClick={() => { sound.playClick(); speakChinese(current.hanzi); }}
                className="mt-4 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-md transition inline-flex items-center gap-2"
              >
                <Volume2 className="w-4 h-4" />
                <span>Nghe đọc mẫu chuẩn</span>
              </button>
            </div>

            <button
              onClick={handleNext}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black text-sm shadow-lg shadow-orange-500/30 transition hover:scale-102"
            >
              {step < DAILY_CARDS.length - 1 ? 'Đã nhớ, tiếp tục câu sau ➔' : 'Hoàn thành thử thách hôm nay! 🎉'}
            </button>
          </div>
        ) : (
          <div className="py-4">
            <span className="text-6xl animate-bounce inline-block mb-3">🌟</span>
            <h3 className="text-2xl font-black text-gray-900 dark:text-gray-100">
              Hoàn thành 10 phút xuất sắc!
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-2">
              Bé đã nhận được <strong className="text-amber-500">+50 XP</strong> và tăng thêm 1 ngày vào chuỗi Streak học chăm!
            </p>

            <button
              onClick={() => { sound.playClick(); onClose(); }}
              className="mt-6 px-8 py-3 rounded-2xl bg-emerald-600 text-white font-black text-xs shadow-md"
            >
              Tiếp tục học vui
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
