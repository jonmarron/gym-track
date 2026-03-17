import { Component, Input, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Exercise } from '../../models/plan.model';
import { ProgressService } from '../../services/progress.service';
import { TimerService } from '../../services/timer.service';

@Component({
  selector: 'app-exercise-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './exercise-card.component.html',
  styleUrl: './exercise-card.component.css'
})
export class ExerciseCardComponent {
  @Input({ required: true }) exercise!: Exercise;
  @Input({ required: true }) dayId!: string;
  @Input({ required: true }) dayColor!: string;

  showNotes = false;
  showAlternatives = false;

  private progressService = inject(ProgressService);
  private timerService = inject(TimerService);

  // Force re-evaluation when progress changes
  private _progress = this.progressService.getProgress();

  get sets(): number[] {
    return Array.from({ length: this.exercise.sets }, (_, i) => i);
  }

  isSetCompleted(setIndex: number): boolean {
    this._progress(); // subscribe to signal
    return this.progressService.isSetCompleted(this.dayId, this.exercise.id, setIndex);
  }

  get completedSets(): number {
    this._progress();
    return this.progressService.getExerciseProgress(this.dayId, this.exercise.id)
      .sets.filter(s => s.completed).length;
  }

  get isFullyDone(): boolean {
    return this.completedSets === this.exercise.sets;
  }

  get repDisplay(): string {
    if (this.exercise.reps) {
      return `${this.exercise.reps.min}–${this.exercise.reps.max} reps`;
    }
    if (this.exercise.durationSeconds) {
      return `${this.exercise.durationSeconds.min}–${this.exercise.durationSeconds.max}s`;
    }
    return '';
  }

  get restDisplay(): string {
    const s = this.exercise.restSeconds;
    if (s >= 60) {
      const m = Math.floor(s / 60);
      const rem = s % 60;
      return rem > 0 ? `${m}m ${rem}s rest` : `${m}m rest`;
    }
    return `${s}s rest`;
  }

  toggleSet(setIndex: number): void {
    const wasCompleted = this.progressService.isSetCompleted(this.dayId, this.exercise.id, setIndex);
    this.progressService.toggleSet(this.dayId, this.exercise.id, setIndex);
    if (!wasCompleted) {
      this.timerService.start(this.exercise.restSeconds);
    }
  }

  toggleNotes(): void {
    this.showNotes = !this.showNotes;
    if (this.showNotes) this.showAlternatives = false;
  }

  toggleAlternatives(): void {
    this.showAlternatives = !this.showAlternatives;
    if (this.showAlternatives) this.showNotes = false;
  }
}
