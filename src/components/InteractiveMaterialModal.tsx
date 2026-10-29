import React, { useState } from 'react';
import {
  X,
  Download,
  Star,
  MessageSquare,
  Volume2,
  FileText,
  Video,
  Presentation,
  File,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  Heart,
  Share2,
  Send,
  BookOpen,
  Search
} from 'lucide-react';
import { LectureMaterial, UserProfile, WordVocabItem } from '../types';
import { sound, speakChinese, speakVietnamese, speakSmart } from '../utils/soundEffects';
import { addComment, voteMaterial, triggerFileDownload } from '../utils/storage';
import { YCT1_WORD_VOCAB_ITEMS } from '../data/yct1Vocabulary';
import confetti from 'canvas-confetti';

interface InteractiveMaterialModalProps {
  isOpen: boolean;
  onClose: () => void;
  material: LectureMaterial | null;
  user: UserProfile;
  onMaterialUpdated?: (updated: LectureMaterial) => void;
}

export const InteractiveMaterialModal: React.FC<InteractiveMaterialModalProps> = ({
  isOpen,
  onClose,
  material,
  user,
  onMaterialUpdated,
}) => {
  const [commentText, setCommentText] = useState('');
  const [ratingStars, setRatingStars] = useState(5);
  const [activeTab, setActiveTab] = useState<'content' | 'vocab' | 'comments'>('content');
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [vocabSearch, setVocabSearch] = useState('');
  const [vocabCategory, setVocabCategory] = useState('Tất cả');
  const [playingText, setPlayingText] = useState<string | null>(null);

  if (!isOpen || !material) return null;

  const avgRating = material.ratings && material.ratings.length > 0
    ? (material.ratings.reduce((a, b) => a + b, 0) / material.ratings.length).toFixed(1)
    : '5.0';

  const isYct1OrFoundation =
    (material.grade && (material.grade.toUpperCase().includes('YCT1') || material.grade.toUpperCase().includes('YCT 1') || material.grade.toUpperCase() === 'YCT' || material.grade.toUpperCase().includes('TIỂU HỌC'))) ||
    (material.title && (material.title.toLowerCase().includes('yct1') || material.title.toLowerCase().includes('yct 1') || material.title.toLowerCase().includes('nền tảng') || material.title.toLowerCase().includes('từ vựng') || material.title.toLowerCase().includes('giáo trình')));

  const rawVocabList: WordVocabItem[] =
    material.vocabularyItems && material.vocabularyItems.length > 0
      ? material.vocabularyItems
      : YCT1_WORD_VOCAB_ITEMS;

  const vocabCategories = ['Tất cả', ...Array.from(new Set(rawVocabList.map((v) => v.category).filter(Boolean) as string[]))];

  const filteredVocabList = rawVocabList.filter((item) => {
    const q = vocabSearch.trim().toLowerCase();
    const matchSearch =
      !q ||
      item.hanzi.toLowerCase().includes(q) ||
      item.pinyin.toLowerCase().includes(q) ||
      item.meaningVi.toLowerCase().includes(q) ||
      (item.exampleSentence && (
        item.exampleSentence.zh.toLowerCase().includes(q) ||
        item.exampleSentence.vi.toLowerCase().includes(q)
      ));
    const matchCat = vocabCategory === 'Tất cả' || item.category === vocabCategory;
    return matchSearch && matchCat;
  });

  const vocabList = rawVocabList;

  const handleSendComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    sound.playClick();
    setIsSubmittingComment(true);

    try {
      const newComment = addComment(
        material.id,
        user.name || 'Người học Tiếng Trung',
        user.avatar || '🐼',
        user.email,
        commentText.trim(),
        ratingStars
      );

      const updatedMat: LectureMaterial = {
        ...material,
        comments: [newComment, ...(material.comments || [])],
        ratings: ratingStars > 0 ? [...(material.ratings || []), ratingStars] : material.ratings
      };

      if (onMaterialUpdated) onMaterialUpdated(updatedMat);
      setCommentText('');
      sound.playVictory();
      confetti({ particleCount: 50, spread: 50, origin: { y: 0.7 } });
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const handleVote = async (star: number) => {
    sound.playClick();
    setRatingStars(star);
    try {
      voteMaterial(material.id, star);
      const newRatings = [...(material.ratings || []), star];
      const updatedMat: LectureMaterial = {
        ...material,
        ratings: newRatings
      };
      if (onMaterialUpdated) onMaterialUpdated(updatedMat);
    } catch {}
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (material.type === 'video' || material.type === 'youtube' || material.type === 'pptx') {
      sound.playWrong();
      return;
    }
    sound.playClick();
    triggerFileDownload(material.title, material.url, material.type);
  };

  const handlePlayWord = (text: string) => {
    sound.playClick();
    setPlayingText(text);
    speakChinese(text, 0.85).finally(() => {
      setPlayingText((prev) => (prev === text ? null : prev));
    });
  };

  const handlePlaySentence = (text: string) => {
    sound.playClick();
    setPlayingText(text);
    speakChinese(text, 0.85).finally(() => {
      setPlayingText((prev) => (prev === text ? null : prev));
    });
  };

  const isWordDoc = material.type === 'word' || material.title.toLowerCase().includes('.doc');
  const isVideo = material.type === 'video' || material.type === 'youtube';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border-2 border-emerald-400/40 overflow-hidden">
        
        {/* Header Bar */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 text-white flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <span className="text-3xl filter drop-shadow">🐼</span>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-[10px] font-black uppercase tracking-wider">
                  {material.type.toUpperCase()}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-amber-950 text-[10px] font-black">
                  {material.grade}
                </span>
                <span className="text-xs font-bold text-emerald-100 flex items-center gap-1">
                  ⭐ {avgRating} ({material.ratings?.length || 1} đánh giá)
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-black truncate mt-0.5 text-white">
                {material.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {material.type !== 'video' && material.type !== 'youtube' && material.type !== 'pptx' ? (
              <button
                onClick={handleDownload}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-black text-xs shadow-md transition active:scale-95"
                title="Tải tệp gốc về máy"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Tải về</span>
              </button>
            ) : (
              <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white/20 text-white font-bold text-[11px]">
                {material.type === 'pptx' ? '📊 PPTX (Chỉ xem)' : '🎬 Video (Chỉ xem)'}
              </span>
            )}
            <button
              onClick={() => { sound.playClick(); onClose(); }}
              className="w-9 h-9 rounded-full bg-black/20 hover:bg-black/40 text-white flex items-center justify-center transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-2 bg-gray-50 dark:bg-slate-700/60 border-b border-gray-100 dark:border-slate-700 shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => { sound.playClick(); setActiveTab('content'); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition flex items-center gap-1.5 ${
                activeTab === 'content'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-gray-600 dark:text-gray-300 hover:text-emerald-600'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Xem trực tiếp</span>
            </button>

            {/* Mục Từ Vựng & Đặt Câu Giao Tiếp Thực Tế */}
            <button
              onClick={() => { sound.playClick(); setActiveTab('vocab'); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition flex items-center gap-1.5 ${
                activeTab === 'vocab'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-gray-600 dark:text-gray-300 hover:text-emerald-600'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Từ vựng & Đặt câu ({vocabList.length})</span>
            </button>

            <button
              onClick={() => { sound.playClick(); setActiveTab('comments'); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition flex items-center gap-1.5 ${
                activeTab === 'comments'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-gray-600 dark:text-gray-300 hover:text-emerald-600'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Bình luận ({material.comments?.length || 0})</span>
            </button>
          </div>

          {material.type !== 'video' && material.type !== 'youtube' && material.type !== 'pptx' && (
            <button
              onClick={handleDownload}
              className="sm:hidden p-1.5 rounded-xl bg-amber-400 text-amber-950 font-black text-xs"
              title="Tải về"
            >
              <Download className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* TAB 1: NỘI DUNG TƯƠNG TÁC TRỰC TIẾP */}
          {activeTab === 'content' && (
            <div className="space-y-4 animate-in fade-in">
              
              {/* If Video: Render native HTML5 video or YouTube iframe */}
              {isVideo ? (
                <div className="rounded-2xl overflow-hidden bg-black aspect-video flex items-center justify-center shadow-lg border border-gray-200 dark:border-slate-700">
                  {material.url.includes('youtube.com') || material.url.includes('youtu.be') ? (
                    <iframe
                      src={material.url.replace('watch?v=', 'embed/')}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={material.title}
                    />
                  ) : (
                    <video
                      controls
                      autoPlay={false}
                      className="w-full h-full object-contain"
                      src={material.url}
                    >
                      Trình duyệt của bạn không hỗ trợ thẻ video.
                    </video>
                  )}
                </div>
              ) : (material.type === 'image' || /\.(png|jpg|jpeg|webp|gif|svg)$/i.test(material.url)) ? (
                /* High Resolution Image / Infographic Viewer */
                <div className="rounded-2xl overflow-hidden bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 p-4 text-center">
                  <img
                    src={material.url}
                    alt={material.title}
                    className="max-h-[500px] w-auto max-w-full mx-auto rounded-xl object-contain shadow-md"
                  />
                  <div className="mt-3 flex items-center justify-center gap-2">
                    <span className="text-xs font-bold text-gray-500">Ảnh học liệu số độ nét cao</span>
                    <a
                      href={material.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-emerald-600 font-black hover:underline"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Xem toàn màn hình</span>
                    </a>
                  </div>
                </div>
              ) : material.type === 'pdf' ? (
                <div className="rounded-2xl overflow-hidden bg-gray-100 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 h-[500px]">
                  <iframe
                    src={material.url.includes('drive.google.com') ? material.url.replace('/view', '/preview') : material.url}
                    className="w-full h-full"
                    title={material.title}
                  />
                </div>
              ) : (material.type === 'pptx' || material.url.includes('docs.google.com/presentation') || /\.(pptx|ppt)$/i.test(material.url)) ? (
                /* Presentation Slide Viewer */
                <div className="space-y-4">
                  {material.url.includes('docs.google.com/presentation') ? (
                    <div className="rounded-2xl overflow-hidden bg-black aspect-video shadow-lg border border-gray-200 dark:border-slate-700">
                      <iframe
                        src={material.url.replace('/edit', '/embed').replace('/view', '/preview')}
                        className="w-full h-full"
                        allowFullScreen
                        title={material.title}
                      />
                    </div>
                  ) : (
                    <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-500 via-orange-500 to-rose-600 text-white shadow-xl space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black uppercase">
                          📊 Slide Bài Giảng Điện Tử 3D
                        </span>
                        <span className="text-xs font-bold text-amber-100">
                          {material.grade}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-xl sm:text-2xl font-black">{material.title}</h3>
                        <p className="text-xs sm:text-sm text-amber-100 mt-1 leading-relaxed">
                          {material.description}
                        </p>
                      </div>
                      <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-xs space-y-2">
                        <div className="font-black text-amber-200 flex items-center gap-1.5">
                          <Sparkles className="w-4 h-4" />
                          <span>Nội dung bài trình chiếu chính:</span>
                        </div>
                        <ul className="list-disc list-inside space-y-1 text-white/90">
                          <li>Khởi động &amp; Trò chơi phản xạ Hán tự tương tác sinh động</li>
                          <li>Hệ thống phát âm Pinyin chuẩn Bắc Kinh kèm tranh vẽ minh họa</li>
                          <li>Bài hội thoại mẫu theo chủ đề đời sống và trường lớp</li>
                          <li>Hệ thống câu hỏi củng cố và trò chơi đánh giá cuối bài</li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              ) : isWordDoc || material.title.toLowerCase().includes('yct') || material.title.toLowerCase().includes('giáo trình') ? (
                /* Rich Interactive Word Document & Textbook Reader */
                <div className="space-y-5">
                  <div className="p-5 sm:p-6 rounded-3xl bg-amber-50/70 dark:bg-slate-700/60 border-2 border-amber-200 dark:border-slate-600 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-amber-200 dark:border-slate-600">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center text-xl font-black">
                          📘
                        </div>
                        <div>
                          <h4 className="text-base font-black text-gray-900 dark:text-gray-100">
                            GIÁO TRÌNH TIẾNG TRUNG &amp; BÀI TẬP HOẠT ĐỘNG TRỰC QUAN
                          </h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Hệ thống đã đồng bộ toàn bộ bài đọc, từ vựng trọng tâm và bài tập thực hành
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => { sound.playClick(); setActiveTab('vocab'); }}
                        className="self-start sm:self-center px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition"
                      >
                        Bảng {vocabList.length} từ vựng ➔
                      </button>
                    </div>

                    {/* Trích đoạn giáo trình chuẩn */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-800 border border-amber-200/80 dark:border-slate-600 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                          <span>📖</span>
                          <span>BÀI KHÓA GIÁO TRÌNH &amp; HỘI THOẠI MẪU:</span>
                        </span>
                        <button
                          onClick={() => handlePlaySentence('你好！老师好！我们一起快乐学中文。')}
                          className="px-2.5 py-1 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center gap-1 transition"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>Nghe bài đọc</span>
                        </button>
                      </div>

                      <div className="space-y-2 text-xs sm:text-sm bg-emerald-50/50 dark:bg-slate-700/50 p-3.5 rounded-xl border border-emerald-100 dark:border-slate-600">
                        <div className="font-bold text-gray-900 dark:text-gray-100 font-serif text-base">
                          你好！莲老师好！
                        </div>
                        <div className="text-amber-600 dark:text-amber-400 font-semibold text-xs">
                          Nǐ hǎo! Lián lǎoshī hǎo!
                        </div>
                        <div className="text-gray-600 dark:text-gray-300 text-xs">
                          👉 Em chào cô giáo Liên ạ!
                        </div>

                        <div className="pt-2 border-t border-emerald-100 dark:border-slate-600 font-bold text-gray-900 dark:text-gray-100 font-serif text-base">
                          同学们好！今天我们一起学习YCT第一课。
                        </div>
                        <div className="text-amber-600 dark:text-amber-400 font-semibold text-xs">
                          Tóngxuémen hǎo! Jīntiān wǒmen yìqǐ xuéxí YCT dì-yī kè.
                        </div>
                        <div className="text-gray-600 dark:text-gray-300 text-xs">
                          👉 Chào các em học sinh! Hôm nay chúng ta cùng học Bài 1 YCT nhé.
                        </div>
                      </div>

                      {material.wordContent && (
                        <div className="mt-3 p-3 rounded-xl bg-gray-50 dark:bg-slate-700 text-xs text-gray-700 dark:text-gray-300 italic">
                          "{material.wordContent}"
                        </div>
                      )}
                    </div>

                    {/* Hoạt động bài tập thực hành tương tác */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-800 border border-amber-200/80 dark:border-slate-600 space-y-3">
                      <span className="text-xs font-black uppercase tracking-wider text-orange-600 dark:text-orange-400 flex items-center gap-1.5">
                        <span>🎯</span>
                        <span>HOẠT ĐỘNG BÀI TẬP YCT1 THỰC HÀNH TẠI CHỖ:</span>
                      </span>

                      <div className="space-y-2.5 text-xs">
                        <div className="p-3 rounded-xl bg-orange-50/60 dark:bg-slate-700/50 border border-orange-200/60 dark:border-slate-600">
                          <p className="font-bold text-gray-800 dark:text-gray-100 mb-1.5">
                            Câu 1: Khi gặp cô giáo vào buổi sáng, câu chào lễ phép chuẩn nhất là gì?
                          </p>
                          <div className="grid grid-cols-2 gap-2 font-semibold">
                            <button
                              onClick={() => { sound.playWrong(); alert('Chưa chính xác! Chữ 您 thể hiện sự kính trọng với thầy cô.'); }}
                              className="py-1.5 px-3 rounded-lg bg-white dark:bg-slate-800 border border-gray-200 text-left hover:bg-gray-100"
                            >
                              A. 你好 (Nǐ hǎo)
                            </button>
                            <button
                              onClick={() => { sound.playVictory(); confetti({ particleCount: 40 }); alert('Chính xác 100%! 您好 (Nín hǎo) là lời chào kính trọng lễ phép.'); }}
                              className="py-1.5 px-3 rounded-lg bg-emerald-100 text-emerald-800 border border-emerald-300 text-left font-bold"
                            >
                              B. 您好 (Nín hǎo) ⭐
                            </button>
                          </div>
                        </div>

                        <div className="p-3 rounded-xl bg-blue-50/60 dark:bg-slate-700/50 border border-blue-200/60 dark:border-slate-600">
                          <p className="font-bold text-gray-800 dark:text-gray-100 mb-1.5">
                            Câu 2: Từ "谢谢" (Xièxie) mang ý nghĩa gì?
                          </p>
                          <div className="grid grid-cols-2 gap-2 font-semibold">
                            <button
                              onClick={() => { sound.playVictory(); confetti({ particleCount: 40 }); alert('Tuyệt vời! 谢谢 nghĩa là Cảm ơn.'); }}
                              className="py-1.5 px-3 rounded-lg bg-emerald-100 text-emerald-800 border border-emerald-300 text-left font-bold"
                            >
                              A. Cảm ơn ⭐
                            </button>
                            <button
                              onClick={() => { sound.playWrong(); alert('Chưa đúng! 再见 mới là Tạm biệt.'); }}
                              className="py-1.5 px-3 rounded-lg bg-white dark:bg-slate-800 border border-gray-200 text-left hover:bg-gray-100"
                            >
                              B. Tạm biệt
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              ) : (
                /* General Document / Web Link Viewer */
                <div className="p-6 rounded-3xl bg-gray-50 dark:bg-slate-700/40 border border-gray-200 dark:border-slate-600 text-center space-y-4">
                  <span className="text-5xl">📄</span>
                  <div>
                    <h4 className="text-base sm:text-lg font-black text-gray-900 dark:text-gray-100">
                      {material.title}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-300 max-w-md mx-auto mt-1">
                      {material.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    <button
                      onClick={() => { sound.playClick(); setActiveTab('vocab'); }}
                      className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-md transition inline-flex items-center gap-2"
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>Xem bảng từ vựng &amp; câu giao tiếp ({vocabList.length})</span>
                    </button>
                    {material.url && (material.url.startsWith('http://') || material.url.startsWith('https://')) && (
                      <a
                        href={material.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs shadow-md transition inline-flex items-center gap-2"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Mở liên kết gốc</span>
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Thông tin học liệu & Tác giả */}
              <div className="p-4 rounded-2xl bg-gray-50 dark:bg-slate-700/40 border border-gray-100 dark:border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <div>
                  <span className="font-extrabold text-gray-500 uppercase text-[10px] block">Người đăng tải:</span>
                  <span className="font-black text-gray-900 dark:text-gray-100 text-sm">
                    {material.authorName}
                  </span>
                  <span className="text-gray-400 ml-1">({material.authorEmail})</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-center px-2 py-1 rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600">
                    <div className="font-black text-emerald-600">{material.views || 0}</div>
                    <div className="text-[10px] text-gray-400">Lượt xem</div>
                  </div>
                  <div className="text-center px-2 py-1 rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600">
                    <div className="font-black text-amber-600">{material.downloads || 0}</div>
                    <div className="text-[10px] text-gray-400">Lượt tải</div>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: MỤC TỪ VỰNG TRỌNG TÂM & ĐẶT CÂU GIAO TIẾP THỰC TẾ (103 TỪ NỀN TẢNG YCT1) */}
          {activeTab === 'vocab' && (
            <div className="space-y-4 animate-in fade-in">
              {/* Header Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-amber-50 dark:from-slate-700/60 dark:to-slate-700/30 border border-emerald-200 dark:border-slate-600 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">📚</span>
                  <div>
                    <h4 className="text-sm sm:text-base font-black text-gray-900 dark:text-gray-100 flex items-center gap-2">
                      <span>CÁC TỪ VỰNG NỀN TẢNG & CÂU GIAO TIẾP CƠ BẢN</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-600 text-white text-[11px] font-black">
                        {rawVocabList.length} từ
                      </span>
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-300 mt-0.5">
                      Đầy đủ 103 từ vựng nền tảng, câu đặt ngắn gọn thực tế, phiên âm Pinyin, nghĩa tiếng Việt và loa đọc chuẩn bản địa.
                    </p>
                  </div>
                </div>

                <div className="text-xs font-black text-emerald-800 dark:text-emerald-300 bg-white dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-emerald-200 dark:border-slate-700 shadow-2xs shrink-0 self-start sm:self-auto">
                  Hiển thị: {filteredVocabList.length} / {rawVocabList.length} từ
                </div>
              </div>

              {/* Search & Category Filter Toolbar */}
              <div className="space-y-2.5 bg-gray-50 dark:bg-slate-700/40 p-3 sm:p-4 rounded-2xl border border-gray-200 dark:border-slate-600">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm từ vựng (chữ Hán, pinyin hoặc nghĩa tiếng Việt)..."
                    value={vocabSearch}
                    onChange={(e) => setVocabSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 text-xs sm:text-sm font-bold text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  />
                  {vocabSearch && (
                    <button
                      onClick={() => setVocabSearch('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400 hover:text-gray-600"
                    >
                      Xóa
                    </button>
                  )}
                </div>

                {/* Categories */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-[11px] font-black uppercase text-gray-500 mr-1">Chủ đề:</span>
                  {vocabCategories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => { sound.playClick(); setVocabCategory(cat); }}
                      className={`px-3 py-1 rounded-xl text-xs font-bold transition ${
                        vocabCategory === cat
                          ? 'bg-emerald-600 text-white shadow-xs font-black'
                          : 'bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-slate-700 hover:bg-emerald-50'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Danh sách từ vựng & câu ví dụ */}
              {filteredVocabList.length === 0 ? (
                <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 text-gray-500">
                  <p className="text-sm font-bold">Không tìm thấy từ vựng nào khớp với từ khóa "{vocabSearch}"</p>
                  <button
                    onClick={() => { setVocabSearch(''); setVocabCategory('Tất cả'); }}
                    className="mt-3 px-4 py-1.5 rounded-xl bg-emerald-600 text-white font-bold text-xs"
                  >
                    Xem tất cả {rawVocabList.length} từ
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {filteredVocabList.map((item, idx) => (
                    <div
                      key={item.id || idx}
                      className="p-4 rounded-2xl bg-white dark:bg-slate-800 border-2 border-emerald-100 dark:border-slate-700 hover:border-emerald-400 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                    >
                      <div>
                        {/* Từ vựng chính (Không có số thứ tự) */}
                        <div className="flex items-start justify-between gap-2 pb-2.5 border-b border-gray-100 dark:border-slate-700">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-2xl font-black font-serif text-gray-900 dark:text-gray-100">
                                {item.hanzi}
                              </span>
                              <span className="text-sm font-extrabold text-rose-600 dark:text-rose-400">
                                {item.pinyin}
                              </span>
                              {item.category && (
                                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-800 dark:bg-slate-700 dark:text-emerald-300 border border-emerald-100 dark:border-slate-600">
                                  {item.category}
                                </span>
                              )}
                            </div>
                            <div className="text-xs font-bold text-gray-700 dark:text-gray-300 mt-1">
                              Nghĩa: <strong className="text-emerald-700 dark:text-emerald-400 font-black">{item.meaningVi}</strong>
                            </div>
                          </div>

                          {/* Nút loa phát âm từ vựng chuẩn bản địa */}
                          <button
                            type="button"
                            onClick={() => handlePlayWord(item.hanzi)}
                            className={`p-2.5 rounded-xl transition shrink-0 ${
                              playingText === item.hanzi
                                ? 'bg-emerald-500 text-white ring-2 ring-emerald-300 shadow-md animate-pulse scale-105'
                                : 'bg-emerald-50 hover:bg-emerald-100 dark:bg-slate-700 text-emerald-700 dark:text-emerald-300 shadow-2xs hover:scale-105'
                            }`}
                            title="Nghe phát âm chuẩn từ này"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Đặt câu giao tiếp thực tế ngắn gọn */}
                        {item.exampleSentence && (
                          <div className="mt-2.5 p-3 rounded-xl bg-gray-50/80 dark:bg-slate-700/50 border border-gray-100 dark:border-slate-600 space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                                💬 Câu giao tiếp thực tế:
                              </span>
                              <button
                                type="button"
                                onClick={() => handlePlaySentence(item.exampleSentence.zh)}
                                className={`p-1.5 rounded-lg transition ${
                                  playingText === item.exampleSentence.zh
                                    ? 'bg-emerald-500 text-white animate-pulse'
                                    : 'hover:bg-emerald-100 text-emerald-600'
                                }`}
                                title="Nghe câu giao tiếp chuẩn người bản địa"
                              >
                                <Volume2 className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <div className="text-sm font-bold font-serif text-gray-900 dark:text-gray-100">
                              {item.exampleSentence.zh}
                            </div>
                            <div className="text-xs text-amber-600 dark:text-amber-400 font-semibold">
                              {item.exampleSentence.pinyin}
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-300">
                              👉 {item.exampleSentence.vi}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: BÌNH LUẬN & ĐÁNH GIÁ VOTE SAO CỦA MỌI TÀI KHOẢN */}
          {activeTab === 'comments' && (
            <div className="space-y-5 animate-in fade-in">
              
              {/* Form gửi đánh giá và bình luận */}
              <form onSubmit={handleSendComment} className="p-4 rounded-2xl bg-gray-50 dark:bg-slate-700/50 border border-gray-200 dark:border-slate-600 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="text-xs font-black uppercase text-gray-700 dark:text-gray-200">
                    Bình luận và Đánh giá học liệu này:
                  </span>

                  {/* Chọn số sao Vote */}
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold text-gray-500 mr-1">Đánh giá sao:</span>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleVote(star)}
                        className={`p-1 transition hover:scale-125 ${
                          star <= ratingStars ? 'text-amber-400 fill-amber-400' : 'text-gray-300'
                        }`}
                      >
                        <Star className={`w-4 h-4 ${star <= ratingStars ? 'fill-amber-400' : ''}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Viết nhận xét của bạn về tài liệu này..."
                    className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  />
                  <button
                    type="submit"
                    disabled={isSubmittingComment || !commentText.trim()}
                    className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-black text-xs flex items-center gap-1.5 shadow-md transition"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Gửi</span>
                  </button>
                </div>
              </form>

              {/* Danh sách bình luận đã có */}
              <div className="space-y-3">
                {material.comments && material.comments.length > 0 ? (
                  material.comments.map((cmt) => (
                    <div
                      key={cmt.id}
                      className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 flex items-start gap-3 shadow-2xs"
                    >
                      <span className="text-2xl shrink-0">{cmt.authorAvatar || '🐼'}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-black text-gray-900 dark:text-gray-100">
                            {cmt.authorName}
                          </span>
                          <span className="text-[10px] text-gray-400">{cmt.createdAt}</span>
                        </div>
                        {cmt.rating && (
                          <div className="text-[11px] text-amber-500 font-bold mt-0.5">
                            {'⭐'.repeat(cmt.rating)}
                          </div>
                        )}
                        <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 mt-1">
                          {cmt.content}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-xs text-gray-400">
                    Chưa có bình luận nào. Hãy là người đầu tiên bình luận và chia sẻ cảm nghĩ nhé!
                  </div>
                )}
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
