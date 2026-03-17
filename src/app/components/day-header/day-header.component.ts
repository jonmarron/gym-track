import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkoutDay } from '../../models/plan.model';
import { ProgressService } from '../../services/progress.service';

@Component({
  selector: 'app-day-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './day-header.component.html',
  styleUrl: './day-header.component.css'
})
export class DayHeaderComponent {
  @Input() day!: WorkoutDay;

  private progressService = inject(ProgressService);
  private _progress = this.progressService.getProgress();

  // r=16 → C = 2π×16 ≈ 100.53
  readonly circleC = 2 * Math.PI * 16;

  get stats() {
    this._progress();
    return this.progressService.getDayCompletionStats(this.day.id);
  }

  get progressPercent(): number {
    const s = this.stats;
    if (s.total === 0) return 0;
    return Math.round((s.completed / s.total) * 100);
  }

  get dashoffset(): number {
    return this.circleC * (1 - this.progressPercent / 100);
  }
}
