import React from 'react';
import { Phone, MessageCircle, Heart, ShieldCheck, Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-slate-900 text-slate-300 border-t border-slate-800 transition-colors mt-auto">
      {/* Top Footer Details */}
      <div className="max-w-[1280px] mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center border-b border-slate-800 pb-6 text-center md:text-left">
          
          {/* Brand Info */}
          <div>
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <span className="text-2xl">🐼</span>
              <span className="text-base sm:text-lg font-black text-white tracking-wide">
                VUI HỌC TIẾNG TRUNG CÙNG MS.LIÊN
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm mx-auto md:mx-0">
              Kho học liệu số môn Tiếng Trung dành cho học sinh Tiểu học và THCS Lớp 6, 7, 8, 9 theo chương trình GDPT mới Bộ GD&ĐT, chuẩn YCT (1 – 6) & chuẩn HSK (1 – 3) phiên bản 3.0 mới nhất.
            </p>
          </div>

          {/* Hotline & Zalo Contact Center */}
          <div className="flex flex-col items-center justify-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Hotline Tư Vấn & Hỗ Trợ Kỹ Thuật
            </span>
            <a
              href="tel:0976817231"
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-400 font-black text-base sm:text-lg transition shadow-md group"
            >
              <div className="w-7 h-7 rounded-full bg-emerald-500 text-slate-900 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Phone className="w-4 h-4 fill-slate-900" />
              </div>
              <span>0976817231</span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-600/30 text-blue-300 border border-blue-500/30">
                Zalo
              </span>
            </a>
            <span className="text-[11px] text-slate-400 mt-1 font-medium">
              Cô giáo Bùi Ngọc Liên – Tác giả & Giáo viên Tiếng Trung
            </span>
          </div>

          {/* Standards & Badges */}
          <div className="flex flex-col items-center md:items-end justify-center text-xs text-slate-400 gap-1.5">
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>Chuẩn Bộ GD&ĐT Việt Nam, YCT 1–6 & HSK 1–3 (3.0)</span>
            </div>
            <div>Bảo trợ nội dung: Cô Bùi Ngọc Liên</div>
            <div className="text-[11px] text-slate-500">Font chữ Arial • Bộ mã Unicode chuẩn</div>
          </div>

        </div>

        {/* Bottom Exact Copyright Requirement */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          
          {/* Bottom Left: Exact copyright text requested */}
          <div className="font-bold text-slate-200 text-center sm:text-left">
            Bản quyền thuộc về Cô giáo Bùi Ngọc Liên
          </div>

          {/* Bottom Center: Phone & Zalo */}
          <div className="flex items-center justify-center gap-3 font-extrabold text-emerald-400">
            <span className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5" /> 0976817231
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-sky-400">
              <MessageCircle className="w-3.5 h-3.5" /> Zalo: 0976817231
            </span>
          </div>

          {/* Bottom Right: Author note */}
          <div className="text-slate-400 text-center sm:text-right text-[11px]">
            Tác giả: Cô Bùi Ngọc Liên
          </div>

        </div>
      </div>
    </footer>
  );
};
