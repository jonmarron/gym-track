import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExerciseCardComponent } from './components/exercise-card/exercise-card.component';
import { WORKOUT_DAYS, PLAN_NAME } from './data/plan.data';
import { WorkoutDay } from './models/plan.model';
import { ProgressService } from './services/progress.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ExerciseCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  planName = PLAN_NAME;
  days = WORKOUT_DAYS;
  selectedDay: WorkoutDay = this.days[0];
  showResetConfirm = false;

  private progressService = inject(ProgressService);
  private _progress = this.progressService.getProgress();

  selectDay(day: WorkoutDay): void {
    this.selectedDay = day;
    this.showResetConfirm = false;
  }

  getDayStats(dayId: string): { completed: number; total: number } {
    this._progress();
    return this.progressService.getDayCompletionStats(dayId);
  }

  isDayComplete(dayId: string): boolean {
    this._progress();
    return this.progressService.isDayComplete(dayId);
  }

  get selectedDayStats() {
    return this.getDayStats(this.selectedDay.id);
  }

  get selectedDayProgressPercent(): number {
    const stats = this.selectedDayStats;
    if (stats.total === 0) return 0;
    return Math.round((stats.completed / stats.total) * 100);
  }

  confirmReset(): void {
    this.showResetConfirm = true;
  }

  resetDay(): void {
    this.progressService.resetDay(this.selectedDay.id);
    this.showResetConfirm = false;
  }

  cancelReset(): void {
    this.showResetConfirm = false;
  }
}
