import React, { useState } from 'react';
import {
  FolderDown,
  Download,
  FileText,
  Search,
  CheckCircle2,
  BookOpen,
  Sparkles,
  Printer
} from 'lucide-react';
import { FreeDocument } from '../types';
import { getFreeDocuments, triggerFileDownload } from '../utils/storage';
import { sound } from '../utils/soundEffects';

export const FreeDocumentsView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const documents = getFreeDocuments();

  const categories = ['all', 'PDF Giáo trình', 'Flashcards', 'Phiếu ôn tập', 'Luyện viết chữ Hán', 'Luyện thi vào 10', 'Sách YCT'];

  const filtered = documents.filter((doc) => {
    const matchSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCat = selectedCategory === 'all' || doc.category === selectedCategory;
    return matchSearch && matchCat;
  });

  const handleDownloadDoc = (doc: FreeDocument) => {
    sound.playClick();
    triggerFileDownload(doc.title, doc.downloadUrl, 'pdf');
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 via-emerald-600 to-sky-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="inline-block bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-2">
            📂 Kho Học Liệu Miễn Phí 100%
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black">
            TÀI LIỆU HỌC TẬP CHO BÉ & GIÁO VIÊN
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-teal-100 mt-1 max-w-xl">
            Tải về miễn phí: Giáo trình chuẩn YCT, thẻ Flashcard từ vựng in màu, phiếu bài tập ôn thi và vở tập viết chữ Hán có thứ tự nét bút.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center">
          <Printer className="w-8 h-8 text-yellow-300 mx-auto mb-1" />
          <span className="text-xs font-bold text-white block">Tối ưu in ấn</span>
          <span className="text-[10px] text-teal-100 font-medium">Khổ giấy A4 / Flashcard A5</span>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-slate-700 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm tài liệu, giáo trình, phiếu bài tập..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-gray-50 dark:bg-slate-700 text-xs sm:text-sm font-semibold border-0 focus:ring-2 focus:ring-teal-400 text-gray-800 dark:text-gray-100"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                selectedCategory === cat
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200'
              }`}
            >
              {cat === 'all' ? 'Tất cả tài liệu' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {filtered.map((doc) => (
          <div
            key={doc.id}
            className="group bg-white dark:bg-slate-800 rounded-3xl overflow-hidden border border-gray-100 dark:border-slate-700 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
          >
            <div className="relative h-44 overflow-hidden">
              <img
                src={doc.thumbnail}
                alt={doc.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              <span className="absolute top-3 left-3 bg-teal-500 text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full shadow-md">
                {doc.category}
              </span>
              <span className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                {doc.size}
              </span>

              <div className="absolute bottom-3 left-3 right-3 text-white">
                <h4 className="text-xs sm:text-sm font-black leading-snug line-clamp-2 drop-shadow">
                  {doc.title}
                </h4>
              </div>
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between">
              <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-3 leading-relaxed">
                {doc.description}
              </p>

              <div className="flex items-center justify-between text-[11px] text-gray-500 dark:text-gray-400 mt-3 pt-3 border-t border-gray-100 dark:border-slate-700 font-semibold">
                <span>{doc.pages} trang</span>
                <span>{doc.downloads.toLocaleString()} lượt tải</span>
              </div>

              <button
                onClick={() => handleDownloadDoc(doc)}
                className="w-full mt-3 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-black text-xs shadow-md transition flex items-center justify-center gap-1.5"
              >
                <Download className="w-4 h-4" />
                <span>Tải miễn phí về máy</span>
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
