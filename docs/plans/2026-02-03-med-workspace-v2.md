# Med-Workspace V2 Plan

## Task 1: Anatomy Model Upgrade
- [x] Integrate a high-fidelity human skeleton/anatomy GLB model (BrainStem.glb).
- [x] Update 'src/modules/HoloAnatomy/AnatomyModel.tsx' to use 'useGLTF' from '@react-three/drei' for loading.
- [x] Ensure rotation/position syncing logic is updated for the new model.
- [x] Follow TDD/frequent commit rules.

## Task 3: Voice-Enabled Medical Notes
- [x] Create 'src/modules/Notes/NotesManager.tsx' for UI and state management of medical notes.
- [x] Update 'src/hooks/useVoiceCommands.ts' to handle continuous transcription for 'Dictation Mode'.
- [x] Implement 'Start Note' and 'Save Note' voice triggers.
- [x] Create a basic local export (e.g., text file download) for saved notes.
- [x] Follow TDD/frequent commit rules.

## Task 4: UI/UX Refinement
