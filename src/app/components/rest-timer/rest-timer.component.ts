import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimerService } from '../../services/timer.service';

@Component({
  selector: 'app-rest-timer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rest-timer.component.html',
  styleUrl: './rest-timer.component.css'
})
export class RestTimerComponent {
  timer = inject(TimerService);

  get show(): boolean {
    return this.timer.active() || this.timer.done();
  }

  get timerDisplay(): string {
    const s = this.timer.remaining();
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  }

  get timerArc(): number {
    const total = this.timer.total();
    if (total === 0) return 0;
    return this.timer.remaining() / total;
  }

  // r=52 → C = 2π×52 ≈ 326.73
  readonly circleC = 2 * Math.PI * 52;

  get dashoffset(): number {
    return this.circleC * (1 - this.timerArc);
  }
}
