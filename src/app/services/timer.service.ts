import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TimerService {
  readonly remaining = signal<number>(0);
  readonly total = signal<number>(0);
  readonly active = signal<boolean>(false);
  readonly done = signal<boolean>(false);

  private intervalId: ReturnType<typeof setInterval> | null = null;

  start(seconds: number): void {
    this.clearInterval();
    this.total.set(seconds);
    this.remaining.set(seconds);
    this.active.set(true);
    this.done.set(false);

    this.intervalId = setInterval(() => {
      const next = this.remaining() - 1;
      if (next <= 0) {
        this.remaining.set(0);
        this.active.set(false);
        this.done.set(true);
        this.clearInterval();
      } else {
        this.remaining.set(next);
      }
    }, 1000);
  }

  dismiss(): void {
    this.clearInterval();
    this.active.set(false);
    this.done.set(false);
  }

  private clearInterval(): void {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}
