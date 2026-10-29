import React, { useState, useEffect } from 'react';
import {
  Edit,
  X,
  Upload,
  CheckCircle2,
  AlertCircle,
  FileText,
  Video,
  File,
  Image as ImageIcon
} from 'lucide-react';
import { LectureMaterial, UserProfile } from '../types';
import { updateMaterial, isAuthorizedPublisher, ADMIN_EMAIL } from '../utils/storage';
import { sound } from '../utils/soundEffects';

interface EditModalProps {
  material: LectureMaterial | null;
  user?: UserProfile;
  onClose: () => void;
  onSuccess: () => void;
}

export const EditModal: React.FC<EditModalProps> = ({ material, user, onClose, onSuccess }) => {
  const [title, setTitle] = useState('');
  const [grade, setGrade] = useState('Tiểu học');
  const [type, setType] = useState<'pptx' | 'pdf' | 'word' | 'image' | 'video' | 'drive' | 'youtube' | 'web'>('pptx');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (material) {
      setTitle(material.title || '');
      setGrade(material.grade || 'Tiểu học');
      setType(material.type || 'pptx');
      setUrl(material.url || '');
      setDescription(material.description || '');
      setUploadedFileName('');
      setErrorMsg('');
    }
  }, [material]);

  if (!material) return null;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMsg('');
    setUploadedFileName(file.name);

    const lowerName = file.name.toLowerCase();
    if (lowerName.endsWith('.mp4') || lowerName.endsWith('.webm') || lowerName.endsWith('.mov') || lowerName.endsWith('.avi')) {
      setType('video');
    } else if (lowerName.endsWith('.pptx') || lowerName.endsWith('.ppt')) {
      setType('pptx');
    } else if (lowerName.endsWith('.pdf')) {
      setType('pdf');
    } else if (lowerName.endsWith('.docx') || lowerName.endsWith('.doc')) {
      setType('word');
    } else if (lowerName.endsWith('.png') || lowerName.endsWith('.jpg') || lowerName.endsWith('.jpeg') || lowerName.endsWith('.webp')) {
      setType('image');
    }

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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileName: file.name,
          fileData: base64Data,
        }),
      });

      if (!response.ok) {
        throw new Error('Lỗi khi tải tệp thay thế');
      }

      const resData = await response.json();
      if (resData.url) {
        setUrl(resData.url);
      }
    } catch (err: any) {
      console.warn('Fallback object URL:', err);
      setUrl(URL.createObjectURL(file));
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrorMsg('Vui lòng nhập tên tài nguyên');
      return;
    }

    sound.playCorrect();
    updateMaterial({
      ...material,
      title: title.trim(),
      grade,
      type,
      url: url.trim(),
      description: description.trim(),
    });

    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-gray-100 dark:border-slate-700">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-slate-700 mb-5">
          <div className="flex items-center gap-2">
            <Edit className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-black text-gray-900 dark:text-gray-100">
              SỬA / THAY THẾ TÀI NGUYÊN HỌC TẬP
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 dark:bg-slate-700 flex items-center justify-center text-gray-500 font-bold"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {errorMsg && (
          <div className="p-3 mb-4 rounded-xl bg-rose-50 text-rose-700 text-xs font-bold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-black uppercase text-gray-700 dark:text-gray-300 mb-1">
              Tên tài nguyên / bài giảng <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-xs sm:text-sm font-semibold text-gray-900 dark:text-gray-100"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-black uppercase text-gray-700 dark:text-gray-300 mb-1">
                Cấp độ / Khối lớp
              </label>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-xs sm:text-sm font-semibold text-gray-900 dark:text-gray-100"
              >
                <optgroup label="Chuẩn YCT">
                  <option value="YCT1">YCT1</option>
                  <option value="YCT2">YCT2</option>
                  <option value="YCT3">YCT3</option>
                  <option value="YCT4">YCT4</option>
                  <option value="YCT5">YCT5</option>
                  <option value="YCT6">YCT6</option>
                </optgroup>
                <optgroup label="Khung GDPT">
                  <option value="Tiểu học">Tiểu học</option>
                  <option value="Lớp 6">Lớp 6</option>
                  <option value="Lớp 7">Lớp 7</option>
                  <option value="Lớp 8">Lớp 8</option>
                  <option value="Lớp 9">Lớp 9</option>
                </optgroup>
                <optgroup label="HSK 3.0">
                  <option value="HSK 1">HSK 1</option>
                  <option value="HSK 2">HSK 2</option>
                  <option value="HSK 3">HSK 3</option>
                </optgroup>
                <option value="Chung">Dùng chung</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-black uppercase text-gray-700 dark:text-gray-300 mb-1">
                Định dạng
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-xs sm:text-sm font-semibold text-gray-900 dark:text-gray-100"
              >
                <option value="pptx">PowerPoint (.pptx, .ppt)</option>
                <option value="pdf">Tài liệu PDF (.pdf)</option>
                <option value="word">Microsoft Word (.docx, .doc)</option>
                <option value="image">Hình ảnh / Poster (.png, .jpg, .webp)</option>
                <option value="video">Video MP4 (.mp4, .webm)</option>
                <option value="drive">Google Drive</option>
                <option value="youtube">YouTube</option>
                <option value="web">Web / Link khác</option>
              </select>
            </div>
          </div>

          {/* Replace file from device */}
          <div className="p-3.5 rounded-2xl bg-blue-50/70 dark:bg-slate-700/60 border-2 border-dashed border-blue-300 dark:border-slate-600 text-center">
            <label className="inline-block cursor-pointer px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition">
              <span>{isUploading ? 'Đang tải tệp thay thế...' : '📁 Thay thế tệp từ máy tính (Word, PDF, PNG, MP4, PPTX...)'}</span>
              <input
                type="file"
                disabled={isUploading}
                accept=".pptx,.ppt,.pdf,.docx,.doc,.mp4,.webm,.mov,.png,.jpg,.jpeg,.webp"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>

            {uploadedFileName && (
              <div className="mt-2 text-xs font-bold text-emerald-700 dark:text-emerald-300 flex items-center justify-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Đã nạp file thay thế: {uploadedFileName}</span>
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-black uppercase text-gray-700 dark:text-gray-300 mb-1">
              Đường link tệp / URL
            </label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-xs sm:text-sm font-semibold text-gray-900 dark:text-gray-100"
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase text-gray-700 dark:text-gray-300 mb-1">
              Mô tả nội dung
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-xs sm:text-sm font-semibold text-gray-900 dark:text-gray-100"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-200 font-bold text-xs"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isUploading}
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs shadow-lg transition"
            >
              Lưu thay đổi &amp; Cập nhật
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
