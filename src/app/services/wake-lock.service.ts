import { Injectable, signal } from '@angular/core';

const STORAGE_KEY = 'gym-plan-wake-lock';

@Injectable({ providedIn: 'root' })
export class WakeLockService {
  private wakeLock: WakeLockSentinel | null = null;
  readonly enabled = signal<boolean>(this.loadEnabled());

  async acquire(): Promise<void> {
    if (!('wakeLock' in navigator) || !this.enabled()) return;
    try {
      this.wakeLock = await navigator.wakeLock.request('screen');
      document.addEventListener('visibilitychange', this.onVisibilityChange);
    } catch {
      // Permission denied or not supported — silently ignore
    }
  }

  release(): void {
    document.removeEventListener('visibilitychange', this.onVisibilityChange);
    this.wakeLock?.release();
    this.wakeLock = null;
  }

  async toggle(): Promise<void> {
    const next = !this.enabled();
    this.enabled.set(next);
    localStorage.setItem(STORAGE_KEY, String(next));
    if (next) {
      await this.acquire();
    } else {
      this.release();
    }
  }

  private onVisibilityChange = async (): Promise<void> => {
    if (document.visibilityState === 'visible' && this.enabled()) {
      try {
        this.wakeLock = await navigator.wakeLock.request('screen');
      } catch {
        // Silently ignore
      }
    }
  };

  private loadEnabled(): boolean {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === null ? true : stored === 'true';
  }
}
