import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExerciseCardComponent } from './components/exercise-card/exercise-card.component';
import { RestTimerComponent } from './components/rest-timer/rest-timer.component';
import { DayTabsComponent } from './components/day-tabs/day-tabs.component';
import { DayHeaderComponent } from './components/day-header/day-header.component';
import { PlanEditorComponent } from './components/plan-editor/plan-editor.component';
import { WORKOUT_DAYS, PLAN_NAME } from './data/plan.data';
import { WorkoutDay } from './models/plan.model';
import { ProgressService } from './services/progress.service';
import { WakeLockService } from './services/wake-lock.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ExerciseCardComponent,
    RestTimerComponent,
    DayTabsComponent,
    DayHeaderComponent,
    PlanEditorComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  planName = PLAN_NAME;
  days: WorkoutDay[];
  selectedDay: WorkoutDay;
  showResetConfirm = false;

  private progressService = inject(ProgressService);
  wakeLock = inject(WakeLockService);

  constructor() {
    this.days = this.progressService.loadPlan();
    this.selectedDay = this.days[0];
  }

  ngOnInit(): void {
    this.wakeLock.acquire();
  }

  onDaySelect(day: WorkoutDay): void {
    this.selectedDay = day;
    this.showResetConfirm = false;
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

  onPlanImported(days: WorkoutDay[]): void {
    this.days = days;
    this.selectedDay = days[0];
  }

  onPlanReset(): void {
    this.days = WORKOUT_DAYS;
    this.selectedDay = WORKOUT_DAYS[0];
  }
}
