import { Component, inject, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WorkoutDay } from '../../models/plan.model';
import { ProgressService } from '../../services/progress.service';
import { WORKOUT_DAYS } from '../../data/plan.data';

const SCHEMA_PROMPT = `You are a workout plan generator. Return ONLY a valid JSON array — no markdown, no explanation, no code fences.

Follow this exact schema:

[
  {
    "id": "day-a",
    "name": "Day A",
    "label": "Push + Core",
    "muscleGroups": ["chest", "shoulders", "triceps", "core"],
    "color": "#7F77DD",
    "isOptional": false,
    "schedulingNote": "Optional scheduling tip, or omit this field",
    "exercises": [
      {
        "id": "a1",
        "name": "Exercise Name",
        "muscleGroup": "chest",
        "category": "compound",
        "sets": 4,
        "reps": { "min": 6, "max": 8 },
        "restSeconds": 150,
        "notes": "Form cue or tip.",
        "alternatives": ["Alternative 1", "Alternative 2"]
      },
      {
        "id": "a2",
        "name": "Timed Exercise Example",
        "muscleGroup": "core",
        "category": "isolation",
        "sets": 3,
        "durationSeconds": { "min": 30, "max": 45 },
        "restSeconds": 60,
        "notes": "Use durationSeconds instead of reps for timed exercises.",
        "alternatives": []
      }
    ]
  }
]

Field rules:
- id: unique string across all exercises (e.g. "a1", "b2")
- category: must be exactly "compound" or "isolation"
- use "reps" OR "durationSeconds", not both
- color: a hex color string
- isOptional / schedulingNote: omit if not needed

My workout requirements:
`;

@Component({
  selector: 'app-plan-editor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './plan-editor.component.html',
  styleUrl: './plan-editor.component.css'
})
export class PlanEditorComponent {
  @Output() planImported = new EventEmitter<WorkoutDay[]>();
  @Output() planReset = new EventEmitter<void>();

  private progressService = inject(ProgressService);

  showEditor = false;
  editorJson = '';
  importError = '';
  copySuccess = false;

  copySchemaPrompt(): void {
    navigator.clipboard.writeText(SCHEMA_PROMPT);
    this.copySuccess = true;
    setTimeout(() => (this.copySuccess = false), 2000);
  }

  openEditor(): void {
    this.editorJson = '';
    this.importError = '';
    this.showEditor = true;
  }

  importPlan(): void {
    try {
      const parsed = JSON.parse(this.editorJson);
      if (!Array.isArray(parsed) || parsed.length === 0) {
        throw new Error('Must be a non-empty array of workout days');
      }
      this.progressService.savePlan(parsed);
      this.planImported.emit(parsed);
      this.showEditor = false;
    } catch (e: any) {
      this.importError = e.message;
    }
  }

  resetToDefault(): void {
    this.progressService.resetPlan();
    this.planReset.emit();
    this.showEditor = false;
  }

  cancelEditor(): void {
    this.showEditor = false;
  }
}
