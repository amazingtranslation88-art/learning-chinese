import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Headphones,
  Mic,
  ChevronUp,
  X,
  Palette,
  Image as ImageIcon
} from 'lucide-react';
import { UserProfile } from '../types';
import {
  BannerConfig,
  getStoredBanner,
  isAuthorizedPublisher,
  BANNER_UPDATED_EVENT,
  fetchBannerFromServer
} from '../utils/storage';
import { sound } from '../utils/soundEffects';
import { ChangeBannerModal } from './ChangeBannerModal';

interface HeaderBannerProps {
  user?: UserProfile;
}

export const HeaderBanner: React.FC<HeaderBannerProps> = ({ user }) => {
  const [collapsedMobile, setCollapsedMobile] = useState<boolean>(true);
  const [closedMobile, setClosedMobile] = useState<boolean>(false);
  const [bannerConfig, setBannerConfig] = useState<BannerConfig>(getStoredBanner());
  const [changeBannerOpen, setChangeBannerOpen] = useState<boolean>(false);

  const canChangeBanner = isAuthorizedPublisher(user);

  useEffect(() => {
    fetchBannerFromServer().then((b) => setBannerConfig(b));

    const handleUpdate = (e: any) => {
      if (e.detail) {
        setBannerConfig(e.detail);
      } else {
        setBannerConfig(getStoredBanner());
      }
    };

    window.addEventListener(BANNER_UPDATED_EVENT, handleUpdate);
    return () => window.removeEventListener(BANNER_UPDATED_EVENT, handleUpdate);
  }, []);

  return (
    <div className="w-full max-w-[1280px] mx-auto px-2 sm:px-4 pt-1 sm:pt-3 pb-1">
      
      {/* 1. MOBILE ONLY ULTRA-COMPACT BAR (< 640px) */}
      {!closedMobile && (
        <div className="sm:hidden mb-1">
          {collapsedMobile ? (
            <div className="relative overflow-hidden rounded-2xl p-2 text-white flex items-center justify-between shadow-md border-2 border-amber-300/60 bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600">
              {/* Background preview */}
              <div
                className="absolute inset-0 bg-cover bg-center opacity-30 pointer-events-none"
                style={{ backgroundImage: `url(${bannerConfig.imageUrl})` }}
              />

              <div className="relative z-10 flex items-center gap-1.5 min-w-0">
                <span className="text-xl filter drop-shadow">🐼</span>
                <span className="font-black text-[11px] truncate uppercase tracking-tight text-white drop-shadow">
                  Vui Học Tiếng Trung Ms.Liên
                </span>
                <span className="bg-amber-400 text-amber-950 text-[9px] font-black px-1.5 py-0.2 rounded-full uppercase shrink-0">
                  YCT & GDPT
                </span>
              </div>

              <div className="relative z-10 flex items-center gap-1 shrink-0 ml-1">
                {canChangeBanner && (
                  <button
                    type="button"
                    onClick={() => { sound.playClick(); setChangeBannerOpen(true); }}
                    className="p-1 rounded-lg bg-amber-400 text-amber-950 text-[10px] font-black flex items-center gap-1 shadow-xs"
                    title="Đổi ảnh bìa hoạt hình"
                  >
                    <Palette className="w-3 h-3" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setCollapsedMobile(false)}
                  className="px-2 py-0.5 rounded-lg bg-white/20 text-[10px] font-bold text-white hover:bg-white/30"
                  title="Xem chi tiết giới thiệu"
                >
                  Chi tiết
                </button>
                <button
                  type="button"
                  onClick={() => setClosedMobile(true)}
                  className="p-1 rounded-lg text-emerald-100 hover:text-white hover:bg-white/10"
                  title="Ẩn"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="relative rounded-2xl overflow-hidden text-white p-4 shadow-lg border-2 border-amber-300/60 text-center animate-in fade-in bg-gradient-to-r from-emerald-700 via-teal-700 to-sky-700">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-35 pointer-events-none"
                style={{ backgroundImage: `url(${bannerConfig.imageUrl})` }}
              />

              <div className="absolute top-2 right-2 flex items-center gap-1 z-10">
                {canChangeBanner && (
                  <button
                    type="button"
                    onClick={() => { sound.playClick(); setChangeBannerOpen(true); }}
                    className="p-1.5 rounded-full bg-amber-400 text-amber-950 text-xs font-bold shadow-xs"
                    title="Đổi ảnh bìa hoạt hình"
                  >
                    <Palette className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setCollapsedMobile(true)}
                  className="p-1 rounded-full bg-black/30 text-white text-xs flex items-center gap-1 px-2"
                >
                  <span>Thu gọn</span>
                  <ChevronUp className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="relative z-10 flex items-center justify-center gap-2 mb-1">
                <span className="text-2xl filter drop-shadow">🐼</span>
                <h1 className="text-sm sm:text-base font-black uppercase text-amber-300 drop-shadow">
                  APP VUI HỌC TIẾNG TRUNG
                </h1>
              </div>

              <p className="relative z-10 text-[11px] text-emerald-100 font-bold mb-2 drop-shadow">
                Tác giả: Cô Bùi Ngọc Liên – Chuẩn Bộ GD&ĐT & YCT 1–6
              </p>

              <div className="relative z-10 flex flex-wrap items-center justify-center gap-1.5 text-[10px]">
                <span className="bg-white/20 backdrop-blur-xs px-2 py-0.5 rounded-full font-bold">🌟 Hoạt hình dễ thương</span>
                <span className="bg-white/20 backdrop-blur-xs px-2 py-0.5 rounded-full font-bold">🎯 Luyện mỗi ngày</span>
                <span className="bg-white/20 backdrop-blur-xs px-2 py-0.5 rounded-full font-bold">🚀 Giỏi Tiếng Trung</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 2. TABLET & DESKTOP FULL BANNER (>= 640px) */}
      <div className="hidden sm:flex relative w-full min-h-[195px] md:h-[235px] rounded-3xl overflow-hidden shadow-2xl border-4 border-amber-300/70 text-white flex-col justify-between p-4 sm:p-6 md:p-7 select-none transition-all duration-300 bg-gradient-to-r from-emerald-800/90 via-teal-800/85 to-sky-800/90">
        
        {/* Adorable Cartoon Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-45 pointer-events-none transition-all duration-700 filter brightness-105"
          style={{ backgroundImage: `url(${bannerConfig.imageUrl})` }}
        />

        {/* Candy cartoon gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/60 via-teal-900/40 to-sky-900/60 pointer-events-none" />

        {/* Decorative Playful Elements */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_2px,transparent_2px)] [background-size:24px_24px] pointer-events-none" />
        <div className="absolute -top-12 -left-12 w-48 h-48 bg-amber-400/25 rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute -bottom-12 -right-12 w-56 h-56 bg-pink-400/25 rounded-full blur-3xl pointer-events-none animate-pulse" />

        {/* Top Badges & Admin Change Banner Button */}
        <div className="relative z-10 flex items-center justify-between w-full">
          {/* Left Cute Mascot Badge */}
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/30 shadow-lg text-emerald-100 text-xs md:text-sm font-bold">
            <span className="text-2xl filter drop-shadow">🐼</span>
            <span className="font-black text-white">VUI HỌC TIẾNG TRUNG CÙNG MS.LIÊN</span>
            <span className="bg-amber-400 text-amber-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase ml-1 shadow-2xs">
              Chuẩn GDPT & YCT
            </span>
          </div>

          {/* Right Action & Audio Badges */}
          <div className="flex items-center gap-2 ml-auto">
            {/* Admin Change Banner Button */}
            {canChangeBanner && (
              <button
                type="button"
                onClick={() => { sound.playClick(); setChangeBannerOpen(true); }}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-300 hover:to-orange-300 text-amber-950 font-black text-xs shadow-lg shadow-orange-500/25 transition active:scale-95 border border-amber-200"
                title="Thay đổi ảnh bìa hoạt hình (Tải lên hoặc chọn có sẵn)"
              >
                <Palette className="w-3.5 h-3.5" />
                <span>Đổi ảnh bìa hoạt hình 🎨</span>
              </button>
            )}

            <div className="flex items-center gap-1.5 bg-sky-500/35 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-xs font-semibold text-sky-100">
              <Headphones className="w-3.5 h-3.5 text-yellow-300 animate-bounce" />
              <span>Nghe – Nói Hoạt Hình</span>
            </div>
            <div className="flex items-center gap-1.5 bg-emerald-500/35 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-xs font-semibold text-emerald-100">
              <Mic className="w-3.5 h-3.5 text-rose-300" />
              <span>Luyện phát âm</span>
            </div>
          </div>
        </div>

        {/* Center Main Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center my-auto px-2">
          
          {/* Main Title */}
          <div className="relative inline-block mb-1 sm:mb-2">
            {/* Cute Cartoon Floating Badges Left/Right */}
            <div className="hidden lg:flex absolute -left-32 top-1/2 -translate-y-1/2 items-center gap-2 bg-emerald-950/70 backdrop-blur-md p-2.5 rounded-2xl border-2 border-emerald-400/50 shadow-xl">
              <span className="text-3xl filter drop-shadow">👦🎒</span>
              <div className="text-left">
                <span className="block text-[11px] font-black text-amber-300">Pinyin Hoạt Hình</span>
                <span className="block text-[10px] text-emerald-200">你好 • Nǐ hǎo 🌸</span>
              </div>
            </div>

            <div className="hidden lg:flex absolute -right-32 top-1/2 -translate-y-1/2 items-center gap-2 bg-sky-950/70 backdrop-blur-md p-2.5 rounded-2xl border-2 border-sky-400/50 shadow-xl">
              <div className="text-right">
                <span className="block text-[11px] font-black text-yellow-300">10 Trò Chơi Vui</span>
                <span className="block text-[10px] text-sky-200">Đấu trường Hán ngữ ⚔️</span>
              </div>
              <span className="text-3xl filter drop-shadow">👧🎧</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)] uppercase flex items-center justify-center gap-2">
              <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-amber-300 inline-block animate-spin" style={{ animationDuration: '8s' }} />
              <span className="bg-gradient-to-r from-yellow-200 via-amber-300 to-rose-200 bg-clip-text text-transparent">
                APP VUI HỌC TIẾNG TRUNG
              </span>
              <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-amber-300 inline-block animate-spin" style={{ animationDuration: '8s' }} />
            </h1>
          </div>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg font-bold text-emerald-100 drop-shadow max-w-2xl flex items-center justify-center gap-2 flex-wrap">
            <span className="inline-block bg-white/25 backdrop-blur-md px-3 py-0.5 rounded-full text-yellow-200 font-black text-xs sm:text-sm shadow-xs">
              🌟 Học dễ hiểu
            </span>
            <span>–</span>
            <span className="inline-block bg-white/25 backdrop-blur-md px-3 py-0.5 rounded-full text-emerald-200 font-black text-xs sm:text-sm shadow-xs">
              🎯 Luyện mỗi ngày
            </span>
            <span>–</span>
            <span className="inline-block bg-white/25 backdrop-blur-md px-3 py-0.5 rounded-full text-cyan-200 font-black text-xs sm:text-sm shadow-xs">
              🚀 Giỏi TIẾNG TRUNG nhanh chóng
            </span>
          </p>
        </div>

        {/* Bottom Line: Author credit */}
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-1 pt-1.5 border-t border-white/20 text-xs text-emerald-100">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-amber-400 text-amber-950 font-black text-[10px]">
              ★
            </span>
            <span className="font-extrabold text-white text-xs sm:text-sm">
              Tác giả: Cô Bùi Ngọc Liên – Giáo viên Tiếng Trung
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-teal-200 font-semibold">
            <span>YCT1 đến YCT6 • HSK1 đến HSK3 (3.0 Mới)</span>
            <span>•</span>
            <span className="text-yellow-300 font-black">Chuẩn Bộ GD&ĐT Việt Nam 🇻🇳</span>
          </div>
        </div>

      </div>

      {/* Modal Đổi Ảnh Bìa Hoạt Hình */}
      <ChangeBannerModal
        isOpen={changeBannerOpen}
        onClose={() => setChangeBannerOpen(false)}
        onBannerChanged={(newB) => setBannerConfig(newB)}
      />

    </div>
  );
};
