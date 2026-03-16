import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExerciseCardComponent } from './components/exercise-card/exercise-card.component';
import { WORKOUT_DAYS, PLAN_NAME } from './data/plan.data';
import { WorkoutDay } from './models/plan.model';
import { ProgressService } from './services/progress.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, ExerciseCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  planName = PLAN_NAME;
  days: WorkoutDay[];
  selectedDay: WorkoutDay;
  showResetConfirm = false;

  showPlanEditor = false;
  planEditorJson = '';
  planImportError = '';
  copySuccess = false;

  private progressService = inject(ProgressService);
  private _progress = this.progressService.getProgress();

  constructor() {
    this.days = this.progressService.loadPlan();
    this.selectedDay = this.days[0];
  }

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

  openPlanEditor(): void {
    this.planEditorJson = JSON.stringify(this.days, null, 2);
    this.planImportError = '';
    this.showPlanEditor = true;
  }

  copyPlanJson(): void {
    navigator.clipboard.writeText(JSON.stringify(this.days, null, 2));
    this.copySuccess = true;
    setTimeout(() => (this.copySuccess = false), 2000);
  }

  importPlan(): void {
    try {
      const parsed = JSON.parse(this.planEditorJson);
      if (!Array.isArray(parsed) || parsed.length === 0) {
        throw new Error('Must be a non-empty array of workout days');
      }
      this.progressService.savePlan(parsed);
      this.days = parsed;
      this.selectedDay = parsed[0];
      this.showPlanEditor = false;
    } catch (e: any) {
      this.planImportError = e.message;
    }
  }

  resetToDefaultPlan(): void {
    this.progressService.resetPlan();
    this.days = WORKOUT_DAYS;
    this.selectedDay = WORKOUT_DAYS[0];
    this.showPlanEditor = false;
  }

  cancelPlanEditor(): void {
    this.showPlanEditor = false;
  }
}
