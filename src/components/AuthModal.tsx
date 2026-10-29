import React, { useState, useEffect } from 'react';
import {
  Phone,
  Lock,
  Eye,
  EyeOff,
  X,
  LogIn,
  AlertCircle,
  CheckCircle2,
  User,
  LogOut,
  Flame,
  Award
} from 'lucide-react';
import { UserProfile } from '../types';
import {
  loginWithCredentials,
  logoutUser,
  saveStoredUser,
  fetchAccountsFromServer,
} from '../utils/storage';
import { sound } from '../utils/soundEffects';
import confetti from 'canvas-confetti';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onUserChange: (user: UserProfile) => void;
}

const AVATAR_OPTIONS = ['🐼', '👧', '👦', '🦁', '🦄', '🐰', '🦊', '🐱', '🚀', '⭐', '🌸', '👩‍🏫', '👨‍🏫'];

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  user,
  onUserChange,
}) => {
  const isCurrentlyLoggedIn = Boolean(user && user.isLoggedIn);

  // Form states
  const [identifier, setIdentifier] = useState(user.loginIdentifier || user.phone || user.email || '');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState('');

  // Profile view states (when logged in)
  const [editName, setEditName] = useState(user.name || '');
  const [editGrade, setEditGrade] = useState(user.grade || 'Tiểu học');
  const [editSchool, setEditSchool] = useState(user.school || '');
  const [editAvatar, setEditAvatar] = useState(user.avatar || '🐼');

  useEffect(() => {
    if (user) {
      setEditName(user.name || '');
      setEditGrade(user.grade || 'Tiểu học');
      setEditSchool(user.school || '');
      setEditAvatar(user.avatar || '🐼');
    }
  }, [user]);

  useEffect(() => {
    if (isOpen) {
      fetchAccountsFromServer();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Handle Login submission
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoginSuccess('');

    const res = loginWithCredentials(identifier, password);
    if (!res.success) {
      sound.playWrong();
      setLoginError(res.message);
      return;
    }

    sound.playVictory();
    confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
    setLoginSuccess('Đăng nhập thành công! Đang chuyển vào học ngay...');

    if (res.user) {
      onUserChange(res.user);
    }

    setTimeout(() => {
      onClose();
    }, 600);
  };

  // Handle Edit profile (when already logged in)
  const handleEditProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playCorrect();

    const updated: UserProfile = {
      ...user,
      name: editName.trim() || user.name,
      grade: editGrade.trim(),
      school: editSchool.trim() || user.school,
      avatar: editAvatar,
    };

    saveStoredUser(updated);
    onUserChange(updated);
    onClose();
  };

  // Handle Logout
  const handleLogout = () => {
    sound.playClick();
    if (window.confirm('Bạn có chắc muốn đăng xuất khỏi hệ thống không?')) {
      const unauthUser = logoutUser();
      onUserChange(unauthUser);
      setPassword('');
      setLoginError('');
      setLoginSuccess('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border-2 border-emerald-400/40 relative">
        
        {/* Close Button - available when logged in */}
        {isCurrentlyLoggedIn && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700 flex items-center justify-center text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-100 transition"
            title="Đóng cửa sổ"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* 1. APP BRANDING (TÊN APP) */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-3xl shadow-lg shadow-emerald-500/25 transform hover:scale-105 transition mb-3">
            🐼
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white tracking-tight uppercase leading-snug">
            VUI HỌC TIẾNG TRUNG CÙNG MS.LIÊN
          </h2>
          <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold mt-1">
            Cổng Học Liệu Số Chuẩn GDPT & YCT
          </p>
        </div>

        {/* 2. CHẾ ĐỘ CHƯA ĐĂNG NHẬP: CHỈ FORM ĐĂNG NHẬP VÀO HỌC NGAY */}
        {!isCurrentlyLoggedIn ? (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            
            {/* Error Message */}
            {loginError && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs font-bold animate-in fade-in">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            {/* Success Message */}
            {loginSuccess && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-bold animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{loginSuccess}</span>
              </div>
            )}

            {/* Field: Số điện thoại hoặc Gmail đăng ký */}
            <div>
              <label className="block text-xs font-black uppercase text-gray-700 dark:text-gray-300 mb-1.5">
                Số điện thoại hoặc Gmail đăng ký <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Phone className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  placeholder="Nhập số điện thoại hoặc địa chỉ gmail..."
                  value={identifier}
                  onChange={(e) => { setIdentifier(e.target.value); setLoginError(''); }}
                  className="w-full pl-10 pr-4 py-3 rounded-2xl border-2 border-gray-200 dark:border-slate-700 bg-gray-50/70 dark:bg-slate-800/80 text-sm font-bold text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-emerald-500 focus:bg-white dark:focus:bg-slate-800 outline-none transition"
                />
              </div>
            </div>

            {/* Field: Mật khẩu */}
            <div>
              <label className="block text-xs font-black uppercase text-gray-700 dark:text-gray-300 mb-1.5">
                Mật khẩu <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Nhập mật khẩu của bạn..."
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setLoginError(''); }}
                  className="w-full pl-10 pr-11 py-3 rounded-2xl border-2 border-gray-200 dark:border-slate-700 bg-gray-50/70 dark:bg-slate-800/80 text-sm font-bold text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-emerald-500 focus:bg-white dark:focus:bg-slate-800 outline-none transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition"
                  title={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Button: ĐĂNG NHẬP VÀO HỌC NGAY */}
            <button
              type="submit"
              className="w-full mt-2 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white font-black text-sm uppercase shadow-lg shadow-emerald-600/30 hover:brightness-105 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              <span>ĐĂNG NHẬP VÀO HỌC NGAY</span>
            </button>
          </form>
        ) : (
          /* 3. CHẾ ĐỘ ĐÃ ĐĂNG NHẬP: XEM VÀ CHỈNH SỬA HỒ SƠ */
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-teal-500/10 to-sky-500/10 dark:from-emerald-950/40 dark:to-slate-800 border border-emerald-200 dark:border-slate-700 flex items-center gap-4">
              <span className="text-4xl">{user.avatar}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-black text-gray-900 dark:text-white truncate">
                    {user.name}
                  </h3>
                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase shrink-0 ${
                    user.role === 'teacher' || user.role === 'admin'
                      ? 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300'
                      : 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300'
                  }`}>
                    {user.role === 'teacher' || user.role === 'admin' ? 'Giáo viên' : 'Học sinh'}
                  </span>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate">
                  Tài khoản: <strong>{user.phone || user.email || user.loginIdentifier}</strong>
                </div>
                <div className="flex items-center gap-3 mt-1.5 text-xs font-bold text-gray-700 dark:text-gray-300">
                  <span className="text-orange-500 flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 fill-orange-500" /> {user.streak} ngày
                  </span>
                  <span>Lv.{user.level}</span>
                  <span className="text-emerald-600 dark:text-emerald-400">{user.xp} XP</span>
                  <span className="text-amber-500">💎 {user.gems}</span>
                </div>
              </div>
            </div>

            {/* Badges list */}
            {user.badges && user.badges.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {user.badges.map((b, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800 flex items-center gap-1"
                  >
                    <Award className="w-3 h-3 text-amber-500" />
                    <span>{b}</span>
                  </span>
                ))}
              </div>
            )}

            {/* Edit Profile Form */}
            <form onSubmit={handleEditProfileSubmit} className="space-y-3 pt-2 border-t border-gray-100 dark:border-slate-800">
              <div>
                <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 mb-1">
                  Họ và tên
                </label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-sm font-bold text-gray-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 mb-1">
                    Khối lớp
                  </label>
                  <input
                    type="text"
                    value={editGrade}
                    onChange={(e) => setEditGrade(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-sm font-bold text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 mb-1">
                    Trường / Đơn vị
                  </label>
                  <input
                    type="text"
                    value={editSchool}
                    onChange={(e) => setEditSchool(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-sm font-bold text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 mb-1">
                  Đổi Avatar
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {AVATAR_OPTIONS.slice(0, 8).map((av) => (
                    <button
                      key={av}
                      type="button"
                      onClick={() => setEditAvatar(av)}
                      className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg ${
                        editAvatar === av
                          ? 'bg-emerald-500 text-white ring-2 ring-emerald-400'
                          : 'bg-gray-100 dark:bg-slate-800'
                      }`}
                    >
                      {av}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black uppercase transition"
                >
                  Lưu thay đổi
                </button>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="px-4 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 dark:bg-rose-950/40 dark:text-rose-300 text-xs font-black transition flex items-center gap-1.5"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Đăng xuất</span>
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
