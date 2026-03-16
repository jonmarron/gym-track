# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start          # Dev server at http://localhost:4200
npm run build      # Production build → dist/gym-plan/
npm run watch      # Dev build with file watching
npm test           # Unit tests via Karma/Jasmine
```

No lint command is configured.

## Architecture

Angular 19 **standalone component** app (no NgModule). Uses Angular **signals** for reactive state throughout.

### Data flow

1. `src/app/data/plan.data.ts` — static workout plan definition (3 days, 18+ exercises)
2. `src/app/models/plan.model.ts` — TypeScript interfaces (`GymPlan`, `WorkoutDay`, `Exercise`, `WorkoutProgress`, etc.)
3. `src/app/services/progress.service.ts` — all runtime state via signals, persisted to `localStorage` under key `gym-plan-progress`
4. `src/app/app.component.ts` — root component, day selection tabs, stats display
5. `src/app/components/exercise-card/` — per-exercise UI with set completion toggles

### State management pattern

`ProgressService` holds computed signals derived from a single `WorkoutProgress` signal. Components read/write through the service. No external state library — just Angular signals + localStorage.

### Workout structure

- **Day A:** Push + Core
- **Day B:** Pull + Core
- **Day C:** Legs + Shoulders (optional, for runner who does 2–3 days/week)

### Deployment

GitHub Actions workflow (`.github/workflows/deploy.yml`) deploys to GitHub Pages on push to `master`.
