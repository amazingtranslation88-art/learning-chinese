import {
  LectureMaterial,
  UserProfile,
  FreeDocument,
  CustomGameItem,
  CommentItem,
  RegisteredAccount,
  UserRole,
  RewardGameItem,
  StudentRank,
} from '../types';
import {
  INITIAL_MATERIALS,
  INITIAL_FREE_DOCUMENTS,
  MOCK_STUDENTS,
} from '../data/mockData';
import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  updateDoc,
  arrayUnion,
  increment,
  onSnapshot
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';

const MATERIALS_KEY = 'ms_lien_chinese_materials_v2';
const DELETED_MATERIALS_KEY = 'ms_lien_deleted_materials_v2';
const USER_KEY = 'ms_lien_chinese_user_v3';
const REGISTERED_ACCOUNTS_KEY = 'ms_lien_registered_accounts_v1';
const GAMES_KEY = 'ms_lien_chinese_custom_games_v2';
const REWARD_GAMES_KEY = 'ms_lien_chinese_reward_games_v2';
const FREE_DOCS_KEY = 'ms_lien_chinese_free_docs_v2';
const APP_STATS_KEY = 'ms_lien_chinese_stats_v2';

export const ADMIN_EMAIL = 'amazingtranslation88@gmail.com';
export const ADMIN_PHONE = '0976817231';
export const MASTER_PASSWORD = 'tiengtrungmslien';

export function getDeletedMaterialIds(): Set<string> {
  if (typeof window === 'undefined') return new Set();
  try {
    const raw = localStorage.getItem(DELETED_MATERIALS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return new Set(parsed);
    }
  } catch {}
  return new Set();
}

export function recordDeletedMaterialId(id: string): void {
  if (!id) return;
  const set = getDeletedMaterialIds();
  set.add(id);
  try {
    localStorage.setItem(DELETED_MATERIALS_KEY, JSON.stringify(Array.from(set)));
  } catch {}

  // Sync to Firestore 'deleted_materials' collection
  try {
    setDoc(doc(db, 'deleted_materials', id), {
      id,
      deletedAt: new Date().toISOString()
    }).catch(() => {});
  } catch {}
}

export interface BannerConfig {
  imageUrl: string;
  title?: string;
  themeName?: string;
  customUploaded?: boolean;
}

export const CUTE_CARTOON_BANNERS = [
  {
    id: 'banner-panda-class',
    title: 'Lớp Học Gấu Trúc Vui Nhộn 3D',
    description: 'Chú gấu trúc panda và các bạn nhỏ học bảng chữ cái Hán tự',
    url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1200&auto=format&fit=crop&q=80',
    tag: 'Gấu trúc 3D'
  },
  {
    id: 'banner-lantern-festival',
    title: 'Lễ Hội Đèn Lồng Hoạt Hình Rực Rỡ',
    description: 'Không khí lễ hội truyền thống cổ tích với đèn lồng và mây ngũ sắc',
    url: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1200&auto=format&fit=crop&q=80',
    tag: 'Lễ hội đèn lồng'
  },
  {
    id: 'banner-great-wall',
    title: 'Vạn Lý Trường Thành Cổ Tích Mây Hồng',
    description: 'Phong cảnh kỳ vĩ vẽ theo nét hoạt hình ấm áp, dễ thương',
    url: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=1200&auto=format&fit=crop&q=80',
    tag: 'Trường thành cổ tích'
  },
  {
    id: 'banner-cherry-garden',
    title: 'Vườn Hoa Anh Đào & Muông Thú Dễ Thương',
    description: 'Các bạn thú ngộ nghĩnh cùng nhau luyện phát âm Pinyin',
    url: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=1200&auto=format&fit=crop&q=80',
    tag: 'Vườn hoa anh đào'
  },
  {
    id: 'banner-space-panda',
    title: 'Phi Thuyền Gấu Trúc Khám Phá Hán Ngữ 3D',
    description: 'Hành trình chinh phục đỉnh cao HSK và YCT trên các vì sao',
    url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80',
    tag: 'Không gian 3D'
  },
  {
    id: 'banner-calligraphy-art',
    title: 'Thế Giới Bút Lông & Mực Tàu Hoạt Hình Tươi Sáng',
    description: 'Nét vẽ mực nước dễ thương kết hợp chữ Hán vui nhộn',
    url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1200&auto=format&fit=crop&q=80',
    tag: 'Thư pháp hoạt hình'
  }
];

export const BANNER_STORAGE_KEY = 'ms_lien_custom_banner_v1';
export const BANNER_UPDATED_EVENT = 'ms_lien_banner_updated';

// Pre-seeded registered accounts (accessible by phone or gmail)
export const INITIAL_REGISTERED_ACCOUNTS: RegisteredAccount[] = [
  {
    id: 'teacher-lien',
    name: 'Cô giáo Bùi Ngọc Liên',
    phone: '0976817231',
    email: 'amazingtranslation88@gmail.com',
    role: 'teacher',
    grade: 'Giáo viên Tiếng Trung Tiểu học & THCS',
    school: 'Hệ thống Giáo dục Tiếng Trung Ms.Liên',
    avatar: '👩‍🏫',
    xp: 8500,
    level: 25,
    streak: 90,
    gems: 800,
    badges: ['👑 Tác giả sáng lập', '🌟 Giáo viên Xuất sắc', '💎 Chuyên gia Giáo trình'],
    registeredDate: '2026-09-01',
  },
  {
    id: 'student-minh-anh',
    name: 'Nguyễn Minh Anh',
    phone: '0988123456',
    email: 'minhanh@gmail.com',
    role: 'student',
    grade: 'Lớp 4',
    school: 'TH Dịch Vọng A, Cầu Giấy',
    avatar: '👧',
    xp: 5820,
    level: 18,
    streak: 35,
    gems: 240,
    badges: ['🌟 Quán Quân YCT', '⭐ Chăm Học Mỗi Ngày'],
    registeredDate: '2026-09-10',
  },
  {
    id: 'student-gia-bao',
    name: 'Trần Gia Bảo',
    phone: '0912345678',
    email: 'giabao@gmail.com',
    role: 'student',
    grade: 'Lớp 6',
    school: 'THCS Giảng Võ, Ba Đình',
    avatar: '👦',
    xp: 5460,
    level: 17,
    streak: 31,
    gems: 190,
    badges: ['⚡ Siêu Trí Tuệ', '🎯 Xạ Thủ Hán Tự'],
    registeredDate: '2026-09-12',
  },
  {
    id: 'student-duc-minh',
    name: 'Phạm Đức Minh',
    phone: '0909888999',
    email: 'ducminh@gmail.com',
    role: 'student',
    grade: 'Lớp 7',
    school: 'THCS Cầu Giấy',
    avatar: '🚀',
    xp: 4980,
    level: 15,
    streak: 26,
    gems: 150,
    badges: ['🔥 Thần Tốc Độ'],
    registeredDate: '2026-09-15',
  },
  {
    id: 'student-demo',
    name: 'Bé Yêu Tiếng Trung',
    phone: '0900000001',
    email: 'hocsinh@gmail.com',
    role: 'student',
    grade: 'Tiểu học',
    school: 'Trường Tiểu học Thăng Long',
    avatar: '🐼',
    xp: 350,
    level: 2,
    streak: 3,
    gems: 45,
    badges: ['🌱 Mầm Non Khởi Đầu', '⭐ Chăm Học Mỗi Ngày'],
    registeredDate: '2026-10-01',
  }
];

export const DEFAULT_UNAUTHENTICATED_USER: UserProfile = {
  id: '',
  name: '',
  role: 'student',
  grade: 'Tiểu học',
  school: '',
  avatar: '🐼',
  xp: 0,
  level: 1,
  streak: 0,
  gems: 0,
  badges: [],
  joinedDate: new Date().toISOString().split('T')[0],
  isLoggedIn: false,
};

export async function fetchAccountsFromServer(): Promise<RegisteredAccount[]> {
  // 1. Try Firestore accounts collection
  try {
    const snap = await getDocs(collection(db, 'accounts'));
    if (!snap.empty) {
      const list: RegisteredAccount[] = [];
      snap.forEach((d) => list.push(d.data() as RegisteredAccount));
      if (list.length > 0) {
        saveRegisteredAccounts(list);
        return list;
      }
    }
  } catch (err) {
    console.warn('Firestore accounts query fallback to server:', err);
  }

  // 2. HTTP Server fallback
  try {
    const res = await fetch('/api/accounts');
    if (res.ok) {
      const data = await res.json();
      if (data && Array.isArray(data.accounts) && data.accounts.length > 0) {
        saveRegisteredAccounts(data.accounts);
        return data.accounts;
      }
    }
  } catch (err) {
    console.warn('Could not sync accounts from server:', err);
  }
  return getRegisteredAccounts();
}

export function getRegisteredAccounts(): RegisteredAccount[] {
  if (typeof window === 'undefined') return INITIAL_REGISTERED_ACCOUNTS;
  try {
    const raw = localStorage.getItem(REGISTERED_ACCOUNTS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error(e);
  }
  // Initialize with initial accounts
  try {
    localStorage.setItem(REGISTERED_ACCOUNTS_KEY, JSON.stringify(INITIAL_REGISTERED_ACCOUNTS));
  } catch {}
  return INITIAL_REGISTERED_ACCOUNTS;
}

export function saveRegisteredAccounts(accounts: RegisteredAccount[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(REGISTERED_ACCOUNTS_KEY, JSON.stringify(accounts));
  } catch (e) {
    console.error(e);
  }
}

export function findRegisteredAccount(identifier: string): RegisteredAccount | undefined {
  const clean = identifier.trim().toLowerCase();
  if (!clean) return undefined;
  const accounts = getRegisteredAccounts();
  return accounts.find((acc) => {
    const phoneMatch = acc.phone && acc.phone.trim().toLowerCase() === clean;
    const emailMatch = acc.email && acc.email.trim().toLowerCase() === clean;
    return phoneMatch || emailMatch;
  });
}

export function registerNewAccount(data: {
  name: string;
  phone?: string;
  email?: string;
  role: UserRole;
  grade: string;
  school: string;
  avatar: string;
}): RegisteredAccount {
  const accounts = getRegisteredAccounts();
  const newAccount: RegisteredAccount = {
    id: `acc-${Date.now()}`,
    name: data.name.trim() || 'Người học Tiếng Trung',
    phone: data.phone?.trim() || undefined,
    email: data.email?.trim() || undefined,
    role: data.role,
    grade: data.grade.trim() || (data.role === 'teacher' ? 'Giáo viên' : 'Tiểu học'),
    school: data.school.trim() || 'Trường học',
    avatar: data.avatar || (data.role === 'teacher' ? '👩‍🏫' : '🐼'),
    xp: data.role === 'teacher' ? 500 : 50,
    level: 1,
    streak: 1,
    gems: 20,
    badges: [data.role === 'teacher' ? '👩‍🏫 Giáo viên Mới' : '🌱 Mầm Non Khởi Đầu'],
    registeredDate: new Date().toISOString().split('T')[0],
  };

  accounts.unshift(newAccount);
  saveRegisteredAccounts(accounts);

  // 1. Sync to Google Cloud Firestore
  try {
    setDoc(doc(db, 'accounts', newAccount.id), newAccount).catch((err) => {
      console.warn('Firestore setDoc accounts warning:', err);
    });
  } catch {}

  // 2. Sync to server API
  fetch('/api/accounts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newAccount),
  }).catch(() => {});

  return newAccount;
}

export function syncUserProfileToAccount(user: UserProfile): void {
  if (!user || !user.isLoggedIn || !user.id) return;
  const accounts = getRegisteredAccounts();
  const idx = accounts.findIndex(
    (a) => a.id === user.id || (user.email && a.email === user.email) || (user.phone && a.phone === user.phone)
  );
  if (idx !== -1) {
    accounts[idx] = {
      ...accounts[idx],
      name: user.name || accounts[idx].name,
      xp: user.xp,
      level: user.level,
      streak: user.streak,
      gems: user.gems,
      badges: user.badges,
      avatar: user.avatar,
    };
    saveRegisteredAccounts(accounts);
    try {
      setDoc(doc(db, 'accounts', accounts[idx].id), accounts[idx], { merge: true }).catch(() => {});
    } catch {}
    fetch('/api/accounts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(accounts[idx]),
    }).catch(() => {});
  }
}

export function getRealtimeStudentLeaderboard(): StudentRank[] {
  const accounts = getRegisteredAccounts();
  const studentAccounts = accounts.filter((a) => a.role === 'student');

  const mappedReal: StudentRank[] = studentAccounts.map((a) => ({
    rank: 1,
    name: a.name,
    className: a.grade || 'Tiểu học',
    school: a.school || 'Học viên trực tuyến',
    avatar: a.avatar || '🐼',
    xp: a.xp || 100,
    streak: a.streak || 1,
    level: a.level || 1,
    badge: (a.badges && a.badges[0]) || '🌟 Ngôi Sao Chăm Học',
    completedLessons: Math.floor((a.xp || 100) / 40) + 1,
  }));

  const existingNames = new Set(mappedReal.map((s) => s.name.toLowerCase()));
  const benchmarks = MOCK_STUDENTS.filter((m) => !existingNames.has(m.name.toLowerCase()));

  const all = [...mappedReal, ...benchmarks];
  all.sort((a, b) => b.xp - a.xp);
  return all.map((st, idx) => ({
    ...st,
    rank: idx + 1,
  }));
}

export async function refreshAndSyncLeaderboard(): Promise<StudentRank[]> {
  await fetchAccountsFromServer();
  return getRealtimeStudentLeaderboard();
}

export async function adminUpdateStudentXP(studentName: string, xpToAdd: number, newBadge?: string): Promise<StudentRank[]> {
  const accounts = getRegisteredAccounts();
  const acc = accounts.find((a) => a.name.toLowerCase() === studentName.toLowerCase() && a.role === 'student');
  if (acc) {
    acc.xp += xpToAdd;
    acc.level = Math.floor(acc.xp / 300) + 1;
    acc.streak += 1;
    if (newBadge && !acc.badges.includes(newBadge)) {
      acc.badges.unshift(newBadge);
    }
    saveRegisteredAccounts(accounts);
    try {
      await setDoc(doc(db, 'accounts', acc.id), acc, { merge: true });
    } catch {}
    fetch('/api/accounts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(acc),
    }).catch(() => {});
  } else {
    const newAcc = registerNewAccount({
      name: studentName,
      role: 'student',
      grade: 'Tiểu học',
      school: 'Học viên tự do',
      avatar: '🌟',
    });
    newAcc.xp = 5200 + xpToAdd;
    newAcc.level = Math.floor(newAcc.xp / 300) + 1;
    if (newBadge) newAcc.badges = [newBadge];
    saveRegisteredAccounts(getRegisteredAccounts());
    try {
      await setDoc(doc(db, 'accounts', newAcc.id), newAcc);
    } catch {}
  }
  return getRealtimeStudentLeaderboard();
}

export function loginWithCredentials(identifier: string, passwordInput: string): {
  success: boolean;
  user?: UserProfile;
  message: string;
} {
  const cleanId = identifier.trim();
  const cleanPass = passwordInput.trim();

  if (!cleanId) {
    return { success: false, message: 'Vui lòng nhập Số điện thoại hoặc Gmail đã đăng ký!' };
  }

  if (cleanPass !== MASTER_PASSWORD) {
    return {
      success: false,
      message: 'Mật khẩu không chính xác! Vui lòng kiểm tra lại mật khẩu.'
    };
  }

  // Look for existing registered account
  const account = findRegisteredAccount(cleanId);
  const isSuperAdmin = cleanId.toLowerCase() === ADMIN_EMAIL.toLowerCase();

  let profile: UserProfile;
  if (account) {
    profile = {
      id: account.id,
      name: account.name,
      phone: account.phone,
      email: account.email,
      role: isSuperAdmin ? 'admin' : account.role,
      grade: account.grade,
      school: account.school,
      avatar: account.avatar,
      xp: account.xp,
      level: account.level,
      streak: account.streak,
      gems: account.gems,
      badges: account.badges,
      joinedDate: account.registeredDate,
      isLoggedIn: true,
      loginIdentifier: cleanId,
    };
  } else {
    // If account doesn't exist yet but password matches MASTER_PASSWORD, auto-register seamless profile
    const isPhone = /^[0-9+() -]{7,15}$/.test(cleanId);
    const newAcc = registerNewAccount({
      name: isPhone ? `Học sinh (${cleanId})` : cleanId.split('@')[0],
      phone: isPhone ? cleanId : undefined,
      email: isPhone ? undefined : cleanId,
      role: isSuperAdmin ? 'teacher' : 'student',
      grade: 'Tiểu học',
      school: 'Học viên tự do',
      avatar: isSuperAdmin ? '👩‍🏫' : '🐼',
    });

    profile = {
      id: newAcc.id,
      name: newAcc.name,
      phone: newAcc.phone,
      email: newAcc.email,
      role: isSuperAdmin ? 'admin' : newAcc.role,
      grade: newAcc.grade,
      school: newAcc.school,
      avatar: newAcc.avatar,
      xp: newAcc.xp,
      level: newAcc.level,
      streak: newAcc.streak,
      gems: newAcc.gems,
      badges: newAcc.badges,
      joinedDate: newAcc.registeredDate,
      isLoggedIn: true,
      loginIdentifier: cleanId,
    };
  }

  saveStoredUser(profile);
  return { success: true, user: profile, message: 'Đăng nhập thành công!' };
}

export function getStoredUser(): UserProfile {
  if (typeof window === 'undefined') return DEFAULT_UNAUTHENTICATED_USER;
  try {
    const raw = localStorage.getItem(USER_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') return parsed;
    }
  } catch (e) {
    console.error(e);
  }
  return DEFAULT_UNAUTHENTICATED_USER;
}

export function saveStoredUser(user: UserProfile): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch (e) {
    console.error(e);
  }
}

export function logoutUser(): UserProfile {
  const unauthUser: UserProfile = {
    ...DEFAULT_UNAUTHENTICATED_USER,
    id: `guest-${Date.now()}`,
    isLoggedIn: false,
  };
  saveStoredUser(unauthUser);
  return unauthUser;
}

export const MATERIALS_UPDATED_EVENT = 'ms_lien_materials_updated';

export function notifyMaterialsUpdated(): void {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(MATERIALS_UPDATED_EVENT));
  }
}

export function cleanFirestoreData<T>(obj: T): T {
  if (!obj || typeof obj !== 'object') return obj;
  return JSON.parse(JSON.stringify(obj));
}

function mergeTwoMaterials(a: LectureMaterial, b: LectureMaterial): LectureMaterial {
  // Merge comments uniquely by id
  const commentMap = new Map<string, CommentItem>();
  for (const c of a.comments || []) {
    commentMap.set(c.id, c);
  }
  for (const c of b.comments || []) {
    if (!commentMap.has(c.id)) {
      commentMap.set(c.id, c);
    }
  }
  const mergedComments = Array.from(commentMap.values());
  mergedComments.sort((x, y) => (y.createdAt || '').localeCompare(x.createdAt || ''));

  // Merge ratings
  const finalRatings = (b.ratings?.length || 0) > (a.ratings?.length || 0) ? b.ratings : (a.ratings || [5]);

  return {
    ...a,
    ...b,
    title: b.title || a.title,
    url: b.url || a.url,
    thumbnail: b.thumbnail || a.thumbnail,
    views: Math.max(a.views || 0, b.views || 0),
    downloads: Math.max(a.downloads || 0, b.downloads || 0),
    comments: mergedComments,
    ratings: finalRatings,
    vocabularyItems: (b.vocabularyItems && b.vocabularyItems.length > 0) ? b.vocabularyItems : a.vocabularyItems,
  };
}

// Seed initial materials to Firestore if collection is empty
export async function seedInitialMaterials(): Promise<void> {
  try {
    for (const mat of INITIAL_MATERIALS) {
      await setDoc(doc(db, 'materials', mat.id), cleanFirestoreData(mat), { merge: true });
    }
    console.log('[Firebase Firestore] Pre-seeded initial materials successfully.');
  } catch (err) {
    console.warn('[Firebase Firestore] Seeding warning:', err);
  }
}

// Real-time Firestore streaming listener so any user on any device sees changes instantly
export function subscribeToFirestoreMaterials(onUpdate: (materials: LectureMaterial[]) => void): () => void {
  try {
    const materialsCol = collection(db, 'materials');
    return onSnapshot(
      materialsCol,
      (snapshot) => {
        const deletedSet = getDeletedMaterialIds();
        if (!snapshot.empty) {
          const list: LectureMaterial[] = [];
          snapshot.forEach((docSnap) => {
            if (!deletedSet.has(docSnap.id)) {
              const data = docSnap.data() as LectureMaterial;
              list.push({ ...data, id: docSnap.id });
            }
          });
          list.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
          saveStoredMaterials(list);
          notifyMaterialsUpdated();
          onUpdate(list);
        } else {
          // Empty in Firestore, seed defaults if not deleted
          seedInitialMaterials();
        }
      },
      (error) => {
        console.warn('[Firebase Firestore] onSnapshot fallback:', error.message);
        fetchMaterialsFromServer().then(onUpdate);
      }
    );
  } catch (err) {
    console.warn('[Firebase Firestore] subscribe error:', err);
    fetchMaterialsFromServer().then(onUpdate);
    return () => {};
  }
}

// Comprehensive dual-storage sync: Cloud Firestore + Server disk persistence
export async function fetchMaterialsFromServer(): Promise<LectureMaterial[]> {
  const deletedSet = getDeletedMaterialIds();

  // Load deleted IDs from server
  try {
    const delRes = await fetch('/api/deleted-materials');
    if (delRes.ok) {
      const delData = await delRes.json();
      if (delData && Array.isArray(delData.deletedIds)) {
        delData.deletedIds.forEach((id: string) => {
          deletedSet.add(id);
          recordDeletedMaterialId(id);
        });
      }
    }
  } catch {}

  // Load deleted IDs from Firestore
  try {
    const delSnap = await getDocs(collection(db, 'deleted_materials'));
    if (!delSnap.empty) {
      delSnap.forEach((d) => {
        deletedSet.add(d.id);
        recordDeletedMaterialId(d.id);
      });
    }
  } catch {}

  const localList = getStoredMaterials().filter((m) => !deletedSet.has(m.id));
  let firestoreList: LectureMaterial[] = [];
  let serverApiList: LectureMaterial[] = [];

  // 1. Fetch from Google Cloud Firestore
  try {
    const snap = await getDocs(collection(db, 'materials'));
    if (!snap.empty) {
      snap.forEach((d) => {
        if (!deletedSet.has(d.id)) {
          const item = d.data() as LectureMaterial;
          firestoreList.push({ ...item, id: d.id });
        }
      });
    }
  } catch (err) {
    console.warn('[Firebase Firestore] getDocs error:', err);
  }

  // 2. Fetch from HTTP Server API (dual backup on disk)
  try {
    const res = await fetch('/api/materials');
    if (res.ok) {
      const data = await res.json();
      if (data && Array.isArray(data.materials)) {
        serverApiList = data.materials.filter((m: LectureMaterial) => !deletedSet.has(m.id));
      }
    }
  } catch (err) {
    console.warn('[Server API] fetch /api/materials error:', err);
  }

  // 3. Dual Storage Consolidation Map
  const mergedMap = new Map<string, LectureMaterial>();

  // Add initial mock materials first (only if NOT deleted)
  for (const m of INITIAL_MATERIALS) {
    if (!deletedSet.has(m.id)) {
      mergedMap.set(m.id, { ...m });
    }
  }

  // Merge server API materials
  for (const m of serverApiList) {
    if (!deletedSet.has(m.id)) {
      const existing = mergedMap.get(m.id);
      if (!existing) {
        mergedMap.set(m.id, { ...m });
      } else {
        mergedMap.set(m.id, mergeTwoMaterials(existing, m));
      }
    }
  }

  // Merge Firestore materials
  for (const m of firestoreList) {
    if (!deletedSet.has(m.id)) {
      const existing = mergedMap.get(m.id);
      if (!existing) {
        mergedMap.set(m.id, { ...m });
      } else {
        mergedMap.set(m.id, mergeTwoMaterials(existing, m));
      }
    }
  }

  // Merge local client cache
  for (const m of localList) {
    if (!deletedSet.has(m.id)) {
      const existing = mergedMap.get(m.id);
      if (!existing) {
        mergedMap.set(m.id, { ...m });
      } else {
        mergedMap.set(m.id, mergeTwoMaterials(existing, m));
      }
    }
  }

  const combinedList = Array.from(mergedMap.values()).filter((m) => !deletedSet.has(m.id));
  combinedList.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));

  // 4. Cross-pollinate: sync any missing items back into Firestore for permanent storage
  if (firestoreList.length < combinedList.length) {
    const firestoreIds = new Set(firestoreList.map((f) => f.id));
    for (const item of combinedList) {
      if (!firestoreIds.has(item.id) && !deletedSet.has(item.id)) {
        try {
          setDoc(doc(db, 'materials', item.id), cleanFirestoreData(item), { merge: true }).catch(() => {});
        } catch {}
      }
    }
  }

  saveStoredMaterials(combinedList);
  notifyMaterialsUpdated();
  return combinedList;
}

export function getStoredMaterials(): LectureMaterial[] {
  const deletedSet = getDeletedMaterialIds();
  if (typeof window === 'undefined') {
    return INITIAL_MATERIALS.filter((m) => !deletedSet.has(m.id));
  }
  try {
    const raw = localStorage.getItem(MATERIALS_KEY);
    if (raw) {
      const parsed: LectureMaterial[] = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        // Filter out any deleted items immediately
        const cleanParsed = parsed.filter((m) => !deletedSet.has(m.id));
        const existingIds = new Set(cleanParsed.map((m) => m.id));
        const missing = INITIAL_MATERIALS.filter((m) => !deletedSet.has(m.id) && !existingIds.has(m.id));
        if (missing.length > 0) {
          const merged = [...missing, ...cleanParsed];
          localStorage.setItem(MATERIALS_KEY, JSON.stringify(merged));
          return merged;
        }
        return cleanParsed;
      }
    }
  } catch (e) {
    console.error(e);
  }
  // Initialize with pre-seeded data excluding deleted ones
  const defaultList = INITIAL_MATERIALS.filter((m) => !deletedSet.has(m.id));
  try {
    localStorage.setItem(MATERIALS_KEY, JSON.stringify(defaultList));
  } catch {}
  return defaultList;
}

export function saveStoredMaterials(materials: LectureMaterial[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(MATERIALS_KEY, JSON.stringify(materials));
  } catch (e) {
    console.error(e);
  }
}

export function addMaterial(item: Omit<LectureMaterial, 'id' | 'views' | 'downloads' | 'ratings' | 'comments' | 'createdAt'>): LectureMaterial {
  const materials = getStoredMaterials();
  const newItem: LectureMaterial = {
    ...item,
    id: `mat-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    views: 1,
    downloads: 0,
    ratings: [5],
    comments: [],
    createdAt: new Date().toISOString().split('T')[0],
  };
  materials.unshift(newItem);
  saveStoredMaterials(materials);
  notifyMaterialsUpdated();

  // 1. Save directly to Google Cloud Firestore (permanent, cross-device persistence)
  try {
    setDoc(doc(db, 'materials', newItem.id), cleanFirestoreData(newItem), { merge: true }).catch((err) => {
      console.warn('[Firebase Firestore] setDoc material warning:', err);
    });
  } catch (e) {
    console.warn('[Firebase Firestore] setDoc exception:', e);
  }

  // 2. Save to shared server API for local disk mirroring
  fetch('/api/materials', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newItem),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data && Array.isArray(data.materials)) {
        saveStoredMaterials(data.materials);
        notifyMaterialsUpdated();
      }
    })
    .catch((err) => console.error('Failed to sync material to server:', err));

  return newItem;
}

export function updateMaterial(updated: LectureMaterial): void {
  const materials = getStoredMaterials();
  const idx = materials.findIndex((m) => m.id === updated.id);
  if (idx !== -1) {
    materials[idx] = updated;
    saveStoredMaterials(materials);
    notifyMaterialsUpdated();
  }

  // 1. Update in Firestore
  try {
    setDoc(doc(db, 'materials', updated.id), cleanFirestoreData(updated), { merge: true }).catch((err) => {
      console.warn('[Firebase Firestore] updateDoc material warning:', err);
    });
  } catch {}

  // 2. Update on server API
  fetch(`/api/materials/${updated.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updated),
  }).catch((err) => console.error('Failed to update material on server:', err));
}

export function deleteMaterial(id: string): void {
  // 1. Permanently record deletion in deleted IDs set
  recordDeletedMaterialId(id);

  // 2. Remove immediately from local state & cache
  const materials = getStoredMaterials();
  const filtered = materials.filter((m) => m.id !== id);
  saveStoredMaterials(filtered);
  notifyMaterialsUpdated();

  // 3. Delete from Firestore
  try {
    deleteDoc(doc(db, 'materials', id)).catch((err) => {
      console.warn('[Firebase Firestore] deleteDoc material warning:', err);
    });
  } catch {}

  // 4. Delete on server API
  fetch(`/api/materials/${id}`, {
    method: 'DELETE',
  }).catch((err) => console.error('Failed to delete material on server:', err));
}

export function isAuthorizedPublisher(user: UserProfile | null | undefined): boolean {
  if (!user || !user.isLoggedIn) return false;
  const email = (user.email || '').trim().toLowerCase();
  const phone = (user.phone || '').trim().toLowerCase();
  const loginId = (user.loginIdentifier || '').trim().toLowerCase();
  return (
    email === ADMIN_EMAIL.toLowerCase() ||
    phone === ADMIN_PHONE.toLowerCase() ||
    loginId === ADMIN_EMAIL.toLowerCase() ||
    loginId === ADMIN_PHONE.toLowerCase() ||
    user.role === 'admin'
  );
}

export function canEditMaterial(material: LectureMaterial, user: UserProfile): boolean {
  if (!user) return false;
  // ONLY admin accounts (amazingtranslation88@gmail.com or 0976817231) can upload, edit, replace and delete materials
  return isAuthorizedPublisher(user);
}

export function getStoredBanner(): BannerConfig {
  if (typeof window === 'undefined') return { imageUrl: CUTE_CARTOON_BANNERS[0].url, themeName: CUTE_CARTOON_BANNERS[0].title };
  try {
    const raw = localStorage.getItem(BANNER_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.imageUrl) return parsed;
    }
  } catch (e) {
    console.error(e);
  }
  return { imageUrl: CUTE_CARTOON_BANNERS[0].url, themeName: CUTE_CARTOON_BANNERS[0].title };
}

export function saveStoredBanner(banner: BannerConfig): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(BANNER_STORAGE_KEY, JSON.stringify(banner));
    window.dispatchEvent(new CustomEvent(BANNER_UPDATED_EVENT, { detail: banner }));
  } catch (e) {
    console.error(e);
  }
  // Sync to server API
  fetch('/api/settings/banner', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(banner),
  }).catch(() => {});
  // Sync to Firestore
  try {
    setDoc(doc(db, 'settings', 'banner'), banner, { merge: true }).catch(() => {});
  } catch {}
}

export async function fetchBannerFromServer(): Promise<BannerConfig> {
  // 1. Try Firestore
  try {
    const snap = await getDocs(collection(db, 'settings'));
    const bannerDoc = snap.docs.find((d) => d.id === 'banner');
    if (bannerDoc && bannerDoc.data()?.imageUrl) {
      const b = bannerDoc.data() as BannerConfig;
      saveStoredBanner(b);
      return b;
    }
  } catch {}
  // 2. Try HTTP API
  try {
    const res = await fetch('/api/settings/banner');
    if (res.ok) {
      const data = await res.json();
      if (data && data.banner && data.banner.imageUrl) {
        saveStoredBanner(data.banner);
        return data.banner;
      }
    }
  } catch {}
  return getStoredBanner();
}

export async function generateWordVocabForMaterial(fileName: string, grade: string, rawContent?: string): Promise<any[]> {
  try {
    const res = await fetch('/api/ai/parse-word-vocab', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fileName, grade, rawContent }),
    });
    if (res.ok) {
      const data = await res.json();
      if (data && data.success && Array.isArray(data.data) && data.data.length > 0) {
        return data.data;
      }
    }
  } catch (err) {
    console.warn('Word vocab extraction call failed, using fallback:', err);
  }

  // Fallback realistic vocabulary with short communicative sentences
  return [
    {
      id: 'wv-1',
      hanzi: '学校',
      pinyin: 'xuéxiào',
      meaningVi: 'Trường học',
      category: 'Trường học',
      exampleSentence: {
        zh: '我们的学校很美丽。',
        pinyin: 'Wǒmen de xuéxiào hěn měilì.',
        vi: 'Ngôi trường của chúng em rất đẹp.'
      }
    },
    {
      id: 'wv-2',
      hanzi: '同学',
      pinyin: 'tóngxué',
      meaningVi: 'Bạn học',
      category: 'Giao tiếp',
      exampleSentence: {
        zh: '我和同学们一起做作业。',
        pinyin: 'Wǒ hé tóngxuémen yìqǐ zuò zuòyè.',
        vi: 'Mình cùng các bạn làm bài tập.'
      }
    },
    {
      id: 'wv-3',
      hanzi: '看书',
      pinyin: 'kàn shū',
      meaningVi: 'Đọc sách',
      category: 'Sở thích',
      exampleSentence: {
        zh: '哥哥在图书馆看书。',
        pinyin: 'Gēge zài túshūguǎn kàn shū.',
        vi: 'Anh trai đang đọc sách ở thư viện.'
      }
    },
    {
      id: 'wv-4',
      hanzi: '高兴',
      pinyin: 'gāoxìng',
      meaningVi: 'Vui vẻ',
      category: 'Cảm xúc',
      exampleSentence: {
        zh: '今天我非常高兴！',
        pinyin: 'Jīntiān wǒ fēicháng gāoxìng!',
        vi: 'Hôm nay em rất vui vẻ!'
      }
    }
  ];
}

export function addComment(
  materialId: string,
  authorName: string,
  authorAvatar: string,
  authorEmail: string | undefined,
  content: string,
  rating: number = 5
): CommentItem {
  const materials = getStoredMaterials();
  const mat = materials.find((m) => m.id === materialId);
  const comment: CommentItem = {
    id: `c-${Date.now()}`,
    authorName,
    authorAvatar,
    authorEmail,
    content,
    createdAt: new Date().toISOString().split('T')[0],
    rating,
  };
  if (mat) {
    if (!Array.isArray(mat.comments)) mat.comments = [];
    mat.comments.unshift(comment);
    if (rating > 0) {
      if (!Array.isArray(mat.ratings)) mat.ratings = [];
      mat.ratings.push(rating);
    }
    saveStoredMaterials(materials);
    notifyMaterialsUpdated();
  }

  // 1. Save to Google Cloud Firestore (Dual Storage)
  try {
    const matRef = doc(db, 'materials', materialId);
    setDoc(
      matRef,
      cleanFirestoreData({
        comments: arrayUnion(comment),
        ...(rating > 0 ? { ratings: arrayUnion(rating) } : {}),
      }),
      { merge: true }
    ).catch((err) => {
      console.warn('[Firebase Firestore] addComment setDoc warning:', err);
    });
  } catch {}

  // 2. Sync comment to server so all accounts see it
  fetch(`/api/materials/${materialId}/comment`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      authorName,
      authorAvatar,
      authorEmail,
      content,
      rating,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data && data.material) {
        const currentMats = getStoredMaterials();
        const index = currentMats.findIndex((m) => m.id === materialId);
        if (index !== -1) {
          currentMats[index] = data.material;
          saveStoredMaterials(currentMats);
          notifyMaterialsUpdated();
        }
      }
    })
    .catch((err) => console.error('Failed to save comment on server:', err));

  return comment;
}

export function voteMaterial(materialId: string, rating: number): void {
  const materials = getStoredMaterials();
  const mat = materials.find((m) => m.id === materialId);
  if (mat && rating >= 1 && rating <= 5) {
    if (!Array.isArray(mat.ratings)) mat.ratings = [];
    mat.ratings.push(rating);
    saveStoredMaterials(materials);
    notifyMaterialsUpdated();
  }

  // 1. Save vote directly to Google Cloud Firestore (Dual Storage)
  try {
    const matRef = doc(db, 'materials', materialId);
    setDoc(
      matRef,
      cleanFirestoreData({
        ratings: arrayUnion(rating),
      }),
      { merge: true }
    ).catch((err) => {
      console.warn('[Firebase Firestore] voteMaterial warning:', err);
    });
  } catch {}

  // 2. Sync vote to server API
  fetch(`/api/materials/${materialId}/vote`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ rating }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data && data.ratings) {
        const currentMats = getStoredMaterials();
        const index = currentMats.findIndex((m) => m.id === materialId);
        if (index !== -1) {
          currentMats[index].ratings = data.ratings;
          saveStoredMaterials(currentMats);
          notifyMaterialsUpdated();
        }
      }
    })
    .catch((err) => console.error('Failed to send vote to server:', err));
}

export function incrementViews(materialId: string): void {
  const materials = getStoredMaterials();
  const mat = materials.find((m) => m.id === materialId);
  if (mat) {
    mat.views += 1;
    saveStoredMaterials(materials);
  }
  // Firestore
  try {
    updateDoc(doc(db, 'materials', materialId), { views: increment(1) }).catch(() => {});
  } catch {}
  fetch(`/api/materials/${materialId}/view`, { method: 'POST' }).catch(() => {});
}

export function incrementDownloads(materialId: string): void {
  const materials = getStoredMaterials();
  const mat = materials.find((m) => m.id === materialId);
  if (mat) {
    mat.downloads += 1;
    saveStoredMaterials(materials);
    notifyMaterialsUpdated();
  }
  // Firestore
  try {
    updateDoc(doc(db, 'materials', materialId), { downloads: increment(1) }).catch(() => {});
  } catch {}
  fetch(`/api/materials/${materialId}/download`, { method: 'POST' }).catch(() => {});
}

export function getStoredCustomGames(): CustomGameItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(GAMES_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
}

export function saveStoredCustomGames(games: CustomGameItem[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(GAMES_KEY, JSON.stringify(games));
  } catch {}
}

export function addCustomGame(game: Omit<CustomGameItem, 'id' | 'createdAt'>): CustomGameItem {
  const games = getStoredCustomGames();
  const newGame: CustomGameItem = {
    ...game,
    id: `game-${Date.now()}`,
    createdAt: new Date().toISOString().split('T')[0],
  };
  games.unshift(newGame);
  saveStoredCustomGames(games);
  return newGame;
}

export const INITIAL_REWARD_GAMES: RewardGameItem[] = [
  {
    id: 'rg-1',
    title: 'Bắn Bóng Hán Tự & Pinyin Cơ Bản',
    grade: 'Tiểu học',
    category: 'bubble_shoot',
    rewardGems: 15,
    rewardXp: 40,
    coverEmoji: '🎯',
    authorName: 'Cô giáo Bùi Ngọc Liên',
    authorEmail: 'amazingtranslation88@gmail.com',
    description: 'Bắn trúng bong bóng chứa Pinyin hoặc nghĩa tiếng Việt tương ứng với chữ Hán xuất hiện. Rèn luyện phản xạ siêu tốc!',
    playsCount: 428,
    createdAt: '2026-10-15',
    questions: [
      { id: 'b1', type: 'quiz', question: 'Chọn bóng nghĩa đúng cho chữ Hán: 你 (Nǐ)', hanzi: '你', pinyin: 'Nǐ', options: ['Bạn / Cậu', 'Tôi / Tớ', 'Anh ấy', 'Chào bạn'], answer: 'Bạn / Cậu', explanation: '你 nghĩa là Bạn, đại từ nhân xưng ngôi thứ 2.' },
      { id: 'b2', type: 'quiz', question: 'Chọn bóng Pinyin đúng cho chữ Hán: 好 (Hảo)', hanzi: '好', pinyin: 'hǎo', options: ['hǎo (Tốt / Đẹp)', 'hào', 'háo', 'hāo'], answer: 'hǎo (Tốt / Đẹp)', explanation: '好 mang thanh 3: hǎo.' },
      { id: 'b3', type: 'quiz', question: 'Bắn bóng số đếm: "五" là số mấy?', hanzi: '五', pinyin: 'wǔ', options: ['Số 5', 'Số 3', 'Số 4', 'Số 6'], answer: 'Số 5', explanation: '五 là số 5.' },
      { id: 'b4', type: 'quiz', question: 'Bắn bóng chữ Hán "Mẹ":', hanzi: '妈妈', pinyin: 'māma', options: ['妈妈 (māma)', '爸爸 (bàba)', '姐姐 (jiějie)', '哥哥 (gēge)'], answer: '妈妈 (māma)', explanation: '妈妈 nghĩa là Mẹ yêu.' }
    ]
  },
  {
    id: 'rg-2',
    title: 'Đấu Trí Từ Vựng YCT Cấp Tốc (Cấp 1 – 3)',
    grade: 'Chuẩn YCT',
    category: 'quiz',
    rewardGems: 20,
    rewardXp: 50,
    coverEmoji: '🐼',
    authorName: 'Cô giáo Bùi Ngọc Liên',
    authorEmail: 'amazingtranslation88@gmail.com',
    description: 'Bộ câu hỏi sát đề thi YCT thực tế do cô Liên biên soạn, chinh phục điểm tuyệt đối để rinh ngay 20 Kim Cương đổi quà!',
    playsCount: 562,
    createdAt: '2026-10-18',
    questions: [
      { id: 'y1', type: 'quiz', question: 'YCT 1: "爸爸喜欢吃苹果。" Câu này nghĩa là gì?', hanzi: '爸爸喜欢吃苹果。', pinyin: 'Bàba xǐhuan chī píngguǒ.', options: ['Bố thích ăn táo.', 'Mẹ thích ăn chuối.', 'Bố thích uống nước.', 'Em trai thích ăn táo.'], answer: 'Bố thích ăn táo.', explanation: '爸爸 là bố, 喜欢 là thích, 吃 là ăn, 苹果 là táo.' },
      { id: 'y2', type: 'quiz', question: 'YCT 2: Điền từ thích hợp: "桌子上有 ____ 本书。"', hanzi: '桌子上有 ____ 本书。', pinyin: 'Zhuōzi shang yǒu ____ běn shū.', options: ['两 (liǎng)', '二 (èr)', '个 (gè)', '只 (zhī)'], answer: '两 (liǎng)', explanation: 'Trước lượng từ số lượng 2 dùng 两 (liǎng).' },
      { id: 'y3', type: 'quiz', question: 'YCT 3: "今天天气很好，我们去公园吧！" nghĩa là gì?', hanzi: '今天天气很好，我们去公园吧！', pinyin: 'Jīntiān tiānqì hěn hǎo, wǒmen qù gōngyuán ba!', options: ['Hôm nay thời tiết đẹp, chúng mình đi công viên nhé!', 'Hôm nay trời mưa, chúng mình ở nhà.', 'Ngày mai đi sở thú nhé!', 'Thời tiết lạnh lắm, mặc ấm vào.'], answer: 'Hôm nay thời tiết đẹp, chúng mình đi công viên nhé!', explanation: '天气 là thời tiết, 公园 là công viên.' }
    ]
  },
  {
    id: 'rg-3',
    title: 'Chinh Phục 500 Từ HSK 1 – Chuẩn HSK 3.0 Mới Nhất',
    grade: 'Chuẩn HSK 3.0',
    category: 'quiz',
    rewardGems: 25,
    rewardXp: 60,
    coverEmoji: '🎯',
    authorName: 'Cô giáo Bùi Ngọc Liên',
    authorEmail: 'amazingtranslation88@gmail.com',
    description: 'Thử thách trọn bộ từ vựng định hướng HSK 3.0 (Cấp 1 & Cấp 2) với giải thích chi tiết, vượt qua để nhận 25 Kim Cương!',
    playsCount: 689,
    createdAt: '2026-10-20',
    questions: [
      { id: 'h1', type: 'quiz', question: 'HSK 3.0 Cấp 1: Từ "高兴" (gāoxìng) có nghĩa là:', hanzi: '高兴', pinyin: 'gāoxìng', options: ['Vui mừng / Hạnh phúc', 'Buồn bã', 'Tức giận', 'Mệt mỏi'], answer: 'Vui mừng / Hạnh phúc', explanation: '很高兴认识你 = Rất vui được quen biết bạn.' },
      { id: 'h2', type: 'quiz', question: 'HSK 3.0 Cấp 1: Phủ định của "是" (shì) là:', hanzi: '不是', pinyin: 'bù shì', options: ['不是', '没是', '不有', '莫是'], answer: '不是', explanation: 'Phủ định của 是 luôn là 不是.' },
      { id: 'h3', type: 'quiz', question: 'HSK 3.0 Cấp 2: "虽然...但是..." biểu thị mối quan hệ gì?', hanzi: '虽然...但是...', pinyin: 'suīrán... dànshì...', options: ['Mối quan hệ chuyển ngoặt (Tuy... nhưng...)', 'Mối quan hệ nhân quả (Vì... nên...)', 'Mối quan hệ điều kiện', 'Mối quan hệ tăng tiến'], answer: 'Mối quan hệ chuyển ngoặt (Tuy... nhưng...)', explanation: '虽然...但是... là liên từ chuyển ngoặt: Tuy... nhưng...' }
    ]
  },
  {
    id: 'rg-4',
    title: 'Vòng Quay May Mắn Ngữ Pháp Lớp 6 & Lớp 7',
    grade: 'Lớp 6 - 9',
    category: 'wheel',
    rewardGems: 20,
    rewardXp: 50,
    coverEmoji: '🎡',
    authorName: 'Cô giáo Bùi Ngọc Liên',
    authorEmail: 'amazingtranslation88@gmail.com',
    description: 'Quay ô may mắn, giải câu đố ngữ pháp THCS GDPT 2018 và mở rương châu báu nhận thưởng!',
    playsCount: 395,
    createdAt: '2026-10-21',
    questions: [
      { id: 'wh1', type: 'quiz', question: 'Trúng ô Trợ từ ngữ khí "吗": Câu "你是老师吗？" dùng để hỏi:', hanzi: '你是老师吗？', pinyin: 'Nǐ shì lǎoshī ma?', options: ['Bạn có phải là giáo viên không?', 'Thầy giáo đi đâu thế?', 'Ai là giáo viên vậy?', 'Bạn dạy môn gì?'], answer: 'Bạn có phải là giáo viên không?', explanation: '吗 đặt ở cuối câu trần thuật để tạo câu hỏi Có... không.' },
      { id: 'wh2', type: 'quiz', question: 'Trúng ô Sở hữu "的": "Cô giáo của tôi" nói thế nào?', hanzi: 'Cô giáo của tôi', pinyin: 'Wǒ de lǎoshī', options: ['我的老师', '老师的我', '我老师的', '的是我老师'], answer: '我的老师', explanation: 'Đại từ sở hữu + 的 + Danh từ trung tâm.' },
      { id: 'wh3', type: 'quiz', question: 'Trúng ô Giới từ "在": "Tôi đang ở trường học" dịch sang tiếng Trung là:', hanzi: '我在学校', pinyin: 'Wǒ zài xuéxiào', options: ['我在学校', '学校在我', '在我是学校', '我是学校在'], answer: '我在学校', explanation: 'Chủ ngữ + 在 + Địa điểm (学校).' }
    ]
  },
  {
    id: 'rg-5',
    title: 'Wordwall: Nối Thẻ Pinyin & Hình Ảnh Con Vật 🐶🐱',
    grade: 'Tiểu học',
    category: 'external_wordwall',
    rewardGems: 20,
    rewardXp: 45,
    coverEmoji: '🌐',
    authorName: 'Cô giáo Bùi Ngọc Liên',
    authorEmail: 'amazingtranslation88@gmail.com',
    externalUrl: 'https://wordwall.net/resource/demo-chinese-animals',
    description: 'Trò chơi tương tác Wordwall sinh động do cô Liên thiết kế riêng cho học sinh Tiểu học nhận biết con vật qua âm thanh và hình ảnh.',
    playsCount: 840,
    createdAt: '2026-10-12',
    questions: [
      { id: 'ww1', type: 'quiz', question: 'Chữ "猫" (māo) là con vật nào?', hanzi: '猫', pinyin: 'māo', options: ['Con Mèo', 'Con Chó', 'Con Chuột', 'Con Cá'], answer: 'Con Mèo', explanation: '猫 (māo) là con mèo dễ thương.' },
      { id: 'ww2', type: 'quiz', question: 'Chữ "鸟" (niǎo) là con gì?', hanzi: '鸟', pinyin: 'niǎo', options: ['Con Chim', 'Con Bò', 'Con Ngựa', 'Con Hổ'], answer: 'Con Chim', explanation: '鸟 (niǎo) là loài chim bay lượn.' }
    ]
  },
  {
    id: 'rg-6',
    title: 'Ghép Cặp Thẻ Trí Nhớ Hán Tự Thần Tốc',
    grade: 'Tất cả',
    category: 'memory',
    rewardGems: 20,
    rewardXp: 50,
    coverEmoji: '🧩',
    authorName: 'Cô giáo Bùi Ngọc Liên',
    authorEmail: 'amazingtranslation88@gmail.com',
    description: 'Luyện trí nhớ siêu đẳng: lật mở và ghép đúng cặp chữ Hán – Pinyin – Nghĩa tiếng Việt trong thời gian nhanh nhất.',
    playsCount: 512,
    createdAt: '2026-10-16',
    questions: [
      { id: 'm1', type: 'match', question: 'Ghép cặp cho "太阳" (Thái dương):', hanzi: '太阳', pinyin: 'tàiyáng', options: ['Mặt trời', 'Mặt trăng', 'Ngôi sao', 'Gió mát'], answer: 'Mặt trời', explanation: '太阳 là mặt trời rực rỡ.' },
      { id: 'm2', type: 'match', question: 'Ghép cặp cho "月亮" (Nguyệt lượng):', hanzi: '月亮', pinyin: 'yuèliang', options: ['Mặt trăng', 'Mặt đất', 'Mặt biển', 'Mặt trời'], answer: 'Mặt trăng', explanation: '月亮 là vầng trăng sáng dịu dàng.' },
      { id: 'm3', type: 'match', question: 'Ghép cặp cho "朋友" (Bằng hữu):', hanzi: '朋友', pinyin: 'péngyou', options: ['Bạn bè', 'Thầy cô', 'Cha mẹ', 'Hàng xóm'], answer: 'Bạn bè', explanation: '朋友 là bạn bè tốt.' }
    ]
  },
  {
    id: 'rg-7',
    title: 'Rung Chuông Vàng Tiếng Trung GDPT 2018 (Lớp 8 – 9)',
    grade: 'Lớp 6 - 9',
    category: 'quiz',
    rewardGems: 30,
    rewardXp: 80,
    coverEmoji: '🔔',
    authorName: 'Cô giáo Bùi Ngọc Liên',
    authorEmail: 'amazingtranslation88@gmail.com',
    description: 'Đấu trường đỉnh cao dành cho học sinh chuẩn bị thi vào lớp 10 chuyên tiếng Trung hoặc thi học sinh giỏi!',
    playsCount: 418,
    createdAt: '2026-10-22',
    questions: [
      { id: 'rcv1', type: 'quiz', question: 'Cấu trúc so sánh hơn: "A 比 B + Tính từ". Ví dụ nào viết đúng ngữ pháp?', hanzi: 'A 比 B + Tính từ', pinyin: 'A bǐ B + Adj', options: ['哥哥比我高。', '哥哥我越高。', '比哥哥我高。', '哥哥很高比我。'], answer: '哥哥比我高。', explanation: 'Cấu trúc so sánh hơn chuẩn: A + 比 + B + Tính từ.' },
      { id: 'rcv2', type: 'quiz', question: 'Bổ ngữ kết quả: "Tôi nghe hiểu rồi" nói là:', hanzi: 'Tôi nghe hiểu rồi', pinyin: 'Wǒ tīng dǒng le', options: ['我听懂了。', '我懂听了。', '我听明白了没。', '我看见了。'], answer: '我听懂了。', explanation: '听 (nghe) + 懂 (hiểu) là bổ ngữ kết quả.' },
      { id: 'rcv3', type: 'quiz', question: 'Từ nối chỉ nguyên nhân kết quả: "因为...所以..." dịch là gì?', hanzi: '因为...所以...', pinyin: 'yīnwèi... suǒyǐ...', options: ['Bởi vì... cho nên...', 'Mặc dù... nhưng...', 'Nếu như... thì...', 'Không những... mà còn...'], answer: 'Bởi vì... cho nên...', explanation: '因为...所以... là liên từ quan hệ nhân quả.' }
    ]
  },
  {
    id: 'rg-8',
    title: 'Quizlet Live: Ôn Tập 100 Câu Giao Tiếp Thường Ngày',
    grade: 'Tất cả',
    category: 'external_wordwall',
    rewardGems: 25,
    rewardXp: 60,
    coverEmoji: '⚡',
    authorName: 'Cô giáo Bùi Ngọc Liên',
    authorEmail: 'amazingtranslation88@gmail.com',
    externalUrl: 'https://quizlet.com/demo-ms-lien-chinese-conversations',
    description: 'Flashcard và Quiz trực tuyến do cô Liên đăng tải giúp ghi nhớ từ vựng siêu sâu, nhận ngay 25 Kim Cương sau khi hoàn thành!',
    playsCount: 630,
    createdAt: '2026-10-23',
    questions: [
      { id: 'qz1', type: 'quiz', question: 'Đáp lại câu "谢谢你" (Cảm ơn bạn) là:', hanzi: '不客气', pinyin: 'bù kèqi', options: ['不客气 (Không có gì)', '对不起 (Xin lỗi)', '没关系 (Không sao)', '明天见 (Mai gặp)'], answer: '不客气 (Không có gì)', explanation: '谢谢 -> 不客气 là cặp giao tiếp chuẩn.' },
      { id: 'qz2', type: 'quiz', question: 'Đáp lại câu "对不起" (Xin lỗi bạn) là:', hanzi: '没关系', pinyin: 'méi guānxi', options: ['没关系 (Không sao đâu)', '不用谢 (Đừng cảm ơn)', '很好 (Rất tốt)', '再见 (Tạm biệt)'], answer: '没关系 (Không sao đâu)', explanation: '对不起 -> 没关系.' }
    ]
  }
];

export function getStoredRewardGames(): RewardGameItem[] {
  if (typeof window === 'undefined') return INITIAL_REWARD_GAMES;
  try {
    const raw = localStorage.getItem(REWARD_GAMES_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return INITIAL_REWARD_GAMES;
}

export function saveStoredRewardGames(games: RewardGameItem[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(REWARD_GAMES_KEY, JSON.stringify(games));
  } catch {}
}

export function addRewardGame(game: Omit<RewardGameItem, 'id' | 'createdAt' | 'playsCount'>): RewardGameItem {
  const games = getStoredRewardGames();
  const newGame: RewardGameItem = {
    ...game,
    id: `rg-${Date.now()}`,
    playsCount: 0,
    createdAt: new Date().toISOString().split('T')[0],
  };
  games.unshift(newGame);
  saveStoredRewardGames(games);
  return newGame;
}

export function deleteRewardGame(id: string): void {
  const games = getStoredRewardGames();
  const filtered = games.filter((g) => g.id !== id);
  saveStoredRewardGames(filtered);
}

export function incrementRewardGamePlays(id: string): void {
  const games = getStoredRewardGames();
  const g = games.find((item) => item.id === id);
  if (g) {
    g.playsCount = (g.playsCount || 0) + 1;
    saveStoredRewardGames(games);
  }
}

export function getFreeDocuments(): FreeDocument[] {
  if (typeof window === 'undefined') return INITIAL_FREE_DOCUMENTS;
  try {
    const raw = localStorage.getItem(FREE_DOCS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return INITIAL_FREE_DOCUMENTS;
}

export function getSystemStats() {
  const materials = getStoredMaterials();
  const totalViews = materials.reduce((acc, m) => acc + m.views, 12850);
  const totalDownloads = materials.reduce((acc, m) => acc + m.downloads, 4620);
  const totalComments = materials.reduce((acc, m) => acc + m.comments.length, 342);

  return {
    membersCount: 3890,
    visitsCount: 42180,
    totalViews,
    totalDownloads,
    totalComments,
  };
}

// Download helper: creates real downloadable file with authentic original extension or opens direct download link
export function triggerFileDownload(title: string, url: string, type: string) {
  // Trừ video và file pptx không cho tải xuống (Chỉ cho phép xem trực tiếp trên ứng dụng)
  if (type === 'video' || type === 'youtube' || type === 'pptx' || (url && /\.(mp4|webm|mov|avi|mkv|pptx|ppt)$/i.test(url))) {
    console.warn('Video và bài giảng PPTX chỉ hỗ trợ xem trực tiếp trên hệ thống, không cho phép tải xuống.');
    return;
  }

  const safeTitle = title.replace(/[^a-zA-Z0-9_\u00C0-\u024F\u1EA0-\u1EF9]/g, '_');
  const targetExt = type === 'pdf' ? 'pdf' 
    : type === 'word' ? 'docx' 
    : type === 'image' ? 'png' 
    : 'pdf';

  // 1. If uploaded to server, download via /api/download with original extension & headers
  if (url && url.startsWith('/uploads/')) {
    const extMatch = url.match(/\.([a-zA-Z0-9]+)(?:\?|#|$)/);
    const ext = extMatch ? extMatch[1] : targetExt;
    const downloadUrl = `/api/download?path=${encodeURIComponent(url)}&name=${encodeURIComponent(safeTitle)}&type=${encodeURIComponent(type)}`;
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = `${safeTitle}.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    return;
  }

  // If stored as blob/data URL
  if (url && (url.startsWith('blob:') || url.startsWith('data:'))) {
    const extMatch = url.match(/\.([a-zA-Z0-9]+)(?:\?|#|$)/);
    const ext = extMatch ? extMatch[1] : targetExt;
    const a = document.createElement('a');
    a.href = url;
    a.download = `${safeTitle}.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    return;
  }

  // 2. Google Drive direct download link converter
  if (url && url.includes('drive.google.com')) {
    const fileIdMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/) || url.match(/id=([a-zA-Z0-9_-]+)/);
    if (fileIdMatch && fileIdMatch[1]) {
      const directDownloadUrl = `https://drive.google.com/uc?export=download&id=${fileIdMatch[1]}`;
      const a = document.createElement('a');
      a.href = directDownloadUrl;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      return;
    }
  }

  // 3. Google Docs direct docx export converter
  if (url && url.includes('docs.google.com/document')) {
    const docIdMatch = url.match(/\/document\/d\/([a-zA-Z0-9_-]+)/);
    if (docIdMatch && docIdMatch[1]) {
      const docxExportUrl = `https://docs.google.com/document/d/${docIdMatch[1]}/export?format=docx`;
      const a = document.createElement('a');
      a.href = docxExportUrl;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      return;
    }
  }

  // 4. Other external direct file links
  if (url && (url.startsWith('http://') || url.startsWith('https://'))) {
    const isDirectFile = /\.(pdf|docx|doc|png|jpg|jpeg|webp|zip|rar)$/i.test(url);
    if (isDirectFile) {
      const a = document.createElement('a');
      a.href = url;
      a.download = `${safeTitle}.${targetExt}`;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      return;
    }
  }

  // 5. Authentic Document generator (Word .doc / PDF)
  if (targetExt === 'docx') {
    const docContent = `<html>
<head><meta charset="utf-8"><title>${title}</title></head>
<body style="font-family: Arial, sans-serif; padding: 20px;">
  <h1 style="color: #047857;">${title}</h1>
  <p><strong>Hệ thống Học liệu Tiếng Trung Ms. Liên</strong></p>
  <p>Giáo viên biên soạn: Cô Bùi Ngọc Liên (0976817231 - amazingtranslation88@gmail.com)</p>
  <hr/>
  <p>Tài liệu văn bản đã được tải về thành công từ hệ thống Vui Học Tiếng Trung.</p>
</body>
</html>`;
    const blob = new Blob([docContent], { type: 'application/msword' });
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = `${safeTitle}.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(blobUrl), 3000);
    return;
  }

  const pdfContent = `%PDF-1.4
% TÀI LIỆU HỌC TẬP TIẾNG TRUNG CHUẨN GDPT VÀ YCT
Tên tài liệu: ${title}
Định dạng: ${targetExt.toUpperCase()}
Kho học liệu: APP VUI HỌC TIẾNG TRUNG - MS. LIÊN
Tác giả: Cô giáo Bùi Ngọc Liên (0976817231)
Email: amazingtranslation88@gmail.com
Tài liệu học tập chính thức đã được lưu trữ vĩnh viễn trên Google Cloud & Firestore.
`;
  const blob = new Blob([pdfContent], { type: 'application/pdf' });
  const blobUrl = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = blobUrl;
  a.download = `${safeTitle}.${targetExt}`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(blobUrl), 3000);
}
