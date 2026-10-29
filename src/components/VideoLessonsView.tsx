import React, { useState } from 'react';
import {
  Video,
  Play,
  ExternalLink,
  Eye,
  Filter,
  CheckCircle,
  Sparkles,
  BookOpen,
  Upload
} from 'lucide-react';
import { VideoLesson } from '../types';
import { INITIAL_VIDEOS } from '../data/mockData';
import { getStoredMaterials, MATERIALS_UPDATED_EVENT } from '../utils/storage';
import { sound } from '../utils/soundEffects';

export const VideoLessonsView: React.FC = () => {
  const [selectedGrade, setSelectedGrade] = useState<'all' | 'primary' | 'grade6' | 'grade7' | 'grade8' | 'grade9' | 'yct'>('all');
  const [storedMaterials, setStoredMaterials] = useState(() => getStoredMaterials());

  React.useEffect(() => {
    const handleUpdate = () => {
      setStoredMaterials(getStoredMaterials());
    };
    window.addEventListener(MATERIALS_UPDATED_EVENT, handleUpdate);
    return () => {
      window.removeEventListener(MATERIALS_UPDATED_EVENT, handleUpdate);
    };
  }, []);
  
  // Combine preset videos and uploaded videos from teachers
  const uploadedVideos: VideoLesson[] = storedMaterials
    .filter((m) => m.type === 'video')
    .map((m) => ({
      id: m.id,
      title: m.title,
      grade: (m.grade === 'Lớp 6' ? 'grade6' : m.grade === 'Lớp 7' ? 'grade7' : m.grade === 'Lớp 8' ? 'grade8' : m.grade === 'Lớp 9' ? 'grade9' : 'primary') as any,
      unitNumber: 1,
      youtubeId: '',
      driveUrl: m.url,
      duration: 'Tải từ máy',
      teacherName: m.authorName,
      thumbnail: m.thumbnail,
      description: m.description,
      views: m.views,
    }));

  const allAvailableVideos = [...uploadedVideos, ...INITIAL_VIDEOS];
  const [activeVideo, setActiveVideo] = useState<VideoLesson | null>(allAvailableVideos[0] || null);

  const filteredVideos = allAvailableVideos.filter((v) => {
    if (selectedGrade === 'all') return true;
    return v.grade === selectedGrade;
  });

  const handleSelectVideo = (video: VideoLesson) => {
    sound.playClick();
    setActiveVideo(video);
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 via-rose-600 to-orange-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="inline-block bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-2">
            🎬 Video E-Learning Trực quan
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black">
            VIDEO BÀI GIẢNG THEO UNIT
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-rose-100 mt-1 max-w-xl">
            Các bài giảng sinh động phân loại theo Tiểu học, Lớp 6, 7, 8, 9 và chuẩn YCT 1 – 6. Xem trực tiếp hoặc mở tab mới YouTube tiện lợi.
          </p>
        </div>

        {/* Grade filter tabs */}
        <div className="flex flex-wrap items-center gap-1.5 bg-white/10 backdrop-blur-md p-1.5 rounded-2xl border border-white/20 text-xs font-black">
          <button
            onClick={() => { sound.playClick(); setSelectedGrade('all'); }}
            className={`px-3 py-2 rounded-xl transition ${selectedGrade === 'all' ? 'bg-white text-red-600 shadow-md' : 'text-white hover:bg-white/10'}`}
          >
            Tất cả khối lớp
          </button>
          <button
            onClick={() => { sound.playClick(); setSelectedGrade('primary'); }}
            className={`px-3 py-2 rounded-xl transition ${selectedGrade === 'primary' ? 'bg-white text-red-600 shadow-md' : 'text-white hover:bg-white/10'}`}
          >
            Tiểu học
          </button>
          <button
            onClick={() => { sound.playClick(); setSelectedGrade('grade6'); }}
            className={`px-3 py-2 rounded-xl transition ${selectedGrade === 'grade6' ? 'bg-white text-red-600 shadow-md' : 'text-white hover:bg-white/10'}`}
          >
            Lớp 6
          </button>
          <button
            onClick={() => { sound.playClick(); setSelectedGrade('grade7'); }}
            className={`px-3 py-2 rounded-xl transition ${selectedGrade === 'grade7' ? 'bg-white text-red-600 shadow-md' : 'text-white hover:bg-white/10'}`}
          >
            Lớp 7
          </button>
          <button
            onClick={() => { sound.playClick(); setSelectedGrade('grade8'); }}
            className={`px-3 py-2 rounded-xl transition ${selectedGrade === 'grade8' ? 'bg-white text-red-600 shadow-md' : 'text-white hover:bg-white/10'}`}
          >
            Lớp 8
          </button>
          <button
            onClick={() => { sound.playClick(); setSelectedGrade('grade9'); }}
            className={`px-3 py-2 rounded-xl transition ${selectedGrade === 'grade9' ? 'bg-white text-red-600 shadow-md' : 'text-white hover:bg-white/10'}`}
          >
            Lớp 9
          </button>
          <button
            onClick={() => { sound.playClick(); setSelectedGrade('yct'); }}
            className={`px-3 py-2 rounded-xl transition ${selectedGrade === 'yct' ? 'bg-white text-red-600 shadow-md' : 'text-white hover:bg-white/10'}`}
          >
            YCT (1-6)
          </button>
        </div>
      </div>

      {/* Main Video Cinema Theater Player */}
      {activeVideo && (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 sm:p-7 shadow-lg border border-gray-100 dark:border-slate-700">
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-2xl mb-4 flex items-center justify-center">
            {activeVideo.youtubeId ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeVideo.youtubeId}?rel=0&modestbranding=1`}
                title={activeVideo.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video
                controls
                autoPlay
                playsInline
                className="w-full h-full object-contain"
                src={activeVideo.driveUrl}
                poster={activeVideo.thumbnail}
              >
                Trình duyệt không hỗ trợ phát trực tiếp video.
              </video>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300 font-black text-xs px-2.5 py-0.5 rounded-full uppercase">
                  {activeVideo.grade === 'primary' ? 'Tiểu học' : activeVideo.grade === 'grade6' ? 'Lớp 6' : activeVideo.grade === 'grade7' ? 'Lớp 7' : activeVideo.grade === 'grade8' ? 'Lớp 8' : activeVideo.grade === 'grade9' ? 'Lớp 9' : 'YCT'} • {activeVideo.duration}
                </span>
                <span className="text-xs text-gray-500 flex items-center gap-1 font-semibold">
                  <Eye className="w-3.5 h-3.5" /> {activeVideo.views.toLocaleString()} lượt xem
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-gray-900 dark:text-gray-100">
                {activeVideo.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-1 max-w-2xl">
                {activeVideo.description}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {activeVideo.youtubeId ? (
                <a
                  href={`https://www.youtube.com/watch?v=${activeVideo.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playClick()}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 text-gray-700 dark:text-gray-200 text-xs font-bold transition"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Mở tab YouTube</span>
                </a>
              ) : (
                <a
                  href={activeVideo.driveUrl || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  onClick={() => sound.playClick()}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-red-600 hover:bg-red-700 text-white text-xs font-black shadow-md transition"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Mở xem / Tải video</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Playlist Grid */}
      <div>
        <h3 className="text-lg font-black text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
          <Video className="w-5 h-5 text-red-600" />
          <span>DANH SÁCH VIDEO THEO BÀI HỌC</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredVideos.map((vid) => {
            const isPlaying = activeVideo?.id === vid.id;
            return (
              <div
                key={vid.id}
                onClick={() => handleSelectVideo(vid)}
                className={`group bg-white dark:bg-slate-800 rounded-3xl overflow-hidden border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  isPlaying
                    ? 'border-red-500 shadow-xl ring-2 ring-red-400'
                    : 'border-gray-100 dark:border-slate-700 hover:border-red-300 shadow-md'
                }`}
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={vid.thumbnail}
                    alt={vid.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 fill-white ml-0.5" />
                    </div>
                  </div>
                  <span className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                    {vid.duration}
                  </span>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-black uppercase text-red-600 dark:text-red-400">
                      {vid.grade === 'primary' ? 'Tiểu học' : vid.grade === 'grade6' ? 'Lớp 6' : 'Lớp 7'} • Unit {vid.unitNumber}
                    </span>
                    <h4 className="text-xs sm:text-sm font-black text-gray-900 dark:text-gray-100 line-clamp-2 mt-1 leading-snug">
                      {vid.title}
                    </h4>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-gray-500 dark:text-gray-400 mt-3 pt-2 border-t border-gray-100 dark:border-slate-700 font-semibold">
                    <span>{vid.teacherName}</span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" /> {vid.views}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
