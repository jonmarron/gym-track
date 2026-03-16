export interface RepRange {
  min: number;
  max: number;
}

export interface Exercise {
  id: string;
  name: string;
  muscleGroup: string;
  category: 'compound' | 'isolation';
  sets: number;
  reps?: RepRange;
  durationSeconds?: RepRange;
  restSeconds: number;
  notes: string;
  alternatives: string[];
}

export interface WorkoutDay {
  id: string;
  name: string;
  label: string;
  muscleGroups: string[];
  color: string;
  isOptional?: boolean;
  schedulingNote?: string;
  exercises: Exercise[];
}

export interface GymPlan {
  id: string;
  name: string;
  description: string;
  days: WorkoutDay[];
}

export interface SetProgress {
  completed: boolean;
}

export interface ExerciseProgress {
  sets: SetProgress[];
}

export interface DayProgress {
  [exerciseId: string]: ExerciseProgress;
}

export interface WorkoutProgress {
  [dayId: string]: DayProgress;
}
