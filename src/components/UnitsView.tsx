import React, { useState } from 'react';
import {
  Volume2,
  BookOpen,
  CheckCircle2,
  HelpCircle,
  Download,
  Sparkles,
  ChevronRight,
  ArrowLeft,
  Award,
  FileText,
  RotateCcw,
  Headphones,
  Plus,
  Trash2,
  Edit,
  ExternalLink,
  Video,
  File,
  Image as ImageIcon,
  Globe,
  Youtube,
  ShieldCheck,
  Eye,
  Search
} from 'lucide-react';
import { LearningUnit, ExerciseQuestion, UserProfile, LectureMaterial } from '../types';
import { sound, speakChinese, speakVietnamese, speakSmart } from '../utils/soundEffects';
import { triggerFileDownload, isAuthorizedPublisher, deleteMaterial, incrementDownloads, incrementViews, ADMIN_EMAIL } from '../utils/storage';
import { InteractiveMaterialModal } from './InteractiveMaterialModal';
import confetti from 'canvas-confetti';

interface UnitsViewProps {
  gradeType: 'primary' | 'grade6' | 'grade7' | 'grade8' | 'grade9' | 'yct' | 'hsk';
  units: LearningUnit[];
  user: UserProfile;
  materials?: LectureMaterial[];
  onMaterialsChange?: () => void;
  onOpenUpload?: (presetGrade?: string) => void;
  onOpenEdit?: (mat: LectureMaterial) => void;
  onAddXp: (amount: number) => void;
  bilingualMode?: boolean;
}

export const UnitsView: React.FC<UnitsViewProps> = ({
  gradeType,
  units,
  user,
  materials = [],
  onMaterialsChange,
  onOpenUpload,
  onOpenEdit,
  onAddXp,
}) => {
  const [selectedUnit, setSelectedUnit] = useState<LearningUnit | null>(null);
  const [activeTab, setActiveTab] = useState<'vocab' | 'grammar' | 'dialogue' | 'practice' | 'pdf' | 'resources'>('vocab');
  const [yctFilter, setYctFilter] = useState<number>(1); // Default to YCT1
  const [hskFilter, setHskFilter] = useState<number>(1); // Default to HSK1
  const [selectedInteractiveMaterial, setSelectedInteractiveMaterial] = useState<LectureMaterial | null>(null);

  const canPublish = isAuthorizedPublisher(user);

  // Exercise state
  const [currentExIndex, setCurrentExIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [completedQuiz, setCompletedQuiz] = useState(false);

  const getGradeTitle = () => {
    if (gradeType === 'primary') return { title: 'TIỂU HỌC', sub: 'Chương trình làm quen Tiếng Trung cho học sinh Lớp 1 đến Lớp 5', badge: 'Dành cho Lớp 1 - 5', defaultGrade: 'Tiểu học' };
    if (gradeType === 'grade6') return { title: 'LỚP 6', sub: 'Chương trình chuẩn của Bộ Giáo dục & Đào tạo (GDPT 2018)', badge: 'Lớp 6 THCS', defaultGrade: 'Lớp 6' };
    if (gradeType === 'grade7') return { title: 'LỚP 7', sub: 'Chương trình chuẩn của Bộ Giáo dục & Đào tạo (GDPT 2018)', badge: 'Lớp 7 THCS', defaultGrade: 'Lớp 7' };
    if (gradeType === 'grade8') return { title: 'LỚP 8', sub: 'Chương trình chuẩn của Bộ Giáo dục & Đào tạo (GDPT 2018)', badge: 'Lớp 8 THCS', defaultGrade: 'Lớp 8' };
    if (gradeType === 'grade9') return { title: 'LỚP 9', sub: 'Chương trình chuẩn của Bộ Giáo dục & Đào tạo & Định hướng thi vào 10', badge: 'Lớp 9 THCS', defaultGrade: 'Lớp 9' };
    if (gradeType === 'hsk') return { title: 'CHUẨN HSK (1 – 3) PHIÊN BẢN 3.0', sub: 'Khung tiêu chuẩn mới HSK 3.0 quốc tế: 500 từ HSK1, 772 từ HSK2, 973 từ HSK3', badge: 'HSK1 – HSK3', defaultGrade: `HSK${hskFilter}` };
    return { title: 'CHUẨN YCT (YCT1 – YCT6)', sub: 'Hệ thống bài giảng & luyện thi chứng chỉ quốc tế YCT từ YCT1 đến YCT6', badge: 'YCT1 – YCT6', defaultGrade: `YCT${yctFilter}` };
  };

  const headerInfo = getGradeTitle();

  const displayedUnits = units.filter((u) => {
    if (gradeType === 'yct') {
      return u.yctLevel === yctFilter;
    }
    if (gradeType === 'hsk') {
      return u.hskLevel === hskFilter;
    }
    return true;
  });

  // Filter materials for this section
  const sectionMaterials = materials.filter((m) => {
    const g = (m.grade || '').toUpperCase().trim();
    if (gradeType === 'yct') {
      return (
        g.includes(`YCT${yctFilter}`) ||
        g.includes(`YCT ${yctFilter}`) ||
        g.includes(`CẤP ${yctFilter}`) ||
        g.includes(`CAP ${yctFilter}`) ||
        g === `YCT${yctFilter}` ||
        g === `YCT ${yctFilter}` ||
        (yctFilter === 1 && (g === 'YCT' || g === 'TIỂU HỌC' || g === 'CHUNG'))
      );
    }
    if (gradeType === 'hsk') {
      return (
        g.includes(`HSK${hskFilter}`) ||
        g.includes(`HSK ${hskFilter}`) ||
        g === `HSK${hskFilter}` ||
        g === `HSK ${hskFilter}` ||
        (hskFilter === 1 && (g === 'HSK' || g === 'CHUNG'))
      );
    }
    if (gradeType === 'primary') return g.includes('TIỂU HỌC') || g.includes('LỚP 1') || g.includes('LỚP 2') || g.includes('LỚP 3') || g.includes('LỚP 4') || g.includes('LỚP 5') || g === 'CHUNG';
    if (gradeType === 'grade6') return g.includes('LỚP 6') || g.includes('GRADE 6') || g.includes('GRADE6');
    if (gradeType === 'grade7') return g.includes('LỚP 7') || g.includes('GRADE 7') || g.includes('GRADE7');
    if (gradeType === 'grade8') return g.includes('LỚP 8') || g.includes('GRADE 8') || g.includes('GRADE8');
    if (gradeType === 'grade9') return g.includes('LỚP 9') || g.includes('GRADE 9') || g.includes('GRADE9');
    return false;
  });

  // Materials for the currently selected unit
  const unitMaterials = selectedUnit
    ? materials.filter((m) => {
        const g = (m.grade || '').toUpperCase().trim();
        const matchesGrade = selectedUnit.yctLevel
          ? (g.includes(`YCT${selectedUnit.yctLevel}`) || g.includes(`YCT ${selectedUnit.yctLevel}`) || g === 'YCT' || (selectedUnit.yctLevel === 1 && (g === 'TIỂU HỌC' || g === 'CHUNG')))
          : selectedUnit.hskLevel
          ? (g.includes(`HSK${selectedUnit.hskLevel}`) || g.includes(`HSK ${selectedUnit.hskLevel}`) || g === 'HSK')
          : (gradeType === 'primary' ? g.includes('TIỂU HỌC') : g.includes(headerInfo.defaultGrade.toUpperCase()));
        
        const unitNum = String(selectedUnit.unitNumber);
        const matchesUnit = m.unit && (m.unit.includes(unitNum) || m.unit.toLowerCase().includes(`bài ${unitNum}`) || m.unit.toLowerCase().includes(`unit ${unitNum}`));
        const matchesTitle = m.title.toLowerCase().includes(`unit ${unitNum}`) || m.title.toLowerCase().includes(`bài ${unitNum}`) || m.title.toLowerCase().includes(selectedUnit.titleVi.toLowerCase());
        const isGeneralForLevel = !m.unit || m.unit === 'Chung' || m.unit === 'Tất cả';

        return matchesGrade && (matchesUnit || matchesTitle || isGeneralForLevel);
      })
    : [];

  // All extracted vocabulary from Word documents uploaded for this section/level
  const uploadedWordVocab = materials
    .filter((m) => {
      const g = (m.grade || '').toUpperCase();
      const matchGrade = gradeType === 'yct'
        ? g.includes(`YCT${yctFilter}`) || g.includes(`YCT ${yctFilter}`) || g === 'YCT'
        : gradeType === 'hsk'
        ? g.includes(`HSK${hskFilter}`) || g.includes(`HSK ${hskFilter}`) || g === 'HSK'
        : m.grade === headerInfo.defaultGrade;
      return (m.type === 'word' || (m.vocabularyItems && m.vocabularyItems.length > 0)) && (matchGrade || m.grade === 'Chung');
    })
    .flatMap((m) => m.vocabularyItems || []);

  const handleOpenUnit = (unit: LearningUnit) => {
    sound.playClick();
    setSelectedUnit(unit);
    setActiveTab('vocab');
    setCurrentExIndex(0);
    setSelectedOption(null);
    setShowResult(false);
    setScore(0);
    setCompletedQuiz(false);
  };

  const handlePlayChinese = (text: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    sound.playClick();
    speakChinese(text, 0.8);
  };

  const handlePlayVietnamese = (text: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    sound.playClick();
    speakVietnamese(text);
  };

  const handleAnswerQuestion = (option: string, question: ExerciseQuestion) => {
    if (showResult) return;
    sound.playClick();
    setSelectedOption(option);
    setShowResult(true);

    const correct = option.trim().toLowerCase() === (question.answer as string).trim().toLowerCase();
    setIsCorrect(correct);

    if (correct) {
      sound.playCorrect();
      setScore((prev) => prev + 1);
      onAddXp(20);
    } else {
      sound.playWrong();
    }
  };

  const handleNextQuestion = () => {
    sound.playClick();
    if (!selectedUnit) return;
    if (currentExIndex < selectedUnit.exercises.length - 1) {
      setCurrentExIndex((prev) => prev + 1);
      setSelectedOption(null);
      setShowResult(false);
    } else {
      setCompletedQuiz(true);
      sound.playVictory();
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
      onAddXp(50);
    }
  };

  const handleRestartQuiz = () => {
    sound.playClick();
    setCurrentExIndex(0);
    setSelectedOption(null);
    setShowResult(false);
    setScore(0);
    setCompletedQuiz(false);
  };

  const handleDeleteMaterial = (mat: LectureMaterial, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!canPublish) return;
    if (window.confirm(`Thầy/Cô có chắc chắn muốn xóa tài nguyên "${mat.title}" không?`)) {
      sound.playClick();
      deleteMaterial(mat.id);
      onMaterialsChange?.();
    }
  };

  const handleDownloadMaterial = (mat: LectureMaterial, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (mat.type === 'video' || mat.type === 'youtube') {
      sound.playWrong();
      return;
    }
    sound.playClick();
    incrementDownloads(mat.id);
    triggerFileDownload(mat.title, mat.url, mat.type);
    onMaterialsChange?.();
  };

  const getFormatIcon = (type: string) => {
    switch (type) {
      case 'word':
        return <FileText className="w-5 h-5 text-blue-600" />;
      case 'pdf':
        return <File className="w-5 h-5 text-rose-600" />;
      case 'image':
        return <ImageIcon className="w-5 h-5 text-teal-600" />;
      case 'video':
        return <Video className="w-5 h-5 text-purple-600" />;
      case 'youtube':
        return <Youtube className="w-5 h-5 text-red-600" />;
      case 'drive':
        return <Globe className="w-5 h-5 text-emerald-600" />;
      default:
        return <FileText className="w-5 h-5 text-amber-600" />;
    }
  };

  // 1. Unit List View
  if (!selectedUnit) {
    return (
      <div className="space-y-6 pb-12 animate-in fade-in duration-300">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <span className="inline-block bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-2">
              {headerInfo.badge}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black">
              {headerInfo.title}
            </h2>
            <p className="text-sm sm:text-base text-emerald-100 mt-1 max-w-xl">
              {headerInfo.sub}. Có đủ từ vựng phát âm giọng chuẩn, ngữ pháp, hội thoại và bài tập trắc nghiệm.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20">
              <BookOpen className="w-8 h-8 text-yellow-300" />
              <div className="text-left">
                <div className="text-xs font-bold text-emerald-100">Tổng số bài học</div>
                <div className="text-xl font-black text-white">{displayedUnits.length} Bài học hoàn chỉnh</div>
              </div>
            </div>

            {/* Quick Upload Button for Super Admin */}
            {canPublish && (
              <button
                onClick={() => {
                  sound.playClick();
                  const targetGrade = gradeType === 'yct'
                    ? `YCT${yctFilter}`
                    : gradeType === 'hsk'
                    ? `HSK${hskFilter}`
                    : headerInfo.defaultGrade;
                  onOpenUpload?.(targetGrade);
                }}
                className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-white font-black text-xs sm:text-sm shadow-xl active:scale-95 transition shrink-0"
                title="Đăng tài nguyên mới vào mục này (Dành cho amazingtranslation88@gmail.com)"
              >
                <Plus className="w-4 h-4" />
                <span>Đăng tài nguyên</span>
              </button>
            )}
          </div>
        </div>

        {/* YCT Level Selector (YCT1 to YCT6) - Không có menu Tất cả, giao diện hoạt hình dễ thương */}
        {gradeType === 'yct' && (
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-4 sm:p-5 shadow-sm border-2 border-emerald-200/80 dark:border-slate-700 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-black uppercase text-gray-700 dark:text-gray-300 mr-1 flex items-center gap-1.5">
                <span className="text-xl">🐼</span>
                <span>Cấp độ YCT:</span>
              </span>
              {[1, 2, 3, 4, 5, 6].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => { sound.playClick(); setYctFilter(lvl); }}
                  className={`px-4 py-2 rounded-2xl text-xs font-black transition-all duration-200 ${
                    yctFilter === lvl
                      ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white shadow-md shadow-emerald-600/30 scale-105 ring-2 ring-emerald-300'
                      : 'bg-emerald-50/80 hover:bg-emerald-100 dark:bg-slate-700 text-emerald-900 dark:text-gray-200 border border-emerald-200 dark:border-slate-600'
                  }`}
                >
                  YCT{lvl}
                </button>
              ))}
            </div>

            {canPublish && (
              <button
                onClick={() => {
                  sound.playClick();
                  onOpenUpload?.(`YCT${yctFilter}`);
                }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-black text-xs shadow-md shadow-orange-500/25 transition active:scale-95"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Thêm tài nguyên YCT{yctFilter}</span>
              </button>
            )}
          </div>
        )}

        {/* HSK 3.0 Level Selector (HSK1 to HSK3) - Không có menu Tất cả */}
        {gradeType === 'hsk' && (
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-4 sm:p-5 shadow-sm border-2 border-violet-200/80 dark:border-slate-700 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-black uppercase text-gray-700 dark:text-gray-300 mr-1 flex items-center gap-1.5">
                <span className="text-xl">🎯</span>
                <span>Cấp độ HSK 3.0:</span>
              </span>
              {[
                { lvl: 1, label: 'HSK1 (500 từ)' },
                { lvl: 2, label: 'HSK2 (772 từ)' },
                { lvl: 3, label: 'HSK3 (973 từ)' }
              ].map(({ lvl, label }) => (
                <button
                  key={lvl}
                  onClick={() => { sound.playClick(); setHskFilter(lvl as 1 | 2 | 3); }}
                  className={`px-4 py-2 rounded-2xl text-xs font-black transition-all duration-200 ${
                    hskFilter === lvl
                      ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-md shadow-purple-600/30 scale-105 ring-2 ring-violet-300'
                      : 'bg-violet-50/80 hover:bg-violet-100 dark:bg-slate-700 text-violet-900 dark:text-gray-200 border border-violet-200 dark:border-slate-600'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {canPublish && (
              <button
                onClick={() => {
                  sound.playClick();
                  onOpenUpload?.(`HSK${hskFilter}`);
                }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-gradient-to-r from-violet-600 to-purple-600 hover:brightness-110 text-white font-black text-xs shadow-md transition"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Thêm tài nguyên HSK{hskFilter}</span>
              </button>
            )}
          </div>
        )}

        {/* Section: Uploaded & Shared Materials for this grade / YCT level */}
        {sectionMaterials.length > 0 && (
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 sm:p-6 shadow-sm border border-emerald-100 dark:border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">📁</span>
                <h3 className="text-sm sm:text-base font-black text-gray-900 dark:text-gray-100 uppercase tracking-wide">
                  Tài Nguyên &amp; Bài Giảng Đã Đăng ({sectionMaterials.length})
                </h3>
              </div>
              {canPublish && (
                <span className="text-xs bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 font-extrabold px-2.5 py-1 rounded-full">
                  Quyền Quản trị viên
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {sectionMaterials.map((mat) => {
                const isVideoOrPptx = mat.type === 'video' || mat.type === 'youtube' || mat.type === 'pptx' || /\.(mp4|webm|pptx|ppt)$/i.test(mat.url);

                return (
                <div
                  key={mat.id}
                  onClick={(e) => {
                    sound.playClick();
                    incrementViews(mat.id);
                    if (isVideoOrPptx) {
                      setSelectedInteractiveMaterial(mat);
                    } else {
                      handleDownloadMaterial(mat, e);
                    }
                  }}
                  className="p-4 rounded-2xl bg-gray-50 dark:bg-slate-700/60 border border-gray-200 dark:border-slate-600 flex flex-col justify-between hover:shadow-lg hover:border-emerald-300 transition cursor-pointer"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-xl bg-white dark:bg-slate-800 shadow-xs">
                          {getFormatIcon(mat.type)}
                        </div>
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                          {mat.type.toUpperCase()}
                        </span>
                      </div>
                      <span className="text-[11px] font-extrabold text-gray-500 dark:text-gray-400">
                        {mat.grade}
                      </span>
                    </div>

                    <h4 className="text-sm font-black text-gray-900 dark:text-gray-100 line-clamp-2">
                      {mat.title}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2 mt-1">
                      {mat.description}
                    </p>

                    {mat.vocabularyItems && mat.vocabularyItems.length > 0 && (
                      <div className="mt-2 text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-1 rounded-lg inline-flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-emerald-600" />
                        <span>Có {mat.vocabularyItems.length} từ vựng &amp; câu giao tiếp đặt sẵn</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-200 dark:border-slate-600 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      {isVideoOrPptx ? (
                        <>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              sound.playClick();
                              incrementViews(mat.id);
                              setSelectedInteractiveMaterial(mat);
                            }}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-black text-xs shadow-xs transition"
                            title={mat.type === 'pptx' ? 'Xem trình chiếu PPTX' : 'Xem video trực tiếp'}
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>{mat.type === 'pptx' ? 'Xem bài giảng PPTX' : 'Xem video'}</span>
                          </button>
                          <span className="text-[10px] font-black px-2 py-1 rounded-lg bg-purple-100 text-purple-700 dark:bg-slate-700 dark:text-purple-300">
                            Chỉ xem
                          </span>
                        </>
                      ) : (
                        /* Các tài liệu khác bỏ phần xem tương tác, hiển thị trực tiếp nút tải văn bản cho mọi tài khoản */
                        <button
                          onClick={(e) => handleDownloadMaterial(mat, e)}
                          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-xs transition active:scale-95"
                          title="Tải văn bản / tệp gốc về máy"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Tải văn bản ({mat.downloads || 0})</span>
                        </button>
                      )}
                    </div>

                    {/* Admin Actions: Edit & Delete */}
                    {canPublish && (
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            sound.playClick();
                            onOpenEdit?.(mat);
                          }}
                          className="p-1.5 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-700 dark:bg-slate-600 dark:text-blue-300 transition"
                          title="Sửa / Thay thế tài nguyên này"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={(e) => handleDeleteMaterial(mat, e)}
                          className="p-1.5 rounded-lg bg-rose-100 hover:bg-rose-200 text-rose-700 dark:bg-slate-600 dark:text-rose-300 transition"
                          title="Xóa tài nguyên này khỏi hệ thống"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            </div>
          </div>
        )}

        {/* Unit Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayedUnits.map((unit) => (
            <div
              key={unit.id}
              onClick={() => handleOpenUnit(unit)}
              className="group bg-white dark:bg-slate-800 rounded-3xl overflow-hidden border border-gray-100 dark:border-slate-700 shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={unit.coverImage}
                  alt={unit.titleVi}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className={`${unit.grade === 'hsk' ? 'bg-violet-600' : 'bg-emerald-500'} text-white font-black text-xs px-3 py-1 rounded-full shadow-md uppercase`}>
                    {unit.hskLevel ? `HSK ${unit.hskLevel} (3.0)` : unit.yctLevel ? `YCT Cấp ${unit.yctLevel}` : `Unit ${unit.unitNumber}`}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="text-base sm:text-lg font-black leading-tight drop-shadow">
                    {unit.titleVi}
                  </h3>
                  <p className="text-xs text-yellow-300 font-bold mt-0.5">
                    {unit.pinyin}
                  </p>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2 leading-relaxed">
                  {unit.description}
                </p>

                <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-gray-100 dark:border-slate-700 text-center text-xs font-bold text-gray-500 dark:text-gray-400">
                  <div className="bg-gray-50 dark:bg-slate-700/50 p-1.5 rounded-xl">
                    <span className="block text-emerald-600 dark:text-emerald-400 font-black">{unit.vocabulary.length}</span>
                    <span className="text-[10px]">Từ vựng</span>
                  </div>
                  <div className="bg-gray-50 dark:bg-slate-700/50 p-1.5 rounded-xl">
                    <span className="block text-blue-600 dark:text-blue-400 font-black">{unit.dialogue.length}</span>
                    <span className="text-[10px]">Hội thoại</span>
                  </div>
                  <div className="bg-gray-50 dark:bg-slate-700/50 p-1.5 rounded-xl">
                    <span className="block text-purple-600 dark:text-purple-400 font-black">{unit.exercises.length}</span>
                    <span className="text-[10px]">Bài tập</span>
                  </div>
                </div>

                <button className="w-full mt-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs transition flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/20">
                  <span>Vào học Unit này</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Viewer Modal for all logged in users */}
        {selectedInteractiveMaterial && (
          <InteractiveMaterialModal
            isOpen={!!selectedInteractiveMaterial}
            onClose={() => setSelectedInteractiveMaterial(null)}
            material={selectedInteractiveMaterial}
            user={user}
            onMaterialUpdated={() => onMaterialsChange?.()}
          />
        )}

      </div>
    );
  }

  // 2. Unit Detail View
  const currentQuestion = selectedUnit.exercises[currentExIndex];

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      
      {/* Unit Top Header & Back Button */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 sm:p-6 shadow-lg border border-gray-100 dark:border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => { sound.playClick(); setSelectedUnit(null); }}
            className="p-2.5 rounded-2xl bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 text-gray-700 dark:text-gray-200 transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 font-black text-xs px-2.5 py-0.5 rounded-full uppercase">
                {selectedUnit.yctLevel ? `YCT ${selectedUnit.yctLevel} - Unit ${selectedUnit.unitNumber}` : `Unit ${selectedUnit.unitNumber}`}
              </span>
              <span className="text-xs text-gray-500">{selectedUnit.pinyin}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-gray-800 dark:text-gray-100 mt-1">
              {selectedUnit.titleVi}
            </h2>
            <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
              <span>{selectedUnit.titleZh}</span>
              <button
                onClick={(e) => handlePlayChinese(selectedUnit.titleZh, e)}
                className="p-1 rounded-full hover:bg-emerald-100 dark:hover:bg-slate-700 text-emerald-600"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Tab Switcher Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 bg-gray-100 dark:bg-slate-700 p-1.5 rounded-2xl text-xs font-black">
          <button
            onClick={() => { sound.playClick(); setActiveTab('vocab'); }}
            className={`px-3 py-2 rounded-xl transition ${activeTab === 'vocab' ? 'bg-white dark:bg-slate-600 text-emerald-600 dark:text-emerald-300 shadow-xs' : 'text-gray-600 dark:text-gray-300'}`}
          >
            📖 Từ vựng ({selectedUnit.vocabulary.length})
          </button>
          <button
            onClick={() => { sound.playClick(); setActiveTab('grammar'); }}
            className={`px-3 py-2 rounded-xl transition ${activeTab === 'grammar' ? 'bg-white dark:bg-slate-600 text-emerald-600 dark:text-emerald-300 shadow-xs' : 'text-gray-600 dark:text-gray-300'}`}
          >
            ✏️ Mẫu câu &amp; Ngữ pháp
          </button>
          <button
            onClick={() => { sound.playClick(); setActiveTab('dialogue'); }}
            className={`px-3 py-2 rounded-xl transition ${activeTab === 'dialogue' ? 'bg-white dark:bg-slate-600 text-emerald-600 dark:text-emerald-300 shadow-xs' : 'text-gray-600 dark:text-gray-300'}`}
          >
            💬 Hội thoại
          </button>
          <button
            onClick={() => { sound.playClick(); setActiveTab('practice'); }}
            className={`px-3 py-2 rounded-xl transition ${activeTab === 'practice' ? 'bg-white dark:bg-slate-600 text-emerald-600 dark:text-emerald-300 shadow-xs' : 'text-gray-600 dark:text-gray-300'}`}
          >
            🎯 Bài tập trắc nghiệm
          </button>
          <button
            onClick={() => { sound.playClick(); setActiveTab('pdf'); }}
            className={`px-3 py-2 rounded-xl transition ${activeTab === 'pdf' ? 'bg-white dark:bg-slate-600 text-emerald-600 dark:text-emerald-300 shadow-xs' : 'text-gray-600 dark:text-gray-300'}`}
          >
            📥 Phiếu PDF
          </button>
          <button
            onClick={() => { sound.playClick(); setActiveTab('resources'); }}
            className={`px-3 py-2 rounded-xl transition ${activeTab === 'resources' ? 'bg-white dark:bg-slate-600 text-emerald-600 dark:text-emerald-300 shadow-xs' : 'text-gray-600 dark:text-gray-300'}`}
          >
            📁 Tài nguyên ({unitMaterials.length})
          </button>
        </div>
      </div>

      {/* Tab 1: Vocabulary */}
      {activeTab === 'vocab' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-black text-gray-800 dark:text-gray-100">
              Danh sách từ vựng trọng tâm (Bấm biểu tượng loa để nghe giọng đọc chuẩn)
            </h3>
            <span className="text-xs text-emerald-600 font-bold">Tốc độ phù hợp trẻ em</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {selectedUnit.vocabulary.map((vocab) => (
              <div
                key={vocab.id}
                onClick={() => handlePlayChinese(vocab.hanzi)}
                className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 shadow-xs hover:border-emerald-300 hover:shadow-md transition cursor-pointer flex flex-col justify-between"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-2xl sm:text-3xl font-black font-serif text-gray-800 dark:text-gray-100">
                      {vocab.hanzi}
                    </div>
                    <div className="text-sm font-bold text-amber-600 dark:text-amber-400 mt-0.5">
                      {vocab.pinyin}
                    </div>
                  </div>
                  <button
                    onClick={(e) => handlePlayChinese(vocab.hanzi, e)}
                    className="p-2 rounded-xl bg-emerald-50 dark:bg-slate-700 text-emerald-600 dark:text-emerald-300 hover:scale-110 transition"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="mt-3 pt-3 border-t border-gray-100 dark:border-slate-700">
                  <div className="text-xs sm:text-sm font-bold text-gray-700 dark:text-gray-300">
                    {vocab.meaningVi}
                  </div>
                  {vocab.exampleZh && (
                    <div className="mt-2 text-xs bg-emerald-50/70 dark:bg-slate-700/60 p-2.5 rounded-xl border border-emerald-100 dark:border-slate-600">
                      <div className="flex items-start justify-between gap-1.5">
                        <div>
                          <div className="font-bold text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm">{vocab.exampleZh}</div>
                          {vocab.examplePinyin && (
                            <div className="text-amber-600 dark:text-amber-400 text-xs font-semibold">{vocab.examplePinyin}</div>
                          )}
                          <div className="text-gray-600 dark:text-gray-300 text-[11px] mt-0.5">{vocab.exampleVi}</div>
                        </div>
                        <button
                          onClick={(e) => handlePlayChinese(vocab.exampleZh!, e)}
                          title="Nghe câu đọc mẫu giọng bản địa chuẩn"
                          className="p-1.5 rounded-lg bg-white dark:bg-slate-800 text-emerald-600 shadow-2xs hover:scale-110 transition shrink-0"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Section: Từ vựng trích xuất từ file Word được tải lên & Đặt câu giao tiếp thực tế */}
          {uploadedWordVocab.length > 0 && (
            <div className="mt-8 pt-6 border-t-2 border-dashed border-emerald-200 dark:border-slate-700">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">📝</span>
                  <div>
                    <h4 className="text-base sm:text-lg font-black text-emerald-900 dark:text-emerald-300 flex items-center gap-2">
                      <span>TỪ VỰNG TRÍCH XUẤT TỪ FILE WORD &amp; ĐẶT CÂU GIAO TIẾP THỰC TẾ</span>
                      <span className="text-xs bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 px-2.5 py-0.5 rounded-full font-extrabold">
                        {uploadedWordVocab.length} từ
                      </span>
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Câu giao tiếp ngắn gọn, bám sát trọng tâm bài học, có phiên âm Pinyin, dịch nghĩa &amp; loa đọc chuẩn bản địa.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {uploadedWordVocab.map((wItem, wIdx) => (
                  <div
                    key={wItem.id || `uploaded-w-${wIdx}`}
                    className="p-4 rounded-3xl bg-gradient-to-br from-white to-emerald-50/40 dark:from-slate-800 dark:to-slate-800/80 border-2 border-emerald-200 dark:border-slate-700 shadow-sm hover:shadow-md transition"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-800 dark:text-emerald-200 font-serif font-black text-2xl shadow-xs">
                          {wItem.hanzi}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-amber-600 dark:text-amber-400">
                            {wItem.pinyin}
                          </div>
                          <div className="text-xs font-black text-gray-800 dark:text-gray-100">
                            {wItem.meaningVi}
                          </div>
                          {wItem.category && (
                            <span className="inline-block mt-0.5 text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100/70 text-emerald-800 dark:bg-slate-700 dark:text-emerald-300">
                              {wItem.category}
                            </span>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={() => handlePlayChinese(wItem.hanzi)}
                        title="Nghe phát âm từ vựng"
                        className="p-2.5 rounded-2xl bg-emerald-100 dark:bg-slate-700 text-emerald-700 hover:scale-110 active:scale-95 transition"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Practical communicative sentence */}
                    {wItem.exampleSentence && (
                      <div className="mt-3 p-3 rounded-2xl bg-white dark:bg-slate-700/60 border border-emerald-100 dark:border-slate-600 shadow-2xs">
                        <div className="flex items-start justify-between gap-2">
                          <div className="space-y-0.5">
                            <div className="text-[10px] font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
                              Câu giao tiếp thực tế:
                            </div>
                            <div className="text-xs sm:text-sm font-black text-emerald-800 dark:text-emerald-300">
                              {wItem.exampleSentence.zh}
                            </div>
                            <div className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                              {wItem.exampleSentence.pinyin}
                            </div>
                            <div className="text-xs text-gray-700 dark:text-gray-300 font-medium">
                              👉 {wItem.exampleSentence.vi}
                            </div>
                          </div>

                          <button
                            onClick={() => handlePlayChinese(wItem.exampleSentence.zh)}
                            title="Nghe câu giao tiếp chuẩn người bản địa"
                            className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs hover:scale-105 active:scale-95 transition shrink-0"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Grammar & Sentence Patterns */}
      {activeTab === 'grammar' && (
        <div className="space-y-4">
          {selectedUnit.grammar.map((g) => (
            <div
              key={g.id}
              className="p-5 rounded-3xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 shadow-sm space-y-3"
            >
              <h4 className="text-base sm:text-lg font-black text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span>{g.title}</span>
              </h4>

              <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 text-xs sm:text-sm font-black">
                Cấu trúc: {g.structure}
              </div>

              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {g.explanation}
              </p>

              <div className="space-y-2 pt-2">
                <div className="text-xs font-black uppercase text-gray-500">Ví dụ minh họa:</div>
                {g.examples.map((ex, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-2xl bg-gray-50 dark:bg-slate-700/60 flex items-center justify-between gap-3 text-xs sm:text-sm"
                  >
                    <div>
                      <div className="font-bold text-gray-800 dark:text-gray-100">{ex.zh}</div>
                      <div className="text-amber-600 dark:text-amber-400 text-xs">{ex.pinyin}</div>
                      <div className="text-gray-500 dark:text-gray-400 text-xs">{ex.vi}</div>
                    </div>
                    <button
                      onClick={() => handlePlayChinese(ex.zh)}
                      className="p-2 rounded-xl bg-white dark:bg-slate-800 text-emerald-600 shadow-xs hover:scale-110 transition"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Dialogue */}
      {activeTab === 'dialogue' && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 sm:p-6 shadow-sm border border-gray-100 dark:border-slate-700 space-y-4">
            <h4 className="text-base sm:text-lg font-black text-gray-900 dark:text-gray-100">
              Đoạn hội thoại thực tế
            </h4>

            <div className="space-y-3">
              {selectedUnit.dialogue.map((line, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-gray-50 dark:bg-slate-700/60 flex items-start justify-between gap-3"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{line.avatar || '🐼'}</span>
                    <div>
                      <div className="text-xs font-black text-emerald-600 dark:text-emerald-400">
                        {line.speaker}:
                      </div>
                      <div className="text-base font-bold text-gray-800 dark:text-gray-100 font-serif">
                        {line.hanzi}
                      </div>
                      <div className="text-xs text-amber-600 dark:text-amber-400">
                        {line.pinyin}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        {line.vi}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handlePlayChinese(line.hanzi)}
                    className="p-2 rounded-xl bg-white dark:bg-slate-800 text-emerald-600 shadow-xs hover:scale-110 transition shrink-0"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Interactive Practice Quiz (Đáp án kèm đọc đặt ở phần đáp án & giải thích) */}
      {activeTab === 'practice' && (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-slate-700">
          {!completedQuiz ? (
            <div>
              {/* Quiz progress */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100 dark:border-slate-700">
                <span className="text-xs font-black text-emerald-600">
                  Câu hỏi {currentExIndex + 1} / {selectedUnit.exercises.length}
                </span>
                <span className="text-xs font-bold text-amber-600">
                  Điểm số: {score} đúng
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 rounded-full bg-gray-100 dark:bg-slate-700 mb-6 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300"
                  style={{ width: `${((currentExIndex + 1) / selectedUnit.exercises.length) * 100}%` }}
                />
              </div>

              {/* Question Box - Chỉ có câu hỏi thuần túy, không có đáp án ở đây */}
              <div className="mb-6">
                <h4 className="text-lg sm:text-xl font-black text-gray-800 dark:text-gray-100 leading-snug">
                  {currentQuestion.question}
                </h4>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {currentQuestion.options?.map((option, idx) => {
                  let btnStyle = 'bg-gray-50 dark:bg-slate-700/70 border-gray-200 dark:border-slate-600 hover:border-emerald-400 text-gray-800 dark:text-gray-100';
                  if (showResult) {
                    if (option.trim().toLowerCase() === (currentQuestion.answer as string).trim().toLowerCase()) {
                      btnStyle = 'bg-emerald-500 text-white border-emerald-600 font-black shadow-md';
                    } else if (selectedOption === option) {
                      btnStyle = 'bg-rose-500 text-white border-rose-600 font-bold';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={showResult}
                      onClick={() => handleAnswerQuestion(option, currentQuestion)}
                      className={`p-3.5 sm:p-4 rounded-2xl border-2 text-left font-bold text-sm sm:text-base transition-all duration-200 active:scale-98 flex items-center gap-2.5 ${btnStyle}`}
                    >
                      <span className="inline-block w-6 h-6 rounded-full bg-black/10 text-center leading-6 text-xs font-black shrink-0">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="truncate">{option}</span>
                    </button>
                  );
                })}
              </div>

              {/* Result explanation - Showing pronunciation & teacher explanation at the answer/explanation section */}
              {showResult && (
                <div className={`p-4 rounded-2xl mb-6 ${isCorrect ? 'bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 text-emerald-900 dark:text-emerald-200' : 'bg-rose-50 dark:bg-rose-950/40 border border-rose-200 text-rose-900 dark:text-rose-200'}`}>
                  <div className="font-black text-sm flex items-center gap-2">
                    {isCorrect ? '🎉 Chính xác rồi! Bé thật thông minh! (+20 XP)' : '💡 Chưa đúng rồi, em xem đáp án và giải thích bên dưới nhé:'}
                  </div>
                  
                  {/* Correct answer display with pronunciation */}
                  <div className="mt-2.5 p-3 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-emerald-200 dark:border-emerald-800/60 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-extrabold uppercase text-emerald-700 dark:text-emerald-400">
                        Đáp án đúng:
                      </span>
                      <span className="text-base font-black text-emerald-900 dark:text-emerald-100">
                        {currentQuestion.answer}
                      </span>
                      {currentQuestion.hanzi && (
                        <span className="text-lg font-black font-serif text-emerald-800 dark:text-emerald-200 ml-1">
                          ({currentQuestion.hanzi} {currentQuestion.pinyin && <span className="text-xs text-amber-600 dark:text-amber-400 font-sans font-bold">- {currentQuestion.pinyin}</span>})
                        </span>
                      )}
                    </div>
                    
                    <button
                      type="button"
                      onClick={() => {
                        sound.playClick();
                        speakSmart(currentQuestion.hanzi || String(currentQuestion.answer));
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
                    <span className="flex-1">{currentQuestion.explanation}</span>
                    <button
                      type="button"
                      onClick={() => speakVietnamese(currentQuestion.explanation || '')}
                      className="p-1 text-emerald-600 hover:bg-emerald-100 rounded-md shrink-0"
                      title="Nghe đọc giải thích"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Next Question Button */}
              {showResult && (
                <div className="flex justify-end">
                  <button
                    onClick={handleNextQuestion}
                    className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm shadow-lg shadow-emerald-600/30 transition flex items-center gap-2"
                  >
                    <span>{currentExIndex < selectedUnit.exercises.length - 1 ? 'Câu tiếp theo' : 'Xem kết quả'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <span className="text-6xl animate-bounce inline-block mb-3">🏆</span>
              <h4 className="text-2xl font-black text-gray-800 dark:text-gray-100">
                Chúc mừng bé đã hoàn thành bài tập!
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                Bé đạt <span className="text-emerald-600 font-black">{score}/{selectedUnit.exercises.length}</span> câu đúng và nhận được <span className="text-amber-500 font-black">+70 XP</span>!
              </p>

              <div className="flex items-center justify-center gap-4 mt-6">
                <button
                  onClick={handleRestartQuiz}
                  className="px-5 py-2.5 rounded-2xl bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 text-gray-700 dark:text-gray-200 font-bold text-xs flex items-center gap-1.5 transition"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Làm lại bài này</span>
                </button>
                <button
                  onClick={() => { sound.playClick(); setSelectedUnit(null); }}
                  className="px-6 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-md transition"
                >
                  Chọn Unit tiếp theo
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 5: Downloadable PDF */}
      {activeTab === 'pdf' && (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-slate-700">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 flex items-center justify-center text-3xl">
                📄
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-black text-gray-900 dark:text-gray-100">
                  Tài liệu in màu bài tập &amp; từ vựng Unit {selectedUnit.unitNumber} (PDF)
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  Định dạng PDF chuẩn in A4, bao gồm phiếu tập viết chữ Hán và đề kiểm tra mini.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  sound.playClick();
                  triggerFileDownload(
                    `Tai_lieu_Unit_${selectedUnit.unitNumber}_${selectedUnit.titleVi}`,
                    selectedUnit.pdfDownloadUrl || '',
                    'pdf'
                  );
                }}
                className="px-6 py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs sm:text-sm shadow-lg shadow-rose-600/30 flex items-center gap-2 transition"
              >
                <Download className="w-4 h-4" />
                <span>Tải file PDF về máy</span>
              </button>

              {/* Admin replace button */}
              {canPublish && (
                <button
                  onClick={() => {
                    sound.playClick();
                    onOpenUpload?.(selectedUnit.yctLevel ? `YCT ${selectedUnit.yctLevel}` : selectedUnit.grade);
                  }}
                  className="px-4 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition"
                >
                  Thay thế tệp PDF
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab 6: Resources & Attached Materials for this unit */}
      {activeTab === 'resources' && (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-slate-700 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-slate-700">
            <div>
              <h4 className="text-base font-black text-gray-900 dark:text-gray-100">
                Kho tài nguyên bổ trợ cho Unit {selectedUnit.unitNumber}: {selectedUnit.titleVi}
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Bài giảng PowerPoint, tài liệu Word, video, link YouTube &amp; Google Drive
              </p>
            </div>

            {canPublish && (
              <button
                onClick={() => {
                  sound.playClick();
                  const targetGrade = selectedUnit.yctLevel ? `YCT ${selectedUnit.yctLevel}` : selectedUnit.grade;
                  onOpenUpload?.(targetGrade);
                }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-black text-xs shadow-md transition"
              >
                <Plus className="w-4 h-4" />
                <span>Đăng tài nguyên cho Unit này</span>
              </button>
            )}
          </div>

          {unitMaterials.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <span className="text-4xl inline-block mb-2">📂</span>
              <p className="text-sm font-bold">Chưa có tài nguyên bổ sung nào cho bài này.</p>
              {canPublish && (
                <button
                  onClick={() => {
                    sound.playClick();
                    const targetGrade = selectedUnit.yctLevel ? `YCT ${selectedUnit.yctLevel}` : selectedUnit.grade;
                    onOpenUpload?.(targetGrade);
                  }}
                  className="mt-3 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm"
                >
                  Bấm vào đây để tải lên tệp đầu tiên
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {unitMaterials.map((mat) => {
                const isVideoOrPptx = mat.type === 'video' || mat.type === 'youtube' || mat.type === 'pptx' || /\.(mp4|webm|pptx|ppt)$/i.test(mat.url);

                return (
                <div
                  key={mat.id}
                  onClick={(e) => {
                    sound.playClick();
                    incrementViews(mat.id);
                    if (isVideoOrPptx) {
                      setSelectedInteractiveMaterial(mat);
                    } else {
                      handleDownloadMaterial(mat, e);
                    }
                  }}
                  className="p-4 rounded-2xl bg-gray-50 dark:bg-slate-700/60 border border-gray-200 dark:border-slate-600 flex flex-col justify-between hover:shadow-lg hover:border-emerald-300 transition cursor-pointer"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getFormatIcon(mat.type)}
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                          {mat.type}
                        </span>
                      </div>
                      <span className="text-xs text-gray-400">{mat.createdAt}</span>
                    </div>

                    <h5 className="text-sm font-black text-gray-900 dark:text-gray-100">
                      {mat.title}
                    </h5>
                    <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2 mt-1">
                      {mat.description}
                    </p>

                    {mat.vocabularyItems && mat.vocabularyItems.length > 0 && (
                      <div className="mt-2 text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-1 rounded-lg inline-flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-emerald-600" />
                        <span>Có {mat.vocabularyItems.length} từ vựng trích xuất</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-200 dark:border-slate-600 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      {isVideoOrPptx ? (
                        <>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              sound.playClick();
                              incrementViews(mat.id);
                              setSelectedInteractiveMaterial(mat);
                            }}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-xs"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>{mat.type === 'pptx' ? 'Xem bài giảng PPTX' : 'Xem video'}</span>
                          </button>
                          <span className="text-[10px] font-black px-2 py-1 rounded-lg bg-purple-100 text-purple-700 dark:bg-slate-700 dark:text-purple-300">
                            Chỉ xem
                          </span>
                        </>
                      ) : (
                        /* Các tài liệu khác bỏ phần xem tương tác, tải về trực tiếp cho mọi tài khoản */
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDownloadMaterial(mat, e);
                          }}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition active:scale-95"
                          title="Tải văn bản về máy"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Tải văn bản</span>
                        </button>
                      )}
                    </div>

                    {canPublish && (
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            sound.playClick();
                            onOpenEdit?.(mat);
                          }}
                          className="p-1.5 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-700 dark:bg-slate-600 dark:text-blue-300 transition"
                          title="Sửa / Thay thế tài nguyên này"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={(e) => handleDeleteMaterial(mat, e)}
                          className="p-1.5 rounded-lg bg-rose-100 hover:bg-rose-200 text-rose-700 dark:bg-slate-600 dark:text-rose-300 transition"
                          title="Xóa tài nguyên này"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            </div>
          )}
        </div>
      )}

      {/* Interactive Viewer Modal for all logged in users */}
      {selectedInteractiveMaterial && (
        <InteractiveMaterialModal
          isOpen={!!selectedInteractiveMaterial}
          onClose={() => setSelectedInteractiveMaterial(null)}
          material={selectedInteractiveMaterial}
          user={user}
          onMaterialUpdated={() => onMaterialsChange?.()}
        />
      )}

    </div>
  );
};
