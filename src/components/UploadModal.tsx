import React, { useState, useEffect } from 'react';
import {
  Upload,
  X,
  FileText,
  Link as LinkIcon,
  Image as ImageIcon,
  CheckCircle2,
  Sparkles,
  AlertCircle,
  Video,
  File,
  Globe,
  Youtube,
  ShieldAlert
} from 'lucide-react';
import { UserProfile, LectureMaterial, WordVocabItem } from '../types';
import { addMaterial, isAuthorizedPublisher, ADMIN_EMAIL, ADMIN_PHONE, generateWordVocabForMaterial } from '../utils/storage';
import { sound } from '../utils/soundEffects';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onSuccess: () => void;
  onOpenAuth: () => void;
  initialGrade?: string;
}

const PRESET_THUMBNAILS = [
  'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=500&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=500&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=60'
];

export const UploadModal: React.FC<UploadModalProps> = ({
  isOpen,
  onClose,
  user,
  onSuccess,
  onOpenAuth,
  initialGrade,
}) => {
  const [title, setTitle] = useState('');
  const [grade, setGrade] = useState(initialGrade || 'YCT1');
  const [type, setType] = useState<'pptx' | 'pdf' | 'word' | 'image' | 'video' | 'drive' | 'youtube' | 'web'>('pptx');
  const [url, setUrl] = useState('');
  const [thumbnail, setThumbnail] = useState(PRESET_THUMBNAILS[0]);
  const [description, setDescription] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [fileSizeMB, setFileSizeMB] = useState<number | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isExtractingVocab, setIsExtractingVocab] = useState(false);
  const [extractedVocab, setExtractedVocab] = useState<WordVocabItem[]>([]);
  const [errorMsg, setErrorMsg] = useState('');

  const canPublish = isAuthorizedPublisher(user);

  useEffect(() => {
    if (initialGrade) {
      setGrade(initialGrade);
    }
  }, [initialGrade, isOpen]);

  if (!isOpen) return null;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMsg('');
    setUploadedFileName(file.name);
    const sizeInMB = file.size / (1024 * 1024);
    setFileSizeMB(parseFloat(sizeInMB.toFixed(2)));

    // Auto set title if empty
    if (!title) {
      setTitle(file.name.replace(/\.[^/.]+$/, ''));
    }

    const lowerName = file.name.toLowerCase();
    if (lowerName.endsWith('.mp4') || lowerName.endsWith('.webm') || lowerName.endsWith('.mov') || lowerName.endsWith('.avi') || lowerName.endsWith('.mkv')) {
      setType('video');
    } else if (lowerName.endsWith('.pptx') || lowerName.endsWith('.ppt')) {
      setType('pptx');
    } else if (lowerName.endsWith('.pdf')) {
      setType('pdf');
    } else if (lowerName.endsWith('.docx') || lowerName.endsWith('.doc')) {
      setType('word');
      setIsExtractingVocab(true);
      generateWordVocabForMaterial(file.name, grade)
        .then((items) => {
          if (items && items.length > 0) {
            setExtractedVocab(items);
          }
        })
        .catch((err) => console.warn('Vocab generation error:', err))
        .finally(() => setIsExtractingVocab(false));
    } else if (lowerName.endsWith('.png') || lowerName.endsWith('.jpg') || lowerName.endsWith('.jpeg') || lowerName.endsWith('.webp')) {
      setType('image');
    }

    // Upload directly to server endpoint
    setIsUploading(true);
    try {
      const reader = new FileReader();
      const readPromise = new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (err) => reject(err);
      });
      reader.readAsDataURL(file);
      const base64Data = await readPromise;

      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fileName: file.name,
          fileData: base64Data,
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.message || 'Lỗi tải tệp lên máy chủ');
      }

      const resData = await response.json();
      if (resData.url) {
        setUrl(resData.url);
      }
    } catch (err: any) {
      console.warn('Server upload failed, falling back to local object URL:', err);
      const objectUrl = URL.createObjectURL(file);
      setUrl(objectUrl);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canPublish) {
      setErrorMsg(`Chỉ tài khoản quản trị (${ADMIN_EMAIL} hoặc ${ADMIN_PHONE}) mới có quyền đăng tài nguyên.`);
      return;
    }
    if (!title.trim()) {
      setErrorMsg('Vui lòng nhập tên tài liệu / bài giảng');
      return;
    }
    if (isUploading) {
      setErrorMsg('Vui lòng đợi tệp tải lên hoàn tất!');
      return;
    }

    sound.playCorrect();
    addMaterial({
      title: title.trim(),
      grade,
      unit: 'Chung',
      type,
      url: url.trim() || '#',
      thumbnail,
      description: description.trim() || 'Học liệu tiếng Trung chất lượng cao do Cô giáo Bùi Ngọc Liên biên soạn.',
      authorName: user.name || 'Cô giáo Bùi Ngọc Liên',
      authorEmail: ADMIN_EMAIL,
      vocabularyItems: extractedVocab.length > 0 ? extractedVocab : undefined,
    });

    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-gray-100 dark:border-slate-700">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-slate-700 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center text-xl font-black">
              📤
            </div>
            <div>
              <h3 className="text-lg font-black text-gray-900 dark:text-gray-100">
                ĐĂNG TẢI HỌC LIỆU / TÀI NGUYÊN
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Hỗ trợ Word, PDF, PNG/ảnh, Video MP4, PPTX hoặc link Web, YouTube, Google Drive
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

        {/* Permission warning if non-admin */}
        {!canPublish && (
          <div className="p-4 mb-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700 text-amber-900 dark:text-amber-200 text-xs font-bold flex items-start gap-2.5">
            <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <div className="font-black text-sm">Chế độ xem và tải xuống</div>
              <div>
                Hệ thống chỉ cho phép tài khoản quản trị <strong>{ADMIN_EMAIL}</strong> đăng tải và xóa tài nguyên. Bạn có thể sử dụng mật khẩu <em>tiengtrungmslien</em> để đăng nhập tài khoản quản trị.
              </div>
            </div>
          </div>
        )}

        {errorMsg && (
          <div className="p-3 mb-4 rounded-xl bg-rose-50 text-rose-700 text-xs font-bold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Title */}
          <div>
            <label className="block text-xs font-black uppercase text-gray-700 dark:text-gray-300 mb-1">
              Tên tài liệu / bài giảng <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              disabled={!canPublish}
              placeholder="VD: Bài giảng PPTX YCT 2: Con biết nói tiếng Trung rồi..."
              value={title}
              onChange={(e) => { setTitle(e.target.value); setErrorMsg(''); }}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-xs sm:text-sm font-semibold text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-orange-400 disabled:opacity-60"
            />
          </div>

          {/* Grade & Format */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-black uppercase text-gray-700 dark:text-gray-300 mb-1">
                Phân loại / Cấp độ
              </label>
              <select
                value={grade}
                disabled={!canPublish}
                onChange={(e) => setGrade(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-xs sm:text-sm font-semibold text-gray-900 dark:text-gray-100 disabled:opacity-60"
              >
                <optgroup label="Chuẩn YCT Quốc Tế">
                  <option value="YCT1">YCT1</option>
                  <option value="YCT2">YCT2</option>
                  <option value="YCT3">YCT3</option>
                  <option value="YCT4">YCT4</option>
                  <option value="YCT5">YCT5</option>
                  <option value="YCT6">YCT6</option>
                </optgroup>
                <optgroup label="Khung GDPT">
                  <option value="Tiểu học">Tiểu học (Lớp 1 - 5)</option>
                  <option value="Lớp 6">Lớp 6 THCS</option>
                  <option value="Lớp 7">Lớp 7 THCS</option>
                  <option value="Lớp 8">Lớp 8 THCS</option>
                  <option value="Lớp 9">Lớp 9 THCS</option>
                </optgroup>
                <optgroup label="Chuẩn HSK 3.0 Mới">
                  <option value="HSK1">HSK 1 (3.0)</option>
                  <option value="HSK2">HSK 2 (3.0)</option>
                  <option value="HSK3">HSK 3 (3.0)</option>
                </optgroup>
                <optgroup label="Khác">
                  <option value="Chung">Dùng chung cho các khối</option>
                </optgroup>
              </select>
            </div>

            <div>
              <label className="block text-xs font-black uppercase text-gray-700 dark:text-gray-300 mb-1">
                Định dạng học liệu
              </label>
              <select
                value={type}
                disabled={!canPublish}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-xs sm:text-sm font-semibold text-gray-900 dark:text-gray-100 disabled:opacity-60"
              >
                <option value="pptx">PowerPoint (.pptx, .ppt)</option>
                <option value="pdf">Tài liệu PDF (.pdf)</option>
                <option value="word">Microsoft Word (.docx, .doc)</option>
                <option value="image">Hình ảnh / Poster (.png, .jpg, .webp)</option>
                <option value="video">Video MP4 (.mp4, .webm)</option>
                <option value="drive">Link Google Drive</option>
                <option value="youtube">Link YouTube</option>
                <option value="web">Website / E-Learning</option>
              </select>
            </div>
          </div>

          {/* Upload File from computer */}
          <div className="p-4 rounded-2xl bg-orange-50/70 dark:bg-slate-700/60 border-2 border-dashed border-orange-300 dark:border-slate-600 text-center transition">
            <Upload className="w-7 h-7 text-orange-500 mx-auto mb-1.5 animate-bounce" />
            <label className={`inline-block px-4 py-2 rounded-xl text-white font-black text-xs shadow-md transition ${canPublish ? 'cursor-pointer bg-orange-600 hover:bg-orange-700' : 'bg-gray-400 cursor-not-allowed'}`}>
              <span>{isUploading ? 'Đang xử lý...' : '📁 Tải lên tệp từ thiết bị (Word, PDF, PNG, MP4, PPTX...)'}</span>
              <input
                type="file"
                disabled={!canPublish || isUploading}
                accept=".pptx,.ppt,.pdf,.docx,.doc,.mp4,.webm,.mov,.png,.jpg,.jpeg,.webp"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>

            {isUploading && (
              <div className="mt-3 p-2.5 rounded-xl bg-amber-50 dark:bg-slate-800 text-amber-700 dark:text-amber-300 text-xs font-bold flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-amber-600 border-t-transparent rounded-full animate-spin" />
                <span>Đang tải tệp &quot;{uploadedFileName}&quot; ({fileSizeMB} MB) lên hệ thống...</span>
              </div>
            )}

            {!isUploading && uploadedFileName && (
              <div className="mt-3 p-2.5 rounded-xl bg-emerald-50 dark:bg-slate-800 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Đã nạp tệp thành công: <strong>{uploadedFileName}</strong> {fileSizeMB ? `(${fileSizeMB} MB)` : ''}</span>
              </div>
            )}

            {isExtractingVocab && (
              <div className="mt-2 p-2.5 rounded-xl bg-blue-50 dark:bg-slate-800 text-blue-700 dark:text-blue-300 text-xs font-bold flex items-center justify-center gap-2">
                <div className="w-3.5 h-3.5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                <span>Đang trích xuất từ vựng &amp; tạo câu giao tiếp thực tế chuẩn giọng bản địa từ file Word...</span>
              </div>
            )}

            {extractedVocab.length > 0 && (
              <div className="mt-2 p-2.5 rounded-xl bg-purple-50 dark:bg-slate-800 text-purple-700 dark:text-purple-300 text-xs font-bold flex items-center justify-center gap-1.5">
                <Sparkles className="w-4 h-4 text-purple-600 shrink-0" />
                <span>Đã tạo tự động {extractedVocab.length} từ vựng kèm câu giao tiếp, pinyin &amp; phát âm chuẩn!</span>
              </div>
            )}

            <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-2">
              Hỗ trợ đầy đủ: Word (.docx, .doc), PDF (.pdf), Ảnh (.png, .jpg), Video (.mp4), Slide (.pptx) lưu trữ vĩnh viễn trên Google Cloud &amp; Firestore.
            </p>
          </div>

          {/* Link URL */}
          <div>
            <label className="block text-xs font-black uppercase text-gray-700 dark:text-gray-300 mb-1">
              Đường link tệp / liên kết trực tuyến
            </label>
            <input
              type="text"
              disabled={!canPublish}
              placeholder="VD: /uploads/ten_file.mp4, hoặc link Google Drive, YouTube, Web học tập..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-xs sm:text-sm font-semibold text-gray-900 dark:text-gray-100 disabled:opacity-60"
            />
          </div>

          {/* Thumbnail presets */}
          <div>
            <label className="block text-xs font-black uppercase text-gray-700 dark:text-gray-300 mb-1">
              Chọn ảnh bìa đại diện
            </label>
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {PRESET_THUMBNAILS.map((thumb, idx) => (
                <img
                  key={idx}
                  src={thumb}
                  alt={`Thumbnail ${idx}`}
                  onClick={() => canPublish && setThumbnail(thumb)}
                  className={`w-14 h-14 rounded-xl object-cover transition border-2 ${canPublish ? 'cursor-pointer' : 'cursor-default'} ${thumbnail === thumb ? 'border-orange-500 scale-105 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'}`}
                />
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-black uppercase text-gray-700 dark:text-gray-300 mb-1">
              Mô tả ngắn gọn nội dung
            </label>
            <textarea
              rows={2}
              disabled={!canPublish}
              placeholder="Ghi chú về mục tiêu bài học, cấp độ YCT, hướng dẫn phụ huynh và học sinh..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-xs sm:text-sm font-semibold text-gray-900 dark:text-gray-100 disabled:opacity-60"
            />
          </div>

          {/* Submit */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-200 font-bold text-xs"
            >
              Đóng
            </button>
            {canPublish ? (
              <button
                type="submit"
                disabled={isUploading}
                className={`px-6 py-2.5 rounded-xl text-white font-black text-xs shadow-lg transition flex items-center gap-1.5 ${
                  isUploading
                    ? 'bg-orange-400 cursor-not-allowed opacity-80'
                    : 'bg-orange-600 hover:bg-orange-700 shadow-orange-600/30'
                }`}
              >
                {isUploading ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Đang tải lên...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    <span>Đăng tài nguyên lên hệ thống</span>
                  </>
                )}
              </button>
            ) : (
              <button
                type="button"
                onClick={onOpenAuth}
                className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-black text-xs shadow-lg transition flex items-center gap-1.5"
              >
                Đăng nhập tài khoản quản trị
              </button>
            )}
          </div>

        </form>

      </div>
    </div>
  );
};
