// Web Audio API Synthesizer for rich, responsive educational sound effects
class SoundSynthesizer {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public init() {
    try {
      this.getContext();
    } catch {}
  }

  // Sweet ascending chime for correct answers
  playCorrect() {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      // Note 1: G5
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(783.99, now);
      gain1.gain.setValueAtTime(0.2, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.3);

      // Note 2: C6
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(1046.5, now + 0.12);
      gain2.gain.setValueAtTime(0.25, now + 0.12);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.12);
      osc2.stop(now + 0.5);
    } catch {
      // AudioContext fallback
    }
  }

  // Friendly soft buzz for wrong answers (not discouraging)
  playWrong() {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.linearRampToValueAtTime(180, now + 0.25);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.3);
    } catch {}
  }

  // Soft tactile click pop
  playClick() {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.06);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.06);
    } catch {}
  }

  // Victory fanfare for level up / quiz completion
  playVictory() {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      const now = ctx.currentTime;

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.12);
        gain.gain.setValueAtTime(0.2, now + idx * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.12);
        osc.stop(now + idx * 0.12 + 0.4);
      });
    } catch {}
  }

  // Game jump sound for obstacle/platformer
  playJump() {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(250, now);
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.15);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.15);
    } catch {}
  }

  // Star coin collect sound
  playCoin() {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(987.77, now); // B5
      osc.frequency.setValueAtTime(1318.51, now + 0.08); // E6
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.35);
    } catch {}
  }
}

export const sound = new SoundSynthesizer();

let currentPlayingAudio: HTMLAudioElement | null = null;

export function stopAllSpeech(): void {
  if (currentPlayingAudio) {
    try {
      currentPlayingAudio.pause();
      currentPlayingAudio.currentTime = 0;
    } catch {}
    currentPlayingAudio = null;
  }
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch {}
  }
}

// Unlock mobile web audio on first user touch / click
if (typeof window !== 'undefined') {
  const unlockAudio = () => {
    try {
      sound.init();
      // Test audio unlock
      const dummy = new Audio();
      dummy.src = 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA';
      dummy.play().catch(() => {});
    } catch {}
    window.removeEventListener('touchstart', unlockAudio);
    window.removeEventListener('click', unlockAudio);
  };
  window.addEventListener('touchstart', unlockAudio, { passive: true, once: true });
  window.addEventListener('click', unlockAudio, { passive: true, once: true });
}

/**
 * High-fidelity Mandarin Chinese pronunciation.
 * Works 100% on phones (iOS Safari, Android Chrome) by streaming native MP3
 * with graceful fallback to browser speechSynthesis.
 */
export function speakChinese(text: string, rate: number = 0.85): Promise<void> {
  return new Promise((resolve) => {
    if (!text || typeof window === 'undefined') {
      resolve();
      return;
    }

    // Stop any existing playing speech
    if (currentPlayingAudio) {
      try {
        currentPlayingAudio.pause();
        currentPlayingAudio.currentTime = 0;
      } catch {}
      currentPlayingAudio = null;
    }

    const cleanText = text.trim();
    if (!cleanText) {
      resolve();
      return;
    }

    // Attempt 1: Local /api/tts proxy endpoint (bypasses CORS & missing voice packs on mobile)
    const proxyUrl = `/api/tts?text=${encodeURIComponent(cleanText)}&lang=zh-CN`;
    const audio = new Audio(proxyUrl);
    currentPlayingAudio = audio;

    // Apply speed setting if supported
    try {
      audio.playbackRate = Math.max(0.6, Math.min(1.4, rate));
    } catch {}

    let resolved = false;
    const finish = () => {
      if (!resolved) {
        resolved = true;
        if (currentPlayingAudio === audio) currentPlayingAudio = null;
        resolve();
      }
    };

    audio.onended = finish;

    audio.onerror = () => {
      // Attempt 2: Direct Google Translate TTS endpoint
      try {
        const directUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=zh-CN&client=tw-ob&q=${encodeURIComponent(cleanText)}`;
        const fallbackAudio = new Audio(directUrl);
        currentPlayingAudio = fallbackAudio;
        try {
          fallbackAudio.playbackRate = rate;
        } catch {}
        fallbackAudio.onended = finish;
        fallbackAudio.onerror = () => {
          fallbackToSpeechSynthesis(cleanText, 'zh-CN', rate, finish);
        };
        fallbackAudio.play().catch(() => {
          fallbackToSpeechSynthesis(cleanText, 'zh-CN', rate, finish);
        });
      } catch {
        fallbackToSpeechSynthesis(cleanText, 'zh-CN', rate, finish);
      }
    };

    audio.play().catch(() => {
      // If direct audio autoplay was rejected or network error, fallback to SpeechSynthesis
      fallbackToSpeechSynthesis(cleanText, 'zh-CN', rate, finish);
    });
  });
}

/**
 * Intelligently speaks Chinese or Vietnamese depending on characters
 */
export function speakSmart(text: string, rate?: number): Promise<void> {
  const hasChinese = /[\u4e00-\u9fa5]/.test(text);
  if (hasChinese) {
    return speakChinese(text, rate);
  } else {
    return speakVietnamese(text, rate);
  }
}

/**
 * High-fidelity Vietnamese pronunciation.
 */
export function speakVietnamese(text: string, rate: number = 0.95): Promise<void> {
  return new Promise((resolve) => {
    if (!text || typeof window === 'undefined') {
      resolve();
      return;
    }

    if (currentPlayingAudio) {
      try {
        currentPlayingAudio.pause();
        currentPlayingAudio.currentTime = 0;
      } catch {}
      currentPlayingAudio = null;
    }

    const cleanText = text.trim();
    const proxyUrl = `/api/tts?text=${encodeURIComponent(cleanText)}&lang=vi-VN`;
    const audio = new Audio(proxyUrl);
    currentPlayingAudio = audio;

    try {
      audio.playbackRate = rate;
    } catch {}

    let resolved = false;
    const finish = () => {
      if (!resolved) {
        resolved = true;
        if (currentPlayingAudio === audio) currentPlayingAudio = null;
        resolve();
      }
    };

    audio.onended = finish;
    audio.onerror = () => {
      fallbackToSpeechSynthesis(cleanText, 'vi-VN', rate, finish);
    };

    audio.play().catch(() => {
      fallbackToSpeechSynthesis(cleanText, 'vi-VN', rate, finish);
    });
  });
}

function fallbackToSpeechSynthesis(text: string, lang: string, rate: number, onDone: () => void) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    onDone();
    return;
  }

  try {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = rate;
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const matchVoice = voices.find((v) => v.lang.toLowerCase().includes(lang.toLowerCase().split('-')[0]));
    if (matchVoice) {
      utterance.voice = matchVoice;
    }

    utterance.onend = () => onDone();
    utterance.onerror = () => onDone();

    window.speechSynthesis.speak(utterance);
  } catch {
    onDone();
  }
}
