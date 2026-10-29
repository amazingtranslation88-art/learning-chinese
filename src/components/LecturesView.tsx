import React, { useState } from 'react';
import {
  Presentation,
  FileText,
  ExternalLink,
  Download,
  Eye,
  Star,
  MessageSquare,
  Trash2,
  Edit,
  Plus,
  Send,
  User,
  CheckCircle2,
  ShieldCheck,
  Search,
  Filter
} from 'lucide-react';
import { LectureMaterial, UserProfile } from '../types';
import { InteractiveMaterialModal } from './InteractiveMaterialModal';
import {
  canEditMaterial,
  deleteMaterial,
  updateMaterial,
  addComment,
  voteMaterial,
  incrementDownloads,
  incrementViews,
  triggerFileDownload,
  isAuthorizedPublisher
} from '../utils/storage';
import { sound } from '../utils/soundEffects';

interface LecturesViewProps {
  materials: LectureMaterial[];
  user: UserProfile;
  onMaterialsChange: () => void;
  onOpenUpload: () => void;
  onOpenEdit: (mat: LectureMaterial) => void;
  onOpenAuth: () => void;
}

export const LecturesView: React.FC<LecturesViewProps> = ({
  materials,
  user,
  onMaterialsChange,
  onOpenUpload,
  onOpenEdit,
  onOpenAuth,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGrade, setSelectedGrade] = useState<'all' | 'Tiểu học' | 'Lớp 6' | 'Lớp 7' | 'Lớp 8' | 'Lớp 9' | 'YCT'>('all');
  const [selectedType, setSelectedType] = useState<'all' | 'video' | 'pptx' | 'pdf' | 'drive' | 'youtube' | 'web'>('all');
  const [activeMaterial, setActiveMaterial] = useState<LectureMaterial | null>(null);

  // New comment input
  const [commentText, setCommentText] = useState('');
  const [commentRating, setCommentRating] = useState(5);

  const filtered = materials.filter((m) => {
    const matchSearch =
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.authorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchGrade = selectedGrade === 'all' || m.grade === selectedGrade;
    const matchType = selectedType === 'all' || m.type === selectedType;
    return matchSearch && matchGrade && matchType;
  });

  const handleOpenMaterial = (mat: LectureMaterial) => {
    sound.playClick();
    incrementViews(mat.id);
    setActiveMaterial(mat);
    onMaterialsChange();
  };

  const handleDownload = (mat: LectureMaterial, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (mat.type === 'video' || mat.type === 'youtube' || mat.type === 'pptx') {
      sound.playWrong();
      return;
    }
    sound.playClick();
    incrementDownloads(mat.id);
    triggerFileDownload(mat.title, mat.url, mat.type);
    onMaterialsChange();
  };

  const handleDelete = (mat: LectureMaterial, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!canEditMaterial(mat, user)) return;
    if (window.confirm(`Thầy/Cô có chắc chắn muốn xóa bài giảng "${mat.title}" không?`)) {
      sound.playClick();
      deleteMaterial(mat.id);
      if (activeMaterial?.id === mat.id) {
        setActiveMaterial(null);
      }
      onMaterialsChange();
    }
  };

  // Keep activeMaterial in sync with latest materials list from server/other users
  React.useEffect(() => {
    if (activeMaterial) {
      const latest = materials.find((m) => m.id === activeMaterial.id);
      if (latest && (latest.comments.length !== activeMaterial.comments.length || latest.ratings.length !== activeMaterial.ratings.length || latest.views !== activeMaterial.views)) {
        setActiveMaterial(latest);
      }
    }
  }, [materials, activeMaterial]);

  const handleSendComment = (matId: string) => {
    if (!commentText.trim()) return;
    sound.playClick();
    const newComment = addComment(
      matId,
      user.name || 'Người dùng',
      user.avatar || '🐼',
      user.email,
      commentText.trim(),
      commentRating
    );

    if (activeMaterial && activeMaterial.id === matId) {
      setActiveMaterial({
        ...activeMaterial,
        comments: [newComment, ...(activeMaterial.comments || [])],
        ratings: commentRating > 0 ? [...(activeMaterial.ratings || []), commentRating] : activeMaterial.ratings,
      });
    }

    setCommentText('');
    onMaterialsChange();
  };

  const handleVote = (matId: string, rating: number) => {
    sound.playClick();
    voteMaterial(matId, rating);
    if (activeMaterial && activeMaterial.id === matId) {
      setActiveMaterial({
        ...activeMaterial,
        ratings: [...(activeMaterial.ratings || []), rating],
      });
    }
    onMaterialsChange();
  };

  const getAvgRating = (ratings: number[]) => {
    if (!ratings || ratings.length === 0) return 5.0;
    const sum = ratings.reduce((a, b) => a + b, 0);
    return (sum / ratings.length).toFixed(1);
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="inline-block bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-2">
            💻 Kho Bài Giảng E-Learning & PPTX
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black">
            BÀI GIẢNG ĐIỆN TỬ TIẾNG TRUNG
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-amber-100 mt-1 max-w-xl">
            Tải về và mở trực tiếp các bài giảng PowerPoint (PPTX), PDF tương tác, link Google Drive do Ms.Liên và các thầy cô biên soạn.
          </p>
        </div>

        {isAuthorizedPublisher(user) && (
          <button
            onClick={() => {
              sound.playClick();
              onOpenUpload();
            }}
            className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white text-orange-600 font-black text-sm shadow-xl hover:bg-orange-50 active:scale-95 transition shrink-0"
          >
            <Plus className="w-5 h-5" />
            <span>Đăng tải bài giảng mới</span>
          </button>
        )}
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-slate-700 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm theo tên bài giảng, giáo viên..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-gray-50 dark:bg-slate-700 text-xs sm:text-sm font-semibold border-0 focus:ring-2 focus:ring-orange-400 text-gray-800 dark:text-gray-100"
          />
        </div>

        {/* Filter Badges */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <div className="flex items-center gap-1 bg-gray-100 dark:bg-slate-700 p-1 rounded-xl text-xs font-bold">
            <button
              onClick={() => setSelectedGrade('all')}
              className={`px-3 py-1.5 rounded-lg transition ${selectedGrade === 'all' ? 'bg-white dark:bg-slate-600 text-orange-600 dark:text-orange-300 shadow-xs' : 'text-gray-600 dark:text-gray-300'}`}
            >
              Tất cả khối
            </button>
            <button
              onClick={() => setSelectedGrade('Tiểu học')}
              className={`px-3 py-1.5 rounded-lg transition ${selectedGrade === 'Tiểu học' ? 'bg-white dark:bg-slate-600 text-orange-600 dark:text-orange-300 shadow-xs' : 'text-gray-600 dark:text-gray-300'}`}
            >
              Tiểu học
            </button>
            <button
              onClick={() => setSelectedGrade('Lớp 6')}
              className={`px-3 py-1.5 rounded-lg transition ${selectedGrade === 'Lớp 6' ? 'bg-white dark:bg-slate-600 text-orange-600 dark:text-orange-300 shadow-xs' : 'text-gray-600 dark:text-gray-300'}`}
            >
              Lớp 6
            </button>
            <button
              onClick={() => setSelectedGrade('Lớp 7')}
              className={`px-3 py-1.5 rounded-lg transition ${selectedGrade === 'Lớp 7' ? 'bg-white dark:bg-slate-600 text-orange-600 dark:text-orange-300 shadow-xs' : 'text-gray-600 dark:text-gray-300'}`}
            >
              Lớp 7
            </button>
            <button
              onClick={() => setSelectedGrade('Lớp 8')}
              className={`px-3 py-1.5 rounded-lg transition ${selectedGrade === 'Lớp 8' ? 'bg-white dark:bg-slate-600 text-orange-600 dark:text-orange-300 shadow-xs' : 'text-gray-600 dark:text-gray-300'}`}
            >
              Lớp 8
            </button>
            <button
              onClick={() => setSelectedGrade('Lớp 9')}
              className={`px-3 py-1.5 rounded-lg transition ${selectedGrade === 'Lớp 9' ? 'bg-white dark:bg-slate-600 text-orange-600 dark:text-orange-300 shadow-xs' : 'text-gray-600 dark:text-gray-300'}`}
            >
              Lớp 9
            </button>
            <button
              onClick={() => setSelectedGrade('YCT')}
              className={`px-3 py-1.5 rounded-lg transition ${selectedGrade === 'YCT' ? 'bg-white dark:bg-slate-600 text-orange-600 dark:text-orange-300 shadow-xs' : 'text-gray-600 dark:text-gray-300'}`}
            >
              YCT (1-6)
            </button>
          </div>

          <div className="flex items-center gap-1 bg-gray-100 dark:bg-slate-700 p-1 rounded-xl text-xs font-bold">
            <button
              onClick={() => setSelectedType('all')}
              className={`px-2.5 py-1.5 rounded-lg transition ${selectedType === 'all' ? 'bg-white dark:bg-slate-600 text-orange-600 shadow-xs' : 'text-gray-600 dark:text-gray-300'}`}
            >
              Tất cả
            </button>
            <button
              onClick={() => setSelectedType('video')}
              className={`px-2.5 py-1.5 rounded-lg transition ${selectedType === 'video' ? 'bg-white dark:bg-slate-600 text-orange-600 shadow-xs' : 'text-gray-600 dark:text-gray-300'}`}
            >
              🎬 Video
            </button>
            <button
              onClick={() => setSelectedType('pptx')}
              className={`px-2.5 py-1.5 rounded-lg transition ${selectedType === 'pptx' ? 'bg-white dark:bg-slate-600 text-orange-600 shadow-xs' : 'text-gray-600 dark:text-gray-300'}`}
            >
              PPTX
            </button>
            <button
              onClick={() => setSelectedType('pdf')}
              className={`px-2.5 py-1.5 rounded-lg transition ${selectedType === 'pdf' ? 'bg-white dark:bg-slate-600 text-orange-600 shadow-xs' : 'text-gray-600 dark:text-gray-300'}`}
            >
              PDF
            </button>
            <button
              onClick={() => setSelectedType('drive')}
              className={`px-2.5 py-1.5 rounded-lg transition ${selectedType === 'drive' ? 'bg-white dark:bg-slate-600 text-orange-600 shadow-xs' : 'text-gray-600 dark:text-gray-300'}`}
            >
              Drive
            </button>
          </div>
        </div>
      </div>

      {/* Materials Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((mat) => {
          const hasEditPermission = canEditMaterial(mat, user);
          const avgRating = getAvgRating(mat.ratings);
          const isVideoOrPptx = mat.type === 'video' || mat.type === 'youtube' || mat.type === 'pptx' || /\.(mp4|webm|pptx|ppt)$/i.test(mat.url);

          return (
            <div
              key={mat.id}
              onClick={(e) => {
                if (isVideoOrPptx) {
                  handleOpenMaterial(mat);
                } else {
                  handleDownload(mat, e);
                }
              }}
              className="group bg-white dark:bg-slate-800 rounded-3xl overflow-hidden border border-gray-100 dark:border-slate-700 shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div className="relative h-44 overflow-hidden bg-slate-900">
                <img
                  src={mat.thumbnail}
                  alt={mat.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                
                {/* Play icon overlay for video */}
                {mat.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-12 h-12 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <span className="text-xl ml-0.5">▶</span>
                    </div>
                  </div>
                )}

                {/* Format badge */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className={`text-white font-black text-xs px-2.5 py-0.5 rounded-full uppercase shadow-md ${mat.type === 'video' ? 'bg-red-600' : mat.type === 'pptx' ? 'bg-purple-600' : 'bg-emerald-600'}`}>
                    {mat.type === 'video' ? '🎬 VIDEO' : mat.type.toUpperCase()}
                  </span>
                  <span className="bg-black/50 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                    {mat.grade}
                  </span>
                </div>

                {/* Edit / Delete Buttons for Author & amazingtranslation88@gmail.com */}
                {hasEditPermission && (
                  <div className="absolute top-3 right-3 flex items-center gap-1.5">
                    <button
                      onClick={(e) => { e.stopPropagation(); sound.playClick(); onOpenEdit(mat); }}
                      title="Chỉnh sửa bài giảng"
                      className="p-1.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 shadow-md transition"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={(e) => handleDelete(mat, e)}
                      title="Xóa bài giảng"
                      className="p-1.5 rounded-xl bg-rose-600 text-white hover:bg-rose-700 shadow-md transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="text-sm sm:text-base font-black leading-snug line-clamp-2 drop-shadow">
                    {mat.title}
                  </h3>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2 leading-relaxed">
                  {mat.description}
                </p>

                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mt-3 pt-3 border-t border-gray-100 dark:border-slate-700 font-semibold">
                  <div className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-orange-500" />
                    <span className="truncate max-w-[120px]">{mat.authorName}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" /> {mat.views}
                    </span>
                    <span className="flex items-center gap-1 text-amber-500 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-500" /> {avgRating}
                    </span>
                  </div>
                </div>

                <div className="mt-4">
                  {isVideoOrPptx ? (
                    <div className="grid grid-cols-2 gap-2">
                      <div className="py-2.5 rounded-xl bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 font-black text-xs flex items-center justify-center gap-1 border border-purple-200 dark:border-purple-800">
                        <span>Chỉ xem</span>
                      </div>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleOpenMaterial(mat); }}
                        className="py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-black text-xs shadow-md transition flex items-center justify-center gap-1.5"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>{mat.type === 'pptx' ? 'Xem bài giảng PPTX' : 'Xem video'}</span>
                      </button>
                    </div>
                  ) : (
                    /* Các tài liệu khác bỏ phần xem tương tác, hiển thị trực tiếp nút Tải văn bản */
                    <button
                      onClick={(e) => handleDownload(mat, e)}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-xs shadow-md transition flex items-center justify-center gap-2 active:scale-95"
                      title="Tải văn bản / tệp gốc về máy"
                    >
                      <Download className="w-4 h-4" />
                      <span>Tải văn bản ({mat.downloads || 0})</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail / Interactive Modal */}
      {activeMaterial && (
        <InteractiveMaterialModal
          isOpen={!!activeMaterial}
          onClose={() => setActiveMaterial(null)}
          material={activeMaterial}
          user={user}
          onMaterialUpdated={() => onMaterialsChange()}
        />
      )}

    </div>
  );
};
