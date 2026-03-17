import { WorkoutDay } from '../models/plan.model';

export const PLAN_NAME = 'Gym Tracker';
export const PLAN_DESCRIPTION = 'A 2–3 day gym plan focused on upper body development with light leg work to complement running.';

export const WORKOUT_DAYS: WorkoutDay[] = [
  {
    id: 'day-a',
    name: 'Day A',
    label: 'Push + Core',
    muscleGroups: ['chest', 'shoulders', 'triceps', 'core'],
    color: '#7F77DD',
    exercises: [
      {
        id: 'a1',
        name: 'Barbell Bench Press',
        muscleGroup: 'chest',
        category: 'compound',
        sets: 4,
        reps: { min: 6, max: 8 },
        restSeconds: 150,
        notes: 'Main pressing movement. Focus on controlled descent, drive through feet.',
        alternatives: ['Dumbbell Bench Press', 'Machine Chest Press']
      },
      {
        id: 'a2',
        name: 'Overhead Press',
        muscleGroup: 'shoulders',
        category: 'compound',
        sets: 3,
        reps: { min: 8, max: 10 },
        restSeconds: 120,
        notes: 'Barbell or dumbbell. Brace core, avoid excessive back arch.',
        alternatives: ['Seated Dumbbell Press', 'Machine Shoulder Press']
      },
      {
        id: 'a3',
        name: 'Incline Dumbbell Press',
        muscleGroup: 'chest',
        category: 'compound',
        sets: 3,
        reps: { min: 10, max: 12 },
        restSeconds: 90,
        notes: '30–45° incline. Targets upper chest.',
        alternatives: ['Incline Barbell Press', 'Low-to-High Cable Fly']
      },
      {
        id: 'a4',
        name: 'Lateral Raises',
        muscleGroup: 'shoulders',
        category: 'isolation',
        sets: 3,
        reps: { min: 12, max: 15 },
        restSeconds: 60,
        notes: 'Controlled tempo, slight forward lean. Don\'t ego-lift.',
        alternatives: ['Cable Lateral Raise', 'Machine Lateral Raise']
      },
      {
        id: 'a5',
        name: 'Tricep Dips or Pushdowns',
        muscleGroup: 'triceps',
        category: 'isolation',
        sets: 3,
        reps: { min: 10, max: 12 },
        restSeconds: 60,
        notes: 'Dips on parallel bars or cable pushdowns with rope/bar.',
        alternatives: ['Overhead Tricep Extension', 'Skull Crushers']
      },
      {
        id: 'a6',
        name: 'Hanging Leg Raises',
        muscleGroup: 'core',
        category: 'isolation',
        sets: 3,
        reps: { min: 10, max: 15 },
        restSeconds: 60,
        notes: 'Control the swing. Bend knees to make easier.',
        alternatives: ['Captain\'s Chair Leg Raise', 'Lying Leg Raise']
      }
    ]
  },
  {
    id: 'day-b',
    name: 'Day B',
    label: 'Pull + Core',
    muscleGroups: ['back', 'biceps', 'rear_delts', 'core'],
    color: '#1D9E75',
    exercises: [
      {
        id: 'b1',
        name: 'Pull-ups',
        muscleGroup: 'back',
        category: 'compound',
        sets: 4,
        reps: { min: 6, max: 8 },
        restSeconds: 150,
        notes: 'Use assisted machine or band if needed. Full range of motion.',
        alternatives: ['Lat Pulldown', 'Assisted Pull-up Machine']
      },
      {
        id: 'b2',
        name: 'Barbell Row',
        muscleGroup: 'back',
        category: 'compound',
        sets: 3,
        reps: { min: 8, max: 10 },
        restSeconds: 120,
        notes: 'Hinge at hips, pull to lower chest. Keep back flat.',
        alternatives: ['Cable Row', 'T-Bar Row']
      },
      {
        id: 'b3',
        name: 'Face Pulls',
        muscleGroup: 'rear_delts',
        category: 'isolation',
        sets: 3,
        reps: { min: 15, max: 20 },
        restSeconds: 60,
        notes: 'High cable, rope attachment. Great for shoulder health and posture.',
        alternatives: ['Reverse Pec Deck', 'Band Pull-apart']
      },
      {
        id: 'b4',
        name: 'Single-Arm Dumbbell Row',
        muscleGroup: 'back',
        category: 'compound',
        sets: 3,
        reps: { min: 10, max: 12 },
        restSeconds: 90,
        notes: 'One hand and knee on bench. Pull to hip.',
        alternatives: ['Chest-Supported Row', 'Meadows Row']
      },
      {
        id: 'b5',
        name: 'Barbell Curl',
        muscleGroup: 'biceps',
        category: 'isolation',
        sets: 3,
        reps: { min: 10, max: 12 },
        restSeconds: 60,
        notes: 'Barbell or dumbbell. Avoid swinging.',
        alternatives: ['Dumbbell Curl', 'Hammer Curl', 'Cable Curl']
      },
      {
        id: 'b6',
        name: 'Pallof Press',
        muscleGroup: 'core',
        category: 'isolation',
        sets: 3,
        reps: { min: 10, max: 12 },
        durationSeconds: { min: 30, max: 45 },
        restSeconds: 60,
        notes: 'Anti-rotation exercise. Can substitute with plank hold (30–45 sec).',
        alternatives: ['Plank', 'Dead Bug']
      }
    ]
  },
  {
    id: 'day-c',
    name: 'Day C',
    label: 'Legs (light) + Shoulders',
    muscleGroups: ['quads', 'hamstrings', 'calves', 'shoulders', 'core'],
    color: '#D85A30',
    isOptional: true,
    schedulingNote: 'Schedule before a rest day or easy run. Skip or reduce if legs are fatigued from running.',
    exercises: [
      {
        id: 'c1',
        name: 'Goblet Squat',
        muscleGroup: 'quads',
        category: 'compound',
        sets: 3,
        reps: { min: 10, max: 12 },
        restSeconds: 90,
        notes: 'Light to moderate weight. Runner-friendly — builds stability without heavy spinal loading.',
        alternatives: ['Leg Press', 'Bulgarian Split Squat']
      },
      {
        id: 'c2',
        name: 'Romanian Deadlift',
        muscleGroup: 'hamstrings',
        category: 'compound',
        sets: 3,
        reps: { min: 10, max: 12 },
        restSeconds: 90,
        notes: 'Light weight, focus on hamstring stretch. Great injury prevention for runners.',
        alternatives: ['Single-Leg RDL', 'Seated Leg Curl']
      },
      {
        id: 'c3',
        name: 'Single-Leg Calf Raise',
        muscleGroup: 'calves',
        category: 'isolation',
        sets: 3,
        reps: { min: 12, max: 15 },
        restSeconds: 60,
        notes: 'Hold a dumbbell for added resistance. Key runner injury prevention exercise.',
        alternatives: ['Seated Calf Raise', 'Standing Calf Raise Machine']
      },
      {
        id: 'c4',
        name: 'Arnold Press',
        muscleGroup: 'shoulders',
        category: 'compound',
        sets: 3,
        reps: { min: 10, max: 12 },
        restSeconds: 90,
        notes: 'Seated, rotate palms during press for full delt engagement.',
        alternatives: ['Dumbbell Shoulder Press', 'Machine Shoulder Press']
      },
      {
        id: 'c5',
        name: 'Cable Lateral Raise',
        muscleGroup: 'shoulders',
        category: 'isolation',
        sets: 3,
        reps: { min: 12, max: 15 },
        restSeconds: 60,
        notes: 'Constant tension through full range. One arm at a time.',
        alternatives: ['Dumbbell Lateral Raise', 'Machine Lateral Raise']
      },
      {
        id: 'c6',
        name: 'Ab Wheel Rollout',
        muscleGroup: 'core',
        category: 'isolation',
        sets: 3,
        reps: { min: 10, max: 12 },
        restSeconds: 60,
        notes: 'Start from knees. Keep core braced, don\'t let hips sag.',
        alternatives: ['Dead Bug', 'Plank']
      }
    ]
  }
];
