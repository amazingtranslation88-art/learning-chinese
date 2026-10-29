import React, { useState } from 'react';
import {
  X,
  Upload,
  Sparkles,
  Image as ImageIcon,
  CheckCircle2,
  Palette,
  Eye,
  RefreshCw
} from 'lucide-react';
import { BannerConfig, CUTE_CARTOON_BANNERS, saveStoredBanner, getStoredBanner } from '../utils/storage';
import { sound } from '../utils/soundEffects';
import confetti from 'canvas-confetti';

interface ChangeBannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBannerChanged: (newBanner: BannerConfig) => void;
}

export const ChangeBannerModal: React.FC<ChangeBannerModalProps> = ({
  isOpen,
  onClose,
  onBannerChanged,
}) => {
  const [activeTab, setActiveTab] = useState<'preset' | 'upload'>('preset');
  const [selectedPreset, setSelectedPreset] = useState<string>(CUTE_CARTOON_BANNERS[0].url);
  const [previewUrl, setPreviewUrl] = useState<string>(getStoredBanner().imageUrl);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  if (!isOpen) return null;

  const handleSelectPreset = (url: string, themeName: string) => {
    sound.playClick();
    setSelectedPreset(url);
    setPreviewUrl(url);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    sound.playClick();
    setUploadedFile(file);
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

      if (response.ok) {
        const resData = await response.json();
        if (resData.url) {
          setPreviewUrl(resData.url);
          sound.playCorrect();
        }
      } else {
        const localUrl = URL.createObjectURL(file);
        setPreviewUrl(localUrl);
      }
    } catch (err) {
      const localUrl = URL.createObjectURL(file);
      setPreviewUrl(localUrl);
    } finally {
      setIsUploading(false);
    }
  };

  const handleApplyBanner = () => {
    sound.playVictory();
    confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });

    const newConfig: BannerConfig = {
      imageUrl: previewUrl,
      themeName: activeTab === 'preset'
        ? CUTE_CARTOON_BANNERS.find(b => b.url === previewUrl)?.title || 'Ảnh bìa hoạt hình'
        : 'Ảnh bìa tải lên từ máy tính',
      customUploaded: activeTab === 'upload',
    };

    saveStoredBanner(newConfig);
    onBannerChanged(newConfig);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border-2 border-amber-300 dark:border-amber-700 overflow-hidden">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-amber-500 via-rose-500 to-pink-500 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-3xl filter drop-shadow">🎨</span>
            <div>
              <h3 className="text-base sm:text-lg font-black text-white">
                TÙY CHỈNH ẢNH BÌA HOẠT HÌNH DỄ THƯƠNG
              </h3>
              <p className="text-xs text-pink-100 font-medium">
                Dành cho Quản trị viên (Gmail & Số điện thoại quản trị)
              </p>
            </div>
          </div>

          <button
            onClick={() => { sound.playClick(); onClose(); }}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switchers */}
        <div className="flex rounded-2xl bg-gray-100 dark:bg-slate-700/60 p-1 mx-4 sm:mx-6 mt-4 text-xs font-black">
          <button
            onClick={() => { sound.playClick(); setActiveTab('preset'); }}
            className={`flex-1 py-2 rounded-xl transition flex items-center justify-center gap-1.5 ${
              activeTab === 'preset'
                ? 'bg-white dark:bg-slate-800 text-rose-600 dark:text-rose-400 shadow-xs'
                : 'text-gray-600 dark:text-gray-300'
            }`}
          >
            <Palette className="w-4 h-4" />
            <span>Ảnh bìa hoạt hình có sẵn</span>
          </button>

          <button
            onClick={() => { sound.playClick(); setActiveTab('upload'); }}
            className={`flex-1 py-2 rounded-xl transition flex items-center justify-center gap-1.5 ${
              activeTab === 'upload'
                ? 'bg-white dark:bg-slate-800 text-rose-600 dark:text-rose-400 shadow-xs'
                : 'text-gray-600 dark:text-gray-300'
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>Tự tải ảnh từ máy tính lên</span>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          
          {/* Live Preview Box */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black uppercase text-gray-500 flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-amber-500" />
                <span>Xem trước ảnh bìa trên giao diện:</span>
              </span>
              <span className="text-[11px] text-emerald-600 font-bold">Chuẩn tỉ lệ hoạt hình</span>
            </div>

            <div className="relative rounded-2xl overflow-hidden aspect-[16/6] border-2 border-emerald-400/60 shadow-md group">
              <img
                src={previewUrl}
                alt="Banner preview"
                className="w-full h-full object-cover group-hover:scale-102 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-3 sm:p-4 text-white">
                <div className="flex items-center gap-1.5 text-[10px] font-black uppercase text-amber-300 mb-0.5">
                  <span>🐼 Vui Học Tiếng Trung Ms.Liên</span>
                </div>
                <h4 className="text-sm sm:text-base font-black drop-shadow uppercase">
                  APP VUI HỌC TIẾNG TRUNG
                </h4>
              </div>
            </div>
          </div>

          {/* TAB 1: Danh sách ảnh hoạt hình có sẵn */}
          {activeTab === 'preset' && (
            <div className="space-y-3">
              <span className="text-xs font-black uppercase text-gray-500 block">
                Chọn ảnh bìa hoạt hình yêu thích:
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {CUTE_CARTOON_BANNERS.map((preset) => {
                  const isSelected = previewUrl === preset.url;
                  return (
                    <div
                      key={preset.id}
                      onClick={() => handleSelectPreset(preset.url, preset.title)}
                      className={`group cursor-pointer rounded-2xl overflow-hidden border-2 p-2 transition flex items-center gap-3 ${
                        isSelected
                          ? 'border-rose-500 bg-rose-50/60 dark:bg-rose-950/40 ring-2 ring-rose-400/40 shadow-md'
                          : 'border-gray-200 dark:border-slate-700 bg-gray-50/60 dark:bg-slate-700/40 hover:border-rose-300'
                      }`}
                    >
                      <div className="w-16 h-12 rounded-xl overflow-hidden shrink-0 border border-gray-200 dark:border-slate-600">
                        <img
                          src={preset.url}
                          alt={preset.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-[10px] font-black px-1.5 py-0.5 rounded-md bg-amber-200/80 text-amber-900 font-sans">
                            {preset.tag}
                          </span>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-rose-600 shrink-0" />}
                        </div>
                        <h5 className="text-xs font-black text-gray-900 dark:text-gray-100 truncate mt-0.5">
                          {preset.title}
                        </h5>
                        <p className="text-[10px] text-gray-500 truncate">
                          {preset.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: Tự tải ảnh từ máy tính */}
          {activeTab === 'upload' && (
            <div className="space-y-3">
              <span className="text-xs font-black uppercase text-gray-500 block">
                Tải ảnh bìa tùy chọn từ máy tính hoặc điện thoại:
              </span>

              <label className="flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-dashed border-rose-300 dark:border-rose-700 bg-rose-50/40 dark:bg-rose-950/20 hover:bg-rose-50 cursor-pointer transition text-center">
                <Upload className="w-8 h-8 text-rose-500 mb-2 animate-bounce" />
                <span className="text-xs font-black text-gray-800 dark:text-gray-200">
                  {isUploading ? 'Đang tải tệp lên hệ thống...' : 'Bấm để chọn ảnh từ máy tính (PNG, JPG, WebP)'}
                </span>
                <span className="text-[10px] text-gray-400 mt-1">
                  Khuyên dùng ảnh phong cách hoạt hình, tỉ lệ ngang (16:9 hoặc 3:1)
                </span>
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,image/webp"
                  onChange={handleFileUpload}
                  className="hidden"
                  disabled={isUploading}
                />
              </label>

              {uploadedFile && (
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center justify-between">
                  <span>Tệp đã chọn: {uploadedFile.name}</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>
              )}
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 dark:bg-slate-700/60 border-t border-gray-100 dark:border-slate-700 flex items-center justify-between gap-3 shrink-0">
          <button
            onClick={() => { sound.playClick(); onClose(); }}
            className="px-4 py-2.5 rounded-xl text-gray-600 dark:text-gray-300 font-bold text-xs hover:bg-gray-200 transition"
          >
            Hủy bỏ
          </button>

          <button
            onClick={handleApplyBanner}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-black text-xs shadow-md shadow-rose-500/30 transition active:scale-95 flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4" />
            <span>Lưu & Áp dụng ảnh bìa</span>
          </button>
        </div>

      </div>
    </div>
  );
};
