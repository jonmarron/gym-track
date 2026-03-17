import { Component, inject, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkoutDay } from '../../models/plan.model';
import { ProgressService } from '../../services/progress.service';

@Component({
  selector: 'app-day-tabs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './day-tabs.component.html',
  styleUrl: './day-tabs.component.css'
})
export class DayTabsComponent {
  @Input() days: WorkoutDay[] = [];
  @Input() selectedDay!: WorkoutDay;
  @Output() daySelect = new EventEmitter<WorkoutDay>();

  private progressService = inject(ProgressService);
  private _progress = this.progressService.getProgress();

  isDayComplete(dayId: string): boolean {
    this._progress();
    return this.progressService.isDayComplete(dayId);
  }
}
