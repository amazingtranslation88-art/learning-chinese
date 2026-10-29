export type UserRole = 'student' | 'teacher' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  role: UserRole;
  grade: string; // e.g. "Lớp 3", "Lớp 6A", "Giáo viên Tiếng Trung"
  school: string; // e.g. "Tiểu học Dịch Vọng A"
  avatar: string;
  xp: number;
  level: number;
  streak: number;
  gems: number;
  badges: string[];
  joinedDate: string;
  isLoggedIn: boolean;
  loginIdentifier?: string; // Phone number or Gmail used to login
}

export interface RegisteredAccount {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  role: UserRole;
  grade: string;
  school: string;
  avatar: string;
  xp: number;
  level: number;
  streak: number;
  gems: number;
  badges: string[];
  registeredDate: string;
}

export interface VocabularyItem {
  id: string;
  hanzi: string;
  pinyin: string;
  meaningVi: string;
  exampleZh: string;
  examplePinyin?: string;
  exampleVi: string;
  category?: string;
  audio?: string;
  image?: string;
}

export interface GrammarPoint {
  id: string;
  title: string;
  structure: string;
  explanation: string;
  examples: {
    zh: string;
    pinyin: string;
    vi: string;
  }[];
}

export interface DialogueLine {
  speaker: string;
  hanzi: string;
  pinyin: string;
  vi: string;
  avatar?: string;
}

export interface ExerciseQuestion {
  id: string;
  type: 'quiz' | 'fill' | 'match' | 'order' | 'listen';
  question: string;
  hanzi?: string;
  pinyin?: string;
  options?: string[];
  answer: string | string[];
  explanation: string;
  hint?: string;
}

export interface LearningUnit {
  id: string;
  grade: 'primary' | 'grade6' | 'grade7' | 'grade8' | 'grade9' | 'yct' | 'hsk';
  unitNumber: number;
  yctLevel?: number; // 1 to 6
  hskLevel?: 1 | 2 | 3; // HSK 3.0 (Levels 1 - 3)
  titleVi: string;
  titleZh: string;
  pinyin: string;
  description: string;
  coverImage: string;
  vocabulary: VocabularyItem[];
  grammar: GrammarPoint[];
  dialogue: DialogueLine[];
  exercises: ExerciseQuestion[];
  pdfDownloadUrl?: string;
}

export interface CommentItem {
  id: string;
  authorName: string;
  authorAvatar: string;
  authorEmail?: string;
  content: string;
  createdAt: string;
  rating?: number;
}

export interface WordVocabItem {
  id: string;
  hanzi: string;
  pinyin: string;
  meaningVi: string;
  category?: string;
  exampleSentence: {
    zh: string;
    pinyin: string;
    vi: string;
  };
}

export interface LectureMaterial {
  id: string;
  title: string;
  grade: string; // "Tiểu học", "Lớp 6", "Lớp 7", "Chung", "YCT1", "YCT2", etc.
  unit?: string;
  yctLevel?: number;
  hskLevel?: number;
  authorName: string;
  authorEmail: string;
  type: 'pptx' | 'pdf' | 'video' | 'drive' | 'youtube' | 'web' | 'word' | 'image';
  url: string;
  thumbnail: string;
  description: string;
  views: number;
  downloads: number;
  ratings: number[];
  comments: CommentItem[];
  createdAt: string;
  isOfficial?: boolean;
  vocabularyItems?: WordVocabItem[];
  wordContent?: string;
}

export interface VideoLesson {
  id: string;
  title: string;
  grade: 'primary' | 'grade6' | 'grade7' | 'grade8' | 'grade9' | 'yct' | 'hsk';
  unitNumber: number;
  youtubeId: string;
  driveUrl?: string;
  duration: string;
  teacherName: string;
  thumbnail: string;
  description: string;
  views: number;
}

export interface FreeDocument {
  id: string;
  title: string;
  category: 'PDF Giáo trình' | 'Flashcards' | 'Phiếu ôn tập' | 'Luyện viết chữ Hán' | 'Luyện thi vào 10' | 'Sách YCT';
  grade: string;
  pages: number;
  size: string;
  downloadUrl: string;
  thumbnail: string;
  downloads: number;
  description: string;
}

export interface StudentRank {
  rank: number;
  name: string;
  school: string;
  className: string;
  avatar: string;
  xp: number;
  level: number;
  streak: number;
  badge: string;
}

export interface TeacherRank {
  rank: number;
  name: string;
  school: string;
  avatar: string;
  visits: number;
  materialsCount: number;
  gamesContributed: number;
  badge: string;
}

export interface CustomGameItem {
  id: string;
  title: string;
  gameType: 'quiz' | 'drag_drop' | 'match' | 'memory' | 'image_guess' | 'wheel' | 'obstacle' | 'fast_response' | 'bubble_shoot' | 'platformer';
  grade: string;
  topic: string;
  createdBy: string;
  creatorEmail: string;
  createdAt: string;
  questions: ExerciseQuestion[];
}

export interface RewardGameItem {
  id: string;
  title: string;
  grade: string; // e.g. "Tiểu học", "Lớp 6 - 9", "Chuẩn YCT", "Chuẩn HSK 3.0", "Tất cả"
  category: 'quiz' | 'match' | 'memory' | 'wheel' | 'image_guess' | 'external_wordwall' | 'bubble_shoot';
  rewardGems: number;
  rewardXp: number;
  coverEmoji: string;
  authorName: string;
  authorEmail: string;
  description: string;
  externalUrl?: string; // Wordwall, Quizlet, Educaplay, Google Form or game URL
  playsCount: number;
  createdAt: string;
  questions?: ExerciseQuestion[];
}

