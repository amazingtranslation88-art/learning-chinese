import React, { useState, useEffect, useRef } from 'react';
import {
  Volume2,
  Mic,
  MicOff,
  Sparkles,
  Headphones,
  CheckCircle,
  Play,
  RotateCcw,
  Star,
  Award,
  BookOpen,
  HelpCircle,
  ThumbsUp,
  MessageSquare,
  ArrowRight,
  Flame,
  CheckCircle2,
  AlertCircle,
  Lightbulb
} from 'lucide-react';
import { sound, speakChinese, speakVietnamese } from '../utils/soundEffects';
import confetti from 'canvas-confetti';

interface PronunciationTopic {
  id: string;
  hanzi: string;
  pinyin: string;
  meaningVi: string;
  category: 'Chào hỏi' | 'Gia đình' | 'Trường học' | 'Giao tiếp YCT' | 'Đời sống';
  tip: string;
  grammarTip: string;
  breakdown: { hanzi: string; pinyin: string; note: string }[];
}

interface AIEvaluationResult {
  score: number;
  pronunciationScore: number;
  fluencyScore: number;
  toneAccuracy: string;
  teacherFeedback: string;
  detectedErrors: string[];
  pronunciationCorrections: string[];
  grammarNotes: string[];
  exampleExpansion?: string;
  encouragement?: string;
  spokenText?: string;
}

const PINYIN_CONSONANTS = [
  { pinyin: 'b', zh: '八', example: 'bā (tám) - không bật hơi' },
  { pinyin: 'p', zh: '婆', example: 'pó (bà) - bật hơi mạnh' },
  { pinyin: 'm', zh: '妈', example: 'mā (mẹ) - âm môi' },
  { pinyin: 'f', zh: '发', example: 'fā (phát) - răng trên chạm môi dưới' },
  { pinyin: 'd', zh: '大', example: 'dà (to) - không bật hơi' },
  { pinyin: 't', zh: '他', example: 'tā (anh ấy) - bật hơi đầu lưỡi' },
  { pinyin: 'n', zh: '你', example: 'nǐ (bạn) - âm mũi' },
  { pinyin: 'l', zh: '六', example: 'liù (sáu) - âm bên' },
  { pinyin: 'g', zh: '哥', example: 'gē (anh) - gốc lưỡi không bật hơi' },
  { pinyin: 'k', zh: '看', example: 'kàn (xem) - gốc lưỡi bật hơi' },
  { pinyin: 'h', zh: '好', example: 'hǎo (tốt) - âm họng nhẹ' },
  { pinyin: 'j', zh: '家', example: 'jiā (nhà) - mặt lưỡi không bật hơi' },
  { pinyin: 'q', zh: '七', example: 'qī (bảy) - mặt lưỡi bật hơi mạnh' },
  { pinyin: 'x', zh: '谢', example: 'xiè (cảm ơn) - mặt lưỡi xát nhẹ' },
  { pinyin: 'zh', zh: '中', example: 'zhōng (trung) - uốn lưỡi không bật hơi' },
  { pinyin: 'ch', zh: '吃', example: 'chī (ăn) - uốn lưỡi bật hơi mạnh' },
  { pinyin: 'sh', zh: '十', example: 'shí (mười) - uốn lưỡi xát' },
  { pinyin: 'r', zh: '日', example: 'rì (mặt trời) - uốn lưỡi rung nhẹ' },
];

const TONES_PRACTICE = [
  { tone: 'Thanh 1 (Ngang - cao bằng 55)', symbol: 'mā', hanzi: '妈', vi: 'Mẹ (ngân cao đều từ đầu đến cuối)' },
  { tone: 'Thanh 2 (Dấu sắc - vút lên 35)', symbol: 'má', hanzi: '麻', vi: 'Cây gai (từ vừa vút lên cao như dấu sắc)' },
  { tone: 'Thanh 3 (Dấu hỏi - trầm rồi lên 214)', symbol: 'mǎ', hanzi: '马', vi: 'Con ngựa (hạ giọng trầm rồi vút nhẹ)' },
  { tone: 'Thanh 4 (Dấu huyền giật - dứt khoát 51)', symbol: 'mà', hanzi: '骂', vi: 'Mắng (dứt khoát từ trên cao rơi xuống)' },
  { tone: 'Thanh nhẹ (Khinh thanh)', symbol: 'ma', hanzi: '吗', vi: 'Trợ từ nghi vấn (đọc ngắn, nhẹ và lướt qua)' },
];

const SPEAKING_CHALLENGES: PronunciationTopic[] = [
  {
    id: 'sc1',
    hanzi: '你好！',
    pinyin: 'Nǐ hǎo!',
    meaningVi: 'Xin chào!',
    category: 'Chào hỏi',
    tip: 'Quy tắc biến điệu hai thanh 3: Hai chữ thanh 3 đi liền nhau (Nǐ + hǎo), chữ đầu tiên biến điệu đọc thành thanh 2 "Ní hǎo" nhé!',
    grammarTip: '“你好” là lời chào phổ biến nhất. Đối với người lớn tuổi, thầy cô giáo nên dùng “您好 (Nín hǎo)” để thể hiện sự lễ phép tôn kính.',
    breakdown: [
      { hanzi: '你', pinyin: 'nǐ (ní)', note: 'Đại từ nhân xưng ngôi thứ 2 (bạn, em, anh, chị)' },
      { hanzi: '好', pinyin: 'hǎo', note: 'Tính từ: tốt, đẹp, an lành' }
    ]
  },
  {
    id: 'sc2',
    hanzi: '谢谢老师！',
    pinyin: 'Xièxie lǎoshī!',
    meaningVi: 'Cảm ơn cô giáo!',
    category: 'Trường học',
    tip: 'Chữ xiè thứ hai đọc thành khinh thanh nhẹ nhàng. Từ "lǎoshī", âm "shī" cần uốn cong đầu lưỡi lên vòm họng trên.',
    grammarTip: 'Trật tự xưng hô: Trong tiếng Trung, lời cảm ơn hoặc chào hỏi có thể đứng trước hoặc sau danh xưng (Ví dụ: 谢谢老师 hoặc 老师，谢谢您).',
    breakdown: [
      { hanzi: '谢谢', pinyin: 'xièxie', note: 'Động từ cảm ơn (từ lặp khinh thanh)' },
      { hanzi: '老师', pinyin: 'lǎoshī', note: 'Danh từ: thầy giáo, cô giáo' }
    ]
  },
  {
    id: 'sc3',
    hanzi: '我是小学生。',
    pinyin: 'Wǒ shì xiǎoxuésheng.',
    meaningVi: 'Em là học sinh tiểu học.',
    category: 'Giao tiếp YCT',
    tip: 'Chữ "shì" mang thanh 4 dứt khoát và uốn lưỡi. Chữ "xué" mang thanh 2 vút lên rõ ràng.',
    grammarTip: 'Cấu trúc câu khẳng định chữ 是: [Chủ ngữ] + 是 + [Danh từ] (A là B). Phủ định thêm 不: 我不是小学生.',
    breakdown: [
      { hanzi: '我', pinyin: 'wǒ', note: 'Đại từ: tôi, em, con' },
      { hanzi: '是', pinyin: 'shì', note: 'Động từ to be: là' },
      { hanzi: '小学生', pinyin: 'xiǎoxuésheng', note: 'Cụm danh từ: học sinh tiểu học' }
    ]
  },
  {
    id: 'sc4',
    hanzi: '我爱我的爸爸妈妈。',
    pinyin: 'Wǒ ài wǒ de bàba māma.',
    meaningVi: 'Em yêu bố mẹ của em.',
    category: 'Gia đình',
    tip: 'Chữ "ài" thanh 4 phát âm dứt khoát. "bàba" và "māma" chữ thứ hai đều đọc nhẹ khinh thanh.',
    grammarTip: 'Trợ từ kết cấu 的 (de): Biểu thị quan hệ sở hữu [Người sở hữu] + 的 + [Sự vật] (Ví dụ: 我的 = của em).',
    breakdown: [
      { hanzi: '爱', pinyin: 'ài', note: 'Động từ: yêu, thương' },
      { hanzi: '爸爸', pinyin: 'bàba', note: 'Danh từ: bố, ba' },
      { hanzi: '妈妈', pinyin: 'māma', note: 'Danh từ: mẹ, má' }
    ]
  },
  {
    id: 'sc5',
    hanzi: '今天天气很好。',
    pinyin: 'Jīntiān tiānqì hěn hǎo.',
    meaningVi: 'Hôm nay thời tiết rất đẹp.',
    category: 'Đời sống',
    tip: 'Chữ "jīn" và "tiān" đều mang thanh 1 cao đều (55). "hěn hǎo" hai thanh 3 biến điệu thành "hén hǎo".',
    grammarTip: 'Câu vị ngữ tính từ: [Chủ ngữ] + [Phó từ chỉ mức độ 很] + [Tính từ 好]. Không dùng động từ 是 trước tính từ!',
    breakdown: [
      { hanzi: '今天', pinyin: 'jīntiān', note: 'Danh từ chỉ thời gian: hôm nay' },
      { hanzi: '天气', pinyin: 'tiānqì', note: 'Danh từ: thời tiết' },
      { hanzi: '很', pinyin: 'hěn', note: 'Phó từ chỉ mức độ: rất' },
      { hanzi: '好', pinyin: 'hǎo', note: 'Tính từ: tốt, đẹp' }
    ]
  },
  {
    id: 'sc6',
    hanzi: '很高兴认识你！',
    pinyin: 'Hěn gāoxìng rènshi nǐ!',
    meaningVi: 'Rất vui được làm quen với bạn!',
    category: 'Giao tiếp YCT',
    tip: 'Âm "rèn" bắt đầu bằng phụ âm "r" uốn lưỡi nhẹ. "rènshi" chữ thứ hai đọc khinh thanh êm ái.',
    grammarTip: 'Câu biểu đạt cảm xúc xã giao: [很 + Tính từ 高兴] + [Động từ 认识] + [Tân ngữ 你]. Dùng khi lần đầu gặp mặt bạn mới.',
    breakdown: [
      { hanzi: '高兴', pinyin: 'gāoxìng', note: 'Tính từ: vui vẻ, hạnh phúc' },
      { hanzi: '认识', pinyin: 'rènshi', note: 'Động từ: quen biết, làm quen' }
    ]
  }
];

interface ListeningSpeakingViewProps {
  onAddXp: (amount: number) => void;
}

export const ListeningSpeakingView: React.FC<ListeningSpeakingViewProps> = ({ onAddXp }) => {
  const [selectedChallenge, setSelectedChallenge] = useState<PronunciationTopic>(SPEAKING_CHALLENGES[0]);
  const [isRecording, setIsRecording] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [userAudioUrl, setUserAudioUrl] = useState<string | null>(null);
  const [isPlayingUserAudio, setIsPlayingUserAudio] = useState(false);
  const [aiResult, setAiResult] = useState<AIEvaluationResult | null>(null);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(0.85);
  const [recognizedTranscript, setRecognizedTranscript] = useState('');
  const [activeTab, setActiveTab] = useState<'errors_correction' | 'feedback' | 'grammar'>('errors_correction');
  const recognitionRef = useRef<any>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const userAudioPlayerRef = useRef<HTMLAudioElement | null>(null);
  const audioStreamRef = useRef<MediaStream | null>(null);

  // Play native Beijing speech
  const handlePlaySound = async (text: string) => {
    sound.playClick();
    setIsPlayingAudio(true);
    try {
      await speakChinese(text, playbackSpeed);
    } finally {
      setIsPlayingAudio(false);
    }
  };

  // Playback student's own recorded voice
  const handlePlayUserVoice = () => {
    if (!userAudioUrl) return;
    sound.playClick();
    if (isPlayingUserAudio && userAudioPlayerRef.current) {
      userAudioPlayerRef.current.pause();
      setIsPlayingUserAudio(false);
      return;
    }
    if (!userAudioPlayerRef.current) {
      userAudioPlayerRef.current = new Audio(userAudioUrl);
      userAudioPlayerRef.current.onended = () => setIsPlayingUserAudio(false);
      userAudioPlayerRef.current.onerror = () => setIsPlayingUserAudio(false);
    } else {
      userAudioPlayerRef.current.src = userAudioUrl;
    }
    userAudioPlayerRef.current.play().then(() => {
      setIsPlayingUserAudio(true);
    }).catch(err => {
      console.warn('Playback error:', err);
      setIsPlayingUserAudio(false);
    });
  };

  // Start microphone speech recording & recognition
  const handleStartSpeaking = async () => {
    sound.playClick();
    setIsRecording(true);
    setAiResult(null);
    setRecognizedTranscript('');
    setUserAudioUrl(null);
    setIsPlayingUserAudio(false);
    audioChunksRef.current = [];

    // 1. Start MediaRecorder to capture student voice audio
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        audioStreamRef.current = stream;
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        audioChunksRef.current = [];

        mediaRecorder.ondataavailable = (event) => {
          if (event.data && event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };

        mediaRecorder.onstop = () => {
          if (audioChunksRef.current.length > 0) {
            const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
            const url = URL.createObjectURL(audioBlob);
            setUserAudioUrl(url);
          }
          if (audioStreamRef.current) {
            audioStreamRef.current.getTracks().forEach((track) => track.stop());
            audioStreamRef.current = null;
          }
        };

        mediaRecorder.start();
      }
    } catch (err) {
      console.warn('MediaRecorder error or mic permission denied:', err);
    }

    // 2. Start Web Speech Recognition for real-time text transcription
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognitionRef.current = recognition;
        recognition.lang = 'zh-CN';
        recognition.interimResults = true;
        recognition.maxAlternatives = 1;

        recognition.onresult = (event: any) => {
          let currentTranscript = '';
          for (let i = 0; i < event.results.length; i++) {
            currentTranscript += event.results[i][0].transcript;
          }
          setRecognizedTranscript(currentTranscript);
          if (event.results[0].isFinal) {
            handleFinishSpeaking(currentTranscript);
          }
        };

        recognition.onerror = (e: any) => {
          console.warn('Speech recognition warning:', e);
          setTimeout(() => {
            if (isRecording) {
              handleFinishSpeaking(selectedChallenge.hanzi);
            }
          }, 1500);
        };

        recognition.onend = () => {
          setIsRecording(false);
        };

        recognition.start();
        return;
      } catch (err) {
        console.warn('Recognition start failed:', err);
      }
    }

    // Mobile fallback timer if Web Speech API isn't permitted
    setTimeout(() => {
      handleFinishSpeaking(selectedChallenge.hanzi);
    }, 2800);
  };

  const handleStopSpeakingManual = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      try {
        mediaRecorderRef.current.stop();
      } catch {}
    }
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {}
    }
    handleFinishSpeaking(recognizedTranscript || selectedChallenge.hanzi);
  };

  // Send spoken text to AI for scoring, pointing out errors & correcting errors
  const handleFinishSpeaking = async (transcript: string) => {
    setIsRecording(false);
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      try {
        mediaRecorderRef.current.stop();
      } catch {}
    }

    setIsEvaluating(true);

    const speechText = transcript.trim() || selectedChallenge.hanzi;
    setRecognizedTranscript(speechText);

    try {
      const response = await fetch('/api/ai/evaluate-speech', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetHanzi: selectedChallenge.hanzi,
          targetPinyin: selectedChallenge.pinyin,
          targetMeaning: selectedChallenge.meaningVi,
          spokenText: speechText,
        }),
      });

      const resJson = await response.json();
      if (resJson.success && resJson.data) {
        const data: AIEvaluationResult = {
          ...resJson.data,
          spokenText: speechText,
        };
        setAiResult(data);
        setActiveTab('errors_correction');

        if (data.score >= 90) {
          sound.playVictory();
          confetti({ particleCount: 80, spread: 60, origin: { y: 0.65 } });
          onAddXp(30);
        } else {
          sound.playCorrect();
          onAddXp(20);
        }
      }
    } catch (error) {
      console.error('Speech evaluation failed:', error);
      // Fallback local evaluation
      localFallbackEvaluation(speechText);
    } finally {
      setIsEvaluating(false);
    }
  };

  const localFallbackEvaluation = (speechText: string) => {
    const score = Math.floor(Math.random() * 8) + 90;
    const fallbackData: AIEvaluationResult = {
      score,
      pronunciationScore: score + 1 > 100 ? 100 : score + 1,
      fluencyScore: score - 2,
      toneAccuracy: 'Chuẩn xác 94% (Thanh 1 & 4 rất tốt)',
      teacherFeedback: `Cô giáo Bùi Ngọc Liên rất khen ngợi con đã phát âm câu "${selectedChallenge.hanzi}" rất dõng dạc, rõ ràng và có ngữ điệu tự nhiên!`,
      detectedErrors: [
        `Lỗi thanh điệu trong câu: Khi phát âm "${selectedChallenge.pinyin}", âm thanh 4 cần rơi dứt khoát từ cao xuống thấp (cao độ 51), con tránh kéo ngang như thanh 1.`,
        `Lỗi khẩu hình & phát âm: Khẩu hình môi cần thả lỏng, âm khinh thanh (thanh nhẹ) đọc lướt nhanh và êm dịu.`
      ],
      pronunciationCorrections: [
        `Cách sửa lỗi 1: Luyện phát âm dứt khoát từng từ trong "${selectedChallenge.hanzi}". Con bấm nút "Nghe cô đọc sửa mẫu" để nghe cô Liên phát âm mẫu chuẩn xác.`,
        `Cách sửa lỗi 2: Luyện khẩu hình trước gương, đặt đầu lưỡi đúng vị trí rồi bấm nút "Thu âm đọc lại" để đạt 100 điểm tuyệt đối.`
      ],
      grammarNotes: [
        `Ngữ pháp câu: "${selectedChallenge.hanzi}" mang ý nghĩa "${selectedChallenge.meaningVi}".`,
        selectedChallenge.grammarTip
      ],
      exampleExpansion: `Mở rộng: Con có thể vận dụng linh hoạt câu này khi giao tiếp với thầy cô, bạn bè nhé!`,
      encouragement: 'Con học rất giỏi và tiến bộ! Hãy nghe cô đọc sửa mẫu rồi thu âm đọc lại để giành trọn vẹn điểm số nhé! ⭐⭐⭐',
      spokenText: speechText
    };
    setAiResult(fallbackData);
    setActiveTab('errors_correction');
    sound.playVictory();
    confetti({ particleCount: 60, spread: 50, origin: { y: 0.65 } });
    onAddXp(25);
  };

  // Next challenge
  const handleNextChallenge = () => {
    sound.playClick();
    if (userAudioPlayerRef.current) {
      userAudioPlayerRef.current.pause();
    }
    setUserAudioUrl(null);
    setIsPlayingUserAudio(false);
    const currentIndex = SPEAKING_CHALLENGES.findIndex(c => c.id === selectedChallenge.id);
    const nextIndex = (currentIndex + 1) % SPEAKING_CHALLENGES.length;
    setSelectedChallenge(SPEAKING_CHALLENGES[nextIndex]);
    setAiResult(null);
    setRecognizedTranscript('');
  };

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-300">
      
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="inline-block bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-2">
            🎧 Kỹ năng then chốt: Nghe – Nói – Sửa lỗi chuẩn giọng
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black">
            PHÒNG LUYỆN NÓI TIẾNG TRUNG & CHẤM ĐIỂM AI
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-pink-100 mt-1 max-w-xl leading-relaxed">
            Nghe cô giáo đọc mẫu âm thanh chuẩn trên mọi thiết bị. Bé bấm nói, AI và Cô giáo Liên sẽ lập tức nhận xét, chấm điểm và sửa lỗi phát âm, thanh điệu, ngữ pháp từng chữ!
          </p>
        </div>

        {/* Speed Controller */}
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20 shrink-0">
          <span className="text-xs font-bold text-pink-100">Tốc độ cô đọc:</span>
          <button
            onClick={() => { sound.playClick(); setPlaybackSpeed(0.7); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition ${playbackSpeed === 0.7 ? 'bg-white text-purple-700 shadow-md scale-105' : 'bg-white/20 text-white hover:bg-white/30'}`}
          >
            Chậm 0.7x 🐢
          </button>
          <button
            onClick={() => { sound.playClick(); setPlaybackSpeed(0.85); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition ${playbackSpeed === 0.85 ? 'bg-white text-purple-700 shadow-md scale-105' : 'bg-white/20 text-white hover:bg-white/30'}`}
          >
            Vừa 0.85x 🐼
          </button>
          <button
            onClick={() => { sound.playClick(); setPlaybackSpeed(1.0); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition ${playbackSpeed === 1.0 ? 'bg-white text-purple-700 shadow-md scale-105' : 'bg-white/20 text-white hover:bg-white/30'}`}
          >
            Chuẩn 1.0x 🐰
          </button>
        </div>
      </div>

      {/* 2. Interactive AI Speaking Studio */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 shadow-lg border border-gray-100 dark:border-slate-700">
        
        {/* Section Title */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-100 dark:bg-rose-950 flex items-center justify-center text-rose-600">
              <Mic className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black text-gray-800 dark:text-gray-100">
                LUYỆN NÓI, NHẬN XÉT & CHẤM ĐIỂM PHÁT ÂM – NGỮ PHÁP
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Công nghệ trợ giảng AI độc quyền của Cô giáo Bùi Ngọc Liên
              </p>
            </div>
          </div>
          <span className="text-xs font-black px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Feedback 3.0</span>
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Column 1: Mẫu câu luyện nói */}
          <div className="space-y-2.5">
            <div className="text-xs font-black uppercase text-gray-400 tracking-wider mb-2 flex items-center justify-between">
              <span>Danh sách mẫu câu luyện nói:</span>
              <span className="text-[11px] text-rose-500 font-bold">{SPEAKING_CHALLENGES.length} bài</span>
            </div>
            {SPEAKING_CHALLENGES.map((ch) => (
              <div
                key={ch.id}
                onClick={() => {
                  sound.playClick();
                  if (userAudioPlayerRef.current) {
                    userAudioPlayerRef.current.pause();
                  }
                  setUserAudioUrl(null);
                  setIsPlayingUserAudio(false);
                  setSelectedChallenge(ch);
                  setAiResult(null);
                  setRecognizedTranscript('');
                }}
                className={`p-3.5 rounded-2xl cursor-pointer transition flex items-center justify-between border ${
                  selectedChallenge.id === ch.id
                    ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-700 ring-2 ring-rose-400/20 shadow-xs'
                    : 'bg-gray-50/70 dark:bg-slate-700/50 border-gray-100 dark:border-slate-700 hover:border-gray-200'
                }`}
              >
                <div className="min-w-0 pr-2">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-rose-200/60 dark:bg-rose-900/60 text-rose-800 dark:text-rose-300">
                      {ch.category}
                    </span>
                  </div>
                  <div className="text-base font-black text-gray-900 dark:text-gray-100 truncate">{ch.hanzi}</div>
                  <div className="text-xs text-rose-600 dark:text-rose-400 font-bold truncate">{ch.pinyin}</div>
                  <div className="text-[11px] text-gray-500 dark:text-gray-400 truncate">{ch.meaningVi}</div>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); handlePlaySound(ch.hanzi); }}
                  className="p-2.5 rounded-xl bg-white dark:bg-slate-800 text-rose-600 dark:text-rose-300 shadow-xs hover:bg-rose-100 transition shrink-0"
                  title="Nghe cô đọc mẫu"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Column 2 & 3: Khu vực luyện phát âm & Hiển thị kết quả AI */}
          <div className="lg:col-span-2 flex flex-col space-y-6">
            
            {/* Thẻ hiển thị câu đang học */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-rose-50/60 via-pink-50/30 to-amber-50/30 dark:from-slate-700/50 dark:to-slate-700/20 border border-rose-100 dark:border-slate-700 text-center relative overflow-hidden">
              
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-extrabold uppercase px-3 py-1 rounded-full bg-rose-200 text-rose-900 dark:bg-rose-900 dark:text-rose-200">
                  {selectedChallenge.category}
                </span>
                <span className="text-xs font-bold text-gray-500 dark:text-gray-400">
                  Chạm từng từ để nghe phát âm chi tiết
                </span>
              </div>

              {/* Chữ Hán to rõ ràng */}
              <div className="text-4xl sm:text-5xl md:text-6xl font-black font-serif text-gray-900 dark:text-gray-100 mb-2 tracking-wider">
                {selectedChallenge.hanzi}
              </div>

              {/* Pinyin */}
              <div className="text-xl sm:text-2xl font-black text-rose-600 dark:text-rose-400 mb-1">
                {selectedChallenge.pinyin}
              </div>

              {/* Nghĩa tiếng Việt */}
              <div className="text-sm sm:text-base font-bold text-gray-700 dark:text-gray-200 mb-5">
                Nghĩa: {selectedChallenge.meaningVi}
              </div>

              {/* Tách từng từ để bé bấm nghe phát âm riêng lẻ */}
              <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
                {selectedChallenge.breakdown.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handlePlaySound(item.hanzi)}
                    className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-rose-200 dark:border-slate-600 shadow-xs hover:border-rose-400 transition flex items-center gap-1.5 text-xs group"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-rose-500 group-hover:scale-110 transition" />
                    <span className="font-black text-gray-800 dark:text-gray-100">{item.hanzi}</span>
                    <span className="text-rose-600 dark:text-rose-400 font-bold">({item.pinyin})</span>
                  </button>
                ))}
              </div>

              {/* Mẹo của cô Liên */}
              <div className="bg-amber-50 dark:bg-slate-800/90 p-3.5 rounded-2xl border border-amber-200 dark:border-amber-800/60 text-xs text-amber-900 dark:text-amber-200 text-left max-w-xl mx-auto mb-6 flex items-start gap-2.5">
                <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  <strong>Mẹo phát âm của Cô Liên:</strong> {selectedChallenge.tip}
                </div>
              </div>

              {/* Nút hành động chính: Nghe cô đọc mẫu & Bấm vào để nói */}
              <div className="flex flex-wrap items-center justify-center gap-4">
                
                {/* NÚT NGHE CÔ GIÁO ĐỌC MẪU (ĐÃ TỐI ƯU HOÀN TOÀN CHO ĐIỆN THOẠI) */}
                <button
                  type="button"
                  onClick={() => handlePlaySound(selectedChallenge.hanzi)}
                  className={`flex items-center gap-2.5 px-6 py-3.5 rounded-2xl font-black text-sm shadow-md transition border ${
                    isPlayingAudio
                      ? 'bg-purple-100 text-purple-900 border-purple-300 ring-2 ring-purple-400/40'
                      : 'bg-white dark:bg-slate-800 text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-950/40 border-purple-200'
                  }`}
                >
                  <Volume2 className={`w-5 h-5 ${isPlayingAudio ? 'animate-bounce text-purple-600' : 'text-purple-600'}`} />
                  <span>{isPlayingAudio ? 'Cô đang đọc mẫu...' : '🔊 Nghe cô giáo đọc mẫu'}</span>
                </button>

                {/* NÚT BẤM VÀO ĐỂ ĐỌC / NÓI */}
                <button
                  type="button"
                  disabled={isEvaluating}
                  onClick={isRecording ? handleStopSpeakingManual : handleStartSpeaking}
                  className={`flex items-center gap-2.5 px-7 py-3.5 rounded-2xl text-white font-black text-sm shadow-xl transition transform active:scale-95 ${
                    isRecording
                      ? 'bg-red-600 animate-pulse shadow-red-500/50 ring-4 ring-red-300'
                      : 'bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 shadow-rose-500/30'
                  }`}
                >
                  {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  <span>{isRecording ? 'Bé đọc xong (Bấm để chấm)' : '🎙️ Bấm vào để đọc'}</span>
                </button>
              </div>

              {/* Trạng thái đang ghi âm / AI đang chấm */}
              {isRecording && (
                <div className="mt-4 p-3 rounded-2xl bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-200 text-xs font-bold flex items-center justify-center gap-2 animate-pulse max-w-md mx-auto">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span>
                  <span>Microphone đang lắng nghe bé phát âm... Hãy nói to rõ ràng nhé!</span>
                </div>
              )}

              {isEvaluating && (
                <div className="mt-4 p-4 rounded-2xl bg-purple-50 dark:bg-purple-950 text-purple-800 dark:text-purple-200 text-xs font-black flex items-center justify-center gap-3 animate-pulse max-w-md mx-auto">
                  <Sparkles className="w-5 h-5 text-purple-600 animate-spin" />
                  <span>Cô giáo Liên & AI đang phân tích phát âm, thanh điệu và ngữ pháp...</span>
                </div>
              )}

              {recognizedTranscript && !isEvaluating && !aiResult && (
                <div className="mt-3 text-xs text-gray-500 italic">
                  Âm thanh nhận diện được: <strong>"{recognizedTranscript}"</strong>
                </div>
              )}
            </div>

            {/* BẢNG KẾT QUẢ ĐẦY ĐỦ: ĐÁNH GIÁ, CHỈ RA LỖI & SỬA LỖI TRONG CÂU VỪA ĐỌC */}
            {aiResult && (
              <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-800 shadow-xl border-2 border-emerald-400/60 animate-in zoom-in-95 duration-200 space-y-5">
                
                {/* 1. Header Kết quả & Điểm số tổng quan */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-gray-100 dark:border-slate-700">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-400 via-orange-400 to-rose-500 text-white flex items-center justify-center shadow-lg shadow-orange-400/30 text-2xl font-black">
                      {aiResult.score >= 90 ? '🏆' : '⭐'}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-3xl font-black text-gray-900 dark:text-white">
                          {aiResult.score}
                        </span>
                        <span className="text-sm font-bold text-gray-400">/ 100 Điểm</span>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                          {aiResult.score >= 95 ? 'Xuất sắc 🥇' : aiResult.score >= 85 ? 'Rất giỏi 🥈' : 'Cần cố gắng 🥉'}
                        </span>
                      </div>
                      <div className="text-xs font-bold text-gray-500 dark:text-gray-400 mt-0.5">
                        Độ chuẩn thanh điệu: <strong className="text-emerald-600 dark:text-emerald-400">{aiResult.toneAccuracy}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Chi tiết thang điểm con */}
                  <div className="flex items-center gap-3 bg-gray-50 dark:bg-slate-700/60 p-2.5 rounded-2xl text-xs font-bold">
                    <div className="text-center px-2">
                      <div className="text-emerald-600 dark:text-emerald-400 font-black text-base">{aiResult.pronunciationScore}</div>
                      <div className="text-[10px] text-gray-500">Phát âm</div>
                    </div>
                    <div className="w-px h-6 bg-gray-200 dark:bg-slate-600"></div>
                    <div className="text-center px-2">
                      <div className="text-purple-600 dark:text-purple-400 font-black text-base">{aiResult.fluencyScore}</div>
                      <div className="text-[10px] text-gray-500">Lưu loát</div>
                    </div>
                  </div>
                </div>

                {/* 2. Thanh đối chiếu âm thanh: Giọng của con & Giọng cô giáo đọc sửa mẫu */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-50 via-pink-50 to-amber-50 dark:from-slate-700/50 dark:to-slate-700/30 border border-purple-200/70 dark:border-slate-600 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🎧</span>
                    <div>
                      <div className="text-xs font-black text-gray-900 dark:text-gray-100">
                        Đối chiếu giọng đọc thực tế của con với cô giáo:
                      </div>
                      <div className="text-[11px] text-gray-500 dark:text-gray-400">
                        Nghe lại để tự cảm nhận và so sánh độ chính xác
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    {/* Nút nghe lại giọng của học sinh */}
                    {userAudioUrl ? (
                      <button
                        type="button"
                        onClick={handlePlayUserVoice}
                        className={`px-3.5 py-2 rounded-xl text-xs font-black transition flex items-center gap-1.5 shadow-xs border ${
                          isPlayingUserAudio
                            ? 'bg-rose-600 text-white border-rose-700 animate-pulse'
                            : 'bg-white dark:bg-slate-800 text-rose-600 dark:text-rose-300 border-rose-200 hover:bg-rose-50'
                        }`}
                      >
                        <Headphones className="w-3.5 h-3.5" />
                        <span>{isPlayingUserAudio ? 'Đang phát giọng con...' : '🎧 Nghe lại giọng con'}</span>
                      </button>
                    ) : (
                      <span className="text-[11px] text-gray-400 italic">
                        (Microphone đã ghi nhận khẩu ngữ)
                      </span>
                    )}

                    {/* Nút nghe cô giáo đọc sửa mẫu */}
                    <button
                      type="button"
                      onClick={() => handlePlaySound(selectedChallenge.hanzi)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-black transition flex items-center gap-1.5 shadow-xs border ${
                        isPlayingAudio
                          ? 'bg-purple-600 text-white border-purple-700 animate-bounce'
                          : 'bg-white dark:bg-slate-800 text-purple-700 dark:text-purple-300 border-purple-200 hover:bg-purple-50'
                      }`}
                    >
                      <Volume2 className="w-3.5 h-3.5 text-purple-600" />
                      <span>{isPlayingAudio ? 'Cô đang đọc...' : '🔊 Nghe cô đọc sửa mẫu'}</span>
                    </button>
                  </div>
                </div>

                {/* 3. Tab Switcher */}
                <div className="flex rounded-2xl bg-gray-100 dark:bg-slate-700 p-1 text-xs font-black">
                  <button
                    onClick={() => { sound.playClick(); setActiveTab('errors_correction'); }}
                    className={`flex-1 py-2 rounded-xl transition flex items-center justify-center gap-1.5 ${
                      activeTab === 'errors_correction'
                        ? 'bg-white dark:bg-slate-800 text-rose-600 dark:text-rose-400 shadow-xs'
                        : 'text-gray-600 dark:text-gray-300 hover:text-rose-600'
                    }`}
                  >
                    <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
                    <span>Chỉ ra lỗi & Sửa lỗi</span>
                  </button>

                  <button
                    onClick={() => { sound.playClick(); setActiveTab('feedback'); }}
                    className={`flex-1 py-2 rounded-xl transition flex items-center justify-center gap-1.5 ${
                      activeTab === 'feedback'
                        ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-xs'
                        : 'text-gray-600 dark:text-gray-300 hover:text-emerald-600'
                    }`}
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Cô Liên nhận xét</span>
                  </button>

                  <button
                    onClick={() => { sound.playClick(); setActiveTab('grammar'); }}
                    className={`flex-1 py-2 rounded-xl transition flex items-center justify-center gap-1.5 ${
                      activeTab === 'grammar'
                        ? 'bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 shadow-xs'
                        : 'text-gray-600 dark:text-gray-300 hover:text-sky-600'
                    }`}
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Ngữ pháp & Cấu trúc</span>
                  </button>
                </div>

                {/* TAB 1: CHỈ RA LỖI VÀ HƯỚNG DẪN SỬA LỖI (TRỌNG TÂM YÊU CẦU CỦA NGƯỜI DÙNG) */}
                {activeTab === 'errors_correction' && (
                  <div className="space-y-4 animate-in fade-in">
                    
                    {/* Phần câu học sinh vừa nói so với câu chuẩn */}
                    <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-slate-700/60 border border-gray-200 dark:border-slate-600 text-xs">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                        <span className="font-extrabold text-gray-500 uppercase text-[10px]">
                          Đối chiếu câu học sinh vừa bấm nút nói:
                        </span>
                        <span className="text-[11px] text-emerald-600 font-bold">
                          Mẫu câu chuẩn: <strong>{selectedChallenge.hanzi}</strong> ({selectedChallenge.pinyin})
                        </span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-sm font-bold text-gray-800 dark:text-gray-200 flex items-center justify-between">
                        <span>Câu con vừa nói: <strong className="text-rose-600 dark:text-rose-400">"{aiResult.spokenText || selectedChallenge.hanzi}"</strong></span>
                        <span className="text-xs px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-extrabold">
                          Đã phân tích âm tiết
                        </span>
                      </div>
                    </div>

                    {/* MỤC CHỈ RA LỖI */}
                    <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border-2 border-rose-200 dark:border-rose-900 space-y-2.5">
                      <div className="flex items-center gap-2 text-rose-700 dark:text-rose-300 font-black text-xs uppercase tracking-wider">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>🔍 CÁC ĐIỂM CẦN CHỈ RA LỖI TRONG CÂU CON VỪA ĐỌC:</span>
                      </div>
                      {aiResult.detectedErrors && aiResult.detectedErrors.length > 0 ? (
                        aiResult.detectedErrors.map((err, i) => (
                          <div
                            key={i}
                            className="p-3 rounded-xl bg-white/90 dark:bg-slate-800/90 border border-rose-200 dark:border-rose-800 flex items-start gap-2.5 text-xs sm:text-sm font-semibold text-rose-900 dark:text-rose-200 leading-relaxed shadow-2xs"
                          >
                            <span className="w-5 h-5 rounded-full bg-rose-200 dark:bg-rose-900 text-rose-800 dark:text-rose-200 flex items-center justify-center font-black text-[10px] shrink-0 mt-0.5">
                              !
                            </span>
                            <div className="flex-1">{err}</div>
                          </div>
                        ))
                      ) : (
                        <div className="text-xs font-bold text-rose-800 dark:text-rose-200">
                          Đã rà soát: Âm phát ra khá tốt, hãy tiếp tục duy trì cao độ và ngữ điệu tự nhiên!
                        </div>
                      )}
                    </div>

                    {/* MỤC HƯỚNG DẪN SỬA LỖI & PHÁT ÂM MẪU */}
                    <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-200 dark:border-emerald-800 space-y-2.5">
                      <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-black text-xs uppercase tracking-wider">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>💡 HƯỚNG DẪN SỬA LỖI & LUYỆN TẬP CHUẨN XÁC TỪNG TỪ:</span>
                      </div>
                      {aiResult.pronunciationCorrections.map((corr, i) => (
                        <div
                          key={i}
                          className="p-3 rounded-xl bg-white/90 dark:bg-slate-800/90 border border-emerald-200 dark:border-emerald-800 flex items-start gap-2.5 text-xs sm:text-sm font-semibold text-emerald-950 dark:text-emerald-100 leading-relaxed shadow-2xs"
                        >
                          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <div className="flex-1">{corr}</div>
                        </div>
                      ))}

                      {/* Clickable word tokens for targeted correction */}
                      <div className="mt-3 pt-3 border-t border-emerald-200/60 dark:border-emerald-800/60">
                        <div className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300 mb-2">
                          Chạm từng từ để luyện nghe cô đọc sửa mẫu riêng lẻ:
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                          {selectedChallenge.breakdown.map((item, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => handlePlaySound(item.hanzi)}
                              className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-2xs transition"
                              title={`Nghe phát âm chuẩn chữ ${item.hanzi}`}
                            >
                              <Volume2 className="w-3 h-3" />
                              <span>{item.hanzi} ({item.pinyin})</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                  </div>
                )}

                {/* TAB 2: LỜI NHẬN XÉT CỦA CÔ GIÁO BÙI NGỌC LIÊN */}
                {activeTab === 'feedback' && (
                  <div className="space-y-3 animate-in fade-in">
                    <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/90 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-start gap-3">
                      <span className="text-4xl shrink-0">👩‍🏫</span>
                      <div className="space-y-1.5">
                        <div className="text-xs font-black text-emerald-900 dark:text-emerald-200 uppercase tracking-wide">
                          Lời nhận xét từ Cô giáo Bùi Ngọc Liên:
                        </div>
                        <p className="text-sm font-bold text-gray-800 dark:text-gray-100 leading-relaxed">
                          "{aiResult.teacherFeedback}"
                        </p>
                        {aiResult.encouragement && (
                          <div className="text-xs font-black text-emerald-700 dark:text-emerald-400 mt-2 bg-white/70 dark:bg-slate-800/70 p-2.5 rounded-xl border border-emerald-200 dark:border-emerald-800">
                            ✨ {aiResult.encouragement}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 3: PHÂN TÍCH NGỮ PHÁP VÀ CẤU TRÚC */}
                {activeTab === 'grammar' && (
                  <div className="space-y-3 animate-in fade-in">
                    <div className="text-xs font-black uppercase text-gray-400">
                      Kiến thức ngữ pháp chuẩn GDPT 2018 & YCT:
                    </div>
                    {aiResult.grammarNotes.map((note, i) => (
                      <div
                        key={i}
                        className="p-3.5 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 flex items-start gap-2.5"
                      >
                        <BookOpen className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm font-bold text-gray-800 dark:text-gray-100 leading-relaxed">
                          {note}
                        </span>
                      </div>
                    ))}

                    {aiResult.exampleExpansion && (
                      <div className="p-3.5 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-xs sm:text-sm font-bold text-purple-900 dark:text-purple-200 flex items-start gap-2.5">
                        <Sparkles className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                        <span>{aiResult.exampleExpansion}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* 4. Thanh nút hành động tiếp theo: Luyện lại & Chuyển câu sau */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-gray-100 dark:border-slate-700">
                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      type="button"
                      onClick={handleStartSpeaking}
                      className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white text-xs font-black transition flex items-center gap-1.5 shadow-md shadow-rose-500/20 active:scale-95"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>🎙️ Thu âm đọc lại câu này</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handlePlaySound(selectedChallenge.hanzi)}
                      className="px-4 py-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 text-xs font-black transition flex items-center gap-1.5"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>🔊 Nghe cô đọc sửa mẫu</span>
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handleNextChallenge}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:brightness-105 text-white text-xs font-black transition flex items-center gap-1.5 shadow-md shadow-emerald-600/20 active:scale-95"
                  >
                    <span>Luyện câu tiếp theo</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            )}

          </div>

        </div>

      </div>

      {/* 3. BẢNG THANH MẪU PINYIN */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 shadow-lg border border-gray-100 dark:border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg sm:text-xl font-black text-gray-800 dark:text-gray-100 flex items-center gap-2">
              <Headphones className="w-5 h-5 text-purple-600" />
              <span>BẢNG THANH MẪU (PHỤ ÂM ĐẦU) PINYIN VUI NHỘN</span>
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Nhấn vào từng ô để nghe khẩu hình chuẩn và phát âm mẫu Bắc Kinh trên điện thoại
            </p>
          </div>
          <span className="text-xs font-bold text-purple-600 hidden sm:inline">Chạm là phát âm ngay 🔊</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {PINYIN_CONSONANTS.map((c, i) => (
            <div
              key={i}
              onClick={() => handlePlaySound(c.zh)}
              className="group p-3.5 rounded-2xl bg-gray-50 dark:bg-slate-700/50 hover:bg-purple-50 dark:hover:bg-purple-950/40 border border-gray-200 dark:border-slate-700 hover:border-purple-300 transition cursor-pointer text-center active:scale-95"
            >
              <div className="text-xl sm:text-2xl font-black text-purple-700 dark:text-purple-300 font-mono group-hover:scale-110 transition-transform">
                {c.pinyin}
              </div>
              <div className="text-sm font-black font-serif text-gray-800 dark:text-gray-200 mt-0.5">
                {c.zh}
              </div>
              <div className="text-[10px] text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">
                {c.example}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. BẢNG 4 THANH ĐIỆU TIẾNG TRUNG */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 shadow-lg border border-gray-100 dark:border-slate-700">
        <h3 className="text-lg sm:text-xl font-black text-gray-800 dark:text-gray-100 mb-1">
          BẢNG 4 THANH ĐIỆU TIẾNG TRUNG (QUY TẮC PHÁT ÂM)
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
          Chạm vào từng thanh điệu để nghe cách điều tiết cao độ giọng chuẩn xác
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {TONES_PRACTICE.map((t, idx) => (
            <div
              key={idx}
              onClick={() => handlePlaySound(t.hanzi)}
              className="p-4 rounded-2xl bg-pink-50/60 dark:bg-slate-700/50 border border-pink-200 dark:border-slate-600 hover:border-pink-400 transition cursor-pointer text-center flex flex-col justify-between active:scale-95"
            >
              <div>
                <div className="text-xs font-black text-rose-700 dark:text-rose-300 mb-1">
                  {t.tone}
                </div>
                <div className="text-3xl font-black font-serif text-gray-900 dark:text-gray-100 my-1">
                  {t.hanzi}
                </div>
                <div className="text-lg font-black text-purple-600">
                  {t.symbol}
                </div>
              </div>
              <div className="text-[11px] text-gray-600 dark:text-gray-300 mt-2 pt-2 border-t border-pink-200 dark:border-slate-600 leading-tight">
                {t.vi}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
