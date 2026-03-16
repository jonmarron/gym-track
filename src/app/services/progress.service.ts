import { Injectable, signal, computed } from '@angular/core';
import { WorkoutProgress, DayProgress, ExerciseProgress, WorkoutDay } from '../models/plan.model';
import { WORKOUT_DAYS } from '../data/plan.data';

const STORAGE_KEY = 'gym-plan-progress';
const PLAN_KEY = 'gym-plan-custom';

@Injectable({ providedIn: 'root' })
export class ProgressService {
  private progress = signal<WorkoutProgress>(this.loadProgress());

  loadPlan(): WorkoutDay[] {
    try {
      const raw = localStorage.getItem(PLAN_KEY);
      if (raw) return JSON.parse(raw);
    } catch {}
    return WORKOUT_DAYS;
  }

  savePlan(days: WorkoutDay[]): void {
    localStorage.setItem(PLAN_KEY, JSON.stringify(days));
  }

  resetPlan(): void {
    localStorage.removeItem(PLAN_KEY);
  }

  private getWorkoutDays(): WorkoutDay[] {
    return this.loadPlan();
  }

  getExerciseProgress(dayId: string, exerciseId: string): ExerciseProgress {
    const day = this.progress()[dayId];
    if (!day) return this.defaultExerciseProgress(dayId, exerciseId);
    return day[exerciseId] ?? this.defaultExerciseProgress(dayId, exerciseId);
  }

  isSetCompleted(dayId: string, exerciseId: string, setIndex: number): boolean {
    return this.getExerciseProgress(dayId, exerciseId).sets[setIndex]?.completed ?? false;
  }

  toggleSet(dayId: string, exerciseId: string, setIndex: number): void {
    const current = this.progress();
    const dayProgress: DayProgress = { ...(current[dayId] ?? {}) };
    const exercise = this.getExerciseProgress(dayId, exerciseId);
    const sets = [...exercise.sets];
    sets[setIndex] = { completed: !sets[setIndex].completed };
    dayProgress[exerciseId] = { sets };
    const updated = { ...current, [dayId]: dayProgress };
    this.progress.set(updated);
    this.saveProgress(updated);
  }

  getDayCompletionStats(dayId: string): { completed: number; total: number } {
    const day = this.getWorkoutDays().find(d => d.id === dayId);
    if (!day) return { completed: 0, total: 0 };
    let completed = 0;
    let total = 0;
    for (const exercise of day.exercises) {
      total += exercise.sets;
      const progress = this.getExerciseProgress(dayId, exercise.id);
      completed += progress.sets.filter(s => s.completed).length;
    }
    return { completed, total };
  }

  isDayComplete(dayId: string): boolean {
    const stats = this.getDayCompletionStats(dayId);
    return stats.total > 0 && stats.completed === stats.total;
  }

  resetDay(dayId: string): void {
    const current = this.progress();
    const updated = { ...current };
    delete updated[dayId];
    this.progress.set(updated);
    this.saveProgress(updated);
  }

  getProgress() {
    return this.progress;
  }

  private defaultExerciseProgress(dayId: string, exerciseId: string): ExerciseProgress {
    const day = this.getWorkoutDays().find(d => d.id === dayId);
    const exercise = day?.exercises.find(e => e.id === exerciseId);
    const sets = Array.from({ length: exercise?.sets ?? 0 }, () => ({ completed: false }));
    return { sets };
  }

  private loadProgress(): WorkoutProgress {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  }

  private saveProgress(progress: WorkoutProgress): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }
}
